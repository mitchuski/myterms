// myterms/runtime-extension.mjs
// =============================================================================
// The EXTENSION RUNTIME ADAPTER for the myterms harness.
//
// The generic engine (./core/dual_agent_loop.mjs) calls agent(prompt, {phase,label,schema}).
// In the PQC instance those are LLM agents. Here the seats are the two browser extensions, so
// this adapter ROUTES each agent() call by phase to the ceremony-channel message bus:
//
//   Measure → bus.scan()                 (mymage deep-scan + current bilateral record)
//   Propose → bus.propose(lens, ctx)     (🧙 mymage proposes; held apart from the witnesses)
//   Hunt    → deriveWitness(proposal)    (⿻ the Gap: blade/hexagram/hash + registry — the Mage cannot tune)
//   Assay   → bus.gate(proposal, hunt)   (⚔️ myswordsman: checkCanForge + hash + identity + record)
//   Critic  → (llm or heuristic)
//
// HELD-APART INVARIANT (det(Σ)≠0 / I(Y_S;Y_M|X)=0): the witness derivation (Hunt) and the gate
// (Assay) run on the SWORDSMAN side; the Mage (Propose) never sees them. myswordsman owns the
// canvas — the Mage sends intelligence, it never renders. Do not let `bus.propose` read gate state.
//
// USAGE:
//   import { dualAgentHarness } from './core/dual_agent_loop.mjs';
//   import config from './harness.config.mjs';
//   import { makeExtensionRuntime } from './runtime-extension.mjs';
//   const rt = makeExtensionRuntime({ bus, llm });  // bus = the transport; llm optional
//   await dualAgentHarness(config, rt);
//
// `bus` IS THE INTEGRATION SURFACE — implement it over chrome.runtime/ceremony-channel in the
// browser, or over a puppeteer/playwright bridge headless. See ./run.mjs for both.
// =============================================================================

// ── inline UOR (mirror of myswordsman/src/lib/uor.ts) for deterministic witness derivation ──
const RING = 64, MAXV = 63;
const UOR = {
  neg: (x) => (RING - x) % RING,
  bnot: (x) => MAXV - x,
  succ: (x) => (x + 1) % RING,
  verifyCriticalIdentity: (x) => UOR.neg(UOR.bnot(x)) === UOR.succ(x),
  fromSpectrum: (s) => s[0] + s[1]*2 + s[2]*4 + s[3]*8 + s[4]*16 + s[5]*32,
};
const dimsToHexagram = (dims) => dims.slice(0, 6).map((d) => (d >= 0.5 ? 1 : 0));

/**
 * The bus contract the extensions (or a headless bridge) must satisfy:
 *   scan(): Promise<{ baselinePhi, trackers, darkPatterns, inferenceSurface, candidateSdBase[] }>
 *   propose(lens, ctx): Promise<proposal>            // 🧙 mymage — schema in harness.config.mjs
 *   registryHas(sdBaseId): Promise<boolean>          // IEEE-7012 / Customer Commons registry
 *   constellationHash(proposal): Promise<string>     // the real witness hash (swordsman side)
 *   gate(proposal, hunt): Promise<verdict>           // ⚔️ checkCanForge + hash + identity + record
 *   frontier(domain): Promise<number>                // current bilateral-record Φ for the domain
 *   domain: string
 */
function assertBus(bus) {
  for (const m of ['scan', 'propose', 'registryHas', 'constellationHash', 'gate', 'frontier'])
    if (typeof bus?.[m] !== 'function') throw new Error(`myterms bus missing required method: ${m}() — see runtime-extension.mjs bus contract`);
}

const lensFromLabel = (label = '') => (label.split(':')[1] || 'sigma-agent');

export function makeExtensionRuntime({ bus, llm = null }) {
  assertBus(bus);
  let scanCtx = null;

  const log = (m) => console.log(`[myterms-harness] ${m}`);
  const phase = (_t) => {};
  const parallel = (thunks) => Promise.all(thunks.map((t) => Promise.resolve().then(t).catch(() => null)));
  const pipeline = async (items, ...stages) => Promise.all(items.map(async (it, i) => {
    let v = it;
    for (const s of stages) { try { v = await s(v, it, i); } catch { return null; } if (v == null) return null; }
    return v;
  }));

  // route agent() by phase to the extension bus
  async function agent(prompt, opts = {}) {
    const ph = opts.phase;

    if (ph === 'Measure') {
      scanCtx = await bus.scan();
      return `baselinePhi=${scanCtx.baselinePhi}; candidates=${(scanCtx.candidateSdBase || []).join(',')}; ` +
             `trackers=${(scanCtx.trackers || []).length}; surface=${scanCtx.inferenceSurface ?? '?'}`;
    }

    if (ph === 'Propose') {
      // 🧙 Mage proposes, blind to the gate. lens carried in the label (mage:<lens>:rN).
      return bus.propose(lensFromLabel(opts.label), scanCtx);
    }

    if (ph === 'Hunt') {
      // ⿻ the Gap derives the witnesses the Mage cannot tune (Swordsman side).
      // The engine threads the proposal on opts.input.
      const proposal = opts.input || { sdBaseId: null, dims: [0,0,0,0,0,0] };
      const dims = (proposal && proposal.dims) || [0,0,0,0,0,0];
      const hexagram = dimsToHexagram(dims);
      const blade = UOR.fromSpectrum(hexagram);
      const [constellationHash, sdBaseInRegistry] = await Promise.all([
        bus.constellationHash(proposal),
        bus.registryHas(proposal && proposal.sdBaseId),
      ]);
      return { blade, hexagram, constellationHash, sdBaseInRegistry };
    }

    if (ph === 'Assay') {
      // ⚔️ Swordsman gates: checkCanForge + hash + registry + UOR identity + bilateral record.
      const { proposal, hunt } = opts.input || {};
      const v = await bus.gate(proposal, hunt);
      const frontier = await bus.frontier(bus.domain);
      const identityValid = UOR.verifyCriticalIdentity(hunt?.blade ?? 0);
      const allPass = v.canForge && v.hashValid && v.registryValid && identityValid;
      const beatsFrontier = (v.score ?? 0) > frontier;
      return { ...v, identityValid, beatsFrontier,
        validated: allPass && beatsFrontier,
        verdict: allPass ? (beatsFrontier ? 'validated' : 'mirage') : 'mirage' };
    }

    if (ph === 'Critic') {
      if (llm) return llm(prompt, opts.schema);
      // heuristic fallback: structural if any validated this round (the engine passes counts in the prompt)
      const validated = /(\d+) validated/.exec(prompt);
      return { classification: validated && +validated[1] > 0 ? 'structural' : 'probe-limited',
               continueLever: true, nextLead: 'try the next-highest-Φ axis at lower friction' };
    }

    // default: if an llm is supplied, use it; else echo
    return llm ? llm(prompt, opts.schema) : prompt;
  }

  return { agent, parallel, pipeline, phase, log };
}
