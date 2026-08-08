import { describe, expect, it } from 'vitest';
import { foodCultures, getPlaceById, places } from '../data';
import { GTFS_FIXTURE } from '../data/gtfs-fixture';
import type { GtfsDataset } from './gtfs';
import {
  getAreaCompletion,
  getCategoryCompletion,
  getNextDiscoveries,
  getNextDiscoveriesWithTransit,
  getTransitInfoForPlace,
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

describe('progression transit-aware next discovery (#8)', () => {
  const EMPTY_GTFS: GtfsDataset = {
    stops: [],
    routes: [],
    trips: [],
    stopTimes: [],
    origin: 'demo',
  };

  const okutamaStation: { latitude: number; longitude: number } = {
    latitude: 35.8094,
    longitude: 139.0995,
  };

  // Robust lookups by id so the tests do not depend on array ordering.
  const sobaPlace = getPlaceById('okutama-soba-shop')!;
  const wasabiPlace = getPlaceById('okutama-wasabi-field')!;

  it('getTransitInfoForPlace returns stop + next departure when available', () => {
    // 奥多摩そば処 is right at the station stop; after 09:00 the next
    // departure from 奥多摩駅 is the 09:07 日原 return trip.
    const info = getTransitInfoForPlace(GTFS_FIXTURE, sobaPlace, 540);
    expect(info).not.toBeNull();
    expect(info?.nearestStop.stopId).toBe('stop-okutama-station');
    expect(info?.nextDeparture.stopTime.departureMin).toBe(547);
  });

  it('getTransitInfoForPlace returns null when GTFS is absent', () => {
    expect(getTransitInfoForPlace(null, sobaPlace, 0)).toBeNull();
  });

  it('getTransitInfoForPlace returns null when no departure comes later', () => {
    // After the last bus (11:12) there is no departure from 奥多摩駅.
    expect(getTransitInfoForPlace(GTFS_FIXTURE, sobaPlace, 673)).toBeNull();
  });

  it('prefers candidates whose place has a reachable bus stop with a next departure', () => {
    // After 10:00, the nearest reachable stops still run: わさび田 via 日原
    // (10:17), やまめ via 奥多摩町役場前 (10:03). Ome/Hinode places have no bus
    // stop at all and must not be prioritized.
    const next = getNextDiscoveriesWithTransit([], foodCultures, places, GTFS_FIXTURE, okutamaStation, 3, 601);
    const okutama = new Set(foodCultures.filter((fc) => fc.area === 'okutama').map((fc) => fc.id));
    expect(next.map((fc) => fc.id)).not.toContain('kumma-hyakka-ome');
    expect(next.map((fc) => fc.id)).not.toContain('yuzu-hinode');
    expect(next.every((fc) => okutama.has(fc.id))).toBe(true);
  });

  it('does not prioritize candidates that are hard to reach by transit', () => {
    // Without a location, distance cannot help; Ome/Hinode places have no bus
    // stop in the demo GTFS and must not outrank reachable Okutama candidates.
    const next = getNextDiscoveriesWithTransit([], foodCultures, places, GTFS_FIXTURE, undefined, 3, 601);
    const okutama = new Set(foodCultures.filter((fc) => fc.area === 'okutama').map((fc) => fc.id));
    expect(next.every((fc) => okutama.has(fc.id))).toBe(true);
  });

  it('falls back to distance ordering when GTFS is null', () => {
    const distance = getNextDiscoveries([], foodCultures, places, okutamaStation, 3);
    const transit = getNextDiscoveriesWithTransit([], foodCultures, places, null, okutamaStation, 3);
    expect(transit.map((fc) => fc.id)).toEqual(distance.map((fc) => fc.id));
  });

  it('falls back gracefully to the existing ranking for an empty dataset', () => {
    // An empty GTFS dataset (stops/trips present but none reference the demo
    // places) behaves like the distance-based ranking, never crashing.
    const distance = getNextDiscoveries([], foodCultures, places, okutamaStation, 3);
    const transit = getNextDiscoveriesWithTransit([], foodCultures, places, EMPTY_GTFS, okutamaStation, 3);
    expect(transit.map((fc) => fc.id)).toEqual(distance.map((fc) => fc.id));
  });

  it('excludes collected ids and honours the limit', () => {
    const next = getNextDiscoveriesWithTransit(['wasabi-okutama'], foodCultures, places, GTFS_FIXTURE, okutamaStation, 3, 601);
    expect(next.map((fc) => fc.id)).not.toContain('wasabi-okutama');
    expect(next.length).toBeLessThanOrEqual(3);
  });

  it('wasabi place is reachable via the 日原 stop when the station stop has no service', () => {
    // わさび田 (35.8015, 139.0831) is ~770 m from 日原; after 10:00 the next
    // departure from 日原 is the 10:17 outbound bus. This exercises the "skip a
    // closer dead-end stop" behavior of getTransitInfoForPlace.
    const info = getTransitInfoForPlace(GTFS_FIXTURE, wasabiPlace, 601);
    expect(info).not.toBeNull();
    expect(info?.nearestStop.stopId).toBe('stop-nippara');
    expect(info?.nextDeparture.stopTime.departureMin).toBe(617);
  });
});
