import { describe, expect, it } from 'vitest';
import { checkJourneyAdmission } from './journey-admission';
import type { JourneyRecord } from './journey-record';
import type { DataSource } from './model';

function localized<T>(value: T) {
  return { ja: value, en: value, 'zh-TW': value };
}

function candidate(): JourneyRecord {
  const source: DataSource = {
    name: 'Operator', url: 'https://example.org/visit', sourceType: 'official_web',
    retrievedAt: '2026-11-24', verificationStatus: 'needs_confirmation',
  };
  const copy = { title: 'Title', subtitle: 'Subtitle', description: 'Description', tags: [],
    storyTitle: 'Story', intro: ['Introduction'] };
  const stops = [{ spotId: 'museum' }];
  return {
    municipalityId: 'chofu',
    journey: {
      id: 'journey', regionId: 'region', storyId: 'story', routeId: 'route', foodCultureId: 'culture',
      copy: localized(copy), chapters: localized([{ number: '01', title: 'Chapter', body: 'Claim' }]),
      routeVariants: [{ id: 'half-day', durationMinutes: 60, steps: stops }],
    },
    routeName: localized('Route'),
    location: localized({ area: 'Area', station: '', access: '' }),
    variants: {
      'half-day': {
        steps: [{ spotId: 'museum', description: localized('Visit') }],
        stats: localized({ time: 'About 60 min', minutes: '60', station: '', distance: '', spots: '1' }),
        guidance: localized('Check before visiting'),
        arrival: { kind: 'bus-stop', name: localized('Museum stop'), spotId: 'museum', sourceId: 'operator' },
      },
    },
    spots: {
      museum: {
        presentation: { id: 'museum', regionId: 'region', foodCultureId: 'culture', thumbnailAssetIds: [],
          copy: localized({ name: 'Museum', lead: '', description: '', tags: [], practicalInfo: [], caution: [] }) },
        detail: { tags: [], description: localized('Museum'), information: [], caution: [] },
        officialSource: { ...source },
      },
    },
    story: { groups: { nearby: [], nature: [] }, location: localized({ region: 'Area', station: '' }) },
    sources: { operator: source },
    facts: {
      'journey.copy': { origin: 'editorial', sourceIds: ['operator'] },
      'journey.chapters': { origin: 'editorial', sourceIds: ['operator'] },
      'journey.routeVariants': { origin: 'editorial', sourceIds: ['operator'] },
      'spots.museum': { origin: 'source', sourceIds: ['operator'] },
    },
  };
}

describe('journey publication admission', () => {
  it('admits dated official evidence while stakeholder confirmation is pending', () => {
    expect(checkJourneyAdmission(candidate())).toEqual({
      admitted: true, storyFailures: [], variants: [{ id: 'half-day', failures: [], primarySpotId: 'museum' }],
    });
  });

  it('requires evidence for every localized story claim, honoring more specific evidence', () => {
    const record = candidate();
    record.facts['journey.chapters.zh-TW.0.body'] = { origin: 'demo', sourceIds: ['operator'] };
    expect(checkJourneyAdmission(record)).toMatchObject({ admitted: false, storyFailures: ['sourced story claims'] });
  });

  it('requires a calendar retrieval date for story evidence rather than a legacy verification date', () => {
    const record = candidate();
    record.sources.operator.lastVerified = '2026-11-24';
    record.sources.operator.retrievedAt = '2026-11-31';
    expect(checkJourneyAdmission(record)).toMatchObject({ admitted: false, storyFailures: ['dated story retrieval'] });
  });

  it('requires a dated official transit arrival serving a stop on the variant', () => {
    const record = candidate();
    record.variants['half-day']!.arrival!.spotId = 'other-museum';
    expect(checkJourneyAdmission(record)).toMatchObject({
      admitted: false, variants: [{ failures: ['sourced arrival point'] }],
    });
  });

  it.each(['http://example.org/visit', 'https://example.org/unrelated'])(
    'excludes an invalid or untraced primary destination (%s)', (url) => {
      const record = candidate();
      record.spots.museum.officialSource!.url = url;
      expect(checkJourneyAdmission(record)).toMatchObject({
        admitted: false, variants: [{ failures: ['official destination for primary Spot'] }],
      });
    },
  );

  it('accepts a recorded visitor source and requires a localized, coherent route', () => {
    const record = candidate();
    delete record.spots.museum.officialSource;
    record.spots.museum.visitorSourceId = 'operator';
    record.variants['half-day']!.steps[0].spotId = 'unresolvable';
    record.journey.routeVariants[0].durationMinutes = 0;
    expect(checkJourneyAdmission(record)).toMatchObject({
      admitted: false, variants: [{ primarySpotId: 'museum', failures: [
        'sourced on-site estimate', 'localized route with resolvable ordered stops',
      ] }],
    });
  });
});
