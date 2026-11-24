import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import * as presentation from '../features/netlify-parity/factual-presentation';
import { PLACES } from './seed-places';
import { getSpotDetail } from './seed-routes';
import { resolveSpotOfficialLink } from './spot-official-link';
import { adaptJourneyRecords, journeyFactStatus, type JourneyRecord } from './journey-record';
import { JOURNEY_RECORDS } from './journey-records';
import { MUNICIPALITIES } from './municipalities';

const locales = ['ja', 'en', 'zh-TW'] as const;

function sorted(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sorted);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => [key, sorted(item)]));
  }
  return value;
}

// Captured from origin/main 5d28aec before replacing any builder. Includes all
// locales, Story groups/location/point, Spot practical details, and Route maps.
const beforeMigration = {
  'demo-ome-sake': 'f78358dcdd3ad615f807b6b36172e142ce54767d006663fc985e9cd61a689508',
  'demo-tokyo-hachioji-ginger': '8db983ade39e68f2800a4512fd9840c917785be6cf9cc7804875285b1a5d46dd',
  'demo-tokyo-west-fussa-sake': '1ff4c8924be1124d82c7a35d40f917846b9a7bb4b72c33d3576e78f0486eb6a2',
  'demo-tokyo-west-akiruno-produce': '01c0ee3a7efae45e2d688ffb2fc10445af17961066deb5a2c8329092b2a48a6b',
};

function currentBundle(id: string) {
  const p = presentation;
  const journey = p.currentJourneys.find((item) => item.id === id)!;
  const groups = p.storySpotGroups[id];
  const spotIds = [...new Set([
    ...journey.routeVariants.flatMap((variant) => variant.steps.map((step) => step.spotId)),
    ...groups.nearby.map((spot) => spot.spotId), ...groups.nature.map((spot) => spot.spotId),
  ])];
  return {
    journey, routeName: p.routeNames[id], location: p.resultLocation[id],
    variants: Object.fromEntries(journey.routeVariants.map((variant) => {
      const key = `${id}:${variant.id}`;
      return [variant.id, { steps: p.routeStepText[key], stats: p.routeStats[key], guidance: p.routeRegionGuidance[key] }];
    })),
    spots: Object.fromEntries(spotIds.map((spotId) => [spotId, {
      presentation: p.currentSpots[spotId], detail: p.referenceSpotDetails[spotId],
      officialSource: resolveSpotOfficialLink(PLACES.find((place) => place.id === spotId), getSpotDetail(spotId))?.source,
    }])),
    story: { groups, location: p.storyLocation[id], point: p.chapterPoint[id] },
  };
}

const text = { ja: '合成テスト旅程', en: 'Synthetic test journey', 'zh-TW': '合成測試旅程' };
const source = {
  name: 'Synthetic official source', url: 'https://example.test/tachikawa',
  sourceType: 'official_web' as const, retrievedAt: '2026-11-22',
  verificationStatus: 'needs_confirmation' as const,
};
const localized = <T,>(make: (locale: typeof locales[number]) => T) =>
  Object.fromEntries(locales.map((locale) => [locale, make(locale)])) as Record<typeof locales[number], T>;

const synthetic: JourneyRecord = {
  municipalityId: 'tachikawa',
  journey: {
    id: 'synthetic-tachikawa', regionId: 'synthetic-culture-group', foodCultureId: 'synthetic-culture',
    storyId: 'synthetic-story', routeId: 'synthetic-route',
    imageAssetId: 'wasabiHero',
    copy: localized((locale) => ({ title: text[locale], subtitle: text[locale], description: text[locale], tags: [], storyTitle: text[locale], intro: [text[locale]] })),
    chapters: localized((locale) => [{ number: '01.', title: text[locale], body: text[locale] }]),
    routeVariants: [{ id: 'half-day', durationMinutes: 30, steps: [{ spotId: 'synthetic-spot' }] }],
  },
  routeName: text,
  location: localized((locale) => ({ area: text[locale], station: '', access: text[locale], source })),
  variants: { 'half-day': {
    steps: [{ spotId: 'synthetic-spot', description: text }],
    stats: localized((locale) => ({ time: text[locale], distance: text[locale], spots: text[locale], station: '', minutes: '', caution: text[locale] })),
    guidance: text,
  } },
  spots: { 'synthetic-spot': {
    presentation: {
      id: 'synthetic-spot', regionId: 'synthetic-culture-group', foodCultureId: 'synthetic-culture',
      thumbnailAssetIds: [],
      copy: localized((locale) => ({ name: text[locale], lead: text[locale], description: text[locale], tags: [], practicalInfo: [], caution: [] })),
    },
    detail: { tags: [], description: text, information: [
      { fieldId: 'official_current_url', icon: 'information', label: text, value: localized(() => source.url) },
    ], caution: [], guide: { title: text, body: text, action: text } },
    officialSource: source,
  } },
  story: { groups: { nearby: [{ referenceId: 'synthetic-spot', spotId: 'synthetic-spot', badge: text, badgeColor: '#E98A1C' }], nature: [] }, location: localized((locale) => ({ region: text[locale], station: '' })) },
  sources: { official: source },
  facts: Object.fromEntries(['journey.copy', 'journey.chapters', 'journey.routeVariants', 'routeName', 'location', 'variants', 'spots.synthetic-spot', 'story']
    .map((path) => [path, { sourceIds: ['official'], origin: 'editorial' as const }])),
};

