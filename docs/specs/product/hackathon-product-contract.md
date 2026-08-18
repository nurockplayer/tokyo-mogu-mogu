# Hackathon Product Contract (Home / Discover / MOGU / My)

Durable behavior contract for the 2026 hackathon prototype. Product geographic / FoodCulture scope and audience are governed first by `docs/specs/product/product-scope-invariant.md`.

## Source priority / scope hard gate

1. **`docs/specs/product/product-scope-invariant.md` + Issue #112 + Issue #214** — Product scope, audience, and demo boundary.
   - **Product scope = Tokyo-wide, multi-region × multi-food-culture.**
   - **Audience = Japanese + international travelers as first-class Product users.** Nationality does not define primary/secondary persona.
   - Current Product objective = create reasons to visit less-visited Tokyo regions and reduce tourism concentration in the 23 wards.
   - **Okutama × Tokyo Wasabi = 2026-08-23 Hackathon Demo Golden Path only.**
   - Tama / Okutama / Tokyo Wasabi are not permanent Product-domain boundaries.
2. **Issue #92 + KiKi UI/UX IA draft** — current App IA / repeat-use behavior (`Home / Discover / MOGU / My`).
3. **Latest approved KiKi Figma for each screen** — visual / interaction implementation source when available.
4. `docs/specs/product/approved-ui-fidelity.md` — fallback presentation guidance.
5. Issue #85 / #41 and S0–S9 — historical foundation only where not conflicting with the sources above.

`canonical`, `pilot`, and `frozen` terminology around Okutama × Tokyo Wasabi must be explicitly scoped to demo data/content/golden-path behavior. A narrow Hackathon demo cannot redefine the durable Product domain or audience.

## Product Vision

Tokyo Mogu Mogu connects travelers with multiple regions and multiple food cultures across Tokyo. The current Product objective is to create personal reasons for travelers concentrated in Tokyo's 23 wards to discover less-visited parts of Tokyo, using food as a direct entry point into land, people, nature, history, and local experiences.

> 東京23区に集中する観光の流れを、地域ならではの「行きたい理由」によって東京全体へ広げる。

Food culture is the primary entry point for creating that reason to visit. Cultural succession remains an important value, while tourism dispersion and regional discovery are the current top-level problem the Product addresses.

**Important:** the objective may prioritize outer / under-visited Tokyo, but the durable Product scope itself is **Tokyo-wide**, not outer-Tokyo-only.

## Product

Tokyo Mogu Mogu connects **Japanese and international travelers** with Tokyo food cultures and regions they may not yet know, helping each traveler find a personal reason to visit. It is not a popularity ranking. Each food culture can be shown as one continuous story — maker, place, history, nature — and the journey leads from "knowing" to acting: eating, buying, visiting, making, reserving, and sharing.

The durable loop is **Discover → Understand → Visit → Act → Discover next region**, where the action's meaning for cultural succession is made visible and continuation features can motivate another regional discovery.

Multilingual support helps international users access the same Product experience; it does not define the Product itself as inbound-only.

## Audience / Persona

**Audience invariant:** Japanese and international travelers are both first-class Product users. The audience is defined by the travel/discovery need, not nationality.

Core need-based traveler:
- wants to discover Tokyo regions / food cultures beyond what they already know
- values local life, nature, makers, history, craft, and food as a reason to visit
- wants a feasible half-day / one-day experience based on interests, food constraints, and travel conditions
- may be a Tokyo/Japan resident taking a weekend trip or an international visitor planning / taking a Tokyo trip

Representative use cases may include, for example:
- a Japanese traveler looking for an unfamiliar Tokyo day trip built around local food culture
- a Taiwanese or other international traveler based in central Tokyo looking for local life / nature / maker interaction

These are **examples**, not a primary/secondary nationality hierarchy.

Do not:
- define `inbound international traveler` as the sole/primary Product persona
- define Japanese deep-travel users as a secondary/future audience
- infer that foreign-visitor statistics define the Product audience
- encode nationality into recommendation/domain architecture unless a future explicit Product decision requires it

Foreign-visitor behavior statistics remain valid segment evidence for tourism concentration, multilingual/accessibility needs, and specific research questions.

## 2026-08-23 Hackathon Demo Scope

The Hackathon submission deliberately validates the Product through a **small deterministic demo**, not by implementing the full Product domain.

### Demo Golden Path

> **Okutama × Tokyo Wasabi**

