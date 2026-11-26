# First public release proposal

**繁體中文摘要**　建議先為人在東京、能安排半天自由行的旅客，推出兩條可實際規劃造訪的多摩飲食文化小旅行。首選調布深大寺蕎麥與青梅沢井清酒，待編輯確認來源、路線、官方連結與素材權利後，才以日文、英文及繁體中文發布。旅客可直接探索，了解地方與製作者的故事，查看出發前須確認的資訊，並在同一瀏覽器儲存或分享行程。營業、預約、食材與交叉接觸風險，請向店家或營運方確認。

## Who it serves and where

Start with independent domestic and inbound Tokyo visitors who have a free half-day and can travel by public transport. A traveller should be able to answer “Why is this food from here, who carries it on, and what could I actually do this afternoon?” A short story that connects the grower or maker to a walk and a concrete stop is the reason to open MOGU. The app hands off directions and operational details to official sources. Success is the quality of a small set of trips people can act on.

| Proposed launch itinerary | Traveller value | What an editor must clear |
| --- | --- | --- |
| **Chofu, Jindaiji buckwheat and soba** | Follow a crop through temple-area noodles and sweets. Start with this non-alcohol itinerary. | Confirm a usable arrival point and stop sequence, at least one official visitor destination, and sourced maker/shop copy. The record currently leaves station/access blank. [Stage C record][chofu] |
| **Ome, Sawai sake and Mitake heritage** | See how a brewery and its valley shape a food culture. Label alcohol up front and make sightseeing independent of consuming it. | Confirm the access and official visitor handoff. A tour or purchase may require separate operator steps. The migrated source records are pending. [Sawai story and variants][ome] · [Source statuses][ome-sources] |

These are two launch candidates in Tama. Both must pass editorial admission before launch. If one fails, hold release and ask the Owner to approve a replacement or change scope. Wards, islands, other Tama journeys and the Okutama demos stay outside this launch scope. The data model supports Tokyo-wide expansion.

## The traveller's path

| Moment | Release behaviour |
| --- | --- |
| Arrive | Open the catalog or a shared itinerary directly. Japanese is the default. A visible language control works on entry and shared destinations. |
| Choose | Browse in editorial order, with optional municipality and time-at-destination filters. All means all published entries. Selected filters intersect; a time limit uses the authored on-site estimate, excluding missing estimates even when the area matches. Show the actual reason beside each result, such as the chosen area and its estimated on-site time. On zero matches, show which filters are active and let the traveller clear them. |
| Understand | Read a compact culture/maker story with source context, then open its published half-day plan. |
| Plan and act | See a starting point, ordered stops, an on-site estimate and what to check. At an actionable Spot open labelled official information or a reviewed operator action. If one stop's action is unavailable, identify the limitation and offer the route's remaining options. |
| Return or share | Save a journey or Spot locally, reopen current content and remove individual saves. Share a canonical itinerary link with a clean browser. Removed content gets a localized unavailable page and a link back to the catalog. |

Stories, maker identities, routes, images and source-backed claims are edited snapshots. Filters, empty results, selected language, saved state and recheck-date display respond at runtime. Third-party operators control the schedules, directions and transactions on their sites.

## What the service can say

| Topic | What visitors see | Claims excluded from release |
| --- | --- | --- |
| Discovery and dietary | Plain reasons tied to selected filters. Treat dietary suitability as unknown; advise visitors to ask the venue about ingredients, cross-contact and religious preparation. Keep browsing usable without a Food Profile. | No restaurant ranking, match percentage, allergy-safe, halal/kosher/vegan suitability label, or dietary eligibility inference. |
| Freshness and access | Stable facts carry their source. Practical claims distinguish retrieved from actually confirmed, show the relevant date and use JST for recheck dates. On-site time is an editorial estimate. Ask visitors to check operator information before departure. Show stale or conflicting critical facts as unavailable and withdraw a route if its primary action is no longer usable. | No “open now,” confirmed stock, guaranteed connection, calculated travel time, verified accessibility, or live-availability claim without supporting evidence. |
| Visit, purchase and booking | “Check official visitor information” or “Continue to operator,” with the destination named. The operator handles any reservation or purchase and provides any confirmation. A missing/stale destination has explanatory text and no action button. | No implied endorsement, direct purchase, booking receipt or implication that a click completed a transaction. |
| Local saves | A successful write saves to this browser and site until removal, reset or browser clearing. If storage is blocked, tell the traveller and keep browsing available. Keep explicit saves and locale. Let the traveller clear all MOGU data on this origin. | No account, sync, cross-origin migration, visit history or offline guarantee. No new dietary, nickname or precise-location data. |

