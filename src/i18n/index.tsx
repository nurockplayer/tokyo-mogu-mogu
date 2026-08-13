/**
 * Public entry for the i18n layer.
 *
 * All i18n consumers should import from `src/i18n`:
 *   - `I18nProvider`   mounts the locale context (owned by #14's provider mount)
 *   - `useI18n`        shared hook used across screens/components
 *   - `LocaleToggle`   in-app ja/en switch
 *   - `formatDate` / `formatNumber`  locale-aware formatting
 *   - `Locale`, `LocaleKey` types
 *
 * Fallback order (see `fallback.ts`): active locale -> the other locale -> a
 * `missing:<key>` placeholder. `t()` never returns `undefined`.
 */
import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react';
import { strings, type Locale, type LocaleKey } from './resources';
import { resolveKey } from './fallback';
import { loadStoredLocale, storeLocale } from './persistence';

export { LocaleToggle } from './LocaleToggle';
export { formatDate, formatNumber } from '../i18n-format';
export { DEFAULT_LOCALE, strings } from './resources';
export type { Locale, LocaleKey, StringBundles } from './resources';

interface I18nContextValue {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: LocaleKey) => string;
}

const I18nContext = createContext<I18nContextValue | null>(null);

export function I18nProvider({ children }: { children: ReactNode }) {
  // Issue #82: restore the persisted locale on mount (lazy initializer runs
  // once), then keep it mirrored to localStorage on every switch.
  const [locale, setLocaleState] = useState<Locale>(() => loadStoredLocale());

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next);
    storeLocale(next);
  }, []);

  const t = useCallback(
    (key: LocaleKey) => resolveKey(strings, locale, key),
    [locale],
  );

  const value = useMemo(
    () => ({ locale, setLocale, t }),
    [locale, setLocale, t],
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
