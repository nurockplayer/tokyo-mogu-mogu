# Issue #242 — live KiKi Figma coverage reconciliation (2026-08-20)

## Authority and scope

This audit was rerun after PR #247 merged to live `main` at
`35ccec07d277a01c2801aef51d13e1bcb19a9b4a`. The implementation truth is that
commit; the visible KiKi Figma is the prototype authority. The audit covers
coverage accounting only. It does not open another Region × FoodCulture lane
and it does not turn the prototype into a CMS, crawler, route optimizer, or
recommendation platform.

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
- Full-screen states now covered by implementation or explicit deliberate deviation: 28.
- Full-screen state still unresolved: 1 (`119:254`).
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
| `23:3380` | Implemented | Result candidate and Story transition. |
| `52:3995` | Implemented | Story page and nearby content. |
| `119:254` | **Unresolved** | Dimmed Story + mascot/spinner/loading copy is visible, but behavior is not specified. |
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

## Conservative #242 verdict

`MISSING_IMPLEMENTATION_FOUND` remains the safe verdict, and #242 stays open.
The two concrete implementation gaps (`2:383`, `3:772`) are closed by merged
PR #247. The remaining `119:254` frame is visually understandable but not
behaviorally specified:

- What action starts the overlay?
- Is the generation real, deterministic, or only a presentation transition?
- What completes it, and how does the user cancel or recover from an error?
- Which route identity and persistence contract does completion carry?

Adding an artificial timer, speculative route generation, or generic loading
platform would violate the #201/#208 engineering-adaptation boundary. A
Product/Design decision for that one frame is the next required input before
#242 can close.

## Validation

- Live bridge inventory and node-text inspection confirmed the current node IDs,
  modal copy/composition, the `3:854` / `3:1081` semantic corrections, and the
  visible `119:254` Story loading overlay.
- PR #247 hosted CI passed on its final retry: Quality Gates, Golden-path E2E,
  and Merge Gate.
- Local full E2E after merge-base reconciliation: 61 passed.
- Map/state/doc synchronization and the focused map tests are run with the
  repository Vitest gate before the reconciliation PR is opened.
