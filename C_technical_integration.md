# MyTerms Technical Integration Plan

## Swordsman Browser Agent × IEEE 7012-2025

**Document Type:** Supporting Material for MyTerms Alliance Application
**Author:** privacymage / agentprivacy
**Date:** February 1, 2026 (refreshed April 22, 2026 against IEEE 7012 Integration Plan V2)
**Standard Reference:** IEEE Std 7012™-2025 (Approved 4 November 2025; Published 20 January 2026)

---

## Overview

This document specifies how agentprivacy's Swordsman browser agent implements IEEE 7012-2025, the Standard for Machine Readable Personal Privacy Terms. The standard is treated as **the agreement layer** — the bilateral protocol on which enforcement is built, not the enforcement itself. IEEE 7012 is a thin waist (§1.1): it specifies person-to-entity agreement routines and intentionally leaves delegation, Σ separation, cryptographic substrate, and trust accumulation to the implementer.

The Swordsman sits within a tetrahedral architecture (Swordsman, Mage, Reflect, Connect) where the protocol between agents is a communication substrate. That substrate enables guild-based secret languages — communities developing their own vocabulary on top of a shared waist (IEEE 7012 + W3C DPV + ODRL) — while IEEE 7012 supplies the agreement primitive that gives the Swordsman's blade meaning beyond single sessions.

### What IEEE 7012 is *not*

To prevent the common misread that the standard does more than it does:

- **Not an enforcement specification.** A signed `SD-BASE` can still be violated in practice without ZK or TEE backing. Enforcement is the implementer's job.
- **Not an agent-separation specification.** A single-agent monolith can be IEEE 7012-compliant and score Σ ≈ 0 on the Privacy Value Model. Σ lives in architecture, not in the agreement.
- **Not a multi-turn negotiation protocol.** §A.1 and Figure A.1 cap negotiation at one round (accept / one counter-offer / decline). Richer negotiation is out of scope.
- **Not an inference-control specification.** Inference over released data (Γ) is out of scope entirely.
- **Not a universal ontology.** Annex D expects reconciliation with existing domain vocabularies (HL7 is the worked example) via ISO 23903 — community vocabularies live *above* the standard.

### PVM V5.4 axis mapping

| Axis | IEEE 7012 contribution | What IEEE 7012 does not provide |
|---|---|---|
| Σ (agent) | Role boundary between person-agent and entity-agent; makes separation testable via the agreement artifact | The information-theoretic bound `I(S;M\|FP) < ε*` |
| Δ (data) | Coarse-grained policy lattice via `SD-BASE-*` and `PDC-*` | Cryptographic enforcement — ZK/TEE backing lives below |
| Γ (inference) | `SD-BASE-ATP` addresses second-party profiling as an agreement variable | Inference over published data — out of scope |

IEEE 7012 is a **necessary but not sufficient** condition for the Σ axis being measurable at all. Compliance with the standard is a precondition; the Swordsman + Mage + ZK substrate together close the loop.

---

## Architecture Alignment

### IEEE 7012 Components → Swordsman Implementation

| IEEE 7012 Specification | Swordsman Implementation |
|------------------------|-------------------------|
| **Individual's Agent** (§5.2.1) | Swordsman browser extension |
| **Agreement-Chooser** (§5.2.1.2) | MyTerms configuration UI |
| **Proposer** (§5.2.1.3) | Automatic terms presentation on site visit |
| **Recorder** (§5.2.4) | Chronicle system with bilateral storage |
| **Auditor** (§5.2.5) | Verification and dispute documentation |
| **Entity's Agent** (§5.3) | Site-side responder (standard compliance) |

### The P7012 Protocol Flow

