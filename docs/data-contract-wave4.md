# Shared Data Contract — Issue #8 transit-aware extension

> **Status note (Issue #41, superseded by #112 / #92)**: This contract documents
> the legacy transit-aware "next discovery" implementation. It remains **reusable
> infrastructure** but is not the current hackathon core journey. The current
> product contract (Issue #112 Product/MVP framing + Issue #92 App IA) lives at
> `docs/specs/product/hackathon-product-contract.md`. GTFS data may enrich Route /
> Spot mobility information but must not dictate a different screen flow.

Extends the existing progression implementation with GTFS-based transit-aware
"next discovery" (#8 current scope, after #17 merged). Builds on the existing
MVP progression code — do NOT rebuild it.

## Read first

- `docs/specs/` (if any spec applies — #8 has no dedicated spec; follow its
  issue body) and `docs/data-contract-wave3.md` conventions.
- `src/lib/progression.ts` — EXISTING distance-based logic to extend.
- `src/lib/gtfs.ts` — #17 data layer: `findNearbyStops(dataset, lat, lng,
  radiusMeters)` and `getNextDepartures(dataset, stopId, afterTime, limit)`.
- `src/data/gtfs-fixture/` — demo GTFS (`GTFS_FIXTURE`, origin 'demo').
- `src/components/NextDiscovery.tsx` + `src/pages/HomePage.tsx` — the current
  consumer.
- `gh issue view 8` — current acceptance criteria (source of truth).

## Issue #8 acceptance criteria relevant to this extension

- [ ] 候補 Place の最寄り bus stop を表示できる
- [ ] 利用可能な場合は次発時刻を表示できる
- [ ] 公共交通で到達しづらい候補を誤って優先しない
- [ ] GTFS 情報が取得できない場合も通常の nearby discovery が機能する

Already satisfied by the existing code (do NOT re-implement): area/category
completion, next-candidate display after collection, nearby-priority by
distance, navigation from next discovery to detail/map.

## File ownership (create/edit ONLY these)

- `src/lib/progression.ts` — EXTEND with transit-aware ranking, additive only:
  - `getNextDiscoveriesWithTransit(collectedIds, foodCultures, places,
    gtfsDataset | null, user, limit)` — ranks undiscovered candidates by
    transit accessibility: prefer candidates whose nearest place has a nearby
    bus stop AND a next departure within a reasonable window; penalize
    candidates that are hard to reach by transit; **fall back to the existing
    distance-based `getNextDiscoveries` when `gtfsDataset` is null**.
  - Add a helper `getTransitInfoForPlace(gtfsDataset, place, afterTime):
    { nearestStop, nextDeparture } | null` used by the UI to display the
    nearest bus stop + next departure time.
  - Keep the existing `getNextDiscoveries` API unchanged (backward compatible).
- `src/lib/progression.test.ts` — ADD tests: transit-aware ranking prefers
  reachable candidates; null-GTFS falls back to distance; hard-to-reach
  candidates are not prioritized; `getTransitInfoForPlace` returns stop +
  next departure when available and null when GTFS is absent.
- `src/components/NextDiscovery.tsx` — show transit info (nearest bus stop name
  + next departure time, ja/en) for each suggestion when GTFS data is present;
  hide transit info and rely on distance ranking when GTFS is absent. Uses the
  existing `GTFS_FIXTURE` (origin demo) as the demo dataset.
- `src/components/NextDiscovery.css` — styles for the transit info line.
- `src/i18n/resources.ts` — append transit-related keys to BOTH ja and en
  blocks (e.g. `busStop`, `nextDeparture`, `noTransit`).

NEVER touch: `src/lib/gtfs.ts`, `src/lib/geo.ts`, `src/data/*`, `src/store/*`,
`src/app/*`, `src/auth/*`, `src/config/*`, `src/pages/*` (except through the
NextDiscovery component which is yours), `src/styles.css`, `package.json`,
`.github/`, `AGENTS.md`, `CLAUDE.md`, `docs/specs/*`.

## Rules

- GTFS availability is OPTIONAL: when `gtfsDataset` is null/missing, ranking
  and the UI degrade to distance-only (the app must never break).
- The demo should show transit info via `GTFS_FIXTURE` (it's a demo fixture;
  label as such in the UI if needed via an existing pattern — do not present
  demo times as verified).
- Keep the change small and vertical: extend the existing progression module
  + one component + tests. Do not restructure unrelated code.

## Validation (required)

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test        # existing 86 tests + new progression tests pass
pnpm build
```

Report each tail.

## Git & PR

- Isolated worktree; verify branch. Commit `feat: make next discovery transit-aware (#8)` +
  Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>. Push `-u origin <branch>`.
- PR: `gh pr create --base main --head <branch> --title "feat: transit-aware next discovery (#8)" --body $'Closes #8 (transit-aware portion)\n\n- progression extended with transit-aware ranking (GTFS)\n- nearest bus stop + next departure shown when GTFS present\n- distance fallback when GTFS absent\n- demo via GTFS_FIXTURE\n\nCo-Authored-By: Claude Fable 5 <noreply@anthropic.com>'`
  NOTE: the issue body's non-transit ACs are already merged from the MVP; this
  PR closes the remaining transit-aware ACs. State that clearly in the PR body.
- Do not push to main. Never force-push.

## Report back

Branch, PR URL, files changed, validation tails, residual risks.
