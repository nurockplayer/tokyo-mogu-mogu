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
  'okutama-wasabi-journey.chishima-wasabi-garden.half-day': 'dataRouteStopRoleChishima',
  'okutama-wasabi-journey.chishima-wasabi-garden.1-day': 'dataRouteStopRoleChishimaFullDay',
  'okutama-wasabi-journey.soba-isshintei.half-day': 'dataRouteStopRoleIsshinteiLunch',
  'okutama-wasabi-journey.soba-isshintei.1-day': 'dataRouteStopRoleIsshinteiLunch',
  'okutama-wasabi-journey.shishiguchiya.half-day': 'dataRouteStopRoleShishiguchiya',
  'okutama-wasabi-journey.shishiguchiya.1-day': 'dataRouteStopRoleShishiguchiya',
  'okutama-wasabi-journey.odanba-fishing.1-day': 'dataRouteStopRoleOdanba',
} as const satisfies Record<string, LocaleKey>;

/** A place keyed by its record id. */
export const PLACE_DATA_KEYS = {
  'okutama-tourism-office': { name: 'dataPlaceTourismOfficeName' },
  'chishima-wasabi-garden': { name: 'dataPlaceChishimaName' },
  'soba-isshintei': { name: 'dataPlaceIsshinteiName' },
  'shishiguchiya': { name: 'dataPlaceShishiguchiyaName' },
  'odanba-fishing': { name: 'dataPlaceOdanbaName' },
  'okutama-soba-shop': { name: 'dataPlaceSobaShopName' },
  'okutama-michi-no-eki': { name: 'dataPlaceMichiNoEkiName' },
  'okutama-fishing-center': { name: 'dataPlaceFishingCenterName' },
} as const satisfies Record<string, Record<string, LocaleKey>>;

/** Spot practical-info access label, keyed by place id (none on the frozen
 *  journey: practical info is unverified and renders the explicit unknown
 *  state). */
export const SPOT_ACCESS_KEYS: Record<string, LocaleKey> = {} as const;

/** Spot demo-note label, keyed by place id (none on the frozen journey). */
export const SPOT_DEMO_NOTE_KEYS: Record<string, LocaleKey> = {} as const;

/** Spot role, keyed by place id. */
export const SPOT_ROLE_KEYS: Record<string, LocaleKey> = {
  'okutama-tourism-office': 'dataTourismOfficeRole',
  'chishima-wasabi-garden': 'dataChishimaRole',
  'soba-isshintei': 'dataIsshinteiRole',
  'shishiguchiya': 'dataShishiguchiyaRole',
  'odanba-fishing': 'dataOdanbaRole',
} as const satisfies Record<string, LocaleKey>;

/**
 * Mobility line label, keyed by `{routeId}.{fromStep}-{toStep}`. The frozen
 * journey takes the bus 氷川 ⇄ 丹三郎 (steps 1-2 and 3-4); the in-丹三郎 and
 * in-氷川 segments are walks (default).
 */
