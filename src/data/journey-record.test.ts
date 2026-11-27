import { createHash } from 'node:crypto';
import { readFileSync } from 'node:fs';
import { createElement } from 'react';
import { renderToStaticMarkup } from 'react-dom/server';
import { describe, expect, it, vi } from 'vitest';
import * as presentation from '../features/netlify-parity/factual-presentation';
import { adaptJourneyRecords, journeyFactStatus, selectRouteStop, type JourneyRecord } from './journey-record';
import { JOURNEY_RECORDS } from './journey-records';
import { MUNICIPALITIES } from './municipalities';
import { PLACES } from './seed-places';
import { getSpotDetail } from './seed-routes';
import { resolveSpotOfficialLink } from './spot-official-link';

const locales = ['ja', 'en', 'zh-TW'] as const;

const evidenceByBatch = new Map<string, { retrievedAt: string; urls: Set<string> }[]>();

function batchEvidence(batch: string) {
  const cached = evidenceByBatch.get(batch);
  if (cached) return cached;

  const log = readFileSync(`docs/data-evidence/regions/${batch}/verification.md`, 'utf8');
  const runs = log.split(/^Retrieved during this run: (\d{4}-\d{2}-\d{2}) JST\./m).slice(1);
  if (runs.length === 0) throw new Error(`Missing retrieval date in ${batch}/verification.md`);
  const evidence: { retrievedAt: string; urls: Set<string> }[] = [];
  for (let i = 0; i < runs.length; i += 2) {
    evidence.push({ retrievedAt: runs[i], urls: new Set(runs[i + 1].match(/https?:\/\/[^\s<>]+/g)) });
  }
  evidenceByBatch.set(batch, evidence);
  return evidence;
}

// Presentation hashes were captured at 5d28aec before the migration. The
// source hashes use the same commit's seed URLs and statuses, keyed by the
// source IDs assigned in d14030a.
const beforeMigration = {
  'demo-ome-sake': {
    presentation: 'f78358dcdd3ad615f807b6b36172e142ce54767d006663fc985e9cd61a689508',
    sources: 'bf2b7deefdcccf14f6de35274dce6116623060d7a3e6afbc28ca43e7e917c071',
  },
  'demo-tokyo-hachioji-ginger': {
    presentation: '8db983ade39e68f2800a4512fd9840c917785be6cf9cc7804875285b1a5d46dd',
    sources: '229d1b770fe3ab92c9a9fb05d12f5a06d8dcdbcae585e46aeff38349726d5c95',
  },
  'demo-tokyo-west-fussa-sake': {
    presentation: '1ff4c8924be1124d82c7a35d40f917846b9a7bb4b72c33d3576e78f0486eb6a2',
    sources: '0e057e5269c37098e393c7162cbfcd168b69cfa056d5dfdc46c6111ad30d65b5',
  },
  'demo-tokyo-west-akiruno-produce': {
    presentation: '01c0ee3a7efae45e2d688ffb2fc10445af17961066deb5a2c8329092b2a48a6b',
    sources: '93ff1d30a3d1f45039885bec3796c0fa153c3133e37b7512b8b6f1c72447626f',
  },
};
const migratedIds = Object.keys(beforeMigration);

function sorted(value: unknown): unknown {
  if (Array.isArray(value)) return value.map(sorted);
  if (value && typeof value === 'object') {
    return Object.fromEntries(Object.entries(value).sort(([a], [b]) => a.localeCompare(b))
      .map(([key, item]) => [key, sorted(item)]));
  }
  return value;
}

function fingerprint(value: unknown) {
  return createHash('sha256').update(JSON.stringify(sorted(value))).digest('hex');
}

