// myterms/harness.config.mjs
// =============================================================================
// INSTANCE #2 — myterms: propose the best IEEE-7012 SD-BASE agreement + spell
// constellation for a page, and PROVE it. A config for ./core/dual_agent_loop.mjs,
// run with the extension runtime adapter (./runtime-extension.mjs) — NOT a Workflow bundle.
//
// Honest framing: a proposed agreement is validated only by the held-out gate (the unlock
// lattice + IEEE-7012 registry + constellation-hash witness + bilateral record), never by
// the proposer. The Mage cannot render and cannot lower the gate (myswordsman owns both).
//
// OBJECTIVE (a PRODUCT → a complement set, per ../../agentprivacy-dual-agent-harness/generic/core/SEAT_CONTRACT.md §complement pair):
//   Φ = Φ_agent(Σ) · Φ_data(Δ) · Φ_inference(Γ)   maximise, subject to low friction / user intent.
//
// ALGEBRA: myswordsman/src/lib/uor.ts already implements neg(bnot(x))=succ(x) on Z/2⁶,
//   the five hammer strikes (only `and` costs / moves toward the null blade), and the
//   holographic bound (information on the 96-edge boundary, not the 64-vertex bulk — C9).
//
// SEATS (../../agentprivacy-dual-agent-harness/generic/bindings/personas-and-skills.md):
//   🧙 Mage  ← persona agentprivacy-cipher / agentprivacy-weaver + selective-disclosure, separation-enforcement
//   ⚔️ Sword ← persona agentprivacy-sentinel / agentprivacy-gatekeeper + horizon-gate, separation-enforcement
//   ⿻ Gap   ← checkCanForge (unlock lattice) + IEEE-7012 registry + constellation-hash witness + bilateral record
//   design  ← agentprivacy-architect + meta/agentprivacy-dual-agent-harness
// =============================================================================

// ── Mage finders: the three PVM axes (the product) + the friction complement ──
const FINDERS = [
  { lens: 'sigma-agent', mandate:
      'maximise Φ_agent(Σ) — propose SD-BASE terms that tighten agent separation / consent scope ' +
      '(what the entity may sign vs see). Strengthen the swordsman⊥mage boundary on this page.' },
  { lens: 'delta-data', mandate:
      'maximise Φ_data(Δ) — propose terms minimising data disclosure / retention for the detected ' +
      'trackers and dark patterns. Re-express requested data as the smallest sufficient disclosure.' },
  { lens: 'gamma-inference', mandate:
      'maximise Φ_inference(Γ) — propose terms bounding profiling / inference (DO_NOT_TRACK, ' +
      'DATA_MINIMISATION, SELECTIVE_DISCLOSURE) against the page\'s inference surface.' },
  { lens: 'friction-min', mandate:
      'the complement: keep it usable. Reject proposals that break the page or exceed user intent. ' +
      'A term that maxes one axis but makes the page unusable loses the product Φ — the cliff.' },
];

const proposal = { type:'object', required:['sdBaseId','terms','dims','rationale','expectedPhi','friction','isStructural','smallestFix'], properties:{
  sdBaseId:{type:'string', description:'an IEEE-7012 roster id from {SD-BASE, SD-BASE-DP, SD-BASE-A, SD-BASE-AT, SD-BASE-ATP, SD-BASE-ATP-S3P} — MUST exist in the Customer Commons registry; SD-BASE is most protective. Do not invent ids.'},
  terms:{type:'array', items:{type:'string'}, description:'the asserted privacy terms (DO_NOT_TRACK, DATA_MINIMISATION, …)'},
  dims:{type:'array', items:{type:'number'}, minItems:6, maxItems:6, description:'the 6 privacy-dimension scores 0–1 (→ hexagram at threshold 0.5)'},
  rationale:{type:'string'}, expectedPhi:{type:'number', description:'expected Φ = Σ·Δ·Γ'},
  friction:{type:'number', description:'0 (none) – 1 (breaks the page)'}, isStructural:{type:'boolean'}, smallestFix:{type:'string'} } };
