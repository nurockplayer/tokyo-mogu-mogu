/**
 * Saved-route local persistence (Issue #46, shared with #45/#47).
 *
 * localStorage contract (shared):
 *   key:  `tmm:savedRoutes`
 *   value: `Array<{ routeId: string; savedAt: string }>` (ISO 8601)
 *
 * This module is the single owner of the `save` support action's persistence.
 * #47 (S8 My Route) reads the same key later. Save/unsave is idempotent —
 * duplicates are never written. Storage failures degrade to no-ops so the demo
 * never breaks when localStorage is unavailable (e.g. private mode).
 */
const SAVED_ROUTES_KEY = 'tmm:savedRoutes';

export interface SavedRoute {
  routeId: string;
  savedAt: string;
}

/** The model route id users save from the S7 support panel. */
export const MODEL_ROUTE_ID = 'okutama-wasabi-journey';

const isSavedRoute = (value: unknown): value is SavedRoute => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return typeof v.routeId === 'string' && typeof v.savedAt === 'string';
};

/** Loads saved routes, or [] when nothing is stored / storage is unavailable. */
export function loadSavedRoutes(): SavedRoute[] {
  try {
    const raw = localStorage.getItem(SAVED_ROUTES_KEY);
    if (!raw) return [];
    const parsed: unknown = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(isSavedRoute);
  } catch {
    // Unreadable or blocked storage (e.g. private mode) — treat as empty.
    return [];
  }
}

/** True when the route is currently saved. */
export function isRouteSaved(routeId: string): boolean {
  return loadSavedRoutes().some((r) => r.routeId === routeId);
}

/**
 * Adds a route to the saved list. Idempotent: a route already saved is a no-op.
 * Returns the updated saved state.
 */
export function saveRoute(routeId: string): SavedRoute[] {
  const current = loadSavedRoutes();
  if (current.some((r) => r.routeId === routeId)) {
    return current;
  }
  const next = [...current, { routeId, savedAt: new Date().toISOString() }];
  try {
    localStorage.setItem(SAVED_ROUTES_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable — nothing to persist.
  }
  return next;
}

/**
 * Removes a route from the saved list. Idempotent: removing a route that is not
 * saved is a no-op. Returns the updated saved state.
 */
export function unsaveRoute(routeId: string): SavedRoute[] {
  const next = loadSavedRoutes().filter((r) => r.routeId !== routeId);
  try {
    localStorage.setItem(SAVED_ROUTES_KEY, JSON.stringify(next));
  } catch {
    // Storage unavailable — nothing to persist.
  }
  return next;
}
