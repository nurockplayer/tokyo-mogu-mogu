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
import { routeBackHref, routeBackTarget, routeContextSearch } from './route-context';
import { spotActionType, SPOT_ACTIONS } from './SpotPage';
import { getPlaceById } from '../data';
import { strings } from '../i18n/resources';

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

  it('keeps MOGU and My caller contexts', () => {
    expect(routeBackTarget('?from=mogu')).toBe('mogu');
    expect(routeBackTarget('?from=my')).toBe('my');
  });

  it('sanitizes and forwards context through Spot links', () => {
    expect(routeContextSearch('?from=discover')).toBe('?from=discover');
    expect(routeContextSearch('?from=mogu')).toBe('?from=mogu');
    expect(routeContextSearch('?from=story&backTo=%2Fdiscover')).toBe(
      '?from=story&backTo=%2Fdiscover',
    );
    expect(routeContextSearch('?from=story&backTo=%2Fsupport')).toBe(
      '?from=story&backTo=%2Fexplore%2Fresult',
    );
    expect(routeContextSearch('?from=unknown')).toBe('');
  });

  it('resolves the visible caller-aware Back destination', () => {
    expect(routeBackHref('?from=discover')).toBe('/discover');
    expect(routeBackHref('?from=mogu')).toBe('/mogu');
    expect(routeBackHref('?from=my')).toBe('/my');
    expect(routeBackHref('?from=story&backTo=%2Fdiscover')).toBe(
      '/story/wasabi-okutama?backTo=%2Fdiscover',
    );
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

  it('uses the official site only where it is a truthful destination', () => {
    const tourism = SPOT_ACTIONS['okutama-tourism-office'];
    expect(tourism.kind).toBe('external');
    expect(tourism.url).toBe('https://www.okutokanko.jp/');
    const field = SPOT_ACTIONS['okutama-wasabi-field'];
    expect(field.kind).toBe('disabled');
    expect(field.type).toBe('farm');
    expect(field.url).toBeUndefined();
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

describe('support-copy truthfulness boundary (#80)', () => {
  it('labels route support language as intent rather than measured impact', () => {
    expect(strings.ja.s5SupportLead).toContain('実際の貢献効果を示すものではありません');
    expect(strings.en.s5SupportLead).toContain('not measured impact claims');
    expect(strings['zh-TW'].s5SupportLead).toContain('不代表已驗證的影響成效');
  });
});
