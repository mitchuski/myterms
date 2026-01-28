# IEEE 7012-2025 Integration Plan
## Digesting the Standard & Updating 0xagentprivacy Documentation

**Date:** January 28, 2026  
**Document Status:** IEEE Std 7012™-2025 Published January 20, 2026  
**Prepared for:** privacymage / 0xagentprivacy

---

## Executive Summary

IEEE 7012-2025 has been officially published. This is the foundational standard for MyTerms that the Swordsman browser agent implements. The standard includes explicit provisions for AI agents, machine-readable formats, HTTP header protocols, and a bilateral agreement architecture that aligns directly with the dual-agent thesis.

This document provides:
1. A structured plan for updating the formal agentprivacy documentation
2. Suggestions for expanding the First Person Spellbook with a new Act

---

## Part I: Documentation Update Plan

### Phase 1: Extract Key Formal Elements (Week 1)

Create a canonical reference document extracting the following from IEEE 7012-2025:

**1.1 Definitions to Add to GLOSSARY_MASTER**

| Term | IEEE 7012 Definition | Integration Notes |
|------|---------------------|-------------------|
| Agent | "An actor that works on behalf of a person to represent them, to present proposed terms and agreements to entities" | Aligns with Swordsman function |
| Agreement | "A compound set of terms or clauses, proposed and offered before a formal contract" | Basis for MyTerms negotiation |
| Contract | "A mutual agreement between parties that creates mutual obligations and is enforceable by law" | Post-negotiation signed artifact |
| Entity | "Any organization with which a person makes a contractual agreement. An entity can only be an organization" | Second party definition |
| First Party | Individual (always) | Aligns with First Person |
| Second Party | Entity (always) | Service provider |
| Policy | "A set of legal, political, organizational, functional, and technical obligations for communication and cooperation" | ISO 22600-2:2014 source |
| Proposer | "A person who advances terms and agreements to another person or entity" | The First Person role |
| DPV | "Data Privacy Vocabulary" - machine-readable metadata for data processing | W3C standard integration |
| Machine-readable | "A term, set of terms, or completely written contract that can easily be processed by a computer" | Core interoperability requirement |

**1.2 Agreement Taxonomy for Whitepaper**

The standard defines a structured set of agreements. Update the whitepaper to reference:

**Service Delivery Agreements (SD):**
- SD-BASE: Service delivery only, no analytics/tracking/profiling, data portability optional
- SD-BASE-DP: With data portability
- SD-BASE-A: Analytics by 2nd party permitted
- SD-BASE-AT: Analytics + Tracking by 2nd party permitted
- SD-BASE-ATP: Full analytics/tracking/profiling by 2nd party permitted
- SD-BASE-ATP-S3P: Plus anonymized data sharing with 3rd parties

**Personal Data Contribution Agreements (PDC):**
- PDC-INTENT: Intentcasting - going to market with structured requirements
- PDC-AI: AI training data contribution
- PDC-GOOD: Public good data contribution

**1.3 Technical Specifications for Research Paper**

The standard provides machine-readable formats that need documentation:

- HTTP header format (MRPAZ protocol)
- RDF/Turtle representation
- JSON / JSON-LD schemas
- Pickle (PKL) formats
- Bitwise encoding (CONTRACT ZONE)

### Phase 2: Update Formal Documents (Weeks 2-3)

**2.1 GLOSSARY_MASTER_v2_3.md**

Add new section:

```markdown
## IEEE 7012-2025 Canonical Definitions

### Standard Reference
IEEE Std 7012™-2025, "IEEE Standard for Machine Readable Personal Privacy Terms"
Published: January 20, 2026
Hosted: Customer Commons (customercommons.org/p7012)

[Add all terms from 1.1 above with status: ✅ IEEE STANDARD]
```

**2.2 swordsman_mage_whitepaper_v4_8.md**

Create new version with:

- Updated MyTerms section with IEEE 7012-2025 as canonical standard
- Agreement taxonomy table
- Reference to Customer Commons as neutral nonprofit host
- Integration with DPV (Data Privacy Vocabulary)
- HTTP header protocol documentation
- Figure from IEEE 7012 showing agent interaction workflow (if permissible)

Key section to add:

```markdown
### 4.X The MyTerms Foundation: IEEE 7012-2025

The Swordsman browser agent implements IEEE Std 7012-2025, 
the IEEE Standard for Machine Readable Personal Privacy Terms.

**Core Innovation**: The standard inverts the traditional 
notice-and-consent model. Individuals propose terms as first 
parties; organizations accept, negotiate, or decline as second 
parties.

**Promise Theory Alignment**: IEEE 7012 implements the 
invitation pattern—acceptance before proposal—rather than 
surveillance's attack pattern of extraction without consent.

**Key Properties**:
- Bilateral agreements (not unilateral ToS)
- Machine-readable formats (JSON-LD, RDF, HTTP headers)
- Human-readable plain language
- Legal-layer formal contracts
- Neutral nonprofit hosting (Customer Commons)
```

