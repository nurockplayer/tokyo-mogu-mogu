# Issue #242 — live KiKi Figma coverage reconciliation (2026-08-20)

## Authority and scope

This audit was rerun against live `main` at
`68ba4d4b3301b238081fdaec2dbc8dcaa1410ee7` after PRs #247 and #248 merged.
The visible KiKi Figma is the prototype authority. The audit covers coverage
accounting only. It does not open another Region × FoodCulture lane and it does
not turn the prototype into a CMS, crawler, route optimizer, or recommendation
platform.

The primary Figma connector was rate-limited on the Starter plan. The connected
Figma bridge still exposed the current Page 1 inventory and exact node trees,
including the modal text, dimensions, and Story overlay contents. The checked-in
map keeps the canonical Figma file key and does not create a checkpoint from an
unversioned bridge snapshot.

## Inventory result

- Current bridge inventory: 45 top-level Page 1 nodes.
- Current product-facing meaningful nodes: 41.
- Non-product board/asset infrastructure: 4 (`1:832`, `1:467`, `34:236`, `23:3623`).
- Full screens / alternate states: 29.
- Full-screen states now covered by implementation or explicit deliberate/presentation-only deviation: 29.
- Full-screen states still unresolved or missing: 0.
- No current frame is wholly absent from the runtime; the remaining gap is behavior/semantics, not an invented missing page.

The previous #242 audit at main `e559819f7dba50228586b17ca4a1fda518e40542`
reported 48 inspected nodes, 43 meaningful product nodes, 29 full-screen states,
9 previously untracked full-screen states, and 22 untracked product nodes. The
current bridge snapshot exposes 45 nodes; the historical counts remain recorded
for reconciliation rather than silently being rewritten.

## Full-screen / alternate-state matrix

