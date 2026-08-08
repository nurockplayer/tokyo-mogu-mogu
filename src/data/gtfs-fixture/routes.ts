/**
 * Demo GTFS fixture — routes (GTFS `routes.txt` subset).
 *
 * DEMO DATA: route names model the real Okutama-area bus lines at a coarse
 * level but are NOT a verified extract of the real 西東京バス GTFS. See
 * `docs/nishi-tokyo-bus-gtfs-source.md`.
 */
import type { GtfsRoute } from '../../lib/gtfs';

export const GTFS_FIXTURE_ROUTES: GtfsRoute[] = [
  {
    routeId: 'route-okutama-nippara',
    routeShortName: '西東京バス',
    routeLongName: '奥多摩駅 - 日原',
  },
  {
    routeId: 'route-hikawa-loop',
    routeShortName: '西東京バス',
    routeLongName: '奥多摩駅 - 氷川 - 日原線',
  },
];
