# Issue #270 final Figma + interaction-quality reconciliation

Date: 2026-08-23 JST
Base: `origin/main@1797a890a84523e7f49dbe0f231a5c333b68cea3`
Primary branch: `codex/fix-270-primary-convergence`

This report is the implementation ledger for Issue #270. Product, data,
safety, audience, and IA contracts remain authoritative. The Netlify build is
used only as an interaction-quality reference. Okutama × Tokyo Wasabi remains
the 8/23 demo golden path, not the durable Product boundary.

## Evidence and access boundary

- Current app: the complete 375px journey was traversed interactively before
  implementation and again after the focused convergence slice.
- Fresh current-app captures are in this directory: Landing, nickname, dietary
  conversation, Food Profile summary, diagnosis entry, Result, repeat
  diagnosis, Story, Route, Spot, en/zh-TW diagnosis, and Food Profile edit.
- Live KiKi Figma: the public live file was visually inspected at the relevant
  journey boards, including Result `23:3380`, Story `52:3995`, Route `119:681`,
  and Spot `125:1752`. The authenticated Figma MCP screenshot call was also
  attempted but hit the Starter-plan call limit. This report therefore does
  not claim a fresh MCP-export pixel diff. The live visual inspection was
  reconciled with `figma-design-system.md` and the two checked-in 2026-08-22
  blind-audit records.
- Netlify: the full reference flow was traversed at 375px, including overlays,
  fixed UI, horizontal rails, save states, pointer/keyboard behavior, and
  reduced-motion inspection.
- Fieldwork Drive: 41 direct-root JPEGs were inventoried. Drive exposes access
  to the project folder but no creator, copyright-owner, model-release, or
  reusable-license metadata. Selected derivatives are therefore scoped to the
  project demo authorization in Issues #258/#270; no public reuse license is
  asserted.

## Figma delta ledger

### `MUST_FIX_NOW`

| Delta | Resolution |
| --- | --- |
| The five-question diagnosis lacked the measured six-stage journey rail shown through Result. | Added one real-state six-milestone rail: diagnosis stages 1–5 and Result stage 6. It is a navigation/progress indicator, never fake loading. |
| Result cards used 16:9 media rather than the measured `1.455:1` plate. | Corrected all Result journey media frames to `1.455:1`; score-free Top 3 semantics are unchanged. |
| Story action treatment was a transparent gradient rather than the measured 73px leaf surface. | Implemented a 73px leaf footer with a centered 280×49 action, upward shadow, safe-area and primary-nav clearance. |
| Route unsaved/saved actions were not consistently represented as measured persistent surfaces. | Implemented a 155px route summary/save surface and a compact saved-state surface above the accepted primary navigation. |
| Spot `125:1752` showed a real hero/gallery treatment while runtime used a generated placeholder. | Added a matching, provenance-constrained three-image tourism-office gallery with the measured `1.693:1` hero and 83×67 thumbnail treatment. |
| Forward Result→Story and Route→Spot navigation inherited the prior page's deep scroll offset. | New destinations start at top and focus their h1; browser Back and explicit journey Back restore the prior history context. |
| Food Profile completion repeated the same thank-you/registration sentence. | Kept one personalized completion line and the separate Food Profile summary label. |
| Repeat-diagnosis wording described rerunning the same trip instead of starting the repeatable function. | Updated to natural per-trip discovery language in ja/en/zh-TW. |
| Real, truthfully mapped fieldwork media was absent from Story/Route/Spot. | Added two explicitly generic Okutama landscape images to Story/Route context and three place-specific images only to the matching tourism-office Spot. |

### `INTENTIONALLY_DIFFERENT`

