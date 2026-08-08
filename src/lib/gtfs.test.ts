import { describe, expect, it } from 'vitest';
import { GTFS_FIXTURE } from '../data/gtfs-fixture';
import { findNearbyStops, getNextDepartures, type GtfsDataset } from './gtfs';

const EMPTY_DATASET: GtfsDataset = {
  stops: [],
  routes: [],
  trips: [],
  stopTimes: [],
  origin: 'demo',
};

describe('gtfs findNearbyStops (#17)', () => {
  it('returns no stops for an empty dataset', () => {
    expect(findNearbyStops(EMPTY_DATASET, 35.8094, 139.0995, 2000)).toEqual([]);
  });

  it('finds the stops within the radius', () => {
    const nearby = findNearbyStops(GTFS_FIXTURE, 35.8094, 139.0995, 2000);
    const ids = nearby.map((s) => s.stopId);
    expect(ids).toContain('stop-okutama-station');
    expect(ids).toContain('stop-okutama-town-hall');
    // 日原 is ~2.8 km away and must be excluded.
    expect(ids).not.toContain('stop-nippara');
  });

  it('sorts results by ascending distance', () => {
    const nearby = findNearbyStops(GTFS_FIXTURE, 35.8094, 139.0995, 2000);
    expect(nearby[0].stopId).toBe('stop-okutama-station');
  });
});

describe('gtfs getNextDepartures (#17)', () => {
  it('returns an empty array for an empty dataset', () => {
    expect(getNextDepartures(EMPTY_DATASET, 'stop-okutama-station', 0)).toEqual([]);
  });

  it('returns departures at or after the given time in ascending order', () => {
    const departures = getNextDepartures(GTFS_FIXTURE, 'stop-okutama-station', 540); // on/after 09:00
    const times = departures.map((d) => d.stopTime.departureMin);
    // 09:07 (日原 return), 10:00, 11:00 (loop start), 11:12 (loop return)
    expect(times).toEqual([547, 600, 660, 672]);
  });

  it('attaches route and trip info to each departure', () => {
    const departures = getNextDepartures(GTFS_FIXTURE, 'stop-okutama-station', 0);
    expect(departures.length).toBeGreaterThan(0);
    for (const d of departures) {
      expect(d.route.routeId).toBe(d.trip.routeId);
      expect(d.trip.tripId).toBe(d.stopTime.tripId);
      expect(d.route.routeLongName.length).toBeGreaterThan(0);
    }
  });

  it('returns an empty array when no departure comes after the time', () => {
    const departures = getNextDepartures(GTFS_FIXTURE, 'stop-okutama-station', 673); // after the last bus (11:12)
    expect(departures).toEqual([]);
  });

  it('honours the limit', () => {
    const departures = getNextDepartures(GTFS_FIXTURE, 'stop-okutama-station', 0, 2);
    expect(departures).toHaveLength(2);
  });

  it('ignores stop times that reference unknown trips or routes', () => {
    const broken: GtfsDataset = {
      ...GTFS_FIXTURE,
      stopTimes: [
        ...GTFS_FIXTURE.stopTimes,
        { tripId: 'trip-missing', stopId: 'stop-okutama-station', arrivalMin: 700, departureMin: 700, stopSequence: 1 },
      ],
    };
    const departures = getNextDepartures(broken, 'stop-okutama-station', 0);
    expect(departures.some((d) => d.stopTime.tripId === 'trip-missing')).toBe(false);
  });
});
