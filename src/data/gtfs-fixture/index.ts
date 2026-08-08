/**
 * Demo GTFS fixture assembler — a small Okutama-area snapshot.
 *
 * DEMO DATA: this fixture is NOT a verified extract of the real 西東京バス
 * GTFS. Stop coordinates are approximate, and routes/trips/times are
 * illustrative so the data layer can be exercised end-to-end around 奥多摩駅.
 * Never present this as verified timetable data. For the real dataset and a
 * re-runnable ingestion path, see `docs/nishi-tokyo-bus-gtfs-source.md` and
 * `scripts/ingest-gtfs/`.
 */
import type { GtfsDataset } from '../../lib/gtfs';
import { GTFS_FIXTURE_STOPS } from './stops';
import { GTFS_FIXTURE_ROUTES } from './routes';
import { GTFS_FIXTURE_TRIPS } from './trips';
import { GTFS_FIXTURE_STOP_TIMES } from './stop_times';

/** Assembled demo GTFS snapshot around 奥多摩駅. */
export const GTFS_FIXTURE: GtfsDataset = {
  stops: GTFS_FIXTURE_STOPS,
  routes: GTFS_FIXTURE_ROUTES,
  trips: GTFS_FIXTURE_TRIPS,
  stopTimes: GTFS_FIXTURE_STOP_TIMES,
  origin: 'demo',
  sourceLabel: '西東京バス（奥多摩エリア・デモ）',
  retrievedAt: '2026-08-08',
};
