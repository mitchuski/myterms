# MyTerms Technical Integration Plan

## Swordsman Browser Agent × IEEE 7012-2025

**Document Type:** Supporting Material for MyTerms Alliance Application  
**Author:** privacymage / agentprivacy  
**Date:** January 28, 2026  
**Standard Reference:** IEEE Std 7012™-2025

---

## Overview

This document specifies how agentprivacy's Swordsman browser agent implements IEEE 7012-2025, the Standard for Machine Readable Personal Privacy Terms. The implementation treats MyTerms as foundational infrastructure—not a feature, but the agreement layer upon which all other privacy functions depend.

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
       │ ◀──── "COUNTER-OFFER: SD-BASE-A" ─────────│
       │         OR                                 │
       │ ◀──── "DECLINED" ─────────────────────────│
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

This technical integration plan demonstrates that agentprivacy's Swordsman agent is designed around IEEE 7012 as foundational infrastructure. MyTerms isn't a feature we're adding—it's the agreement layer that makes everything else possible.

The blade enforces what the contract establishes.

---

*Technical specifications subject to evolution based on implementation experience and standard clarifications.*

**⚔️📜🔧✨**

