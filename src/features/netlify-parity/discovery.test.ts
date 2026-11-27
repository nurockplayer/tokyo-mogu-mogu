import { describe, expect, it } from 'vitest';
import { discoveryJourney, emptyDiscoveryFilters, matchJourneys } from './discovery';
import { journeyRecord, publishedJourneys } from './journey-publication';

const arrival = { id: 'station:east', name: { ja: '東駅', en: 'East Station', 'zh-TW': '東站' } };
const westArrival = { id: 'station:west', name: { ja: '西駅', en: 'West Station', 'zh-TW': '西站' } };
const sweets = { area: 'east', arrival, minutes: 60, culture: 'sweets', alcoholThemed: false };
const sake = { area: 'east', arrival, minutes: 90, culture: 'sake', alcoholThemed: true };
const market = { area: 'west', arrival: westArrival, minutes: 60, culture: 'produce', alcoholThemed: false };
const catalog = [sake, sweets, market];

describe('admitted journey discovery', () => {
  it('combines area, arrival, time and alcohol, and explains only the matched interest', () => {
    const filters = {
      ...emptyDiscoveryFilters,
      area: 'east',
      arrival: arrival.id,
      minutes: 90,
      cultures: ['sweets', 'sake'],
      alcohol: 'exclude' as const,
    };
    expect(matchJourneys(catalog, filters)).toEqual([
      { ...sweets, reason: { ...filters, cultures: ['sweets'] } },
    ]);
    expect(matchJourneys(catalog, { ...filters, arrival: westArrival.id })).toEqual([]);
    expect(matchJourneys(catalog, { ...filters, minutes: 59 })).toEqual([]);
    expect(matchJourneys(catalog, { ...filters, cultures: ['produce'] })).toEqual([]);
  });

  it('allows any chosen interest and preserves catalog order', () => {
    const filters = { ...emptyDiscoveryFilters, minutes: 90, cultures: ['sweets', 'sake'] };
    expect(matchJourneys(catalog, filters).map(({ culture }) => culture)).toEqual(['sake', 'sweets']);
    expect(matchJourneys(catalog, { ...emptyDiscoveryFilters, area: 'west' }).map(({ culture }) => culture))
      .toEqual(['produce']);
  });

  it('excludes alcohol-themed journeys only when requested', () => {
    expect(matchJourneys(catalog, { ...emptyDiscoveryFilters, alcohol: 'exclude' }).map(({ culture }) => culture))
      .toEqual(['sweets', 'produce']);
    for (const alcohol of ['', 'include'] as const) {
      expect(matchJourneys(catalog, { ...emptyDiscoveryFilters, alcohol }).map(({ culture }) => culture))
        .toEqual(['sake', 'sweets', 'produce']);
    }
  });

  it('keeps non-alcohol journeys in the admitted catalog for the default profile', () => {
    const admitted = publishedJourneys(new Date('2026-11-28T12:00:00+09:00'))
      .map((journey) => discoveryJourney(journey, journeyRecord(journey.id)!));
    const results = matchJourneys(admitted, { ...emptyDiscoveryFilters, alcohol: 'exclude' });

    expect(admitted.some(({ alcoholThemed }) => alcoholThemed)).toBe(true);
    expect(results.length).toBeGreaterThan(0);
    expect(results.map(({ journey }) => journey.id)).toEqual(
      admitted.filter(({ alcoholThemed }) => !alcoholThemed).map(({ journey }) => journey.id),
    );
  });
});
