# Harness: myterms  (instance #2 — BUILT; real-bus wiring pending)

> **Owned by the `myterms` project** (this lives at `myterms/harness/`, not in the framework dir).
> It vendors the engine (`./core/dual_agent_loop.mjs`, canonical source
> `../../agentprivacy-dual-agent-harness/generic/core/`) and **targets the two MyTerms extensions
> `../../myswordsman/` (⚔️ prover) and `../../mymage/` (🧙 proposer)** — the "my"-prefixed names keep
> the bare `swordsman`/`mage` labels free for generic use. Run the mock: `node run.mjs`.

**Purpose:** for a given page + a First Person's privacy preferences, propose the best
`SD-BASE` agreement variant + spell constellation, and *prove* it — maximising the PVM score
`Φ = Φ_agent(Σ)·Φ_data(Δ)·Φ_inference(Γ)` subject to user intent / low friction.

This is the second instance, and the one that pressure-tests the engine's seams — because
**myterms already ships the dual-agent split**, just not wired as a held-apart autoresearch loop.

## Why this instance is special

It is not a fresh build; it seats the existing extensions:

- **🧙 Mage = `mymage/`** — proposer/intelligence: deep-scans, rates 6 dimensions, proposes a
  blade (hexagram over Z/2⁶) + spell constellation (`mymage/src/background/index.ts`).
- **⚔️ Swordsman = `myswordsman/`** — prover/enforcer: owns the canvas (Mage cannot render — a
  hard held-apart boundary), gates forging with `checkCanForge()`, verifies `neg(bnot(x))=succ(x)`
  in `src/lib/uor.ts`, records bilateral IEEE-7012 agreements.
- handshake/sync: `myswordsman/src/content/ceremony-channel.ts`.

## The Gap (held-out, un-tuneable by the Mage)

1. **Unlock lattice** — `checkCanForge()` (layer / forgings / domains); the Mage cannot lower it.
2. **IEEE-7012 registry** — agreement IDs from Customer Commons, not Mage-minted.
3. **Constellation-hash witness chain** — cast spells must hash to the recorded hexagram.
4. **Bilateral immutable recording** — auditor-disputable.

## Seating (draft)

| Seat | Persona | Skills |
|---|---|---|
| 🧙 Mage | `agentprivacy-cipher` / `agentprivacy-weaver` | `selective-disclosure`, `separation-enforcement` |
| ⚔️ Swordsman | `agentprivacy-sentinel` / `agentprivacy-gatekeeper` | `horizon-gate`, `separation-enforcement` |
| ⿻ Gap | (mechanism) | unlock lattice + IEEE-7012 registry + constellation-hash witness |
| design | `agentprivacy-architect` | `meta/agentprivacy-dual-agent-harness` |

## Files (built)

| File | Role |
|---|---|
| `harness.config.mjs` | the config: the 3-axis finders (Σ⊥Δ⊥Γ + friction), prompts, schemas, `heldApartRule` |
| `runtime-extension.mjs` | the **runtime adapter** — routes the engine's `agent()` calls by phase to the ceremony-channel bus (Measure→scan, Propose→mymage, Hunt→Gap witnesses, Assay→myswordsman gate, Critic) |
| `run.mjs` | wiring: `makeBrowserBus()` (real, over chrome.runtime + the gate) and `makeMockBus()` (off-page) |

Unlike `ecdsafail-pqc`, this attaches to the **existing extension message bus** (the ceremony
channel), not a Workflow bundle — the adapter wraps `chrome.runtime` messaging as the
`rt = {agent, parallel, pipeline, phase, log}` surface. The engine threads each stage's structured
object on `opts.input`, so the adapter never parses prompts.

## Run

```bash
# off-page wiring test (mock bus) — verifies the loop end-to-end:
node run.mjs
# → drives Measure → Propose(4 finders) → Hunt → Assay(gate) → Critic, prints the verdicts.
```

In the browser, supply a real bus via `makeBrowserBus({ ceremony, blade, registry, domain })` —
see the **bus contract** at the top of `runtime-extension.mjs` (the methods myswordsman /
mymage must expose: `scan`, `propose`, `registryHas`, `constellationHash`, `gate`, `frontier`).

## What's left to make it live

1. **Implement the real bus** over `myswordsman/src/content/ceremony-channel.ts` + the gate
   (`blade-forge.ts` `checkCanForge`, the constellation-hash verify, the IEEE-7012 registry, the
   bilateral record). The mock proves the wiring; this makes it act on real pages.
2. **(optional) an LLM finder layer** for the Mage proposals (map a deep-scan → SD-BASE variants);
   pass it as `llm` to `makeExtensionRuntime`. Without it, the extensions' heuristics drive proposals.
3. **Result attestation** via the star Swordsman's Key (κ-label; spec §4.3) on a validated agreement.

## Full scope

`agentprivacy-docs/specs/DUAL_AGENT_HARNESS_SPEC_v1.md` §6. Honest framing travels: a proposed
agreement is validated only by the held-out gate, never by the proposer.

*Status: BUILT (config + adapter + runner + mock pass). Real-bus implementation pending (step 1).*
