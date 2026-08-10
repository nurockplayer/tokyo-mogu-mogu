# Hackathon Product Contract (Home / Discover / MOGU / My)

Durable Product positioning and behavior contract for the 2026 hackathon
prototype.

- **Product / MVP framing source of truth**: Issue #112 (current clarification).
  Top problem is tourism over-concentration in Tokyo's 23 wards; the first
  MVP pilot geography is the Tama area; Okutama is the current fieldwork /
  verified-content focus; food content is evidence-driven rather than locked to
  a single Tokyo-Wasabi contract.
- **Current App IA source of truth**: Issue #92 + the KiKi UI/UX IA draft
  (`Home / Discover / MOGU / My`). It owns current navigation and behavior.
- **Presentation source of truth**: the **latest approved KiKi Figma for each
  screen** wins as the visual / interaction implementation source for that
  screen when available. Where an approved Figma is not yet available,
  `docs/specs/product/approved-ui-fidelity.md` is the fallback cross-screen
  presentation guidance (visual reference only).
- **Historical foundation**: Issue #85 / #41 and the approved S0–S9 UI. These
  are preserved as historical screen mapping / visual foundation only where
  they do not conflict with #112 / #92 / an approved Figma.
- **Status**: Current contract. Issues #85 / #41 are earlier layers, not the
  current source of truth.
- **Hackathon pilot scope**: first MVP pilot geography is the Tama area (多摩
  地域); Okutama is the current fieldwork / verified-content focus. Tokyo Wasabi
  is an allowed strong deterministic demo fixture, not the exclusive MVP content
  contract.

## Product Vision

Tokyo Mogu Mogu creates reasons for travelers concentrated in Tokyo's 23 wards
to discover destinations across outer Tokyo. It connects travelers with
regional food culture, people, nature, and experiences, so the traveler chooses
to make the trip rather than being told simply to disperse.

> 東京23区に集中する観光の流れを、地域ならではの「行きたい理由」によって
> 東京全体へ広げる。

Food culture is the primary entry point for creating that reason to visit; its
inheritance remains an important value, while tourism dispersion and regional
discovery are the top-level problem the Product addresses.

## Product

Tokyo Mogu Mogu connects inbound travelers with Tokyo food culture that
deserves to be passed on. It is not a popularity ranking. Each food culture is
shown as one continuous story — the maker, the place, the history — and the
journey leads from "knowing" to acting: eating, buying, visiting, making,
reserving, and sharing.

The durable loop is **Discover → Understand → Visit → Act → Discover next
region**, where the action's meaning for cultural succession is made visible
and any continuation feature motivates another regional discovery.

## Primary Persona

- Primary: inbound international traveler planning a trip to Tokyo (rep.
  persona: Taiwanese, 30s, based in Shinjuku, seeking local life / nature /
  maker interaction in day-trip range).
- Japanese deep-travel users are a future / secondary audience. They do not
  replace the primary persona for the hackathon UI.

## Hackathon Scope

- **First MVP pilot geography**: the **Tama area (多摩地域)**. Okutama is the
  current fieldwork / verified-content focus and an important hub, but the
  Product / MVP concept is not fixed to Okutama alone.
- MVP food content is evidence-driven: Tokyo Wasabi may be a strong
  deterministic demo fixture, but it is **not** the only allowed content
  contract. Verified / visitable Tama food, places, and experiences are
  selected from candidates (e.g. wasabi, yamame, trout) as evidence allows.
- One verified journey is enough if that is what is ready; no content is
  invented to widen scope.
- Additional food cultures appear only as S9 unearned Badge dummies or future
  expansion, never as a core-demo premise.

## Current App IA (Issue #92)

