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
  // Ome/Sawai sake slice (Issue #163 / #177). `dataSakeStory` currently contains
  // an unsupported local-rice implication ("this land's rice"). Until that
  // source copy is corrected in the canonical bundle, every production bridge
  // deliberately resolves the story field to the source-backed description
  // instead. This is a conservative content downgrade, not invented evidence.
  'sake-ome': {
    name: 'dataSakeName',
    description: 'dataSakeDescription',
    story: 'dataSakeDescription',
    history: 'dataSakeHistory',
    maker: 'dataSakeMaker',
    howToEnjoy: 'dataSakeHowToEnjoy',
  },
  // Names for the other cultures surfaced on the S6 route spots' "related food
  // cultures" list (Issue #67). Only `name` is mapped — the full record content
  // for these cultures is out of the S3–S8 demo journey scope.
  'yamame-okutama': { name: 'dataYamameName' },
  'okutama-soba': { name: 'dataOkutamaSobaName' },
  'okutama-konnyaku': { name: 'dataOkutamaKonnyakuName' },
  // Remaining editorial seed cultures surfaced on the Discover "other cultures"
  // section. They get the same per-culture name key so zh-TW resolves through
  // the bundle instead of falling back to the record's English name.
  'kumma-hyakka-ome': { name: 'dataKummaHyakkaName' },
  'uguisu-mochi-ome': { name: 'dataUguisuMochiName' },
  'yuzu-hinode': { name: 'dataHinodeYuzuName' },
};

