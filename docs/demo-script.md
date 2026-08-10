# Demo Script (60–90 seconds)

Tokyo Mogu Mogu's Product Vision (Issue #112) is to create reasons for
travelers concentrated in Tokyo's 23 wards to discover outer-Tokyo regions. The
first MVP pilot geography is the **Tama area**; **Okutama** is the current
fieldwork / verified-content focus. Tokyo Wasabi is a strong deterministic demo
fixture, but not the exclusive MVP content contract.

The walkthrough runs on the current App IA (Issue #92 / KiKi): **Home /
Discover / MOGU / My**. The pitch arc is **Discover → Understand → Visit →
Act**: a traveler starts from Home, gets a Result, reads the story, follows a
route, supports the region at Story / Route / Spot, and finds everything again
in MOGU Recent and My. This walkthrough replaces the legacy Pokédex / check-in
demo and the earlier linear S0–S8 narration; the S0–S9 screens remain only as
historical mapping.

## Demo constraints

- **Accountless**: no sign-in is required at any step. Google Auth remains as
  supplementary infrastructure but is not part of the main pitch journey.
- **No geolocation**: the walkthrough does not require real geolocation, a fake
  geolocation override, or a `?at=place:` demo URL.
- **Deterministic**: the Result deterministically recommends 東京わさび (a
  strong demo fixture); the model route is a fixed editorial fixture. The flow
  is replayable from a reset.

## Steps (target: ≤90 seconds)

1. **Home** — hero + tagline + value explanation
   (`今の旅を診断 → 物語を知る → 巡って応援`) + start CTA. Home owns starting a new
   personalized recommendation; first-time users pass through **Food Profile**
   before the trip questions. (5 s)
2. **Food Profile (first use only)** — set or reuse the stable Food Profile
   (allergies / Vegetarian / Vegan / cannot-eat items) or skip. Trust copy
   states the input is used for recommendations only. Returning users skip this
   step and reuse the saved profile. (5 s)
3. **Exploration** — answer the 5 current-trip questions (taste, what to do,
   base area + travel time, interests, half-day/1-day) with progress + back.
   These are per-trip, not a permanent diagnosis. (20 s)
4. **Result** — 「東京わさび」result card with match-reason tags derived from
   the answers and the Food Profile. The Result is framed as a regional
   discovery / journey candidate (Tokyo Wasabi is the deterministic demo
   fixture for 8/23, not the only possible outcome). The entry auto-writes a
   **MOGU Recent** entry. (10 s)
5. **Story** — full editorial story: why Okutama wasabi, the maker, the craft,
   and the succession challenge → `味わうことが、継承になる`. Support CTAs are
   embedded here (share / understand / view route), each explaining what the
   action means for cultural succession. (15 s)
6. **Route** — half-day / 1-day Okutama wasabi model route: numbered stops,
   mobility segments (train / bus / walk), map pins matching the timeline. A
   **save** action writes `My → Saved Routes`; the support CTA here is "save
   route / plan visit". (10 s)
7. **Spot Detail** — representative spot: address, access, hours, price,
   reservation, and practical warnings where source data exists. The support
   CTA matches the venue type (reserve / buy / book); unverified actions show
   **準備中** (coming soon). (10 s)

Optional closing beats (~15 s, only if time allows):

- **MOGU** — show the auto-recorded Recent entry (max ~5), distinct from
  Saved; reopen it to confirm back navigation returns toward MOGU.
- **My → Saved Routes** — confirm the saved route; show Food Profile is
  editable here. S9 Badge stays under `My → Badges` as stretch.

Total walkthrough: ~60–90 s of presenter time. The narration must not claim
that Okutama / Tokyo Wasabi is the Product's or MVP's only contract — they are
the current verified-content focus and a strong fixture, respectively.

## Reset for repeat demos

Tap the demo reset control in the header (confirmation), or open a fresh
browser profile / private window. Saved routes, Food Profile, and MOGU Recent
state are stored in `localStorage` only.

## Languages

Japanese is the demo default (judging language). Switch in the header:
**EN** for English, **繁中** for Traditional Chinese — the same flow works in
all three locales. Long English strings are handled without breaking the
layout.

## Route data (for the pitch)

- Course: 奥多摩わさび紀行 (Okutama Wasabi Journey), half-day default
  (~3h10m), toggle to 1-day.
- 4 numbered stops: 奥多摩観光案内所 → 奥多摩わさび田 → 奥多摩そば処 →
  奥多摩駅前 道の駅, connected by 徒歩 / 西東京バス segments.
- Route data is deterministic editorial demo content (not a verified schedule).
  Practical spot details are shown as unverified where no source exists.

## Support actions (distributed model)

Support CTA is a cross-screen pattern, **not a standalone page**:

- **Story** — share / understand the regional meaning / view route, right after
  the `味わうことが、継承になる` beat.
- **Route** — save route / plan visit (writes `My → Saved Routes`).
- **Spot Detail** — venue-matched action: restaurant = reserve / go + regional
  impact; shop = buy online / buy locally; workshop = book experience.

Each action keeps its cultural-succession meaning; unverified actions show
**準備中** (coming soon) and never fake a destination. There is no standalone
応援 (`/support`) bottom-nav destination and no top-level My Route tab; the
Saved Route lives under **My**.

## Save → Saved Routes (My)

Saving the itinerary (Route save, Spot 旅程に追加する, or a Story/Route/Spot
support action) writes the shared `tmm:savedRoutes` localStorage contract. The
saved route appears under **My → Saved Routes**, where it can be reopened or
removed. MOGU Recent (auto-recorded results) and Saved Routes (explicit user
saves) are distinct semantics; a demo reset clears both, plus Food Profile and
Badge state.
