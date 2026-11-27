import type { JourneyRecord } from '../../data/journey-record';
import { MUNICIPALITIES } from '../../data/municipalities';
import { FOOD_PROFILE_KEY } from '../../lib/food-profile-storage';
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

export const DISCOVERY_PREFERENCES_KEY = 'tmm:discoveryPreferences:v1';

function loadPreferenceFields(key: string): DiscoveryFilters | null {
  try {
    const value = JSON.parse(localStorage.getItem(key) ?? 'null') as Record<string, unknown> | null;
    if (!value || typeof value !== 'object' || Array.isArray(value)) return null;
    const { area, arrival, minutes, cultures, alcohol } = value;
    return {
      area: typeof area === 'string' ? area : '',
      arrival: typeof arrival === 'string' ? arrival : '',
      minutes: typeof minutes === 'number' && Number.isInteger(minutes) && minutes > 0 ? minutes : null,
      cultures: Array.isArray(cultures) ? cultures.filter((id): id is string => typeof id === 'string') : [],
      alcohol: alcohol === 'include' || alcohol === 'exclude' ? alcohol : '',
    };
  } catch {
    // The same accountless storage boundary as the existing profile.
    return null;
  }
}

export function loadDiscoveryFilters(): DiscoveryFilters {
  return loadPreferenceFields(DISCOVERY_PREFERENCES_KEY)
    ?? loadPreferenceFields(FOOD_PROFILE_KEY)
    ?? emptyDiscoveryFilters;
}

export function saveDiscoveryFilters(filters: DiscoveryFilters): boolean {
  try {
    localStorage.setItem(DISCOVERY_PREFERENCES_KEY, JSON.stringify(filters));
    return true;
  } catch {
    return false;
  }
}

export function migrateLegacyFoodProfile(): boolean {
  try {
    if (localStorage.getItem(FOOD_PROFILE_KEY) === null) return true;

    if (!loadPreferenceFields(DISCOVERY_PREFERENCES_KEY)) {
      const legacy = loadPreferenceFields(FOOD_PROFILE_KEY);
      if (legacy && (legacy.area || legacy.arrival || legacy.minutes !== null || legacy.cultures.length || legacy.alcohol)
        && !saveDiscoveryFilters(legacy)) return false;
    }

    localStorage.removeItem(FOOD_PROFILE_KEY);
    return true;
  } catch {
    return false;
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
