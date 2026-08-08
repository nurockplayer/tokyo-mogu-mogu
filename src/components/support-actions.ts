/**
 * Deterministic S7 support-action list (Issue #46).
 *
 * The six actions (買う / 訪れる / 予約する / 寄付する / 共有する / 保存する)
 * with the cultural-succession meaning copy for each, in ja + en.
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
export type SupportActionId = 'buy' | 'visit' | 'reserve' | 'donate' | 'share' | 'save';

export type SupportActionKind = 'external' | 'save' | 'disabled';

export interface SupportActionItem {
  id: SupportActionId;
  icon: string;
  titleJa: string;
  titleEn: string;
  /** What this action means for cultural succession. */
  meaningJa: string;
  meaningEn: string;
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
    meaningJa: '生産者のわさび加工品を買うことが、作り手の暮らしと技術の継承を直接支えます。',
    meaningEn:
      "Buying the maker's wasabi products directly supports their livelihood and keeps the craft alive.",
    externalUrl: null,
    available: false,
    kind: 'disabled',
  },
  {
    id: 'visit',
    icon: '📍',
    titleJa: '訪れる',
    titleEn: 'Visit',
    meaningJa: '現地を訪れて実際の風景や作り手を知ることは、地域の営みを守り続ける力になります。',
    meaningEn:
      "Visiting in person and meeting the makers keeps the region's way of life going.",
    externalUrl: CONFIRMED_VISIT_URL,
    available: true,
    kind: 'external',
  },
  {
    id: 'reserve',
    icon: '📅',
    titleJa: '予約する',
    titleEn: 'Reserve',
    meaningJa: '体験や宿泊の予約は、受け入れ先に確かな需要を届け、受け継ぐ機会を増やします。',
    meaningEn:
      'Reserving an experience or stay delivers real demand that keeps succession opportunities open.',
    externalUrl: null,
    available: false,
    kind: 'disabled',
  },
  {
    id: 'donate',
    icon: '💌',
    titleJa: '寄付する',
    titleEn: 'Donate',
    meaningJa: '寄付は、文化や技術を次世代へつなぐ取り組みの資金になります。',
    meaningEn: 'Donations fund the efforts that pass this culture and craft on.',
    externalUrl: null,
    available: false,
    kind: 'disabled',
  },
  {
    id: 'share',
    icon: '📣',
    titleJa: '共有する',
    titleEn: 'Share',
    meaningJa: 'ストーリーを共有すると、関心の輪が広がり、新しい担い手や訪問者を生みます。',
    meaningEn:
      'Sharing the story widens the circle of interest and brings new visitors and successors.',
    externalUrl: null,
    available: false,
    kind: 'disabled',
  },
  {
    id: 'save',
    icon: '🔖',
    titleJa: '保存する',
    titleEn: 'Save',
    meaningJa: '旅程として保存しておけば、この関心を実際の訪問につなげられます。',
    meaningEn: "Saving this to your route turns today's interest into a real visit.",
    externalUrl: null,
    available: true,
    kind: 'save',
  },
];