```
┌─────────────┐                              ┌─────────────┐
│   FIRST     │                              │   ENTITY    │
│   PERSON    │                              │   (SITE)    │
└──────┬──────┘                              └──────┬──────┘
       │                                            │
       │  [Configure preferred terms]               │
       ▼                                            │
┌──────────────┐                              ┌─────────────┐
│  SWORDSMAN   │                              │   ENTITY    │
│    AGENT     │                              │    AGENT    │
└──────┬───────┘                              └──────┬──────┘
       │                                            │
       │ ──── "Do you support P7012 protocol?" ────▶│
       │                                            │
       │ ◀──── "P7012: SUPPORTED" ─────────────────│
       │                                            │
       │ ──── "SD-BASE as defined in registry?" ──▶│
       │                                            │
       │        [Entity evaluates terms]            │
       │                                            │
       │ ◀──── "SD-BASE: ACCEPTED" ────────────────│
       │         OR                                 │
       │ ◀──── "COUNTER-OFFER: SD-BASE-A" ─────────│  (§A.1: ONE round only)
       │         OR                                 │
       │ ◀──── "DECLINED" ─────────────────────────│
       │                                            │
       │  Negotiation is capped at one round.       │
       │  The First Person accepts the counter,     │
       │  or the conversation ends.                 │
       │                                            │
       │        [If acceptable to First Person]     │
       │                                            │
       │ ──── [Signed Agreement] ──────────────────▶│
       │ ◀──── [Counter-Signed Agreement] ─────────│
       │                                            │
       ▼                                            ▼
┌──────────────┐                              ┌─────────────┐
│  CHRONICLE   │                              │   ENTITY    │
│   (RECORD)   │                              │   RECORD    │
└──────────────┘                              └─────────────┘
```

---

## Agreement Implementation

### Tier 1: Service Delivery Agreements

**SD-BASE** (Default)
```javascript
const SD_BASE = {
  id: "SD-BASE",
  version: "1.0",
  registry: "https://customercommons.org/agreements/",
  permissions: {
    serviceDelivery: true
  },
  prohibitions: {
    analytics2P: true,
    tracking2P: true,
    profiling2P: true,
    sharingAnonymized3P: true
  },
  obligations: {
    dataPortability: "optional"
  }
};
```

**SD-BASE-DP** (With Data Portability)
```javascript
const SD_BASE_DP = {
  ...SD_BASE,
  id: "SD-BASE-DP",
  obligations: {
    dataPortability: "required"
  }
};
```

**Progressive Permissions** (SD-BASE-A through SD-BASE-ATP-S3P)

| Agreement | Analytics 2P | Tracking 2P | Profiling 2P | Share 3P |
|-----------|-------------|-------------|--------------|----------|
| SD-BASE | ✗ | ✗ | ✗ | ✗ |
| SD-BASE-A | ✓ | ✗ | ✗ | ✗ |
| SD-BASE-AT | ✓ | ✓ | ✗ | ✗ |
| SD-BASE-ATP | ✓ | ✓ | ✓ | ✗ |
| SD-BASE-ATP-S3P | ✓ | ✓ | ✓ | ✓ |

### Tier 2: Data Contribution Agreements

**PDC-INTENT** (Intentcasting)
```javascript
const PDC_INTENT = {
  id: "PDC-INTENT",
  type: "contribution",
  purpose: "intentcasting",
  scope: "specified_intent_data",
  permissions: {
    receiveQualifiedResponses: true
  },
  prohibitions: {
    broadcastToUnqualified: true,
    retainBeyondSession: true
  },
  obligations: {
    dataPortability: "required"
  }
};
```

**PDC-AI** (AI Training Contribution)
```javascript
const PDC_AI = {
  id: "PDC-AI",
  type: "contribution",
  purpose: "ai_training_operation",
  scope: "specified_data_categories",
  // Terms for AI training data contribution
};
```

**PDC-GOOD** (Public Good Contribution)
```javascript
const PDC_GOOD = {
  id: "PDC-GOOD",
  type: "contribution",
  purpose: "public_good_research",
  scope: "specified_data_categories",
  // Terms for data-for-good projects
};
```

---

## Sticker System — MyTerms Action Tokens

The **Sticker System** is the First-Person-side UX layer that sits *above* the signed IEEE 7012 agreement and *below* the enforcement layer. Stickers are cast-able content items (emoji, proverb, or keyword) that express which subset of the signed agreement's permissions the First Person wants the Swordsman and Mage to express on a given site.

