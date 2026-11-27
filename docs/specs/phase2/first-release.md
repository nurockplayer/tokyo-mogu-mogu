# First public release proposal

**繁體中文摘要**　首版從涵蓋東京都 39 個非區部市町村的 Stage C 研究目錄中，自動篩出資料完整、來源可追溯，且有抵達車站（或其他官方交通抵達點）與官方造訪連結的行程。旅客可略過飲食偏好設定直接瀏覽，也可依所在或預計前往的地區、可用時間、飲食文化興趣及酒精主題偏好找行程。日文、英文和繁體中文都會說明推薦理由、未確認資訊及查閱日期，並提供官方交通或店家資訊、同瀏覽器收藏與分享。飲食限制只提示向店家確認，與篩選及安全判斷無關。

## Who it serves and where

Serve domestic and inbound Tokyo travellers deciding what to do near where they are or where they are heading today. MOGU answers three questions together. What food culture belongs to this place, who carries it on, and how can I spend my available time getting to know it? Give the traveller a short maker story, an itinerary sized to their time at the destination, and one tap to an official access map, directions or visitor page. Map and operator services handle live navigation and operational information.

Launch all Stage C records that pass admission, scanning b01–b13 across the research base of 39 municipalities outside the wards, including Tama cities, Nishitama and the islands. Show only places and food cultures with admitted journeys. The 39 municipalities describe research coverage. The public scope is the computed passing set. Preserve a Tokyo-wide data model that can add the wards and more food cultures through data. Keep the Okutama demo fixtures outside the release catalog. [Stage C authoring][records] · [Municipalities][municipalities]

## The traveller's path

| Moment | Release behaviour |
| --- | --- |
| Arrive | Keep Food Profile → 食旅を見つけ → Result → Story → Route → Spot and the 食旅を見つけ / モグモグる / お気に入り / マイ Dock. The optional Food Profile can be skipped directly into MOGU browse. Shared itineraries open directly. Japanese is the default, with language switching available at entry and on shared destinations. |
| Set preferences | Food Profile can remember a starting area or arrival station, typical time available, food-culture or taste interests, and whether to include alcohol-themed trips. Exploration starts with those defaults and lets the traveller override or clear them for today. Selecting a station means “look for trips starting here” and requires no location permission. |
| Find a trip | Area/station, time, optional interests and alcohol settings filter the admitted catalog. Apply each active filter. Use catalog area or station labels, authored on-site minutes and evidence-backed culture or taste tags. “Skip alcohol-themed trips” includes only records classified as non-alcohol-themed. Exclude unknown values for a selected filter. Within an interest selection, any selected tag can match. Keep catalog order and show each result's actual filter reasons. On zero results, name the active filters and let the traveller clear them or browse. |
| Understand and act | Read the local culture and maker story. Open the published itinerary to see the arrival point, stop order and estimated on-site time. Tap an official map, access or visitor link from the plan or primary Spot as supported by the record. Optional stops with unavailable actions explain what is missing. |
| Return or share | Save preferences, journeys or Spots in this browser. Reopen current content, remove saves individually or reset local MOGU data. Share a canonical itinerary link. Withdrawn content opens a localized unavailable page with a link back to the catalog. |

Stories, maker identities, route order, estimates, images and sourced claims are edited snapshots. The browser computes Result, reasons and empty states from the current inputs and admission snapshot. Service providers control live schedules, navigation and transactions on their own sites.

## What the service can say

| Topic | What visitors see | Claims excluded from release |
| --- | --- | --- |
| Discovery and dietary | Reasons tied to stated area, on-site time, interests or alcohol-theme preference. Optional dietary answers trigger “ask the venue” guidance about ingredients, cross-contact and religious preparation. | No restaurant ranking, match percentage, food-safety inference or dietary eligibility filter. Excluding alcohol-themed trips gives no assurance about what an individual dish contains. |
| Freshness and access | Practical facts are labelled unconfirmed with a retrieved date unless actual confirmation is evidenced. Label on-site time as an estimate and ask travellers to check official information before departure. Expired or conflicting details show their limitation. A missing or expired primary destination takes the itinerary out of discovery. | No “open now,” stock, guaranteed connections, computed travel times or live-availability claims. |
| Visit and transactions | Name the destination and label the link as official access, visitor information or a specific operator handoff supported by evidence. The operator completes any booking or purchase. | No implied endorsement, direct booking or purchase, transaction receipt or partner commitment. |
| Local data | Successful saves stay in this browser and site until removal, reset or browser clearing. Show blocked writes and keep browsing available. Retain ordinary preferences and locale on this origin. Dietary answers only inform guidance during the session. | No account, sync, visit history, precise-location storage or guarantee of offline use. |

