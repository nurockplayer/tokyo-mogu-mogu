# Issue #268 — lifecycle and Figma drift evidence

Captured on 2026-08-22 from the production build at the 375 × 812 baseline.

## Live Figma access status

Live Figma parity could not be re-audited in this run. The authenticated Figma
account (`nurockplayer`) is on the Starter plan, and both required read paths
returned the same tool-call-limit blocker:

- hosted MCP `get_design_context` for file `fHqhA3d26OdXqm0cQxfK31`, node `4:2101`;
- Plugin API Bridge `use_figma` page enumeration for the same file.

Per Issue #268, no fresh parity claim or speculative visual change is made from
stale `MATCH` labels, historical implementation maps, or retained screenshots.
The live audit must be repeated after the Figma quota resets or plan access is
expanded.

## Drift ledger

| Classification | Surface / difference | Resolution |
|---|---|---|
| `MUST_FIX_NOW` | First-use dietary answers were shown but discarded; a neutral profile was persisted instead. | Fixed: answers map conservatively into the existing durable Food Profile categories and free-text note. An all-none claim requires explicit `none` on all four questions. |
| `MUST_FIX_NOW` | `今回は、どんな食体験をしてみたいですか？` appeared inside a nickname-aware chat transcript, visually continuing dietary onboarding. | Fixed: `/explore` is a standalone, one-screen-at-a-time diagnosis function with no Food Profile transcript or assistant/user bubbles. |
| `MUST_FIX_NOW` | Result `今回の探索をもう一度` reopened the previous selections. | Fixed: retry clears only `tmm:exploration:v1`; `tmm:foodProfile:v1` remains unchanged. |
| `INTENTIONALLY_DIFFERENT` | Result semantics are governed by #255. | Preserved: real deterministic, score-free Top 3; no `96%` / `91%` or invented confidence semantics. |
| `INTENTIONALLY_DIFFERENT` | First-run interaction is governed by #257. | Preserved: one highlighted golden-path target per beat, then unrestricted repeat diagnosis. |
| `INTENTIONALLY_DIFFERENT` | Story / Route / Spot truth is governed by #265 and the candidate identity contract. | Preserved: Story “Why this region?” evidence and Story → Route → Spot identity remain intact. |
| `INTENTIONALLY_DIFFERENT` | Product and audience scope are governed by #112 / #92. | Preserved: Tokyo-wide multi-region × multi-food-culture contracts, both Japanese and international travelers, and `Home / Discover / MOGU / My`. |
| `FOLLOW_UP` | Fresh live comparison for Landing, nickname, dietary flow, summary/edit, diagnosis controls, repeat diagnosis, navigation/history, Result, Story, Route, Spot, and ja/en/zh-TW. | Blocked by the Figma Starter-plan tool-call limit. Re-run both live read paths and compare rendered screenshots after access returns. |

## Fresh 375px rendered evidence

These are runtime screenshots, not substitutes for the blocked live-Figma side
of the comparison.

| Surface | Evidence |
|---|---|
| Landing (ja) | [01-landing-ja-375.png](./01-landing-ja-375.png) |
| Nickname modal (ja) | [02-nickname-ja-375.png](./02-nickname-ja-375.png) |
| Dietary flow (ja) | [03-dietary-ja-375.png](./03-dietary-ja-375.png) |
| Food Profile summary (ja) | [04-food-profile-summary-ja-375.png](./04-food-profile-summary-ja-375.png) |
| Diagnosis entry (ja) | [05-diagnosis-entry-ja-375.png](./05-diagnosis-entry-ja-375.png) |
| Result, real score-free Top 3 (ja) | [06-result-ja-375.png](./06-result-ja-375.png) |
| Repeat diagnosis (ja) | [07-repeat-diagnosis-ja-375.png](./07-repeat-diagnosis-ja-375.png) |
| Story (ja) | [08-story-ja-375.png](./08-story-ja-375.png) |
| Route (ja) | [09-route-ja-375.png](./09-route-ja-375.png) |
| Spot (ja) | [10-spot-ja-375.png](./10-spot-ja-375.png) |
| Diagnosis (en) | [11-diagnosis-en-375.png](./11-diagnosis-en-375.png) |
| Diagnosis (zh-TW) | [12-diagnosis-zh-TW-375.png](./12-diagnosis-zh-TW-375.png) |
| Explicit Food Profile edit (ja) | [13-food-profile-edit-ja-375.png](./13-food-profile-edit-ja-375.png) |

## Validation

- `pnpm validate`: PASS — typecheck, lint (0 errors; 25 existing warnings),
  666/666 Vitest tests, production bundle build.
- `pnpm test:e2e`: PASS — 82 Playwright tests; 1 artifact-only screenshot
  capture test skipped by default.
- `ISSUE_268_EVIDENCE=1 pnpm exec playwright test e2e/issue-268-evidence.test.ts`:
  PASS — fresh 375 × 812 screenshots generated and visually inspected.
- `rtk git diff --check`: PASS.

## Verdict

`FOLLOW_UP_REQUIRED` — implementation and local 375px verification are complete,
but the independently requested live-Figma drift audit remains blocked.
