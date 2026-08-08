import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { describe, expect, it } from 'vitest';
import {
  buildOkutamaPlaces,
  hashName,
  isMvpRelevant,
  normalizeCsvRow,
  normalizeDirectoryRow,
  parseDirectoryJson,
  parseGeneralCsv,
  parseSportsCsv,
  splitCsv,
  toPlaceType,
  SPORTS_DATASET,
  RETRIEVED_AT,
} from './normalize.ts';
import type { CsvRow, DirectoryRow } from './normalize.ts';

const SNAPSHOT_DIR = join(dirname(fileURLToPath(import.meta.url)), 'snapshots');

const SPORTS_CSV = readFileSync(join(SNAPSHOT_DIR, 'okutama-sports-facilities.csv'), 'utf8');

// The 施設関連情報 CSV is Shift-JIS encoded at source.
const GENERAL_CSV = new TextDecoder('shift_jis').decode(
  readFileSync(join(SNAPSHOT_DIR, 'okutama-general-facilities.csv')),
);

const DIRECTORY_JSON = readFileSync(join(SNAPSHOT_DIR, 'okutama-tourism-directory.json'), 'utf8');

describe('splitCsv', () => {
  it('parses simple and quoted fields', () => {
    const rows = splitCsv('a,b,c\n"d,e",f,g\n');
    expect(rows).toEqual([
      ['a', 'b', 'c'],
      ['d,e', 'f', 'g'],
    ]);
  });
});

describe('parseSportsCsv', () => {
  it('parses the sports snapshot into CsvRow records', () => {
    const rows = parseSportsCsv(SPORTS_CSV);
    expect(rows.length).toBe(4);
    expect(rows[0]).toMatchObject({
      dataset: 'sports',
      nameJa: '奥多摩総合運動公園',
      latitude: 35.802912,
      longitude: 139.09401,
      originalId: '1103',
      description: '軟式野球場',
      url: 'https://www.town.okutama.tokyo.jp/1/kyoikuka/bunka_sports/1/1/1067.html',
    });
  });
});

describe('parseGeneralCsv', () => {
  it('parses the general facilities snapshot', () => {
    const rows = parseGeneralCsv(GENERAL_CSV);
    expect(rows.length).toBe(5);
    expect(rows[0]).toMatchObject({
      dataset: 'general',
      nameJa: '奥多摩町立古里図書館',
      latitude: 35.818459,
      originalId: '奥多摩町立古里図書館',
      category: '図書館',
    });
  });
});

describe('parseDirectoryJson', () => {
  it('parses the tourism-directory snapshot', () => {
    const rows = parseDirectoryJson(DIRECTORY_JSON);
    expect(rows.length).toBeGreaterThanOrEqual(1);
    expect(rows[0]).toMatchObject({ key: 'okutama-tourism-office', coordApprox: false });
  });
});

describe('normalizeCsvRow', () => {
  const row: CsvRow = {
    dataset: 'sports',
    nameJa: '奥多摩総合運動公園',
    address: '東京都西多摩郡奥多摩町氷川940',
    latitude: 35.802912,
    longitude: 139.09401,
    originalId: '1103',
  };

  it('produces a deterministic id and preserves provenance', () => {
    const p = normalizeCsvRow(row);
    expect(p.id).toBe('okutama-sports-' + hashName('奥多摩総合運動公園'));
    expect(p.latitude).toBe(35.802912);
    expect(p.origin).toBe('source');
    expect(p.source).toMatchObject({
      sourceType: 'open_data',
      sourceDatasetId: SPORTS_DATASET.sourceDatasetId,
      retrievedAt: RETRIEVED_AT,
      originalId: '1103',
    });
  });

  it('is idempotent: same row, same id', () => {
    expect(normalizeCsvRow(row).id).toBe(normalizeCsvRow(row).id);
  });
});

describe('normalizeDirectoryRow', () => {
  const row: DirectoryRow = {
    key: 'moegi-no-yu',
    nameJa: '奥多摩温泉 もえぎの湯',
    nameEn: 'Okutama Onsen Moegino-yu',
    address: '東京都西多摩郡奥多摩町氷川119-1',
    latitude: 35.8046405,
    longitude: 139.1026411,
    url: 'https://www.okutamas.co.jp/moegi/',
    category: 'other',
    coordApprox: false,
  };

  it('marks directory rows as demo with official_web provenance', () => {
    const p = normalizeDirectoryRow(row);
    expect(p.id).toBe('okutama-demo-moegi-no-yu');
    expect(p.origin).toBe('demo');
    expect(p.source.sourceType).toBe('official_web');
    expect(p.source.originalId).toBe('moegi-no-yu');
    expect(p.latitude).toBe(35.8046405);
  });
});

describe('isMvpRelevant', () => {
  it('keeps all demo rows', () => {
    expect(isMvpRelevant({ dataset: 'demo', nameJa: 'anything' })).toBe(true);
  });

  it('keeps tourism-relevant open data and drops libraries', () => {
    expect(isMvpRelevant({ dataset: 'general', nameJa: '奥多摩町立せせらぎの里美術館' })).toBe(true);
    expect(isMvpRelevant({ dataset: 'general', nameJa: '奥多摩町立氷川図書館' })).toBe(false);
    expect(isMvpRelevant({ dataset: 'sports', nameJa: '奥多摩総合運動公園' })).toBe(true);
  });
});

describe('toPlaceType', () => {
  it('maps demo categories to PlaceType', () => {
    expect(toPlaceType('demo', 'restaurant')).toBe('restaurant');
    expect(toPlaceType('demo', 'farm')).toBe('farm');
    expect(toPlaceType('demo', 'shop')).toBe('shop');
    expect(toPlaceType('demo', 'info-center')).toBe('info-center');
    expect(toPlaceType('demo', 'other')).toBe('other');
  });

  it('maps open-data rows to other', () => {
    expect(toPlaceType('sports', undefined)).toBe('other');
    expect(toPlaceType('general', '博物館類似施設')).toBe('other');
  });
});

describe('buildOkutamaPlaces', () => {
  it('produces unique deterministic ids and the expected mix', () => {
    const places = buildOkutamaPlaces({
      sportsCsv: SPORTS_CSV,
      generalCsv: GENERAL_CSV,
      directoryJson: DIRECTORY_JSON,
    });

    // 4 sports (1 tourism-relevant kept) + 5 general (2 tourism-relevant kept)
    // + 19 demo directory rows = 22; libraries/cultural halls filtered out.
    expect(places.length).toBe(22);
    const ids = places.map((p) => p.id);
    expect(new Set(ids).size).toBe(ids.length);
    expect(places.filter((p) => p.origin === 'source').length).toBe(3);
    expect(places.filter((p) => p.origin === 'demo').length).toBe(19);
    expect(places.some((p) => p.nameJa === '奥多摩町立氷川図書館')).toBe(false);
  });

  it('is idempotent: identical input yields identical output', () => {
    const input = {
      sportsCsv: SPORTS_CSV,
      generalCsv: GENERAL_CSV,
      directoryJson: DIRECTORY_JSON,
    };
    expect(buildOkutamaPlaces(input)).toEqual(buildOkutamaPlaces(input));
  });
});
