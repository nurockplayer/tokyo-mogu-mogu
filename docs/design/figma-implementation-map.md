# Figma ↔ Implementation Map (Issues #233 / #242)

This map links the current visible KiKi Figma surfaces to the live
implementation and the Issue that owns the decision. The machine-readable
source is `scripts/figma-drift/map.ts`; `scripts/figma-drift/map.test.ts` keeps
this mirror and `docs/design/figma-sync-state.json` synchronized.

## Reconciliation baseline

- Implementation base: live `origin/main` at `35ccec07d277a01c2801aef51d13e1bcb19a9b4a` (PR #247 merged).
- Live visible-prototype inventory: 45 top-level Page 1 nodes from the connected KiKi Figma bridge.
- Current product-facing watchlist: 41 nodes, including full screens, meaningful alternate states, and content/reference groups.
- Four current top-level nodes are non-product board/asset infrastructure (`1:832`, `1:467`, `34:236`, `23:3623`) and are accounted for in the audit document, not watched.
- The earlier #242 audit at `e559819f7dba50228586b17ca4a1fda518e40542` reported 48 inspected nodes, 43 meaningful product nodes, and 29 full-screen/alternate states. That historical count is retained in the audit record; the current bridge snapshot is the source for this watcher update.
- No Figma checkpoint is created here. `figma-sync-state.json` keeps `checkpoint: null` until the team explicitly acknowledges a new baseline.

## Status enum

| Status | Meaning |
| --- | --- |
| `MATCH` | Current implementation covers the visible state or content reference. |
| `FIGMA_CHANGED` | Live Figma moved; implementation may be behind. |
| `IMPLEMENTATION_BEHIND` | An accepted Figma revision is not yet implemented. |
| `ISSUE_MISSING` | A current change has no owning Issue. |
| `INTENTIONALLY_DIFFERENT` | Deliberate, documented engineering/product/reference deviation. |
| `UNRESOLVED` | Human Product/Design behavior is required before implementation. |

## Current watched surfaces (41)

| Node id | Surface | Journey role | Implementation / owner | Status |
| --- | --- | --- | --- | --- |
| `1:95` | Landing | Journey entry | `LandingPage` / #201, #217 | `MATCH` |
| `2:21` | Food Profile welcome (start-only variant) | Intro alternate | `FoodProfilePage` `IntroCard` / #201, #217, #242 | `MATCH` |
| `2:245` | Food Profile welcome | Intro | `FoodProfilePage` `IntroCard` / #201, #217 | `MATCH` |
| `2:312` | Nickname prompt | Pre-input conversation state | `FoodProfilePage` `NicknameStep` / #201, #217, #246 | `MATCH` |
| `2:548` | Nickname submitted | Completed nickname state | `FoodProfilePage` transcript / #201, #217, #246 | `MATCH` |
| `2:383` | Nickname input modal | Modal presentation | `FoodProfilePage` `FigmaInputModal` / #201, #208, #246 | `MATCH` |
| `2:623` | Food Profile interview Q1 (allergy) active | Dietary interview 1/4 | `PHASE1_INTERVIEW` / #201, #217, #246 | `MATCH` |
| `3:854` | Food Profile interview Q1 (allergy) completed | Allergy answer state | Sequential transcript / #201, #217, #242 | `MATCH` |
| `3:959` | Food Profile interview Q2 (diet) active | Dietary interview 2/4 | `PHASE1_INTERVIEW` / #201, #217, #242 | `MATCH` |
| `3:1081` | Food Profile interview Q2 (diet) completed | Diet answer state | Sequential transcript / #201, #217, #242 | `MATCH` |
| `3:1203` | Food Profile interview Q3 (religion) active | Dietary interview 3/4 | `PHASE1_INTERVIEW` / #201, #217, #242 | `MATCH` |
| `3:1320` | Food Profile interview Q3 (religion) completed | Religion answer state | Sequential transcript / #201, #217, #242 | `MATCH` |
| `3:1500` | Food Profile interview Q4 (dislikes) active | Dietary interview 4/4 | `PHASE1_INTERVIEW` / #201, #217, #242 | `MATCH` |
| `3:1599` | Food Profile interview Q4 (dislikes) completed | Dislike answer state | Sequential transcript / #201, #217, #242 | `MATCH` |
| `3:1702` | Food Profile summary | Profile summary | `FoodProfilePage` neutral save / #201, #224 | `MATCH` |
| `3:1835` | Post-profile fork | Recommend/browse fork | `FoodProfilePage` `ForkStep` / #201, #224 | `MATCH` |
| `3:772` | Food Profile free-input modal | Presentation-only “other” input | `FoodProfilePage` `FigmaInputModal` / #201, #208, #246 | `MATCH` |
| `3:1952` | ReturningHome | Returning home + history | `LandingPage`, `HistorySection`, `PrototypeShell` / #201, #92 | `MATCH` |
| `4:2101` | Experience | Exploration Q1 | `ExplorationWizardPage` / #201, #217, #230 | `MATCH` |
| `8:2436` | Departure | Exploration Q2 | Area chips + travel pairs / #201, #206, #230 | `MATCH` |
| `23:3131` | Travel tolerance | Exploration Q3 | `ExplorationWizardPage` / #201, #206, #230 | `MATCH` |
| `23:3207` | Duration | Exploration Q4 | `ExplorationWizardPage` / #201, #206, #230 | `MATCH` |
| `23:3262` | Taste + Theme | Exploration Q5 | `ExplorationWizardPage` / #201, #206, #230 | `MATCH` |
| `23:3380` | Result | Match result | `ResultPage` / #201, #217, #241 | `MATCH` |
| `52:3995` | Story | Food-culture story | `StoryPage` / #201, #224, #241 | `MATCH` |
| `119:254` | Story route-generation loading overlay | Story → Route transition | Pending Product/Design decision / #201, #208, #242 | `UNRESOLVED` |
| `119:681` | Route | Generated route page | `RoutePage` / #201, #92, #242 | `MATCH` |
| `122:889` | Route saved state | Save confirmation / My Route affordance | `RoutePage`, `MyRoutePage` / #92, #201, #242 | `MATCH` |
| `125:1752` | Spot | Route → Spot detail | `SpotPage` / #92, #201, #242 | `MATCH` |
| `62:4983` | Story nearby spot experience group | Story content reference | Story nearby cards / #224, #242 | `MATCH` |
| `62:4830` | Story nearby spots group | Story content reference | Story nearby section / #224, #242 | `MATCH` |
| `62:4616` | Spot related card group | Spot content reference | `SpotPage` / #224, #242 | `MATCH` |
| `62:4615` | Spot card collection group | Spot content reference | `SpotPage` / #224, #242 | `MATCH` |
| `60:4426` | Story long-form content reference | Editorial content group | Responsive `StoryPage` / #224, #242 | `MATCH` |
| `60:4385` | Story mobile long-form content reference | Editorial content group | Responsive `StoryPage` / #224, #242 | `MATCH` |
| `52:4092` | Sticky story CTA | Story → Route convenience | `StoryPage` / #232, #242 | `INTENTIONALLY_DIFFERENT` |
| `23:3620` | Route-generation CTA reference | Story → Route reference | Current Story CTA / #201, #208, #242 | `INTENTIONALLY_DIFFERENT` |
| `8:2608` | Departure search dialog | Exploration search reference | Presentation-only/deferred search / #206, #242 | `INTENTIONALLY_DIFFERENT` |
| `8:2903` | Departure search dialog alternate | Exploration search reference | Presentation-only/deferred search / #206, #242 | `INTENTIONALLY_DIFFERENT` |
| `1:43` | Destination search field reference | Departure reference component | Bounded area choices / #206, #242 | `INTENTIONALLY_DIFFERENT` |
| `1:23` | Prototype bottom navigation reference | Prototype shell chrome | `PrototypeShell` + current Product IA / #92, #203, #226, #242 | `INTENTIONALLY_DIFFERENT` |

The `3:854` / `3:959` / `3:1081` labels deliberately correct the prior map’s
semantic shift: the live visible text identifies Q1 allergy, Q2 everyday diet,
and Q2 completed state respectively.

## Retired or stale node aliases (not watched)

These IDs remain in the machine map only so older drift/audit references resolve
honestly. They are not in the current bridge top-level inventory and are not
counted as current coverage.

| Node id | Replaced/accounted-for by | Reason |
| --- | --- | --- |
| `62:5023` | Current Story CTA/content groups | Historical node alias; current bridge does not expose it. |
| `55:4166` | `119:681` Route | Current route frame moved/changed. |
| `23:3621` | `23:3620` CTA reference | Current reference node moved/changed. |
| `62:4620` | `62:4616`, `62:4615` Spot groups | Current Spot grouping moved/changed. |

## Non-product nodes accounted for by #242

The current bridge inventory also exposes `1:832` (status-bar instance),
`1:467` (logo asset), `34:236` (UX decision board), and `23:3623` (requirements
reference board). These are design/asset infrastructure rather than product
surfaces and are intentionally not watched.

## The remaining #242 blocker

`119:254` is visually legible as a dimmed Story page with a mascot, spinner, and
“観光ルートを生成中” message. The visible frame does not establish what
starts it, how long it lasts, what completes it, whether it can be cancelled,
what happens on error, or whether route generation is real or only a prototype
transition. Implementing an artificial delay, route optimizer, or speculative
completion state would cross the #201/#208 boundary. #242 therefore remains
open with conservative verdict `MISSING_IMPLEMENTATION_FOUND` until
Product/Design supplies that behavior decision.

## Keeping the map fresh

- `pnpm figma:check` is read-only and reports drift against an acknowledged checkpoint.
- `pnpm figma:checkpoint` is the explicit baseline operation; it does not classify implementation status.
- Any new current meaningful node must receive one map status, an owner Issue, and a state-file entry before #242 can close.
