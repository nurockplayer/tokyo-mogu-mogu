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
    pokedexSub: '多摩の食文化を集めて、図鑑を完成させよう。',
    catProduce: '食材',
    catSeafood: '魚介',
    catSweets: '菓子',
    catProcessedFood: '加工品',
    catCraft: '工芸',
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
    pokedexSub: 'Collect Tama\'s food cultures and complete your field guide.',
    catProduce: 'Produce',
    catSeafood: 'Fish',
    catSweets: 'Sweets',
    catProcessedFood: 'Processed',
    catCraft: 'Craft',
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
