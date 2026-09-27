# Current Hackathon Product Contract

Status: current visible Product/runtime contract after PR #279.

This document describes the Figma-complete mobile MVP that exists now. It does
not reconstruct earlier plans.

## Authority

Resolve Product, UI, interaction, and runtime questions in this order:

1. the currently connected KiKi Figma file, inspected directly through the
   local Hopp `figma-bridge`;
2. current merged `main`;
3. this contract as a concise description of that live state.

Tests validate current behavior; they do not define Product behavior. Closed
Issues, git history, pre-#279 UI/IA/flow documents, old Figma exports/maps,
former Netlify references, and legacy components/tests are historical and
non-authoritative.

## Visible Product

The mobile review and demo baseline is 375px. Japanese is the default locale;
English and Traditional Chinese are visible runtime options.

The primary journey is:

```text
Food Profile
→ 食旅を見つけ
→ Result
→ Story
→ Route
→ Spot
```

Current surfaces and routes:

| Surface | Route | Current role |
| --- | --- | --- |
| Welcome | `/` | Entry to the current local prototype |
| Food Profile | `/food-profile` | Progressive nickname and dietary conversation |
| Food Profile edit | `/food-profile/edit` | Separate edit conversation reached from My |
| Home | `/home` | Personalized greeting, current journeys, and exploration entry |
| 食旅を見つけ | `/explore` | Five-step selectable exploration flow with departure search |
| Result | `/explore/result` | Two current live-Figma journey cards |
| Story | `/story/:storyId` | Food-culture story, nearby Spots, nature, and route CTA |
| Route | `/route` | Half/full-day variants, map, timeline, regeneration, share, and save |
| Spot | `/spot/:spotId` | Gallery, practical information, favorite, and prototype action |
| MOGU | `/mogu` | Free browsing of the current food-journey content |
| Favorites | `/my-route` | Locally saved journeys/routes and Spots, including empty state |
| My | `/my` | Food Profile, saved route, and current personal/badge states |

The visible Dock destinations are **食旅を見つけ / モグモグる / お気に入り /
マイ**. Old Home/Discover/MOGU/My or Home/Diagnosis/Support/My Route
descriptions do not define the current Dock.

## Current navigation roles and entry

The current Dock roles and visible labels are:

| Role | Route | Japanese | English | Traditional Chinese |
| --- | --- | --- | --- | --- |
| Home and exploration entry | `/home` | 食旅を見つけ | Home | 首頁 |
| Browse current journeys | `/mogu` | モグモグる | MOGU | MOGU |
| Favorites | `/my-route` | お気に入り | Favorites | 收藏 |
| My | `/my` | マイ | My | 我的 |

The Home exploration CTA opens `/explore` at its first step. In the current
mounted prototype it retains the exploration answer values in memory, but
returns to step one; it does not clear all answers or resume the previously
viewed step. `/discover` is an alias for `/mogu`; the retained `discover`
translation key is not a fifth Dock destination. The Dock is shown on Home,
MOGU, Favorites, My, and Spot. Story and Route use their contextual journey
controls, while Spot marks MOGU active regardless of how Spot was opened; that
visual selection does not record navigation provenance.

The Welcome Start action opens Food Profile for both new and returning local
users, including when a profile is already stored. From onboarding, choosing
recommendation or skipping the profile leads to Home, while choosing browse
opens MOGU. Editing remains a separate Food Profile flow reached from My. These
routes are accountless and do not impose an account or profile gate.

These are current prototype observations, not future information architecture,
authentication, redirect, translation-usability, or session-resumption
requirements. Home and collection ownership are described in the current
collection section below.

## Current interaction contract

- Food Profile progressively reveals nickname, dietary questions, summary, and
  completion choices. Nickname and custom-ingredient entry use the current
  dialogs; editing is a separate flow.
- 食旅を見つけ has five steps. Selection, departure-search empty/typed states,
  progress, back/next behavior, and the current result transition are visible
  Product states.
- Result shows the two current live-Figma journey-card presentation fixtures.
  The visible `96` / `91` indicators are fixture copy only: they are not
  calculated scores, recommendation accuracy, confidence, dietary
  compatibility, or a food-safety guarantee. There is no ranked Top-3 Product
  contract.
- Story includes the current chapter reveal, nearby and nature Spot groups, and
  route-generation transition.
- Route includes the current map/timeline content, half/full-day states,
  regeneration overlay, share affordance, and saved state.
