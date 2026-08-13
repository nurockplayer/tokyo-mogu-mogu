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
 * known app path via `?backTo=...`; anything else keeps the default Result
 * back target. An explicit allowlist prevents protocol-relative or unrelated
 * routes from being smuggled into navigation.
 */
export function resolveBackTo(raw: string | null, fallback: string): string {
  const allowed = new Set(['/explore/result', '/discover', '/mogu']);
  return raw && allowed.has(raw) ? raw : fallback;
}

/**
 * Preserve the Story caller when continuing into the Route journey. The
 * selected candidate id (#123) is forwarded so the Route screen resolves the
 * recorded journey instead of falling back to the pilot route.
 */
export function storyRouteHref(backTo: string, candidateId?: string): string {
  const params = new URLSearchParams({ from: 'story', backTo });
  if (candidateId) params.set('candidateId', candidateId);
  return `/route?${params.toString()}`;
}
