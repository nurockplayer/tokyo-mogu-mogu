/**
 * Small explicit boundary for verification-ledger facts that structured data
 * cannot safely identify on its own.
 *
 * This file contains stable mappings, surface ownership, traceability, and
 * required report-only unknowns. It deliberately contains no canonical or
 * displayed factual values.
 */

export const PRESENTATION_ROUTE_AUDIT = [
  {
    presentationJourneyId: 'demo-okutama-wasabi',
    canonicalRouteId: 'okutama-wasabi-journey',
    variants: {
      'half-day': 'half-day',
      'full-day': '1-day',
    },
    resultComparisonVariantId: 'half-day',
    surfaces: ['Result', 'Story', 'Route'],
    issues: ['#333'],
  },
  {
    presentationJourneyId: 'demo-okutama-yamame',
    canonicalRouteId: 'okutama-yamame-journey',
    variants: {
      'half-day': 'half-day',
    },
    resultComparisonVariantId: 'half-day',
    surfaces: ['Result', 'Story', 'Route'],
    issues: ['#333'],
  },
  {
    presentationJourneyId: 'demo-ome-sake',
    canonicalRouteId: 'ome-sawai-sake-journey',
    variants: {
      'half-day': 'half-day',
      'full-day': '1-day',
    },
    resultComparisonVariantId: undefined,
    surfaces: ['MOGU', 'Story', 'Route'],
    issues: ['#348'],
  },
] as const;

export const PRESENTATION_SPOT_AUDIT = [
  {
    presentationSpotId: 'okutama-tourism-office',
    canonicalPlaceId: 'okutama-tourism-office',
    surface: 'Spot',
    issues: ['#322', 'PR #332', '#333'],
  },
  {
    presentationSpotId: 'yamashiroya',
    canonicalPlaceId: 'yamashiroya',
    surface: 'Spot',
    issues: ['#323', '#333', '#334'],
  },
  {
    presentationSpotId: 'okutama-kitchen',
    canonicalPlaceId: 'okutama-kitchen',
    surface: 'Spot',
    stableCanonicalFieldIds: [
      'access',
      'hours',
      'closed_days',
      'price_availability',
      'parking',
      'official_current_url',
    ],
    issues: ['#325', '#333', '#334'],
  },
  {
    presentationSpotId: 'port-okutama',
    canonicalPlaceId: 'port-okutama',
    surface: 'Spot',
    stableCanonicalFieldIds: [
      'hours',
      'closed_days',
      'service_availability',
      'official_current_url',
    ],
    issues: ['#327', '#333', '#334'],
  },
  {
    presentationSpotId: 'akabeko',
    canonicalPlaceId: 'akabeko',
    surface: 'Spot',
    stableCanonicalFieldIds: [
      'hours',
      'closed_days',
      'price_availability',
      'reservation',
      'official_current_url',
    ],
    issues: ['#326', '#333', '#334'],
  },
  {
    presentationSpotId: 'wasabi-kitchen',
    canonicalPlaceId: 'wasabi-kitchen',
    surface: 'Spot',
    stableCanonicalFieldIds: [
      'venue_model',
      'operating_area',
      'schedule_guidance',
      'schedule_url',
      'schedule_conflict',
      'price_availability',
      'official_current_url',
    ],
    issues: ['#324', '#333', '#334'],
  },
  {
    presentationSpotId: 'sawai-ozawa-shuzo',
    canonicalPlaceId: 'sawai-ozawa-shuzo',
    surface: 'Spot',
    stableCanonicalFieldIds: [
      'access',
      'hours',
      'closed_days',
      'price_availability',
      'reservation',
      'official_current_url',
    ],
    issues: ['#348'],
  },
  {
    presentationSpotId: 'sawanoien-garden',
    canonicalPlaceId: 'sawanoien-garden',
    surface: 'Spot',
    stableCanonicalFieldIds: [
      'hours',
      'closed_days',
      'official_current_url',
    ],
    issues: ['#348'],
  },
  {
    presentationSpotId: 'mitake-shrine',
    canonicalPlaceId: 'mitake-shrine',
    surface: 'Spot',
    stableCanonicalFieldIds: ['official_current_url'],
    issues: ['#348'],
  },
  {
    presentationSpotId: 'baba-oshijutaku',
    canonicalPlaceId: 'baba-oshijutaku',
    surface: 'Spot',
    stableCanonicalFieldIds: ['official_current_url'],
    issues: ['#348'],
  },
] as const;

