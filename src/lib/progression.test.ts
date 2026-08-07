import { describe, expect, it } from 'vitest';
import { foodCultures, places } from '../data';
import {
  getAreaCompletion,
  getCategoryCompletion,
  getNextDiscoveries,
  getUndiscovered,
} from './progression';

const allIds = foodCultures.map((fc) => fc.id);

describe('progression logic (#8)', () => {
  it('getUndiscovered excludes collected ids', () => {
    const collected = [allIds[0]];
    const undiscovered = getUndiscovered(collected, foodCultures);
    expect(undiscovered.map((fc) => fc.id)).not.toContain(allIds[0]);
    expect(undiscovered.length).toBe(allIds.length - 1);
  });

  it('getAreaCompletion counts per area', () => {
    const areas = getAreaCompletion(allIds, foodCultures);
    expect(areas.length).toBeGreaterThan(0);
    for (const a of areas) {
      expect(a.collected).toBe(a.total);
    }
    // Every food culture is counted exactly once across areas.
    expect(areas.reduce((sum, a) => sum + a.total, 0)).toBe(allIds.length);
  });

  it('getCategoryCompletion counts per category', () => {
    const categories = getCategoryCompletion([], foodCultures);
    expect(categories.length).toBeGreaterThan(0);
    expect(categories.reduce((sum, c) => sum + c.total, 0)).toBe(allIds.length);
    expect(categories.every((c) => c.collected === 0)).toBe(true);
  });

  it('getNextDiscoveries returns only undiscovered, limited count', () => {
    const collected = ['wasabi-okutama'];
    const next = getNextDiscoveries(collected, foodCultures, places, {
      latitude: 35.8092,
      longitude: 139.0986, // Okutama area
    });
    expect(next.length).toBeGreaterThan(0);
    expect(next.length).toBeLessThanOrEqual(3);
    expect(next.map((fc) => fc.id)).not.toContain('wasabi-okutama');
  });

  it('getNextDiscoveries prefers nearby items when a location is given', () => {
    // From Okutama Station, Okutama items should rank above Ome/Hinode ones.
    const next = getNextDiscoveries([], foodCultures, places, {
      latitude: 35.8092,
      longitude: 139.0986,
    });
    const okutama = new Set(foodCultures.filter((fc) => fc.area === 'okutama').map((fc) => fc.id));
    // The first suggestion is an Okutama item (they are nearest from that point).
    expect(okutama.has(next[0].id)).toBe(true);
  });
});