They do **not** replace Customer Commons agreement IDs and they do **not** mint new `SD-BASE-*` variants. They are agentprivacy-local UX primitives that compose *with* signed agreements.

### Schema

```typescript
type MyTermsSticker = {
  id: string;                            // stable identifier, e.g. 'emoji_shield'
  type: 'emoji' | 'proverb' | 'keyword';
  content: string;                       // '🛡️', 'The gap is where you live', 'DO_NOT_TRACK'
  emoji: string;                         // visual representation
  myTermsMapping: MyTermsAction;         // enforcement verb emitted when cast
  weight: 2 | 3;                         // contributes to hex convergence scoring
  yangYin: 'yang' | 'yin';               // outward assertion vs inward concealment
  source: 'story' | 'canon' | 'zk';      // narrative provenance
};

type MyTermsAction =
  | 'DO_NOT_TRACK'
  | 'TRUST_EXTENSION'
  | 'DATA_MINIMISATION'
  | 'SELECTIVE_DISCLOSURE'
  | 'EPHEMERAL_SESSION'
  | 'DO_NOT_SELL'
  | 'ANONYMIZE';
```

### The Canonical Eight

| ID | Type | Content | MyTerms mapping | Weight | Axis | Source |
|---|---|---|---|---|---|---|
| `emoji_shield` | emoji | 🛡️ | `DO_NOT_TRACK` | 2 | yang | story |
| `emoji_dragon` | emoji | 🐉 | `TRUST_EXTENSION` | 3 | yang | story |
| `proverb_gap` | proverb | "The gap is where you live" | `DATA_MINIMISATION` | 3 | yang | story |
| `keyword_dnt` | keyword | `DO_NOT_TRACK` | `DO_NOT_TRACK` | 2 | yang | canon |
| `emoji_crystal` | emoji | 🔮 | `SELECTIVE_DISCLOSURE` | 2 | yang | zk |
| `proverb_weather` | proverb | "Build weather, not monuments" | `EPHEMERAL_SESSION` | 2 | yin | story |
| `keyword_dns` | keyword | `DO_NOT_SELL` | `DO_NOT_SELL` | 2 | yin | canon |
| `emoji_cloak` | emoji | 👻 | `ANONYMIZE` | 2 | yin | zk |

Five yang stickers (outward assertion — Swordsman energy, boundary-making), three yin stickers (inward concealment — Mage energy, Γ-aware posture).

### Hex Loadout Mechanic

Six stickers are active in the hex at any time; two are benched. Default active set is three-yang + three-yin:

```javascript
const DEFAULT_ACTIVE_HEX_IDS = [
  'emoji_shield', 'emoji_dragon', 'proverb_gap',    // yang
  'emoji_crystal', 'proverb_weather', 'keyword_dns' // yin
];
```

The First Person swaps stickers via right-click on the Sword Orb. State is persisted per-browser under the `localStorage` key `agentprivacy:active-hex-spells` and broadcast to extensions via a `agentprivacy:hex-spells-changed` `CustomEvent`.

```javascript
// Swap a benched sticker into the active hex
function swapHexSpell(activeId, benchedId) {
  const current = getActiveHexSpellIds();
  const idx = current.indexOf(activeId);
  if (idx === -1) return;
  const next = [...current];
  next[idx] = benchedId;
  localStorage.setItem(
    'agentprivacy:active-hex-spells',
    JSON.stringify(next)
  );
  window.dispatchEvent(
    new CustomEvent('agentprivacy:hex-spells-changed')
  );
}
```

### Composition with IEEE 7012 Agreements

The signed agreement is the ceiling of what is permitted (Δ axis); active stickers are which subset of that ceiling the First Person chooses to express in a given session.

```javascript
// Composing a signed SD-BASE with an active sticker loadout
const session = {
  agreement: SD_BASE,                     // signed per §5.2.4
  activeStickers: [
    'emoji_shield',                       // → DO_NOT_TRACK enforcement
    'emoji_cloak',                        // → ANONYMIZE (Γ-aware Mage posture)
    'proverb_gap'                         // → DATA_MINIMISATION
  ],
  resolvedPolicy: resolveStickerPolicy(
    SD_BASE,
    ['emoji_shield', 'emoji_cloak', 'proverb_gap']
  )
};
```