## Admission, maintenance and release criteria

Each published journey needs traceable story claims, source fetch dates, a sourced arrival station or other official transit arrival point, a coherent time-boxed stop sequence and at least one valid official destination for each primary Spot. See the [gate contract](target-architecture.md#data-and-admission). Codex verifies sources using the existing evidence files, records what was checked and runs automated admission. Failed records stay hidden with a reason in the admission report. A web fetch does not confirm a practical claim, clear asset rights or establish partner consent. Show unconfirmed facts with their retrieval date. Omit assets lacking rights evidence and use the no-photo layout.

For updates and corrections, record the source or withdrawal in the repository and rebuild the admission report. Lead accepts the running candidate. The launch checks exercise trips from distinct municipalities and food cultures in ja/en/zh-TW. Starting from a stated area and time, a traveller can see why a result appeared, find the arrival point and reach an official destination. Check that dietary answers leave Result unchanged, hidden records stay hidden, and the candidate handles stale actions, storage failures and withdrawn links. Use 375px, narrow/wide, keyboard, screen reader and reduced motion checks. Require green release validation, a demonstrated withdrawal and no unresolved P0/P1 defects.

Independent editorial review and moderated traveller trials are recommended after launch. For a future trial, ask first-time travellers to find a plan for today, explain its maker connection and reach official directions unaided. Record where they abandon the flow. Service health and handoff checks at launch do not measure completed visits.

## Product decision table

The [2026-10-15 UTC packet][october] supplied D1–D4. [The audit](gap-audit.md) rechecks them on current main. The lead's 2026-11-27 03:05 JST review sets the scope, admission and preference direction below. The technical details remain proposals for lead acceptance.

| Decision | Options | Proposed release behaviour and evidence |
| --- | --- | --- |
| **D1. Discovery promise** | Catalog only, preference-driven filtering, profile-based ranking. | Keep the current journey. Use optional Food Profile defaults and trip overrides to filter, explain results and show an empty state. [Result wiring][result] currently supplies neither answers nor catalog data. |
| **D2. Publishable content** | Hand-select records, apply automated admission, or keep the catalog prototype-only. | Evaluate existing Stage C records against evidence and practical-route checks. Hide each failure and preserve original source status. [Stage C authoring][records] and [#438][migration] establish provenance and presentation, while public admission needs its own gate. |
| **D3. Persistence** | Same-browser saves/preferences, account sync, or no saves. | Keep local saves, ordinary preference defaults and locale with explicit outcomes and reset. [Local state contract][storage] describes best-effort writes and no sync. Preserve compatible IDs and avoid persisting dietary answers. |
| **D4. Visit and booking** | Official handoffs, integrated booking/purchase, or story-only. | Require evidenced official links for primary Spots. Prefer one-tap official access or a precise operator handoff. [Spot resolver][links] can still yield no destination and cannot establish a completed action. |
| **D5. Launch scope** | Two curated trips, every Stage C record, or every Stage C record that passes admission. | Publish the computed passing set across the b01–b13 research base. Report coverage by municipality and culture. Keep the domain Tokyo-wide. The [mixed catalog][catalog] still includes demo data and has no release admission boundary. |
| **D6. Food Profile and safety** | Remove the profile, use it for preference defaults and dietary guidance, or infer dietary compatibility. | Retain optional onboarding and editing. Ordinary preferences drive discovery. Dietary answers affect guidance only and are not retained. [Profile and recommendation boundaries][profile] show why existing answers and fixture scores cannot establish suitability. |

[october]: https://github.com/nurockplayer/tokyo-mogu-mogu/issues/404#issuecomment-6185124544
[result]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/ReferenceApp.tsx#L289-L299
[records]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/journey-records.md#L8-L20
[municipalities]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/municipalities.ts#L1-L46
[migration]: https://github.com/nurockplayer/tokyo-mogu-mogu/pull/438
[storage]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/specs/product/hackathon-product-contract.md#L180-L243
[links]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/spot-official-link.ts#L27-L57
[catalog]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/factual-presentation.ts#L674-L678
[profile]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/specs/product/hackathon-product-contract.md#L208-L262
