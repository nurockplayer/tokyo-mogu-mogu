/**
 * Reading-time estimate for the S4 editorial story (Issue #44).
 *
 * Uses the heuristics common in editorial products: English ~200 words per
 * minute, Japanese ~400 characters per minute. Lower-bounded at 1 minute so the
 * "n min read" indicator never renders "0 min".
 */
export function readingMinutes(text: string, locale: 'ja' | 'en'): number {
  if (locale === 'ja') {
    return Math.max(1, Math.ceil(text.length / 400));
  }
  const words = text.trim().split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.ceil(words / 200));
}
