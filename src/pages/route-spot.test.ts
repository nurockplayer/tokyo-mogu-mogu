/**
 * S5 Route / S6 Spot — caller-context back targets and spot-action mapping
 * (Issue #80).
 *
 * Vitest runs in a node environment, so we test the pure helpers (back-target
 * resolution from `?from=` and the per-spot action-type mapping) rather than
 * the DOM. The save/unsave persistence round-trips are already covered by
 * src/lib/saved-routes.test.ts, and the S5 pin geometry by
 * src/data/seed-routes.test.ts.
 */
import { describe, expect, it } from 'vitest';
import { routeBackTarget } from './RoutePage';
import { spotActionType, spotOriginIsStory, SPOT_ACTIONS } from './SpotPage';
import { getPlaceById } from '../data';

describe('Route back-target resolution (#80)', () => {
  it('defaults to home when the caller context is absent', () => {
    expect(routeBackTarget('')).toBe('home');
    expect(routeBackTarget('?from=unknown')).toBe('home');
  });

  it('keeps the personalized Story caller context', () => {
    expect(routeBackTarget('?from=story')).toBe('story');
  });

  it('keeps the Discover caller context', () => {
    expect(routeBackTarget('?from=discover')).toBe('discover');
  });
});

describe('Spot back-target resolution (#80)', () => {
  it('preserves a Story origin so Route keeps its back-to-story link', () => {
    expect(spotOriginIsStory('?from=story')).toBe(true);
    expect(spotOriginIsStory('')).toBe(false);
    expect(spotOriginIsStory('?from=discover')).toBe(false);
  });
});

describe('spot primary-action mapping (#80)', () => {
  it('maps each route spot to an external-link-first or disabled action', () => {
    for (const id of Object.keys(SPOT_ACTIONS)) {
      const place = getPlaceById(id);
      expect(place, `place ${id}`).toBeDefined();
      const action = SPOT_ACTIONS[id];
      expect(['external', 'disabled']).toContain(action.kind);
      // External actions must carry a real destination; disabled ones never do.
      if (action.kind === 'external') {
        expect(action.url).toMatch(/^https:\/\//);
      } else {
        expect(action.url).toBeUndefined();
      }
    }
  });

  it('never fakes a booking/EC destination for unverified spots', () => {
    // No fieldwork booking URLs exist yet (#10): restaurant / shop / fishing
    // center must render the disabled fallback, not an invented link.
    expect(SPOT_ACTIONS['okutama-soba-shop']).toMatchObject({ kind: 'disabled', type: 'restaurant' });
    expect(SPOT_ACTIONS['okutama-michi-no-eki']).toMatchObject({ kind: 'disabled', type: 'shop' });
    expect(SPOT_ACTIONS['okutama-fishing-center']).toMatchObject({ kind: 'disabled', type: 'visit' });
  });

  it('uses the confirmed official Okutama site only for spots with verified info', () => {
    const tourism = SPOT_ACTIONS['okutama-tourism-office'];
    expect(tourism.kind).toBe('external');
    expect(tourism.url).toBe('https://www.okutokanko.jp/');
    const field = SPOT_ACTIONS['okutama-wasabi-field'];
    expect(field.kind).toBe('external');
    expect(field.type).toBe('farm');
  });

  it('resolves per-spot action type, then falls back to the place category default', () => {
    // Per-spot override wins.
    expect(spotActionType(getPlaceById('okutama-soba-shop')!)).toBe('restaurant');
    // No override: category default (e.g. a brewery spot → workshop).
    expect(
      spotActionType({ id: 'some-brewery', type: 'brewery' }),
    ).toBe('workshop');
  });
});
