# Repository guidance

## Current authority

TOKYO MOGU MOGU's visible Product baseline is the Figma-complete mobile MVP
merged in PR #279.

Resolve Product, UI, interaction, and runtime questions in this order:

1. the currently connected KiKi Figma file, inspected directly through the
   local Hopp `figma-bridge`;
2. current merged `main`;
3. `docs/specs/product/hackathon-product-contract.md` as the concise contract
   for that live state.

Tests validate current behavior; they do not define Product behavior. Git
history, closed Issues, old screenshots, static Figma maps, former Netlify
references, pre-#279 UI/IA documents, and legacy routes/components are
non-authoritative history. Never restore behavior solely because one of those
sources once called it canonical.

## Current visible MVP

- Mobile-first, with 375px as the review and demo baseline.
- Japanese is the default locale; English and Traditional Chinese are visible
  runtime options.
- The primary journey is Food Profile → 食旅を見つけ → Result → Story → Route
  → Spot.
- The visible Dock destinations are 食旅を見つけ, モグモグる, お気に入り, and
  マイ.
- Food Profile is a progressive conversation with nickname, dietary questions,
  summary, completion choices, and a separate edit flow.
- 食旅を見つけ is a five-step exploration flow with selectable and searchable
  states.
- Result presents the two current live-Figma journey cards. Do not reintroduce
  the old ranked Top-3 contract.
- Story, Route, and Spot include the current loading, reveal, regeneration,
  save, share, favorite, gallery, and practical-information states on `main`.
- Home, MOGU, Favorites, My, empty/saved states, profile editing, and locale
  switching are part of the current MVP.
- Runtime persistence is accountless and local. Do not add production
  infrastructure unless a current Issue requires it.

Exact current routes, surfaces, and state ownership are recorded in
`docs/specs/product/hackathon-product-contract.md`.

## Product and evidence boundaries

The durable Product domain remains Tokyo-wide, multi-region ×
multi-food-culture, for Japanese and international travelers. Okutama × Tokyo
Wasabi is the deterministic 2026-08-23 demo path, not the permanent Product
scope or shared-contract boundary.

Files identified as evidence preserve factual provenance, source URLs,
retrieval dates, verification status, licenses, research, and fieldwork
material. They may support displayed content, but they do not define visible
navigation, UI, recommendation semantics, or Product scope.

Never silently convert a research candidate, editorial fixture, or unverified
fact into verified Product data. Hours, prices, reservations, access details,
and venue facts can change and must retain their verification caveats. Dietary
input is recommendation-only and must not be presented as a safety guarantee.

## Figma implementation

Inspect the current live Figma directly before changing a visible surface. Do
not use old exports, screenshots, implementation maps, reconciliation ledgers,
IA documents, or remembered node IDs as a shortcut.

Match the current runtime's established typography, spacing, colors,
photography, card geometry, motion rhythm, progressive reveals, tactile
feedback, scrolling, and transitions. Make the smallest change that satisfies
the live frame or state. Netlify-era selectors and choreography are obsolete.

## Development workflow

- Start implementation from current `origin/main`; reconcile the current
  Issue and open PR state first.
- Use `rtk` for all `git` and `gh` shell commands.
- Use pnpm; do not migrate package managers.
- Prefer existing runtime patterns and the smallest independently verifiable
  vertical slice.
- Before changing shared routing, persistence, tokens, geometry, schemas, or
  APIs, scan direct consumers and relevant tests.
- Preserve unrelated user changes. Never force-push shared branches or merge
  without explicit authority.
- Do not perform archaeology, speculative abstraction, unrelated refactoring,
  documentation beautification, or legacy restoration.
- Parallelize only independent work with disjoint write scopes; the integrating
  agent owns visual consistency and final verification.

Code identifiers, APIs, schemas, comments, and commit messages use English.
User-facing copy remains structurally complete in ja/en/zh-TW.

## Validation

For a visible Product change, manually inspect the affected flow at 375px and
run the current smoke test. Before declaring implementation complete, run:

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm exec playwright test e2e/current-mvp-smoke.spec.ts
```

Use `PLAYWRIGHT_PORT=<free-port>` when port 4173 belongs to another worktree.
Do not repair obsolete suites to make a current change pass.

Review only the current diff, the Issue acceptance criteria, the live contract,
and plausible regressions. Report either concrete blocking findings or exactly
`No blocking findings.`

## Long-running work

For work likely to exceed about an hour, report meaningful milestones as:

```text
STATUS: <stage>
DONE: <latest completed milestone>
NOW: <current work>
NEXT: <next concrete action>
BLOCKER: <none or exact blocker>
```

For long-running GitHub work, the Issue is the specification, the PR carries
implementation/review state, and one `<!-- agent-handoff:v1 -->` comment holds
the compressed execution state.

## Definition of done

A Product ticket is done when current live-Figma/current-main acceptance is
implemented, the changed flow is manually usable at 375px, relevant validation
passes, source caveats remain honest, and the focused PR references its Issue.