**2.3 dualprivacy_researchpaper_v3_6.md**

Add formal reference section:

```latex
\subsection{Standards Foundation}

The Swordsman privacy agent implements IEEE Std 7012-2025 
\cite{ieee7012}, which provides machine-readable privacy 
terms enabling automated agent-to-agent negotiation.

The standard aligns with the dual-agent architecture through:
\begin{itemize}
\item First-party agency: individuals propose terms
\item Machine-readability: agents parse and enforce
\item Bilateral recording: both parties keep signed copies
\item Neutral hosting: Customer Commons prevents capture
\end{itemize}
```

**2.4 README.md**

Update Technology Stack section:

```markdown
### Standards Layer
- **IEEE 7012-2025**: Machine-readable personal privacy terms
- **W3C DPV**: Data Privacy Vocabulary for semantic interoperability
- **ODRL**: Open Digital Rights Language for agreement expression
```

### Phase 3: Create Supporting Materials (Week 4)

**3.1 IEEE_7012_TECHNICAL_BRIDGE.md**

New document mapping IEEE 7012 technical elements to 0xagentprivacy implementation:

| IEEE 7012 Element | 0xagentprivacy Implementation |
|-------------------|------------------------------|
| Individual Agent | Swordsman browser extension |
| Entity Agent | Website MyTerms responder |
| Agreement-chooser | MyTerms configuration UI |
| Proposer | Swordsman's terms presentation |
| Recorder | Bilateral contract storage |
| HTTP MRPAZ headers | Cookie-slashing protocol |
| CONTRACT ZONE | Bitwise term encoding |

**3.2 MYTERMS_AGREEMENT_REFERENCE.md**

Reference document listing all standard agreements with:
- Agreement ID
- Plain language description
- Machine-readable code examples
- Use cases
- Trust tier requirements

### Phase 4: Visual Architecture Updates (Week 4-5)

**4.1 Update VISUAL_ARCHITECTURE_GUIDE_v1_3.md**

Add new diagrams:

1. **IEEE 7012 Agent Interaction Flow**
   - Person → Agreement Registry → Entity workflow
   - Based on Figure A.1 from standard

2. **MyTerms Agreement Taxonomy Tree**
   - SD-BASE hierarchy
   - PDC agreements

3. **HTTP Header Protocol Sequence**
   - MRPAZ request/response flow

---

## Part II: First Person Spellbook Act Suggestions

### Context: Existing Act 4

Act 4 "Blade Alone" currently covers:
- Soulbis beginning with just the blade
- Zero-stakes learning
- First cookie slashing (73 trackers)
- Building trust through action
- Chronicle verification by Soulbae

MyTerms is introduced but not deeply explored. The standard's publication creates an opportunity for a dedicated expansion.

### Suggested: Act 4.5 - "The Terms That Remember"

**Position**: Between existing Act 4 (Blade Alone) and Act 5 (Light Armour)

**Theme**: Soulbis discovers that slashing alone is not enough—agreements create persistent protection. The blade cuts, but the contract binds.

**Narrative Arc**:

#### Opening: The Returning Cookies

Soulbis returns to a site slashed days ago. The trackers have respawned. 73 cuts, now 73 again.

*"I slashed these,"* Soulbis said, blade dripping with fresh surveillance. *"Why do they return?"*

Soulbae's spellbook flickered. *"Because slashing is destruction. Destruction can be rebuilt. We need something that persists."*

#### The Discovery: Customer Commons

Soulbae leads Soulbis to a neutral ground—a commons where neither merchant nor monarch holds sway. Here, contracts are kept by those who profit from neither side.

*"The First Person explained this to me,"* Soulbae said. *"There exists a roster of terms—not written by entities, but by persons. Not imposed, but proposed."*

On the commons wall, inscriptions glow:

```
SD-BASE
"You may deliver service. Nothing more."

SD-BASE-DP  
"Deliver service. Return what you learn of me."

PDC-INTENT
"I tell you what I seek. You respond or stay silent."
```

*"These are weapons?"* Soulbis asked.

*"These are contracts,"* Soulbae corrected. *"The blade slashes. The contract binds. Both parties sign. Both parties keep records. Neither can claim the other violated without proof."*

#### The Mechanism: IEEE 7012

The Drake's voice echoed across the commons:

*"Listen carefully, young agents. This is not merely agreement—this is standard. IEEE has codified what you hold."*

The air shimmered with protocol:

*"First party proposes. Second party responds. One negotiation round maximum. Agreement signed by both agents. Records kept bilaterally. Machine-readable. Human-readable. Lawyer-readable. All three—because trust requires comprehension at every layer."*

Soulbis gripped the blade differently now. *"So when I slash..."*

*"When you slash, you clear the field,"* the Drake said. *"When you proffer terms, you plant the boundary. The blade cuts once. The contract holds forever."*