The persistent primary navigation is **`Home / Discover / MOGU / My`** (Issue
#92; live in `src/app/AppShell.tsx`). Each tab owns one separation of user
information:

- **Home** — start a new personalized recommendation. The primary CTA begins
  the current-trip Exploration questions. First-time users may pass through
  Food Profile before Exploration; returning users skip straight to Exploration
  and reuse the saved Food Profile.
- **Discover** — free exploration without diagnosis. Surfaces food-culture
  stories, workshops/experiences, seasonal/event content and bookable items.
  `Home = recommend for me`; `Discover = I browse myself`. The 8/23 demo uses
  only verified Tama-pilot production content; Okutama fieldwork content can be
  prominent, but the Product / MVP is not implied to be permanently limited to
  Okutama / Tokyo Wasabi. Future/unverified content stays clearly
  editorial/future.
- **MOGU** — system-managed recent recommendation history, **not** favorites.
  It keeps up to the 5 most recent Result entries (auto-recorded, `MOGU_RECENT_MAX = 5`),
  each reopening its `Result → Story → Route → Spot` context. Back navigation
  from reopened content returns toward MOGU, not to a fresh diagnosis.
- **My** — user-managed permanent content: **Saved Routes** + **Food Profile**
  + **Badges** entry (Stretch only). A saved Route can lead back to Story /
  Spot; no separate Saved Story / Saved Spot collections in the MVP.

### S0–S9 historical framing → current App IA mapping

The approved S0–S9 screens are the historical journey framing. Issue #92
re-maps them onto the current App IA as follows; this mapping is the current
navigation/behavior meaning:

| Existing | Current IA role |
|---|---|
| S0 Landing | First-service introduction / Home first-time state |
| S1 Dietary Restrictions | First-time `Food Profile`; later editable from My |
| S2 Preference Diagnosis | Per-trip `Exploration Conditions` |
| S3 Result | Immediate result + auto-add to MOGU |
| S4 Story | Result content layer; also reachable from Discover |
| S5 Route | Recommended journey; can be saved to My |
| S6 Spot Detail | Practical details + external actions; reachable from Route/Discover |
| S7 Support Hub | No standalone primary page; support CTAs are distributed into Story/Route/Spot |
| S8 My Route | Integrated into `My → Saved Routes` |
| S9 Badge | Integrated into `My → Badges`; remains Stretch |

The legacy primary nav `Home / Diagnosis / Support / My Route` is **superseded**
by `Home / Discover / MOGU / My`. Those screens remain reachable by direct URL
for history/compatibility but are no longer primary-nav destinations.

## Core Journey (historical S0–S9 framing)

```
S0 Landing
→ S1 Dietary Restrictions
→ S2 Preference Diagnosis
→ S3 Diagnosis Result
→ S4 Food Culture Story
→ S5 Model Route
→ S6 Spot Detail
→ S7 Support Actions
→ S8 My Route
```

- S9 Badge Collection is **stretch / time permitting**.
- The approved S0–S9 UI is the historical visual foundation; the current
  primary-navigation and per-screen behavior is defined by "Current App IA
  (Issue #92)".
- Under the #92 App IA this linear journey is the historical framing for the
  screens above. S7 Support and S8 My Route no longer exist as standalone
  primary destinations (distributed CTAs and `My → Saved Routes` respectively).

## Architecture / Data Boundary

- `Region`, `FoodCulture`, `Place`, and `Route` are durable domains that must be
  able to represent future outer-Tokyo regions.
- Okutama / Tokyo Wasabi hard-coding belongs only in demo fixtures or seed
  content, not in shared UI, routing, persistence, i18n, or provenance
  contracts.
- Shared contracts should remain reusable when a verified future region is
  added.
- This extensibility does **not** authorize a generic platform, CMS, nationwide
  route engine, speculative production records, or a second implemented region
  for the Hackathon MVP.

## Badge / Next Discovery Boundary

- S9 Badge remains stretch work and must not block the core journey. Under the
  #92 App IA it lives in **`My → Badges`** (Stretch), not in the primary
  navigation.
- If Badge or another continuation feature is implemented, its Product role is
  to preserve the traveler's connection and create motivation to discover a
  next region; collection is not the top-level Product goal.
- Future-region slots may be clearly labeled dummy / locked fixtures. They must
  not imply that routes, places, or stories for those regions are implemented.

## Language / Device

- Mobile-first, 375px baseline.
- Japanese is the judging/demo primary copy; the i18n architecture supports
  English / Traditional Chinese expansion.
- Long English strings must not break layout.
- WCAG AA and 44px tap targets are the minimum quality bar.

## Account / Persistence

- The current App IA demo experience is **accountless**.
- **Food Profile** is a persistent local user setting (asked on first use,
  reused on later visits, editable from `My → Food Profile`). **Exploration
  Conditions** are per-trip, current-flow variables. **MOGU Recent** is
  system-managed (at most 5, auto-recorded, `tmm:moguRecent:v1`). **Saved Routes**
  persist only on explicit user action (`tmm:savedRoutes`). Recent and Saved are
  distinct semantic/persistence concepts even if they share lower-level helpers.
- S8 My Route persistence is local (localStorage / existing local persistence);
  under the #92 App IA it is the `My → Saved Routes` surface.
- Google Auth is reusable infrastructure and may stay, but is **not** a
  requirement of the core demo journey, and auth controls must not be forced
  into the approved header if they conflict with it.
- No server-side profile, no cross-device sync.

## Determinism

- The prototype may deterministically recommend 東京わさび; no AI
  recommendation engine is required. Tokyo Wasabi is a strong deterministic
  fixture, but the Result / Story semantics must remain replaceable by verified
  Tama food candidates (the Result recommends a regional discovery / journey
  candidate, not only Tokyo Wasabi).
- The model route is a deterministic editorial route; no route-planning
  algorithm or realtime transit is required.
- The demo must run without login, without real geolocation, and without any
  geolocation override, and be replayable from a deterministic seed/reset.

## Safety Boundary (dietary)

- Dietary-restriction input (S1, the first-time `Food Profile` under the #92
  App IA) is used **only** for recommendation / match reasons. It must never be
  presented as a verified safety guarantee.
- Do not display claims like "this shop is allergy-safe" or "this food is
  safe" unless the underlying venue data actually supports them.
- S3 diagnosis result and relevant S6 spot-detail areas must include a
  disclaimer equivalent to 「詳細は現地・店舗に直接確認してください」.
- Trust copy must state the recommendation-only purpose and must not be
  mistaken for medical/food-safety assurance.

## Legacy Concepts (reclassified)

The following are implemented / previously considered and may be kept as
reusable infrastructure, but are **not** the source of truth for the current
hackathon core UX:

- Food Culture Pokédex as the entry journey
- FoodCulture Locked / Unlocked gating
- Browser-geolocation check-in as a required collection step
- `GET!` as the core success moment
- Area/category completion as the central progression
- GTFS next-departure as the center of "next collectible" selection
- Google Auth as a required demo step

These must not block or overwrite the current App IA journey.

The legacy primary navigation `Home / Diagnosis / Support / My Route` is also
**superseded** by the #92 App IA (`Home / Discover / MOGU / My`). Diagnosis now
means per-trip Exploration Conditions, Support is a distributed CTA pattern
rather than a standalone page, and My Route is the `My → Saved Routes` surface.
They remain reachable by direct URL only for history/compatibility, not as
primary-nav destinations.

## Source / Data Traceability

- External/open data keeps source traceability (name, URL/dataset, license,
  last-verified date).
- Clearly distinguish verified source data, team editorial content, and demo
  fixtures.
- Never fabricate fieldwork facts. Until #10 supplies stronger data, use
  verified existing data, clearly identified demo/editorial fixtures, or
  explicit unknown/unverified states.

## Out of Scope

- A second implemented region or unverified production content for 2026-08-23
- A generic multi-region platform, CMS, marketplace, or nationwide route engine
- Full AI itinerary generation
- Production-grade reward / redemption backend
- Real payment / booking / donation backends (support CTAs may link out or be
  disabled/demo states)
- S0–S9 all-screen bulk implementation in one ticket (implemented per child
  Issue #43–#49)
- Saved Story / Saved Spot collections (a saved Route leads back to Story/Spot)
- Google Auth rollback
- Rewriting history of past PRs / closed Issues
