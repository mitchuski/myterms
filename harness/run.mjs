// myterms/run.mjs  (fork-ready package — vendors ./core/dual_agent_loop.mjs)
// =============================================================================
// Entry point — wires the engine + the myterms config + the extension runtime.
// Two ways to supply the `bus` (the integration surface, see runtime-extension.mjs):
//   (A) in-browser: a coordinator content/background script with chrome.runtime + the
//       ceremony channel (myswordsman/src/content/ceremony-channel.ts).
//   (B) headless: a puppeteer/playwright bridge that loads both extensions.
// This file ships (A) as the reference wiring and a MOCK bus so the loop runs end-to-end
// off-page for testing. Honest framing: a proposed agreement is validated only by the gate.
// =============================================================================

import { pathToFileURL } from 'node:url';
import { dualAgentHarness } from './core/dual_agent_loop.mjs';
import config from './harness.config.mjs';
import { makeExtensionRuntime } from './runtime-extension.mjs';

// ── (A) Browser bus: wrap the ceremony channel + myswordsman gate as the bus contract. ──
// In the extension, `chrome` and the CeremonyChannel instance are in scope; fill these in.
export function makeBrowserBus({ ceremony, blade /* myswordsman APIs */, registry, domain }) {
  return {
    domain,
    // 🧙 mymage deep-scan + current record (Measure)
    async scan() {
      const findings = await blade.requestDeepScan();          // triggers mymage SCAN_RESULTS
      return {
        baselinePhi: await blade.currentRecordPhi(domain),
        trackers: findings.trackers || [],
        darkPatterns: findings.darkPatterns || [],
        inferenceSurface: findings.inferenceSurface ?? null,
        candidateSdBase: findings.suggestedAssertions || [],
      };
    },
    // 🧙 propose (held apart from the gate) — one lens at a time
    async propose(lens, ctx) {
      return blade.requestMageProposal(lens, ctx);             // mymage INTELLIGENCE/CONSTELLATION
    },
    // ⿻ Gap witnesses (Swordsman side)
    async registryHas(sdBaseId) { return registry.has(sdBaseId); },                  // Customer Commons / IEEE-7012
    async constellationHash(proposal) { return blade.constellationHash(proposal); }, // myswordsman
    // ⚔️ gate: checkCanForge + hash + record  → verdict (canForge, hashValid, registryValid, score)
    async gate(proposal, hunt) { return blade.gateAndRecord(proposal, hunt); },
    async frontier(d) { return blade.currentRecordPhi(d); },
  };
}

// ── (B) Mock bus — lets the loop run off-page (no browser) for testing the wiring. ──
export function makeMockBus(domain = 'example.com') {
  let record = 0.2; // current bilateral Φ
  // The real IEEE 7012-2025 / Customer Commons roster (myterms.info). SD-BASE = most protective.
  const REGISTRY = new Set(['SD-BASE', 'SD-BASE-DP', 'SD-BASE-A', 'SD-BASE-AT', 'SD-BASE-ATP', 'SD-BASE-ATP-S3P']);
  return {
    domain,
    async scan() { return { baselinePhi: record, trackers: ['ga', 'fbq'], darkPatterns: ['preselected'], inferenceSurface: 0.6, candidateSdBase: ['SD-BASE', 'SD-BASE-A'] }; },
    async propose(lens) {
      // a plausible per-lens proposal (in reality, mymage + an LLM finder produce this).
      // Note (gap #2): only Σ + coarse Δ are expressible as an SD-BASE term; Γ is agentprivacy
      // enforcement layered ON TOP of the 7012 agreement, not a roster id.
      const dims = { 'sigma-agent':[0.8,0.7,0.2,0.3,0.4,0.6], 'delta-data':[0.6,0.4,0.7,0.8,0.3,0.5],
                     'gamma-inference':[0.5,0.3,0.6,0.4,0.9,0.7], 'friction-min':[0.6,0.5,0.5,0.5,0.5,0.5] }[lens] || [0.5,0.5,0.5,0.5,0.5,0.5];
      return { sdBaseId: 'SD-BASE', terms: ['DO_NOT_TRACK','DATA_MINIMISATION'], dims,
               rationale: `${lens} lens on detected trackers`, expectedPhi: 0.45, friction: 0.2, isStructural: true, smallestFix: `assert ${lens}` };
    },
    async registryHas(id) { return REGISTRY.has(id); },
    async constellationHash(p) { return 'h_' + JSON.stringify(p?.dims || []); },
    async gate(p, hunt) {
      const layer = (hunt.hexagram || []).filter(Boolean).length;
      const canForge = true; // mock: assume earned (real: checkCanForge totalForgings≥layer*3 …)
      const score = 0.45;    // mock Φ of the recorded agreement
      return { canForge, hashValid: !!hunt.constellationHash, registryValid: hunt.sdBaseInRegistry, score, layer };
    },
    async frontier() { return record; },
    _bump(v) { record = v; },
  };
}

// ── Run (mock) when invoked directly: node run.mjs ──
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const rt = makeExtensionRuntime({ bus: makeMockBus(), llm: null });
  dualAgentHarness(config, rt).then((r) => {
    console.log('\n=== myterms harness (mock) result ===');
    console.log(JSON.stringify(r, null, 2));
  });
}
