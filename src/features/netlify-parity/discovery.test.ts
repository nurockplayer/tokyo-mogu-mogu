import { describe, expect, it } from 'vitest';
import { emptyDiscoveryFilters, matchJourneys } from './discovery';

const arrival = { id: 'station:east', name: { ja: '東駅', en: 'East Station', 'zh-TW': '東站' } };
const westArrival = { id: 'station:west', name: { ja: '西駅', en: 'West Station', 'zh-TW': '西站' } };
const sweets = { area: 'east', arrival, minutes: 60, culture: 'sweets', alcoholThemed: false };
const sake = { area: 'east', arrival, minutes: 90, culture: 'sake', alcoholThemed: true };
const market = { area: 'west', arrival: westArrival, minutes: 60, culture: 'produce' };
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

  it('requires an explicit non-alcohol theme only when excluding alcohol-themed journeys', () => {
    expect(matchJourneys(catalog, { ...emptyDiscoveryFilters, alcohol: 'exclude' }).map(({ culture }) => culture))
      .toEqual(['sweets']);
    for (const alcohol of ['', 'include'] as const) {
      expect(matchJourneys(catalog, { ...emptyDiscoveryFilters, alcohol }).map(({ culture }) => culture))
        .toEqual(['sake', 'sweets', 'produce']);
    }
  });
});
