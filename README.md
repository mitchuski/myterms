# myterms

**MyTerms Alliance application package — agentprivacy founding-member materials for IEEE Std 7012™-2025.**

This repository is the documentation bundle that accompanies agentprivacy's application to the MyTerms Alliance (Customer Commons) as a founding member. It is the canonical, externally-shareable set of docs explaining *who agentprivacy is, what we bring, and how IEEE 7012-2025 fits into our dual-agent architecture.*

Sibling repositories (local, not yet public):

- `swordsman-blade/` — browser extension implementing the **agreement layer** (IEEE 7012 Individual's Agent, Proposer, Recorder, Auditor roles).
- `mages-spell/` — browser extension implementing the **delegation layer** (the Mage operates inside the Σ-scope of agreements the Swordsman signs).

If those extensions and this docs package disagree, this repository wins — it is the public-facing claim set.

---

## Canonical version

- **Plan:** `ieee7012_integration_plan_v2.md` (April 22, 2026) — supersedes the February 2026 v1.
- **Privacy Value Model:** V5.4 — three-axis multiplicative gating `Φ_v5 = Φ_agent(Σ) · Φ_data(Δ) · Φ_inference(Γ)`. Any remaining references to V3.1 / golden duality multiplier are historical.
- **Framing:** IEEE 7012 is the **agreement layer**, not "foundational infrastructure." It maps primarily to Σ, provides coarse Δ policy, and is silent on Γ. Compliance is a precondition for measurable Σ — not a substitute for the dual-agent architecture or the cryptographic substrate below.
- **Inscription:** `⚔️📜✍️🔐` (four glyphs — blade, scroll, signature, lock). The decorative `✨` from earlier versions is retired.

---

## Defensible headline claim

Lift verbatim into publications, pitches, or external conversation:

> IEEE 7012-2025 provides the agreement layer agentprivacy's dual-agent architecture requires. Compliance with the standard is a precondition for the Σ (agent) axis being measurable, and enables bilateral chronicles that can serve as evidentiary basis for VRCs. Standard compliance alone is not equivalent to the full agentprivacy architecture; the standard specifies agreement, not enforcement.

---

## File index

### Application core

| File | Contents |
|---|---|
| `00_executive_brief.md` | One-page pitch: who we are, what we bring, what we ask, why now. |
| `00_myterms_alliance_application.md` | Full founding-member application: applicant summary, current status, IEEE 7012 alignment with Σ/Δ/Γ axis mapping, commitments, requests. |

### Supporting documents (letter-coded, referenced by both core docs)

| File | Contents |
|---|---|
| `A_privacy_is_value_equation.md` | Privacy Value Model **V5.4** — three-axis multiplicative gating; supersedes V3.1 scalar form. |
| `B_what_is_agentprivacy.pdf` | Mission document, thesis, architecture, body of work. *(PDF only in this tree.)* |
| `C_technical_integration.md` | IEEE 7012 agreement-layer implementation: protocol flow, agreement suite, MRPAZ headers, chronicle structure, enforcement boundary, "what IEEE 7012 is not." |
| `D_diffusion_strategy.md` | Live-coding streaming format, guest model, AIW #3 and IIW #43 plan, Privacy is Value V5 blog series (Parts 3–5) integration. |
| `E_sustainability_model.md` | Foundation ↔ Labs ↔ Community architecture; revenue model; non-profit partner relationships (Customer Commons, BGIN IKMP WG, ToIP, FPP). |
| `F_BGIN_collaboration_proposal.pdf` | Reference partnership with non-profit governance body. *(PDF only.)* |
| `G_ieee7012_integration_plan.md` | **Superseded.** February 2026 v1 plan; retained for history. Banner at top points to v2. |

### IEEE 7012 integration plans

| File | Contents |
|---|---|
| `ieee7012_integration_plan_v2.md` | **Current.** V2 (April 22, 2026) — reframes IEEE 7012 as the agreement layer, updates to PVM V5.4, re-targets spellbook integration (Second Person or Zero Knowledge, not a reopened First Person), consolidates docs, adds honesty/confidence calibration. |
| `G_ieee7012_integration_plan.md` | Superseded v1 (see above). |

### Standard reference

| File | Contents |
|---|---|
| `7012-2025 (3).pdf` | IEEE Std 7012™-2025 published PDF. **Copyrighted by IEEE (©2026).** See attribution rules below. |

### PDFs of markdown docs

Most letter-coded markdown files have accompanying `.pdf` renders for distribution. The PDFs currently reflect the February 5, 2026 snapshot; regeneration against the April 22, 2026 markdown refresh is pending.

---

## Working group attribution

Whenever IEEE 7012-2025 is discussed substantively, acknowledge:

- **Doc Searls** — Chair
- **Justin Byrd** — Vice Chair
- **Mary Hodder** — Editor
- **Scott Mace** — Secretary
- **Customer Commons** — Neutral non-profit host; registry at https://customercommons.org/p7012/

The full balloting group is listed on page 7 of the standard PDF and should be acknowledged in any publication that discusses the standard substantively.

---

## Copyright and attribution rules

When any document in this repository references the IEEE 7012-2025 standard:

- **Paraphrase** all definitions and specifications. Do not quote more than a few words at a stretch.
- **Do not reproduce** Figure A.1 (the sequence diagram). Link to the IEEE Xplore listing or the Customer Commons mirror instead.
- **Customer Commons** is named throughout the standard as the neutral host (footnote 8, Annex A opening); this attribution must appear wherever the standard is referenced.
- **IEEE AI-training disclaimer (p.4):** the standard PDF must not be ingested into AI training corpora without IEEE SA's written consent. Reference and paraphrase the standard; do not bundle the PDF as training material.

---

## Honesty calibration (what is claimed vs. what is proved)

**Proved:**
- IEEE 7012-2025 is a published, approved standard (approved 4 November 2025; published 20 January 2026).
- §5.4.3 constrains contracts to exactly two parties.
- §A.1 caps negotiation at one round.
- §5.2.4 specifies bilateral immutable recording.

**Architectural claim (defensible, not theorem):**
- Mapping IEEE 7012 primarily to the Σ axis of PVM V5.4 is consistent with §1.1 scope and with V5.4's axis definitions. A reviewer could reasonably argue that `SD-BASE-*` granularity contributes more to Δ than "coarse-grained" suggests.
- The claim that a single-agent monolith scores Σ ≈ 0 requires the separation bound `I(S;M|FP) < ε*` to be empirically measurable, which remains to be demonstrated.

**Conjecture (not load-bearing):**
- That golden-ratio splits or φ-normalized quantities have any special status in bilateral agreement protocols. Treat as speculative.

---

## How to read this repo

**If you are the MyTerms Alliance / Customer Commons:**
1. `00_executive_brief.md` for the one-page pitch.
2. `00_myterms_alliance_application.md` for the full application.
3. Letter-coded docs A–E for depth on math, technical implementation, diffusion, and sustainability.

**If you are an implementer or standards body looking at our IEEE 7012 integration:**
1. `ieee7012_integration_plan_v2.md` is the current plan.
2. `C_technical_integration.md` for the agreement-layer implementation details.
3. `A_privacy_is_value_equation.md` for how the standard maps onto PVM V5.4.

**If you arrived here from one of the sibling extensions:**
- The extension directory already has a copy of `CHRONICLE_MYTERMS_V2_ALIGNMENT_2026-04-22.md`. That chronicle is the bridge between this docs package and the extension code.

---

## Contact

**privacymage**
- mage@agentprivacy.ai
- https://agentprivacy.ai
- https://sync.soulbis.com
- https://intel.agentkyra.ai

Open source:
- https://github.com/mitchuski/myterms (this repository)
- https://github.com/mitchuski/agentprivacy-spellbook
- https://github.com/mitchuski/agentprivacy-docs

---

*The blade slashes. The contract binds. The standard names what the contract is. All three serve the First Person.*

`⚔️📜✍️🔐`