| Difference | Authority / reason |
| --- | --- |
| No visible `96%` / `91%` match scores. | Product Issue #255 requires a real deterministic score-free Top 3. Internal ordering is not confidence. |
| Primary navigation is `Home / Discover / MOGU / My`. | Product IA Issue #92 overrides historical or fixture labels. MOGU Recent remains distinct from My Saved. |
| Food Profile and `食旅を見つけ` are separate lifecycles. | Issue #268: persistent dietary setup/edit versus repeatable per-trip diagnosis. |
| No simulated AI route generation or waiting screen. | Product/safety contract and Issue #270 prohibit fake loading and artificial waiting. |
| No realtime geocoder, routing, crowding, availability, or safety implication. | Only sourced or explicitly hedged editorial/demo facts can ship. |
| Source 390px geometry reflows to the 375px blocking viewport. | Approved responsive adaptation; fixed source-frame height is not copied. |
| The required 44px demo-reset affordance remains visible. | Deterministic Golden Path control required by Issue #257; kept compact and accessible. |
| Gallery adds captions, keyboard controls, status, and reduced-motion behavior beyond the visual board. | Accessibility and provenance requirements have higher authority than a pointer-only reproduction. |

### `FOLLOW_UP`

| Difference / limitation | Why it remains |
| --- | --- |
| A fresh authenticated Figma MCP screenshot export/pixel overlay could not be generated. | Starter-plan tool quota; public live boards and checked-in same-day measured evidence were used honestly. Re-run when quota is available, without blocking the reconciled Product contracts. |
| Remaining Home/other-region placeholders were not replaced from this Drive folder. | No selected photo could be confidently mapped to those venues/content. Avoiding a false association is preferable to decorative substitution. |
| Drive does not publish creator/license/release metadata. | Demo-project use was requested, but broader reuse rights cannot be claimed. The source ledger preserves this limitation. |
| Hardware-specific touch inertia was not measured on every mobile browser. | Native overflow/snap is used, backed by Chromium pointer-drag and keyboard E2E; physical-device smoke remains a useful non-blocking check. |

## Netlify `ADOPT / ADAPT / DO_NOT_COPY` ledger

### `ADOPT`

| Interaction | Decision / shipped result |
| --- | --- |
| Immediate press feedback on buttons, chips, and cards | Retained the existing ~0.97 / ~0.98 active-state language; no layout-moving decoration. |
| Selection-gated `Next` controls | Retained. A diagnosis cannot advance without a valid current-step selection. |
| Immediate route-duration switching | Retained. Switching is deterministic and introduces no artificial wait. |
| Concise save/success feedback | Retained durable save semantics, pressed state, live toast feedback, and an adjacent path to My Saved. |
| A deliberate new-page scroll position | Added router-level top-on-forward behavior and history-context restoration. |
| Persistent action continuity | Added measured Story and Route fixed surfaces without obscuring primary navigation. |

### `ADAPT`

| Interaction idea | Adaptation for the current Product |
| --- | --- |
| Origin-selection bottom sheet | Existing presentation-only departure sheet is semantic, Escape-dismissable, focus-trapped, and focus-returning. It never claims to geocode. |
| Screen transition rhythm | Reduced to a non-blocking 180ms opacity cue. No transform is retained because transforms create the wrong containing block for fixed UI. Reduced motion removes it. |
| Conversational turn settling | Existing height-aware turn scrolling/focus is preserved: short turns settle near the viewport bottom; tall turns open from the top; reduced motion uses immediate scrolling. |
| Horizontal content rails | Implemented as native overflow with snap, touch swipe, pointer drag, explicit previous/next controls, thumbnails, pagination status, and keyboard support. |
| Gallery/carousel presentation | Restricted to content with truthful media mapping. Captions disclose fieldwork context and avoid current-service/access claims. |
| Progress animation | Uses real six-stage state with a short transition. No recommendation generation or confidence is implied; reduced motion is immediate. |
| Fixed bottom navigation | Uses the locked Product IA and measured safe-area geometry rather than Netlify's obsolete labels/layout. |
| Result/success reveal | Uses immediate real Top 3 content plus restrained page continuity and MOGU Recent confirmation; no delayed reward theatre. |

### `DO_NOT_COPY`

