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
] as const;

export const PRESENTATION_SPOT_AUDIT = [
  {
    presentationSpotId: 'okutama-tourism-office',
    canonicalPlaceId: 'okutama-tourism-office',
    surface: 'Spot',
    issues: ['#322', 'PR #332', '#333'],
  },
] as const;

export const PRESENTATION_ROUTE_MEETING_TIME_AUDIT = [
  {
    presentationJourneyId: 'demo-okutama-wasabi',
    variantId: 'full-day',
    spotId: 'wasabi-experience',
  },
] as const;

/**
 * Stable, metadata-only identities for factual assertions embedded in current
 * Story presentation copy. The manifest does not copy or parse their values;
 * each entry remains a report-only unknown until claim-level evidence exists.
 */
export const REQUIRED_STORY_FACTUAL_CLAIMS = {
  'demo-okutama-wasabi': [
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
} as const;

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
