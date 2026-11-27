import { LOCALE_STORAGE_KEY } from '../../i18n/persistence';
import { BADGES_KEY } from '../../lib/badges';
import { FOOD_PROFILE_KEY } from '../../lib/food-profile-storage';
import { MOGU_RECENT_KEY } from '../../lib/mogu-recent';
import { NICKNAME_KEY } from '../../lib/nickname';
import { loadSavedRoutes, SAVED_ROUTES_KEY } from '../../lib/saved-routes';
import { currentJourneys } from './content';
import { DISCOVERY_PREFERENCES_KEY } from './discovery';

const savesKey = 'tmm:saves:v1';
const legacyFavoritesKey = 'tmm:figmaFavorites:v1';

interface JourneySave {
  id: string;
  routeId?: string;
  savedAt?: string;
}

export interface SpotSave {
  id: string;
  journeyId?: string;
}

interface LocalSaves {
  journeys: JourneySave[];
  spots: SpotSave[];
}

function isSave(value: unknown): value is JourneySave & SpotSave {
  if (!value || typeof value !== 'object') return false;
  const { id, routeId, savedAt, journeyId } = value as Record<string, unknown>;
  return typeof id === 'string' &&
    [routeId, savedAt, journeyId].every((field) => field === undefined || typeof field === 'string');
}

function legacyFavoriteIds() {
  try {
    const value = JSON.parse(localStorage.getItem(legacyFavoritesKey) ?? '{}') as {
      journeyIds?: unknown;
      spotIds?: unknown;
    } | null;
    return {
      journeys: Array.isArray(value?.journeyIds) ? value.journeyIds.filter((id): id is string => typeof id === 'string') : [],
      spots: Array.isArray(value?.spotIds) ? value.spotIds.filter((id): id is string => typeof id === 'string') : [],
    };
  } catch {
    return { journeys: [], spots: [] };
  }
}

export function loadLocalSaves(): LocalSaves {
  try {
    const stored = localStorage.getItem(savesKey);
    if (stored !== null) {
      const value = JSON.parse(stored);
      return {
        journeys: Array.isArray(value?.journeys) ? value.journeys.filter(isSave) : [],
        spots: Array.isArray(value?.spots) ? value.spots.filter(isSave) : [],
      };
    }
    const legacy = legacyFavoriteIds();
    const journeys = new Map<string, JourneySave>(legacy.journeys.map((id) => [id, { id }]));
    for (const { routeId, savedAt } of loadSavedRoutes()) {
      const id = currentJourneys.find((journey) => journey.routeId === routeId)?.id ?? routeId;
      if (!journeys.get(id)?.routeId) journeys.set(id, { id, routeId, savedAt });
    }
    const spots = [...new Set(legacy.spots)].map((id) => ({ id }));
    return { journeys: [...journeys.values()], spots };
  } catch {
    return { journeys: [], spots: [] };
  }
}

export function writeLocalSaves(saves: LocalSaves): boolean {
  try {
    localStorage.setItem(savesKey, JSON.stringify(saves));
    return true;
  } catch {
    return false;
  }
}

export function resetLocalData(): boolean {
  try {
    for (const key of ['tmm:exploration:v1', 'tmm:tutorial:v1']) sessionStorage.removeItem(key);
    for (const key of [
      legacyFavoritesKey, SAVED_ROUTES_KEY, FOOD_PROFILE_KEY, MOGU_RECENT_KEY, BADGES_KEY,
      'tmm:discoveryTripFilters:v1', 'tokyo-mogu-mogu:collection',
      DISCOVERY_PREFERENCES_KEY, NICKNAME_KEY, LOCALE_STORAGE_KEY, savesKey,
    ]) {
      localStorage.removeItem(key);
    }
    return true;
  } catch {
    return false;
  }
}
