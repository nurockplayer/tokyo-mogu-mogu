/**
 * Deterministic S7 support-action list (Issue #46, #68).
 *
 * The six actions (買う / 訪れる / 予約する / 寄付する / 共有する / 保存する)
 * with the cultural-succession meaning copy for each, in ja + en + zh-TW.
 * The zh-TW title/meaning fields keep the panel from falling back to English
 * under the zh-TW locale (Issue #68), mirroring the #67 data-content pattern
 * without introducing a second locale mechanism.
 *
 * Availability rules:
 * - `kind === 'external'` has a confirmed, traceable `externalUrl` and is
 *   available. The only confirmed destination today reuses the official
 *   Okutama Tourism Association site already cited in the seed data
 *   (`src/data/seed-places.ts`), so no URL is invented.
 * - `kind === 'save'` is available through the local saved-route persistence
 *   (see `saved-routes.ts`) — it needs no external URL.
 * - `kind === 'disabled'` is unverified/unsupported and is never fake-success.
 */
import type { Locale } from '../i18n/resources';

export type SupportActionId = 'buy' | 'visit' | 'reserve' | 'donate' | 'share' | 'save';

export type SupportActionKind = 'external' | 'save' | 'disabled';

export interface SupportActionItem {
  id: SupportActionId;
  icon: string;
  titleJa: string;
  titleEn: string;
  /** zh-TW title (Issue #68) — avoids the English fallback under zh-TW. */
  titleZh: string;
  /** What this action means for cultural succession. */
  meaningJa: string;
  meaningEn: string;
  /** zh-TW meaning copy (Issue #68). */
  meaningZh: string;
  /** Confirmed external destination, or null when unconfirmed. */
  externalUrl: string | null;
  /** True when the action is genuinely actionable today. */
  available: boolean;
  kind: SupportActionKind;
}

/** The demo's only confirmed external destination (official Okutama tourism association site). */
export const CONFIRMED_VISIT_URL = 'https://www.okutokanko.jp/';

export const SUPPORT_ACTIONS: readonly SupportActionItem[] = [
  {
    id: 'buy',
    icon: '🛒',
    titleJa: '買う',
    titleEn: 'Buy',
    titleZh: '購買',
    meaningJa: '生産者のわさび加工品を買うことが、作り手の暮らしと技術の継承を直接支えます。',
    meaningEn:
      "Buying the maker's wasabi products directly supports their livelihood and keeps the craft alive.",
    meaningZh: '購買生產者的山葵加工品，直接支持他們的生活與技術的傳承。',
    externalUrl: null,
    available: false,
    kind: 'disabled',
  },
  {
    id: 'visit',
    icon: '📍',
    titleJa: '訪れる',
    titleEn: 'Visit',
    titleZh: '到訪',
    meaningJa: '現地を訪れて実際の風景や作り手を知ることは、地域の営みを守り続ける力になります。',
    meaningEn:
      "Visiting in person and meeting the makers keeps the region's way of life going.",
    meaningZh: '親自到訪當地，親眼見識風景、認識製作人，是持續守護這片土地生命力的力量。',
    externalUrl: CONFIRMED_VISIT_URL,
    available: true,
    kind: 'external',
  },
  {
    id: 'reserve',
    icon: '📅',
    titleJa: '予約する',
    titleEn: 'Reserve',
    titleZh: '預約',
    meaningJa: '体験や宿泊の予約は、受け入れ先に確かな需要を届け、受け継ぐ機会を増やします。',
    meaningEn:
      'Reserving an experience or stay delivers real demand that keeps succession opportunities open.',
    meaningZh: '預約體驗或住宿，能把明確的需求傳達給接待方，增加文化延續的機會。',
    externalUrl: null,
    available: false,
    kind: 'disabled',
  },
  {
    id: 'donate',
    icon: '💌',
    titleJa: '寄付する',
    titleEn: 'Donate',
    titleZh: '捐款',
    meaningJa: '寄付は、文化や技術を次世代へつなぐ取り組みの資金になります。',
    meaningEn: 'Donations fund the efforts that pass this culture and craft on.',
    meaningZh: '捐款將成為把文化與技術傳遞給下一代的經費。',
    externalUrl: null,
    available: false,
    kind: 'disabled',
  },
  {
    id: 'share',
    icon: '📣',
    titleJa: '共有する',
    titleEn: 'Share',
    titleZh: '分享',
    meaningJa: 'ストーリーを共有すると、関心の輪が広がり、新しい担い手や訪問者を生みます。',
    meaningEn:
      'Sharing the story widens the circle of interest and brings new visitors and successors.',
    meaningZh: '分享這個故事，能讓關注的圈子擴大，孕育新的參與者與到訪者。',
    externalUrl: null,
    available: false,
    kind: 'disabled',
  },
  {
    id: 'save',
    icon: '🔖',
    titleJa: '保存する',
    titleEn: 'Save',
    titleZh: '儲存',
    meaningJa: '旅程として保存しておけば、この関心を実際の訪問につなげられます。',
    meaningEn: "Saving this to your route turns today's interest into a real visit.",
    meaningZh: '儲存為旅程，就能把這份關注化為實際的到訪。',
    externalUrl: null,
    available: true,
    kind: 'save',
  },
];

/**
 * Resolve an action title for the active locale (ja / en / zh-TW).
 *
 * Kept as a pure helper so the panel and any test can assert all three
 * locales resolve without a `missing:` fallback (Issue #68).
 */
export function actionTitle(item: SupportActionItem, locale: Locale): string {
  if (locale === 'ja') return item.titleJa;
  return locale === 'zh-TW' ? item.titleZh : item.titleEn;
}

/**
 * Resolve an action's cultural-succession meaning for the active locale
 * (ja / en / zh-TW).
 */
export function actionMeaning(item: SupportActionItem, locale: Locale): string {
  if (locale === 'ja') return item.meaningJa;
  return locale === 'zh-TW' ? item.meaningZh : item.meaningEn;
}
