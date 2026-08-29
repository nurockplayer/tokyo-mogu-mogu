import {
  getMunicipalityAgricultureById,
  municipalityIndicatorValue,
  MUNICIPALITY_INDICATOR_KEYS,
} from '../data';
import type {
  DataOrigin,
  DataSource,
  FoodCulture,
  Place,
  SpotDetail,
  VerificationStatus,
} from '../data';
import { isFixedPlace } from '../data';
import { storyContent } from '../i18n/data-content';
import { resolveKey } from '../i18n/fallback';
import { DEFAULT_LOCALE, strings, type LocaleKey } from '../i18n/resources';
import {
  deriveVerificationStatus,
  listUnverifiedFields,
  recordVerificationStatus,
  type ReviewField,
} from './verification';

export const UNKNOWN_JA = '不明（未確認）';

export interface StakeholderReviewPacketInput {
  foodCulture: FoodCulture;
  place: Place;
  spot?: SpotDetail;
  generatedAt: string;
  /** Optional adapter-provided context, e.g. a time-bounded demo disclaimer. */
  contextNoteJa?: string;
}

const STATUS_JA: Record<VerificationStatus, string> = {
  verified: '確認済み',
  needs_confirmation: '要確認',
  stale: '要再確認（古い可能性）',
  conflict: '情報に矛盾あり',
  demo: 'デモデータ',
};

const REVIEW_FIELD_JA = {
  address: '住所', coordinates: '位置情報', hours: '営業時間', closedDays: '定休日',
  price: '価格帯', reservation: '予約要否', bookingDestination: '予約方法・URL', access: 'アクセス',
  multilingualSupport: '英語・多言語対応', dietaryAllergy: 'Vegetarian / Vegan・アレルギー対応',
  accessibility: 'アクセシビリティ', storyWording: 'Spot 紹介文', makerWording: '事業者・生産者の説明',
  photoReusePermission: '写真利用許可', facts: 'FoodCulture の事実・表現',
} satisfies Record<ReviewField, string>;

function value(value: string | number | boolean | undefined): string {
  if (value === undefined || value === '') return UNKNOWN_JA;
  return String(value).replaceAll('|', '\\|').replaceAll('\n', '<br>');
}

function fieldStatus(current: unknown, status?: VerificationStatus): string {
  return current === undefined || current === '' ? '要確認' : status ? STATUS_JA[status] : '要確認';
}

function sourceLine(source: DataSource, origin: DataOrigin): string {
  const status = deriveVerificationStatus(source, origin);
  return `- ${source.name} — ${source.url ? `[参照](${source.url})` : 'URL: ' + UNKNOWN_JA}; 取得日: ${source.retrievedAt ?? UNKNOWN_JA}; 確認日: ${source.confirmedAt ?? UNKNOWN_JA}; 状態: ${STATUS_JA[status]}`;
}

/** One app-visible Story narrative field, resolved to Japanese copy. */
export interface StoryNarrativeField {
  label: string;
  value: string;
}

/** Municipality census context attached to a Story (Issue #128), when present. */
export interface StoryMunicipalityEvidence {
  municipalityNameJa: string;
  censusYear: number;
  censusSurveyDate: string;
  /** The Story's own rendered census reference note, exactly what StoryPage shows. */
  referenceNote?: string;
  /** The census indicator facts behind the reference note (definition + value). */
  indicators: Array<{ definitionJa: string; value: string }>;
  /** e-Stat provenance. */
  source: DataSource;
  origin: DataOrigin;
  /** Interpretation boundary: municipality aggregate is not direct succession evidence. */
  interpretationNoteJa: string;
}

/** The canonical app-visible Story content/evidence for one food culture. */
export interface StoryEvidence {
  narrative: StoryNarrativeField[];
  municipality?: StoryMunicipalityEvidence;
}

/** `{name}` template interpolation, mirroring StoryPage's `format`. */
function formatTemplate(template: string, values: Record<string, string | number>): string {
  return template.replace(/\{(\w+)\}/g, (match, key: string) =>
    key in values ? String(values[key]) : match,
  );
}

