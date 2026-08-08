/**
 * Fallback resolution for translation keys.
 *
 * Fallback order for `resolveKey`:
 *   1. the active locale's bundle
 *   2. the other locale's bundle (used as the fallback locale by default, so a
 *      key missing from `ja` resolves from `en` and vice versa)
 *   3. a synthesized `missing:<key>` placeholder so the UI never renders
 *      `undefined` / breaks on a missing key
 *
 * The two locale blocks are kept structurally equivalent, so step 2 is always
 * productive in practice; the placeholder is a last-resort guard only.
 */
import type { Locale, LocaleKey, StringBundles } from './resources';

/** The fallback locale for a given active locale (zh-TW falls back to en). */
const FALLBACK_LOCALE: Record<Locale, Locale> = {
  ja: 'en',
  en: 'ja',
  'zh-TW': 'en',
};

/**
 * Resolve `key` against `bundles[locale]`, then `bundles[fallbackLocale]`
 * (defaults to FALLBACK_LOCALE), then a placeholder. Never returns `undefined`.
 */
export function resolveKey(
  bundles: StringBundles,
  locale: Locale,
  key: LocaleKey,
  fallbackLocale: Locale = FALLBACK_LOCALE[locale],
): string {
  const direct = bundles[locale]?.[key];
  if (direct !== undefined) {
    return direct;
  }
  const fallback = bundles[fallbackLocale]?.[key];
  if (fallback !== undefined) {
    return fallback;
  }
  return `missing:${key}`;
}
