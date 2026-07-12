# MyTerms — Standards-Community Presentation Brief

**A guided flow through the agentprivacy MyTerms / IEEE Std 7012™-2025 body of work.**
Prepared 2026-07-01 · Source: whole-suite crawl of `C:\Users\mitch`. This brief is a *speaker's map*: each station is a slide-shaped beat with a one-line claim, the verbatim line to put on screen, the evidence behind it, and where it lives on disk. Present the stations in order for a 20-minute talk; drop the appendix into a leave-behind.

> **The one sentence to open and close with:**
> *"The standard specifies agreement, not enforcement."*

---

## The spine of the talk (10 stations)

| # | Station | The claim in one line |
|---|---------|-----------------------|
| 0 | The problem | Notice-and-consent is an attack pattern; the individual never proposes. |
| 1 | The standard | IEEE 7012-2025 (MyTerms) is a *thin waist* — it does one thing at the agreement layer. |
| 2 | The invitation pattern | The First Person proposes; the entity accepts, counter-offers **once**, or declines. |
| 3 | Two parties, one witness | The agreement is strictly bilateral; agents, devices, and trust communities are the fabric *around* it. |
| 4 | Three registers | Every agreement exists at once as plain-language, legal, and machine-readable. |
| 5 | The architecture | Swordsman signs the agreement (Σ); Mage acts inside its scope (Γ); neither is the other. |
| 6 | The roster | Terms are *consumed* from Customer Commons (SD-BASE / PDC), never minted locally. |
| 7 | It runs | A negotiation API, two browser extensions, and a capability broker already demonstrate the pattern. |
| 8 | The witness | Gödel: a self-certifying agreement is a contradiction — trust needs a witness from outside (VRCs). |
| 9 | The ask | Founding membership in the MyTerms Alliance; we bring implementation, diffusion, narrative, sustainability. |

---

## Station 0 — The problem

**Claim:** Today's terms-of-service is a one-sided attack: the platform writes the terms, you accept or leave. The individual has no way to *propose*.

**On-screen (verbatim):**
> "IEEE 7012 implements the invitation pattern — acceptance before proposal — rather than surveillance's attack pattern of extraction without consent."

**Speaker note:** This is the reframe the whole talk hangs on. Everything after is *how* you invert it.

---

## Station 1 — The standard is a thin waist

**Claim:** IEEE Std 7012™-2025, *Machine Readable Personal Privacy Terms* (nicknamed **MyTerms**), specifies exactly one thing — the routine by which a person and an entity *agree* — and deliberately nothing else.

**On-screen (verbatim, from `ieee7012_integration_plan_v2.md`):**
> "IEEE 7012 is a thin waist. … the standard does exactly one thing, and does it at the agreement layer. Everything above (delegation, VRCs, trust graphs) and below (enforcement, chronicle, cryptographic primitives) is the implementer's responsibility."

**Speaker note — the honest boundary (this is what earns credibility with a standards room):**
> "IEEE 7012 is the *protocol for agreeing about* the three axes. The enforcement that actually moves the value needle happens below (cryptographic substrate) and above (dual-agent architecture) the standard. The Swordsman implements the agreement; the Mage operates inside it; the ZK substrate provides the guarantees the agreement alone cannot."

**Attribution (non-negotiable — put it on the slide):** Working group — **Doc Searls (Chair)**, Justin Byrd (Vice Chair), Mary Hodder (Editor), Scott Mace (Secretary); neutral host **Customer Commons** (`customercommons.org/p7012/`, `myterms.info`). Approved 4 November 2025; cite publication as "January 2026."

**Where it lives:** `myterms/ieee7012_integration_plan_v2.md` (current, 2026-04-22); superseded v1 at `myterms/G_ieee7012_integration_plan.md`; the published standard PDF `myterms/7012-2025 (3).pdf` (⚠️ IEEE copyright — must not be ingested into training corpora).

---

## Station 2 — The invitation pattern

**Claim:** The First Person **proposes** terms (Proposer role, §5.2.1.3). The entity may **accept, make one counter-offer, or decline** — negotiation is capped at a single round (§A.1).

