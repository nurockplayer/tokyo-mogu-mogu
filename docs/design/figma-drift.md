# Figma drift / checkpoint tooling (Issue #233)

Read-only drift detection between **live KiKi Figma** and the app, backed by
the **Figma REST API**. It never commits Figma data into the repo beyond a
deterministic, human-reviewed checkpoint file.

- Figma REST API v1, auth via `X-Figma-Token` (env `FIGMA_ACCESS_TOKEN`).
- No Figma MCP / plugin dependency. All live calls use REST.
- Live-API code is built and unit-tested against fixtures; it is **not** run
  against live Figma inside CI/PR automation.

## Commands

| Command | What it does | Writes? |
| --- | --- | --- |
| `pnpm figma:check` | Fetches live Figma, compares every watched surface to the checkpoint, prints unchanged / changed / new / missing with human-readable names + node ids, and co-reports the implementation path + owning Issues. | **Never** (strictly read-only) |
| `pnpm figma:checkpoint` | Re-fetches live Figma, shows a proposed-change summary, asks for confirmation (`--yes` to skip the prompt in scripts), then writes the checkpoint atomically. | Yes — the only baseline-write path |
| `pnpm figma:gate` | Overlays the current branch/PR code diff on the implementation map and reports overlap between Figma-changed surfaces and code-changed surfaces (informational unless overlap → flag the reviewer). | Never |

### Environment

`FIGMA_ACCESS_TOKEN` must be a Figma Personal Access Token. It is read from
the environment only, never from a file, and is never committed.
`.gitignore` already excludes `.env` / `.env.*` (Issue #233 secret
protection).

### Exit codes (machine-readable)

| Code | Meaning |
| --- | --- |
| `0` | No drift (check / gate clean). |
| `1` | Drift: at least one watched surface changed / is new / is missing (check), or a Figma↔code overlap exists (gate). |
| `2` | Operational failure — distinct from drift so CI can react differently: missing token, auth failed, rate limited, file unavailable, network error, schema incomplete, state file missing, **missing checkpoint**, state write failed. |

## Checkpoint = reviewed, not implemented

Writing a checkpoint **acknowledges** the current Figma as the reviewed
baseline. It does **not** mean the app implements it. Drift review is the
moment to decide: `MATCH` / fix it (owning Issue) / `INTENTIONALLY_DIFFERENT`.
Checkpointing skips that decision at your peril.

### Initial checkpoint is intentionally NOT created by this tooling

The checked-in `docs/design/figma-sync-state.json` starts with
`"checkpoint": null` and every watched node hash `null`:

- `pnpm figma:check` with no checkpoint reports the state clearly and exits
  `2` — it **never auto-creates** a baseline.
- The first baseline is created by the team, deliberately, with
  `pnpm figma:checkpoint` once `FIGMA_ACCESS_TOKEN` is available.

## Standard operator loop

```sh
# 1. Drift check (read-only, safe any time)
pnpm figma:check

# 2. Review the report: classify each changed surface (see below),
#    open/find an owning Issue, or mark it intentionally different.

# 3. After a human/team review acknowledges the CURRENT Figma:
pnpm figma:checkpoint          # interactive
pnpm figma:checkpoint --yes    # scripted
```

`pnpm figma:gate --base <baseRef>` (default `origin/main`) runs the code-side
overlay. A `0` is informational; a `1` means the reviewer must re-check live
Figma before merging.

## Change-classification contract

Any surfaced change must be classified into **exactly one** of:

1. `Visual-only` — spacing / color / radius / type / image
2. `Interaction` — sequential reveal / scroll / button state
3. `Content` — wording / options / order
4. `Flow` — added / removed / reordered screen
5. `Product semantics` — persistence / recommendation / safety / data meaning

Only the first four are usually direct prototype-parity work. **Product
semantics must never silently become production architecture** — route it
through the Product-scope invariant and an owning Issue.

## Failure states (all handled, never corrupting)

| State | Behavior |
| --- | --- |
| Token missing | `check`/`checkpoint`/`gate` exit `2`; nothing read or written. |
| Auth / rate limit / network / file unavailable | Exit `2` with a specific message. The last good checkpoint is untouched. |
| Malformed / partial API response | Refused; exit `2`. Never a corrupt write. |
| Watched node missing live (deleted / moved / renamed) | `checkpoint` refuses to write (silently acknowledging deletion would lose data); `check` reports it as `missing` drift. |
| No checkpoint yet | `check` reports it and exits `2` without auto-creating. |
| State write failure | Atomic temp-file + rename; a failed write cleans up and leaves the previous checkpoint byte-for-byte intact. |

## Files

- `docs/design/figma-sync-state.json` — deterministic checkpoint + watchlist
  (`fileKey: fHqhA3d26OdXqm0cQxfK31`, schema version 1). Only
  `pnpm figma:checkpoint` writes it.
- `docs/design/figma-implementation-map.md` — human-readable surface ↔
  implementation ↔ Issue map.
- `scripts/figma-drift/*` — the tooling (`map.ts` is the canonical machine
  map; `map.test.ts` keeps it in sync with the markdown mirror).