| Node | Current classification | Evidence / implementation |
| --- | --- | --- |
| `1:95` | Implemented | Landing / entry in `LandingPage`. |
| `2:21` | Implemented | Start-only Food Profile welcome variant in `IntroCard`. |
| `2:245` | Implemented | Food Profile welcome with start/browse actions. |
| `2:312` | Implemented | Nickname prompt/reopen state. |
| `2:548` | Implemented | Nickname-completed transcript state. |
| `2:383` | Implemented by #246 | Nickname modal now matches the visible modal composition; PR #247. |
| `2:623` | Implemented | Q1 allergy active state. |
| `3:854` | Implemented | Q1 allergy completed state; prior map label corrected. |
| `3:959` | Implemented | Q2 everyday diet active state; prior map label corrected. |
| `3:1081` | Implemented | Q2 diet completed state; prior map label corrected. |
| `3:1203` | Implemented | Q3 religion active state. |
| `3:1320` | Implemented | Q3 religion completed state. |
| `3:1500` | Implemented | Q4 dislikes active state. |
| `3:1599` | Implemented | Q4 dislikes completed state. |
| `3:1702` | Implemented | Food Profile summary and recommendation-only trust copy. |
| `3:1835` | Implemented | Post-profile recommend/browse fork. |
| `3:772` | Implemented by #246 | Free-input modal now matches the visible modal composition; presentation-only text. |
| `3:1952` | Implemented | ReturningHome/history prototype state. |
| `4:2101` | Implemented | Exploration Q1. |
| `8:2436` | Implemented / deferred search adaptation | Exploration Q2 bounded departure choices; free-form search remains deferred by #206. |
| `23:3131` | Implemented | Exploration Q3. |
| `23:3207` | Implemented | Exploration Q4. |
| `23:3262` | Implemented | Exploration Q5. |
| `23:3380` | **Deliberate Product adaptation (#255)** | The 96%/91% fixture is superseded by a deterministic source-backed Top 3; every candidate has a real Story transition and internal scores are not displayed. |
| `52:3995` | Implemented | Story page and nearby content. |
| `119:254` | **Presentation-only / deliberate adaptation** | The existing Story → Route CTA conceptually triggers direct navigation to the current source-backed Route; the dimmed mascot/spinner is a transition reference only. No runtime generation, artificial delay, async lifecycle, or new persistence is added. |
| `119:681` | Implemented | Route timeline, spots, save action. |
| `122:889` | Implemented | Route saved state / My Route affordance. |
| `125:1752` | Implemented | Spot detail and sourced action boundary. |

## Meaningful content/reference matrix

These are current product-facing top-level nodes but not standalone runtime
pages. They are watched so coverage does not depend on pretending a Figma content
group is a route.

| Node | Classification | Evidence / boundary |
| --- | --- | --- |
| `62:4983` | Implemented | Story nearby experience cards. |
| `62:4830` | Implemented | Story nearby spots section. |
| `62:4616` | Implemented | Spot related-card grouping. |
| `62:4615` | Implemented | Spot card collection grouping. |
| `60:4426` | Implemented | Story long-form editorial content group. |
| `60:4385` | Implemented | Responsive mobile Story content group. |
| `52:4092` | Intentionally different | Documented sticky Story CTA convenience treatment (#232). |
| `23:3620` | Intentionally different | Route-generation CTA reference is accounted for; it does not define loading semantics. |
| `8:2608` | Intentionally different / deferred | Presentation-only departure search; no geocoder or route optimizer. |
| `8:2903` | Intentionally different / deferred | Alternate state of the same bounded/deferred search contract. |
| `1:43` | Intentionally different / deferred | Destination-search reference; current implementation uses bounded area choices. |
| `1:23` | Intentionally different | Prototype navigation reference; current Product IA remains Home / Discover / MOGU / My. |

## Retired and non-product accounting

The map retains four historical IDs as `watched: false` aliases: `62:5023`
(old Story footer CTA), `55:4166` (old Route frame), `23:3621` (old CTA
reference), and `62:4620` (old Spot pills). They are replaced/accounted for by
current nodes in the map and are not counted in current coverage.

The current bridge also exposes four non-product nodes: `1:832` status-bar
instance, `1:467` logo asset, `34:236` UX decision board, and `23:3623`
requirements/reference board. They are recorded here because the audit must be
complete, but they are not product screens and are not watched.

## Final #242 verdict

`FULL_COVERAGE` is now supported by the Product decision recorded in the #242
issue thread. The two concrete implementation gaps (`2:383`, `3:772`) were
closed by merged PR #247. The remaining `119:254` frame is explicitly a
presentation-only reference, represented in the machine map by the existing
`INTENTIONALLY_DIFFERENT` status with a `PRESENTATION_ONLY` decision note:

- Existing Story → Route CTA is the conceptual trigger.
- Destination is the existing source-backed route for the current journey/candidate.
- No artificial delay, route-generation service, optimizer, background job, or overlay-specific async lifecycle is added.
- No new persistence is written; saved-route persistence remains the explicit Route action under #92.
- Existing safe missing-data/navigation behavior applies if the route cannot be resolved; no route is fabricated.

No other meaningful current frame is unresolved or missing. The final audit
verdict is `FULL_COVERAGE`, and #242 can close.

## Validation

- Live bridge inventory and node-text inspection confirmed the current node IDs,
  modal copy/composition, the `3:854` / `3:1081` semantic corrections, and the
  visible `119:254` Story loading overlay.
- PR #247 hosted CI passed on its final retry: Quality Gates, Golden-path E2E,
  and Merge Gate.
- Local full E2E after merge-base reconciliation: 61 passed.
- Closeout focused map/gate tests: 19 passed.
- Closeout repository gates: typecheck passed; lint passed with 0 errors and 25
  existing warnings; full unit suite passed (639 tests); build passed.
- No runtime files changed in this closeout, so browser E2E was not required by
  the change classifier; the prior live-main full E2E evidence remains 61/61.