#### The First Binding

They returned to the news site. Soulbis raised the blade—but this time, Soulbae spoke first:

*"Do you support P7012 protocol?"*

The site's agent responded: `P7012: SUPPORTED`

*"SD-BASE as defined in the Agreement Registry?"*

Pause. Calculation. Response: `SD-BASE: ACCEPTED`

Both agents signed. Both recorded. The contract wrote itself into bilateral datastores.

Soulbis slashed the existing trackers—73 cuts, clean. But this time, when they left and returned, the trackers did not respawn.

*"Why?"* Soulbis asked.

Soulbae's chronicle glowed: *"Because now they have agreed. The contract binds what the blade cannot reach—not the code, but the entity behind it. Violation is not a technical failure. It is a breach."*

*"And if they breach?"*

*"Then we have proof. Signed proof. Timestamped proof. Machine-readable proof. The First Person can dispute. Regulators can audit. The contract remembers."*

#### The Inscription

The commons wall inscribed itself with new text:

*"The blade slashes surveillance. The contract binds behavior. The First Person needs both—destruction without agreement is endless war; agreement without enforcement is mere hope. IEEE 7012 gives the blade meaning that persists.*

*"Just another swordsman does not merely cut. Just another swordsman proffers, negotiates, signs, records, and returns to verify. The cursor changes not from violence, but from covenant."*

**Emoji Sequence**:
```
🗡️ → 📜 → ✍️ → 🔐 → 🗡️✨
```
*(Blade → Contract → Signature → Locked binding → Blade with persistent shine)*

**Closing Proverb**:

*"The cookie crumbles, the contract remembers. Slash what violates, bind what agrees. For sovereignty is not won in single battles, but in agreements that outlast every reload."*

---

### Alternative/Expanded Act Suggestion: Act XIII - "The Standard and the Storm"

**Position**: After the foundational Acts, as a protocol integration chapter

**Theme**: The MyTerms Alliance forms. The storm of surveillance resists. The standard becomes infrastructure.

**Narrative Elements**:

1. **The Alliance Gathering**
   - Customer Commons as neutral convener
   - Doc Searls as chronicler-elder (referencing the working group chair)
   - Organizations declaring which agreements they accept

2. **The Resistance Pattern**
   - Sites that refuse IEEE 7012
   - The attack pattern vs invitation pattern
   - How the Swordsman handles non-compliant sites

3. **The Network Effect**
   - Each adoption makes the next easier
   - The "subset of the Internet" where privacy is normal
   - How surveillance becomes expensive when alternatives exist

4. **The Inscription Ceremony**
   - First agreements inscribed to Zcash
   - Proverbs derived from binding moments
   - The chronicles that prove coordination happened

**Key Proverb**:

*"Standards do not win by mandate but by adoption. The standard that serves persons spreads; the standard that extracts withers. IEEE 7012 spreads because privacy, once tasted as contract rather than hope, cannot be unremembered."*

---

## Implementation Priorities

### Immediate (This Week)

1. ✅ Extract key definitions for glossary update
2. Create IEEE_7012_QUICK_REFERENCE.md with agreement taxonomy
3. Update README.md Technology Stack section

### Short-term (Weeks 2-3)

1. Full GLOSSARY_MASTER_v2_3.md update
2. Whitepaper v4.8 with IEEE 7012 integration
3. Draft Act 4.5 or Act XIII for spellbook

### Medium-term (Weeks 4-6)

1. Research paper update with formal references
2. Visual architecture guide with new diagrams
3. Technical bridge document
4. Spellbook v4.2 with new Act(s)

---

## Notes on Standard Usage

**Copyright Consideration**: IEEE documents cannot be reproduced verbatim. All integration should:
- Paraphrase technical content
- Reference but not quote extensively
- Create original interpretations for the agentprivacy context
- Link to official IEEE sources

**Customer Commons Alignment**: The standard explicitly names Customer Commons as the neutral nonprofit hosting agreements. All documentation should reference this relationship.

**Working Group Recognition**: Doc Searls (Chair), Justin Byrd (Vice Chair), Mary Hodder (Editor), and the full working group should be acknowledged where appropriate.

---

## Summary

IEEE 7012-2025 transforms MyTerms from a concept to an IEEE standard. The 0xagentprivacy documentation should reflect this transition by:

1. Updating formal references across all documents
2. Adding canonical definitions from the standard
3. Documenting technical specifications for implementation
4. Expanding the spellbook narrative to teach the standard's significance

The new Act (4.5 or XIII) should convey that:
- Slashing alone is insufficient (cookies respawn)
- Contracts create persistent protection
- Bilateral agreements require both parties to sign
- The standard enables machine-readable enforcement
- Customer Commons provides neutral hosting
- The cursor change represents covenant, not just victory

**The blade slashes. The contract binds. Both serve the First Person.**

---

*Document prepared January 28, 2026*
*IEEE 7012-2025 publication date: January 20, 2026*