Okutama × Tokyo Wasabi is the primary production-ready Result / Story / Route / Spot journey shown by 8/23. Additional source-backed slices (Ome/Sawai × sake, #163) may ship as secondary behind the release boundary below. This is acceptable and preferred to fake breadth.

This demo choice is only:
- demo content/data selection
- demo content freeze
- E2E golden path
- delivery optimization

It does **not** mean:
- Product geography = Tama or Okutama
- Product FoodCulture scope = Tokyo Wasabi
- durable recommendation output = Tokyo Wasabi only
- shared schema / routing / persistence / i18n = Okutama-specific
- Product audience = inbound travelers only

Tama / Okutama remain important current fieldwork, evidence, and demo-content contexts. Other verified Tokyo Region × FoodCulture candidates may be researched without becoming 8/23 production requirements.

One verified journey is enough. No content is invented to widen scope.

### Release boundary / Slice Manifest (Issue #171 / #170)

Additional Region × FoodCulture slices are release-switchable through one small
centralized Slice Manifest registry keyed by the demo candidate identity
(`src/data/slice-manifest.ts`). The manifest keeps each slice's lifecycle axes
explicitly separate — **content maturity** (`research → source_backed →
playable → verified`), **visibility** (`discover: hidden | preview | visible`
plus `recommendationEligible`), and **release role** (`none | secondary |
primary`) — and carries **no record-level verification state** (#129 stays the
authority). The 8/23 default:

- **Okutama × Tokyo Wasabi** — `playable`, `discover: visible`,
  recommendation-eligible, `primary` (current 8/23 primary MVP / demo)
- **Ome/Sawai × sake** — `playable`, `discover: visible`,
  recommendation-eligible, `secondary` (secondary expansion proof)

A single `enabled: false` change (or `discover: hidden`) removes a slice from
production Discover and recommendation exposure. Changing release exposure or
`releaseRole` only affects release metadata — canonical data / content / routes
/ i18n and direct Story / Route / Spot access stay usable, and the focused
browser path remains green. `playable` does **not** imply record verification.
Product scope stays Tokyo-wide and broader than either slice.

## Current App IA (Issue #92)

The persistent primary navigation is **`Home / Discover / MOGU / My`** (Issue #92; live in `src/app/AppShell.tsx`). Each tab owns one separation of user information:

- **Home** — start a new personalized recommendation. The primary CTA begins the current-trip Exploration questions. First-time users may pass through Food Profile before Exploration; returning users skip straight to Exploration and reuse the saved Food Profile.
- **Discover** — free exploration without diagnosis. Surfaces food-culture stories, workshops/experiences, seasonal/event content and bookable items. `Home = recommend for me`; `Discover = I browse myself`. The 8/23 demo may contain only the verified Okutama × Tokyo Wasabi golden-path content, but the surface and shared semantics must not imply that this is the Product's permanent scope. Future/unverified content stays clearly editorial/future.
- **MOGU** — system-managed recent recommendation history, **not** favorites. It keeps up to the 5 most recent Result entries (auto-recorded, `MOGU_RECENT_MAX = 5`), each reopening its `Result → Story → Route → Spot` context. Back navigation from reopened content returns toward MOGU, not to a fresh diagnosis.
- **My** — user-managed permanent content: **Saved Routes** + **Food Profile** + **Badges** entry (Stretch only). A saved Route can lead back to Story / Spot; no separate Saved Story / Saved Spot collections in the MVP.

### S0–S9 historical framing → current App IA mapping

The approved S0–S9 screens are the historical journey framing. Issue #92 re-maps them onto the current App IA as follows; this mapping is the current navigation/behavior meaning:

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

The legacy primary nav `Home / Diagnosis / Support / My Route` is **superseded** by `Home / Discover / MOGU / My`. Those screens remain reachable by direct URL for history/compatibility but are no longer primary-nav destinations.

## Core Journey (historical S0–S9 framing)

```text
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
- The approved S0–S9 UI is the historical visual foundation; current primary-navigation and per-screen behavior is defined by "Current App IA (Issue #92)".
- Under the #92 App IA this linear journey is the historical framing for the screens above. S7 Support and S8 My Route no longer exist as standalone primary destinations (distributed CTAs and `My → Saved Routes` respectively).

## Architecture / Data Boundary

- `Region`, `FoodCulture`, `Place`, and `Route` are durable Product domains that must represent multiple Tokyo regions and multiple food cultures.
- Okutama / Tokyo Wasabi hard-coding belongs only in demo fixtures / demo canonical content / demo tests, not in shared UI, routing, persistence, i18n, provenance, or recommendation contracts.
- Nationality-specific persona assumptions must not be hard-coded into shared UI, routing, persistence, data contracts, or recommendation logic.
- Shared contracts should remain reusable when another verified Tokyo Region × FoodCulture is added.
- Practical test: adding a future verified journey such as `青梅 × 日本酒` or `八王子 × 地域野菜` should primarily require data/content/configuration rather than redesigning shared contracts.
- This extensibility does **not** authorize a generic platform, CMS, marketplace, nationwide route engine, speculative production records, or a second implemented region for the Hackathon demo.

## Recommendation Boundary

- The durable recommendation model selects among Region × FoodCulture / journey candidates; it must not define Tokyo Wasabi as the only valid Product outcome.
- The current release ships three production-ready candidates (Okutama × Tokyo Wasabi primary, Ome/Sawai × sake secondary, and Hachioji × ginger secondary); the golden-path answers match only the wasabi profile, so it deterministically recommends Tokyo Wasabi.
- That deterministic behavior is **demo-only**, not a Product-domain rule.
- Food Profile supports filtering / recommendation reasons; Exploration Conditions provide per-trip ranking / selection context.
- Nationality is not a required recommendation input or persona assumption under the current Product contract.
- Do not infer food safety from dietary inputs or missing venue metadata.

## Badge / Next Discovery Boundary

- S9 Badge remains stretch work and must not block the core journey. Under the #92 App IA it lives in **`My → Badges`** (Stretch), not in the primary navigation.
- If Badge or another continuation feature is implemented, its Product role is to preserve the traveler's connection and create motivation to discover a next region; collection is not the top-level Product goal.
- Future-region slots may be clearly labeled dummy / locked fixtures. They must not imply that routes, places, or stories for those regions are implemented.

## Language / Device

- Mobile-first, 375px baseline.
- Japanese is the judging/demo primary copy and default Product locale.
- The Japanese core experience must read naturally for Japanese travelers and must not assume the user is foreign.
- The i18n architecture supports English / Traditional Chinese expansion for international users; multilingual support does not make the Product inbound-only.
- Long English strings must not break layout.
- WCAG AA and 44px tap targets are the minimum quality bar.

## Account / Persistence

- The current App IA demo experience is **accountless**.
- **Food Profile** is a persistent local user setting (asked on first use, reused on later visits, editable from `My → Food Profile`). **Exploration Conditions** are per-trip, current-flow variables. **MOGU Recent** is system-managed (at most 5, auto-recorded, `tmm:moguRecent:v1`). **Saved Routes** persist only on explicit user action (`tmm:savedRoutes`). Recent and Saved are distinct semantic/persistence concepts even if they share lower-level helpers.
- S8 My Route persistence is local (localStorage / existing local persistence); under the #92 App IA it is the `My → Saved Routes` surface.
- Google Auth is reusable infrastructure and may stay, but is **not** a requirement of the core demo journey, and auth controls must not be forced into the approved header if they conflict with it.
- No server-side profile, no cross-device sync.

## Determinism

- The 8/23 prototype may deterministically recommend 東京わさび; no AI recommendation engine is required.
- This is explicitly **Hackathon Demo Golden Path behavior**. Result / Story / recommendation semantics remain reusable for other verified Tokyo Region × FoodCulture candidates.
- The model route is a deterministic editorial route; no route-planning algorithm or realtime transit is required.
- The demo must run without login, without real geolocation, and without any geolocation override, and be replayable from a deterministic seed/reset.

## Safety Boundary (dietary)

- Dietary-restriction input (S1, the first-time `Food Profile` under the #92 App IA) is used **only** for recommendation / match reasons. It must never be presented as a verified safety guarantee.
- Do not display claims like "this shop is allergy-safe" or "this food is safe" unless the underlying venue data actually supports them.
- S3 diagnosis result and relevant S6 spot-detail areas must include a disclaimer equivalent to 「詳細は現地・店舗に直接確認してください」.
- Trust copy must state the recommendation-only purpose and must not be mistaken for medical/food-safety assurance.

## Legacy Concepts (reclassified)

The following are implemented / previously considered and may be kept as reusable infrastructure, but are **not** the source of truth for the current hackathon core UX:

- Food Culture Pokédex as the entry journey
- FoodCulture Locked / Unlocked gating
- Browser-geolocation check-in as a required collection step
- `GET!` as the core success moment
- Area/category completion as the central progression
- GTFS next-departure as the center of "next collectible" selection
- Google Auth as a required demo step
- Inbound-only / foreign-traveler-only Product persona framing

These must not block or overwrite the current App IA journey or audience invariant.

The legacy primary navigation `Home / Diagnosis / Support / My Route` is also **superseded** by the #92 App IA (`Home / Discover / MOGU / My`). Diagnosis now means per-trip Exploration Conditions, Support is a distributed CTA pattern rather than a standalone page, and My Route is the `My → Saved Routes` surface. They remain reachable by direct URL only for history/compatibility, not as primary-nav destinations.

## Source / Data Traceability

- External/open data keeps source traceability (name, URL/dataset, license, last-verified date).
- Clearly distinguish verified source data, team editorial content, and demo fixtures.
- Never fabricate fieldwork facts. Use verified existing data, clearly identified demo/editorial fixtures, or explicit unknown/unverified states.
- A dataset can be canonical for the **8/23 demo golden path** without becoming canonical for the Product domain.
- Segment-specific research (for example foreign-visitor behavior) may support evidence and UX requirements without becoming a Product-wide persona rule.

## Out of Scope for 2026-08-23

- A second implemented region or speculative production content
- Implementing the full Tokyo-wide catalog before the deadline
- A generic multi-region platform, CMS, marketplace, or nationwide route engine
- Full AI itinerary generation
- Production-grade reward / redemption backend
- Real payment / booking / donation backends (support CTAs may link out or be disabled/demo states)
- Saved Story / Saved Spot collections (a saved Route leads back to Story/Spot)
- Google Auth rollback
- Rewriting history of past PRs / closed Issues