## Editorial operations and release criteria

The Owner names a managing editor and correction contact. The editor verifies claim sources and context, visits or checks each proposed route and its visitor destinations, records separate evidence for image and text rights and any claimed partnership, and submits a data-only change. A second reader checks meaning and action labels in ja/en/zh-TW. Preserve the Japanese venue name or address where it helps a traveller use an external site. Before admission and every 30 days thereafter, recheck practical details and action destinations. A material correction triggers an immediate update or withdrawal with source history retained. Publish a project-owned reporting contact in all three languages.

- **Traveller success.** In moderated trials, at least 4 of 5 first-time participants, covering all three languages, go from entry or share link to a suitable plan, explain the maker connection and find an official next action within three minutes without help. Afterward ask whether they would use it for another free half-day and why. Report counts and observed failure modes. Clicks measure handoffs only.
- **Safety and readiness.** Every published route has a sourced arrival point, usable stop sequence and checked primary destination. All published material has the required rights and review receipts. In all three languages, test fresh, stale, missing, blocked-storage and withdrawn cases. Trial participants must understand the operator and dietary boundaries. Include 375px, narrow/wide, keyboard, screen reader and reduced-motion checks. Require green release validation, a tested withdrawal/rollback path and zero unresolved P0/P1 defects before launch.

## Product decisions for the Owner

The [2026-10-15 UTC decision packet][october] is input. [The audit](gap-audit.md) checks its four decisions against current main. The lead owns the technical disposition, with [architecture options](target-architecture.md) and [stages](backlog.md) for follow-through.

| Decision | Options | Recommendation and rationale | Current-main evidence and transition |
| --- | --- | --- | --- |
| **D1. Discovery promise** | Curated browse only, explicit filtering, or profile-based ranking. | Curated browse with area/on-site time filters. Two publishable slices support real reasons and understandable empty states. | [Result wiring][result] still supplies neither current answers nor catalog data. Replace fixed Result and stop automatic Recent writes. |
| **D2. Publishable content** | Admit a named release set, or hold all content in prototype pending approval. | Admit the named set once an editor, recheck schedule, correction contact, evidence and asset rights are in place. | [Stage C authoring][records] feeds browse; pending flags and [#438][migration] show provenance retention. Keep original statuses and add explicit release admission. |
| **D3. Persistence** | Same-browser saves, account sync, or no saves. | Same-browser saves with explicit outcomes, removal and reset. A trip can be planned and reopened without an account. | [Local state contract][storage] describes best-effort writes and no sync. Preserve compatible approved IDs on the same origin. |
| **D4. Visit and booking** | Reviewed outbound links, integrated booking/purchase, or story-only. | Reviewed links with a required next step per route. The operator owns availability, pricing and completion. | [Spot resolver][links] now accepts record sources and can still have no destination. Replace toast-only failure with a visible state. |
| **D5. Launch scope** | Two Tama journeys, Okutama-only demo, or wide Stage C catalog. | Chofu soba and Ome sake/heritage, conditional on admission. Test a different municipality and an alcohol-independent itinerary with bounded editorial load. | [Chofu record][chofu] and [Ome record][ome] supply route and story starting points. The [catalog][catalog] requires an explicit release subset. |
| **D6. Food Profile and safety** | Collect preference-only answers, keep dietary input with a safety contract, or retire collection for launch. | Retire profile entry and use contextual dietary guidance. Current content cannot support ingredient, cross-contact or religious-suitability filters. | [Profile and recommendation boundaries][profile] show unused dietary answers, unsynced storage and dormant selection logic. Stop collection and include legacy profile data in reset. |

[october]: https://github.com/nurockplayer/tokyo-mogu-mogu/issues/404#issuecomment-6185124544
[chofu]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/journey-records/b03-chofu-jindaiji-soba.ts#L4-L39
[ome]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/journey-records/ome.ts#L9-L23
[ome-sources]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/journey-records/ome.ts#L98-L163
[result]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/ReferenceApp.tsx#L289-L299
[records]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/journey-records.md#L8-L20
[migration]: https://github.com/nurockplayer/tokyo-mogu-mogu/pull/438
[storage]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/specs/product/hackathon-product-contract.md#L180-L243
[links]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/spot-official-link.ts#L27-L57
[catalog]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/factual-presentation.ts#L674-L678
[profile]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/specs/product/hackathon-product-contract.md#L208-L262