- Spot includes the current gallery, factual/practical-information layout,
  favorite state, external-action prototype feedback, and bottom Dock.
- Home journey bookmarks, route saves, Spot favorites, Favorites grouping,
  profile state, and locale choice persist locally where current `main`
  implements persistence.
- Motion, progressive reveal, tactile feedback, nested scrolling, sticky
  actions, and transitions are part of the visible contract.

## Current design and engineering adaptation

At the existing 375px review baseline and Japanese-default runtime, engineering
preserves the inspected hierarchy, composition, typography, color, imagery, and
interaction intent. Engineering owns wrapping, content-driven height,
overflow, semantic structure, keyboard focus, and responsive mechanics within
that intent. This boundary never waives direct inspection of the currently
connected KiKi Figma file before any visible change. Meaningful changes to
hierarchy, brand expression, image crop, information priority, or interaction
need a current design decision.

The current phone layout is fluid, capped at 430px, fills `100dvh`, and uses
nested scrolling. My currently contains language selection; that placement is
not a permanent information-architecture decision. Reduced-motion CSS shortens
animation and transition durations and disables smooth scrolling, while Food
Profile conversation timers remain active.
Focus handling is partial; this does not establish complete reduced-motion
support, accessibility conformance, or usability certification.

Shared styles and tokens coexist in the current code but do not establish a
synchronized Figma/code design-system contract. A future token or component
system and tablet or desktop compositions remain unadopted. Issue #287 applies
`#222222` foreground text only to enabled orange and light-green filled CTAs
that failed the measured contrast threshold; fills, geometry, typography,
motion, passing white controls, and disabled-state treatment remain unchanged.
The modal input wrappers keep a visible focus cue and the nickname error
inset. These bounded checks do not establish product-wide WCAG conformance or
usability certification. Issue #385's modal dismiss affordance has been
back-projected into the currently connected KiKi file. Neither change creates
a new design-system or future-design contract. Historical 390px frames, maps,
and node references do not establish current design approval.

## Current Exploration inputs and departure

The five current steps ask for experience, departure, one-way travel time,
duration, then taste and theme. Departure defaults to Tokyo. Its search offers
six local presets—Tokyo Station, Shinjuku, Shibuya, Tachikawa, Ome, and
Okutama—and filters those labels rather than resolving arbitrary text. These
localized presets are not provider station IDs or GPS identities. An empty
query shows no suggestions; unmatched text has no selectable result. Closing
the search clears its query while retaining the current departure selection.

The one-way travel-time answer is a traveler-selected tolerance, not a
calculated travel time. Taste and theme are separate multi-select fields that
each require one or two choices; choosing a third replaces that field's oldest
choice.

The mounted flow keeps its raw answers in memory; reopening Exploration returns
to step one without clearing those answers. A remount or reload starts from
defaults. On completion the current flow writes a lossy compatibility
projection to `tmm:exploration:v1` in `sessionStorage`; the current screen does
not restore its raw state from that projection. The older adapter merges
several departure, experience, and movement choices, drops taste and theme
values without a matching older enum, and maps undecided duration to `null`.
This projection is not a migration of the current answer model. Storage is
best-effort: a blocked write does not prevent the current Result transition,
and a caught removal does not prove stored data was erased.

Completing the flow also records the first current Result fixture in legacy
MOGU Recent. The Result itself remains the two current presentation fixtures,
which current Exploration answers do not select, rank, or generate reasons
for. This is not a guarantee that a journey or travel time is feasible. The
Route screen's half-day start is separate Route state, not a guarantee derived
from the Exploration duration.

## Current collection ownership and lifecycle

These are the current accountless prototype semantics, not permanent
requirements for a future collection or library model:

- MOGU browses `currentJourneys`; it is not a recent-history collection. Home's
  “past journeys” cards come from `demoJourneys` presentation fixtures and do
  not record visits. The legacy `tmm:moguRecent:v1` state may still be written,
  but it does not own either surface.
- Explicit journey and Spot bookmarks are separate IDs stored under
  `tmm:figmaFavorites:v1`. Route saves use `tmm:savedRoutes`, keyed by
  `routeId` with the original `savedAt` timestamp; saving an existing route is
  idempotent. These are distinct user actions and state.
- Favorites projects each current journey once, in current content order, when
  it has either an explicit journey bookmark or a saved route. Spots appear in
  a separate group. My opens the same `/my-route` Favorites surface.