/**
 * Resolve the app-visible Story content and (optional) municipality census
 * evidence from the same canonical contract StoryPage renders: the per-culture
 * `storyContent` map resolved through the shared i18n bundle, plus the story's
 * own `municipalityId` census context (Issue #128). This is generic — no
 * Okutama / Tokyo-Wasabi assumption. A culture without a full Story resolves to
 * `undefined`; a Story without a `municipalityId` simply carries no census
 * evidence, so a non-Okutama Story never receives Okutama's census.
 */
export function resolveStoryEvidence(foodCultureId: string): StoryEvidence | undefined {
  const content = storyContent(foodCultureId);
  if (!content) return undefined;
  const t = (key: LocaleKey) => resolveKey(strings, DEFAULT_LOCALE, key);

  const narrative: StoryNarrativeField[] = [
    { label: 'Story タイトル', value: t(content.name) },
    { label: 'Story リード', value: t(content.lead) },
    { label: '地域', value: t(content.area) },
    { label: '歴史・地域背景', value: t(content.history) },
    { label: 'Story 本文', value: t(content.story) },
    { label: '作り手名', value: t(content.makerName) },
    { label: '作り手の役割', value: t(content.makerRole) },
    { label: '作り手の説明', value: t(content.maker) },
    { label: '作り手注記', value: t('s4MakerNote') },
    { label: '技・知恵', value: t(content.craft) },
    { label: '楽しみ方', value: t(content.howToEnjoy) },
    { label: '現在の課題', value: t(content.challenge) },
    { label: '編集注記', value: t('s4EditorialNote') },
    { label: '応援の説明', value: t(content.support) },
    { label: 'Story CTA 補足', value: t(content.ctaSub) },
  ];

  const profile = content.municipalityId
    ? getMunicipalityAgricultureById(content.municipalityId)
    : undefined;
  if (!profile) {
    return { narrative };
  }

  const entities = municipalityIndicatorValue(
    profile,
    MUNICIPALITY_INDICATOR_KEYS.agriculturalEntities,
  );
  const referenceNote = content.challengeEvidence && entities !== undefined
    ? formatTemplate(t(content.challengeEvidence), { n: entities })
    : undefined;

  return {
    narrative,
    municipality: {
      municipalityNameJa: profile.nameJa,
      censusYear: profile.censusYear,
      censusSurveyDate: profile.censusSurveyDate,
      referenceNote,
      indicators: profile.indicators.map((indicator) => ({
        definitionJa: indicator.definitionJa,
        value: indicator.suppressed
          ? '非公表（統計法による開示制限）'
          : `${indicator.value ?? '—'}${indicator.unitJa}`,
      })),
      source: profile.source,
      origin: profile.origin,
      interpretationNoteJa: profile.interpretationNoteJa,
    },
  };
}

/** Render the municipality census reference section (Issue #128), when present. */
function municipalitySection(municipality: StoryMunicipalityEvidence): string {
  const lines = [
    '## 市町村別の参考情報（農林業センサス）',
    '',
    'この Story は市町村単位の農業集計（農林業センサス）を補足情報として表示しています。個々の生産者や特定の作物の状態を示す直接の証拠ではありません。',
    '',
    `- 集計対象: ${municipality.municipalityNameJa}（${municipality.censusYear}年・調査基準日 ${municipality.censusSurveyDate}）`,
  ];
  if (municipality.referenceNote) {
    lines.push(`- 表示している参考情報: ${municipality.referenceNote}`);
  }
  for (const indicator of municipality.indicators) {
    lines.push(`- ${indicator.definitionJa}: ${indicator.value}`);
  }
  lines.push(`- 解釈の範囲: ${municipality.interpretationNoteJa}`);
  lines.push('');
  lines.push(sourceLine(municipality.source, municipality.origin));
  return lines.join('\n');
}

