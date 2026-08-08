/**
 * Record id → LocaleKey mapping for the S0–S8 demo data content (Issue #67).
 *
 * The data records (`src/data/seed-*.ts`) keep their canonical `{Ja, En}`
 * fields for provenance / source-of-truth purposes, but the strings actually
 * shown to users now resolve through the shared three-locale i18n bundle
 * (`src/i18n/resources.ts`, `data.*` keys) via `useI18n().t()`. This module is
 * the single, explicit mapping between seed ids and bundle keys — it replaces
 * the old per-page `pick(ja, en)` helper, which fell back to English for zh-TW.
 *
 * No parallel locale system is introduced: this is the same t()/fallback
 * mechanism used by every chrome label.
 */
import type { LocaleKey } from './resources';

/** Fields of a food culture record that resolve to a bundle key. */
type FoodCultureField = 'name' | 'description' | 'story' | 'history' | 'maker' | 'howToEnjoy';

/** A food culture keyed by its record id. */
export const FOOD_CULTURE_DATA_KEYS: Record<string, Partial<Record<FoodCultureField, LocaleKey>>> = {
  'wasabi-okutama': {
    name: 'dataWasabiName',
    description: 'dataWasabiDescription',
    story: 'dataWasabiStory',
    history: 'dataWasabiHistory',
    maker: 'dataWasabiMaker',
    howToEnjoy: 'dataWasabiHowToEnjoy',
  },
  // Names for the other cultures surfaced on the S6 route spots' "related food
  // cultures" list (Issue #67). Only `name` is mapped — the full record content
  // for these cultures is out of the S3–S8 demo journey scope.
  'yamame-okutama': { name: 'dataYamameName' },
  'okutama-soba': { name: 'dataOkutamaSobaName' },
  'okutama-konnyaku': { name: 'dataOkutamaKonnyakuName' },
};

/** A route keyed by its record id. */
export const ROUTE_DATA_KEYS = {
  'okutama-wasabi-journey': {
    name: 'dataRouteName',
  },
} as const satisfies Record<string, Record<string, LocaleKey>>;

/** A route step's role, keyed by `{ routeId }.{ placeId }` and duration. */
export const ROUTE_STEP_ROLE_KEYS: Record<string, LocaleKey> = {
  'okutama-wasabi-journey.okutama-tourism-office.half-day': 'dataRouteStopRoleTourismOffice',
  'okutama-wasabi-journey.okutama-tourism-office.1-day': 'dataRouteStopRoleTourismOffice',
  'okutama-wasabi-journey.okutama-wasabi-field.half-day': 'dataRouteStopRoleWasabiField',
  'okutama-wasabi-journey.okutama-wasabi-field.1-day': 'dataRouteStopRoleWasabiFieldFullDay',
  'okutama-wasabi-journey.okutama-soba-shop.half-day': 'dataRouteStopRoleSobaLunch',
  'okutama-wasabi-journey.okutama-soba-shop.1-day': 'dataRouteStopRoleSobaLunch',
  'okutama-wasabi-journey.okutama-michi-no-eki.half-day': 'dataRouteStopRoleMichiNoEki',
  'okutama-wasabi-journey.okutama-michi-no-eki.1-day': 'dataRouteStopRoleMichiNoEki',
  'okutama-wasabi-journey.okutama-fishing-center.1-day': 'dataRouteStopRoleFishingCenter',
} as const satisfies Record<string, LocaleKey>;

/** A place keyed by its record id. */
export const PLACE_DATA_KEYS = {
  'okutama-wasabi-field': { name: 'dataPlaceWasabiFieldName' },
  'okutama-tourism-office': { name: 'dataPlaceTourismOfficeName' },
  'okutama-soba-shop': { name: 'dataPlaceSobaShopName' },
  'okutama-michi-no-eki': { name: 'dataPlaceMichiNoEkiName' },
  'okutama-fishing-center': { name: 'dataPlaceFishingCenterName' },
} as const satisfies Record<string, Record<string, LocaleKey>>;

/** Spot practical-info access label, keyed by place id. */
export const SPOT_ACCESS_KEYS: Record<string, LocaleKey> = {
  'okutama-wasabi-field': 'dataWasabiFieldAccess',
  'okutama-fishing-center': 'dataFishingCenterAccess',
} as const satisfies Record<string, LocaleKey>;

/** Spot demo-note label, keyed by place id. */
export const SPOT_DEMO_NOTE_KEYS: Record<string, LocaleKey> = {
  'okutama-wasabi-field': 'dataWasabiFieldDemoNote',
  'okutama-fishing-center': 'dataFishingCenterDemoNote',
} as const satisfies Record<string, LocaleKey>;

/** Spot role, keyed by place id. */
export const SPOT_ROLE_KEYS: Record<string, LocaleKey> = {
  'okutama-wasabi-field': 'dataWasabiFieldRole',
  'okutama-tourism-office': 'dataTourismOfficeRole',
  'okutama-fishing-center': 'dataFishingCenterRole',
  'okutama-soba-shop': 'dataSobaShopRole',
  'okutama-michi-no-eki': 'dataMichiNoEkiRole',
} as const satisfies Record<string, LocaleKey>;

/**
 * Mobility line label, keyed by `{routeId}.{fromStep}-{toStep}`. The demo route
 * uses a stream-side walk for step 1→2 and a bus for 2→3; remaining segments
 * are plain walks (default).
 */
const ROUTE_MOBILITY_LABEL_KEYS: Record<string, LocaleKey> = {
  'okutama-wasabi-journey.1-2': 'dataRouteMobilityWalkStream',
  'okutama-wasabi-journey.2-3': 'dataRouteMobilityBus',
} as const satisfies Record<string, LocaleKey>;

/** The bridge helpers below are pure id → key lookups (used by page code). */
export function foodCultureKey(
  id: string,
  field: FoodCultureField,
): LocaleKey | undefined {
  return FOOD_CULTURE_DATA_KEYS[id]?.[field];
}

export function routeNameKey(id: string): LocaleKey {
  return ROUTE_DATA_KEYS[id as keyof typeof ROUTE_DATA_KEYS]?.name ?? 'dataRouteName';
}

export function stepRoleKey(routeId: string, placeId: string, duration: string): LocaleKey {
  return ROUTE_STEP_ROLE_KEYS[`${routeId}.${placeId}.${duration}`] ?? 'dataRouteStopRoleWasabiField';
}

export function placeNameKey(id: string): LocaleKey {
  return PLACE_DATA_KEYS[id as keyof typeof PLACE_DATA_KEYS]?.name ?? 'dataPlaceWasabiFieldName';
}

export function spotAccessKey(placeId: string): LocaleKey | undefined {
  return SPOT_ACCESS_KEYS[placeId];
}

export function spotDemoNoteKey(placeId: string): LocaleKey | undefined {
  return SPOT_DEMO_NOTE_KEYS[placeId];
}

export function spotRoleKey(placeId: string): LocaleKey | undefined {
  return SPOT_ROLE_KEYS[placeId];
}

export function mobilityLabelKey(routeId: string, fromStep: number, toStep: number): LocaleKey {
  return (
    ROUTE_MOBILITY_LABEL_KEYS[`${routeId}.${fromStep}-${toStep}`] ?? 'dataRouteMobilityWalk'
  );
}
