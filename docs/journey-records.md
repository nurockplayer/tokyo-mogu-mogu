# Adding a browse journey (Stage C, #412)

Municipalities live in `src/data/municipalities.ts`: exactly 39 municipalities
outside the wards, grouped as Tama cities / Nishitama / islands. Geography is
independent of the presentation's historical `regionId` food-culture grouping.
A registry entry alone adds no card. There is no per-municipality journey cap.

Add one TypeScript data record under `src/data/journey-records/`, typed as
`JourneyRecord` from `src/data/journey-record.ts`. Import it and append it to
`JOURNEY_RECORDS` in that directory's `index.ts`. That list controls browse
publication and ordering. Do not add a builder, React component, seed candidate,
Result recommendation, route switch, persistence key, or slice-manifest switch.
The adapter supplies the existing MOGU, Story, Route and Spot presentation maps.

## Required fields

- `municipalityId`: a stable registered municipality ID. This is geography;
  keep all journey, food-culture, story, route and Spot IDs independently stable.
- `journey`: IDs; localized `copy` (title, subtitle, description, tags,
  storyTitle, intro); localized numbered `chapters`; `routeVariants` with
  duration in minutes and ordered Spot IDs. Include `half-day`, the runtime's
  initial selection; add `full-day` when authored. No recommendation score.
- `routeName`, `location`: the localized route heading and browse location
  (`area`, `station`, `access`; unknown station/access can be empty).
- `variants`: keyed by every variant ID. Each supplies ordered `steps`
  (`spotId`, localized description, optional walk/note), localized `stats`
  (time, distance/transport, spots, station, minutes, access/caution as needed),
  and localized `guidance`. Counts, duration and step identities must agree
  with `journey.routeVariants`. Timing/order are editorial estimates, not a
  verified timetable. Do not invent transport or access facts.
- `spots`: keyed by every referenced Spot ID. Each contains `presentation`
  (IDs, three-locale name/lead/description/tags/practicalInfo/caution, thumbnail
  IDs) and `detail` (localized tags, description, practical `information` rows,
  cautions, optional guide). Information rows have stable `fieldId`, icon,
  localized label and value. Use `official_current_url` for the source URL and
  `verification_note` for the honest state/retrieval wording. `officialSource`
  supplies an official-web source for the existing official-information button.
  Omit it when no supported official destination exists.
- `story`: nearby/nature `groups`, localized `location`, optional localized
  chapter `point`. Every referenced Spot must be in `spots`.
- `sources`: source IDs mapped to existing `DataSource` objects: name, URL,
  source type, retrieval date and verification status; retain usage constraints
  and confirmation dates only when supported by evidence.
- `facts`: dot-path evidence entries, each with `sourceIds` and `origin`
  (`source`, `editorial`, or `demo`). A path identifies an individual fact or a
  group whose facts share the same sources; the longest matching path wins.
  For example, `spots.my-spot.detail.information.2.value` can trace an hours
  statement separately from the address and introduction. Cite every factual
  statement, including translations, chapter bodies, route/access estimates,
  descriptions and practical rows. Editorial prose paraphrases evidence in
  original words, never copies source prose. An editorial itinerary also
  retains its editorial source; it is not an operator-confirmed schedule.

Every localized field has `ja`, `en`, and `zh-TW`; do not add new shared i18n
keys for a journey. The four migrated records are complete examples. Their
values were materialized from current-main presentation, keeping existing
sources/statuses and caveats. The acceptance test pins their complete output
against hashes captured before migration. Wasabi and Yamame remain fixtures
because they also own the unchanged Result/demo presentation.

## Confirmation and source honesty

For web research use `retrievedAt` and
`verificationStatus: 'needs_confirmation'`. Retrieval and legacy `lastVerified`
are **not** confirmation. Only record actual stakeholder/team confirmation in
`confirmedAt`; never manufacture hours, prices, reservations, stock, allergy
assurances or confirmation dates. Omit unsupported facts and explain what
visitors must check. Dietary input remains recommendation-only.

`journeyFactStatus(record, path)` applies `src/lib/verification.ts`, including
stale/conflict/demo rules and the downgrade of `verified` without
`confirmedAt`. If any fact lacks verification, the adapter uses the existing
MOGU confirmation-pending badge. For unconfirmed Spots it retains the existing
practical caveats and ensures the pending tag and a caveat exist in the detail
that Spot actually renders. Per-fact source metadata retains the original
status; the card's single pending badge conservatively covers non-verified
states. Include source URLs in practical information so visitors can consult
them. Existing Spots keep their canonical official destination; new record-only
Spots use their explicit `officialSource` through the same safe link resolver.
An absent or unsupported official source keeps the existing unavailable-link
feedback. Do not invent a Place just to enable that button.

## Photography

No image is required. The existing no-photo state preserves screen geometry.
Only use assets with explicit permission: record each referenced asset in
`mediaRights` as `{ sourceUrl, license }`, retaining the actual permission or
license evidence at that URL and the repository asset's rights inventory.
Without both fields the adapter removes that image/thumbnail reference and
uses no-photo. Source text permission does not grant photography rights.
