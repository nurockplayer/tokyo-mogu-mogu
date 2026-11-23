import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { adaptJourneyRecords, type JourneyRecord } from '../journey-record';
import { JOURNEY_RECORDS } from './index';
import { omeJourneyRecord } from './ome';
import { hachiojiJourneyRecord } from './hachioji';
import { fussaJourneyRecord } from './fussa';
import { akirunoJourneyRecord } from './akiruno';

const recordModules = import.meta.glob<Record<string, JourneyRecord>>(
  ['./*.ts', '!./index.ts', '!./*.test.ts'], { eager: true },
);
const originalUrls = new Set([omeJourneyRecord, hachiojiJourneyRecord, fussaJourneyRecord, akirunoJourneyRecord]
  .flatMap((record) => Object.values(record.sources).map(({ url }) => url)));

describe('batch source traceability', () => {
  it('checks every authored record file against its batch log or the four original source sets', () => {
    for (const module of Object.values(recordModules)) {
      for (const record of Object.values(module)) {
        expect(JOURNEY_RECORDS).toContain(record);
        const batch = record.journey.id.match(/^(b\d+)-/)?.[1];
        const log = batch ? readFileSync(`docs/data-evidence/regions/${batch}/verification.md`, 'utf8') : '';
        const loggedUrls = new Set(log.match(/https?:\/\/[^\s<>]+/g));
        for (const { url } of Object.values(record.sources)) {
          expect(Boolean(url && (originalUrls.has(url) || loggedUrls.has(url))), `${record.journey.id}: ${url}`).toBe(true);
        }
      }
    }
  });

  it.each(JOURNEY_RECORDS.filter(({ journey }) => journey.id.startsWith('b02-')))(
    'publishes complete pending MOGU, Story, Route and Spot data for $journey.id', (record) => {
      const output = adaptJourneyRecords([record]);
      expect(output.currentJourneys[0].sourceStatus).toBe('needs_confirmation');
      expect(output.currentJourneys[0].imageAssetId).toBeUndefined();
      for (const source of Object.values(record.sources)) {
        expect(source.verificationStatus).toBe('needs_confirmation');
        expect(source.retrievedAt).toBe('2026-11-24');
        expect(source.confirmedAt).toBeUndefined();
      }
      for (const locale of ['ja', 'en', 'zh-TW'] as const) {
        expect(record.journey.copy[locale].title.trim()).not.toBe('');
        for (const chapter of record.journey.chapters[locale]) expect(chapter.body.trim()).not.toBe('');
        const variant = record.journey.routeVariants.find(({ id }) => id === 'half-day')!;
        const key = `${record.journey.id}:half-day`;
        expect(output.routeStepText[key].map(({ spotId }) => spotId)).toEqual(variant.steps.map(({ spotId }) => spotId));
        expect(output.routeStats[key][locale].spots).toContain(String(variant.steps.length));
        expect(output.routeStats[key][locale].minutes).toBe(String(variant.durationMinutes));
        for (const { spotId } of variant.steps) {
          expect(output.currentSpots[spotId].copy[locale].name.trim()).not.toBe('');
          expect(output.currentSpots[spotId].thumbnailAssetIds).toEqual([]);
          expect(output.referenceSpotDetails[spotId].description[locale].trim()).not.toBe('');
          expect(output.referenceSpotDetails[spotId].tags).toContainEqual(expect.objectContaining({ tagId: 'confirmation-pending' }));
          expect(output.referenceSpotDetails[spotId].caution[0][locale].trim()).not.toBe('');
        }
      }
    },
  );
});