const hunt = { type:'object', required:['blade','hexagram','constellationHash','sdBaseInRegistry'], properties:{
  blade:{type:'number', description:'the Z/2⁶ blade value derived from dims (UOR.fromSpectrum)'},
  hexagram:{type:'array', items:{type:'number'}, description:'6 lines from dimensionsToHexagram (threshold 0.5)'},
  constellationHash:{type:'string', description:'hash of the proposed constellation — the witness the Mage cannot forge'},
  sdBaseInRegistry:{type:'boolean'} } };
const verdict = { type:'object', required:['canForge','hashValid','registryValid','identityValid','validated','score','beatsFrontier','verdict'], properties:{
  canForge:{type:'boolean', description:'checkCanForge: totalForgings≥layer*3 AND domainsForged≥floor(layer/2)'},
  hashValid:{type:'boolean', description:'cast spells hash to the recorded hexagram'},
  registryValid:{type:'boolean', description:'sdBaseId is in the IEEE-7012 / Customer Commons registry'},
  identityValid:{type:'boolean', description:'UOR.verifyCriticalIdentity holds for the blade'},
  validated:{type:'boolean'}, score:{type:'number', description:'Φ of the recorded agreement'},
  beatsFrontier:{type:'boolean', description:'Φ strictly exceeds the current bilateral record for this domain'},
  verdict:{type:'string', enum:['validated','mirage','error']} } };
const critic = { type:'object', required:['classification','continueLever','nextLead'], properties:{
  classification:{type:'string', enum:['structural','probe-limited','noise']}, continueLever:{type:'boolean'}, nextLead:{type:'string'} } };

export default {
  name: 'myterms',
  purpose: 'best IEEE-7012 SD-BASE agreement + constellation per page (maximise PVM Φ = Σ·Δ·Γ at low friction)',
  finders: FINDERS,
  heldApartRule:
    'Propose terms on the PAGE\'s merits only. You may NOT: lower checkCanForge unlock requirements, ' +
    'mint an SD-BASE id (use only the Customer Commons registry), or choose/forge the constellation hash ' +
    '— the Swordsman derives the hexagram, the hash, and the registry+unlock checks from your proposal. ' +
    'Tuning to those checks is collusion (det(Σ)→0) and yields a mirage. You also cannot render — ' +
    'myswordsman owns the canvas; you send intelligence, it draws.',
  measurePrompt: (round) =>
    `EOS: read the current page (deep-scan via mymage) and the domain\'s current bilateral record. ` +
    `Report the baseline Φ, the detected trackers / dark patterns / inference surface, and which SD-BASE ` +
    `variants are candidate improvements. Round ${round}.`,
  huntPrompt: (p, i) =>
    `THE GAP: for proposal #${i} [SD-BASE ${p.sdBaseId}], derive the held-out witnesses the Mage cannot tune: ` +
    `compute the blade (UOR.fromSpectrum of dims≥0.5) and hexagram (dimensionsToHexagram), the constellation ` +
    `hash, and look up sdBaseId in the registry. Return them; they are candidates, not a result.`,
  assayPrompt: (p, h, i) =>
    `SWORDSMAN ⚔️ (load agentprivacy-horizon-gate): gate proposal #${i}. (1) CLIFF-WATCHER: does Φ=Σ·Δ·Γ ` +
    `improve as a PRODUCT (not one axis at the friction cliff)? (2) checkCanForge (totalForgings≥layer*3, ` +
    `domainsForged≥floor(layer/2)); (3) hash valid (cast spells hash to hexagram ${JSON.stringify(h.hexagram)}); ` +
    `(4) sdBaseId in registry (${h.sdBaseInRegistry}); (5) UOR.verifyCriticalIdentity(blade). Validated ONLY if ` +
    `ALL pass AND Φ beats the domain\'s bilateral record; else MIRAGE (name it). Record bilaterally on validate.`,
  criticPrompt: (validated, all) =>
    `POROS: ${validated.length} validated agreement(s). Classify structural (Φ genuinely lifted at acceptable ` +
    `friction) / probe-limited (gamed one axis, lost the product or broke usability) / noise. One next lead.`,
  schemas: { proposal, hunt, verdict, critic },
  stop: { dryRounds: 2, maxRounds: 8 },
  isValidated: (v) => v && v.validated && v.verdict === 'validated' && v.beatsFrontier,
  isStructural: (c) => c && c.classification === 'structural',
};
