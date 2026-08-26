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
    surfaces: ['Result', 'Story', 'Route'],
    issues: ['#333'],
  },
  {
    presentationJourneyId: 'demo-okutama-yamame',
    canonicalRouteId: 'okutama-yamame-journey',
    variants: {
      'half-day': 'half-day',
    },
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
} as const;
