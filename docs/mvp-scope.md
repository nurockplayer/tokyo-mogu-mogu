# MVP Scope and Demo Journey

Status: Product scope follows `docs/specs/product/product-scope-invariant.md` / Issue #112; current App IA follows Issue #92 (KiKi UI/UX draft). The approved S0–S9 screens remain historical screen mapping / visual foundation only.

## 0. Product scope vs 8/23 demo scope / 最重要

> **Product scope = 東京都全域 × 複数地域 × 複数食文化。**
>
> **2026-08-23 Hackathon Demo Golden Path = 奥多摩 × 東京わさび。**

The second line does **not** redefine the first. Okutama × Tokyo Wasabi is a deliberately small deterministic demo chosen for deadline stability. `MVP`, `pilot`, `canonical`, or `frozen` wording in this document refers to the Hackathon release/demo only when attached to that journey.

The Product is not permanently Okutama-only, Tama-only, outer-Tokyo-only, or Tokyo-Wasabi-only. The current Product objective prioritizes creating reasons to visit under-visited Tokyo regions because tourism is concentrated in the 23 wards, but that objective does not narrow the durable Product domain.

## 1. Product Vision / プロダクトビジョン

Tokyo Mogu Mogu is a Tokyo-wide product that can connect travelers with multiple regions and multiple food cultures. Regional food culture is the primary entry point: a traveler discovers it, understands the people, history, nature, and craft around it, turns that interest into a visit and support action, and can later discover another region.

`Discover → Understand → Visit → Act → Discover next region`

The current Product objective is to create reasons for travelers concentrated in Tokyo's 23 wards to discover less-visited parts of Tokyo. The Hackathon validates this vision through one deliberately narrow demo; it does not implement the full multi-region Product.

## 2. Primary Persona / 主要ペルソナ

**Inbound traveler** — an international visitor planning a Tokyo trip who wants to experience local food culture beyond the usual tourist spots.

| Attribute | Detail |
|---|---|
| Type | Primary persona for the hackathon demo |
| Who | Inbound international traveler (rep. persona: Taiwanese, 30s, based in Shinjuku, seeking local life / nature / maker interaction in day-trip range) |
| Motivations | Wants to understand the story behind Tokyo food culture and act on it — eat, buy, visit, support |
| Pain point | Local food culture is fragmented and hard to turn interest into a real visit or meaningful support |
| Core need | Discover a food culture → understand its story → follow a model route → support the culture through real actions |
| Success moment | Feels the food culture is worth passing on and knows exactly what to do about it |

Japanese deep-travel users are a secondary / future audience.

## 3. 2026-08-23 Hackathon Demo Scope / ハッカソン実装範囲

The release is intentionally narrow:

> **Hackathon Demo Golden Path: Okutama × Tokyo Wasabi**

Tama / Okutama remain the current fieldwork, evidence, and demo-content context. Tokyo Wasabi is the strongest current deterministic demo story. Shipping one coherent source-backed journey is enough; #163 additionally makes a second source-backed playable slice (青梅・沢井 × 日本酒) available via Discover — still demo-scoped, never narrowing Product scope.

This does not mean:
- Product geography = Tama / Okutama
- Product FoodCulture scope = Tokyo Wasabi
- recommendation = Tokyo Wasabi forever
- shared architecture = Okutama-specific

No second region or second production FoodCulture is required for 8/23. Extensibility does not require fake breadth.

### Current App IA (#92): Home / Discover / MOGU / My

