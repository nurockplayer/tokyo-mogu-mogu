import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';
import { adaptJourneyRecords } from '../journey-record';
import { JOURNEY_RECORDS } from './index';

const locales = ['ja', 'en', 'zh-TW'] as const;

describe('Stage C evidence URLs', () => {
  it('cites only a batch verification log or the four migrated records’ sources', () => {
    const migrated = ['sake-ome', 'hachioji-ginger', 'sake-fussa', 'produce-akiruno'];
    const originalUrls = new Set(JOURNEY_RECORDS
      .filter((record) => migrated.includes(record.journey.storyId))
      .flatMap((record) => Object.values(record.sources).map((source) => source.url)));
    for (const record of JOURNEY_RECORDS) {
      const batch = record.journey.id.match(/^(b\d+)-/)?.[1];
      const log = batch ? readFileSync(`docs/data-evidence/regions/${batch}/verification.md`, 'utf8') : '';
      const urls = new Set(log.match(/https?:\/\/[^\s<>]+/g));
      for (const source of Object.values(record.sources)) {
        expect(originalUrls.has(source.url) || urls.has(source.url),
          `${record.journey.id}: ${source.url}`).toBe(true);
      }
    }
  });

  it.each(JOURNEY_RECORDS.filter((record) => record.journey.id.startsWith('b05-')))(
    'publishes pending, no-photo, complete localized data for $journey.id', (record) => {
      const output = adaptJourneyRecords([record]);
      expect(output.currentJourneys[0].sourceStatus).toBe('needs_confirmation');
      expect(output.currentJourneys[0].imageAssetId).toBeUndefined();
      for (const source of Object.values(record.sources)) {
        expect(source.verificationStatus).toBe('needs_confirmation');
        expect(source.retrievedAt).toBe('2026-11-24');
        expect(source.confirmedAt).toBeUndefined();
      }
      for (const locale of locales) {
        expect(record.journey.copy[locale].title.trim()).not.toBe('');
        for (const chapter of record.journey.chapters[locale]) expect(chapter.body.trim()).not.toBe('');
        for (const spot of Object.values(record.spots)) {
          expect(spot.presentation.copy[locale].name.trim()).not.toBe('');
          expect(spot.detail.description[locale].trim()).not.toBe('');
          expect(spot.detail.caution[0][locale].trim()).not.toBe('');
          expect(spot.presentation.thumbnailAssetIds).toEqual([]);
        }
      }
    },
  );
});
