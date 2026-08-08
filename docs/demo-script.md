# Demo Script (60–90 seconds)

Hackathon walkthrough for the S0–S8 journey (Issue #41 + approved UI).
Replaces the legacy Pokédex / check-in / next-collectible demo.

## Demo constraints

- **Accountless**: no sign-in is required at any step. Google Auth remains as
  supplementary infrastructure but is not part of the main pitch journey.
- **No geolocation**: the walkthrough does not require real geolocation, a fake
  geolocation override, or a `?at=place:` demo URL.
- **Deterministic**: the diagnosis deterministically recommends 東京わさび; the
  model route is a fixed editorial fixture. The flow is replayable from a reset.

## Steps (target: ≤90 seconds)

1. **S0 Landing** — hero + tagline + 3-step value explanation
   (`好みを診断 → 物語を知る → 巡って応援`) + `食文化の旅をはじめる` CTA. (5 s)
2. **S1 Dietary Restrictions** — enter dietary restrictions (multi-select) or
   skip. Trust copy states the input is used for recommendations only. (5 s)
3. **S2 Diagnosis** — answer 5 preference questions (taste, experience type,
   base area + travel time, interests, half-day/1-day) with progress + back.
   (20 s)
4. **S3 Result** — 「東京わさび」result card with match-reason tags derived
   from the answers and the dietary-consideration state. (10 s)
5. **S4 Story** — full editorial story: why 奥多摩 wasabi, the maker, the craft,
   and the succession challenge → `味わうことが、継承になる`. (15 s)
6. **S5 Model Route** — half-day / 1-day 奥多摩わさび route: numbered stops,
   mobility segments (train / bus / walk), map pins matching the timeline. (10 s)
7. **S6 Spot Detail** — representative spot: address, access, hours, price,
   reservation, and practical warnings where source data exists. (5 s)
8. **S7 Support Actions** — 買う / 訪れる / 予約する / 寄付する / 共有する /
   保存する, each explaining what the action means for cultural succession. (10 s)
9. **S8 My Route** — save the route locally and confirm it appears in
   `マイルート`; reload restores it. (5 s)

Total walkthrough: ~90 s of presenter time. S9 Badge Collection is an optional
stretch reveal after the core flow.

## Reset for repeat demos

Tap the demo reset control in the header (confirmation), or open a fresh
browser profile / private window. Saved routes and other local demo state are
stored in `localStorage` only.

## Languages

Japanese is the demo default (judging language). Switch in the header:
**EN** for English, **繁中** for Traditional Chinese — the same S0–S8 flow
works in all three locales. Long English strings are handled without breaking
the layout.

## S5 route data (for the pitch)

- Course: 奥多摩わさび紀行 (Okutama Wasabi Journey), half-day default
  (~3h10m), toggle to 1-day.
- 4 numbered stops: 奥多摩観光案内所 → 奥多摩わさび田 → 奥多摩そば処 →
  奥多摩駅前 道の駅, connected by 徒歩 / 西東京バス segments.
- Route data is deterministic editorial demo content (not a verified schedule).
  Practical spot details are shown as unverified where no source exists.

## Save → My Route

Saving the itinerary (S5 CTA or S7 保存する) writes the shared
`tmm:savedRoutes` localStorage contract. The saved route then appears in
**マイルート** (S8), where it can be reopened or removed. A demo reset clears
both collection and saved-route state.
