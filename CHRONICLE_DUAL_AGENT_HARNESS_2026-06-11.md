# Chronicle — MyTerms as a Dual-Agent Harness instance

*2026-06-11. How the agentprivacy dual-agent harness framework maps onto MyTerms /
IEEE 7012-2025, what was built, and the gaps found against the myterms.info standard.*

Honest framing, held throughout: a proposed agreement is validated only by the held-out
gate, never by the proposer. IEEE 7012 specifies **agreement, not enforcement**; the harness
optimises the person's *proposal choice*, it does not replace the standard's negotiation.

---

## 1. The mapping

The framework `agentprivacy-dual-agent-harness/` seats a **proposer (Mage 🧙)** and a
**prover (Swordsman ⚔️)** held apart by a **Gap** (a held-out gate the proposer cannot tune
to). MyTerms already ships this split — the harness wires it into a held-apart loop:

| Harness seat | MyTerms / IEEE 7012 | Code |
|---|---|---|
| 🧙 **Mage = proposer** | proffers which `SD-BASE-*` term + spell constellation fits the page | `mages-spell/` (deep-scan → INTELLIGENCE / CONSTELLATION) |
| ⚔️ **Swordsman = prover** | the Individual's Agent / Recorder / Auditor — gates, records, verifies | `swordsman-blade/` (`checkCanForge`, `constellationHash`, bilateral record) |
| ⿻ **the Gap** | the held-out checks the Mage cannot game | unlock lattice (`checkCanForge`) + Customer Commons registry + constellation-hash witness + bilateral record |
| objective | maximise `Φ = Φ_agent(Σ)·Φ_data(Δ)·Φ_inference(Γ)` at low friction | a **product** ⇒ a complement set of finders (Σ ⊥ Δ ⊥ Γ + friction) |

The algebra is already in the code: `swordsman-blade/src/lib/uor.ts` implements
`neg(bnot(x)) = succ(x)` on `Z/2⁶`, the five hammer strikes (only `and` costs — it moves
toward the null blade), and the holographic bound ("information lives on the 96-edge
boundary, not the 64-vertex bulk"). The harness's master inscription
`(⚔️⊥⿻⊥🧙)😊 = neg ⊕ bnot → succ` is the same identity.

## 2. What was built

In `agentprivacy-dual-agent-harness/harnesses/myterms/` (now a fork-ready package):
- `harness.config.mjs` — the 3-axis finders, schemas, and the `heldApartRule` (the Mage may
  not lower `checkCanForge`, mint an SD-BASE id, or forge the constellation hash).
- `runtime-extension.mjs` — the runtime adapter routing the engine's `agent()` calls by phase
  to the ceremony-channel message bus (`swordsman-blade/src/content/ceremony-channel.ts`).
- `run.mjs` — `makeBrowserBus()` (real, over `chrome.runtime` + the gate) + `makeMockBus()`.

The mock loop runs end-to-end (Measure → Propose×4 → Hunt → Assay → Critic), producing the
full verdict (`canForge`, `hashValid`, `registryValid`, `identityValid`, `beatsFrontier`).

## 3. Gaps found against the myterms.info / IEEE 7012-2025 standard

Double-checked the harness's assumptions against the standard (`G_ieee7012_integration_plan.md`,
`ieee7012_integration_plan_v2.md`, `7012-2025 (3).pdf`, README). Four gaps, three now fixed:

1. **SD-BASE roster — FIXED.** The real hierarchy is the roster, not invented ids:
   `SD-BASE` (service delivery only; no analytics/tracking/profiling — *most protective*) ·
   `SD-BASE-DP` (+data portability) · `SD-BASE-A` (2nd-party analytics) · `SD-BASE-AT`
   (+tracking) · `SD-BASE-ATP` (+profiling) · `SD-BASE-ATP-S3P` (+anonymised 3rd-party
   sharing). The harness mock used `SD-BASE-MIN`/`-B`, which do not exist — corrected to the
   real roster, with plain `SD-BASE` as the most-protective default.
2. **IEEE 7012 is silent on Γ — HONEST-FRAMING GAP (documented, not "fixed").** The standard
   maps primarily to **Σ** and gives **coarse Δ**; it does **not** cover **Γ** (inference /
   profiling control). So the harness's `gamma-inference` finder proposes terms that are
   **agentprivacy enforcement layered on top of the standard**, not expressible as a 7012
   `SD-BASE` term. The honest claim: the harness optimises Φ across three axes, but only Σ
   (and coarse Δ) is an IEEE-7012 agreement; Γ (and fine Δ) is the dual-agent enforcement the
   standard explicitly does not provide. (README already flags: "the standard specifies
   agreement, not enforcement.")
3. **Roles & first-party agency — FRAMING ALIGNED.** The 7012 roles (Individual's Agent,
   Proposer, Recorder, Auditor) are **all on the person's side**; `swordsman-blade` implements
   them. The **entity is the counterparty, not a harness seat.** First-party agency: the
   *Individual* proposes terms from the roster; the entity accepts / counter-offers / declines.
   So the harness's "Mage proposes / Swordsman proves" is *intra-agent* (both on the person's
   side); entity acceptability is captured by the **friction** finder, and the actual 7012
   exchange is a separate, single round.
4. **One-round negotiation (§A.1) — SCOPE CLARIFIED.** IEEE 7012 negotiation is **one round**
   (accept / counter-offer / decline). The harness's multiple rounds optimise the person's
   *choice of what to propose* (offline); they are **not** repeated negotiations with the
   entity. The held-out gate is the person-side validation (registry + unlock + hash + record),
   hosted neutrally by **Customer Commons** (`customercommons.org/p7012`) — which the harness's
   `registryValid` check correctly treats as un-tuneable by the Mage.

## 4. Disposition

The Σ/Δ/Γ product objective is the right shape, but the chronicle's honest line must travel
into any public claim: **IEEE 7012 / SD-BASE is the Σ (and coarse Δ) agreement layer; the
harness adds Γ and fine Δ as enforcement the standard does not specify.** Result attestation
(the bilateral record) can be κ-addressed via the star Swordsman's Key (spec §4.3).

Full spec: `agentprivacy-docs/specs/DUAL_AGENT_HARNESS_SPEC_v1.md` §6. Framework:
`agentprivacy-dual-agent-harness/`.

## 5. Addendum — reorg (same day)

To keep the dual-agent **labels** from being captured by this one standard, the MyTerms
extensions were given `my`-prefixed names and the project took ownership of its harness:

- `swordsman-blade/` → **`myswordsman/`** (⚔️ prover) · `mages-spell/` → **`mymage/`** (🧙 proposer),
  copied (source only) and renamed (`package.json`: `swordsman-blade`→`myswordsman`,
  `mage-spells`→`mymage`, fixing the old name drift). The bare `swordsman`/`mage` labels stay free
  for generic use. Cross-extension discovery is unaffected — the IDs are build-time placeholders
  (`*_EXTENSION_ID_PLACEHOLDER`), not directory-bound.
- The harness moved from `agentprivacy-dual-agent-harness/myterms/` to **`myterms/harness/`** — the
  `myterms` project now owns it (docs + harness + the two extensions as siblings). It still vendors
  the engine, so it forks as one self-contained unit. Mock re-verified from the new home.

(⚔️⊥⿻⊥🧙)😊