describe('municipalities and data-driven journey presentation (#412)', () => {
  it('registers exactly 39 unique municipalities with all three names and the Owner groups', () => {
    expect(MUNICIPALITIES).toHaveLength(39);
    expect(new Set(MUNICIPALITIES.map(({ id }) => id)).size).toBe(39);
    expect(['tama-cities', 'nishitama', 'islands'].map((group) => MUNICIPALITIES.filter((item) => item.group === group).length)).toEqual([26, 4, 9]);
    for (const item of MUNICIPALITIES) for (const locale of locales) expect(item.names[locale].trim()).not.toBe('');
    expect(presentation.currentJourneys.map(({ id }) => id)).toEqual(expect.arrayContaining([
      ...Object.keys(beforeMigration), 'demo-okutama-wasabi', 'demo-okutama-yamame',
    ]));
    expect(presentation.currentJourneys.filter(({ id }) => id.startsWith('demo-okutama-')))
      .toEqual(presentation.resultJourneys);
  });

  it.each(Object.entries(beforeMigration))('preserves the complete pre-migration presentation of %s', (id, expected) => {
    expect(createHash('sha256').update(JSON.stringify(sorted(currentBundle(id)))).digest('hex')).toBe(expected);
  });

  it('cites only existing migrated sources or URLs in the record batch verification log', () => {
    const existingUrls = new Set(JOURNEY_RECORDS
      .filter((record) => record.journey.id in beforeMigration)
      .flatMap((record) => Object.values(record.sources).map(({ url }) => url)));
    const modules = import.meta.glob<{ [key: string]: JourneyRecord }>('./journey-records/*.ts', { eager: true });
    const authored = Object.entries(modules).filter(([path]) => !path.endsWith('/index.ts'))
      .flatMap(([, module]) => Object.values(module));
    expect(authored.map(({ journey }) => journey.id).sort()).toEqual(JOURNEY_RECORDS.map(({ journey }) => journey.id).sort());
    for (const record of authored) {
      const batch = record.journey.id.match(/^(b\d+)-/)?.[1];
      const log = batch ? readFileSync(`docs/data-evidence/regions/${batch}/verification.md`, 'utf8') : '';
      const loggedUrls = new Set(log.match(/https?:\/\/[^\s<>]+/g));
      for (const source of Object.values(record.sources)) {
        expect(Boolean(source.url && (existingUrls.has(source.url) || loggedUrls.has(source.url))),
          `${record.journey.id}: ${source.url}`).toBe(true);
      }
    }
  });

  it.each(JOURNEY_RECORDS.filter(({ journey }) => /^b0[1348]-/.test(journey.id)))('publishes complete pending data for $journey.id in all locales', (record) => {
    const output = adaptJourneyRecords([record]);
    expect(output.currentJourneys[0].sourceStatus).toBe('needs_confirmation');
    expect(output.currentJourneys[0].imageAssetId).toBeUndefined();
    for (const source of Object.values(record.sources)) {
      expect(source.verificationStatus).toBe('needs_confirmation');
      expect(source.retrievedAt).toBe(/^b0[348]-/.test(record.journey.id) ? '2026-11-24' : '2026-11-22');
      expect(source.confirmedAt).toBeUndefined();
    }
    for (const locale of locales) {
      expect(record.journey.copy[locale].title.trim()).not.toBe('');
      for (const chapter of record.journey.chapters[locale]) expect(chapter.body.trim()).not.toBe('');
      for (const variant of record.journey.routeVariants) {
        const key = `${record.journey.id}:${variant.id}`;
        expect(output.routeStepText[key].map(({ spotId }) => spotId)).toEqual(variant.steps.map(({ spotId }) => spotId));
        expect(output.routeStats[key][locale].spots).toContain(String(variant.steps.length));
        expect(output.routeStats[key][locale].minutes).toBe(String(variant.durationMinutes));
        for (const { spotId } of variant.steps) {
          expect(output.currentSpots[spotId].copy[locale].name.trim()).not.toBe('');
          expect(output.referenceSpotDetails[spotId].description[locale].trim()).not.toBe('');
          expect(output.referenceSpotDetails[spotId].tags).toContainEqual(expect.objectContaining({ tagId: 'confirmation-pending' }));
          expect(output.referenceSpotDetails[spotId].caution[0][locale].trim()).not.toBe('');
        }
      }
    }
  });

  it('never treats retrieval or a verified flag without confirmation as verified, and uses no-photo without rights', () => {
    const record = structuredClone(synthetic);
    record.sources.official.verificationStatus = 'verified';
    expect(journeyFactStatus(record, 'journey.chapters.ja.0.body')).toBe('needs_confirmation');
    const output = adaptJourneyRecords([record]);
    expect(output.currentJourneys[0].sourceStatus).toBe('needs_confirmation');
    expect(output.currentJourneys[0].imageAssetId).toBeUndefined();
    expect(output.referenceSpotDetails['synthetic-spot'].tags).toContainEqual(expect.objectContaining({ tagId: 'confirmation-pending' }));
    for (const locale of locales) expect(output.referenceSpotDetails['synthetic-spot'].caution[0][locale]).not.toBe('');
    expect(record.spots['synthetic-spot'].detail.tags).toEqual([]);
  });

  it('inherits pending Spot evidence from a grouped parent path (#414)', () => {
    const record = structuredClone(synthetic);
    delete record.facts['spots.synthetic-spot'];
    record.facts.spots = { sourceIds: ['official'], origin: 'source' };
    expect(journeyFactStatus(record, 'spots.synthetic-spot.detail.description')).toBe('needs_confirmation');
    const detail = adaptJourneyRecords([record]).referenceSpotDetails['synthetic-spot'];
    expect(detail.tags).toContainEqual(expect.objectContaining({ tagId: 'confirmation-pending' }));
    for (const locale of locales) expect(detail.caution[0][locale]).not.toBe('');
  });

  it('publishes a new record through the real MOGU default list in every locale, with Story, Route and Spot data', async () => {
    vi.resetModules();
    vi.doMock('./journey-records', () => ({ JOURNEY_RECORDS: [...JOURNEY_RECORDS, synthetic] }));
    try {
      const p = await import('../features/netlify-parity/factual-presentation');
      const { MoguScreen } = await import('../features/netlify-parity/screens/MoguScreen');
      const { referenceCopy } = await import('../features/netlify-parity/content');
      const { SpotScreen } = await import('../features/netlify-parity/screens/SpotScreen');
      expect(p.currentJourneys.at(-1)?.id).toBe(synthetic.journey.id);
      expect(p.resultJourneys.map(({ id }) => id)).toEqual(['demo-okutama-wasabi', 'demo-okutama-yamame']);
      for (const locale of locales) {
        const html = renderToStaticMarkup(createElement(MoguScreen, {
          active: true, copy: referenceCopy(locale), locale,
          onOpenJourney: () => {}, onNavigate: () => {},
        }));
        expect(html).toContain('data-journey-id="synthetic-tachikawa"');
        expect(html).toContain(text[locale]);
        expect(html).toContain('data-verification-status="needs_confirmation"');
        const spotHtml = renderToStaticMarkup(createElement(SpotScreen, {
          active: true, copy: referenceCopy(locale), locale, spot: p.currentSpots['synthetic-spot'],
          onBack: () => {}, onNavigate: () => {},
        }));
        expect(spotHtml).toContain('href="https://example.test/tachikawa"');
        expect(spotHtml).toContain('rel="noopener noreferrer"');
        expect(spotHtml).toContain(p.referenceSpotDetails['synthetic-spot']!.caution[0][locale]);
        expect(p.storyLocation[synthetic.journey.id][locale].region).toBe(text[locale]);
        expect(p.routeStats['synthetic-tachikawa:half-day'][locale].caution).toBe(text[locale]);
      }
      expect(p.storySpotGroups[synthetic.journey.id].nearby[0].spotId).toBe('synthetic-spot');
      expect(p.routeStepText['synthetic-tachikawa:half-day'][0].spotId).toBe('synthetic-spot');
      expect(p.currentSpots['synthetic-spot'].copy).toEqual(synthetic.spots['synthetic-spot'].presentation.copy);
      expect(p.referenceSpotDetails['synthetic-spot']!.tags.at(-1)?.tagId).toBe('confirmation-pending');
    } finally {
      vi.doUnmock('./journey-records');
      vi.resetModules();
    }
  });
});
