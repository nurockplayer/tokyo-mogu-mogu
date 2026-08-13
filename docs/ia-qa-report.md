# App IA QA Verification Report (Issue #82)

Tracking Issue: #82

This report records the real-browser verification of the current App IA
(`Home / Discover / MOGU / My`) across first-time / returning flows, MOGU
Recent, My Saved Routes, Discover browse, and 375px multilingual behavior.
It is refreshed after the #81 (My → Food Profile edit) and #93 (Discover →
Spot back context) integration fixes landed, and again for the 2026-08-14
Lane A Core Release QA pass below.

## Environment

- Integration branch: `fix/integration` (latest `origin/main` + the #81
  Food-Profile-edit fix + the #93 Spot-back-context fix)
- Lane A QA branch: `qa/82-core-release-qa` @ `a0c13c0` (== `origin/main`)
- Browser: real-browser walkthrough via dev server
- App state: deterministic demo data; accountless local persistence

## Verification Commands

| Command | Result |
|---|---|
| `pnpm typecheck` | ✅ |
| `pnpm lint` | ✅ (0 errors) |
| `pnpm test` | ✅ 423 passed (39 files) |
| `pnpm test:e2e` | ✅ 1 passed (golden path, 375px ja-JP) |
| `pnpm build` | ✅ |

## Acceptance Criteria — Results

| # | AC | Result | Evidence |
|---|---|---|---|
| 1 | Primary nav is `Home / Discover / MOGU / My` | ✅ PASS | AppShell bottom nav shows exactly Home / さがす (Discover) / MOGU / マイ (My) |
| 2 | First-time and returning flows work accountlessly | ✅ PASS | First-time: Home → Food Profile → 5-step Exploration → Result. Returning: Home → Exploration directly (Food Profile persisted) |
| 3 | Food Profile and Exploration have distinct lifecycle | ✅ PASS | Food Profile persisted to localStorage (reload survives); Exploration is per-trip (sessionStorage) |
| 4 | Discover works without diagnosis and preserves browse context | ✅ PASS | Discover → 東京わさび Story → back returns to /discover; no Food Profile required |
| 5 | MOGU Recent is max-5/reloadable and distinct from Saved Routes | ✅ PASS | Result auto-records to MOGU; entry shows title/time/tags; MOGU empty → populated after Result; separate from Saved |
| 6 | My Saved Routes and Food Profile editing work after reload | ✅ PASS | Saved 奥多摩わさび紀行 route persists after reload; Food Profile Edit CTA enters /food-profile/edit (mode="edit") |
| 7 | No standalone Support page required | ✅ PASS | Support actions distributed in Story/Route/Spot; no nav item |
| 8 | Booking/purchase actions do not fake unavailable destinations | ✅ PASS | Only visit has confirmed external URL; others render disabled "準備中" |
| 9 | Result/Story/Route/Spot work from both recommendation and browse/recent contexts | ✅ PASS | MOGU reopen → Result(?from=mogu) → Story(?backTo=/mogu) → Route(?from=story&backTo=/mogu) → Spot(back to Route); Discover → Spot → back to /discover |
| 10 | ja/en/zh-TW no horizontal overflow at 375px | ✅ PASS | Real-browser 375px pass: ja / en / zh-TW all `scrollWidth === clientWidth === 375` on My |
| 11 | WCAG/tap/focus basics | ✅ (partial) | 44px primary tap targets (`--tmm-tap-min`) + focus-visible styles on btn/chip/card/nav/locale. Secondary `tmm-btn--sm` actions are 38px by design (existing, not introduced here); WCAG contrast audit not run |
| 12 | Badge not blocking | ✅ | My → Badges renders Stretch-only entry tag; My ships cleanly without it |
| 13 | Unverified/demo content clearly distinguishable | ✅ | Discover shows 編集部作成 (editorial) and デモデータ (demo) tags; future cultures tagged 今後追加予定 |

## First-time Flow (real-browser)

```
Home → Food Profile (create) → Exploration (5 steps) → Result
Result → (auto-records MOGU Recent) → Story → Route → Save → My
```

Verified:
- Result `/explore/result` reached after Food Profile + 5 Exploration steps.
- MOGU card shows 東京わさび + match tags + timestamp.
- Route save writes to Saved Routes; My shows 奥多摩わさび紀行.

## My → Food Profile Edit (#81 fix, real-browser)

- My's Food Profile Edit CTA href = `/food-profile/edit`.
- Clicking it navigates to `/food-profile/edit` and renders the
  FoodProfilePage edit/setup surface (h1 フードプロフィールをつくる),
  not the `/food-profile` view route.
- Regression test (`src/pages/MyPage.test.ts`) asserts the CTA resolves to
  `/food-profile/edit` and never to the bare `/food-profile` view route.
- Note: editing and re-running a fresh recommendation to confirm the updated
  profile is exercised by the existing FoodProfilePage flow; the #81 fix scope
  is the CTA route, covered by the regression test and browser check above.

## Discover → Spot Back (#93 fix, real-browser)

- Discover → Spot card (`?from=discover`) → Spot visible Back:
  href = `/discover`, label = 「← 戻る」. Click returns to `/discover`.
- Route → Spot → Back: href = `/route?from=story&backTo=...`, label =
  「← ルートに戻る」. Click returns to the Route (unchanged).
- MOGU → Result → Story → Route → Spot → Back = the Route with the Story
  context preserved.
- Regression tests (`src/pages/route-spot.test.ts`) cover Discover → Spot →
  Back → Discover and unchanged Route/Story/MOGU/My contexts.

## MOGU Recent (real-browser)

- Empty state before any Result: "最近のおすすめはまだありません".
- After Result: card appears automatically (no Save pressed).
- Reopen CTA → `/explore/result?from=mogu&resultId=wasabi-okutama`.
- Reopen does NOT re-record (no `.tmm-result__mogu-note` on reopen mount).
- Back chain MOGU → Result → Story → Route → back to MOGU preserved.
- Browsing MOGU does not write the current-trip session (click-time restore).

## Discover (real-browser)

- 東京わさび story card opens without diagnosis; back returns to /discover.
- 5 Okutama place cards (demo tags) open Spot pages; back returns to /discover.
- Future cultures show their own names, NOT the featured story's name.

## My (real-browser)

- Saved Routes: saved 奥多摩わさび紀行 listed; empty state before any save.
- Food Profile: 制限はありません displayed from durable profile; Edit CTA
  enters `/food-profile/edit` (the edit mode).
- Badges: Stretch-only entry tag.

## Recent != Saved (real-browser)

- MOGU Recent storage holds `wasabi-okutama` (result id); Saved Routes holds
  `okutama-wasabi-journey` (route id) — separate keys, separate semantics.

## Reload Persistence

- Reload on `/my`: Saved Routes (奥多摩わさび紀行), MOGU Recent (1 entry) and
  Food Profile all restored.

## 375px / Multilingual (real-browser)

- Viewport 375×812, My page:
  - ja: `scrollWidth === clientWidth === 375`, no horizontal overflow
  - en: `scrollWidth === clientWidth === 375`, no horizontal overflow
  - zh-TW: `scrollWidth === clientWidth === 375`, no horizontal overflow

## Lane A — Core Release QA pass (2026-08-14)

Branch `qa/82-core-release-qa`, HEAD `a0c13c0`, based on `origin/main`
(`nurockplayer/tokyo-mogu-mogu`). This pass re-verifies the core behavior /
state contracts on the current main line using the authoritative golden-path
Playwright E2E (375px, ja-JP) plus the full unit suite and a pre-delivery
`pnpm validate` (typecheck + lint + Vitest + build), all green.

### Journey verification

| Journey | Result | Evidence |
|---|---|---|
| FRESH (no Food Profile) | ✅ | Home → Food Profile setup → 5-step Exploration → Result; Result auto-records MOGU Recent (count 1) |
| RETURNING (Food Profile present) | ✅ | Home CTA routes straight to `/explore`; `/food-profile` not re-asked (E2E) |
| Reload persistence | ✅ | Food Profile, MOGU Recent and Saved Routes restored after reload (E2E) |
| MOGU Recent max-5 / reloadable / distinct from Saved | ✅ | `tmm:moguRecent:v1` capped at 5, candidate-aware dedup, separate key from `tmm:savedRoutes` |
| Discover browse does not mutate MOGU Recent | ✅ | raw `tmm:moguRecent:v1` value unchanged by Discover → Story / Spot browsing (E2E) |
| MOGU reopen journey identity preserved | ✅ | Reopen → `/explore/result?from=mogu&candidateId=…`; no re-record; back chain returns to MOGU |
| External CTAs fail safely | ✅ | only 奥多摩観光案内所 visit has a confirmed external URL; buy/visit/reserve/donate/save otherwise disabled or local |
| No demo/pilot identity leak into shared code | ✅ | `src/lib`, `src/store`, `src/app` free of Okutama/Wasabi identifiers (only comments/tests/demo-data files reference them) |

### Defect search outcome

No concrete runtime defect found in the core modules owned by this pass
(navigation / route context, Food Profile lifecycle, Exploration → Result,
MOGU Recent, Saved Routes / My, Discover browse, external CTAs, journey
identity). Therefore **no code fix and no new regression test was required**;
the golden-path E2E and the `route-spot` / `mogu-recent` / `saved-routes`
unit suites already cover these behaviors deterministically.

### Product-scope observation (no code change)

`BaseArea` in `src/lib/exploration.ts` (`'okutama' | 'tama-center' |
'tokyo-west'`) is a Tama-framed enum that flows into the shared Exploration
answer model, the persistence guard `isExplorationAnswers`, the wizard's Q3
options (`src/pages/s0s3/ExplorationWizardPage.tsx`) and the shared
recommendation candidate contract `travelTimeByBaseArea`
(`src/lib/recommendation.ts`). This bakes Tama sub-area semantics into shared
domain / recommendation contracts — a narrowing against the Product Scope
Invariant for a future Tokyo-wide Region × FoodCulture. It is **not** a
runtime defect (the demo candidate already sets `travelTimeByBaseArea: {}` and
the engine degrades gracefully), and widening it now would be speculative
post-hackathon architecture plus a persisted-data compat break. Flagged for
the coordinator to decide whether a follow-up issue (e.g. data-driven base
areas) is warranted.

## Non-verified Items

- WCAG color-contrast automated audit not run; tag states carry icons in
  addition to color.
- Secondary `tmm-btn--sm` tap targets are 38px by existing design (the 44px
  minimum applies to primary controls); noted, not a regression of this work.
- #39 Badge Stretch UI not part of core readiness.

## Known Integration Notes

- #101/#102/#103 merged cleanly; #114 (#81 fix) and #115 (#93 fix) integrate
  without conflicts and all 268 tests passed on the combined build at that time.
- #83 advisory (weekend crowding) is independent and merges cleanly.