- Saved journey and Spot cards reopen their current Story or Spot content.
  Saved routes retain a route reference rather than a route variant or content
  snapshot; opening one starts on the current half-day route. The “view saved
  route” action also performs a save. The visible Route surface currently has
  no route-unsave control, and removing a journey bookmark leaves its card in
  Favorites while that journey's route remains saved.
- Persistence is best-effort local storage. UI feedback confirms the action
  was requested, not durable storage; there is no account or cross-tab sync.

These observed limitations describe the current prototype only. They do not
decide future visit history, collection, synchronization, or removal behavior.

## Current nickname and Food Profile ownership

Nickname and Food Profile are separate browser-local personalization state:
`tmm:nickname:v1` stores the nickname, while `tmm:foodProfile:v1` stores a
versioned dietary summary with broad categories, custom text, and an explicit
no-restrictions state, and a timestamp. The profile has no account ID and does
not retain every individual conversation choice. The conversation writes the
nickname and profile when its summary appears, before the final choice between
a recommendation and browsing; unfinished earlier answers remain
conversational state.

The whole onboarding conversation can be skipped, but its name-entry path
requires a nonblank name once begun and offers no per-name skip. Skipping at
the start leaves any existing nickname and Food Profile unchanged; it does
not mark the user as having no restrictions. My's Food Profile edit keeps the
nickname, starts with empty dietary answers, and re-asks the questions before
replacing the saved summary. The current flow does not edit the nickname or
restore the exact previous choices. Home omits the nickname greeting when no
name is stored; My's displayed “ナナミ” / “Nanami” fallback is presentation copy,
not a stored identity.

These flows use best-effort browser storage scoped to this site. There is no
expiry, separation by account, account synchronization, or current-screen
reconciliation across tabs.

Saved-state UI feedback does not prove a write was durable. Unreadable or
invalid stored profile data is treated as absent; that does not mean it was
erased. My's logout control currently reports “Coming soon,” and these flows do
not provide a complete profile reset, deletion, or logout capability. The
nickname and Food Profile do not create an account or use the independently
restored session from the still-mounted legacy AuthProvider.

These are limits of the current accountless prototype, not future consent,
retention, deletion, migration, authentication, privacy certification, or edit
requirements. Dietary input informs recommendations only and is not a food
safety guarantee.

## Demo and durable Product boundaries

The durable Product scope is Tokyo-wide, multi-region × multi-food-culture, for
Japanese and international travelers. The 2026-08-23 deterministic demo may
focus on Okutama × Tokyo Wasabi; that demo content does not narrow shared
Product, data, recommendation, routing, persistence, or i18n contracts.

The current prototype is accountless and local. It does not require login,
geolocation, payments, production booking, server-side profiles, or live route
generation.

Dietary input informs recommendations only and is not a food-safety guarantee.

The five-candidate deterministic helper is dormant/supporting implementation
state, not the active Result contract. No production taxonomy, provider or
station identities, travel-time source, selection/scoring/reasons, or migration
contract is adopted. Any such production semantics require a separate
authorized contract before activation; do not infer them from current fixtures.

## Evidence boundary

Source/provenance records, Open Data records, licenses, attribution, research,
fieldwork evidence, and factual source material remain valid evidence. They do
not override current visible Product/UI behavior.

Displayed venue facts must retain honest provenance and verification caveats.
Hours, prices, reservations, access, availability, and contact details may
change and require source verification. Never convert editorial/demo content
or a research candidate into a verified fact without evidence.

In particular, the Tokyo Wasabi demo fixture and its seed records remain
`needs_confirmation`; the fixture is not a verified or visitable claim.

## Historical material

All pre-#279 UI/IA/flow documents are historical unless current live Figma,
current `main`, or this contract explicitly adopts their content. This
includes S0-S9 maps, old Discover/Recent/Saved semantics, Top-3 descriptions,
tutorial choreography, standalone Support IA, Netlify selectors/timing, and
old Figma implementation/reconciliation maps.

Historical files may remain for evidence. Do not rewrite or restore them to
resolve a current implementation question.

## Validation contract

The current browser gate is `e2e/current-mvp-smoke.spec.ts`. It checks the
current 375px MVP surfaces and journey; it is not a Product specification.
Focused current regressions use `playwright.regressions.config.ts` and do not
run as the canonical merge gate. Obsolete suites may remain only as clearly
isolated historical artifacts; the superseded Issue #276 Netlify suite was
removed during the Issue #297 audit.

Before a visible Product change is complete:

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm exec playwright test e2e/current-mvp-smoke.spec.ts
```
