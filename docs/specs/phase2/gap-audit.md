# Phase 2 production gap audit

Source baseline on 2026-11-27 JST was [`origin/main` at `926e6868411c614e009f8e828da1371bc779636a`][main]. [#403][parent] sets the mission, [#404][audit] defines the audit, and [#388's final handoff][phase1] closes Phase 1. [PR #439][toolchain] was open for the pnpm upgrade and is outside discovery. The [current Product contract][contract] describes runtime. The [hackathon roadmap][roadmap] records historical intent.

The [main CI run][ci] passed Quality Gates and Merge Gate and skipped the browser job for this change. The Cloudflare check reported a successful [deployment][deploy]. A read-only Japanese browser inspection opened Welcome, Result (96% and 91%), and the Jindaiji Story by direct URL on that deployment. The rest of the audit is source-derived. Inspect the connected KiKi Figma through the local bridge before changing any visible surface. [Design authority][design]

## Current flow and data

Vite serves a React SPA. `AppRouter` resolves the current journey URL and mounts `ReferenceApp` for the visible prototype, with older routes still registered. Welcome → Food Profile → Home → Exploration → Result uses screen state and fixed results. MOGU separately browses the merged fixture + record catalog. Both paths reach Story → authored Route → Spot. Stage C records flow through one presentation adapter; explicit saves and locale are stored in the browser. [Entry][entry] · [Router][router] · [Catalog][catalog] · [Storage contract][storage]

## Gaps

Classifications use #404's table. Actions refer to [the ordered stages](backlog.md).

| Subsystem or flow | Current implementation | Classification | Gap and proposed action | Current-main evidence |
| --- | --- | --- | --- | --- |
| Welcome, Home, Food Profile | Start opens a nickname/dietary conversation with skip and browse choices. Home uses demo cards for past journeys. | KEEP_WITH_HARDENING | Give a first-time visitor direct access to published stories; remove simulated history and retire collection of unused dietary answers in the public flow. S2–S3. | [`ReferenceApp.tsx:230–278`][welcome] · [`HomeScreen.tsx:76–94`][home] |
| Exploration | Five inputs and six departure presets. State resets on reload and completion writes a lossy legacy projection. | PROTOTYPE_ONLY_REPLACE | Ask only for area and time at the destination. No departure-based estimate can be derived from the current presets. S2. | [`hackathon-product-contract.md:147–177`][explore-contract] |
| Result and reasons | Completion writes the first fixture to legacy Recent; Result defaults to the same two fixtures, with authored percentages and personalized wording. | PROTOTYPE_ONLY_REPLACE | Stage C has supplied browse records since the October packet; active Result still ignores Food Profile and trip answers. Use explicit catalog filters, factual reasons and a real empty state. S2. | [`ReferenceApp.tsx:147–159`][complete] · [`ReferenceApp.tsx:289–299`][result-call] · [`ResultScreen.tsx:26–71`][result] · [`factual-presentation.ts:639–678`][catalog] |
| Story | Localized chapters and nearby Spots lead to an authored route after a loading timer. | KEEP_WITH_HARDENING | Keep the culture, maker, place and history. Give source-backed stories a plain route CTA and visible next step. S1. | [`StoryScreen.tsx:120–127`][story-action] · [`ReferenceApp.tsx:300–312`][story-wiring] |
| Route and access | Timeline and map use authored variants. Regenerate waits then fires a success toast. | PROTOTYPE_ONLY_REPLACE | Present route order and on-site timing as edited estimates with a published start point and official access information. Retire simulated generation. S1. | [`RouteScreen.tsx:88–137`][route] · [`ReferenceApp.tsx:313–335`][route-wiring] · [`journey-records.md:24–37`][route-data] |
| Spot presentation | Localized practical rows and general cautions render; a guide can offer an official link or a toast. | KEEP_WITH_HARDENING | Put visit/purchase information, source, date and unknown status beside the action. Show a readable unavailable state before the user taps. S1. | [`SpotScreen.tsx:55–72`][spot-data] · [`SpotScreen.tsx:144–169`][spot-guide] · [`ReferenceApp.tsx:337–351`][spot-wiring] |
| Visit, purchase and booking destinations | Records now supply some official links; the resolver checks URL shape and uses a same-origin check for legacy tour booking. | EXTERNAL_DEPENDENCY | October's fallback remains. A destination can change, and opening it proves no booking or availability. Require an editorially checked primary action per itinerary, label destination and handoff, and suppress missing or stale actions. S1–S2. | [`spot-official-link.ts:11–57`][official] · [`SpotScreen.tsx:157–171`][spot-guide] |
| Share and deep links | Story, Route and Spot already have identity resolution. Route share sends the origin, with caught errors. | KEEP_WITH_HARDENING | Share a canonical itinerary URL that reopens for a new visitor; show a recovery path if sharing fails or the itinerary has been withdrawn. S3. | [`ReferenceApp.tsx:197–213`][share] · [`journey-location.ts:60–115`][identity] |
| MOGU, Favorites, My and saved routes | MOGU uses the mixed catalog. Bookmarks and route references are distinct and projected together. My offers a placeholder logout. | KEEP_WITH_HARDENING | Browse the release catalog. Keep explicit saves removable, preserve stable approved IDs and surface withdrawn saves without substituting a demo. S2–S3. | [`MoguScreen.tsx:24–52`][mogu] · [`hackathon-product-contract.md:180–203, 229–238`][storage] · [`MyScreen.tsx:174–184`][my] |
| Persistence and privacy | Save handlers show success while lower-level writes catch failures. Accountless preferences and saves have no app reset or sync. | PRODUCT_DECISION_REQUIRED | The October persistence gap remains. Adopt a same-browser contract with confirmed write/remove outcomes, honest failure, reset and minimal retained data. S3. | [`ReferenceApp.tsx:44–70, 161–194`][save-feedback] · [`food-profile-storage.ts:10–40`][profile-storage] · [`saved-routes.ts:30–58`][route-storage] · [`hackathon-product-contract.md:208–243`][profile-contract] |
| Authentication and identity | The visible flow is accountless. A legacy provider restores a local session from the root. | DEFER_FROM_FIRST_RELEASE | Release routes should have no sign-in dependency or account promise. Keep identity work deferred and keep legacy entry points out of the release. S2–S3. | [`AppProviders.tsx:18–27`][providers] · [`AuthProvider.tsx:38–76`][auth] · [`AppRouter.tsx:94–110, 129–147`][router] |
| Localization and content display | Japanese default, ja/en/zh-TW resources, local locale preference and localized record fields. | KEEP_WITH_HARDENING | Make switching accessible on arrival and deep links. Review action, caution and unknown-state copy for meaning and wrapping in all three languages. S1–S4. | [`hackathon-product-contract.md:22–25, 115–132`][design] · [`i18n/index.tsx:32–44`][i18n] · [`journey-records.md:24–66`][record-copy] |
| Catalog and expansion | A registry covers 39 municipalities outside the wards; 13 batch lists and four migrated records feed a shared adapter alongside legacy fixtures. | KEEP_WITH_HARDENING | Reuse geography, stable identities and data-only authoring. Gate release navigation and deep links on an approved set; prove a second municipality needs no screen code. S1–S2. | [`municipalities.ts:1–46`][municipalities] · [`journey-records/index.ts:20–36`][records] · [`journey-record.ts:89–154`][adapter] |
| Provenance and review tools | Fact paths resolve source IDs and statuses. The adapter aggregates pending status and enforces media metadata shape; regression tests pin migrated presentation and sources. | KEEP_WITH_HARDENING | Keep provenance intact. Surface it where the traveller makes decisions and review actual rights separately from metadata. S1–S2. | [`journey-record.ts:34–79, 96–113, 137–150`][adapter] · [`journey-record.test.ts:150–192`][data-test] |
| Publication, rights, editors and partners | Adding a record to a batch publishes it to prototype browse. Web research is pending confirmation. The submission ledger documents uncleared assets and serves a separate package. | PRODUCT_DECISION_REQUIRED | Stage C and #438 establish coverage and provenance stability. Public approval requires an accountable editor, an approved asset/record set, a correction channel and a takedown path. Rights and any partner commitments require evidence. S1–S4. | [`journey-records.md:8–20, 68–97`][publication] · [`journey-record.test.ts:150–192`][data-test] · [`submission-rights-review.md:29–56`][rights] |
| Dietary, allergens and religious suitability | Conversation has related inputs; Result is fixture-driven and the contract limits dietary claims. | PROTOTYPE_ONLY_REPLACE | Remove collection/scoring in public discovery and show venue-confirmation guidance before food actions. Preserve unknowns and keep browsing available. S1–S3. | [`FoodProfileConversation.tsx:230–245`][diet] · [`ReferenceApp.tsx:147–159`][complete] · [`hackathon-product-contract.md:240–262`][diet-contract] |
| Freshness, closures and changing access | Helpers distinguish retrieval, confirmation and source-document changes; the card uses a pending badge for non-verified facts. | KEEP_WITH_HARDENING | Add an editorial recheck deadline for practical facts and destinations. Expired or conflicting details require a visible check state or withdrawal, including on deep links. S1–S4. | [`verification.ts:13–25, 67–111, 114–153`][verify] · [`journey-record.ts:109–113, 137–150`][adapter] |
| Backend, live APIs and account storage | Browser router, shipped catalog and local state support the current flow. | DEFER_FROM_FIRST_RELEASE | Keep public content on static hosting. Live transport, bookings, payments and server-side profiles would require provider and operations contracts. S4. | [`main.tsx:18–35`][entry] · [`factual-presentation.ts:674–678`][catalog] · [`hackathon-product-contract.md:245–262`][diet-contract] |
| Security and abuse boundaries | The app resolves journey identities and sanitizes outbound URL shape. Legacy routes still exist. | KEEP_WITH_HARDENING | Constrain release routes and assets, review outbound hosts and response headers, and keep personal inputs out of share URLs and telemetry. S2–S4. | [`journey-location.ts:69–115`][identity] · [`spot-official-link.ts:11–24`][official] · [`AppRouter.tsx:81–147`][router] |
| Errors, monitoring and success measurement | Invalid journeys can show Not Found. A legacy render boundary logs to console; the active branch returns `ReferenceApp` directly. | MISSING | Add localized public-path recovery, deployment probe and a named response owner. Measure independent task completion and only minimal aggregate service health at launch. S4. | [`AppRouter.tsx:81–110`][router] · [`ErrorBoundary.tsx:21–44`][boundary] |
| Release, deploy and rollback | Risk-tiered CI and a 375px smoke gate validate the prototype. Cloudflare check confirms a deploy. | KEEP_WITH_HARDENING | Add release-only content and asset proof, test the approved catalogue and practise a safe rollback/withdrawal. S4. | [`.github/workflows/ci.yml:81–119, 147–184`][workflow] · [`e2e/current-mvp-smoke.spec.ts:249–312`][smoke] |
| Accessibility, responsive layout and Figma | Fluid 430px-capped phone shell, 375px reference and partial focus/reduced-motion support. | KEEP_WITH_HARDENING | Inspect live Figma before visible changes. Verify keyboard, screen reader, reduced motion, narrow/wide layouts and longer translated copy on the public flow. S1–S4. | [`reference.css:95–106, 581–591`][css] · [`hackathon-product-contract.md:115–145`][design] |

[main]: https://github.com/nurockplayer/tokyo-mogu-mogu/tree/926e6868411c614e009f8e828da1371bc779636a
[parent]: https://github.com/nurockplayer/tokyo-mogu-mogu/issues/403
[audit]: https://github.com/nurockplayer/tokyo-mogu-mogu/issues/404
[phase1]: https://github.com/nurockplayer/tokyo-mogu-mogu/issues/388#issuecomment-5772796214
[toolchain]: https://github.com/nurockplayer/tokyo-mogu-mogu/pull/439
[ci]: https://github.com/nurockplayer/tokyo-mogu-mogu/actions/runs/45829680472
[deploy]: https://9705ec3e.tokyo-mogu-mogu.pages.dev
[contract]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/specs/product/hackathon-product-contract.md
[roadmap]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/project-roadmap.md#L5-L15
[entry]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/main.tsx#L18-L35
[router]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/app/AppRouter.tsx#L81-L147
[catalog]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/factual-presentation.ts#L639-L678
[storage]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/specs/product/hackathon-product-contract.md#L180-L238
[welcome]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/ReferenceApp.tsx#L230-L278
[home]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/screens/HomeScreen.tsx#L76-L94
[explore-contract]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/specs/product/hackathon-product-contract.md#L147-L177
[complete]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/ReferenceApp.tsx#L147-L159
[result-call]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/ReferenceApp.tsx#L289-L299
[result]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/screens/ResultScreen.tsx#L26-L71
[story-action]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/screens/StoryScreen.tsx#L120-L127
[story-wiring]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/ReferenceApp.tsx#L300-L312
[route]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/screens/RouteScreen.tsx#L88-L137
[route-wiring]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/ReferenceApp.tsx#L313-L335
[route-data]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/journey-records.md#L24-L37
[spot-data]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/screens/SpotScreen.tsx#L55-L72
[spot-guide]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/screens/SpotScreen.tsx#L144-L171
[spot-wiring]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/ReferenceApp.tsx#L337-L351
[official]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/spot-official-link.ts#L11-L57
[share]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/ReferenceApp.tsx#L197-L213
[identity]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/journey-location.ts#L60-L115
[mogu]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/screens/MoguScreen.tsx#L24-L52
[my]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/screens/MyScreen.tsx#L174-L184
[save-feedback]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/ReferenceApp.tsx#L44-L194
[profile-storage]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/lib/food-profile-storage.ts#L10-L40
[route-storage]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/lib/saved-routes.ts#L30-L58
[profile-contract]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/specs/product/hackathon-product-contract.md#L208-L243
[providers]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/app/AppProviders.tsx#L18-L27
[auth]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/auth/AuthProvider.tsx#L38-L76
[design]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/specs/product/hackathon-product-contract.md#L115-L145
[i18n]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/i18n/index.tsx#L32-L44
[record-copy]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/journey-records.md#L24-L66
[municipalities]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/municipalities.ts#L1-L46
[records]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/journey-records/index.ts#L20-L36
[adapter]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/journey-record.ts#L34-L154
[data-test]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/journey-record.test.ts#L150-L192
[publication]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/journey-records.md#L8-L97
[rights]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/submission-rights-review.md#L29-L56
[diet]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/chat/FoodProfileConversation.tsx#L230-L245
[diet-contract]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/docs/specs/product/hackathon-product-contract.md#L240-L262
[verify]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/lib/verification.ts#L13-L153
[boundary]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/app/ErrorBoundary.tsx#L21-L44
[workflow]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/.github/workflows/ci.yml#L81-L184
[smoke]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/e2e/current-mvp-smoke.spec.ts#L249-L312
[css]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/features/netlify-parity/reference.css#L581-L591