const ROUTE_MOBILITY_LABEL_KEYS: Record<string, LocaleKey> = {
  'okutama-wasabi-journey.1-2': 'dataRouteMobilityBus',
  'okutama-wasabi-journey.3-4': 'dataRouteMobilityBus',
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

/**
 * S4 story screen fields that resolve to a per-culture bundle key (Issue
 * #123). The whole editorial layout reads through these, so a future verified
 * Region × FoodCulture supplies its own story as data/config — no shared-flow
 * redesign and no mislabeled fallback copy.
 */
export type StoryField =
  | 'name'
  | 'lead'
  | 'area'
  | 'history'
  | 'story'
  | 'makerName'
  | 'makerRole'
  | 'maker'
  | 'craft'
  | 'howToEnjoy'
  | 'challenge'
  | 'support'
  | 'heroKicker'
  | 'craftMediaAlt'
  | 'ctaSub'
  | 'stickyCta';

/** Every key the S4 story layout needs before it can render a culture. */
export interface StoryContentKeys {
  name: LocaleKey;
  lead: LocaleKey;
  area: LocaleKey;
  history: LocaleKey;
  story: LocaleKey;
  makerName: LocaleKey;
  makerRole: LocaleKey;
  maker: LocaleKey;
  craft: LocaleKey;
  howToEnjoy: LocaleKey;
  challenge: LocaleKey;
  support: LocaleKey;
  /** Hero kicker framing (e.g. "東京わさびの物語"), per story. */
  heroKicker: LocaleKey;
  /** Craft-section media alt text, per story. */
  craftMediaAlt: LocaleKey;
  /** Route-CTA supporting copy, per story. */
  ctaSub: LocaleKey;
  /** Sticky route-CTA label, per story. */
  stickyCta: LocaleKey;
  /**
   * Municipality-agriculture context id shown on this story, when one exists
   * (Issue #128). Absent for any culture whose Story has no municipality
   * evidence — a future Ome/Hachioji Story must never show Okutama census.
   */
  municipalityId?: string;
  /**
   * Template key for the municipality-evidence reference note (Issue #128),
   * when the story carries municipality context. The copy is story-specific:
   * a future municipality statistic is never labeled with another region's
   * name.
   */
  challengeEvidence?: LocaleKey;
}

/**
 * Okutama's six-digit 全国地方公共団体コード. Kept in sync with
 * `OKUTAMA_MUNICIPALITY_ID` in `src/data/municipality-agriculture.ts` (the
 * repo's canonical id for the Okutama municipality profile).
 */
const OKUTAMA_MUNICIPALITY_CODE = '133086';

/** The 8/23 demo supplies full story content for 東京わさび only. */
export const STORY_DATA_KEYS: Record<
  string,
  Partial<Record<StoryField, LocaleKey>> & {
    municipalityId?: string;
    challengeEvidence?: LocaleKey;
  }
> = {
  'wasabi-okutama': {
    name: 'dataWasabiName',
    lead: 'dataStoryLead',
    area: 'areaOkutama',
    history: 'dataWasabiHistory',
    story: 'dataWasabiStory',
    makerName: 'dataStoryMakerName',
    makerRole: 'dataStoryMakerRole',
    maker: 'dataWasabiMaker',
    craft: 'dataStoryCraft',
    howToEnjoy: 'dataWasabiHowToEnjoy',
    challenge: 'dataStoryChallenge',
    support: 'dataStorySupport',
    heroKicker: 's4HeroKicker',
    craftMediaAlt: 's4CraftMediaAlt',
    ctaSub: 's4CtaSub',
    stickyCta: 's4StickyCta',
    municipalityId: OKUTAMA_MUNICIPALITY_CODE,
    challengeEvidence: 'dataStoryChallengeEvidence',
  },
};

const STORY_REQUIRED_FIELDS: readonly StoryField[] = [
  'name',
  'lead',
  'area',
  'history',
  'story',
  'makerName',
  'makerRole',
  'maker',
  'craft',
  'howToEnjoy',
  'challenge',
  'support',
  'heroKicker',
  'craftMediaAlt',
  'ctaSub',
  'stickyCta',
];

/**
 * Resolve a culture's complete S4 story key set, or `undefined` when any field
 * is missing. The Story screen renders only cultures with full content so an
 * un-authored culture shows the honest empty state instead of a mislabeled
 * article.
 */
export function storyContent(id: string): StoryContentKeys | undefined {
  const entry = STORY_DATA_KEYS[id];
  if (!entry) return undefined;
  const keys: Partial<StoryContentKeys> = {};
  for (const field of STORY_REQUIRED_FIELDS) {
    const key = entry[field];
    if (!key) return undefined;
    keys[field] = key;
  }
  if (entry.municipalityId) keys.municipalityId = entry.municipalityId;
  if (entry.challengeEvidence) keys.challengeEvidence = entry.challengeEvidence;
  return keys as StoryContentKeys;
}

/**
 * Route-specific advisory/observation copy, keyed by route id (Issue #83).
 * Only the demo route carries a weekend-morning crowding observation today;
 * any other route renders no advisory rather than Okutama's hedged field note.
 */
export const ROUTE_ADVISORY_KEYS: Record<
  string,
  { advisory: LocaleKey; source: LocaleKey }
> = {
  'okutama-wasabi-journey': { advisory: 's5CrowdingAdvisory', source: 's5CrowdingSource' },
};

/** Resolve a route's advisory copy keys, or `undefined` when it has none. */
export function routeAdvisoryKeys(routeId: string): { advisory: LocaleKey; source: LocaleKey } | undefined {
  return ROUTE_ADVISORY_KEYS[routeId];
}
