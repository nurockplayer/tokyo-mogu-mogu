/**
 * Demo GTFS fixture — stop_times (GTFS `stop_times.txt` subset).
 *
 * Times are minutes from midnight (e.g. 480 = 08:00). DEMO DATA: times are
 * illustrative, NOT a verified extract of the real 西東京バス GTFS. See
 * `docs/nishi-tokyo-bus-gtfs-source.md`.
 */
import type { GtfsStopTime } from '../../lib/gtfs';

export const GTFS_FIXTURE_STOP_TIMES: GtfsStopTime[] = [
  // Trip 001: 奥多摩駅 → 日原 (weekday, departures from 奥多摩駅 at 08:00)
  { tripId: 'trip-okutama-nippara-001', stopId: 'stop-okutama-station', arrivalMin: 480, departureMin: 480, stopSequence: 1 },
  { tripId: 'trip-okutama-nippara-001', stopId: 'stop-okutama-town-hall', arrivalMin: 483, departureMin: 483, stopSequence: 2 },
  { tripId: 'trip-okutama-nippara-001', stopId: 'stop-hikawa', arrivalMin: 485, departureMin: 485, stopSequence: 3 },
  { tripId: 'trip-okutama-nippara-001', stopId: 'stop-nippara', arrivalMin: 497, departureMin: 497, stopSequence: 4 },

  // Trip 002: 奥多摩駅 → 日原 (weekday, departures from 奥多摩駅 at 10:00)
  { tripId: 'trip-okutama-nippara-002', stopId: 'stop-okutama-station', arrivalMin: 600, departureMin: 600, stopSequence: 1 },
  { tripId: 'trip-okutama-nippara-002', stopId: 'stop-okutama-town-hall', arrivalMin: 603, departureMin: 603, stopSequence: 2 },
  { tripId: 'trip-okutama-nippara-002', stopId: 'stop-hikawa', arrivalMin: 605, departureMin: 605, stopSequence: 3 },
  { tripId: 'trip-okutama-nippara-002', stopId: 'stop-nippara', arrivalMin: 617, departureMin: 617, stopSequence: 4 },

  // Trip 003: 日原 → 奥多摩駅 (weekday, returns to 奥多摩駅 at 09:07)
  { tripId: 'trip-okutama-nippara-003', stopId: 'stop-nippara', arrivalMin: 530, departureMin: 530, stopSequence: 1 },
  { tripId: 'trip-okutama-nippara-003', stopId: 'stop-hikawa', arrivalMin: 542, departureMin: 542, stopSequence: 2 },
  { tripId: 'trip-okutama-nippara-003', stopId: 'stop-okutama-town-hall', arrivalMin: 544, departureMin: 544, stopSequence: 3 },
  { tripId: 'trip-okutama-nippara-003', stopId: 'stop-okutama-station', arrivalMin: 547, departureMin: 547, stopSequence: 4 },

  // Trip 004: 氷川循環 (holiday, loop returning to 奥多摩駅 at 11:12)
  { tripId: 'trip-hikawa-loop-001', stopId: 'stop-okutama-station', arrivalMin: 660, departureMin: 660, stopSequence: 1 },
  { tripId: 'trip-hikawa-loop-001', stopId: 'stop-hikawa', arrivalMin: 664, departureMin: 664, stopSequence: 2 },
  { tripId: 'trip-hikawa-loop-001', stopId: 'stop-okutama-town-hall', arrivalMin: 668, departureMin: 668, stopSequence: 3 },
  { tripId: 'trip-hikawa-loop-001', stopId: 'stop-okutama-station', arrivalMin: 672, departureMin: 672, stopSequence: 4 },
];
