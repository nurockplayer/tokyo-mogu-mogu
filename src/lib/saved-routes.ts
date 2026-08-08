/**
 * Saved-route persistence (Issue #45, S5 CTA → shared with #46/#47 S8).
 *
 * Contract (matches #46/#47 exactly):
 * - localStorage key: `tmm:savedRoutes`
 * - value: `Array<{ routeId: string; savedAt: string }>` (ISO 8601)
 * - save / unsave are idempotent: saving twice never duplicates a routeId,
 *   unsaving a route that is not saved is a no-op.
 *
 * The S5 "save this itinerary" CTA writes here; S8 (My Route) reads it later.
 * This module is framework-free and unit-testable.
 */

export const SAVED_ROUTES_KEY = 'tmm:savedRoutes';

/** One saved itinerary entry. */
export interface SavedRouteEntry {
  routeId: string;
  /** ISO 8601 timestamp of when the route was saved. */
  savedAt: string;
}

const isSavedRouteEntry = (value: unknown): value is SavedRouteEntry => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.routeId === 'string' && typeof v.savedAt === 'string';
};

/** Loads saved routes, or [] when nothing is stored / storage is unavailable. */
export function loadSavedRoutes(): SavedRouteEntry[] {
  try {
    const raw = localStorage.getItem(SAVED_ROUTES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    // Keep only well-formed entries so a corrupted record degrades gracefully.
    return parsed.filter(isSavedRouteEntry);
  } catch {
    // Unreadable or blocked storage (e.g. private mode) — treat as no data.
    return [];
  }
}

/** Writes the saved-route array; silently no-ops when storage is unavailable. */
export function saveSavedRoutes(entries: SavedRouteEntry[]): void {
  try {
    localStorage.setItem(SAVED_ROUTES_KEY, JSON.stringify(entries));
  } catch {
    // Storage unavailable — nothing to do.
  }
}

/** Removes all saved routes (demo reset). */
export function clearSavedRoutes(): void {
  try {
    localStorage.removeItem(SAVED_ROUTES_KEY);
  } catch {
    // Storage unavailable — nothing to do.
  }
}

/** True when the given route is already saved. */
export function isRouteSaved(routeId: string): boolean {
  return loadSavedRoutes().some((entry) => entry.routeId === routeId);
}

/**
 * Adds a route to the saved list. Idempotent: saving an already-saved route
 * returns the existing list unchanged (no duplicate routeIds).
 */
export function saveRoute(routeId: string, savedAt = new Date().toISOString()): SavedRouteEntry[] {
  const current = loadSavedRoutes();
  if (current.some((entry) => entry.routeId === routeId)) {
    return current;
  }
  const next = [...current, { routeId, savedAt }];
  saveSavedRoutes(next);
  return next;
}

/**
 * Removes a route from the saved list. Idempotent: unsaving a route that is
 * not saved is a no-op.
 */
export function unsaveRoute(routeId: string): SavedRouteEntry[] {
  const current = loadSavedRoutes();
  const next = current.filter((entry) => entry.routeId !== routeId);
  if (next.length === current.length) {
    return current;
  }
  saveSavedRoutes(next);
  return next;
}
