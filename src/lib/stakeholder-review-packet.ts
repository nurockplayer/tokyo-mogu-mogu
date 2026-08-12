import type { DataSource, FoodCulture, Place, SpotDetail, VerificationStatus } from '../data';
import { deriveVerificationStatus, listUnverifiedFields, recordVerificationStatus } from './verification';

export const UNKNOWN_JA = '不明（未確認）';

export interface StakeholderReviewPacketInput {
  foodCulture: FoodCulture;
  place: Place;
  spot?: SpotDetail;
  generatedAt: string;
  /** Optional adapter-provided context, e.g. a time-bounded demo disclaimer. */
  contextNoteJa?: string;
  /** Extra copy rendered by the live Story surface but stored outside FoodCulture. */
  storyVisibleCopy?: ReadonlyArray<{ label: string; value: string }>;
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
  price: '価格帯', reservation: '予約要否', bookingDestination: '予約方法・URL',
  multilingualSupport: '英語・多言語対応', dietaryAllergy: 'Vegetarian / Vegan・アレルギー対応',
  accessibility: 'アクセシビリティ', storyWording: 'Spot 紹介文', makerWording: '事業者・生産者の説明',
  photoReusePermission: '写真利用許可', facts: 'FoodCulture の事実・表現',
} as const;

function value(value: string | number | boolean | undefined): string {
  if (value === undefined || value === '') return UNKNOWN_JA;
  return String(value).replaceAll('|', '\\|').replaceAll('\n', '<br>');
}

function fieldStatus(current: unknown, status?: VerificationStatus): string {
  return current === undefined || current === '' ? '要確認' : status ? STATUS_JA[status] : '要確認';
}

function sourceLine(source: DataSource, origin: 'source' | 'editorial' | 'demo'): string {
  const status = deriveVerificationStatus(source, origin);
  return `- ${source.name} — ${source.url ? `[参照](${source.url})` : 'URL: ' + UNKNOWN_JA}; 取得日: ${source.retrievedAt ?? UNKNOWN_JA}; 確認日: ${source.confirmedAt ?? UNKNOWN_JA}; 状態: ${STATUS_JA[status]}`;
}

/** Generate a Japanese-first Markdown packet from canonical live records. */
export function generateStakeholderReviewPacket(input: StakeholderReviewPacketInput): string {
  const { foodCulture, place, spot, generatedAt, contextNoteJa, storyVisibleCopy = [] } = input;
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
  const sources = [...foodCulture.sources, place.source, ...(spot ? [spot.source] : [])]
    .filter((source, index, all) => all.findIndex((item) => item.name === source.name && item.url === source.url) === index);

  const placeStatus = deriveVerificationStatus(place.source, place.origin);
  const rows: Array<[string, string | undefined, string]> = [
    ['FoodCulture 名', foodCulture.nameJa, STATUS_JA[cultureStatus]],
    ['FoodCulture 概要', foodCulture.descriptionJa, STATUS_JA[cultureStatus]],
    ['Story 本文', foodCulture.storyJa, STATUS_JA[cultureStatus]],
    ['歴史・地域背景', foodCulture.historyJa, STATUS_JA[cultureStatus]],
    ['生産者・作り手の説明', foodCulture.makerJa, STATUS_JA[cultureStatus]],
    ['楽しみ方', foodCulture.howToEnjoyJa, STATUS_JA[cultureStatus]],
    ...storyVisibleCopy.map(({ label, value: current }) => [label, current, STATUS_JA[cultureStatus]] as [string, string, string]),
    ['施設・事業者名', place.nameJa, STATUS_JA[placeStatus]],
    ['住所', place.address, STATUS_JA[placeStatus]],
    ['位置情報', `${place.latitude}, ${place.longitude}（${place.coordinatePrecision ?? '精度未指定'}）`, STATUS_JA[placeStatus]],
    ['Spot 紹介文', spot?.roleJa, fieldStatus(spot?.roleJa, spotStatus)],
    ['営業時間', spot?.practical?.hoursJa, fieldStatus(spot?.practical?.hoursJa, spotStatus)],
    ['定休日', spot?.practical?.closedDaysJa, fieldStatus(spot?.practical?.closedDaysJa, spotStatus)],
    ['価格帯', spot?.practical?.priceJa, fieldStatus(spot?.practical?.priceJa, spotStatus)],
    ['予約要否', spot?.practical?.reservationAvailable === undefined ? undefined : `reservationAvailable: ${spot.practical.reservationAvailable}`, fieldStatus(spot?.practical?.reservationAvailable, spotStatus)],
    ['予約方法・URL', undefined, '要確認'],
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
      ['bookingDestination', undefined], ['multilingualSupport', languageNeedsReview ? undefined : languages],
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

  return `# 掲載内容確認シート：${place.nameJa}\n\n` +
    `> 生成日: ${generatedAt}\n> 対象: ${foodCulture.area} / ${foodCulture.nameJa} / ${place.nameJa}\n> このシートは現在の App 表示内容の確認用です。Product 全体は東京都全域 × 複数地域 × 複数食文化を対象にします。${contextNoteJa ? `\n> ${contextNoteJa}` : ''}\n\n` +
    `プロトタイプを作りました。実際に掲載するとしたら、間違っているところや直したほうがいいところを教えていただけませんか。\n\n` +
    `## 現在の表示内容\n\n| 項目 | 現在値 | 状態 | 修正・確認結果 |\n|---|---|---|---|\n` +
    rows.map(([label, current, status]) => `| ${label} | ${value(current)} | ${status} |  |`).join('\n') +
    `\n\n## 出典\n\n${sources.map((source) => sourceLine(source, source === place.source ? place.origin : source === spot?.source ? spot.origin : foodCulture.origin)).join('\n')}\n\n` +
    `## 自動抽出された確認項目 (#129)\n\n` +
    (reviewEntries.length > 0
      ? reviewEntries.map((entry) => `- [ ] ${REVIEW_FIELD_JA[entry.field]} — ${STATUS_JA[entry.status]} / 出典: ${entry.source}`).join('\n')
      : '- 確認待ち項目なし') +
    `\n\n## 反映手順\n\n1. 修正内容と確認者・確認日を記録する。\n2. \`${foodCulture.id}\` / \`${place.id}\` の canonical data record を修正し、資料だけに事実を残さない。\n3. 確認できた source に \`confirmedAt: YYYY-MM-DD\` を追加する。source 全体の表示項目を確認できた場合のみ \`verificationStatus: 'verified'\` にする。一部だけなら \`needs_confirmation\` を維持する。\n4. アプリで表示、出典、unknown 表示を再確認する。\n`;
}
