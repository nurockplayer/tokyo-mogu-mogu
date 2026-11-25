import type { JourneyRecord } from '../journey-record';
import { omeJourneyRecord } from './ome';
import { hachiojiJourneyRecord } from './hachioji';
import { fussaJourneyRecord } from './fussa';
import { akirunoJourneyRecord } from './akiruno';
import { b01Records } from './publication/b01';
import { b02Records } from './publication/b02';
import { b03Records } from './publication/b03';
import { b04Records } from './publication/b04';
import { b05Records } from './publication/b05';
import { b06Records } from './publication/b06';
import { b07Records } from './publication/b07';
import { b08Records } from './publication/b08';
import { b09Records } from './publication/b09';
import { b10Records } from './publication/b10';
import { b11Records } from './publication/b11';
import { b12Records } from './publication/b12';
import { b13Records } from './publication/b13';

/** Browse publication order; municipality registration alone publishes nothing. */
export const JOURNEY_RECORDS: JourneyRecord[] = [
  omeJourneyRecord, hachiojiJourneyRecord, fussaJourneyRecord, akirunoJourneyRecord,
  ...b01Records,
  ...b02Records,
  ...b03Records,
  ...b04Records,
  ...b05Records,
  ...b06Records,
  ...b07Records,
  ...b08Records,
  ...b09Records,
  ...b10Records,
  ...b11Records,
  ...b12Records,
  ...b13Records,
];
