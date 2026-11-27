import type { JourneyRecord } from '../../data/journey-record';
import { MUNICIPALITIES } from '../../data/municipalities';
import type { LocalizedText } from './factual-presentation';
import type { JourneyPresentation } from './content';

export interface DiscoveryFilters {
  area: string;
  arrival: string;
  minutes: number | null;
  cultures: string[];
  alcohol: '' | 'include' | 'exclude';
}

export const emptyDiscoveryFilters: DiscoveryFilters = {
  area: '', arrival: '', minutes: null, cultures: [], alcohol: '',
};

const storageKey = 'tmm:discoveryPreferences:v1';

export function loadDiscoveryFilters(): DiscoveryFilters {
  try {
    const value = JSON.parse(localStorage.getItem(storageKey) ?? 'null');
    if (value && typeof value.area === 'string' && typeof value.arrival === 'string' &&
      (value.minutes === null || (Number.isInteger(value.minutes) && value.minutes > 0)) &&
      Array.isArray(value.cultures) && value.cultures.every((id: unknown) => typeof id === 'string') &&
      ['', 'include', 'exclude'].includes(value.alcohol)) {
      return value;
    }
  } catch {
    // The same accountless storage boundary as the existing profile.
  }
  return emptyDiscoveryFilters;
}

export function saveDiscoveryFilters(filters: DiscoveryFilters): void {
  try {
    localStorage.setItem(storageKey, JSON.stringify(filters));
  } catch {
    // The current tab still uses the profile preferences.
  }
}

interface DiscoveryEntry {
  area: string;
  arrival: { id: string; name: LocalizedText };
  minutes: number;
  culture: string;
  alcoholThemed: boolean;
}

interface DiscoveryJourney extends DiscoveryEntry {
  journey: JourneyPresentation;
  record: JourneyRecord;
}

type Labels = Map<string, LocalizedText>;

export interface DiscoveryOptions {
  areas: Labels;
  arrivals: Labels;
  cultures: Labels;
}

export function discoveryJourney(journey: JourneyPresentation, record: JourneyRecord): DiscoveryJourney {
  // Use the admitted variant that Route opens by default.
  const variant = journey.routeVariants.find(({ id }) => id === 'half-day') ?? journey.routeVariants[0];
  const arrival = record.variants[variant.id]?.arrival;
  if (!arrival) throw new Error(`Missing admitted arrival for journey: ${journey.id}`);
  return {
    journey,
    record,
    area: record.municipalityId,
    arrival: { id: `${arrival.kind}:${arrival.name.ja}`, name: arrival.name },
    minutes: variant.durationMinutes,
    culture: journey.foodCultureId,
    alcoholThemed: record.alcoholThemed,
  };
}

export function discoveryOptions(catalog: readonly DiscoveryJourney[]): DiscoveryOptions {
  const areas = new Set(catalog.map(({ area }) => area));
  return {
    areas: new Map(MUNICIPALITIES.filter(({ id }) => areas.has(id)).map(({ id, names }) => [id, names])),
    arrivals: new Map(catalog.map(({ arrival }) => [arrival.id, arrival.name])),
    cultures: new Map(catalog.map(({ journey, record }) => [journey.foodCultureId, record.routeName])),
  };
}

export function matchJourneys<T extends DiscoveryEntry>(catalog: readonly T[], filters: DiscoveryFilters) {
  return catalog.flatMap((entry) => {
    const { area, arrival, minutes, culture, alcoholThemed } = entry;
    const cultures = filters.cultures.filter((id) => id === culture);
    if (
      (filters.area && filters.area !== area) ||
      (filters.arrival && filters.arrival !== arrival.id) ||
      (filters.minutes !== null && minutes > filters.minutes) ||
      (filters.cultures.length && !cultures.length) ||
      (filters.alcohol === 'exclude' && alcoholThemed)
    ) return [];

    return [{ ...entry, reason: { ...filters, cultures } }];
  });
}
