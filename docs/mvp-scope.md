# MVP Scope and Demo Journey

Status: Draft for MVP implementation (Issue #1)

Tokyo Mogu Mogu の MVP 範囲を定義します。このドキュメントは Issue #1 の Acceptance Criteria を満たし、実装 (Issue #2-#9) の共通コンテキストとして使われます。

## 1. Primary Persona / 主要ペルソナ

**Tokyo Taster** — a Japanese deep-travel or international visitor in Tokyo who wants to experience Tama's local food culture beyond the usual tourist spots.

| Attribute | Detail |
|---|---|
| Type | Primary persona for the MVP demo |
| Who | Japanese deep-travel resident (20s-40s) or international visitor with smartphone |
| Motivations | Wants authentic local food experiences; enjoys collecting (goshuin, stamps, stamps-rally) |
| Pain point | Tama's food culture is fragmented; hard to find where to experience it and hard to turn interest into a real visit |
| Core need | Discover a food culture → understand its story → know exactly where to experience it → collect it as proof of the visit |
| Success moment | Unlocks a collectible after a real in-area check-in and wants to collect the next one |

Secondary: international visitor who needs clear English copy and map navigation. Both personas are in scope; copy ships in Japanese and English.

## 2. MVP Scope / 機能スコープ

### In Scope (MVP)

- **Discovery**: Food culture Pokédex (grid of cards, locked/unlocked states, completion progress, hints for undiscovered items).
- **Story**: Food culture detail page with overview, region/history, maker story, how to enjoy, related places, and source/provenance.
- **Experience**: Map view of places + nearby discovery; FoodCulture ↔ Place navigation; link out to Google Maps / Apple Maps.
- **Collection**: Location-based check-in (browser geolocation + distance check against configurable radius) that unlocks food cultures; duplicate check-in handled safely.
- **Persistence**: Local-only collection progress (collected food cultures, visited places, collected_at) via localStorage/IndexedDB, with a demo reset.
- **Progression**: Area/category completion, next-collectible suggestions, nearby undiscovered highlights.
- **Languages**: Japanese and English user-facing copy.
- **Data**: MVP seed dataset of Tama/Okutama food cultures and places with source/provenance traceability.

### Out of Scope (Explicitly excluded from MVP)

- AI itinerary generation
- Accounts / OAuth / server-side user profile
- Merchant CMS / admin panel
- Leaderboards / social graphs
- Payments / coupons
- QR-code check-in operation
- Cross-device sync
- Route-planning algorithm (navigation is delegated to external map apps)

## 3. Initial Collectibles / 初期コレクティブル

The MVP seed focuses on 4 food cultures, anchored in Okutama and western Tama. The data model (Issue #2) is designed to expand across Tama later.

| # | Collectible | Category | Area | Note |
|---|---|---|---|---|
| 1 | Tokyo Wasabi (東京わさび) | Produce / wasabi | Okutama | Signature entry point for the demo |
| 2 | Okutama Yamame Trout (奥多摩やまめ) | Produce / river fish | Okutama | Second collectible for the next-discovery loop |
| 3 | Tama sweets / wagashi (多摩のお菓子) | Sweets / wagashi | Tama area | Represents the sweets category |
| 4 | (Fieldwork addition, 1-2 more) | TBD | Okutama | To be added from Issue #10 fieldwork |

The demo journey primarily walks through #1 → #2.

## 4. Demo Journey / 60-90秒デモの流れ

The core loop is **Discover → Understand → Visit → Collect → Continue**.

1. **Top page**: concept is understood at a glance (30 seconds).
2. **Pokédex**: browse Tama food cultures; see locked/unlocked states and progress.
3. **Pick "Tokyo Wasabi"** (locked): read the story, maker, and history.
4. **Where to experience it**: view related places on the map; tap to start navigation.
5. **Check-in**: at the place, run geolocation check-in within the unlock radius.
6. **"Tokyo Wasabi GET!"**: card unlocks; Pokédex progress updates instantly.
7. **Story & maker**: read the detail page now fully unlocked.
8. **Next discovery**: guided to "Okutama Yamame" as the next collectible.

Target: a judge can complete this end-to-end on a phone in 60-90 seconds, and it can be reset and replayed for repeated demos.

## 5. Success Metrics / 成功指標

For the hackathon demo and post-demo learning:

- **Demo completion**: the 8-step journey above can be completed on a phone in ≤90 seconds.
- **Check-in success rate**: ≥90% of demo check-ins unlock correctly on the first attempt (including demo/overridden-location mode).
- **Collection engagement**: ≥2 collectibles unlocked during a single demo session by ≥50% of demo users.
- **Story consumption**: detail page viewed for ≥80% of unlocked collectibles in demo sessions.
- **Data quality**: 100% of seed items carry a traceable source (source name + URL/dataset + last-verified date).

These are demo-stage metrics, not production targets.

## 6. Out-of-scope guardrails (reminder for implementers)

- Do not add accounts, payment, leaderboards, or itinerary AI for the MVP.
- Do not invent local facts: every shop, product, story, or public data point must be traceable or clearly marked as demo/editorial data.
- Prefer the smallest reversible implementation that satisfies each issue's acceptance criteria.
