# MVP Scope and Demo Journey

Status: Product / MVP framing aligned to Issue #112; current App IA aligned to
Issue #92 (KiKi UI/UX draft). The approved S0–S9 screens remain as the
historical screen mapping / visual foundation only.

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

The 2026-08-23 MVP pilot geography is the **Tama area (多摩地域)**. **Okutama**
is the current fieldwork / verified-content focus and an important hub, but the
Product / MVP concept is not fixed to Okutama alone. MVP food content is
evidence-driven: Tokyo Wasabi may be a strong deterministic demo fixture, but
it is not the only allowed content contract — verified / visitable Tama food,
places, and experiences are selected by evidence, without inventing content to
widen scope.

### Current App IA (#92): Home / Discover / MOGU / My

The persistent primary navigation is **`Home / Discover / MOGU / My`** (Issue
#92 / KiKi). Two kinds of information have different lifecycles:

- **Food Profile** (from historical S1) is a **stable** user setting — asked on
  first use, reused on later visits, editable from `My → Food Profile`. It is
  recommendation support only, never a safety guarantee.
- **Exploration Conditions** (from historical S2) are **per-trip** variables —
  how the user wants to experience this trip, answered from Home on each visit.

Flow:

- **First-time**: `Home → Food Profile → Exploration → Result → Story → Route → Spot`
- **Returning**: `Home → Exploration → Result → Story → Route → Spot`
  (existing Food Profile is reused)

### Screen roles (current behavior)

- **Home** — start a new personalized recommendation; the primary CTA begins
  the current-trip Exploration questions (first-time users may pass through
  Food Profile first). Does not duplicate recent history.
- **Discover** — free exploration without diagnosis: regional food stories,
  workshops/experiences, seasonal/event and bookable items.
- **MOGU** — system-managed recent recommendation results (up to ~5),
  auto-recorded from each Result, **distinct from Saved**. Each entry reopens
  its `Result → Story → Route → Spot` context; back navigation returns toward
  MOGU.
- **My** — Saved Routes + Food Profile + optional Badges (Stretch). No separate
  Saved Story / Saved Spot collections in the MVP; a saved Route can lead back
  to Story / Spot.

Support CTA is a cross-screen action pattern **distributed across Story / Route
/ Spot** (share / understand; save / plan visit; reserve / buy / book), not a
standalone primary destination. Purchases / booking remain external-link-first
for the MVP.

The legacy primary nav `Home / Diagnosis / Support / My Route` is superseded.
Historical S8 My Route is now `My → Saved Routes`; S7 Support is a distributed
CTA pattern; S9 Badge stays Stretch under `My → Badges`.

### Historical S0–S8 core journey (mapping foundation only)

The approved S0–S8 screens are the historical journey framing that the #92 App
IA re-maps (S1 → Food Profile, S2 → per-trip Exploration, S3 → Result, S7 →
distributed support, S8 → `My → Saved Routes`). They are preserved as screen
mapping / visual foundation, not as the current navigation contract.

- **S0 Landing**: value proposition at a glance, start CTA.
- **S1 Dietary Restrictions**: historical → first-time `Food Profile`; used only
  for recommendation / match reasons (no safety claims — see product contract).
- **S2 Preference Diagnosis**: historical → per-trip `Exploration Conditions`
  (5-question wizard with progress + back).
- **S3 Diagnosis Result**: immediate result card + match reason tags; auto-adds
  a MOGU Recent entry.
- **S4 Food Culture Story**: editorial long-form story (geography/history,
  maker, craft, challenge → support transition); also reachable from Discover.
- **S5 Model Route**: half-day / 1-day route with numbered stops, mobility
  segments, and map pins; can be saved to My.
- **S6 Spot Detail**: practical info (access, hours, price, reservation) where
  source data exists; external actions.
- **S7 Support Actions**: 買う / 訪れる / 予約する / 寄付する / 共有する /
  保存する with cultural-continuation meaning; distributed into Story/Route/Spot,
  not a standalone page.
- **S8 My Route**: historical → `My → Saved Routes` via local persistence.
- **S9 Badge Collection**: stretch / time permitting; `My → Badges`.

### In Scope (current MVP)

- Deterministic Result → Story → Route → support flow from the current App IA
  (Home / Discover / MOGU / My), with Food Profile and per-trip Exploration as
  separate lifecycles.
- Shared UI foundation (Issue #42) used by all screens.
- Local persistence for Saved Routes (`My → Saved Routes`), Food Profile, and
  MOGU Recent; demo reset. Recent and Saved remain distinct semantics.
- Japanese-first copy with English / Traditional Chinese i18n architecture.
- Source-backed Tama-pilot demo content (Okutama fieldwork / verified content);
  data traceability preserved.

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

The current demo's content focus is **Okutama fieldwork / verified Tama-pilot
content**. Tokyo Wasabi is a strong deterministic demo fixture, not the
exclusive MVP content contract; other verified / visitable Tama food candidates
may be selected as evidence allows, and additional cultures appear only as S9
badge dummies / future expansion without implying another implemented region.

Data provenance follows `AGENTS.md`: verified source data, team editorial
content, and demo fixtures are distinguished explicitly. Until fieldwork
(Issue #10) supplies stronger data, demo content uses verified existing data,
clearly identified demo/editorial fixtures, or explicit unknown/unverified
states. No local facts are invented.

## 5. Demo Journey / 60–90秒デモの流れ

The core loop is **Home → Exploration → Result → Story → Route → Spot → Save**,
with Result auto-writing MOGU Recent and the saved Route landing in `My → Saved
Routes`. See [docs/demo-script.md](demo-script.md) for the current walkthrough.

1. **Home**: the value — eating Tokyo connects its culture — is understood at a
   glance; start the current-trip Exploration (~10 s).
2. **Exploration Conditions** (first use only, preceded by **Food Profile**):
   answer the 5 per-trip questions (~20 s). Returning users reuse Food Profile.
3. **Result**: meet the recommended regional food story with match reasons; the
   entry auto-writes MOGU Recent (~10 s).
4. **Story**: maker, history, craft, and the succession challenge; distributed
   support CTAs (share / understand / view route) (~15 s).
5. **Route**: half-day / 1-day model route with stops and mobility; save writes
   `My → Saved Routes` (~10 s).
6. **Spot Detail**: practical information for a representative spot; support CTA
   for the venue type (reserve / buy / book) (~10 s).

Target: a judge can complete Home → Result in ~60–90 seconds and understand the
differentiated story → route → support arc in that window. The demo runs
without login, without geolocation (real or overridden), and is replayable
from a deterministic reset. Returning-use behavior is shown by reopening MOGU
Recent or re-running Exploration from Home without repeating Food Profile.

## 6. Success Metrics / 成功指標

For the hackathon demo and post-demo learning:

- **Demo completion**: the Home → Exploration → Result → Story → Route core
  journey completes on a phone in ≤90 seconds without login or location.
- **Journey completion**: ≥50% of demo users reach Story from Result.
- **Story consumption**: Story viewed for ≥80% of demo sessions.
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
