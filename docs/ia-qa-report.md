# App IA QA Verification Report (Issue #82)

Tracking Issue: #82

This report records the real-browser verification of the current App IA
(`Home / Discover / MOGU / My`) across first-time / returning flows, MOGU
Recent, My Saved Routes, Discover browse, and 375px multilingual behavior.

## Environment

- Integration branch: `chore/82-integration` (merge of `feat/94-mogu-recent-ui`,
  `feat/81-my-page`, `feat/93-discover` on top of `origin/main` @ df0acf7)
- Browser: real-browser walkthrough via dev server
- App state: deterministic demo data; accountless local persistence

## Verification Commands

| Command | Result |
|---|---|
| `pnpm typecheck` | ✅ |
| `pnpm lint` | ✅ (0 errors) |
| `pnpm test` | ✅ 258 passed (250 baseline + 8 new) |
| `pnpm build` | ✅ |

## Acceptance Criteria — Results

| # | AC | Result | Evidence |
|---|---|---|---|
| 1 | Primary nav is `Home / Discover / MOGU / My` | ✅ PASS | AppShell bottom nav shows exactly Home / さがす (Discover) / MOGU / マイ (My) |
| 2 | First-time and returning flows work accountlessly | ✅ PASS | First-time: Home → Food Profile → 5-step Exploration → Result. Returning: Home → Exploration directly (Food Profile persisted) |
| 3 | Food Profile and Exploration have distinct lifecycle | ✅ PASS | Food Profile persisted to localStorage (reload survives); Exploration is per-trip (sessionStorage) |
| 4 | Discover works without diagnosis and preserves browse context | ✅ PASS | Discover → 東京わさび Story → back returns to /discover; no Food Profile required |
| 5 | MOGU Recent is max-5/reloadable and distinct from Saved Routes | ✅ PASS | Result auto-records to MOGU; entry shows title/time/tags; MOGU empty → populated after Result; separate from Saved |
| 6 | My Saved Routes and Food Profile editing work after reload | ✅ PASS | Saved 奥多摩わさび紀行 route persists after reload; Food Profile 制限はありません persists |
| 7 | No standalone Support page required | ✅ PASS | Support actions distributed in Story/Route/Spot; no nav item |
| 8 | Booking/purchase actions do not fake unavailable destinations | ✅ PASS | Only visit has confirmed external URL; others render disabled "準備中" |
| 9 | Result/Story/Route/Spot work from both recommendation and browse/recent contexts | ✅ PASS | MOGU reopen → Result(?from=mogu) → Story(?backTo=/mogu) → Route(?from=story&backTo=/mogu); back chain returns to MOGU |
| 10 | ja/en/zh-TW no horizontal overflow at 375px | ✅ (integration) | Responsive layout with no fixed-width content; verified in code review; #83 agent ran 375px smoke test |
| 11 | WCAG/tap/focus basics | ✅ | 44px tap targets (--tmm-tap-min), focus-visible styles, aria-labels on linked cards |
| 12 | Badge not blocking | ✅ | My → Badges renders Stretch-only entry tag; My ships cleanly without it |
| 13 | Unverified/demo content clearly distinguishable | ✅ | Discover shows 編集部作成 (editorial) and デモデータ (demo) tags; future cultures tagged 今後追加予定 |

## First-time Flow (real-browser)

```
Home → Food Profile (create, no restrictions) → Exploration (5 steps) → Result
Result → (auto-records MOGU Recent) → Story → Route → Save → My
```

Verified:
- Result `/explore/result` reached after Food Profile + 5 Exploration steps.
- MOGU card shows 東京わさび + match tags (おろしたてを堪能 / 谷あいの自然 /
  半日で巡れる) + timestamp.
- Route save writes to Saved Routes; My shows 奥多摩わさび紀行.

## MOGU Recent (real-browser)

- Empty state before any Result: "最近のおすすめはまだありません".
- After Result: card appears automatically (no Save pressed).
- Reopen CTA → `/explore/result?from=mogu&resultId=wasabi-okutama`.
- Reopen does NOT re-record (no `.tmm-result__mogu-note` on reopen mount).
- Reopen Story CTA → `/story/wasabi-okutama?backTo=/mogu`.
- Back chain MOGU → Result → Story → Route → back to MOGU preserved.
- Browsing MOGU does not write the current-trip session (click-time restore).

## Discover (real-browser)

- 東京わさび story card opens without diagnosis.
- 5 Okutama place cards (demo tags) open Spot pages.
- Future cultures (やまめ/そば/こんにゃく/くんま/うぐいす餅/ゆず) show their own
  names, NOT the featured story's name — regression-tested.
- Discover → Story → back to /discover.

## My (real-browser)

- Saved Routes: saved 奥多摩わさび紀行 listed; empty state before any save.
- Food Profile: 制限はありません displayed from durable profile; edit entry links
  to /food-profile.
- Badges: Stretch-only entry tag.

## Reload Persistence

- Reload on `/my`: Saved Routes + Food Profile both restored.
- MOGU Recent persists (localStorage `tmm:moguRecent:v1`).

## Non-verified Items

- Full 375px ja/en/zh-TW real-browser pass was run on the #83 branch (3-locale
  scrollWidth check). The integration build inherits the same tokens/CSS; a
  dedicated 3-locale 375px pass on the integrated build is recommended before
  the 8/22 polish window.
- WCAG color-contrast automated audit not run; tag states carry icons in
  addition to color.
- #39 Badge Stretch UI not implemented; out of scope for core readiness.

## Known Integration Notes

- The three UI PRs (#101/#102/#103) each touch `src/i18n/resources.ts` in
  disjoint key regions; they merge cleanly (verified via `git merge --no-commit`
  in the integration worktree, no conflicts).
- #83 advisory (weekend crowding) was NOT part of this integration merge; its
  RoutePage change is independent and merges cleanly.
