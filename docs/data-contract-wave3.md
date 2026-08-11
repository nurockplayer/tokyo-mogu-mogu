# Shared Data Contract — Wave 3 (Issues #12, #13, #14)

> **Status note (Issue #41, superseded by #112 / #92)**: This contract documents
> legacy platform foundations (i18n, config/env, app shell/routing). These remain
> **reusable infrastructure** — the S0–S9 child Issues (#43–#49) build on them.
> The current hackathon product contract
> (Issue #112 Product/MVP framing + Issue #92 App IA) lives at
> `docs/specs/product/hackathon-product-contract.md`.

Platform foundations built on the merged MVP + wave 2. Read before writing.

## Repo state

`main` contains the MVP (#1–#7), CI (#15), Okutama facilities (#16), GTFS data
layer (#17), tourism baseline (#18), and SDD/Auth spec (#20). Issue #2 closed.
PRs are merged via the CI quality gate (#15) — every PR you open will run
lint/typecheck/test/build automatically.

## File ownership (parallel-safe)

| Issue | Owned paths | Never touch |
|---|---|---|
| #12 i18n foundation | `src/i18n/` (new: move/extend), `src/i18n.tsx` (may migrate to dir), `src/i18n-format.ts` (new, locale-aware date/number), `src/i18n.test.ts` (new), `src/App.tsx` (import updates only) | `src/config/`, `src/app/`, other `src/pages/*`, `src/styles.css`, `src/data/*` |
| #13 config/env | `src/config/` (new: env.ts, index.ts, validation), `.env.example` (new), `.env.development` (optional), `vite.config.ts` (env define if needed) | `src/i18n/`, `src/app/`, `src/pages/*`, `src/data/*`, `src/styles.css` |
| #14 app shell | `src/app/` (new: AppShell.tsx, AppRouter.tsx, AppProviders.tsx, ErrorBoundary.tsx, LoadingBoundary.tsx, NotFoundPage.tsx), `src/App.tsx` (may migrate to app/), `src/main.tsx` (provider wiring), `src/app/` CSS | `src/i18n/`, `src/config/`, `src/pages/*` (except NotFoundPage), `src/data/*`, `src/styles.css` |

### Explicit shared-interface rules

- **#14 owns the global provider mount order.** It must mount `I18nProvider`
  (from #12's module) and the config layer (from #13, if ready) plus existing
  `CollectionProvider`. Coordinate by importing the modules by their public
  entry points (`src/i18n/`, `src/config/`) — do NOT duplicate them.
- **#12 and #14 both touch `src/App.tsx` / `src/main.tsx`.** Rule: **#14 owns
  `src/main.tsx` and the final `App` composition.** #12 may adjust imports in
  `src/App.tsx` only if #14 has not yet refactored it; to avoid conflicts, #12
  should keep its work inside `src/i18n/` and only export new public API. The
  orchestrator will integrate both.
- **#13 is fully additive** (new `src/config/`, `.env.example`) — no overlap.
- `src/styles.css` stays read-only for all three; new styles go in each
  feature's own `.css`.
- `src/pages/*` other than a new `src/app/NotFoundPage.tsx` (#14) are read-only.

## Per-issue contracts

### #12 — i18n foundation (build on existing)
Existing: `src/i18n.tsx` has `ja`/`en` blocks, `useI18n()` hook, `LocaleToggle`.
Needed for AC:
- separate `ja`/`en` translation resources (may move into `src/i18n/` modules)
- locale switch (already works via `LocaleToggle` — keep it)
- **fallback locale for undefined keys** (currently `t()` returns `undefined`)
  — add a fallback mechanism
- shared translation API usable across screens (already `useI18n`, keep as the
  shared hook; ensure it is exported from a stable entry)
- ≥1 existing UI confirms ja/en switching (already true; keep green)
- **locale-aware date and/or number formatting** — add `src/i18n-format.ts`
  with e.g. `formatDate(iso, locale)` and `formatNumber(n, locale)` using
  `Intl`. Export from the i18n entry. Add unit tests.
- Do not translate every screen (out of scope). Do not restructure unrelated code.

### #13 — config/env foundation
New module `src/config/`:
- `env.ts` — reads `import.meta.env`, exposes typed public config (e.g.
  `VITE_GOOGLE_CLIENT_ID`, `VITE_API_BASE_URL`, `VITE_MAP_PROVIDER`) with clear
  naming; public-only (never secrets).
- `index.ts` — the single config accessor used by feature code (never
  `import.meta.env` scattered).
- `validate.ts` — required-env validation; fail-fast at startup with a clear
  message when a required var is missing (keep required set small: make most
  vars optional for now).
- `.env.example` — developer template documenting every var.
- Document local/preview/production strategy in the module README or comments.
- Secret boundary: document that any `VITE_`-prefixed var is client-visible;
  never expose non-`VITE_` secrets.
- Unit tests for validation logic (pure parts).
- AC "供給 #11 Google Auth client/config 値": provide `googleClientId` accessor
  from config (may be empty string default for now).
- Do NOT wire real secrets, do not build cloud infra.

### #14 — app shell/routing/layout
New `src/app/`:
- `AppShell.tsx` — shared layout container (header + nav placeholders may reuse
  existing `.app-shell`/`.app-header`/`.app-nav` classes by importing them; do
  not edit `src/styles.css`).
- `AppRouter.tsx` — route table: existing routes (`/`, `/pokedex`, `/map`,
  `/food-cultures/:id`) plus a `*` fallback to NotFoundPage.
- `AppProviders.tsx` — mounts providers in one place: `I18nProvider` (imported
  from `src/i18n` — the #12 public entry), `CollectionProvider`, and future
  `AuthProvider` slot (do not implement auth).
- `ErrorBoundary.tsx` — class component catching render errors, showing a
  friendly fallback (ja/en copy via i18n keys you append to both blocks).
- `LoadingBoundary.tsx` — minimal route-level loading indicator (React.lazy
  Suspense wrapper or a simple `PageLoader` component).
- `NotFoundPage.tsx` — fallback UI for unknown routes (ja/en).
- `src/main.tsx` — simplify to mount `<AppProviders><AppRouter/></AppProviders>`
  (keep `BrowserRouter` here or in AppRouter — pick one and document).
- AC: multiple feature routes addable under one router; global providers from
  one mount point; common layout; route-level loading/error; not-found fallback;
  features don't create their own root/router.

## Validation (required)

```bash
pnpm install --frozen-lockfile
pnpm typecheck
pnpm lint
pnpm test      # existing 62 tests + your new tests stay green
pnpm build
```

Report each tail. #14 must keep the existing routes working (build + typecheck
prove it; the orchestrator will browser-verify after merge).

## Git & PR

- Isolated worktree already created; verify branch. Commit `feat: ... (#12|#13|#14)` +
  Co-Authored-By: Claude Fable 5 <noreply@anthropic.com>. Push `-u origin <branch>`.
- Open PR `gh pr create --base main --head <branch> --title "..." --body $'Closes #<n>...'` with Co-Authored-By trailer.
- Never push to main, never force-push. Let CI gate the merge.

## Report back

Branch, PR URL, files changed, validation tails, residual risks.
EOF