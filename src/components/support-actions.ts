/**
 * S7 support-action content boundary (Issue #46, #68, #177).
 *
 * Shared support UI must never infer one Region × FoodCulture from another.
 * The safe default below is deliberately generic and conservative: unsupported
 * external actions stay disabled and no destination is guessed. The frozen
 * Okutama × Tokyo Wasabi journey keeps its existing, explicitly scoped copy and
 * confirmed tourism-association destination.
 *
 * This is intentionally a thin journey selector, not the #170 Slice Manifest:
 * there are only two current behaviors — the approved Wasabi pilot override and
 * the safe generic fallback used by Ome/Sawai and any unknown future context.
 */
import type { Locale } from '../i18n/resources';

/** The model route rendered by the standalone Support page and pilot actions. */
export const MODEL_ROUTE_ID = 'okutama-wasabi-journey';

export type SupportActionId = 'buy' | 'visit' | 'reserve' | 'donate' | 'share' | 'save';

export type SupportActionKind = 'external' | 'save' | 'disabled';

export interface SupportActionItem {
  id: SupportActionId;
  icon: string;
  titleJa: string;
  titleEn: string;
  /** zh-TW title (Issue #68) — avoids the English fallback under zh-TW. */
  titleZh: string;
  /** What this action means for the active journey. */
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

/** The Wasabi pilot's confirmed official tourism destination. Never generic. */
export const CONFIRMED_VISIT_URL = 'https://www.okutokanko.jp/';

/**
 * Safe shared default. This is what Ome/Sawai receives today: no Wasabi copy,
 * no Okutama destination, and no unsupported booking/donation/share success.
 */
export const SUPPORT_ACTIONS: readonly SupportActionItem[] = [
  {
    id: 'buy',
    icon: '🛒',
    titleJa: '買う',
    titleEn: 'Buy',
    titleZh: '購買',
    meaningJa:
      '地域の商品を選んで買うことは、作り手や文化を知る接点になります。購入先は公式情報で確認してください。',
    meaningEn:
      'Choosing products from the region can be a point of connection with its makers and culture. Check official information for where to buy.',
    meaningZh: '購買地區商品，可以成為認識製作者與文化的接點。購買地點請以官方資訊為準。',
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
    meaningJa:
      '現地を訪れることは、その土地の風景や文化を知る接点になります。受け入れ情報は事前に公式情報で確認してください。',
    meaningEn:
      'Visiting in person can be a point of connection with the place and its culture. Check official visitor information before going.',
    meaningZh: '親自到訪可以成為認識當地風景與文化的接點。出發前請先確認官方的接待資訊。',
    externalUrl: null,
    available: false,
    kind: 'disabled',
  },
  {
    id: 'reserve',
    icon: '📅',
    titleJa: '予約する',
    titleEn: 'Reserve',
    titleZh: '預約',
    meaningJa:
      '公式に案内された体験や訪問がある場合のみ、予約条件を確認して参加を検討できます。',
    meaningEn:
      'When an official experience or visit is offered, check its booking conditions before planning to join.',
    meaningZh: '只有在官方提供體驗或參訪時，請先確認預約條件，再規劃是否參加。',
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
    meaningJa: '公式の寄付先が確認できた場合のみ案内します。',
    meaningEn: 'A donation option is shown only when an official destination has been confirmed.',
    meaningZh: '只有在確認到官方捐款管道時，才會提供相關資訊。',
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
    meaningJa: 'ストーリーを共有することは、地域の食文化を知る人を増やすきっかけになります。',
    meaningEn: 'Sharing the story can help more people discover the region’s food culture.',
    meaningZh: '分享故事，可以成為讓更多人認識地區食文化的契機。',
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
    meaningJa: '旅程として保存しておけば、関心を将来の訪問計画につなげられます。',
    meaningEn: 'Saving the journey keeps this interest available for a future visit plan.',
    meaningZh: '儲存這段旅程，可以把現在的興趣保留到之後的造訪規劃。',
    externalUrl: null,
    available: true,
    kind: 'save',
  },
];

/**
 * Existing Wasabi-pilot support behavior, explicitly owned by that journey.
 * Keeping it separate prevents its copy and external URL from becoming the
 * default contract for every Region × FoodCulture.
 */
const WASABI_SUPPORT_ACTIONS: readonly SupportActionItem[] = [
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
 * Resolve support content from the active journey. Unknown/no context fails to
 * the safe generic list instead of inheriting another journey's semantics.
 */
export function supportActionsForJourney(
  routeId?: string,
): readonly SupportActionItem[] {
  return routeId === MODEL_ROUTE_ID ? WASABI_SUPPORT_ACTIONS : SUPPORT_ACTIONS;
}

/** Resolve an action title for the active locale (ja / en / zh-TW). */
export function actionTitle(item: SupportActionItem, locale: Locale): string {
  if (locale === 'ja') return item.titleJa;
  return locale === 'zh-TW' ? item.titleZh : item.titleEn;
}

/** Resolve an action meaning for the active locale (ja / en / zh-TW). */
export function actionMeaning(item: SupportActionItem, locale: Locale): string {
  if (locale === 'ja') return item.meaningJa;
  return locale === 'zh-TW' ? item.meaningZh : item.meaningEn;
}