A signed `SD-BASE` with `emoji_cloak` active means: *"service delivery only, and my Mage should operate in anonymising mode on this site."* The agreement is the contract with the Entity; the stickers configure how agentprivacy expresses itself within that contract.

### What the Sticker System is NOT

- **Not a replacement for the Customer Commons agreement registry.** `myTermsMapping` values are agentprivacy-local action verbs, not IEEE 7012 agreement IDs. Agreement IDs come from Customer Commons; stickers come from the sovereignty training journey.
- **Not visible to the Entity.** Per §5.2.4, the bilateral record contains the signed agreement. Sticker state is First-Person-side UX and does not leak cross-party.
- **Not a negotiation input.** §A.1 caps negotiation at one round. Stickers do not reopen negotiation — they configure expression *within* an already-signed agreement.
- **Not minting new agreement IDs.** A site that wants stricter-than-`SD-BASE` behaviour still uses the existing `SD-BASE-*` or `PDC-*` lattice. Stickers never appear as wire-level agreement identifiers.

### Extension Integration

`syncRepertoireToExtensions()` broadcasts active sticker state to both the Swordsman and Mage extensions:

- **Swordsman** (agreement-layer agent) reads active stickers to refine resource classification inside the envelope set by the signed agreement. `emoji_shield` active on a site with `SD-BASE-A` signed will tighten third-party-analytics blocking without changing the signed agreement.
- **Mage** (delegation inside Σ scope) reads active stickers to inform operational posture — `emoji_cloak` active triggers Γ-aware output rewriting before the Mage takes actions on the First Person's behalf. The Mage never signs; the stickers shape *how* the Mage acts inside the Swordsman-signed agreement.

---

## HTTP Protocol Implementation (MRPAZ)

### Request Headers

```http
GET /resource HTTP/1.1
Host: example.com
MRPAZ-A: org.CuCo
MRPAZ-V: V1.0
MRPAZ-T: GEN
MRPAZ-R: USA
MTPAZ-1: SD-BASE
```

### Header Definitions

| Header | Purpose | Values |
|--------|---------|--------|
| `MRPAZ-A` | Authority namespace | `org.CuCo` (Customer Commons) |
| `MRPAZ-V` | Protocol version | `V1.0` |
| `MRPAZ-T` | Terms type | `GEN` (Generic), domain-specific |
| `MRPAZ-R` | Regional legal framework | `USA`, `EU`, `GLOBAL` |
| `MTPAZ-1` | Agreement identifier | `SD-BASE`, `SD-BASE-DP`, etc. |

### CONTRACT ZONE (Bitwise Encoding)

For efficient agent-to-agent communication:

```
Bit Layout (6 bits):
┌───┬───┬───┬───┬───┬───┐
│ 5 │ 4 │ 3 │ 2 │ 1 │ 0 │
└───┴───┴───┴───┴───┴───┘
  │   │   │   └───┴───┘
  │   │   │       └── ATP Level (00=none, 01=A, 10=AT, 11=ATP)
  │   │   └────────── Third-party sharing (0=no, 1=yes)
  │   └────────────── Data portability (0=optional, 1=required)
  └────────────────── Reserved/Extended purposes

Examples:
0b000000 = SD-BASE (nothing permitted beyond service)
0b000001 = SD-BASE-A (Analytics permitted)
0b000010 = SD-BASE-AT (Analytics + Tracking)
0b000011 = SD-BASE-ATP (Full 2P surveillance)
0b000111 = SD-BASE-ATP-S3P (Plus 3P sharing)
0b010000 = SD-BASE-DP (Data portability required)
```

---

## Machine-Readable Formats

### JSON-LD (Linked Data)

