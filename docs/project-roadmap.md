# TOKYO MOGU MOGU Hackathon Roadmap

Tracking Issue: #86

This roadmap covers the current Hackathon MVP through the submission deadline on **2026-08-23 17:00 JST**.

## Planning rules

- Product Vision source of truth: #85
- Core MVP journey: `S0 -> S1 -> S2 -> S3 -> S4 -> S5 -> S6 -> S7 -> S8`
- First pilot: `奥多摩 × 東京わさび`
- S9 Badge is Stretch and must not block S0-S8
- Historical / superseded Pokédex and geolocation-check-in work is not part of the current critical path
- Feature freeze: 2026-08-21
- Final polish / pitch rehearsal: 2026-08-22
- Submission: 2026-08-23 17:00 JST

## Gantt

```mermaid
gantt
    title TOKYO MOGU MOGU Hackathon 2026
    dateFormat  YYYY-MM-DD
    axisFormat  %m/%d

    section Product / Spec
    #85 Product Vision alignment          :p85, 2026-08-09, 2d
    #76 Approved UI fidelity contract     :p76, 2026-08-09, 2d

    section Research / Data
    #10 Okutama fieldwork                 :p10, 2026-08-09, 3d
    Content and source integration        :content, 2026-08-14, 4d
    #19 Open Data registry cleanup        :p19, 2026-08-15, 3d

    section UI Foundation
    #77 Shared shell and primitives       :p77, after p76, 2d

    section Core UI
    #78 S0-S3 onboarding / diagnosis      :p78, 2026-08-11, 4d
    #79 S4 Tokyo Wasabi story             :p79, 2026-08-11, 5d
    #80 S5-S6 route / spot                :p80, 2026-08-11, 5d
    #81 S7-S8 support / My Route          :p81, 2026-08-11, 4d

    section QA / Integration
    #82 375px + ja/en/zh-TW QA            :p82, 2026-08-17, 4d
    E2E / bugfix / demo data freeze       :integration, 2026-08-20, 2d
    Feature Freeze                        :milestone, freeze, 2026-08-21, 0d
    Final polish / pitch rehearsal        :polish, 2026-08-22, 1d
    Submission 17:00 JST                  :milestone, submit, 2026-08-23, 0d

    section Stretch / Non-blocking
    #38 Badge contract                    :p38, 2026-08-17, 2d
    #39 S9 Badge UI                       :p39, after p38, 3d
    #40 / #83 / #84 Research              :research, 2026-08-09, 8d
```

## Critical path

`#85 / #76 -> #77 -> (#78 + #79 + #80 + #81) -> #82 -> Integration -> Feature Freeze -> Submission`

Fieldwork/content path:

`#10 -> #79 / #80 / #81`

Stretch path:

`#85 -> #38 -> #39`

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

### P0

- #85
- #76
- #10
- #77
- #78
- #79
- #80
- #81
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

If schedule pressure appears, protect S0-S8 and the deterministic demo first.