/**
 * Demo GTFS fixture — stops (GTFS `stops.txt` subset).
 *
 * DEMO DATA: coordinates are approximate and based on the publicly known
 * Okutama area geography; this is NOT a verified extract of the real
 * 西東京バス GTFS. See `docs/nishi-tokyo-bus-gtfs-source.md` for the real
 * dataset and how to regenerate a verified fixture.
 */
import type { GtfsStop } from '../../lib/gtfs';

export const GTFS_FIXTURE_STOPS: GtfsStop[] = [
  {
    stopId: 'stop-okutama-station',
    stopName: '奥多摩駅',
    latitude: 35.8094,
    longitude: 139.0995,
  },
  {
    stopId: 'stop-okutama-town-hall',
    stopName: '奥多摩町役場前',
    latitude: 35.8088,
    longitude: 139.0938,
  },
  {
    stopId: 'stop-hikawa',
    stopName: '氷川',
    latitude: 35.8065,
    longitude: 139.0916,
  },
  {
    stopId: 'stop-nippara',
    stopName: '日原',
    latitude: 35.7993,
    longitude: 139.075,
  },
];
