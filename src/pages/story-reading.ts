import type { Locale } from '../i18n';

/**
 * Reading-time estimate for the S4 editorial story (Issue #44).
 *
 * Uses the heuristics common in editorial products: English ~200 words per
 * minute, Japanese ~400 characters per minute. Lower-bounded at 1 minute so the
 * "n min read" indicator never renders "0 min". Non-Japanese locales (en,
 * zh-TW) use the word-based estimate.
 */
export function readingMinutes(text: string, locale: Locale): number {
  if (locale === 'ja') {
    return Math.max(1, Math.ceil(text.length / 400));
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}

/**
 * Resolve the Story's back target from an optional caller-supplied value
 * (Issue #79).
 *
 * The Story is a reusable component reached from the personalized Result
 * (default) or from Discover (#93). A caller that knows its origin passes a
 * relative app path via `?backTo=...`; anything else keeps the default Result
 * back target. Only relative paths are accepted so a crafted query cannot
 * navigate outside the SPA.
 */
export function resolveBackTo(raw: string | null, fallback: string): string {
  return raw && raw.startsWith('/') ? raw : fallback;
}
