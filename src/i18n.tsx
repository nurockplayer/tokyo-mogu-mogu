/**
 * Minimal two-locale i18n (ja / en).
 *
 * The string keys below are UI chrome and navigation labels. Food culture and
 * place content lives on the data records themselves as {Ja, En} fields.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';

export type Locale = 'ja' | 'en';

export const strings = {
  ja: {
    appName: '東京もぐもぐ',
    appTagline: '多摩の食文化を、集めながら発見しよう。',
    navPokedex: '図鑑',
    navMap: '地図',
    navHome: 'ホーム',
    collectedCount: '収集済み',
    locked: '未発見',
    unlocked: 'GET済み',
    hintPrefix: 'ヒント',
    sources: '情報源',
    sourceLink: '出典を見る',
    checkIn: 'チェックイン',
    checkInSuccess: 'GET!',
    checkInTooFar: 'もう少し近づいてチェックイン',
    checkInDuplicate: 'すでに収集済みです',
    geolocationUnavailable: '現在地を取得できません',
    permissionDenied: '位置情報の許可が必要です',
    noPlaces: 'この場所に関連する食文化はありません',
    noRelatedPlaces: 'まだ関連する体験場所がありません',
    openInMap: '地図アプリで開く',
    nextDiscovery: '次の発見',
    collectionProgress: '収集の進み具合',
    areaProgress: 'エリア別',
    categoryProgress: 'カテゴリ別',
    resetDemo: 'デモデータをリセット',
    resetConfirm: '収集したデータをリセットしますか？',
    back: '戻る',
    byArea: 'エリア',
    byCategory: 'カテゴリ',
    categoryProduce: '産物',
    categorySeafood: '山の幸・川の幸',
    categorySweets: '和菓子',
    categoryProcessedFood: '加工食品',
    categoryCraft: '工芸',
    detailStory: 'ストーリー',
    detailHistory: '地域性・歴史',
    detailMaker: '作り手',
    detailHowToEnjoy: '食べ方・楽しみ方',
    detailRelatedPlaces: '体験できる場所',
    detailLicense: 'ライセンス',
    detailLastVerified: '最終確認',
    detailVisitOnMap: '地図で見る',
    detailLockedNoticeBody: 'この食文化はまだ見つかっていません。体験できる場所へ行ってチェックインすると、ストーリーや情報源が公開されます。',
    detailNotFoundTitle: '見つかりませんでした',
    detailNotFoundBody: 'この食文化は存在しないか、すでに削除された可能性があります。図鑑や地図から探し直してください。',
    originSource: '出典データ',
    originEditorial: '編集部作成',
    originDemo: 'デモデータ',
  },
  en: {
    appName: 'Tokyo Mogu Mogu',
    appTagline: 'Discover Tokyo\'s Tama food culture, one collectible at a time.',
    navPokedex: 'Pokédex',
    navMap: 'Map',
    navHome: 'Home',
    collectedCount: 'Collected',
    locked: 'Locked',
    unlocked: 'Collected',
    hintPrefix: 'Hint',
    sources: 'Sources',
    sourceLink: 'View source',
    checkIn: 'Check in',
    checkInSuccess: 'GET!',
    checkInTooFar: 'Move closer to check in',
    checkInDuplicate: 'Already collected',
    geolocationUnavailable: 'Unable to get your location',
    permissionDenied: 'Location permission is required',
    noPlaces: 'No food cultures at this place',
    noRelatedPlaces: 'No places to experience this yet',
    openInMap: 'Open in map app',
    nextDiscovery: 'Next discovery',
    collectionProgress: 'Collection progress',
    areaProgress: 'By area',
    categoryProgress: 'By category',
    resetDemo: 'Reset demo data',
    resetConfirm: 'Reset all collected data?',
    back: 'Back',
    byArea: 'Area',
    byCategory: 'Category',
    categoryProduce: 'Produce',
    categorySeafood: 'Mountain & river',
    categorySweets: 'Sweets',
    categoryProcessedFood: 'Processed food',
    categoryCraft: 'Craft',
    detailStory: 'Story',
    detailHistory: 'Region & history',
    detailMaker: 'The maker',
    detailHowToEnjoy: 'How to enjoy',
    detailRelatedPlaces: 'Where to experience',
    detailLicense: 'License',
    detailLastVerified: 'Last verified',
    detailVisitOnMap: 'View on map',
    detailLockedNoticeBody: 'This food culture is still locked. Visit one of the places below and check in to reveal its story and sources.',
    detailNotFoundTitle: 'Not found',
    detailNotFoundBody: 'This food culture could not be found, or it may have been removed. Try browsing from the Pokédex or map.',
    originSource: 'Source data',
    originEditorial: 'Editorial',
    originDemo: 'Demo data',
  },
} as const;

export type LocaleKey = keyof (typeof strings)['ja'];

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: LocaleKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocale] = useState<Locale>('ja');

  const t = useCallback((key: LocaleKey) => strings[locale][key], [locale]);

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, t],
  );

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

export function useI18n(): I18nContextValue {
  const ctx = useContext(I18nContext);
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return ctx;
}
