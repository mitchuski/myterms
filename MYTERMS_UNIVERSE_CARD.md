# ⚔️📜✍️🔐 MyTerms — an Agentprivacy Universe Card

*Where MyTerms sits in the City of Mages and the wider adventure. A reference card so this
repo echoes back into the universe it belongs to. Cross-references are real file paths — verify
against the conjecture register (`agentprivacy-docs/research/CONJECTURE_REGISTER_V6.md`), which
wins on any disagreement.*

> **Essence:** MyTerms is **the agreement layer** — the roster of terms *written by persons, not
> imposed but proposed*. In the City it is a **kindred-protocol**: a charter that binds humans
> and their technologies, embodied by two browser familiars and witnessed at the Threshold.
> *Honest line, always:* the standard specifies **agreement, not enforcement**.

---

## I. What it is

- **The standard:** IEEE 7012-2025 (machine-readable personal privacy terms), hosted neutrally by
  **Customer Commons** (`customercommons.org/p7012`). The **SD-BASE roster** — `SD-BASE` (most
  protective: service-delivery only) · `-DP` · `-A` · `-AT` · `-ATP` · `-ATP-S3P`.
- **In the equation:** it is the **Σ axis** (agent separation) of `Φ = Φ_agent(Σ)·Φ_data(Δ)·Φ_inference(Γ)`,
  with coarse Δ. It is **silent on Γ** — inference control is agentprivacy enforcement layered on top.
- **Sigil:** `⚔️📜✍️🔐` — blade (boundary), scroll (bilateral chronicle), signature (consent), lock
  (trust anchored in the registry). *(superseded the earlier ✨.)*

## II. Where it stands in the City of Mages

| Site | Vertex | Keeper / gem | MyTerms' place |
|---|---|---|---|
| **The Covenant Temple** | **V55** | **Manifestia 🤲🌿** (first Priest tier) | MyTerms admitted as a **kindred-protocol**, sibling to the Covenant of Humanistic Technologies (human.tech) — both charters that bind persons and their tools. |
| **The Threshold District** | **V59** | **Hermaion ⚚** · **alexandrite** | The agreement-witnessing hub. Hermaion's alexandrite **shifts green (Mage) ↔ red (Swordsman)** — the dual-agent archetype encoded in stone (the *archetype-modal* shop). |
| ↳ Portal Room | V59 | **Pandia 🌕** · moonstone | Agents dispatched with trust anchored by Selene's **Amnesia Protocol** — trust persists without memory of origin. |
| ↳ The Familiars | V59 | **Faunia 🪶** · amber | Companion-witness; the two extensions are *familiars*, found on every page. |
| **Loom of Programmable Covenants** | V55 | 🪢 VRC mana | MyTerms agreements produce **bilateral chronicles** — the evidentiary basis the Loom compiles against. |

## III. The two keepers (the extensions as characters)

The dual-agent pair — held apart so neither can betray the other (`I(X;Y_S,Y_M)=I(X;Y_S)+I(X;Y_M)`):

- **⚔️ The Swordsman — `myswordsman/`** (the Prover; IEEE-7012 Individual's Agent / Recorder /
  Auditor). *"Proffers, negotiates, signs, records, and returns to verify."* Spells: **SLASH**
  (assert boundary), **WARD** (gate). Holds `checkCanForge` (the unlock lattice the Mage cannot
  tune), the constellation-hash witness, and the bilateral chronicle. *Lives in a separate Chrome
  process — separate storage, separate permissions.*
- **🧙 The Mage — `mymage/`** (the Proposer). Deep-scans the page, **proposes** which SD-BASE term +
  spell constellation fits — and never enforces. Spells: **SCAN**, **INSCRIBE**. Contributes the
  Γ-axis posture beyond the standard. *Carries the spellbook; cannot render — it sends intelligence,
  the Swordsman draws.*
- **⿻ The Gap** — Customer Commons registry + constellation-hash + bilateral record. The held-apart
  separation **is** the security model.
- **☀️⊥🌙 The Celestial Dual Ceremony** — the operational root of trust (spellweb `spell-celestial-key`):
  the Sun ceremony (disclosure, Swordsman-forward) ⊥ the Moon ceremony (reflection, Mage-forward).
  *"The overlap is the ceremony. The blade swap is the trust."* A MyTerms agreement-forging **is** a
  dual-ceremony event.

## IV. Appearances across the adventure

| Where | Reference |
|---|---|
| **Tome V · The Crafting** | Act 14 *The City of Mages* names the **MyTerms Alliance** among future kindred-protocol cities (`cityofmages/tomes/tome-v-the-crafting/14-the-city-of-mages.md`) |
| **Act XXVIII** | *The Celestial Ceremony Engine* — the Sun/Moon ceremony as the agreement-forging (`spellweb/public/story/28-act-xxviii-the-celestial-ceremony-engine.md`) |
| **Cast roster** | MyTerms as kindred-protocol on **Manifestia** (`cityofmages/README.md` cast table; `cityofmages/tomes/cast/covenant/manifestia.md`) |
| **Threshold cast** | the archetype-modal dual-agent encoding (`cityofmages/tomes/cast/staff-shop/hermaion.md`) |
| **Spellweb graph** | `con-myterms` ("MyTerms / IEEE 7012 — the Swordsman's first blade in the browser"), `con-dualagent`, `doc-ieee7012-integration-plan`, `spell-celestial-key` (`spellweb/src/data/nodes.ts`) |
| **The extension lore** | `myswordsman/DUAL_EXTENSION_ARCHITECTURE.md`, `…/swordsman-extension-myterms-design.md`, `…/TheCelestialDualCeremony☀️⊥🌙.md`, the Dual Control Scheme |
| **The harness** | `myterms/harness/` — the dual-agent autoresearch loop that *operationalises* the lore (see `CHRONICLE_DUAL_AGENT_HARNESS_2026-06-11.md`) |

## V. Conjectures it touches

(Confidences per the V6 register, which is canon.) **C55** Privacy as Seventh Capital ·
**C56** Caduceus as pre-formal dual-agent symbol · **C58** Forge(t) ∥ Threshold sibling
Swordsman-suppliers · **C48** three-axis gating (Σ/Δ/Γ) · **C39** Cousin/kindred as ecosystem
primitive. MyTerms is the lived instance of the dual-agent separation those conjectures formalise.

## VI. The echo

This repo is no longer just a standards application — it is a **room in the City**. The two
familiars (`myswordsman` ⚔️ / `mymage` 🧙) are the keepers; the Threshold (V59) is where their
agreement is witnessed; the Covenant Temple (V55) is where the protocol is kindred-admitted; the
**dual-agent harness** (`myterms/harness/`) is the rite that makes the agreement *prove* itself
against a gate it cannot game. `neg ⊕ bnot → succ`: the blade and the spellbook, held apart, advance
one true step.

---

*Roles kept distinct: IEEE / Customer Commons host the standard; the City of Mages is the
narrative that situates it; agentprivacy supplies the enforcement the standard does not. The
standard specifies agreement, not enforcement. Sigil: ⚔️📜✍️🔐. Companion: `MYTERMS_UNIVERSE_CARD`
is a reference, not canon — the conjecture register and the grimoires are.* (⚔️⊥⿻⊥🧙)😊
