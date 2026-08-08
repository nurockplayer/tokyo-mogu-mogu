# Hackathon Product Contract (S0–S9)

Durable behavior and product contract for the 2026 hackathon prototype.

- **Source of truth**: Issue #41 + the approved S0–S9 UI / Design Spec v1.0.
- **Status**: Current product direction. Supersedes the legacy Pokédex / check-in
  journey described in the earlier MVP docs and closed Issues #1–#9.
- **Scope**: 1 region × 1 food culture — **奥多摩 × 東京わさび**.

## Product

Tokyo Mogu Mogu connects inbound travelers with Tokyo food culture that
deserves to be passed on. It is not a popularity ranking. Each food culture is
shown as one continuous story — the maker, the place, the history — and the
journey leads from "knowing" to acting: eating, buying, visiting, making,
reserving, and sharing.

The core loop is **Discover → Understand → Visit → Act**, where the action's
meaning for cultural succession is made visible.

## Primary Persona

- Primary: inbound international traveler planning a trip to Tokyo (rep.
  persona: Taiwanese, 30s, based in Shinjuku, seeking local life / nature /
  maker interaction in day-trip range).
- Japanese deep-travel users are a future / secondary audience. They do not
  replace the primary persona for the hackathon UI.

## Hackathon Scope

- **1 region × 1 food culture**: 奥多摩 × 東京わさび.
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

- Full AI itinerary generation
- Production-grade reward / redemption backend
- Real payment / booking / donation backends (S7 actions may link out or be
  disabled/demo states)
- S0–S9 all-screen bulk implementation in one ticket (implemented per child
  Issue #43–#49)
- Google Auth rollback
- Rewriting history of past PRs / closed Issues
