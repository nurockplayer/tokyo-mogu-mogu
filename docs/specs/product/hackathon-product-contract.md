# Hackathon Product Contract (S0–S9)

Durable Product positioning and behavior contract for the 2026 hackathon
prototype.

- **Product positioning source of truth**: Issue #85.
- **Hackathon UX source of truth**: Issue #41 + the approved S0–S9 UI / Design
  Spec v1.0.
- **Status**: Current contract. Issue #85 adds the durable Product positioning
  without rewriting the historical decision recorded in Issue #41.
- **Hackathon scope**: 1 region × 1 food culture — **奥多摩 × 東京わさび**.

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

- **1 region × 1 food culture**: 奥多摩 × 東京わさび.
- This is the first MVP pilot and the only required real content for the
  2026-08-23 submission, not the Product's permanent geographic scope.
- Other food cultures appear only as S9 unearned Badge dummies or future
  expansion, never as a core-demo premise.

## Core Journey

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
- S0–S8 approved UI takes priority.

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

- S9 Badge remains stretch work and must not block S0–S8.
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

- Hackathon S0–S9 UX is **accountless**.
- S8 My Route persistence is local (localStorage / existing local persistence).
- Google Auth is reusable infrastructure and may stay, but is **not** a
  requirement of the core demo journey, and auth controls must not be forced
  into the approved header if they conflict with it.
- No server-side profile, no cross-device sync.

## Determinism

- The prototype may deterministically recommend 東京わさび; no AI
  recommendation engine is required.
- The model route is a deterministic editorial route; no route-planning
  algorithm or realtime transit is required.
- The demo must run without login, without real geolocation, and without any
  geolocation override, and be replayable from a deterministic seed/reset.

## Safety Boundary (dietary)

- Dietary-restriction input (S1) is used **only** for recommendation / match
  reasons. It must never be presented as a verified safety guarantee.
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

These must not block or overwrite the S0–S9 implementation.

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
- Real payment / booking / donation backends (S7 actions may link out or be
  disabled/demo states)
- S0–S9 all-screen bulk implementation in one ticket (implemented per child
  Issue #43–#49)
- Google Auth rollback
- Rewriting history of past PRs / closed Issues
