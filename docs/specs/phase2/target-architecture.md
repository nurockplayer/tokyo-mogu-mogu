# Target architecture proposal

Serve a localized static React app and the admitted Stage C catalog over the existing Cloudflare Pages delivery model. Compute discovery, reasons and local saves in the browser. Use the [current router and record adapter](gap-audit.md) and migrate in [four stages](backlog.md).

## Data and admission

| Boundary | Minimum contract |
| --- | --- |
| Candidate catalog | Feed the b01–b13 Stage C lists into one build-time admission check. Keep municipality, culture, maker, journey, route and Spot identity independent. Retain stable IDs and the ability to add Tokyo geography through data. |
| Story and route | Reuse `JourneyRecord`. Require ja/en/zh-TW story and route copy, a source mapping with a fetch date for each story claim, and at least one route variant with a sourced arrival point, on-site estimate and resolvable ordered stops. Use the arrival station or an official transit arrival point such as a ferry terminal. A missing arrival point, unsupported estimate or unresolved stop disqualifies that variant. |
| Primary Spot and handoff | Use evidenced primary roles where available. For records without roles, use the first ordered stop with an evidenced official visitor action as the primary Spot. Require at least one valid destination for every primary Spot. A destination must be HTTPS, traceable to a source and supported by a dated check that it resolves to the intended official operator, tourism or transport page. Prefer an official arrival map or access link where the record supports one. A successful fetch alone cannot establish authority, rights or practical facts. |
| Facts and media | Keep source IDs, source type, retrieved date, actual confirmation date and original verification status separate. Render dated unconfirmed facts as unconfirmed. Decline unsupported facts and actions. Exclude media whose rights and public-use scope lack evidence, including in app chrome and emitted assets. Use the no-photo layout or omit a record when it cannot render with cleared assets. |
| Admission output | Produce a versioned passing catalog and a report of excluded IDs, reason codes and admitted coverage by municipality and culture. Include only passing variants. This output supplies browse, Result, routing and saves. A failed record stays hidden and has no manual promotion path. If no records pass, the candidate renders an honest empty state and the release check fails. |

Codex verifies sources and appends structured, dated observations in `docs/data-evidence/regions/<batch>/verification.md`, keyed by record and variant or Spot. A blank arrival field can use an explicit arrival point observed in the route's official access evidence. Record its source URL, fetch date and the stop it serves. Use the same extraction rule for every record and avoid guessing an arrival point from nearby geography. Keep unsupported records excluded without editing them to pass. Lead accepts the running result.

## Runtime, failure and operations

| Concern | Proposed behaviour |
| --- | --- |
| Discover and explain | Keep the optional Food Profile, Explore flow and Dock. Profile defaults seed a trip query. Explore overrides or clears them. Filter the admitted catalog using stable area/station and culture IDs, supported interest tags, authored minutes and evidence-backed alcohol-theme values. Use explicit match rules and render reasons from the same evaluated inputs. Keep browse independent, preserve catalog order and return a localized empty state. Dietary guidance is a separate path with no input to selection or reasons. |
| Public routes | Resolve MOGU, Result, Story, Route, Spot and shared URLs from one admitted catalog. Keep stable approved URL identities. Reject hidden IDs and prevent fallthrough to older fixtures and legacy routes. Keep public profile navigation free of legacy auth. |
| Freshness and caching | Version static assets and revalidate HTML so a reload sees the latest snapshot. Compare action recheck dates in JST on page entry or revisit. Use 30 calendar days after the last supported link check as the initial recheck interval. Optional stale links show guidance. A missing or expired primary action makes the route unavailable in results and on direct entry. Refresh evidence or withdraw via a data change and rebuild. |
| External links | Open reviewed HTTPS destinations with safe link attributes and no profile or trip query data. Keep maps, current hours, reservations and payment on the operator or service's site. Record link reachability separately from any fact about the visit. |
| Browser storage | Version ordinary Food Profile defaults, locale and saved journey/Spot IDs. Keep trip overrides and dietary answers in session memory. On the same origin, map legacy approved save IDs, expose withdrawn saves as removable and let reset clear MOGU state including legacy profile and Recent keys. Report unsuccessful writes and resets. A different origin starts with empty state. |
| Privacy and recovery | Use HTTPS, reviewed headers and no public write API. Avoid precise geolocation, personal data in shared URLs, behavioural tracking and persistent visitor IDs. Provide localized failure states and an existing project contact route for corrections. |
| Release and rollback | Verify the built routes and assets, record admission counts and check a catalog plus an admitted deep link on the deployed build. Rehearse a data-only correction and withdrawal. During rollback preserve withdrawals or deploy a corrected artifact. Check that old public URLs and caches do not expose withdrawn content. |

Confirm existing hosting access and cache controls in S4. Keep implementation candidates local or in access-restricted preview until the lead accepts the release artifact. Independent editorial review and traveller trials are post-launch improvements.

## Engineering decisions for the lead

| Question | Options and recommendation | Migration effect |
| --- | --- | --- |
| What publishes a record? | Use an evidence-driven projection of the Stage C lists. Hand curation and a CMS add ongoing selection work. [Current adapter][adapter] | Keep existing sources and IDs. Separate the research catalog from generated release output. |
| Where does discovery run? | Use pure browser filtering over the admitted artifact. A search service or ranking API adds a dependency and cannot supply missing facts. [Current router][router] | Reuse the shell and URL resolver. Retire Result fixtures and public legacy entry points. |
| How do facts stay current? | Use versioned snapshots, dated evidence checks and official handoffs. Live APIs require stronger operational contracts. [Verification semantics][verification] | Preserve source statuses through rechecks, corrections and rollback. |

## Questions for the separate #404 Astra consultation

1. Does the admission rule identify journeys a traveller can actually act on, and which kinds of false positives or exclusions are likely?
2. Can the current record model support trilingual evidence maintenance and fast corrections as the catalog grows?
3. Which preference and dietary failure cases would change the public promise?
4. What operational failure would justify an account, live integration or CMS earlier than planned?

The separate consultation can inform later revisions. This plan proceeds from the lead's direction and acceptance on the running product.

[adapter]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/journey-record.ts#L89-L154
[router]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/app/AppRouter.tsx#L81-L147
[verification]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/lib/verification.ts#L13-L25