The persistent primary navigation is **`Home / Discover / MOGU / My`** (Issue #92 / KiKi). Two kinds of information have different lifecycles:

- **Food Profile** (from historical S1) is a **stable** user setting — asked on first use, reused on later visits, editable from `My → Food Profile`. It is recommendation support only, never a safety guarantee.
- **Exploration Conditions** (from historical S2) are **per-trip** variables — how the user wants to experience this trip, answered from Home on each visit.

Flow:

- **First-time**: `Home → Food Profile → Exploration → Result → Story → Route → Spot`
- **Returning**: `Home → Exploration → Result → Story → Route → Spot` (existing Food Profile is reused)

### Screen roles (current behavior)

- **Home** — start a new personalized recommendation; the primary CTA begins the current-trip Exploration questions (first-time users may pass through Food Profile first). Does not duplicate recent history.
- **Discover** — free exploration without diagnosis: regional food stories, workshops/experiences, seasonal/event and bookable items. The 8/23 production content remains the demo golden path, now joined by the source-backed Ome/Sawai sake slice (#163).
- **MOGU** — system-managed recent recommendation results (up to ~5), auto-recorded from each Result, **distinct from Saved**. Each entry reopens its `Result → Story → Route → Spot` context; back navigation returns toward MOGU.
- **My** — Saved Routes + Food Profile + optional Badges (Stretch). No separate Saved Story / Saved Spot collections in the MVP; a saved Route can lead back to Story / Spot.

Support CTA is a cross-screen action pattern **distributed across Story / Route / Spot** (share / understand; save / plan visit; reserve / buy / book), not a standalone primary destination. Purchases / booking remain external-link-first for the MVP.

The legacy primary nav `Home / Diagnosis / Support / My Route` is superseded. Historical S8 My Route is now `My → Saved Routes`; S7 Support is a distributed CTA pattern; S9 Badge stays Stretch under `My → Badges`.

### Historical S0–S8 core journey (mapping foundation only)

The approved S0–S8 screens are the historical journey framing that the #92 App IA re-maps (S1 → Food Profile, S2 → per-trip Exploration, S3 → Result, S7 → distributed support, S8 → `My → Saved Routes`). They are preserved as screen mapping / visual foundation, not as the current navigation contract.

- **S0 Landing**: value proposition at a glance, start CTA.
- **S1 Dietary Restrictions**: historical → first-time `Food Profile`; used only for recommendation / match reasons (no safety claims — see product contract).
- **S2 Preference Diagnosis**: historical → per-trip `Exploration Conditions` (5-question wizard with progress + back).
- **S3 Diagnosis Result**: immediate result card + match reason tags; auto-adds a MOGU Recent entry.
- **S4 Food Culture Story**: editorial long-form story (geography/history, maker, craft, challenge → support transition); also reachable from Discover.
- **S5 Model Route**: half-day / 1-day route with numbered stops, mobility segments, and map pins; can be saved to My.
- **S6 Spot Detail**: practical info (access, hours, price, reservation) where source data exists; external actions.
- **S7 Support Actions**: 買う / 訪れる / 予約する / 寄付する / 共有する / 保存する with cultural-continuation meaning; distributed into Story/Route/Spot, not a standalone page.
- **S8 My Route**: historical → `My → Saved Routes` via local persistence.
- **S9 Badge Collection**: stretch / time permitting; `My → Badges`.

### In Scope (current Hackathon release)

- Deterministic `Result → Story → Route → Spot` demo journey from the current App IA, with Food Profile and per-trip Exploration as separate lifecycles.
- Shared UI foundation used by all screens.
- Local persistence for Saved Routes (`My → Saved Routes`), Food Profile, and MOGU Recent; demo reset. Recent and Saved remain distinct semantics.
- Japanese-first copy with English / Traditional Chinese i18n architecture.
- Source-backed **Okutama × Tokyo Wasabi demo golden-path content** with traceability preserved.

### Durable Product/domain boundary (not additional Hackathon scope)

- `Region`, `FoodCulture`, `Place`, and `Route` represent multiple Tokyo regions and multiple food cultures.
- Shared UI, routing, recommendation, persistence, i18n, and provenance contracts remain reusable across Tokyo regions.
- Practical test: another verified Tokyo Region × FoodCulture should be addable mainly through data/content/config rather than redesigning shared contracts.
- No second region, speculative production data, CMS, marketplace, or generic route platform is required for 2026-08-23.

### Reusable Infrastructure (legacy, not the primary journey)

- Food Culture Pokédex, Locked/Unlocked gating, geolocation check-in, `GET!` success moment, GTFS transit-aware next discovery, map view, Google Auth.
- These may remain as supplementary implementation but must not block or overwrite the current App IA.

### Out of Scope (2026-08-23 release)

- Full AI itinerary generation / route-planning algorithm
- Accounts / OAuth as a required demo step; server-side profile; cross-device sync
- Payments / coupons / real booking / donation backends
- Leaderboards / social graphs
- Production-grade reward / redemption backend
- Implementing multiple real regions merely to demonstrate Product breadth
- Generic multi-region CMS / marketplace / nationwide route engine

These are release guardrails, not permanent Product-scope exclusions.

## 4. Demo Content / デモデータ

The **8/23 demo content** is Okutama × Tokyo Wasabi, now joined by the source-backed Ome/Sawai × sake slice (Issue #163). Both are demo-scoped canonical demo data shared by Result / Story / Route / Spot / Discover; neither narrows Product scope.

Data provenance follows `AGENTS.md`: verified source data, team editorial content, and demo fixtures are distinguished explicitly. Demo content can be canonical **inside the golden path** without becoming canonical for the Product domain. No local facts are invented.

## 5. Demo Journey / 60–90秒デモの流れ

The core loop is **Home → Exploration → Result → Story → Route → Spot → Save**, with Result auto-writing MOGU Recent and the saved Route landing in `My → Saved Routes`. See [docs/demo-script.md](demo-script.md) for the current walkthrough.

1. **Home**: understand the Tokyo-wide value proposition and start the current-trip Exploration (~10 s).
2. **Food Profile** (first use only) then **Exploration Conditions**: set or reuse the stable Food Profile once on first use; then answer the 5 per-trip Exploration questions (~20 s).
3. **Result**: meet the demo recommendation, **Tokyo Wasabi / Okutama**, with match reasons; the entry auto-writes MOGU Recent (~10 s). Narration must identify it as today's demo example, not the Product's only possible result.
4. **Story**: maker, history, craft, and the succession challenge; distributed support CTAs (~15 s).
5. **Route**: half-day / 1-day model route with stops and mobility; save writes `My → Saved Routes` (~10 s).
6. **Spot Detail**: practical information for a representative spot; support CTA for the venue type (~10 s).

Target: a judge can complete Home → Result in ~60–90 seconds and understand the differentiated story → route → support arc in that window. The demo runs without login, without geolocation, and is replayable from a deterministic reset.

## 6. Success Metrics / 成功指標

For the hackathon demo and post-demo learning:

- **Demo completion**: the Home → Exploration → Result → Story → Route core journey completes on a phone in ≤90 seconds without login or location.
- **Journey completion**: ≥50% of demo users reach Story from Result.
- **Story consumption**: Story viewed for ≥80% of demo sessions.
- **Support clarity**: story → route → support differentiation explainable in 60–90 seconds.
- **Data quality**: 100% of demo items carry a traceable source or are clearly marked as demo/editorial data.
- **Scope clarity**: evaluators and collaborators can distinguish `Tokyo-wide multi-region × multi-food-culture Product` from `Okutama × Tokyo Wasabi 8/23 demo`.

These are demo-stage metrics, not production targets.

## 7. Out-of-scope guardrails (reminder for implementers)

- Do not add accounts, payment, leaderboards, or itinerary AI as required MVP features.
- Do not invent local facts: every shop, product, story, or public data point must be traceable or clearly marked as demo/editorial data.
- Dietary input must never be presented as a verified safety guarantee.
- Prefer the smallest reversible implementation that satisfies each issue's acceptance criteria, reusing the shared UI foundation.
- Do not implement another region or generic infrastructure solely to prove future extensibility.
- **Do not convert the narrow demo into the Product scope.** `Okutama × Tokyo Wasabi` is the Hackathon Demo Golden Path only.
