/**
 * Client-side locale persistence (Issue #82).
 *
 * Mirrors the active UI locale to `localStorage` so a full page reload (not
 * just SPA navigation) keeps the user's language. DOM-guarded like the other
 * persistence contracts (`src/auth/session.ts`): every access is wrapped in
 * try/catch so unreadable or blocked storage (private mode, SSR, missing
 * localStorage) degrades to the default locale instead of crashing. Node tests
 * install a localStorage shim (see `persistence.test.ts`).
 */
import { DEFAULT_LOCALE, type Locale } from './resources';

/** localStorage key for the persisted UI locale. */
export const LOCALE_STORAGE_KEY = 'tmm:locale';

const LOCALES: readonly string[] = ['ja', 'en', 'zh-TW'];

const isLocale = (value: unknown): value is Locale =>
  typeof value === 'string' && LOCALES.includes(value);

/**
 * Loads the persisted locale, or `DEFAULT_LOCALE` when nothing valid is
 * stored. A corrupt, unknown, or unreadable value resolves to the default,
 * never a crash.
 */
export function loadStoredLocale(): Locale {
  try {
    const raw = localStorage.getItem(LOCALE_STORAGE_KEY);
    return isLocale(raw) ? raw : DEFAULT_LOCALE;
  } catch {
    // Unreadable or blocked storage — use the default locale.
    return DEFAULT_LOCALE;
  }
}

/** Persists the active locale; silently no-ops when storage is unavailable. */
export function storeLocale(locale: Locale): void {
  try {
    localStorage.setItem(LOCALE_STORAGE_KEY, locale);
  } catch {
    // Storage unavailable — nothing to do (best-effort persistence).
  }
}
