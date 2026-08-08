# Shared Data Contract — Wave 2 (Issues #15, #16, #17, #18, #20)

Contract for the parallel first-wave implementation. Read before writing code.

## Repo state

`main` (commit `002a761`) contains the merged MVP (#1–#7, partial #8/#9). Do not
reimplement it. Reconciliation closed #1, #3, #4, #5, #6, #7. Issue #2 remains
OPEN with a new provenance acceptance criterion (source_type / source_dataset_id
/ retrieved_at / original_id). Issue #8/#9 remain OPEN pending #17.

## File ownership (parallel-safe — no overlap between wave-2 issues)

| Issue | Owned paths (create/modify) | Never touch |
|---|---|---|
| #15 CI gates | `.github/workflows/ci.yml` (new), `.github/workflows/` | All `src/`, `package.json`, lockfile |
| #16 Okutama facilities | `src/data/model.ts` (**only** append provenance fields to `DataSource`), `src/data/generated/okutama-places.ts` (new), `scripts/ingest-okutama/` (new), `docs/okutama-facilities-source.md` (new) | `src/data/index.ts`, `src/data/seed-*.ts`, `src/data/model.ts` type semantics (additive only), `src/lib/*` |
| #17 GTFS | `src/lib/gtfs.ts` (new), `src/lib/gtfs.test.ts` (new), `src/data/gtfs-fixture/` (new), `scripts/ingest-gtfs/` (new), `docs/nishi-tokyo-bus-gtfs-source.md` (new) | `src/data/model.ts`, `src/data/index.ts`, `src/data/seed-*.ts`, existing `src/lib/*` |
| #18 Tourism baseline | `docs/analytics/tokyo-tourism-baseline.md` (new) | all `src/`, `scripts/` |
| #20 SDD/Auth | `docs/specs/README.md` (new), `docs/specs/authentication/google-login.md` (new), `AGENTS.md` (append spec rules), `CLAUDE.md` (append spec rules) | all `src/`, `scripts/`, `docs/analytics/`, `.github/` |

### Shared contract rule (wave-2)

- **Only #16 may modify `src/data/model.ts`, and only to append these optional
  fields to `DataSource`: `sourceType?: 'open_data'|'fieldwork'|'official_web'|'manual'`,
  `sourceDatasetId?: string`, `retrievedAt?: string`, `originalId?: string`.**
  Keep the existing fields. Do not change `Place`/`FoodCulture` shape.
- All other issues treat `src/data/model.ts` and `src/data/seed-*.ts` as
  read-only.
- The provenance fields land here (not in a separate refactor) because #16's
  ingestion needs them to satisfy its AC "Open Data 側の original ID /
  provenance を保持する". Issue #2's open AC is then satisfied as a side effect;
  the orchestrator will re-check #2 after #16 merges.

## Public contracts per issue

### #16 — Okutama tourism facilities
- Deterministic ingestion: fixed input (CSV/JSON snapshot committed under
  `scripts/ingest-okutama/`) → normalized `Place[]`.
- Generated output file: `src/data/generated/okutama-places.ts` exporting
  `OKUTAMA_PLACES: Place[]`, with every record's `source` carrying
  `name`, `url`, `license`, `retrievedAt`, and `originalId` + `sourceType:
  'open_data'`. Lat/lng as numbers. Idempotent (re-run produces identical ids).
- Do NOT edit existing `src/data/seed-places.ts` or `src/data/index.ts`. The
  frontend integration is a follow-up the orchestrator owns.
- Realistic sample: use the actual 奥多摩町 観光施設一覧 URL in
  `docs/okutama-facilities-source.md`; if the real dataset cannot be fetched
  reliably in this environment, commit the obtained snapshot and note the
  retrieval details. Never fabricate facilities as verified data — mark demo
  rows `origin: 'demo'` and real rows `origin: 'source'`.

### #17 — Nishi Tokyo Bus GTFS
- Scope (issue): stops / routes / trips / stop_times load, Place→nearby stop
  lookup, next-departure lookup, Okutama-area demo fixture, resilient to
  missing GTFS.
- `src/lib/gtfs.ts`: pure functions, no framework deps. Types `GtfsStop`,
  `GtfsRoute`, `GtfsTrip`, `GtfsStopTime`, `GtfsDataset`; functions like
  `findNearbyStops(dataset, lat, lng, radiusMeters)` and
  `getNextDepartures(dataset, stopId, afterTime, limit)`. Distance via
  existing `src/lib/geo.ts` (read-only, import it).
- Demo fixture committed under `src/data/gtfs-fixture/` covering 奥多摩駅 area.
- GTFS availability is optional: consumers must degrade gracefully.
- No real-time GTFS, no fares, no route planning.

### #18 — Tokyo tourism impact baseline
- Pure research deliverable: `docs/analytics/tokyo-tourism-baseline.md`.
  Required sections per issue AC: dataset/source list (with year/source/license),
  central-vs-Tama comparison baseline, 2–3 key problem metrics, KPI definitions,
  pitch-ready summary, reproducible analysis note.
- Use real Tokyo Open Data (東京都観光客数等実態調査 etc.). Do NOT invent
  numbers; every figure must cite dataset+year+source. If a number is
  unavailable, mark it explicitly rather than fabricating.

### #20 — SDD / Google Auth contract
- `docs/specs/README.md`: lightweight SDD application conditions + role split
  (Spec vs Issue vs PR) + reviewer rule. Short, no heavy pipeline.
- `docs/specs/authentication/google-login.md`: Goal / Contract / Failure
  Behavior / Out of Scope / Verification, covering all bullets in the issue
  (1 identity=1 user, stable internal userId, no email/provider-id FK, no
  duplicate users, reusable authenticated state, session restore after reload,
  sign-out returns to unauthenticated, OAuth cancel/failure leaves no partial
  user, current-user surface: email/displayName/avatar).
- Append minimal spec-aware rules to `AGENTS.md` and `CLAUDE.md` (read spec
  before implementing, don't contradict spec, don't invent unresolved behavior,
  separate spec changes from implementation scope). Do not duplicate existing
  governance prose.

### #15 — CI quality gates
- `.github/workflows/ci.yml`: on `pull_request` (and push to non-main if
  useful), run `pnpm install --frozen-lockfile`, then `pnpm typecheck`,
  `pnpm lint`, `pnpm test`, `pnpm build`. Fast, deterministic, clear failure
  step. No E2E, no visual regression, no deploy.
- Do not add new package.json scripts if the existing ones suffice
  (`typecheck`/`lint`/`test`/`build` already exist).

## Validation (required before finishing)

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test     # existing 39 tests must stay green (+ any new tests)
pnpm build
```

Report the output tail of each. Do not claim a check passed unless you ran it.

## Git & PR

- Work in the isolated worktree the harness created (verify `git branch
  --show-current`). Do not rename the branch.
- Commit with a message referencing the issue (e.g. `feat: add CI quality gates
  (#15)`), then push: `git push -u origin <branch>`.
- Open a PR linked to the issue: `gh pr create --base main --head <branch>
  --title "<title>" --body "Closes #<n>"` (+ Co-Authored-By trailer in the body
  is fine). Do NOT push to main directly.
- Never force-push.

## Report back

Branch name, files changed, PR URL, validation tails, residual risks.
