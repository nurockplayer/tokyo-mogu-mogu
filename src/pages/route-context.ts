/** Caller context carried through Route → Spot → Route (Issues #79/#80/#92). */
import { getRouteIdForPlace, resolveJourneyIdentity, resolveRouteId } from '../data';

export type RouteBackTarget = 'story' | 'discover' | 'mogu' | 'my' | 'home';

const STORY_BACK_TARGETS = new Set(['/explore/result', '/discover', '/mogu']);

export function routeBackTarget(search: string): RouteBackTarget {
  const from = new URLSearchParams(search).get('from');
  return from === 'story' || from === 'discover' || from === 'mogu' || from === 'my'
    ? from
    : 'home';
}

/**
 * A sanitized query string safe to forward from Route to Spot and back. The
 * caller `from` context, the Story's own back target, and the selected route /
 * candidate identity (#123) survive; everything else is dropped. The route id
 * must survive the Route ↔ Spot round-trip so a saved route reopened from My
 * does not collapse back to the pilot route.
 */
export function routeContextSearch(search: string): string {
  const source = new URLSearchParams(search);
  const target = routeBackTarget(search);
  if (target === 'home') return '';

  const params = new URLSearchParams({ from: target });
  if (target === 'story') {
    const backTo = source.get('backTo');
    params.set('backTo', backTo && STORY_BACK_TARGETS.has(backTo) ? backTo : '/explore/result');
  }
  const routeId = source.get('routeId');
  if (routeId) params.set('routeId', routeId);
  const candidateId = source.get('candidateId');
  if (candidateId) params.set('candidateId', candidateId);
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
    // Resolve the recorded candidate (or the demo default) so Back returns to
    // the story that produced this journey, and forward the candidate id so a
    // further Story → Route hop keeps the recorded journey.
    const identity = resolveJourneyIdentity(context.get('candidateId'));
    const params = new URLSearchParams({ backTo });
    if (identity.candidateId) params.set('candidateId', identity.candidateId);
    return `/story/${identity.foodCultureId}?${params.toString()}`;
  }
  return '/';
}

/**
 * The visible Back destination for the Spot page (Issue #93).
 *
 * A Spot is normally reached from the Route (the immediate parent in the
 * Story → Route → Spot journey), so its Back returns to the Route and the
 * caller context is forwarded. The one exception: Discover links directly to
 * a Spot with `?from=discover` (no Route in between), so Back must return
 * straight to Discover instead of inventing a Route hop.
 */
export function spotBackHref(search: string): string {
  if (routeBackTarget(search) === 'discover') return '/discover';
  return `/route${routeContextSearch(search)}`;
}

/**
 * Resolve the itinerary a Spot page's "save" action targets (Issue #69).
 *
 * When the Spot was reached from a Route, the forwarded `routeId`/`candidateId`
 * context is authoritative — a place shared by multiple routes must save the
 * route the traveler actually opened, never an arbitrary one. Without route
 * context (legacy/direct entry), fall back to the place's unambiguous parent
 * route; a place on multiple routes with no context stays unavailable rather
 * than guessing.
 */
export function resolveSpotRouteId(
  search: string,
  placeId: string | undefined,
): string | undefined {
  const params = new URLSearchParams(search);
  const hasRouteContext = Boolean(params.get('routeId') || params.get('candidateId'));
  if (hasRouteContext) return resolveRouteId(search);
  return placeId ? getRouteIdForPlace(placeId) : undefined;
}
