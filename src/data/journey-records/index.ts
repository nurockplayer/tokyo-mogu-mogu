import type { JourneyRecord } from '../journey-record';
import { omeJourneyRecord } from './ome';
import { hachiojiJourneyRecord } from './hachioji';
import { fussaJourneyRecord } from './fussa';
import { akirunoJourneyRecord } from './akiruno';

/** Browse publication order; municipality registration alone publishes nothing. */
export const JOURNEY_RECORDS: JourneyRecord[] = [
  omeJourneyRecord, hachiojiJourneyRecord, fussaJourneyRecord, akirunoJourneyRecord,
];