```json
{
  "@context": {
    "dpv": "https://w3id.org/dpv#",
    "p7012": "https://w3id.org/dpv/standards/p7012#",
    "odrl": "http://www.w3.org/ns/odrl/2/"
  },
  "@id": "https://customercommons.org/agreements/SD-BASE",
  "@type": ["p7012:Agreement", "odrl:Offer"],
  "dpv:hasObligation": {"@id": "p7012:ServiceDeliveryRequired"},
  "dpv:hasProhibition": [
    {"@id": "p7012:Analytics2PDisallowed"},
    {"@id": "p7012:Tracking2PDisallowed"},
    {"@id": "p7012:ProfilingDisallowed"},
    {"@id": "p7012:DataSharingDisallowed"}
  ],
  "p7012:hasHumanReadableFormat": "https://customercommons.org/human/SD-BASE",
  "p7012:hasLegalReadableFormat": "https://customercommons.org/legal/SD-BASE"
}
```

### RDF/Turtle

```turtle
@prefix p7012: <https://w3id.org/dpv/standards/p7012#> .
@prefix dpv: <https://w3id.org/dpv#> .
@prefix odrl: <http://www.w3.org/ns/odrl/2/> .

<https://customercommons.org/agreements/SD-BASE>
  a p7012:Agreement, odrl:Offer ;
  dpv:hasObligation p7012:ServiceDeliveryRequired ;
  dpv:hasProhibition p7012:Analytics2PDisallowed,
                     p7012:Tracking2PDisallowed,
                     p7012:ProfilingDisallowed,
                     p7012:DataSharingDisallowed .
```

---

## Enforcement Architecture

### Cookie/Tracker Classification

When agreement is signed, Swordsman classifies all site resources:

```javascript
function classifyResource(resource, agreement) {
  const classification = {
    permitted: [],     // Allowed under agreement
    forbidden: [],     // Prohibited under agreement  
    unknown: []        // Requires analysis
  };
  
  if (agreement.permissions.analytics2P) {
    // First-party analytics permitted
    classification.permitted.push(...firstPartyAnalytics);
  } else {
    classification.forbidden.push(...firstPartyAnalytics);
  }
  
  // Third-party resources always evaluated against agreement
  thirdPartyResources.forEach(resource => {
    if (agreement.prohibitions.sharingAnonymized3P) {
      classification.forbidden.push(resource);
    }
  });
  
  return classification;
}
```

### Selective Enforcement

```javascript
function enforce(classification) {
  // Slash forbidden resources
  classification.forbidden.forEach(resource => {
    blockResource(resource);
    chronicle.log('BLOCKED', resource, agreement.id);
  });
  
  // Permit allowed resources
  classification.permitted.forEach(resource => {
    allowResource(resource);
    chronicle.log('PERMITTED', resource, agreement.id);
  });
}
```

### Visual Feedback (Cursor State)

| State | Cursor | Meaning |
|-------|--------|---------|
| No agreement | Default | Site doesn't support P7012 |
| Agreement pending | ⚔️ | Negotiation in progress |
| Agreement signed | ⚔️✍️ | Contract bound, enforcing |
| Agreement violated | ⚔️⚠️ | Breach detected, logging |
| Custom (positive site) | [Custom] | User-selected cursor for trusted sites |

---

## Chronicle System (Bilateral Records)

### Record Structure

```javascript
const chronicleEntry = {
  id: "uuid-v4",
  timestamp: "2026-01-28T12:00:00Z",
  agreement: {
    id: "SD-BASE",
    version: "1.0",
    registry: "https://customercommons.org/agreements/"
  },
  parties: {
    firstParty: {
      identifier: "pseudonymous-id",  // No PII required
      signature: "cryptographic-signature"
    },
    secondParty: {
      domain: "example.com",
      identifier: "entity-id",
      signature: "cryptographic-signature"
    }
  },
  enforcement: {
    resourcesBlocked: 47,
    resourcesPermitted: 26,
    violations: []
  },
  status: "BOUND"
};
```

### Storage Architecture

```
First Person Storage (Sovereign)
├── /agreements/
│   ├── example.com.json
│   ├── news-site.com.json
│   └── ...
├── /chronicles/
│   ├── 2026-01-28/
│   │   ├── example.com.log
│   │   └── ...
│   └── ...
└── /disputes/
    └── (if any violations documented)

Entity Storage (Their Compliance Records)
├── Identical agreement copy
├── Compliance audit trail
└── (Their responsibility to maintain)
```

