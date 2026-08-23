# Current Hackathon Product Contract

Status: current visible Product/runtime contract after PR #279.

This document describes the Figma-complete mobile MVP that exists now. It does
not reconstruct earlier plans.

## Authority

Resolve Product, UI, interaction, and runtime questions in this order:

1. the currently connected KiKi Figma file, inspected directly through the
   local Hopp `figma-bridge`;
2. current merged `main`;
3. this contract as a concise description of that live state.

Tests validate current behavior; they do not define Product behavior. Closed
Issues, git history, pre-#279 UI/IA/flow documents, old Figma exports/maps,
former Netlify references, and legacy components/tests are historical and
non-authoritative.

## Visible Product

The mobile review and demo baseline is 375px. Japanese is the default locale;
English and Traditional Chinese are visible runtime options.

The primary journey is:

```text
Food Profile
→ 食旅を見つけ
→ Result
→ Story
→ Route
→ Spot
```

Current surfaces and routes:

| Surface | Route | Current role |
| --- | --- | --- |
| Welcome | `/` | Entry to the current local prototype |
| Food Profile | `/food-profile` | Progressive nickname and dietary conversation |
| Food Profile edit | `/food-profile/edit` | Separate edit conversation reached from My |
| Home | `/home` | Personalized greeting, current journeys, and exploration entry |
| 食旅を見つけ | `/explore` | Five-step selectable exploration flow with departure search |
| Result | `/explore/result` | Two current live-Figma journey cards |
| Story | `/story/:storyId` | Food-culture story, nearby Spots, nature, and route CTA |
| Route | `/route` | Half/full-day variants, map, timeline, regeneration, share, and save |
| Spot | `/spot/:spotId` | Gallery, practical information, favorite, and prototype action |
| MOGU | `/mogu` | Free browsing of the current food-journey content |
| Favorites | `/my-route` | Locally saved journeys/routes and Spots, including empty state |
| My | `/my` | Food Profile, saved route, and current personal/badge states |

The visible Dock destinations are **食旅を見つけ / モグモグる / お気に入り /
マイ**. Old Home/Discover/MOGU/My or Home/Diagnosis/Support/My Route
descriptions do not define the current Dock.

## Current interaction contract

- Food Profile progressively reveals nickname, dietary questions, summary, and
  completion choices. Nickname and custom-ingredient entry use the current
  dialogs; editing is a separate flow.
- 食旅を見つけ has five steps. Selection, departure-search empty/typed states,
  progress, back/next behavior, and the current result transition are visible
  Product states.
- Result shows the two current live-Figma journey-card presentation fixtures.
  The visible `96` / `91` indicators are fixture copy only: they are not
  calculated scores, recommendation accuracy, confidence, dietary
  compatibility, or a food-safety guarantee. There is no ranked Top-3 Product
  contract.
- Story includes the current chapter reveal, nearby and nature Spot groups, and
  route-generation transition.
- Route includes the current map/timeline content, half/full-day states,
  regeneration overlay, share affordance, and saved state.
- Spot includes the current gallery, factual/practical-information layout,
  favorite state, external-action prototype feedback, and bottom Dock.
- Home journey bookmarks, route saves, Spot favorites, Favorites grouping,
  profile state, and locale choice persist locally where current `main`
  implements persistence.
- Motion, progressive reveal, tactile feedback, nested scrolling, sticky
  actions, and transitions are part of the visible contract.

## Demo and durable Product boundaries

The durable Product scope is Tokyo-wide, multi-region × multi-food-culture, for
Japanese and international travelers. The 2026-08-23 deterministic demo may
focus on Okutama × Tokyo Wasabi; that demo content does not narrow shared
Product, data, recommendation, routing, persistence, or i18n contracts.

The current prototype is accountless and local. It does not require login,
geolocation, payments, production booking, server-side profiles, or live route
generation.

Dietary input informs recommendations only and is not a food-safety guarantee.

The five-candidate deterministic helper is dormant/supporting implementation
state, not the active Result contract. Its future production taxonomy,
selection, reasons, and score semantics are deferred to Issues #206 and #207;
do not infer them from the current fixtures.

## Evidence boundary

Source/provenance records, Open Data records, licenses, attribution, research,
fieldwork evidence, and factual source material remain valid evidence. They do
not override current visible Product/UI behavior.

Displayed venue facts must retain honest provenance and verification caveats.
Hours, prices, reservations, access, availability, and contact details may
change and require source verification. Never convert editorial/demo content
or a research candidate into a verified fact without evidence.

In particular, the Tokyo Wasabi demo fixture and its seed records remain
`needs_confirmation`; the fixture is not a verified or visitable claim.

## Historical material

All pre-#279 UI/IA/flow documents are historical unless current live Figma,
current `main`, or this contract explicitly adopts their content. This
includes S0-S9 maps, old Discover/Recent/Saved semantics, Top-3 descriptions,
tutorial choreography, standalone Support IA, Netlify selectors/timing, and
old Figma implementation/reconciliation maps.

Historical files may remain for evidence. Do not rewrite or restore them to
resolve a current implementation question.

## Validation contract

The current browser gate is `e2e/current-mvp-smoke.spec.ts`. It checks the
current 375px MVP surfaces and journey; it is not a Product specification.
Focused current regressions use `playwright.regressions.config.ts` and do not
run as the canonical merge gate. Obsolete suites may remain only as clearly
isolated historical artifacts; the superseded Issue #276 Netlify suite was
removed during the Issue #297 audit.

Before a visible Product change is complete:

```sh
pnpm typecheck
pnpm lint
pnpm test
pnpm build
pnpm exec playwright test e2e/current-mvp-smoke.spec.ts
```