| Netlify behavior | Rejection reason |
| --- | --- |
| Visible `96%` / `91%` recommendation scores | Conflicts with #255 and fabricates confidence semantics. |
| Approximately one-second route-generation wait | Artificial waiting and fake system work. |
| Obsolete bottom navigation / favorites meaning | Conflicts with #92 and MOGU Recent versus My Saved semantics. |
| Badge overlapping fixed navigation | Concrete viewport obstruction. Badge is Stretch, not core. |
| Pointer-only clickable `div` cards | Fails keyboard and semantic interaction requirements. |
| Pulsing unselected choices | Decorative motion can misstate selection and distract from direct manipulation. |
| Smooth motion with no reduced-motion path | Accessibility regression. |
| Unsourced venue, access, availability, or impact claims | Violates provenance and no-fake-business-claim contracts. |
| Mission/support action with no visible outcome | A control must produce a truthful, observable result. |
| Mouse rail that appears draggable but does not drag | Misleading affordance; shipped gallery provides real native and pointer interaction. |

## Complete interaction inventory and final treatment

| Area inspected | Netlify observation | Final app treatment |
| --- | --- | --- |
| Tap / press | Strong tactile scaling and hard-shadow movement. | Consistent 0.97/0.98 feedback retained; disabled controls do not move. |
| Page transitions | Continuous but sometimes paired with simulated work. | Short opacity continuity only; content and input are immediate. |
| Scroll continuity | Strong within conversation; route transitions were not an authoritative browser-history model. | Height-aware turn scrolling plus top-on-forward and restore-on-Back. |
| Overlays / modals | Origin sheet is visually effective but lacked a complete accessibility contract. | Nickname and departure overlays trap focus, support Escape/close, and return focus. |
| Sticky / fixed UI | Strong sense of persistent actions; some overlap defects. | Nav, journey rail, Story action, and Route action have measured adjacent geometry and safe-area clearance. |
| Progress | Highly visible but tied to obsolete scores/reveal semantics in places. | Real five-question + Result progress only. |
| Success | Short save/reward confirmation. | Durable pressed state and truthful toasts; no invented reward or contribution. |
| Horizontal scrolling | Several smooth rails. | Native overflow/snap retained only where useful; explicit controls and pagination added. |
| Galleries / carousels | Image rails lacked robust pagination/keyboard semantics. | Reusable semantic gallery with captions, thumbnails, status, snap, keyboard, and controls. |
| Swipe / drag | Touch-like rail behavior; desktop mouse drag was not consistently functional. | Native touch swipe plus tested pointer capture/drag. |
| Pagination indicators | Sparse or absent. | Active thumbnail and `n / total` live status. |
| Image transitions | Smooth visual movement without a complete reduced-motion contract. | Snap/scroll only; no decorative crossfade or parallax. |
| Keyboard / focus | Pointer-first cards and incomplete visible focus behavior. | Native links/buttons, route h1 focus, modal focus management, gallery Arrow/Home/End, and visible control focus. |
| Double activation | Some interaction gating, but not a complete contract. | Existing stale-step refs, submit guards, selection gating, and state replacement prevent duplicate progression/save. |
| Reduced motion | No dependable global treatment observed. | Page cue and progress transitions removed; gallery/turn scrolling becomes immediate. |

## Selected Drive mapping and provenance

All files below were reviewed on 2026-08-23. The original JPEGs are not
shipped. Responsive derivatives are auto-oriented WebP files with EXIF, XMP,
GPS, device, timestamp, and ICC metadata removed.

