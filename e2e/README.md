# Browser validation

The canonical browser merge/release gate is `current-mvp-smoke.spec.ts`, run
through the root `playwright.config.ts`. CI invokes that file explicitly for
core-risk changes, so focused or historical suites cannot become Product
authority by accident.

The gate protects the current 375px Japanese release baseline:

- Welcome and the progressive Food Profile;
- Home and all five 食旅を見つけ steps;
- Result → Story → Route → Spot, including the current loading state;
- route-save and Spot-favorite persistence across reloads;
- the 食旅を見つけ / モグモグる / お気に入り / マイ Dock destinations.
- no horizontal overflow and middle-only scrolling on the current wizard and
  Result shells.

The smoke test validates the Product; it does not define Product behavior.
Current live KiKi Figma and current merged `main` remain the authorities.

## Suite classification

| Classification | Files | Execution |
| --- | --- | --- |
| Canonical release gate | `current-mvp-smoke.spec.ts` | `pnpm exec playwright test e2e/current-mvp-smoke.spec.ts` |
| Focused current regression | `issue-283-visual-parity.spec.ts`, `issue-296-my-badges.spec.ts`, `issue-298-route-mission-parity.spec.ts`, `issue-281-operational-provenance.spec.ts`, `issue-281-story-factual-honesty.spec.ts`, `issue-208-screen-focus.spec.ts` | `pnpm exec playwright test --config playwright.regressions.config.ts` |
| Historical / non-authoritative | Issue #276 Netlify parity suite | Removed after the #297 audit; never restore it as a current gate |

The retained #283 suite checks focused CTA, autofocus, card geometry,
departure-field, progress-art, and translated-card regressions that still match
current `main`. The #296 suite protects the current My/Badge interactions,
safe-area behavior, and shared shell geometry. These suites are intentionally
non-gating because exact visual/layout assertions require reconciliation against
live Figma when Product changes.

The #298 suite protects the 375px Route cards across the Japanese, English,
and Traditional Chinese locales: neither canonical duration may expose the
removed localized Mission UI, and share, save, and spot-open controls remain
available.

The #281 operational-provenance suite protects corrected tourism-office facts,
dated non-verified first-party/operator sources, route estimate disclosures,
and operational venue-card copy across all three locales at 375px.

The #281 Story factual-honesty suite protects the two source-backed,
five-chapter editorial fixtures across all three locales, including exact
Yamame naming/launch milestones, source disclosures, carousel scrolling,
sticky-CTA usability, and the 375px overflow boundary.

The #208 screen-focus suite protects programmatic focus continuity across the
current Reference SPA, localized destination announcements, and query-only
updates that must retain the traveler's interactive focus.

The removed #276 suite encoded the superseded Netlify authority model, fixed
animation windows, obsolete selectors, and historical contrast/layout
assumptions. Current release-critical coverage now lives in the canonical gate;
non-demo data identity and Food Profile state transitions remain covered by
focused unit/component tests.

Build the production bundle before either local browser command:

```sh
pnpm build
pnpm exec playwright test e2e/current-mvp-smoke.spec.ts
pnpm exec playwright test --config playwright.regressions.config.ts
```
