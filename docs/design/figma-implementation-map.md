# Figma ↔ Implementation Map (Issue #233)

Read-only drift tooling links each watched Figma surface to its implementation
and owning Issues. This document is the **human-readable mirror** of the
machine-readable canonical data in
`scripts/figma-drift/map.ts`; `map.test.ts` keeps the two in sync (node-id
sets must match).

The map is seeded from the acknowledged **#234 audit baseline** (main
`9948f714ba27aa60533cdaf6e641638026571a25`, `CAUGHT_UP`). Statuses are the
#233 enum.

## Status enum

| Status | Meaning |
| --- | --- |
| `MATCH` | Implementation currently matches the acknowledged Figma baseline. |
| `FIGMA_CHANGED` | Live Figma moved; implementation may be behind (decided at `figma:check` / review time). |
| `IMPLEMENTATION_BEHIND` | Acknowledged gap: implementation lags an accepted Figma revision. |
| `ISSUE_MISSING` | A surface changed and no tracked Issue owns the parity work. |
| `INTENTIONALLY_DIFFERENT` | Deliberate, documented deviation (engineering / accessibility / product). |
| `UNRESOLVED` | Needs a human decision before it can be classified. |

Every surfaced change must be classified into exactly one
[change-classification contract](./figma-drift.md#change-classification-contract).

## Watched surfaces (24)

Watched surfaces carry a Figma node id and appear in
`docs/design/figma-sync-state.json` under `watchedNodes`.

| Node id | Surface | Journey role | Implementation | Owning Issues | Status |
| --- | --- | --- | --- | --- | --- |
| `1:95` | Landing | Journey entry | `LandingPage` + `ReturningHome` (`src/pages/s0s3/LandingPage.tsx`; mascot + 食旅をはじめる) | #201, #217 | MATCH |
| `2:245` | Food Profile welcome | Food-profile intro | `FoodProfilePage` `IntroCard` (`fpStartCta` / `fpBrowseCta`) | #201, #217 | MATCH |
| `2:312` | Nickname | Nickname step | `FoodProfilePage` `NicknameStep` | #201, #217 | MATCH |
| `2:548` | Nickname | Nickname step | `FoodProfilePage` `NicknameStep` | #201, #217 | MATCH |
| `2:623` | Food Profile interview Q1 (allergy) | Dietary interview step | `PHASE1_INTERVIEW` (`FoodProfilePage`) + `fpIvStep` ({n}/{total}) + chips | #201, #217 | MATCH |
| `3:854` | Food Profile interview Q2 (diet) | Dietary interview step | `PHASE1_INTERVIEW` (`FoodProfilePage`) + `fpIvStep` ({n}/{total}) + chips | #201, #217 | MATCH |
| `3:959` | Food Profile interview Q3 (religion) | Dietary interview step | `PHASE1_INTERVIEW` (`FoodProfilePage`) + `fpIvStep` ({n}/{total}) + chips | #201, #217 | MATCH |
| `3:1081` | Food Profile interview Q4 (dislikes) | Dietary interview step | `PHASE1_INTERVIEW` (`FoodProfilePage`) + `fpIvStep` ({n}/{total}) + chips | #201, #217 | MATCH |
| `3:1203` | Food Profile interview (additional node) | Dietary interview step | `PHASE1_INTERVIEW` (`FoodProfilePage`) + `fpIvStep` ({n}/{total}) + chips | #201, #217 | MATCH |
| `3:1702` | Food Profile summary | Summary + edit note | `fpIvSummaryTitle` + `fpEditNote` | #201 | MATCH — minor copy delta B, non-blocking (#234 audit) |
| `3:1835` | Post-profile fork | 食旅 fork | `fpForkTitle` / `fpForkRecommend` / `fpForkBrowse` | #201 | MATCH |
| `3:1952` | ReturningHome | Returning-visitor home + history | `ReturningHome` (greeting + Let's Go! + HistorySection + bottom nav) — `src/pages/s0s3/LandingPage.tsx`, `src/pages/s0s3/history-section.tsx` | #201, #92 | MATCH |
| `4:2101` | Experience | Exploration Q1 | `ExplorationWizardPage` S2 Q1 (`PHASE1_EXPERIENCES` eat/buy/meet) | #201, #217, #230 | MATCH — flow convergence via #217 |
| `8:2436` | Departure | Exploration Q2 | area chips + `PHASE1_AREA_TRAVEL_PAIRS` (search deferred) | #201, #206, #230 | MATCH — departure-point search deferred (#206) |
| `23:3131` | Travel tolerance | Exploration Q3 | `ExplorationWizardPage` S2 Q3 | #201, #206, #230 | MATCH |
| `23:3207` | Duration | Exploration Q4 | `ExplorationWizardPage` S2 Q4 | #201, #206, #230 | MATCH |
| `23:3262` | Taste + Theme | Exploration Q5 | `ExplorationWizardPage` S2 Q5 (`exSubStep` 1/2・2/2, おまかせ) | #201, #206, #230 | MATCH |
| `23:3380` | Result | Match result | `ResultPage` (96%/91% + match + demo note + tags) — `src/pages/s0s3/ResultPage.tsx` | #201, #217 | MATCH |
| `52:3995` | Story | Story | `StoryPage` (hero + sections 01-05 + MOGUMOGU ポイント + nearby) — `src/pages/StoryPage.tsx` | #201, #224 | MATCH |
| `62:5023` | Story footer CTA | Story → Route CTA | `s4CtaLabel` ja/en/zh-TW (`src/i18n/resources.ts`) + `StoryPage` Section 7 | #235, #236 | MATCH |
| `52:4092` | Sticky story CTA | Demo convenience | `s4StickyCta` わさびの旅を見る | #232 | INTENTIONALLY_DIFFERENT — PR #232 documented deviation 5 |
| `55:4166` | Route | Route page | `RoutePage` (title + steps + bottom nav) — `src/pages/RoutePage.tsx` | #201, #92 | MATCH |
| `23:3621` | Route dialog CTA (reference) | Not implemented | — (reference only, out of scope) | — | INTENTIONALLY_DIFFERENT — out of scope for 8/23; kept as a watched reference node |
| `62:4620` | Spot category pills | Spot category treatment | `SpotPage` type pills/tag — `src/pages/SpotPage.tsx` | #232, #224 | INTENTIONALLY_DIFFERENT — PR #232 documented deviation 4 |

## Cross-cutting engineering deviations (not node-watched)

These are deliberate deviations without a single Figma node. They are listed
in the map (`watched: false`) so drift review always re-checks the
documentation, but they carry no node hash.

| Surface | Journey role | Implementation | Owning Issues | Status |
| --- | --- | --- | --- | --- |
| Prototype shell chrome | Prototype chrome | `PrototypeShell` compact header (locale + reset) | #232 | INTENTIONALLY_DIFFERENT — PR #232 documented deviation 6 |
| Sequential chat model | Exploration / food-profile presentation | LINE/ChatGPT sequential reveal + scroll — `conversation.tsx` `scrollTurnIntoView` | #230, #232 | INTENTIONALLY_DIFFERENT — PR #232 documented deviation 1 (#230 contract) |
| No page-level 次へ | Exploration presentation | #230 contract — `exNext` only on FP summary → fork | #230 | INTENTIONALLY_DIFFERENT — PR #232 documented deviation 2 |
| Body font | Conversation typography | Zen Kaku Gothic New (CJK) — `src/ui/tokens.css` | #232 | INTENTIONALLY_DIFFERENT — PR #232 documented deviation 3 |
| Question text ink | FP / exploration question legibility | WCAG AA (ink, not white) — `FoodProfilePage.css` `var(--tmm-color-ink)` | #232 | INTENTIONALLY_DIFFERENT — PR #232 documented deviation 7 (accessibility) |
| Experience tile caption | Experience presentation | bottom caption (mobile legibility) — Experience tiles | #232 | INTENTIONALLY_DIFFERENT — PR #232 documented deviation 8 |

## Keeping the map fresh

- **Drift review** (`pnpm figma:check`): re-labels a surface as `FIGMA_CHANGED`
  (or `new` / `missing`) in the report. Do not mutate the checked-in map from
  tool output — update it deliberately during checkpoint review.
- **Checkpoint** (`pnpm figma:checkpoint`): only re-baselines hashes. It does
  not change statuses.
- **Status updates** are a deliberate human action: edit `map.ts`, regenerate
  this doc's table to match, and keep the node-id sets equal (`map.test.ts`
  enforces it).
