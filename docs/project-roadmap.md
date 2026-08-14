# TOKYO MOGU MOGU Hackathon Roadmap

Tracking Issue: #86

This roadmap covers the current Hackathon MVP through the submission deadline on **2026-08-23 17:00 JST**. It reflects the live issue state as of 2026-08-14.

## Planning rules

- Product / MVP framing source of truth: **#112** (top problem = tourism over-concentration in Tokyo's 23 wards; Okutama × Tokyo Wasabi = 8/23 Hackathon Demo Golden Path only; Tama / Okutama = current fieldwork / evidence / demo-content context, not permanent Product geography; food content is evidence-driven).
- Current App IA source of truth: **#92 / KiKi UI/UX** (`Home / Discover / MOGU / My`, Food Profile vs per-trip Exploration, Recent vs Saved, distributed Support).
- Core MVP journey: `Home → (Food Profile on first use) → Exploration → Result → Story → Route → Spot`, with Result auto-writing MOGU Recent and saved Routes landing in `My → Saved Routes`.
- **Hackathon Demo Golden Path**: 奥多摩 × 東京わさび (Okutama × Tokyo Wasabi) — the 8/23 demo golden path, demo-scoped only. Tokyo Wasabi is the deterministic demo fixture, not the exclusive or durable Product content contract. Tama / Okutama are current fieldwork / evidence / demo-content context, never the permanent Product domain. #163 adds a second source-backed playable slice (青梅・沢井 × 日本酒) via Discover — demo-scoped, data/config only, never narrowing the golden path or the durable Product scope.
- S9 Badge is Stretch (`My → Badges`) and must not block the core journey.
- Historical / superseded Pokédex, geolocation check-in, and the linear S0–S8 / `Home / Diagnosis / Support / My Route` framing are not part of the current critical path.
- Feature freeze: 2026-08-21
- Final polish / pitch rehearsal: 2026-08-22
- Submission: 2026-08-23 17:00 JST

## Gantt

```mermaid
gantt
    title TOKYO MOGU MOGU Hackathon 2026
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d

    section Source of truth
    %% #112 / #92 live GitHub Issues are OPEN; authoritative source-of-truth work, not done.
    #112 Product / MVP framing           :p112, 2026-08-09, 2d
    #92 Current App IA contract          :p92, 2026-08-09, 2d
    #85 Product Vision alignment         :p85, 2026-08-09, 2d
    #76 Approved UI fidelity contract    :p76, 2026-08-09, 2d

    section Research / Data
    #10 Tama fieldwork                   :p10, 2026-08-09, 4d
    Content and source integration       :content, 2026-08-14, 4d
    #19 Open Data registry (done)        :p19, 2026-08-15, 3d
    #83 Crowding / transfer advisory (done) :p83, 2026-08-15, 2d
    #84 Motorcycle mobility research     :p84, 2026-08-09, 8d

    section UI Foundation (done)
    #77 Shared shell / primitives        :p77, after p76, 2d

    section Core UI
    #95 Navigation IA (done)             :p95, 2026-08-10, 2d
    #78 Food Profile / Exploration / Result (done) :p78, 2026-08-11, 4d
    #94 MOGU Recent (done)               :p94, 2026-08-11, 3d
    #79 Story + distributed Support (done) :p79, 2026-08-11, 5d
    #80 Route / Spot + external actions (done) :p80, 2026-08-11, 5d
    #81 My: Saved Routes / Food Profile / Badge entry (done) :p81, 2026-08-11, 4d
    #93 Discover free exploration (done)   :p93, 2026-08-11, 4d

    section QA / Integration
    #82 375px + ja/en/zh-TW + tap/focus QA (active) :p82, 2026-08-17, 4d
    E2E / bugfix / demo data freeze      :integration, 2026-08-20, 2d
    Feature Freeze                       :milestone, freeze, 2026-08-21, 0d
    Final polish / pitch rehearsal       :polish, 2026-08-22, 1d
    Submission 17:00 JST                 :milestone, submit, 2026-08-23, 0d

    section Stretch / Non-blocking
    #38 Badge contract (done)            :p38, 2026-08-17, 2d
    #39 Badge UI                         :p39, after p38, 3d
    #40 Badge reward validation          :p40, 2026-08-09, 8d
```

## Critical path

Completed foundation and implementation slices:

- #85 / #76 / #77 (Product / UI foundation)
- #95 Navigation IA, #78 Food Profile / Exploration / Result, #94 MOGU Recent,
  #79 Story + distributed Support, #80 Route / Spot, #81 My, #93 Discover
  (current App IA implementation)
- #19 Open Data registry, #83 crowding / transfer advisory, #38 Badge contract
- #120 Golden-path E2E release gate, #129 source freshness / verification state,
  #127 8/23 demo dataset freeze, #128 municipality agriculture context,
  #149 explainable multi-candidate recommendation, #152 stakeholder review
  packets (demo/pitch readiness)

Current open work:

- **#82** App IA QA / release gate (375px + ja/en/zh-TW + tap/focus) — current gate; requires full-surface real-browser pass + WCAG contrast audit before close

Recently completed:

- **#120** Golden-path browser E2E release gate — merged (#134); the 60–90 s demo
  sequence (`docs/demo-script.md`, `docs/hackathon/demo-sequence.md`) mirrors it
- **#127** Okutama × Tokyo Wasabi demo dataset freeze — merged (#144), demo-scoped
- **#152** Stakeholder review packets — merged; demo / pitch evidence source

Remaining critical path:

`#82 -> Integration / demo freeze -> Feature Freeze -> Submission`

Source-of-truth work (#112, #92) stays authoritative for current framing and is
not considered implementation debt.

Fieldwork/content path:

`#10 -> verified demo content (story / route / spot / support)`

Stretch / non-blocking work:

- **#39** Badge UI — starts after the #38 contract.
- **#40** Badge reward research — independent of #39 / can proceed in parallel.

## Recommended GitHub Project configuration

Project name: **TOKYO MOGU MOGU - Hackathon 2026**

Fields:

| Field | Values / purpose |
|---|---|
| Status | Backlog / Ready / In Progress / Review / Done |
| Priority | P0 / P1 / Stretch |
| Phase | Product / Research / UI Foundation / Core UI / QA / Demo |
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

### P0 (current implementation)

- #82
- Integration / demo freeze
- #10 fieldwork feeding verified demo content

### P1

- #19 is completed; only follow-up data/pitch work that strengthens the pitch without blocking the core flow belongs here

### Source of truth (authoritative framing)

- #112
- #92

### Stretch / non-blocking

- #38 (done)
- #39
- #40
- #84

If schedule pressure appears, protect the current `Home / Discover / MOGU / My`
journey and the deterministic demo first.