/** A route keyed by its record id. */
export const ROUTE_DATA_KEYS = {
  'okutama-wasabi-journey': {
    name: 'dataRouteName',
    area: 'areaOkutama',
    transport: 'dataRouteTransport',
  },
  'ome-sawai-sake-journey': {
    name: 'dataSakeRouteName',
    area: 'areaOme',
    transport: 'dataSakeRouteTransport',
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
  // Ome/Sawai sake journey (Issue #163). The seed role copy is identical across
  // durations for each stop, so each place shares one key; 馬場家御師住宅 appears
  // only in the 1-day variant, so both duration entries map to its single key.
  'ome-sawai-sake-journey.sawai-ozawa-shuzo.half-day': 'dataSakeStopRoleOzawa',
  'ome-sawai-sake-journey.sawai-ozawa-shuzo.1-day': 'dataSakeStopRoleOzawa',
  'ome-sawai-sake-journey.sawanoien-garden.half-day': 'dataSakeStopRoleSawanoien',
  'ome-sawai-sake-journey.sawanoien-garden.1-day': 'dataSakeStopRoleSawanoien',
  'ome-sawai-sake-journey.mitake-shrine.half-day': 'dataSakeStopRoleMitakeShrine',
  'ome-sawai-sake-journey.mitake-shrine.1-day': 'dataSakeStopRoleMitakeShrine',
  'ome-sawai-sake-journey.baba-oshijutaku.half-day': 'dataSakeStopRoleBaba',
  'ome-sawai-sake-journey.baba-oshijutaku.1-day': 'dataSakeStopRoleBaba',
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
  // Ome/Sawai sake journey places (Issue #163).
  'sawai-ozawa-shuzo': { name: 'dataPlaceOzawaName' },
  'sawanoien-garden': { name: 'dataPlaceSawanoienName' },
  'mitake-shrine': { name: 'dataPlaceMitakeShrineName' },
  'baba-oshijutaku': { name: 'dataPlaceBabaName' },
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
  // Ome/Sawai sake journey spots (Issue #163).
  'sawai-ozawa-shuzo': 'dataOzawaRole',
  'sawanoien-garden': 'dataSawanoienRole',
  'mitake-shrine': 'dataMitakeShrineRole',
  'baba-oshijutaku': 'dataBabaRole',
} as const satisfies Record<string, LocaleKey>;

/**
 * Mobility line label, keyed by `{routeId}.{fromStep}-{toStep}`. The frozen
 * journey takes the bus 氷川 ⇄ 丹三郎 (steps 1-2 and 3-4); the in-丹三郎 and
 * in-氷川 segments are walks. The Ome/Sawai journey's only non-walk segment is
 * steps 2-3 (JR Ome Line & Mitake Tozan cable car). All walk segments resolve
 * through the three-locale `dataRouteMobilityWalk` key (徒歩 / Walk / 步行).
 */
const ROUTE_MOBILITY_LABEL_KEYS: Record<string, LocaleKey> = {
  'okutama-wasabi-journey.1-2': 'dataRouteMobilityBus',
  'okutama-wasabi-journey.2-3': 'dataRouteMobilityWalk',
  'okutama-wasabi-journey.3-4': 'dataRouteMobilityBus',
  'okutama-wasabi-journey.4-5': 'dataRouteMobilityWalk',
  'ome-sawai-sake-journey.1-2': 'dataRouteMobilityWalk',
  'ome-sawai-sake-journey.2-3': 'dataSakeMobilityCableCar',
  'ome-sawai-sake-journey.3-4': 'dataRouteMobilityWalk',
} as const satisfies Record<string, LocaleKey>;

/** The bridge helpers below are pure id → key lookups (used by page code). */
export function foodCultureKey(
  id: string,
  field: FoodCultureField,
): LocaleKey | undefined {
  return FOOD_CULTURE_DATA_KEYS[id]?.[field];
}

export function routeNameKey(id: string): LocaleKey | undefined {
  return ROUTE_DATA_KEYS[id as keyof typeof ROUTE_DATA_KEYS]?.name;
}

/** Route area label key when a per-route localized mapping exists. */
export function routeAreaKey(id: string): LocaleKey | undefined {
  return ROUTE_DATA_KEYS[id as keyof typeof ROUTE_DATA_KEYS]?.area;
}

/** Route transport label key when a per-route localized mapping exists. */
export function routeTransportKey(id: string): LocaleKey | undefined {
  return ROUTE_DATA_KEYS[id as keyof typeof ROUTE_DATA_KEYS]?.transport;
}

export function stepRoleKey(routeId: string, placeId: string, duration: string): LocaleKey | undefined {
  return ROUTE_STEP_ROLE_KEYS[`${routeId}.${placeId}.${duration}`];
}

export function placeNameKey(id: string): LocaleKey | undefined {
  return PLACE_DATA_KEYS[id as keyof typeof PLACE_DATA_KEYS]?.name;
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

export function mobilityLabelKey(
  routeId: string,
  fromStep: number,
  toStep: number,
): LocaleKey | undefined {
  return ROUTE_MOBILITY_LABEL_KEYS[`${routeId}.${fromStep}-${toStep}`];
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

/** The 8/23 demo supplies full story content for 東京わさび and the Ome/Sawai
 *  sake slice (Issue #163). The sake story carries its own culture chrome keys
 *  (dataSakeHeroKicker etc.) — never wasabi's shared s4* chrome — and no
 *  municipalityId (no Ome municipality-agriculture profile exists).
 *
 * #177 source audit: the current `dataSakeStory` / `dataSakeStoryMakerRole`
 * bundle strings imply locally grown rice without evidence. Production S4
 * therefore uses the already source-backed `dataSakeDescription` story and
 * `dataOzawaRole` maker copy, rather than upgrading the evidence silently.
 */
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
  'sake-ome': {
    name: 'dataSakeName',
    lead: 'dataSakeStoryLead',
    area: 'areaOme',
    history: 'dataSakeHistory',
    story: 'dataSakeDescription',
    makerName: 'dataSakeStoryMakerName',
    makerRole: 'dataOzawaRole',
    maker: 'dataSakeMaker',
    craft: 'dataSakeStoryCraft',
    howToEnjoy: 'dataSakeHowToEnjoy',
    challenge: 'dataSakeStoryChallenge',
    support: 'dataSakeStorySupport',
    heroKicker: 'dataSakeHeroKicker',
    craftMediaAlt: 'dataSakeCraftMediaAlt',
    ctaSub: 'dataSakeCtaSub',
    stickyCta: 'dataSakeStickyCta',
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
