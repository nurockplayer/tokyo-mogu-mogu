# Browser validation

The canonical browser merge/release gate is `current-mvp-smoke.spec.ts`, run
through the root `playwright.config.ts`. CI invokes that file explicitly for
core-risk changes. Focused browser checks do not replace or expand this gate.

The gate protects the current 375px Japanese release baseline:

- Welcome and the progressive Food Profile;
- Home and all five 食旅を見つけ steps;
- Result → Story → Route → Spot, including the current loading state;
- route-save and Spot-favorite persistence across reloads;
- the 食旅を見つけ / モグモグる / お気に入り / マイ Dock destinations;
- no horizontal overflow and middle-only scrolling on the current wizard and
  Result shells.

The smoke test validates the Product; it does not define Product behavior.
Current live KiKi Figma and current merged `main` remain the authorities.

## Retained suite inventory

| File | Owner | Purpose | Status | Command |
| --- | --- | --- | --- | --- |
| `current-mvp-smoke.spec.ts` | Product release flow | Current 375px Japanese journey, persistence, Dock, and layout baseline | Canonical release gate (17 cases) | `pnpm exec playwright test e2e/current-mvp-smoke.spec.ts` |
| `data-review-board.spec.ts` | Internal Data Review Board | Board queue, evidence, review handoff, and confirmation workflow | Internal focused check (16 cases) | `pnpm test:data-review` |
| `issue-283-visual-parity.spec.ts` | Exploration and Result surface | CTA, autofocus, card geometry, departure field, progress art, and translated-card regressions | Focused, non-gating (5 cases) | `pnpm test:regressions e2e/issue-283-visual-parity.spec.ts` |
| `issue-296-my-badges.spec.ts` | My and Badge surface | Current badge interactions and safe-area behavior | Focused, non-gating (5 cases) | `pnpm test:regressions e2e/issue-296-my-badges.spec.ts` |
| `issue-313-my-badges-layout.spec.ts` | Shared shell and My surface | Shared shell geometry, device-chrome exclusion, and adaptive My spacing | Focused, non-gating (3 cases) | `pnpm test:regressions e2e/issue-313-my-badges-layout.spec.ts` |
| `issue-348-ome-sake.spec.ts` | Ome/Sawai sake journey | MOGU recovery to Story → Route → Spot, direct identity paths, and fail-closed conflicting identities while Result stays at two fixtures | Focused, non-gating (16 cases) | `pnpm test:regressions e2e/issue-348-ome-sake.spec.ts` |
| `issue-349-hachioji-ginger.spec.ts` | Hachioji ginger journey | MOGU recovery to Story → Route → Spots, localized content, and identity checks while Result stays at two fixtures | Focused, non-gating (5 cases) | `pnpm test:regressions e2e/issue-349-hachioji-ginger.spec.ts` |
| `issue-350-fussa-sake.spec.ts` | Fussa sake journey | MOGU recovery to Story → Route → all Spots and identity chain while Result stays at two fixtures | Focused, non-gating (5 cases) | `pnpm test:regressions e2e/issue-350-fussa-sake.spec.ts` |
| `issue-351-akiruno-produce.spec.ts` | Akiruno produce journey | MOGU recovery to Story → Route → Spots, localized content, and identity checks while Result stays at two fixtures | Focused, non-gating (5 cases) | `pnpm test:regressions e2e/issue-351-akiruno-produce.spec.ts` |
| `issue-374-route-spacing.spec.ts` | Route surface | Focused route spacing regression across supported viewport sizes | Focused, non-gating (3 cases) | `pnpm test:regressions e2e/issue-374-route-spacing.spec.ts` |
| `issue-379-food-profile-modal-dismiss.spec.ts` | Food Profile dialogs | Dialog dismissal and return-to-profile interaction | Focused, non-gating (9 cases) | `pnpm test:regressions e2e/issue-379-food-profile-modal-dismiss.spec.ts` |

The nine regression suites are configured by
`playwright.regressions.config.ts`; an optional file filter can be appended to
`pnpm test:regressions` as shown above. Append `--list` to a filtered command
to inspect the selected tests without running them. They remain non-gating because focused
visual, layout, and journey assertions need reconciliation with current live
Figma when Product changes. The Board suite is an internal workflow check, run
when that workflow changes; it is not the canonical Product smoke.

The removed #276 suite encoded the superseded Netlify authority model, fixed
animation windows, obsolete selectors, and historical contrast/layout
assumptions. Current Product behavior and domain logic remain covered by the
canonical browser gate and focused Vitest/component tests.

## Running browser checks

Build the production bundle before the direct browser commands:

```sh
pnpm build
pnpm exec playwright test e2e/current-mvp-smoke.spec.ts
pnpm test:regressions
pnpm test:data-review
```

`pnpm test:e2e` builds and runs the canonical smoke through the root
`playwright.config.ts`. The direct smoke,
regression, and data-review commands use the existing production bundle and
therefore require `pnpm build` first.
