/**
 * Demo GTFS fixture — trips (GTFS `trips.txt` subset).
 *
 * DEMO DATA: trips and service ids are illustrative, NOT a verified extract
 * of the real 西東京バス GTFS. See `docs/nishi-tokyo-bus-gtfs-source.md`.
 */
import type { GtfsTrip } from '../../lib/gtfs';

export const GTFS_FIXTURE_TRIPS: GtfsTrip[] = [
  {
    tripId: 'trip-okutama-nippara-001',
    routeId: 'route-okutama-nippara',
    serviceId: 'service-weekday',
    tripHeadsign: '日原',
  },
  {
    tripId: 'trip-okutama-nippara-002',
    routeId: 'route-okutama-nippara',
    serviceId: 'service-weekday',
    tripHeadsign: '日原',
  },
  {
    tripId: 'trip-okutama-nippara-003',
    routeId: 'route-okutama-nippara',
    serviceId: 'service-weekday',
    tripHeadsign: '奥多摩駅',
  },
  {
    tripId: 'trip-hikawa-loop-001',
    routeId: 'route-hikawa-loop',
    serviceId: 'service-holiday',
    tripHeadsign: '氷川循環',
  },
];
