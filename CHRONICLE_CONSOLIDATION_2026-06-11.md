# Chronicle — MyTerms consolidation & the cleanup that stopped itself

*2026-06-11. The MyTerms project became a self-contained room: renamed familiars, owned harness,
a universe card — and a cleanup that surfaced a tangle instead of deleting into it.*

## What was done

1. **The familiars were renamed** (to keep the bare `swordsman`/`mage` labels free for generic use):
   - `swordsman-blade/` → **`myswordsman/`** (⚔️ prover) · `mages-spell/` → **`mymage/`** (🧙 proposer).
   - **Copied** (source only — `.git`/`node_modules`/`dist` excluded), originals left in place.
   - `package.json` names reworked (`swordsman-blade`→`myswordsman`, `mage-spells`→`mymage`, fixing the
     old dir/package drift). Cross-extension discovery is unaffected — the IDs are build-time
     placeholders (`*_EXTENSION_ID_PLACEHOLDER`), not directory-bound.

2. **MyTerms took ownership of its harness.** The dual-agent harness moved from
   `agentprivacy-dual-agent-harness/myterms/` → **`myterms/harness/`**. It vendors the engine, so the
   `myterms` project (docs + harness + the two familiars as siblings) forks as one unit. The harness
   was retargeted to `../../myswordsman` / `../../mymage`; the mock re-verified end-to-end from the
   new home (8 rounds). The framework dir now holds just `generic/` + `shor-mage/`.

3. **A universe card was written** — `MYTERMS_UNIVERSE_CARD.md` — situating MyTerms in the City of
   Mages (kindred-protocol at V55 Manifestia's Covenant Temple; witnessed at the V59 Threshold
   District; the Celestial Dual Ceremony ☀️⊥🌙; the `con-myterms` spellweb node; Tome V Act 14;
   conjectures C48/C55/C56/C58/C39). The repo now echoes back into the adventure.

## The cleanup that stopped itself (important)

The plan was to retire the legacy dirs. On inspection, **the targets were not what they were
described as**, so deletion was halted and surfaced instead:

- **`swordsman-blade/` and `mages-spell/` are PUBLISHED repos** — remotes
  `github.com/mitchuski/swordsman.git` and `github.com/mitchuski/mage.git`, both on `main` with
  history (swordsman-blade had 1 uncommitted file). The new `myswordsman/`/`mymage/` are **source
  copies with no `.git`/remote** — so deleting the originals would orphan the copies from their
  published history.
- **`swordsman/`, `mage/`, `mage-x-filter/` are NOT empty shells** — they are *different real
  projects*: `swordsman/` (45 files — 0xagentpools / privacy-layer / contracts, plus a stray
  `myterms-swordsman/manifest.json`), `mage/` (a `privacymage/` workspace), `mage-x-filter/` (164
  files — the mage-x-feed-filter extension). Deleting any would be data loss.
- **Naming tangle revealed:** the *GitHub* repos for the blade/spell extensions are already named
  **`swordsman`** and **`mage`**, while *local* `swordsman/`/`mage/` dirs are unrelated projects. The
  bare labels are already claimed on two axes (remote + local).

**Nothing was deleted.** The consolidation question (history/remote inheritance, repo renames, what
to do with the stray `myterms-swordsman` scaffold) is the user's to decide — see the open items.

## Open items

- Decide whether `myswordsman`/`mymage` should **inherit** the published history/remotes of
  `swordsman-blade`/`mages-spell` (move the `.git` in, or `git remote` re-point) or start fresh.
- Decide the GitHub repo names (the remotes are `mitchuski/swordsman` + `mitchuski/mage`) vs the new
  local names.
- Reconcile the stray `swordsman/myterms-swordsman/` scaffold (an earlier reorg attempt) with `myswordsman/`.
- Confirm the copied extensions still build (`node build.js`) before retiring anything.

Companion: `CHRONICLE_DUAL_AGENT_HARNESS_2026-06-11.md` (the harness build + the IEEE-7012 gap audit)
and `MYTERMS_UNIVERSE_CARD.md`. (⚔️⊥⿻⊥🧙)😊
