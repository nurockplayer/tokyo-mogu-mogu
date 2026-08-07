/**
 * Local persistence for collection state (Issue #7).
 *
 * Persists collected food cultures and visited places to localStorage so the
 * user's progress survives page reloads — no account, no server.
 */
import type { CollectionState } from './collection';

const STORAGE_KEY = 'tokyo-mogu-mogu:collection';

const isCollectionState = (value: unknown): value is CollectionState => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return Array.isArray(v.collected) && Array.isArray(v.visitedPlaces);
};

/** Loads persisted state, or null when nothing is stored / storage is unavailable. */
export function loadCollection(): CollectionState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isCollectionState(parsed)) return null;
    return parsed;
  } catch {
    // Unreadable or blocked storage (e.g. private mode) — treat as no data.
    return null;
  }
}

/** Persists state; silently no-ops when storage is unavailable. */
export function saveCollection(state: CollectionState): void {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // Storage unavailable — nothing to do.
  }
}

/** Removes all persisted collection data (demo reset). */
export function clearCollection(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    // Storage unavailable — nothing to do.
  }
}
