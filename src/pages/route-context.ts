/** Caller context carried through Route → Spot → Route (Issues #79/#80/#92). */
export type RouteBackTarget = 'story' | 'discover' | 'mogu' | 'my' | 'home';

const STORY_BACK_TARGETS = new Set(['/explore/result', '/discover', '/mogu']);

export function routeBackTarget(search: string): RouteBackTarget {
  const from = new URLSearchParams(search).get('from');
  return from === 'story' || from === 'discover' || from === 'mogu' || from === 'my'
    ? from
    : 'home';
}

/** A sanitized query string safe to forward from Route to Spot and back. */
export function routeContextSearch(search: string): string {
  const source = new URLSearchParams(search);
  const target = routeBackTarget(search);
  if (target === 'home') return '';

  const params = new URLSearchParams({ from: target });
  if (target === 'story') {
    const backTo = source.get('backTo');
    params.set('backTo', backTo && STORY_BACK_TARGETS.has(backTo) ? backTo : '/explore/result');
  }
  return `?${params.toString()}`;
}

/** The visible destination behind Route's caller-aware Back action. */
export function routeBackHref(search: string): string {
  const target = routeBackTarget(search);
  if (target === 'discover') return '/discover';
  if (target === 'mogu') return '/mogu';
  if (target === 'my') return '/my';
  if (target === 'story') {
    const context = new URLSearchParams(routeContextSearch(search));
    const backTo = context.get('backTo') ?? '/explore/result';
    return `/story/wasabi-okutama?backTo=${encodeURIComponent(backTo)}`;
  }
  return '/';
}
