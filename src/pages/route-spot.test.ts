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
import {
  routeBackHref,
  routeBackTarget,
  routeContextSearch,
  spotBackHref,
} from './route-context';
import { spotActionType, SPOT_ACTIONS } from './SpotPage';
import { getPlaceById, places } from '../data';
import { resolveKey } from '../i18n/fallback';
import { strings } from '../i18n/resources';
import { deriveVerificationStatus } from '../lib/verification';

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

  it('forwards the selected candidate identity through Route and Spot context (#123)', () => {
    expect(
      routeContextSearch('?from=story&backTo=%2Fmogu&candidateId=demo-okutama-wasabi'),
    ).toBe('?from=story&backTo=%2Fmogu&candidateId=demo-okutama-wasabi');
    expect(routeBackHref('?from=story&backTo=%2Fmogu&candidateId=demo-okutama-wasabi')).toBe(
      '/story/wasabi-okutama?backTo=%2Fmogu&candidateId=demo-okutama-wasabi',
    );
  });

  it('forwards an explicit saved-route id through the Route ↔ Spot round-trip (#123)', () => {
    // A saved route reopened from My keeps its own route id through Spot and
    // back, so it never collapses to the pilot route.
    expect(routeContextSearch('?from=my&routeId=ome-sake-journey')).toBe(
      '?from=my&routeId=ome-sake-journey',
    );
    expect(spotBackHref('?from=my&routeId=ome-sake-journey')).toBe(
      '/route?from=my&routeId=ome-sake-journey',
    );
  });

  it('falls back to the demo journey for a candidate not in the configured data', () => {
    // A candidate that is not part of the configured candidate data resolves to
    // the frozen demo journey instead of inventing a destination. Resolving a
    // genuinely configured second candidate is covered by journey.test.ts.
    expect(routeBackHref('?from=story&backTo=%2Fdiscover&candidateId=future-ome-sake')).toBe(
      '/story/wasabi-okutama?backTo=%2Fdiscover',
    );
    expect(routeBackHref('?from=story&backTo=%2Fdiscover&candidateId=removed-candidate')).toBe(
      '/story/wasabi-okutama?backTo=%2Fdiscover',
    );
  });
});