/** Generate a Japanese-first Markdown packet from canonical live records. */
export function generateStakeholderReviewPacket(input: StakeholderReviewPacketInput): string {
  const { foodCulture, place, spot, generatedAt, contextNoteJa } = input;
  const reviewEntries = [...listUnverifiedFields({
    places: [place],
    foodCultures: [foodCulture],
    spots: spot ? [spot] : [],
  })];
  const spotStatus = spot ? deriveVerificationStatus(spot.source, spot.origin) : undefined;
  const cultureStatus = recordVerificationStatus(foodCulture.sources, foodCulture.origin);
  const languageNeedsReview = !spot?.tags.language || spot.tags.language.length === 0;
  const languages = spot?.tags.language === undefined
    ? undefined
    : spot.tags.language.length > 0 ? spot.tags.language.join(', ') : '空の配列（対応言語の確認なし）';
  const dietaryNeedsReview = spot
    ? spot.tags.vegetarian === undefined || spot.tags.allergyNotice === undefined
    : true;
  const dietary = spot && !(
    spot.tags.vegetarian === undefined && spot.tags.allergyNotice === undefined
  )
    ? [
        spot.tags.vegetarian === undefined ? 'Vegetarian / Vegan: 未確認' : `Vegetarian / Vegan: ${spot.tags.vegetarian}`,
        spot.tags.allergyNotice === undefined ? 'アレルギー対応: 未確認' : `アレルギー対応: ${spot.tags.allergyNotice}`,
      ].join(' / ')
    : undefined;

  const storyEvidence = resolveStoryEvidence(foodCulture.id);
  const narrativeRows: Array<[string, string, string]> = (storyEvidence?.narrative ?? []).map(
    ({ label, value: current }) => [label, current, STATUS_JA[cultureStatus]],
  );

  const sourceEntries: Array<{ source: DataSource; origin: DataOrigin }> = [
    ...foodCulture.sources.map((source) => ({ source, origin: foodCulture.origin })),
    { source: place.source, origin: place.origin },
    ...(spot ? [{ source: spot.source, origin: spot.origin }] : []),
    ...(storyEvidence?.municipality
      ? [{ source: storyEvidence.municipality.source, origin: storyEvidence.municipality.origin }]
      : []),
  ].filter(
    (entry, index, all) => all.findIndex(
      (item) => item.source.name === entry.source.name && item.source.url === entry.source.url,
    ) === index,
  );

  const placeStatus = deriveVerificationStatus(place.source, place.origin);
  const rows: Array<[string, string | undefined, string]> = [
    ['FoodCulture 名', foodCulture.nameJa, STATUS_JA[cultureStatus]],
    ['FoodCulture 概要', foodCulture.descriptionJa, STATUS_JA[cultureStatus]],
    ...narrativeRows,
    ['施設・事業者名', place.nameJa, STATUS_JA[placeStatus]],
    ...(isFixedPlace(place) ? [
      ['住所', place.address, STATUS_JA[placeStatus]],
      ['位置情報', `${place.latitude}, ${place.longitude}（${place.coordinatePrecision ?? '精度未指定'}）`, STATUS_JA[placeStatus]],
    ] satisfies Array<[string, string, string]> : [
      ['営業形態', '固定店舗のない移動型会場', STATUS_JA[placeStatus]],
      ['主な出店エリア', place.mobileVenue.primaryOperatingAreaJa, STATUS_JA[placeStatus]],
    ] satisfies Array<[string, string, string]>),
    ['Spot 紹介文', spot?.roleJa, fieldStatus(spot?.roleJa, spotStatus)],
    ['営業時間', spot?.practical?.hoursJa, fieldStatus(spot?.practical?.hoursJa, spotStatus)],
    ['定休日', spot?.practical?.closedDaysJa, fieldStatus(spot?.practical?.closedDaysJa, spotStatus)],
    ['価格帯', spot?.practical?.priceJa, fieldStatus(spot?.practical?.priceJa, spotStatus)],
    ['予約要否', spot?.practical?.reservationAvailable === undefined ? undefined : `reservationAvailable: ${spot.practical.reservationAvailable}`, fieldStatus(spot?.practical?.reservationAvailable, spotStatus)],
    ['予約方法・URL', undefined, '要確認'],
    ['アクセス', spot?.practical?.accessJa, fieldStatus(spot?.practical?.accessJa, spotStatus)],
    ['英語・多言語対応', languages, languageNeedsReview ? '要確認' : fieldStatus(languages, spotStatus)],
    ['Vegetarian / Vegan・アレルギー対応', dietary, dietaryNeedsReview ? '要確認' : fieldStatus(dietary, spotStatus)],
    ['アクセシビリティ', spot?.tags.accessibility === undefined ? undefined : `accessibility: ${spot.tags.accessibility}`, fieldStatus(spot?.tags.accessibility, spotStatus)],
    ['写真利用許可', undefined, '要確認'],
    ['来訪に適した時間帯・季節', undefined, '要確認'],
    ['来訪増加で避けたい負荷', undefined, '要確認'],
  ];

  if (spot) {
    const missingFields = [
      ['hours', spot.practical?.hoursJa], ['closedDays', spot.practical?.closedDaysJa],
      ['price', spot.practical?.priceJa], ['reservation', spot.practical?.reservationAvailable],
      ['bookingDestination', undefined], ['access', spot.practical?.accessJa],
      ['multilingualSupport', languageNeedsReview ? undefined : languages],
      ['dietaryAllergy', dietaryNeedsReview ? undefined : dietary], ['accessibility', spot.tags.accessibility],
      ['photoReusePermission', undefined],
    ] as const;
    for (const [field, current] of missingFields) {
      if (current !== undefined && current !== '') continue;
      if (!reviewEntries.some((entry) => entry.recordType === 'spot' && entry.recordId === spot.placeId && entry.field === field)) {
        reviewEntries.push({ recordType: 'spot', recordId: spot.placeId, field, status: 'needs_confirmation', source: spot.source.name });
      }
    }
  }

  const sections = [
    `# 掲載内容確認シート：${place.nameJa}`,
    `> 生成日: ${generatedAt}\n> 対象: ${foodCulture.area} / ${foodCulture.nameJa} / ${place.nameJa}\n> このシートは現在の App 表示内容の確認用です。Product 全体は東京都全域 × 複数地域 × 複数食文化を対象にします。${contextNoteJa ? `\n> ${contextNoteJa}` : ''}`,
    `プロトタイプを作りました。実際に掲載するとしたら、間違っているところや直したほうがいいところを教えていただけませんか。`,
    `## 現在の表示内容\n\n| 項目 | 現在値 | 状態 | 修正・確認結果 |\n|---|---|---|---|\n` +
      rows.map(([label, current, status]) => `| ${label} | ${value(current)} | ${status} |  |`).join('\n'),
    `## 出典\n\n${sourceEntries.map(({ source, origin }) => sourceLine(source, origin)).join('\n')}`,
    `## 自動抽出された確認項目 (#129)\n\n` +
      (reviewEntries.length > 0
        ? reviewEntries.map((entry) => `- [ ] ${REVIEW_FIELD_JA[entry.field]} — ${STATUS_JA[entry.status]} / 出典: ${entry.source}`).join('\n')
        : '- 確認待ち項目なし'),
    `## 反映手順\n\n1. 修正内容と確認者・確認日を記録する。\n2. \`${foodCulture.id}\` / \`${place.id}\` の canonical data record を修正し、資料だけに事実を残さない。\n3. 確認できた source に \`confirmedAt: YYYY-MM-DD\` を追加する。source 全体の表示項目を確認できた場合のみ \`verificationStatus: 'verified'\` にする。一部だけなら \`needs_confirmation\` を維持する。\n4. アプリで表示、出典、unknown 表示を再確認する。`,
  ];

  if (storyEvidence?.municipality) {
    sections.splice(4, 0, municipalitySection(storyEvidence.municipality));
  }

  return sections.join('\n\n');
}