| Runtime use | Drive file / ID | Original SHA-256 | Boundary |
| --- | --- | --- | --- |
| Tourism-office gallery: information area | `案内所_様子.JPG` / `1HCruQaj5y5FDCAEyM9RRKfGyMhemi9hc` | `d3d591c6591c291d73ebbf5fb57cb2625627000d3a3b91dfdaad4d09d417c205` | `okutama-tourism-office` only; does not establish current leaflet/service availability. |
| Tourism-office gallery: stamps | `案内所_わさびスタンプ.JPG` / `1p1OeuAItfUNA18IiM-j5Is42S5M9HByj` | `b8561a12eafb5c7355b6bb3207abfe737f5e911a545b1870e073c4ebd88fb527` | Pictured display only; does not promise stamping availability. |
| Tourism-office gallery: character detail | `案内所_わさび.JPG` / `1G_8f16s4uBAtMpW3et9WGk6vDT9AjI4t` | `984d68ca50b9ff16a15f8b7468493c4d49258f8d6e96c31d8ecfb498f614ae3b` | Pictured display only; no merchandise/availability inference. |
| Story generic Okutama context | `橋.JPG` / `1GOi-aYB04qb7fWiFidHWwm0vBmW63VLG` | `67c04cc6a9b220d61a501a01c67d0cec323c1c98196677750ca2e216bdda6447` | Generic scenery; bridge identity, access, ownership, and safety are deliberately unstated. |
| Story + Route generic Okutama context | `川2.JPG` / `1zdelt-RC4GcI4Qph4XJBUyooJ17LdTFE` | `04674514f445ba02ded1344996637b2a9d5ae48ab04152fc6c795f0fb9624b4b` | Generic scenery; river/viewpoint identity, access, weather, water, and safety are deliberately unstated. |

Deliberate exclusions: station and river frames with identifiable bystanders;
the gelato image with prominent potentially stale price signage; other images
whose venue/content association could not be established.

## Gallery/media result

- Spot `125:1752` is reconciled as a real, accessible tourism-office gallery.
- 640/960/1440 responsive candidates are available; browser `sizes` avoids
  shipping original multi-megabyte JPEGs.
- The gallery supports native touch scrolling, pointer drag, snapping,
  previous/next controls, thumbnail pagination, `n / total`, ArrowLeft,
  ArrowRight, Home, End, and reduced-motion-safe immediate scrolling.
- Every full image has reviewed ja/en/zh-TW alt and caption copy. Thumbnails are
  decorative duplicates; their buttons carry localized titles.
- The shared media mapping accepts reusable Place and Region identifiers; only
  the current records carry Okutama-specific IDs and constraints, so adding a
  future Tokyo region does not require redesigning the contract. Provenance
  fields likewise accept future review dates, authorization bases, and an
  optional public license while the current demo records retain their exact
  narrow values.
- Story uses the same gallery primitive for two explicitly generic landscapes.
  Route uses one responsive generic landscape with a visible limitation
  caption. Result retains the approved wasabi-specific hero rather than
  replacing it with a less-specific landscape.

## Validation evidence

Release-gate checks completed against the final working tree:

- Issue #270 convergence Playwright: 6/6 passed.
- Fresh screenshot walkthrough: 1/1 passed and produced 13 captures.
- Full Playwright/E2E: 98 passed, 1 intentional evidence-capture skip, 0
  failures (4.6 minutes).
- `pnpm validate`: typecheck passed; lint passed with 0 errors and the same 26
  baseline warnings; all 69 Vitest files / 678 tests passed; production bundle
  built successfully.
- Fieldwork derivatives: no EXIF/XMP/GPS/device/timestamp/ICC metadata found.
- Measured 375px geometry: Story 73px footer and Result 84px rail meet the
  primary navigation with no gap/overlap; Route uses the same viewport anchor.
- Final interactive 375px re-check: the live Netlify landing/onboarding was
  replayed, then the finished local Story -> Route -> Spot journey was replayed.
  Forward focus/top behavior, fixed-action continuity, truthful save states,
  the three-image Spot mapping, explicit pagination, next control, and gallery
  ArrowRight interaction all remained functional. The safe Netlify patterns in
  the ledger are present without its obsolete scores, fake waiting, or
  pointer-only controls.

CI URL and merge SHA are added to the Issue handoff after the GitHub release
gate completes.

## Remaining limitations

1. Authenticated Figma MCP export remains quota-limited; this is an evidence
   limitation, not a claim of hidden parity.
2. Fieldwork photos have project-demo authorization but no published reusable
   license/creator/release metadata in Drive.
3. Photos without a defensible content mapping remain excluded rather than
   being used decoratively.
4. The app does not claim that pictured displays, access, services, or business
   conditions remain current.
