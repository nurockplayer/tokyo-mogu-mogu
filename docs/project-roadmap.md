# TOKYO MOGU MOGU Hackathon Roadmap

Tracking Issue: #86

This roadmap covers the current Hackathon MVP through the submission deadline on **2026-08-23 17:00 JST**.

Status as of **2026-08-10**: the #92 reusable App IA is adopted and its code
foundation is merged. The remaining core work is My (#81), MOGU Recent UI (#94),
Discover (#93), then QA / integration.

## Planning rules

- Product Vision source of truth: #85
- Current App IA source of truth: #92 (reusable `Home / Discover / MOGU / My`)
- Merged shared UI baseline: #77 / PR #90
- Merged navigation migration: #95 / PR #96
- Primary navigation target: `Home / Discover / MOGU / My`
- Recommendation core: `Food Profile (stable) + per-trip Exploration → Result → Story → Route → Spot`
- MOGU Recent = system-managed recent results (max 5), distinct from My Saved
- My = Saved Routes + Food Profile + Badge entry
- Badge (#38/#39) remains Stretch and must not block core
- First pilot: `奥多摩 × 東京わさび`
- Support = distributed Story/Route/Spot CTA, not a standalone primary page
- Feature freeze: **2026-08-21**
- Final polish / pitch rehearsal: **2026-08-22**
- Submission: **2026-08-23 17:00 JST**

## Progress (merged milestones)

| Milestone | Result |
|---|---|
| #77 / PR #90 shared shell + primitives | **merged** — keep as baseline, do not revert |
| #95 / PR #96 nav migration to `Home / Discover / MOGU / My` | **merged** — primary-nav contract live in `src/app/AppShell.tsx` |
| #78 / PR #98 Food Profile + per-trip Exploration + Result lifecycle | **merged** — `src/lib/food-profile.ts`, `src/lib/exploration.ts`, `src/pages/s0s3/*` |
| #79 / PR #97 Story + distributed Support | **merged** — `src/pages/StoryPage.tsx` |
| #80 / PR #99 Route / Spot + external actions + save-to-My | **merged** — `src/pages/RoutePage.tsx`, `SpotPage.tsx`, `support-actions.ts` |
| #92 App IA contract | **adopted** — code implemented; Issue remains OPEN for doc follow-up (see Follow-up) |

In progress:

| Window | Work | Priority | Notes |
|---|---|---|---|
| 8/10–8/14 | #81 My: Saved Routes + Food Profile + Badge entry | P0 | shells + persistence exist; UI owned by #81 |
| 8/10–8/14 | #94 MOGU Recent list UI | P0 | `src/lib/mogu-recent.ts` merged; list UI owned by #94 |
| 8/11–8/15 | #93 Discover free exploration | P0 | reuses Story/Spot destinations; #93 fills the shell |

## Roadmap

| Window | Phase | Issue / Work | Priority | Dependency / Notes |
|---|---|---|---|---|
| done | UI baseline | #77 / PR #90 shared shell + primitives | P0 | merged baseline; keep it, do not revert |
| done | Product/IA | #92 KiKi reusable App IA | P0 | adopted; code implemented, doc follow-up OPEN |
| 8/9–8/11 | Research | #10 Okutama fieldwork / Tokyo Wasabi data | P0 | feeds #79/#80/#93 content |
| done | Navigation | #95 migrate merged shell to `Home/Discover/MOGU/My` | P0 | merged via PR #96 |
| done | Recommendation | #78 Food Profile + Exploration + Result lifecycle | P0 | merged via PR #98 |
| done | Story | #79 Story + distributed Support | P0 | merged via PR #97 |
| done | Route/Spot | #80 Route / Spot + external actions + save-to-My | P0 | merged via PR #99 |
| 8/10–8/14 | My | #81 Saved Routes + Food Profile + Badge entry | P0 | #92/#95/#78 |
| 8/10–8/14 | Recent | #94 MOGU Recent Results UI | P0 | #92/#95/#78 |
| 8/11–8/15 | Discover | #93 free exploration | P0 | #92/#95/#79/#80 |
| 8/14–8/17 | Content | fieldwork photos / verified copy / source integration | P0 | #10 → #79/#80/#93 |
| 8/15–8/17 | Data/Pitch | #19 Open Data registry / impact evidence | P1 | must not block core UX |
| 8/17–8/20 | QA | #82 current IA + 375px + ja/en/zh-TW QA | P0 | after #95/#78/#79/#80/#81/#93/#94 |
| 8/20–8/21 | Integration | E2E / bugfix / demo-data freeze | P0 | core only |
| 8/21 | Milestone | Feature Freeze | P0 | no scope expansion after this point |
| 8/22 | Hackathon | Final polish / pitch rehearsal | P0 | deterministic demo |
| 8/23 17:00 | Milestone | Submission | P0 | final deadline |
| only if core is safe | Stretch | #38 → #39 My → Badges | Stretch | must not block core |
| parallel/non-blocking | Research | #40 / #83 / #84 | P1/Stretch | findings may feed later work |

## Gantt

```mermaid
gantt
    title TOKYO MOGU MOGU Hackathon 2026
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d

    section Product / IA (merged)
    #85 Product Vision alignment          :done, p85, 2026-08-09, 1d
    #76 Approved UI fidelity contract     :done, p76, 2026-08-09, 1d
    #92 Reusable Home/Discover/MOGU/My IA :done, p92, 2026-08-09, 1d

    section UI Foundation (merged)
    #77 Shared shell + primitives         :done, p77, 2026-08-09, 1d
    #95 Nav migration to 4-tab shell      :done, p95, after p77, 1d

    section Core Recommendation (merged)
    #78 Food Profile + Exploration + Result :done, p78, 2026-08-09, 1d
    #79 Story + distributed Support        :done, p79, 2026-08-09, 1d
    #80 Route / Spot + external actions     :done, p80, 2026-08-09, 1d

    section In Progress
    #81 My (Saved Routes + Profile + Badge entry) :active, p81, 2026-08-10, 5d
    #94 MOGU Recent Results UI                     :active, p94, 2026-08-10, 5d
    #93 Discover free exploration                  :active, p93, 2026-08-11, 5d

    section Research / Data
    #10 Okutama fieldwork                 :active, p10, 2026-08-09, 3d
    Content and source integration        :content, 2026-08-14, 4d
    #19 Open Data registry cleanup        :p19, 2026-08-15, 3d

    section QA / Integration
    #82 Current IA + 375px + ja/en/zh-TW QA :p82, 2026-08-17, 4d
    E2E / bugfix / demo data freeze          :integration, 2026-08-20, 2d
    Feature Freeze                           :milestone, freeze, 2026-08-21, 0d
    Final polish / pitch rehearsal           :polish, 2026-08-22, 1d
    Submission 17:00 JST                     :milestone, submit, 2026-08-23, 0d

    section Stretch / Non-blocking
    #38 Badge contract                    :p38, 2026-08-17, 2d
    #39 My → Badges UI                    :p39, after p38, 3d
    #40 / #83 / #84 Research              :research, 2026-08-09, 8d
```

## Critical path

Completed prefix (merged): `#85/#76 → #77/PR90 → #92 → #95 → (#78 + #79 + #80)`

Remaining chain:

`(#81 + #94 + #93) → #82 → Integration → Feature Freeze → Submission`

Fieldwork/content path:

`#10 → #79 / #80 / #93`

Stretch path:

`#92 → #81 → #38 → #39`

Notes:

- PR #90 is the merged shared-foundation baseline; #95 (merged) changed only the
  primary-navigation contract on top of it. Do not revert either.
- #81/#94/#93 are the three remaining core IA slices. All three already have
  merged shells + the persistence/semantics contracts (#81 via `saved-routes.ts` /
  `food-profile.ts`, #94 via `mogu-recent.ts`, #93 reuses Story/Spot destinations),
  so their remaining work is bounded UI on top of merged foundations.
- #81 depends on the Food Profile contract from #78 and My navigation from #95.
- #94 depends on Result lifecycle from #78 and MOGU navigation from #95.
- #93 reuses Story/Spot destinations from #79/#80 and Discover navigation from #95.
- #82 must start only after #95/#78/#79/#80/#81/#93/#94 are ready.

## Recommended GitHub Project configuration

Project name: **TOKYO MOGU MOGU - Hackathon 2026**

Fields:

| Field | Values / purpose |
|---|---|
| Status | Backlog / Ready / In Progress / Review / Done |
| Priority | P0 / P1 / Stretch |
| Phase | Product / IA / Research / UI Foundation / Navigation / Recommendation / Story / Route / Discover / Recent / My / QA / Demo |
| Start date | Roadmap start |
| Target date | Roadmap target |
| Assignee | Owner |

Views:

1. **Hackathon Roadmap**: Roadmap layout, current P0/P1 work only
2. **Execution Board**: Board grouped by Status
3. **All Issues**: Table for complete history and research

Markers:

- 2026-08-21 Feature Freeze
- 2026-08-22 Final Polish / Pitch Rehearsal
- 2026-08-23 Submission 17:00 JST

## Priority boundary

### P0

- #92 (IA contract; code done, doc follow-up OPEN)
- #10
- #81
- #94
- #93
- #82
- Integration / demo freeze

### P1

- #19 and other work that strengthens the pitch without blocking the core flow

### Stretch / non-blocking

- #38
- #39
- #40
- #83
- #84

If schedule pressure appears, protect the deterministic demo and the
`Home/Discover/MOGU/My` IA first.

## Superseded planning assumptions

The following no longer drive implementation (see Issue #92 / #86):

- primary nav `Home / Diagnosis / Support / My Route`
- S1 dietary restrictions repeated every recommendation session
- S2 treated as permanent preference/personality diagnosis
- standalone S7 Support Hub as a required primary page
- standalone S8 My Route as a primary destination
- Badge as required top-level nav
- `S0 → S8` as the linear-only framing for execution planning

Historical S0–S9 and #76 visual material remain useful for presentation and
mapping, but #92 owns current IA/behavior meaning where the two differ.

## Follow-up

- **#92 doc alignment**: the merged code implements the #92 IA, and the two
  authority documents (`hackathon-product-contract.md`,
  `approved-ui-fidelity.md`) are aligned to the #92 IA in a companion PR
  (`docs/92-contract-ia-align`). Merge order matters: land that PR before
  closing #92; keep this roadmap's "contract not aligned" note from
  resurrecting once both are merged.
- **#86 roadmap**: this file is the current single planning foundation; keep the
  roadmap table and Gantt in sync with the GitHub Project board.
- **#82 QA** must verify the actual 4-tab IA, not the superseded linear journey.