describe('Spot back-target resolution (#93)', () => {
  it('returns to Discover when the Spot was opened from Discover', () => {
    expect(spotBackHref('?from=discover')).toBe('/discover');
  });

  it('keeps returning to the Route when the Spot was reached from the Route', () => {
    // Route → Spot carries the Story context (the Route's caller), not a
    // Discover context, so Back stays on the Route journey.
    expect(spotBackHref('?from=story&backTo=%2Fexplore%2Fresult')).toBe(
      '/route?from=story&backTo=%2Fexplore%2Fresult',
    );
    expect(spotBackHref('?from=story&backTo=%2Fmogu')).toBe(
      '/route?from=story&backTo=%2Fmogu',
    );
  });

  it('keeps returning to the Route for MOGU and My contexts (Spot sits under Route)', () => {
    expect(spotBackHref('?from=mogu')).toBe('/route?from=mogu');
    expect(spotBackHref('?from=my')).toBe('/route?from=my');
  });

  it('defaults to the Route when the caller context is absent', () => {
    expect(spotBackHref('')).toBe('/route');
    expect(spotBackHref('?from=unknown')).toBe('/route');
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
    // pond must render the disabled fallback, not an invented link.
    expect(SPOT_ACTIONS['soba-isshintei']).toMatchObject({ kind: 'disabled', type: 'restaurant' });
    expect(SPOT_ACTIONS['shishiguchiya']).toMatchObject({ kind: 'disabled', type: 'shop' });
    expect(SPOT_ACTIONS['odanba-fishing']).toMatchObject({ kind: 'disabled', type: 'visit' });
  });

  it('uses the official site only where it is a truthful destination', () => {
    const tourism = SPOT_ACTIONS['okutama-tourism-office'];
    expect(tourism.kind).toBe('external');
    expect(tourism.url).toBe('https://www.okutokanko.jp/');
    const garden = SPOT_ACTIONS['chishima-wasabi-garden'];
    expect(garden.kind).toBe('disabled');
    expect(garden.type).toBe('farm');
    expect(garden.url).toBeUndefined();
  });

  it('resolves per-spot action type, then falls back to the place category default', () => {
    // Per-spot override wins.
    expect(spotActionType(getPlaceById('soba-isshintei')!)).toBe('restaurant');
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

describe('weekend-morning crowding advisory (#83)', () => {
  const advisoryKeys = ['s5CrowdingAdvisory', 's5CrowdingSource'] as const;

  it('ships a three-locale bundle for every advisory key', () => {
    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      for (const key of advisoryKeys) {
        const value = resolveKey(strings, locale, key);
        expect(value, `${locale} ${key}`).toBeTypeOf('string');
        expect(value.length, `${locale} ${key}`).toBeGreaterThan(0);
        expect(value.startsWith('missing:'), `${locale} ${key}`).toBe(false);
      }
    }
  });

  it('hedges the advisory as possible crowding, not a verified fact', () => {
    // May / can-be phrasing in every locale; never a definite claim.
    expect(strings.ja.s5CrowdingAdvisory).toContain('場合があります');
    expect(strings.en.s5CrowdingAdvisory.toLowerCase()).toMatch(/can be crowded/);
    expect(strings['zh-TW'].s5CrowdingAdvisory).toContain('可能');
  });

  it('labels the advisory as an observation, not realtime data', () => {
    expect(strings.ja.s5CrowdingSource).toContain('観察');
    expect(strings.ja.s5CrowdingSource).toContain('リアルタイム');
    expect(strings.en.s5CrowdingSource.toLowerCase()).toContain('field observation');
    expect(strings.en.s5CrowdingSource.toLowerCase()).toContain('realtime');
    expect(strings['zh-TW'].s5CrowdingSource).toContain('現場觀察');
    expect(strings['zh-TW'].s5CrowdingSource).toContain('即時');
  });

  it('keeps the added advisory keys structurally equivalent across locales', () => {
    const jaKeys = Object.keys(strings.ja).sort();
    expect(jaKeys).toEqual(Object.keys(strings.en).sort());
    expect(jaKeys).toEqual(Object.keys(strings['zh-TW']).sort());
  });

  it('dates the observation and keeps it distinct from verified source data', () => {
    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      expect(strings[locale].s5CrowdingSource).toContain('2026-08-09');
    }
  });
});

describe('spot verification badges (#129)', () => {
  const badgeKeys = [
    'verificationVerified',
    'verificationNeedsConfirmation',
    'verificationStale',
    'verificationConflict',
    'verificationDemo',
  ] as const;

  it('ships a three-locale bundle for every verification badge key', () => {
    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      for (const key of badgeKeys) {
        const value = resolveKey(strings, locale, key);
        expect(value, `${locale} ${key}`).toBeTypeOf('string');
        expect(value.length, `${locale} ${key}`).toBeGreaterThan(0);
        expect(value.startsWith('missing:'), `${locale} ${key}`).toBe(false);
      }
    }
  });

  it('keeps the verification badge keys structurally equivalent across locales', () => {
    const jaKeys = Object.keys(strings.ja).sort();
    expect(jaKeys).toEqual(Object.keys(strings.en).sort());
    expect(jaKeys).toEqual(Object.keys(strings['zh-TW']).sort());
  });

  it('never renders a demo-origin spot as verified', () => {
    // Every seed place is demo-origin today; every spot must degrade to the
    // demo label, never verified.
    for (const p of places) {
      const status = deriveVerificationStatus(p.source, p.origin);
      if (p.origin === 'demo') {
        expect(status).toBe('demo');
      }
    }
  });
});
