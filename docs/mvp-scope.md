# MVP Scope and Demo Journey

Status: Product positioning aligned to Issue #85; Hackathon UX aligned to Issue
#41 and the approved S0–S9 UI.

## 1. Product Vision / プロダクトビジョン

Tokyo Mogu Mogu creates reasons for travelers concentrated in Tokyo's 23 wards
to discover destinations across outer Tokyo. Regional food culture is the
primary entry point: a traveler discovers it, understands the people, history,
nature, and craft around it, turns that interest into a visit and support
action, and can later discover another region.

`Discover → Understand → Visit → Act → Discover next region`

The Product's permanent geographic scope is not Okutama or Tama alone. The
Hackathon validates this vision through one deliberately narrow first pilot;
it does not implement a multi-region platform.

## 2. Primary Persona / 主要ペルソナ

**Inbound traveler** — an international visitor planning a Tokyo trip who wants
to experience local food culture beyond the usual tourist spots.

| Attribute | Detail |
|---|---|
| Type | Primary persona for the hackathon demo |
| Who | Inbound international traveler (rep. persona: Taiwanese, 30s, based in Shinjuku, seeking local life / nature / maker interaction in day-trip range) |
| Motivations | Wants to understand the story behind Tokyo food culture and act on it — eat, buy, visit, support |
| Pain point | Local food culture is fragmented and hard to turn interest into a real visit or meaningful support |
| Core need | Discover a food culture → understand its story → follow a model route → support the culture through real actions |
| Success moment | Feels the food culture is worth passing on and knows exactly what to do about it |

Japanese deep-travel users are a secondary / future audience.

## 3. Hackathon MVP Scope / Hackathon 機能スコープ

The 2026-08-23 MVP is **奥多摩 × 東京わさび**. It is the first pilot and the
only required real content, not the Product's permanent geographic boundary.

### Core Journey (S0–S8)

- **S0 Landing**: value proposition at a glance, diagnosis CTA.
- **S1 Dietary Restrictions**: optional multi-select + skip; used only for
  recommendation / match reasons (no safety claims — see product contract).
- **S2 Preference Diagnosis**: 5-question wizard with progress + back.
- **S3 Diagnosis Result**: 東京わさび result card + match reason tags.
- **S4 Food Culture Story**: editorial long-form story (geography/history,
  maker, craft, challenge → support transition).
- **S5 Model Route**: half-day / 1-day 奥多摩わさび route with numbered stops,
  mobility segments, and map pins.
- **S6 Spot Detail**: practical info (access, hours, price, reservation) where
  source data exists.
- **S7 Support Actions**: 買う / 訪れる / 予約する / 寄付する / 共有する /
  保存する with cultural-continuation meaning.
- **S8 My Route**: saved itineraries via local persistence.
- **S9 Badge Collection**: stretch / time permitting.

### In Scope (current MVP)

- Deterministic 東京わさび diagnosis → story → route → support flow.
- Shared UI foundation (Issue #42) used by all screens.
- Local persistence for S8 saved itineraries; demo reset.
- Japanese-first copy with English / Traditional Chinese i18n architecture.
- Source-backed 奥多摩 × 東京わさび demo content; data traceability preserved.

### Durable domain boundary (not additional MVP scope)

- `Region`, `FoodCulture`, `Place`, and `Route` can represent a verified future
  outer-Tokyo region without treating Okutama-specific fixtures as shared
  Product rules.
- Shared UI, routing, persistence, i18n, and provenance contracts remain
  reusable across regions.
- No second region, speculative production data, CMS, marketplace, or generic
  route platform is required for 2026-08-23.

### Reusable Infrastructure (legacy, not the primary journey)

- Food Culture Pokédex, Locked/Unlocked gating, geolocation check-in, `GET!`
  success moment, GTFS transit-aware next discovery, map view, Google Auth.
- These may remain as supplementary implementation but must not block or
  overwrite the S0–S9 core journey.

### Out of Scope (current MVP)

- Full AI itinerary generation / route-planning algorithm
- Accounts / OAuth as a required demo step; server-side profile; cross-device sync
- Payments / coupons / real booking / donation backends
- Leaderboards / social graphs
- Production-grade reward / redemption backend
- S0–S9 all-screen implementation in a single ticket (child Issues #43–#49)

## 4. Demo Content / デモデータ

The current demo uses **奥多摩 × 東京わさび** as its first-pilot fixture and
single core food culture. Other cultures appear only as S9 badge dummies /
future expansion and do not imply another implemented region.

Data provenance follows `AGENTS.md`: verified source data, team editorial
content, and demo fixtures are distinguished explicitly. Until fieldwork
(Issue #10) supplies stronger data, demo content uses verified existing data,
clearly identified demo/editorial fixtures, or explicit unknown/unverified
states. No local facts are invented.

## 5. Demo Journey / 60–90秒デモの流れ

The core loop is **Diagnose → Know → Route → Support** (S0–S8). See
[docs/demo-script.md](demo-script.md) for the current walkthrough.

1. **S0 Landing**: the value — eating Tokyo connects its culture — is understood
   at a glance (~10 s).
2. **S1 Dietary Restrictions**: enter or skip dietary restrictions (~5 s).
3. **S2 Diagnosis**: answer 5 preference questions (~20 s).
4. **S3 Result**: meet 東京わさび with match reasons (~10 s).
5. **S4 Story**: maker, history, craft, and the succession challenge (~15 s).
6. **S5 Route**: half-day 奥多摩わさび model route with stops and mobility.
7. **S6 Spot Detail**: practical information for a representative spot.
8. **S7 Support**: purchase / visit / reserve / share — what the action means
   for cultural succession.
9. **S8 My Route**: save the route and confirm it locally.

Target: a judge can complete S0–S3 in ~60–90 seconds and understand the
differentiated story → route → support arc in that window. The demo runs
without login, without geolocation (real or overridden), and is replayable
from a deterministic reset.

## 6. Success Metrics / 成功指標

For the hackathon demo and post-demo learning:

- **Demo completion**: S0–S8 core journey completes on a phone in ≤90 seconds
  without login or location.
- **Journey completion**: ≥50% of demo users reach S4 story from S3 result.
- **Story consumption**: S4 full story viewed for ≥80% of demo sessions.
- **Support clarity**: story → route → support differentiation explainable in
  60–90 seconds.
- **Data quality**: 100% of seed items carry a traceable source or are clearly
  marked as demo/editorial data.

These are demo-stage metrics, not production targets.

## 7. Out-of-scope guardrails (reminder for implementers)

- Do not add accounts, payment, leaderboards, or itinerary AI as required MVP
  features.
- Do not invent local facts: every shop, product, story, or public data point
  must be traceable or clearly marked as demo/editorial data.
- Dietary input must never be presented as a verified safety guarantee.
- Prefer the smallest reversible implementation that satisfies each issue's
  acceptance criteria, reusing the shared UI foundation.
- Do not implement another region or introduce generic multi-region
  infrastructure solely to demonstrate future extensibility.
