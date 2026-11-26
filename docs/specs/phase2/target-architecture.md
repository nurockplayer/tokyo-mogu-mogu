# Target architecture proposal

Serve a localized static React app and an approved editorial snapshot over the existing Cloudflare Pages delivery model. Run filtering, rendering and local saves in the browser. Editors publish through the repository. The traveller follows approved external links for live information and transactions. This reuses the [current entry, routing and adapter](gap-audit.md) and supports the [two-journey release](first-release.md).

## Data and publication

| Record or boundary | Minimum contract |
| --- | --- |
| Place and culture | Stable municipality, culture, maker and Spot IDs. A public maker credit references its source. A single maker or Spot can recur across itineraries. Reuse current IDs and keep administrative geography distinct from culture. |
| Story and itinerary | Reuse `JourneyRecord` for localized chapters and existing journey/story/route IDs. A variant has a starting point, ordered Spot IDs, editable on-site estimate and sourced access note. Launch needs one approved half-day variant per journey. |
| Facts | Retain fact paths, source IDs, source type, original status, retrieval and actual confirmation dates. Add editorial recheck deadlines to practical claims and external actions. Store conflicting and unknown states explicitly. Retrieval, editorial admission and confirmation are separate fields. |
| Actions and assets | An action identifies its Spot, visitor intent, official destination, approved HTTPS host, source and latest review. A media reference needs recorded rights holder, permitted scope, attribution and evidence. Use cleared app chrome and the existing no-photo treatment where no approved photo can ship. |
| Public release manifest | Versioned list of admitted record IDs and editorial revisions with review evidence and the selected primary action. Generate the shipped catalog and URL lookup from this set. Build rejects missing references, duplicate IDs, absent translations, unapproved assets and invalid primary destinations. Keep private rights receipts and contact details in the editorial system and ship public attribution only. |

Editors start from the existing data records, update structured data and evidence in a repository PR, and get a second editorial check. Lead owns the publish step. A new culture, municipality, maker or route needs data and translations with zero changes to screen code. Keep the TypeScript data shape while it serves the initial team. Use a CMS only if the team cannot maintain this workflow.

## Runtime, failure and operations

| Concern | Proposed behaviour |
| --- | --- |
| Browser and service boundary | Keep Vite/React, routing and presentation components. Adapt approved records once for Result, MOGU, Story, Route and Spot. Resolve release links and saves against the same catalog. Route/story aliases may resolve to the same approved identity. Unknown, demo-only or withdrawn IDs render a localized unavailable state. Cover legacy routes and direct assets in the release build check. |
| Freshness and caching | Serve versioned static assets with long immutable caching and revalidate the HTML entry so updates pick up a new snapshot. Use the JST recheck date on initial load and on return to a tab. An expired optional action becomes explanatory text. A route with an expired primary action is excluded from discovery and gives a check/unavailable state on direct entry. Editors can withdraw a record or action with a new deploy. |
| External handoffs | Open a reviewed HTTPS destination, including operator or official access information, using safe link attributes and no MOGU profile/query data. A browser cannot prove an external visit or sale. Treat destination checks as editorial review and avoid an in-app booking API or live transit dependency. |
| Browser storage | Version a local collection of approved journey/Spot IDs, plus the locale preference. Keep temporary filters in memory. On the same origin, read legacy bookmarks and map approved saved-route IDs to journey IDs. Keep missing references removable as unavailable. Ignore legacy profile and Recent data for rendering. Reset clears both new state and MOGU legacy keys. Reset and save report storage failure, and reset never targets unrelated site data. A different origin starts with empty saves. |
| Privacy and service integrity | No public write API, sign-in, new personal profile or user-generated content at launch. Serve HTTPS and review security headers and outbound URLs. Reduce browser dependencies and public route surface. A project-owned correction link may suggest the public record ID. Keep full URLs, form text, profiles and persistent visitor identifiers out of any service metrics. |
| Monitoring and recovery | Named operator checks deployment and a probe of the catalog plus one admitted deep link. Provide localized crash/unavailable recovery. Track editorial recheck dates and correction response. Use aggregate service health and moderated trials at launch and keep behavioural tracking deferred. |
| Release and rollback | Validate the built artifact for approved content and emitted assets and for absence of demo, legacy and research entry points. Run product smoke and release cases on the candidate build before any promotion. Keep an approved prior release for rollback. A previous build may contain a withdrawn fact or asset, so reapply withdrawals or publish a corrected build. Verify host cache and access behaviour of old deployment URLs during the withdrawal drill. |

Monthly cost is the static host and staff time for trilingual review, rechecks and corrections. The operator must confirm hosting limits, access to rollback/cache controls and who owns the domain before launch. Keep candidate builds local or in a verified access-restricted environment until approval. Confirm publishing rules before pushing a candidate intended to stay private. Existing main deploys and public preview URLs are unsuitable for material awaiting approval.

## Engineering decisions for the lead

| Question | Options and recommendation | Migration effect |
| --- | --- | --- |
| Where is content authority? | Reuse repository records with a release manifest. A CMS or API would add ownership and operational work before the first content cycle. [Current adapter][adapter] | Keep sources and IDs. Decouple public admission and build output from the prototype catalog and rights tooling. |
| Keep the current shell or rebuild? | Keep the Vite shell, localized layout and stable identity resolver. Move the public branch to approved data first. [Current router][router] | Retain approved direct links. Remove public reachability and emitted assets for historical surfaces before launch. |
| Where do backups and live facts live? | Keep versioned editorial snapshots with explicit expiry and operator handoffs. Defer platform accounts and real-time APIs. [Verification semantics][verification] | Layer recheck deadlines above existing source status. Preserve timestamps and rights during corrections and rollbacks. |

## Questions for Astra if the Owner approves consultation

1. Do two independently visitable half-day trips justify a public release, and which current interactions are worth keeping for that traveller?
2. Can the existing data adapter and an editorial manifest support trilingual corrections without engineering help? Where would editor-owned authority break?
3. Are area/on-site time filters and contextual dietary guidance defensible with the evidence? Which failure would require changing the discovery or safety promise?
4. What trip failure would justify earlier accounts or a live integration? Can static publishing and provider links handle missing information, stale data and urgent withdrawals without those systems?

Consultation was deferred under the [lead's #404 decision][lead]. Product scope and public claims require Owner approval. The lead owns technical choices. Rights, operator commitments and actual visit facts require evidence from their respective authorities.

[adapter]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/journey-record.ts#L89-L154
[router]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/app/AppRouter.tsx#L81-L147
[verification]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/lib/verification.ts#L13-L25
[lead]: https://github.com/nurockplayer/tokyo-mogu-mogu/issues/404#issuecomment-7198014646