function currentBundle(record: JourneyRecord) {
  const { id } = record.journey;
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
    spots: Object.fromEntries(spotIds.map((spotId) => {
      const place = PLACES.find((item) => item.id === spotId);
      const officialSource = resolveSpotOfficialLink(place ?? spotId, getSpotDetail(spotId))?.source;
      expect(record.spots[spotId].officialSource, `${spotId} official source`).toEqual(officialSource);
      return [spotId, { presentation: p.currentSpots[spotId], detail: p.referenceSpotDetails[spotId], officialSource }];
    })),
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
  alcoholThemed: false,
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

it('selects only the available primary or its named alternative', () => {
  const spotId = 'synthetic-spot';
  const spot = synthetic.spots[spotId];
  const unavailable = { reason: text };
  const alternativeSpotId = 'synthetic-alternative';
  const alternative = { ...spot, presentation: { ...spot.presentation, id: alternativeSpotId } };

  expect(selectRouteStop(synthetic, spotId)).toBe(spotId);
  expect(selectRouteStop({ ...synthetic, spots: {
    [spotId]: { ...spot, unavailable },
    [alternativeSpotId]: alternative,
  } }, spotId)).toBeUndefined();
  const withAlternative = { ...synthetic, spots: {
    [spotId]: { ...spot, unavailable: { ...unavailable, alternativeSpotId } },
    [alternativeSpotId]: alternative,
  } };
  expect(selectRouteStop(withAlternative, spotId)).toBe(alternativeSpotId);
  expect(selectRouteStop({ ...withAlternative, spots: {
    ...withAlternative.spots,
    [alternativeSpotId]: { ...alternative, unavailable },
  } }, spotId)).toBeUndefined();
});

describe('municipalities and data-driven journey presentation (#412)', () => {
  it('registers exactly 39 unique municipalities with all three names and the Owner groups', () => {
    expect(MUNICIPALITIES).toHaveLength(39);
    expect(new Set(MUNICIPALITIES.map(({ id }) => id)).size).toBe(39);
    expect(['tama-cities', 'nishitama', 'islands'].map((group) => MUNICIPALITIES.filter((item) => item.group === group).length)).toEqual([26, 4, 9]);
    for (const item of MUNICIPALITIES) for (const locale of locales) expect(item.names[locale].trim()).not.toBe('');
    expect(presentation.currentJourneys.map(({ id }) => id)).toEqual(expect.arrayContaining([
      ...migratedIds, 'demo-okutama-wasabi', 'demo-okutama-yamame',
    ]));
    expect(presentation.currentJourneys.filter(({ id }) => id.startsWith('demo-okutama-')))
      .toEqual(presentation.resultJourneys);
  });

  it.each(Object.entries(beforeMigration))('preserves pre-migration presentation, links and source status for %s', (id, expected) => {
    const record = JOURNEY_RECORDS.find(({ journey }) => journey.id === id)!;
    const sources = Object.keys(record.sources).sort().map((key) => {
      const { url, verificationStatus } = record.sources[key];
      return [key, url, verificationStatus];
    });
    expect(fingerprint(sources), 'source URLs and verification statuses').toBe(expected.sources);
    expect(fingerprint(currentBundle(record)), 'published presentation and official sources').toBe(expected.presentation);
    expect(Object.values(record.facts).every((fact) => fact.sourceIds.every((sourceId) => sourceId in record.sources))).toBe(true);
  });

  it('publishes every authored record exactly once, with unique journey IDs', () => {
    const modules = import.meta.glob<Record<string, JourneyRecord>>(
      ['./journey-records/*.ts', '!./journey-records/index.ts', '!./journey-records/*.test.ts'],
      { eager: true },
    );
    const authored = Object.values(modules).flatMap((module) => Object.values(module));
    expect(JOURNEY_RECORDS).toHaveLength(authored.length);
    expect(new Set(JOURNEY_RECORDS)).toEqual(new Set(authored));
    expect(new Set(presentation.currentJourneys.map(({ id }) => id)).size)
      .toBe(presentation.currentJourneys.length);
  });

  const migratedUrls = new Set(JOURNEY_RECORDS
    .filter(({ journey }) => migratedIds.includes(journey.id))
    .flatMap(({ sources }) => Object.values(sources).map(({ url }) => url)));
  const stageCRecords = JOURNEY_RECORDS.filter(({ journey }) => !migratedIds.includes(journey.id));

  it.each(stageCRecords)('publishes sourced, pending data for $journey.id in every locale', (record) => {
    const { journey } = record;
    const batch = journey.id.split('-')[0];
    expect(batch).toMatch(/^b\d+$/);
    const evidence = batchEvidence(batch);

    const sources = Object.values(record.sources);
    expect(sources.length).toBeGreaterThan(0);
    for (const source of sources) {
      const { url, retrievedAt } = source;
      expect(evidence.some((run) => retrievedAt === run.retrievedAt
        && !!url && (run.urls.has(url) || migratedUrls.has(url))),
      `${journey.id}: ${url} retrieved ${retrievedAt}`).toBe(true);
      expect(source.verificationStatus).toBe('needs_confirmation');
      expect(source.confirmedAt).toBeUndefined();
    }
    for (const fact of Object.values(record.facts)) expect(fact.sourceIds.length).toBeGreaterThan(0);

    const output = adaptJourneyRecords([record]);
    const [published] = output.currentJourneys;
    expect(published.sourceStatus).toBe('needs_confirmation');
    const groups = output.storySpotGroups[journey.id];
    const storySpots = [...groups.nearby, ...groups.nature];
    for (const { spotId } of storySpots) expect(output.currentSpots[spotId]).toBeDefined();

    expect(journey.routeVariants.some(({ id }) => id === 'half-day')).toBe(true);
    for (const variant of journey.routeVariants) {
      const key = `${journey.id}:${variant.id}`;
      expect(output.routeStepText[key].map(({ spotId }) => spotId))
        .toEqual(variant.steps.map(({ spotId }) => spotId));
      for (const { spotId } of variant.steps) expect(output.currentSpots[spotId]).toBeDefined();
      for (const locale of locales) {
        expect(output.routeStats[key][locale].spots).toContain(String(variant.steps.length));
        expect(output.routeStats[key][locale].time.trim()).not.toBe('');
        expect(output.routeStats[key][locale].minutes).toBe(record.variants[variant.id]!.stats[locale].minutes);
        expect(output.routeStats[key][locale].time).toBe(record.variants[variant.id]!.stats[locale].time);
      }
    }

    for (const locale of locales) {
      expect(journey.copy[locale].title.trim()).not.toBe('');
      expect(journey.chapters[locale].length).toBeGreaterThan(0);
      for (const chapter of journey.chapters[locale]) expect(chapter.body.trim()).not.toBe('');
    }
    for (const [spotId, spot] of Object.entries(output.currentSpots)) {
      const detail = output.referenceSpotDetails[spotId];
      expect(detail.tags).toContainEqual(expect.objectContaining({ tagId: 'confirmation-pending' }));
      for (const locale of locales) {
        expect(spot.copy[locale].name.trim()).not.toBe('');
        expect(detail.description[locale].trim()).not.toBe('');
        expect(detail.caution[0][locale].trim()).not.toBe('');
      }
    }

    const publishedAssets = [
      published.imageAssetId, published.heroAssetId,
      ...published.routeVariants.flatMap((variant) => [
        variant.imageAssetId, ...variant.steps.map(({ imageAssetId }) => imageAssetId),
      ]),
      ...storySpots.map(({ imageAssetId }) => imageAssetId),
      ...Object.values(output.currentSpots).flatMap(({ imageAssetId, thumbnailAssetIds }) => [
        imageAssetId, ...thumbnailAssetIds,
      ]),
    ];
    for (const asset of publishedAssets) {
      if (asset) {
        expect(record.mediaRights?.[asset]?.sourceUrl.trim(), asset).toBeTruthy();
        expect(record.mediaRights?.[asset]?.license.trim(), asset).toBeTruthy();
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
    const candidate = structuredClone(synthetic);
    candidate.variants['half-day']!.arrival = {
      kind: 'station', name: text, spotId: 'synthetic-spot', sourceId: 'official',
    };
    candidate.journey.routeVariants.push({ ...candidate.journey.routeVariants[0], id: 'full-day' });
    candidate.variants['full-day'] = synthetic.variants['half-day'];
    vi.useFakeTimers({ toFake: ['Date'] });
    vi.setSystemTime(new Date(`${source.retrievedAt}T12:00:00+09:00`));
    vi.resetModules();
    vi.doMock('./journey-records', () => ({ JOURNEY_RECORDS: [...JOURNEY_RECORDS, candidate] }));
    try {
      const p = await import('../features/netlify-parity/factual-presentation');
      const { MoguScreen } = await import('../features/netlify-parity/screens/MoguScreen');
      const { referenceCopy } = await import('../features/netlify-parity/content');
      const { SpotScreen } = await import('../features/netlify-parity/screens/SpotScreen');
      const { resolvePublishedJourneyLocation } = await import('../features/netlify-parity/journey-location');
      expect(resolvePublishedJourneyLocation('/route', '?routeId=synthetic-route')).toMatchObject({
        status: 'resolved', journey: { routeVariants: [{ id: 'half-day' }] },
      });
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
          foodProfile: null,
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
      vi.useRealTimers();
      vi.doUnmock('./journey-records');
      vi.resetModules();
    }
  });
});