**On-screen (verbatim, staged wiki page "myTerms: The Agreement Layer"):**
> "Instead of a platform writing terms you accept or leave, the individual proposes the terms and the organization accepts, counter-offers (once), or declines. … It is the invitation pattern — acceptance before proposal — in place of surveillance's attack pattern."

**Where it lives:** the canonical Invitation Protocol spec `agentprivacy_master/docs/tomes/specs/11-the-invitation-protocol.md`; the staged wiki page `.wiki/mitch.vision.localhost/pages/myterms-the-agreement-layer`.

---

## Station 3 — Two parties, one witness

**Claim:** The agreement is strictly **bilateral** — a First Person and a Second Party, two signatures, two kept copies (a bilateral chronicle neither can later deny, §5.2.4). Agents, devices, and verifiable trust communities are **not parties** — they are the fabric around the agreement.

**On-screen (verbatim, the dramatized version — good slide):**
> "every contract has exactly two named parties. Not one, not many, always two. The First Person stands on one side. The Entity stands on the other. Neither can be absent. Neither can be merged. The ⊥ between them is the standard itself."

**Speaker note — the self-caught error worth telling as a story:** an early draft wrongly described "four parties." It was corrected to strictly two-party bilateral, with agents/devices/VRCs as the surrounding fabric. Telling this signals rigor.

**Where it lives:** `agentprivacy_master/src/app/hall/page.tsx` (the civic "City Hall" that frames what gets counter-signed); `hall-bilateral-witness-v1.md` — *"Two parties, one witness… The blade belongs to neither — it belongs to the gap between."*

---

## Station 4 — Three registers ("One Logic, Many Skins")

**Claim:** Every MyTerms agreement exists simultaneously in three synchronized formats, so trust is comprehensible at every layer.

**On-screen (verbatim):**
> "Machine-readable. Human-readable. Lawyer-readable. All three — because trust requires comprehension at every layer."

- **Plain Language** (human) — what the person actually understands.
- **Legal** (lawyer) — the Customer Commons canonical text.
- **Machine-readable** — JSON-LD over the **W3C DPV** vocabulary, so agents and devices parse and enforce it.

**Where it lives:** encoded in `myterms/C_technical_integration.md` via `p7012:hasHumanReadableFormat` / `p7012:hasLegalReadableFormat` alongside the machine-readable JSON-LD.

---

## Station 5 — The architecture: Swordsman ⊥ Mage

**Claim:** The dual-agent split *is* the standard's role boundary made operational. The **Swordsman** is the individual's agent — Chooser, Proposer, Recorder, Auditor — and **signs**. The **Mage** is a knowledge agent that operates strictly *inside the scope of what was signed* and **never signs anything**.

**On-screen — the single best slide for a standards audience (verbatim, defensible claim):**
> "IEEE 7012-2025 provides the agreement layer agentprivacy's dual-agent architecture requires. Compliance with the standard is a precondition for the Σ (agent) axis being measurable, and enables bilateral chronicles that can serve as evidentiary basis for VRCs. Standard compliance alone is not equivalent to the full agentprivacy architecture; the standard specifies agreement, not enforcement."

**The three axes (PVM V5.4 gating term `Φ = Φ_agent(Σ)·Φ_data(Δ)·Φ_inference(Γ)`) mapped honestly to 7012:**
- **Σ (agent separation)** — 7012 defines the person-agent/entity role boundary, making separation *testable*, but is **necessary-not-sufficient**; a compliant monolith can still score Σ≈0.
- **Δ (data)** — the SD-BASE/PDC agreement IDs are a *coarse* data-policy lattice; cryptographic enforcement (ZK/TEE) lives below the standard.
- **Γ (inference)** — the standard is **mostly silent**; inference-over-published-data is out of scope.

**The inscription (put the four glyphs on screen): `⚔️📜✍️🔐`** — **blade** (boundary/enforcement) · **scroll** (the bilateral contract) · **signature** (both parties consent) · **lock** (trust anchored in the registry). *(The decorative fifth glyph `✨` is retired.)* The master duality is `(⚔️⊥⿻⊥🧙)😊` — Swordsman ⊥ plurality ⊥ Mage, serving a First Person.

**Where it lives:** the extension pair `myswordsman/` + `mymage/` (and sibling copies `swordsman-blade/` + `mages-spell/`); the role split is real in code — only the Swordsman background has a signing path; the Mage runs read-only until it discovers the Swordsman, then acts inside scope. ⚠️ *See "Naming to reconcile" below — there are two extension-pair directories.*

