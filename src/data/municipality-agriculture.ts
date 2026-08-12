/**
 * Municipality-level agriculture context (Issue #128 / Linear TAC-8).
 *
 * Reusable, municipality-generic context for Tokyo-wide agriculture /
 * succession evidence. Okutama is the current demo/evidence record only;
 * other Tokyo municipalities can be added as additional records without
 * touching shared contracts (see product-scope-invariant: Okutama × Tokyo
 * Wasabi is the 2026-08-23 demo golden path only, not the Product domain).
 *
 * Data source: 農林水産省「2020年農林業センサス 市町村別統計表」, survey base date
 * 2020-02-01. This is currently the ONLY official municipality-level
 * agriculture census available: the 2025 census 確報 (published 2026-08-07)
 * is national/prefecture-level only — no municipality-level data was released
 * as of retrieval (2026-08-12). Per-municipality values below were verified
 * against the 西多摩地域統計年鑑 (西多摩地域広域行政圏協議会, 2021, PDF), which
 * compiles the same 2020 census tables for the western-Tama municipalities;
 * the PDF explicitly cites 農林水産省「2020年 農林業センサス」as its source.
 *
 * Safety / interpretation boundary (Issue #128):
 * - Municipality aggregate only. NEVER infer an individual producer's status
 *   or succession from these figures.
 * - A suppressed value ('x', 統計法 disclosure limit) is kept explicit.
 * - The data reflects 2020-02-01, not the current situation.
 * - One municipality does not generalize to all of Tokyo.
 * - No causal claims (e.g. why successors do or do not exist).
 */
import type { DataOrigin, DataSource } from './model';

/** Stable indicator keys (generic, municipality-agnostic). */
export const MUNICIPALITY_INDICATOR_KEYS = {
  /** 農業経営体数 — number of agricultural management entities. */
  agriculturalEntities: 'agriculturalEntities',
  /** 経営耕地面積 — cultivated land area (ha). */
  cultivatedLandHa: 'cultivatedLandHa',
  /** 林家数 — forest-owning households. */
  forestHouseholds: 'forestHouseholds',
  /** 保有山林面積 — owned forest area (ha). */
  ownedForestHa: 'ownedForestHa',
} as const;

export type MunicipalityIndicatorKey =
  (typeof MUNICIPALITY_INDICATOR_KEYS)[keyof typeof MUNICIPALITY_INDICATOR_KEYS];

/** One municipality-level agriculture indicator. */
export interface MunicipalityAgricultureIndicator {
  key: MunicipalityIndicatorKey;
  /** Published value; absent when the official source suppressed it ('x'). */
  value?: number;
  /** True when the official source suppressed the value (統計法 disclosure limit). */
  suppressed?: boolean;
  unitJa: string;
  unitEn: string;
  definitionJa: string;
  definitionEn: string;
}

/** Reusable normalized agriculture context for one Tokyo municipality. */
export interface MunicipalityAgricultureProfile {
  /** 全国地方公共団体コード (5 digits), e.g. '13308' = 奥多摩町. */
  municipalityId: string;
  nameJa: string;
  nameEn: string;
  /** Census survey base date (令和2年2月1日現在). */
  censusSurveyDate: string;
  /** Census reference year (the year the facts describe). */
  censusYear: number;
  indicators: MunicipalityAgricultureIndicator[];
  /** Provenance per the shared DataSource contract (Issue #129). */
  source: DataSource;
  /** Real census data — not editorial copy or a demo fixture. */
  origin: DataOrigin;
  /** What this data can / cannot say. */
  interpretationNoteJa: string;
  interpretationNoteEn: string;
}

/** The current demo/evidence municipality (8/23 golden path). */
export const OKUTAMA_MUNICIPALITY_ID = '13308';

export const MUNICIPALITY_AGRICULTURE_PROFILES: MunicipalityAgricultureProfile[] = [
  {
    municipalityId: OKUTAMA_MUNICIPALITY_ID,
    nameJa: '奥多摩町',
    nameEn: 'Okutama',
    censusSurveyDate: '2020-02-01',
    censusYear: 2020,
    indicators: [
      {
        key: MUNICIPALITY_INDICATOR_KEYS.agriculturalEntities,
        value: 1,
        unitJa: '経営体',
        unitEn: 'entities',
        definitionJa: '農業経営体数（経営耕地面積規模別経営体数の計）。',
        definitionEn: 'Agricultural management entities (total of the cultivated-area-size table).',
      },
      {
        key: MUNICIPALITY_INDICATOR_KEYS.cultivatedLandHa,
        suppressed: true,
        unitJa: 'ha',
        unitEn: 'ha',
        definitionJa: '経営耕地面積。奥多摩町は統計法による開示制限のため非公表（x）。',
        definitionEn: 'Cultivated land area. Suppressed (x) for Okutama under the Statistics Act disclosure rules.',
      },
      {
        key: MUNICIPALITY_INDICATOR_KEYS.forestHouseholds,
        value: 192,
        unitJa: '戸',
        unitEn: 'households',
        definitionJa: '林家数（森林を保有する世帯数）。',
        definitionEn: 'Forest-owning households.',
      },
      {
        key: MUNICIPALITY_INDICATOR_KEYS.ownedForestHa,
        value: 1946,
        unitJa: 'ha',
        unitEn: 'ha',
        definitionJa: '保有山林面積。',
        definitionEn: 'Area of owned forest land.',
      },
    ],
    source: {
      name: '農林水産省 2020年農林業センサス（市町村別統計表）',
      url: 'https://www.e-stat.go.jp/stat-search/files?toukei=00500209&tstat=000001032920',
      license: '政府標準利用規約（第2.0版）準拠・出典表示が必要（e-Stat）',
      sourceType: 'open_data',
      sourceDatasetId: '2020年農林業センサス 市町村別統計表（東京都分）',
      retrievedAt: '2026-08-12',
      verificationStatus: 'needs_confirmation',
      originalId: OKUTAMA_MUNICIPALITY_ID,
    },
    origin: 'source',
    interpretationNoteJa:
      'この指標は奥多摩町の市町村単位の集計です。個々の生産者やわさび農家の状態を表すものではなく、' +
      '後継者の有無や将来の継続を推測することはできません。2020年2月1日時点の調査であり、現在の状況ではありません。',
    interpretationNoteEn:
      'These indicators are Okutama-municipality aggregates. They describe no individual producer or wasabi farm, ' +
      'and cannot be used to infer succession status or future continuity. They reflect the census base date ' +
      '2020-02-01, not the current situation.',
  },
];

export function getMunicipalityAgricultureById(
  municipalityId: string,
): MunicipalityAgricultureProfile | undefined {
  return MUNICIPALITY_AGRICULTURE_PROFILES.find((p) => p.municipalityId === municipalityId);
}

/** Safely read a non-suppressed indicator value, or undefined when unavailable. */
export function municipalityIndicatorValue(
  profile: MunicipalityAgricultureProfile,
  key: MunicipalityIndicatorKey,
): number | undefined {
  const indicator = profile.indicators.find((i) => i.key === key);
  return indicator && !indicator.suppressed ? indicator.value : undefined;
}