export const PRESENTATION_ROUTE_MEETING_TIME_AUDIT = [
  {
    presentationJourneyId: 'demo-okutama-wasabi',
    variantId: 'full-day',
    spotId: 'wasabi-experience',
  },
] as const;

/** Metadata-only identities for factual assertions embedded in Home journey cards. */
export const REQUIRED_HOME_JOURNEY_FACTUAL_CLAIMS = [
  { presentationJourneyId: 'demo-okutama-wasabi', claimId: 'home.factual.duration', fieldLabel: 'Home journey duration', parentFieldId: 'presentation:home_card_description', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-wasabi', claimId: 'home.factual.named-stops', fieldLabel: 'Home journey named stops', parentFieldId: 'presentation:home_card_description', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-yamame', claimId: 'home.factual.duration', fieldLabel: 'Home journey duration', parentFieldId: 'presentation:home_card_description', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-yamame', claimId: 'home.factual.named-stops', fieldLabel: 'Home journey named stops', parentFieldId: 'presentation:home_card_description', timeSensitive: true },
] as const;

/**
 * Stable, metadata-only identities for factual assertions embedded in current
 * Story presentation copy. The manifest does not copy or parse their values;
 * each entry remains a report-only unknown until claim-level evidence exists.
 */
export const REQUIRED_STORY_FACTUAL_CLAIMS = {
  'demo-okutama-wasabi': [
    { claimId: 'story.factual.nearest-stations', fieldLabel: 'Story nearest-station guidance', parentFieldId: 'presentation:story_location', timeSensitive: true },
    { claimId: 'story.factual.region-geography', fieldLabel: 'Okutama regional geography', parentFieldId: 'presentation:story_intro', timeSensitive: false },
    { claimId: 'story.factual.municipality-area-ranking', fieldLabel: 'Okutama municipality area ranking', parentFieldId: 'presentation:story_intro', timeSensitive: false },
    { claimId: 'story.factual.wasabi-cultivation-history', fieldLabel: 'Wasabi cultivation history', parentFieldId: 'presentation:story_chapters', timeSensitive: false },
    { claimId: 'story.factual.cultivation-livelihood-role', fieldLabel: 'Wasabi livelihood history', parentFieldId: 'presentation:story_chapters', timeSensitive: false },
    { claimId: 'story.factual.successor-count', fieldLabel: 'Current wasabi successor count', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.named-producers', fieldLabel: 'Named wasabi producers and activities', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.wasabi-school-duration', fieldLabel: 'Wasabi school learning duration', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.production-challenges', fieldLabel: 'Current wasabi production challenges', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.visit-economic-impact', fieldLabel: 'Visitor economic and succession impact', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.wasabi-flavor-profile', fieldLabel: 'Okutama wasabi flavor profile', parentFieldId: 'presentation:story_point', timeSensitive: false },
    { claimId: 'story.factual.grating-aroma-effect', fieldLabel: 'Effect of gentle grating on wasabi aroma', parentFieldId: 'presentation:story_point', timeSensitive: false },
    { claimId: 'story.factual.optimal-eating-window', fieldLabel: 'Wasabi optimal eating window', parentFieldId: 'presentation:story_point', timeSensitive: false },
    { claimId: 'story.factual.food-pairings', fieldLabel: 'Wasabi food pairing claims', parentFieldId: 'presentation:story_point', timeSensitive: false },
  ],
  'demo-okutama-yamame': [
    { claimId: 'story.factual.nearest-stations', fieldLabel: 'Story nearest-station guidance', parentFieldId: 'presentation:story_location', timeSensitive: true },
    { claimId: 'story.factual.aquaculture-history', fieldLabel: 'Okutama yamame aquaculture history', parentFieldId: 'presentation:story_chapters', timeSensitive: false },
    { claimId: 'story.factual.research-facility-count', fieldLabel: 'Aquaculture research facility count', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.inn-age', fieldLabel: 'Akabeko inn age', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.proprietor-generation', fieldLabel: 'Akabeko proprietor generation', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.recipe-provenance', fieldLabel: 'Yamame recipe provenance', parentFieldId: 'presentation:story_chapters', timeSensitive: false },
    { claimId: 'story.factual.aquaculture-research', fieldLabel: 'Yamame aquaculture research activity', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.fish-reproductive-characteristic', fieldLabel: 'Okutama yamame reproductive characteristic', parentFieldId: 'presentation:story_chapters', timeSensitive: false },
    { claimId: 'story.factual.fish-longevity-size', fieldLabel: 'Okutama yamame longevity and size', parentFieldId: 'presentation:story_point', timeSensitive: false },
    { claimId: 'story.factual.dish-availability', fieldLabel: 'Okutama yamame dish availability', parentFieldId: 'presentation:story_point', timeSensitive: true },
    { claimId: 'story.factual.disease-risk', fieldLabel: 'Farmed yamame disease risk', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.tour-hygiene-constraint', fieldLabel: 'Aquaculture tour hygiene constraint', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.lodging-pattern', fieldLabel: 'Current Okutama lodging pattern', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.visit-support-impact', fieldLabel: 'Visitor support impact', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
  ],
  'demo-ome-sake': [
    { claimId: 'story.factual.nearest-station', fieldLabel: 'Sawai nearest-station guidance', parentFieldId: 'presentation:story_location', timeSensitive: true },
    { claimId: 'story.factual.tama-river-valley-context', fieldLabel: 'Sawai and Tama River valley context', parentFieldId: 'presentation:story_intro', timeSensitive: false },
    { claimId: 'story.factual.genroku-era-founding', fieldLabel: 'Ozawa Shuzo Genroku-era founding', parentFieldId: 'presentation:story_chapters', timeSensitive: false },
    { claimId: 'story.factual.genroku-storehouse', fieldLabel: 'Genroku storehouse survival and heritage value', parentFieldId: 'presentation:story_chapters', timeSensitive: false },
    { claimId: 'story.factual.sawanoi-brewery-identity', fieldLabel: 'Ozawa Shuzo and Sawanoi brewery identity', parentFieldId: 'presentation:story_chapters', timeSensitive: false },
    { claimId: 'story.factual.brewery-tour-reservation', fieldLabel: 'Brewery-tour reservation requirement', parentFieldId: 'presentation:story_chapters', timeSensitive: true },
    { claimId: 'story.factual.mitake-heritage-designation', fieldLabel: 'Mitake Shrine former-main-hall heritage designation', parentFieldId: 'presentation:story_chapters', timeSensitive: false },
    { claimId: 'story.factual.pre-visit-operational-check', fieldLabel: 'Pre-visit operations, tour, and transport check', parentFieldId: 'presentation:story_point', timeSensitive: true },
  ],
} as const;

/** Metadata-only identities for operational facts embedded in Route guidance. */
export const REQUIRED_ROUTE_GUIDANCE_FACTUAL_CLAIMS = [
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'half-day', spotId: 'wasabi-kitchen', claimId: 'venue-model', fieldLabel: 'Mobile food-truck venue model', timeSensitive: false, canonicalPlaceId: 'wasabi-kitchen', canonicalFieldId: 'venue_model', issues: ['#324'] },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'half-day', spotId: 'wasabi-kitchen', claimId: 'weekend-operation', fieldLabel: 'Mainly-weekend operation and current-schedule guidance', timeSensitive: true, canonicalPlaceId: 'wasabi-kitchen', canonicalFieldId: 'schedule_guidance', issues: ['#324'] },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'half-day', spotId: 'wasabi-kitchen', claimId: 'wasabi-don-reference-price', fieldLabel: 'Dated official wasabi-don reference price', timeSensitive: true, canonicalPlaceId: 'wasabi-kitchen', canonicalFieldId: 'price_availability', issues: ['#324'] },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'half-day', spotId: 'okutama-kitchen', claimId: 'product-availability', fieldLabel: 'Special soft gelato / wasabi-flavor availability', timeSensitive: true, canonicalPlaceId: 'okutama-kitchen', canonicalFieldId: 'product_availability', issues: ['#325'] },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'half-day', spotId: 'port-okutama', claimId: 'service-availability', fieldLabel: 'Cafe and retail service availability', timeSensitive: true, canonicalPlaceId: 'port-okutama', canonicalFieldId: 'service_availability', issues: ['#327'] },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'full-day', spotId: 'wasabi-experience', claimId: 'tour-duration', fieldLabel: 'Wasabi-field tour duration', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'full-day', spotId: 'wasabi-experience', claimId: 'daily-group-limit', fieldLabel: 'Wasabi-field daily group limit', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'full-day', spotId: 'wasabi-experience', claimId: 'tour-availability', fieldLabel: 'Private tour availability', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'full-day', spotId: 'okutama-station', claimId: 'rail-travel-duration', fieldLabel: 'Mitake-to-Okutama rail duration', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'full-day', spotId: 'akabeko', claimId: 'last-order-time', fieldLabel: 'Displayed lunch last-order time', timeSensitive: true, canonicalPlaceId: 'akabeko', canonicalFieldId: 'hours', issues: ['#326'] },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'full-day', spotId: 'yamashiroya', claimId: 'product-availability', fieldLabel: 'Wasabi product availability', timeSensitive: true, canonicalPlaceId: 'yamashiroya', canonicalFieldId: 'product_availability', issues: ['#323'] },
  { presentationJourneyId: 'demo-okutama-wasabi', variantId: 'full-day', spotId: 'port-okutama', claimId: 'coffee-availability', fieldLabel: 'Coffee service availability', timeSensitive: true, canonicalPlaceId: 'port-okutama', canonicalFieldId: 'service_availability', issues: ['#327'] },
  { presentationJourneyId: 'demo-okutama-yamame', variantId: 'half-day', spotId: 'okutama-tourism-office', claimId: 'information-stop-duration', fieldLabel: 'Information stop duration', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-yamame', variantId: 'half-day', spotId: 'hikawa-valley', claimId: 'walk-duration', fieldLabel: 'Streamside walk duration', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-yamame', variantId: 'half-day', spotId: 'akabeko', claimId: 'lunch-duration', fieldLabel: 'Yamame lunch duration', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-yamame', variantId: 'half-day', spotId: 'akabeko', claimId: 'dish-availability', fieldLabel: 'Yamame lunch availability', timeSensitive: true, canonicalPlaceId: 'akabeko', canonicalFieldId: 'product_availability', issues: ['#326'] },
] as const;

