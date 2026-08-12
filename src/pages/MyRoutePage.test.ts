/**
 * S8 My Route — logic tests (Issue #47).
 *
 * Vitest runs in a node environment, so we test the pure display-list helpers
 * (resolution of saved ids → routes, ordering, stale-id dropping, duration
 * label) rather than the DOM. Persistence round-trips are already covered by
 * src/lib/saved-routes.test.ts.
 */
import { describe, expect, it } from 'vitest';
import { buildEntries, durationLabel, routeAreaLabel } from './MyRoutePage';
import { modelRoutes, type ModelRoute } from '../data';

const wasabiRoute = modelRoutes.find((r) => r.id === 'okutama-wasabi-journey');
if (!wasabiRoute) throw new Error('fixture route missing');

describe('S8 My Route helpers (#47)', () => {
  it('resolves saved ids to routes and drops stale ids', () => {
    const entries = buildEntries([
      { routeId: 'okutama-wasabi-journey', savedAt: '2026-08-08T01:00:00.000Z' },
      { routeId: 'does-not-exist', savedAt: '2026-08-08T02:00:00.000Z' },
    ]);
    expect(entries).toHaveLength(1);
    expect(entries[0].route.id).toBe('okutama-wasabi-journey');
  });

  it('orders newest saved first', () => {
    const entries = buildEntries([
      { routeId: 'okutama-wasabi-journey', savedAt: '2026-08-08T01:00:00.000Z' },
      { routeId: 'okutama-wasabi-journey', savedAt: '2026-08-09T01:00:00.000Z' },
    ]);
    expect(entries[0].entry.savedAt).toBe('2026-08-09T01:00:00.000Z');
  });

  it('returns an empty list for no saved routes', () => {
    expect(buildEntries([])).toHaveLength(0);
  });

  it('formats the default variant duration label in each locale', () => {
    const ja = durationLabel(wasabiRoute, 'ja');
    const en = durationLabel(wasabiRoute, 'en');
    expect(ja).toMatch(/\d/);
    expect(ja).toMatch(/時間|分/);
    expect(en).toMatch(/\d/);
    expect(en).toMatch(/h|min/);
  });

  it('labels a saved-route card with the route\'s own area (demo stays Okutama)', () => {
    expect(routeAreaLabel(wasabiRoute, 'ja')).toBe('奥多摩');
    expect(routeAreaLabel(wasabiRoute, 'en')).toBe('Okutama');
  });

  it('never labels a non-Okutama route with Okutama area metadata', () => {
    // A future Ome route supplies its own area; the label comes from the route
    // data, never a hard-coded Okutama string.
    const omeRoute: ModelRoute = {
      ...wasabiRoute,
      id: 'ome-sake-journey',
      areaJa: '青梅',
      areaEn: 'Ome',
    };
    expect(routeAreaLabel(omeRoute, 'ja')).toBe('青梅');
    expect(routeAreaLabel(omeRoute, 'en')).toBe('Ome');
  });
});