---

## Integration Points

### With Mage Agent (Delegation)

The Swordsman establishes boundaries; the Mage operates within them:

```
First Person authorizes delegation scope
    ↓
Swordsman negotiates MyTerms with service
    ↓
Agreement defines permitted data flows
    ↓
Mage operates within permitted scope only
    ↓
Chronicle records all actions
    ↓
Violations trigger Swordsman enforcement
```

### With Privacy Pools (x402)

For financial privacy integration:

```
MyTerms Agreement (SD-BASE-DP) establishes relationship
    ↓
x402 payment header attached to request
    ↓
Privacy Pool membership proven via ZK
    ↓
Payment flows through shielded channel
    ↓
Service delivery under MyTerms obligations
    ↓
Data portability returns transaction records
```

### With VRCs (Verifiable Relationship Credentials)

Signed MyTerms agreements become the basis for VRCs:

```
MyTerms Agreement signed
    ↓
Both parties have bilateral proof
    ↓
Consistent behavior over time
    ↓
VRC formed from accumulated trust evidence
    ↓
VRC portable across contexts
    ↓
Reputation without surveillance
```

---

## Implementation Roadmap

### Phase 1: Core Protocol (Q1 2026)
- [ ] P7012 protocol negotiation
- [ ] SD-BASE / SD-BASE-DP implementation
- [ ] HTTP header support (MRPAZ)
- [ ] Basic chronicle recording
- [ ] Cursor state feedback

### Phase 2: Full Agreement Suite (Q2 2026)
- [ ] SD-BASE-A through SD-BASE-ATP-S3P
- [ ] PDC-INTENT integration
- [ ] JSON-LD format generation
- [ ] CONTRACT ZONE bitwise encoding
- [ ] Advanced enforcement classification

### Phase 3: Ecosystem Integration (Q3 2026)
- [ ] PDC-AI, PDC-GOOD agreements
- [ ] Mage agent coordination
- [ ] Privacy Pools integration
- [ ] VRC generation from agreements
- [ ] Dispute documentation system

### Phase 4: Advanced Features (Q4 2026+)
- [ ] Cross-site agreement coordination
- [ ] Agreement template marketplace
- [ ] Automated violation detection
- [ ] Regulatory reporting support
- [ ] Progressive decentralization of chronicle storage

---

## Compliance Notes

### GDPR Alignment

IEEE 7012 supports GDPR compliance through:
- Consent recorded bilaterally (Article 7)
- Purpose limitation enforced (Article 5)
- Data portability enabled (Article 20)
- Audit trail for accountability (Article 5)

### CCPA Alignment

Supports CCPA through:
- "Do Not Sell" enforced via agreement prohibitions
- Opt-out recorded with bilateral proof
- Access requests supported via data portability

### Standard Compliance

All implementations will be validated against:
- IEEE 7012-2025 normative requirements
- Customer Commons agreement definitions
- W3C Data Privacy Vocabulary semantics
- ODRL expression compatibility

---

## Conclusion

This technical integration plan demonstrates that agentprivacy's Swordsman agent is designed around IEEE 7012 as the **agreement layer**. The standard specifies what is agreed between the First Person and the Entity; the Swordsman, Mage, and ZK substrate together specify what is *enforced*. IEEE 7012 compliance is a precondition for the PVM Σ axis being measurable, not a substitute for the architecture that makes Σ ≈ 1 achievable.

The blade enforces what the contract establishes — and only what the contract establishes.

### Defensible headline claim

> IEEE 7012-2025 provides the agreement layer agentprivacy's dual-agent architecture requires. Compliance with the standard is a precondition for the Σ (agent) axis being measurable, and enables bilateral chronicles that can serve as evidentiary basis for VRCs. Standard compliance alone is not equivalent to the full agentprivacy architecture; the standard specifies agreement, not enforcement.

---

*Technical specifications subject to evolution based on implementation experience and standard clarifications.*

**⚔️📜✍️🔐**