---

## Station 6 — The roster (consumed, not minted)

**Claim:** Standard terms come from the neutral Customer Commons registry — like Creative Commons for privacy. agentprivacy consumes them; it never invents its own IDs.

**On-screen:** the SD-BASE ladder —
`SD-BASE` (most protective; service delivery only) → `SD-BASE-DP` (+ portability) → `SD-BASE-A` (+ analytics) → `-AT` (+ tracking) → `-ATP` (+ profiling) → `-ATP-S3P` (+ anonymized 3rd-party sharing) — plus the personal-data-contribution set **`PDC-INTENT`** (intentcasting), **`PDC-AI`** (AI-training contribution), **`PDC-GOOD`** (public-good/research).

**Honest gap to name aloud:** the extensions' own 7-stance / 8-spell UX tokens are **not yet grounded** in real Customer Commons IDs — a tracked alignment item.

---

## Station 7 — It already runs (the demonstrable spine)

**Claim:** This is not a whitepaper-only proposal. Three working artefacts demonstrate the pattern end-to-end today.

1. **A live negotiation endpoint** — `BGINAI/BGINAI_Block14/src/app/api/myterms/negotiate/route.ts`, a two-party MyTerms term-exchange API, with an agreement-layer design spec `block14_updates/13_MYTERMS_AGREEMENT_LAYER.md`. This is the **BGIN Block 14** working-group implementation.
2. **The two browser extensions** (Chrome MV3) — the Swordsman/Mage pair: two orbs over any page (your terms ⚔ vs. the site's ✦); converge them and a MyTerms agreement is forged, hashed into a privacy-preserving `constellationHash`. *Honest status:* an ECDH key exchange between the pair is scaffolded, but `signSpell()` is still a placeholder — cryptographic sealing is designed, not finished.
3. **A capability broker** — `.claude/skills/fedwiki-cohere-sync/broker.js`, which delegates **host-scoped write access** to an agent without ever exposing the credential. Its own source names it *"a miniature of the MyTerms pattern."*

**On-screen (verbatim, broker.js) — the cleanest demonstration of scoped delegation:**
> "WIKI_GRANT (host-scoped permission) = delegation inside an agreed scope: the agent acts only within what it was granted, never the full authority the cookie actually carries. … The IEEE 7012 version: the site owner publishes machine-readable terms, the agent presents an agreement, and the broker honours a push ONLY against a valid signed agreement, deriving the allowed scope FROM that agreement instead of from WIKI_GRANT."

**Speaker note:** the broker is the honest bridge — it does capability-scoped, least-privilege, fully-audited delegation *today* (env-var scope), with a deliberate seam where a signed 7012 agreement drops in to *become* the scope. It makes the abstract concrete: "here is delegation-inside-scope you can run right now; here is exactly the line where the standard slots in."

---

## Station 8 — The witness (why it is built incomplete on purpose)

**Claim:** The temptation is a *perfect*, self-certifying agreement. Gödel says that is impossible — and that impossibility is a feature. Trust needs a witness from outside the system that holds it. That witness is the **verifiable trust community (VRC)**: it signs nothing; it *measures fidelity from outside* and vouches.

**On-screen (verbatim):**
> "It is tempting to want the perfect agreement: complete, closed, certifying its own correctness … Gödel's work tells us this is not merely hard but impossible. … a self-certifying agreement is a contradiction wearing confidence. This is why the trust community is not a party but a witness."

**The lintel / proverb (the memorable close):**
> "A trust that certifies itself is the one you cannot trust."

**The RPP tie-in (human ↔ machine):** the **Relationship Proverb Protocol** (also styled *Proof of Proverb Revelation Protocol*) inverts identity verification — recovery/trust is gated by speaking a *human-readable proverb that binds a relationship*, which links to a *machine-readable* recovery credential. It is the same three-register logic applied to trust itself.

**Where it lives:** RPP skill `agentprivacy-skills-v5/role/agentprivacy-recovery-rpp/`; contribution reference `agentprivacy.guide/site/guide/reference-contributing-to-the-proof-of-proverb-revelation-protocol.html`; build docs in root dirs `proverb revelation protocol/` and the on-chain inscription side `zcash proverb protocol/`.

---

## Station 9 — The ask

**Claim:** agentprivacy applies for **founding membership in the MyTerms Alliance**, bringing four things a standard needs to reach adoption:

- **Implementation** — production Swordsman + Mage, the BGIN Block 14 negotiate API.
- **Diffusion** — weekly live-coding streams, AIW/IIW venues (`myterms/D_diffusion_strategy.md`).
- **Narrative** — the "City of Mages" canon that makes the standard *legible and memorable* (five Spellbooks + Grimoire).
- **Sustainability** — a Foundation ↔ Labs ↔ Community model (`myterms/E_sustainability_model.md`).

**Urgency line:** a 2–3 year window before surveillance architectures lock in.

**On-screen close (the sign-off proverb):**
> "The blade slashes. The contract binds. The standard names what the contract is. All three serve the First Person."

---

## Honest status ledger (put this in the leave-behind, not on a slide)

| Item | Status |
|------|--------|
| IEEE 7012 integration plan v2 (PVM V5.4) | ✅ current operative text |
| V6 edition of the integration plan | ⏳ **queued, not yet drafted** (V6 papers exist; a V6 *MyTerms integration plan* does not) |
| BGIN Block 14 negotiate API | ✅ code exists |
| Browser-extension convergence UI | ✅ built; ⚠️ `signSpell()` is a placeholder — sealing unfinished |
| Cookie/capability broker | ✅ working (env-var scope; 7012-signed scope is the designed next step) |
| SD-BASE/PDC grounding of UX tokens | ⚠️ not yet mapped to real Customer Commons IDs |
| Grimoire `standards.ieee_7012_2025` block | ⚠️ planned, not yet in the JSON |
| Staged wiki pages (agreement-layer + trust-layer) | 🟡 **staged, NOT published** (blocked on a `mitch.vision.ide.earth` owner cookie) |
| Letter-doc PDFs (A–G) | ⚠️ Feb 5 2026 renders; stale vs. the April 22 markdown — regeneration pending |
| PVM version | ✅ V5.4 operative; V6 (time-dependent reconstruction R(t)) noted forward |

**Naming to reconcile before you present code:** there are **two** extension-pair directories — `swordsman-blade/`+`mages-spell/` and `myswordsman/`+`mymage/` — carrying near-identical MyTerms docs. Confirm which pair is the one you demo/point people to, so the talk cites a single canonical repo. Same duplication for docs (`agentprivacy-docs/` is authoritative vs. `agentprivacy_nexus/…-main/` and `Downloads/…-main` exports) and skills (`agentprivacy_master/agentprivacy-skills/…-v5/` authoritative vs. root `agentprivacy-skills/` mirror).

---

## Appendix — the body of work by location (the "dream crawl" result)

**A. The standards-facing docs package — `myterms/`** (public: `github.com/mitchuski/myterms`)
- Application core: `00_executive_brief.md`, `00_myterms_alliance_application.md`
- Letter docs: A `A_privacy_is_value_equation.md` (PVM V5.4 math) · B `B_what_is_agentprivacy.pdf` · C `C_technical_integration.md` (the agreement-layer impl spec) · D `D_diffusion_strategy.md` · E `E_sustainability_model.md` · F `F_BGIN_collaboration_proposal.pdf` · G `G_ieee7012_integration_plan.md` (superseded)
- Plans: `ieee7012_integration_plan_v2.md` (current) · the standard PDF `7012-2025 (3).pdf`
- Universe/harness: `README.md`, `MYTERMS_UNIVERSE_CARD.md`, `chronicles/DREAM-2026-06-29.md`, `harness/`

**B. The working implementation — `BGINAI/`** (BGIN Block 14)
- `BGINAI_Block14/src/app/api/myterms/negotiate/route.ts` (negotiation endpoint) · `src/lib/ceremony/constellation.ts`
- `block14_updates/13_MYTERMS_AGREEMENT_LAYER.md` (+ 01–09 design spec series) · older snapshot `BGINAI - 13/`

**C. The extension pair(s)** — `myswordsman/`+`mymage/` and `swordsman-blade/`+`mages-spell/`
- Shared: `ieee7012_integration_plan_v2.md`, `CHRONICLE_MYTERMS_V2_ALIGNMENT_2026-04-22.md`, `DUAL_EXTENSION_ARCHITECTURE.md`, `TheCelestialDualCeremony☀️⊥🌙.md`
- Swordsman side: `swordsman-extension-myterms-design.md`, `src/content/blade-forge.ts` (hexagram→blade), `src/background/index.ts` (signing path, ECDH)
- Mage side: `agentprivacy-living-spellbook-design.md`, `src/lib/spell-definitions.ts` (each sticker → a `myTermsMapping` + proverb)

**D. The site & canon — `agentprivacy_master/`** (narrative + directory; no `/myterms` route)
- `/hall` (`src/app/hall/page.tsx`) is MyTerms' civic home · seeded promise "Own MyTerms" (`src/lib/promises/default-promises.ts`) · Swordsman onboarding `docs/guides/first_spellbook_swordsman_v2.md` (the defensible claim) · Invitation Protocol spec `docs/tomes/specs/11-the-invitation-protocol.md` · grimoire one-liner: *"Machine readable personal privacy terms, the swordsman's first blade."*

**E. The document repo & V6 — `agentprivacy-docs/`** (git-backed, authoritative)
- `papers/v6/privacy_value_v6.md` (+ formal spec, companion, compressed) · `papers/whitepapers/swordsman_mage_whitepaper_v6_3.md` · `plans/V6_*` (mention MyTerms; a V6 *integration plan* is not yet drafted) · `reference/IEEE_7012_QUICK_REFERENCE.md`

**F. The federation — `.wiki/` + `fedwiki/` + `agentprivacy.guide/`**
- Cookie broker `.claude/skills/fedwiki-cohere-sync/broker.js` + `.wiki/.creds/` (host-scoped, agent never sees the secret) + `_push_myterms.js`
- Staged pages: `myterms-the-agreement-layer`, `bonjour-by-hand-and-the-trust-layer-above`, `welcome-visitors` (all staged, not pushed)
- Chronicle: `.wiki/chronicles/2026-06-28_lan_workshop_mage_sync_networking_reflection.md` (the LAN ceremony / trust task: resolve → handshake → exchange → seal)
- FedWiki source nodes: `fedwiki/doc-myterms-alliance-application.json`, `fedwiki/doc-ieee7012-integration-plan.json`
- Built federation: `agentprivacy.guide/site/research/reference-ieee-7012-2025-quick-reference.*`, `guide/reference-contributing-to-the-proof-of-proverb-revelation-protocol.html`

**G. The skills — `agentprivacy-skills-v5/`** (canonical, V5.5)
- `role/agentprivacy-recovery-rpp/` (RPP — proverb↔credential) · `role/agentprivacy-swordsman-browser/` · `role/agentprivacy-consent-infrastructure/`, `-policy-governance/`, `-boundary-enforcement/`, `-personhood-sybil/`, `-spell-encoding/` · MyTerms-referencing personas (person, warden, witness, priest, ambassador, registry-keeper…) · repo docs `MAPPING.md`, `runecraft-protocol-spec-v1.md`
- Mirrors: root `agentprivacy-skills/`, and fedwiki-projected `SKILL.md` copies under `.wiki/skill-fedwiki/` and `agentprivacy.guide/site/skill/`

**H. The proverb / trust layer (RPP)**
- `agentprivacy-skills-v5/role/agentprivacy-recovery-rpp/` · root `proverb revelation protocol/` (build/integration) · root `zcash proverb protocol/` (on-chain inscription: human proverb → machine-readable recovery credential)

**I. Adjacent & lineage nodes** — `spellweb/` (universe graph nodes/edges reference MyTerms) · `cityofmages/` grimoires (invitation/agreement-layer) · `star/` (Swordsman-Key ↔ ZK chronicles) · `weaver_archon/` (Archon × agentprivacy convergence) · `kwaai_agentprivacy/proof-of-understanding-kwaai.html` · `Downloads/files - 2026-01-28…/` (early Alliance packet) · `_snapshots/…/second-person-spellbook…/`

---

*Inscription:* `⚔️📜✍️🔐` — blade · scroll · signature · lock. *"Just another swordsman, wielding standard and steel."*
