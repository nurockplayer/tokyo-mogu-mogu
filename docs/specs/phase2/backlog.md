# Phase 2 backlog proposal

Acceptance progress: [Phase 2 acceptance table](acceptance.md).

**Order** · S1 Stage C admission and first actionable trip → S2 launch catalog and preference-driven discovery → S3 local saves and sharing → S4 release and operations.

The lead can brief S1 from this document now. Codex performs source research and verification, records it in the existing evidence files and demonstrates the running slice. The lead handles acceptance one stage at a time. Use current main and the connected KiKi Figma for each visible change. Keep candidates local or in access-restricted preview.

## S1 · Admit Stage C content and make one trip actionable

| Field | Brief |
| --- | --- |
| Current | The b01–b13 Stage C records flow into the same browse list as demo fixtures, with no release admission. Some routes lack an arrival station or supported Spot destination. Story and Route can simulate generation. [Current catalog][catalog] · [Flow gaps](gap-audit.md#gaps) |
| Target | Given the existing Stage C records, generate a passing set and a per-record exclusion report. In the running preview, a traveller can find one qualifying route, see where it starts and how long it takes, and tap through to an official destination. |
| Scope | Implement one shared check against the [admission contract](target-architecture.md#data-and-admission) and run it over b01–b13. Start with the existing batch evidence. For the demo path, verify the arrival point and primary action against official sources and record them in the batch evidence file. Use the first record that passes in existing order for the running sample. Keep failing records hidden and leave their data intact. In the local preview use MOGU → Story → Route → Spot. Display the arrival point, ordered stops, on-site estimate, sourced practical status and official action. Use the existing no-photo layout where needed and remove simulated generation on that path. |
| Acceptance on the running product | At 375px, open an admitted journey from MOGU, find its arrival point and on-site estimate, read the maker connection and reach the official access or visitor destination in one tap from Route or Spot. Verify the exact destination and show unconfirmed practical information with its retrieved date in ja/en/zh-TW. A record missing both structured arrival data and supporting access evidence stays hidden from browse and direct links. A missing or expired optional action has guidance and no button. An invalid primary action makes the route unavailable. Record the passing ID, exclusion reasons, running URLs and evidence. If the passing set is empty, demonstrate the empty and hidden states and report the reasons for the missing real path. |
| Dependencies | Codex reads current b01–b13 and their existing evidence, verifies the sample and inspects the connected KiKi Figma for affected screens. Lead accepts the running result. |
| Out of scope | Profile/Explore/Result changes, public cutover, hand-repair of rejected records, local persistence, sharing, live routing and transactions. |

## S2 · Put the launch catalog behind honest discovery

| Field | Brief |
| --- | --- |
| Current → target | Optional Food Profile and five-step Exploration lead to fixed Result cards. MOGU mixes fixtures and research. Keep Food Profile → 食旅を見つけ → Result → Story → Route → Spot and the Dock. Serve the entire passing Stage C set through discovery, MOGU and public links. |
| Scope | D1/D2/D5/D6. Run the gate for all batches with dated Codex verification in the existing evidence files. Use the same admitted projection everywhere. Use optional profile defaults for area/station, time, interests and alcohol theme. Explore lets today's choices override or clear them. Show plain reasons, a true empty state and guidance-only treatment of dietary input. Keep stable IDs and culture/maker stories. Remove fixture percentages, faux history and public legacy fallthrough. |
| Acceptance on the running product | From Food Profile, set an area/station and on-site time, then reach Result and see the exact filters reflected in its reasons. Change area/station, time, interests or alcohol preference and exercise the affected result set against admitted records. A short time limit or incompatible choices yields an empty state. Clear restores broader discovery. Changing dietary answers alone changes only “ask the venue” guidance. Skip opens MOGU. In all three locales, open representative trips from distinct areas and cultures, see an arrival point and reach a supported official access or visitor link. Compare browse and deep links with the report and confirm failed records and demo fixtures remain hidden. |
| Dependencies | S1 admission and pilot path, Codex verification pass and live Figma inspection, lead acceptance. |
| Out of scope | Hand-repair of rejected records, geolocation, route computations, ranking, dietary eligibility, external integrations and new catalog batches. |

## S3 · Make a plan easy to reopen and share

| Field | Brief |
| --- | --- |
| Current → target | Best-effort saves and site-root sharing → truthful same-browser preferences and saves, reset and exact itinerary links. |
| Scope | D3/D6. Keep optional profile editing and store only ordinary preferences. Preserve compatible local IDs, detach legacy auth from the public flow, and provide save, unsave, reset, unavailable and canonical share states. |
| Acceptance on the running product | Save preferences, a journey and a Spot, then reload and reopen them. Remove journey and Spot saves independently. Import an approved legacy route on the same origin and show a withdrawn saved item as unavailable. With writes blocked, retain browsing and show save/reset failure. Reset successfully and reload to defaults. A share opens the same itinerary in a clean browser without traveller data in the URL. Cancel or fail a share and recover via a selectable link. |
| Dependencies | S2 and stable admitted IDs, Codex live Figma inspection, lead acceptance. |
| Out of scope | Accounts, sync, save transfer across origins, offline app and behavioural analytics. |

## S4 · Verify the launch artifact and operating path

| Field | Brief |
| --- | --- |
| Current → target | Prototype smoke and hosted deploy → accepted trilingual release artifact, reported catalog coverage and a demonstrated correction/withdrawal cycle. |
| Scope | Codex refreshes verification evidence and runs automated admission and artifact checks. Inspect emitted assets, aliases, expiry, official handoffs, hosting/privacy and [traveller and safety criteria](first-release.md#admission-maintenance-and-release-criteria). |
| Acceptance on the running product | Lead completes representative admitted trips in every locale and checks blocked persistence, wrong IDs, missing actions, narrow/wide layout, keyboard, screen reader and reduced motion. Compare public contents to the admission report. Demonstrate a data-only correction, urgent withdrawal and rollback without restoring withdrawn material. After promotion by the lead, check the catalog and an admitted deep link at the release URL. |
| Dependencies | S3, automated admission and artifact checks, Codex verification evidence and lead acceptance of the running candidate. |
| Post-launch improvements | Independent editorial review, moderated traveller trials and a review of exclusions to guide future research. |
| Out of scope | Partner portal, live availability, payments, booking integration and new catalog batches. |

[catalog]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/factual-presentation.ts#L673-L678