/** Metadata-only identities for factual assertions embedded in Story spot cards. */
export const REQUIRED_STORY_SPOT_FACTUAL_CLAIMS = [
  { presentationJourneyId: 'demo-okutama-wasabi', spotId: 'akabeko', claimId: 'story.spot.akabeko.menu-availability', fieldLabel: 'Akabeko local menu availability', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: true, canonicalPlaceId: 'akabeko', canonicalFieldId: 'product_availability', issues: ['#326'] },
  { presentationJourneyId: 'demo-okutama-wasabi', spotId: 'yamashiroya', claimId: 'story.spot.yamashiroya.product-availability', fieldLabel: 'Yamashiroya product availability', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: true, canonicalPlaceId: 'yamashiroya', canonicalFieldId: 'product_availability', issues: ['#323'] },
  { presentationJourneyId: 'demo-okutama-wasabi', spotId: 'wasabi-kitchen', claimId: 'story.spot.wasabi-kitchen.weekend-operation', fieldLabel: 'Wasabi Kitchen mainly-weekend operation and current schedule', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: true, canonicalPlaceId: 'wasabi-kitchen', canonicalFieldId: 'schedule_guidance', issues: ['#324'] },
  { presentationJourneyId: 'demo-okutama-wasabi', spotId: 'wasabi-kitchen', claimId: 'story.spot.wasabi-kitchen.venue-model', fieldLabel: 'Wasabi Kitchen mobile food-truck venue model', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: false, canonicalPlaceId: 'wasabi-kitchen', canonicalFieldId: 'venue_model', issues: ['#324'] },
  { presentationJourneyId: 'demo-okutama-wasabi', spotId: 'okutama-kitchen', claimId: 'story.spot.okutama-kitchen.product-availability', fieldLabel: 'Okutama Kitchen product availability', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: true, canonicalPlaceId: 'okutama-kitchen', canonicalFieldId: 'product_availability', issues: ['#325'] },
  { presentationJourneyId: 'demo-okutama-wasabi', spotId: 'port-okutama', claimId: 'story.spot.port-okutama.service-availability', fieldLabel: 'Port Okutama service availability', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: true, canonicalPlaceId: 'port-okutama', canonicalFieldId: 'service_availability', issues: ['#327'] },
  { presentationJourneyId: 'demo-okutama-wasabi', spotId: 'wasabi-experience', claimId: 'story.spot.wasabi-experience.reservation-requirement', fieldLabel: 'Wasabi Experience reservation requirement', parentFieldId: 'presentation:spot_group:nature', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-wasabi', spotId: 'wasabi-experience', claimId: 'story.spot.wasabi-experience.daily-group-limit', fieldLabel: 'Wasabi Experience daily group limit', parentFieldId: 'presentation:spot_group:nature', timeSensitive: true },
  { presentationJourneyId: 'demo-okutama-wasabi', spotId: 'hikawa-valley', claimId: 'story.spot.hikawa-valley.river-confluence', fieldLabel: 'Hikawa Valley river confluence and location', parentFieldId: 'presentation:spot_group:nature', timeSensitive: false },
  { presentationJourneyId: 'demo-okutama-wasabi', spotId: 'oku-hikawa-shrine', claimId: 'story.spot.oku-hikawa-shrine.location', fieldLabel: 'Oku-Hikawa Shrine location', parentFieldId: 'presentation:spot_group:nature', timeSensitive: false },
  { presentationJourneyId: 'demo-okutama-yamame', spotId: 'akabeko', claimId: 'story.spot.akabeko.dish-availability', fieldLabel: 'Akabeko yamame dish availability', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: true, canonicalPlaceId: 'akabeko', canonicalFieldId: 'product_availability', issues: ['#326'] },
  { presentationJourneyId: 'demo-okutama-yamame', spotId: 'yamashiroya', claimId: 'story.spot.yamashiroya.product-availability', fieldLabel: 'Yamashiroya product availability', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: true, canonicalPlaceId: 'yamashiroya', canonicalFieldId: 'product_availability', issues: ['#323'] },
  { presentationJourneyId: 'demo-okutama-yamame', spotId: 'hikawa-valley', claimId: 'story.spot.hikawa-valley.stream-conditions', fieldLabel: 'Hikawa Valley stream conditions', parentFieldId: 'presentation:spot_group:nature', timeSensitive: false },
  { presentationJourneyId: 'demo-okutama-yamame', spotId: 'hikawa-valley', claimId: 'story.spot.hikawa-valley.water-culture-origin', fieldLabel: 'Tama River food-culture origin claim', parentFieldId: 'presentation:spot_group:nature', timeSensitive: false },
  { presentationJourneyId: 'demo-ome-sake', spotId: 'sawai-ozawa-shuzo', claimId: 'story.spot.sawai-ozawa-shuzo.role-context', fieldLabel: 'Ozawa Shuzo brewery role and Sawanoi context', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: false, canonicalPlaceId: 'sawai-ozawa-shuzo', canonicalFieldId: 'story_wording' },
  { presentationJourneyId: 'demo-ome-sake', spotId: 'sawai-ozawa-shuzo', claimId: 'story.spot.sawai-ozawa-shuzo.reservation-requirement', fieldLabel: 'Ozawa Shuzo tour reservation and official-check note', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: true },
  { presentationJourneyId: 'demo-ome-sake', spotId: 'sawanoien-garden', claimId: 'story.spot.sawanoien-garden.role-context', fieldLabel: 'Sawanoien operator and service context', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: false, canonicalPlaceId: 'sawanoien-garden', canonicalFieldId: 'story_wording' },
  { presentationJourneyId: 'demo-ome-sake', spotId: 'sawanoien-garden', claimId: 'story.spot.sawanoien-garden.operating-calendar-check', fieldLabel: 'Sawanoien official operating-calendar check', parentFieldId: 'presentation:spot_group:nearby', timeSensitive: true },
  { presentationJourneyId: 'demo-ome-sake', spotId: 'mitake-shrine', claimId: 'story.spot.mitake-shrine.role-context', fieldLabel: 'Mitake Shrine heritage context', parentFieldId: 'presentation:spot_group:nature', timeSensitive: false, canonicalPlaceId: 'mitake-shrine', canonicalFieldId: 'story_wording' },
  { presentationJourneyId: 'demo-ome-sake', spotId: 'baba-oshijutaku', claimId: 'story.spot.baba-oshijutaku.role-context', fieldLabel: 'Baba House oshi-residence heritage context', parentFieldId: 'presentation:spot_group:nature', timeSensitive: false, canonicalPlaceId: 'baba-oshijutaku', canonicalFieldId: 'story_wording' },
] as const;

export const REQUIRED_VISIBLE_SPOT_FIELDS = [
  { fieldId: 'access', fieldLabel: 'Access / nearest station', timeSensitive: true },
  { fieldId: 'hours', fieldLabel: 'Opening hours', timeSensitive: true },
  { fieldId: 'closed_days', fieldLabel: 'Closed days', timeSensitive: true },
  { fieldId: 'price_availability', fieldLabel: 'Price / menu / product availability', timeSensitive: true },
  { fieldId: 'reservation', fieldLabel: 'Reservation requirement', timeSensitive: true },
  { fieldId: 'booking_destination', fieldLabel: 'Booking destination', timeSensitive: true },
  { fieldId: 'parking', fieldLabel: 'Parking', timeSensitive: true },
  { fieldId: 'multilingual_support', fieldLabel: 'Multilingual support', timeSensitive: true },
  { fieldId: 'dietary_allergy', fieldLabel: 'Dietary / allergy / halal / vegan support', timeSensitive: true },
  { fieldId: 'accessibility', fieldLabel: 'Accessibility', timeSensitive: true },
  { fieldId: 'safety_guidance', fieldLabel: 'Safety guidance', timeSensitive: true },
  { fieldId: 'official_current_url', fieldLabel: 'Official / current-information URL', timeSensitive: true },
] as const;

export const SOURCE_FILES = {
  foodCultures: 'src/data/seed-food-cultures.ts',
  places: 'src/data/seed-places.ts',
  routes: 'src/data/seed-routes.ts',
  presentation: 'src/features/netlify-parity/factual-presentation.ts',
  auditManifest: 'src/data/data-verification-audit-manifest.ts',
  tourismSnapshot: 'scripts/ingest-okutama/snapshots/okutama-tourism-directory.json',
} as const;
