import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  clearSavedRoutes,
  isRouteSaved,
  loadSavedRoutes,
  SAVED_ROUTES_KEY,
  saveRoute,
  saveSavedRoutes,
  unsaveRoute,
} from './saved-routes';

/** Minimal in-memory localStorage shim (vitest env is node). */
class MemoryStorage implements Storage {
  private store = new Map<string, string>();
  get length() {
    return this.store.size;
  }
  clear() {
    this.store.clear();
  }
  getItem(key: string) {
    return this.store.get(key) ?? null;
  }
  key(index: number) {
    return Array.from(this.store.keys())[index] ?? null;
  }
  removeItem(key: string) {
    this.store.delete(key);
  }
  setItem(key: string, value: string) {
    this.store.set(key, String(value));
  }
}

const originalLocalStorage = globalThis.localStorage;

beforeEach(() => {
  globalThis.localStorage = new MemoryStorage() as unknown as Storage;
});

afterAll(() => {
  globalThis.localStorage = originalLocalStorage;
});

describe('saved-routes persistence (#45)', () => {
  it('loads an empty list when nothing is stored', () => {
    expect(loadSavedRoutes()).toEqual([]);
  });

  it('round-trips a saved route under the shared key', () => {
    saveRoute('okutama-wasabi-journey', '2026-08-08T00:00:00.000Z');
    expect(localStorage.getItem(SAVED_ROUTES_KEY)).toBe(
      JSON.stringify([
        { routeId: 'okutama-wasabi-journey', savedAt: '2026-08-08T00:00:00.000Z' },
      ]),
    );
    expect(loadSavedRoutes()).toEqual([
      { routeId: 'okutama-wasabi-journey', savedAt: '2026-08-08T00:00:00.000Z' },
    ]);
  });

  it('generates and persists an ISO-8601 timestamp when saving without one', () => {
    const [entry] = saveRoute('route-with-generated-timestamp');

    expect(entry.routeId).toBe('route-with-generated-timestamp');
    expect(entry.savedAt).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z$/);
    expect(Number.isNaN(Date.parse(entry.savedAt))).toBe(false);
    expect(new Date(entry.savedAt).toISOString()).toBe(entry.savedAt);
    expect(loadSavedRoutes()).toEqual([entry]);
    expect(JSON.parse(localStorage.getItem(SAVED_ROUTES_KEY) ?? '[]')).toEqual([entry]);
  });

  it('save is idempotent — no duplicate routeIds', () => {
    saveRoute('route-a');
    saveRoute('route-a');
    saveRoute('route-a');
    const entries = loadSavedRoutes();
    expect(entries).toHaveLength(1);
    expect(new Set(entries.map((e) => e.routeId)).size).toBe(1);
  });

  it('unsave is idempotent — removing an unsaved route is a no-op', () => {
    const before = unsaveRoute('never-saved');
    expect(before).toEqual([]);
    saveRoute('route-a');
    saveRoute('route-b');
    const after = unsaveRoute('route-b');
    expect(after).toEqual([{ routeId: 'route-a', savedAt: expect.any(String) }]);
    // Removing the same route again is a no-op.
    expect(unsaveRoute('route-b')).toEqual([{ routeId: 'route-a', savedAt: expect.any(String) }]);
  });

  it('isRouteSaved reflects the stored state', () => {
    expect(isRouteSaved('route-a')).toBe(false);
    saveRoute('route-a');
    expect(isRouteSaved('route-a')).toBe(true);
    unsaveRoute('route-a');
    expect(isRouteSaved('route-a')).toBe(false);
  });

  it('returns an empty list for corrupted data', () => {
    localStorage.setItem(SAVED_ROUTES_KEY, '{not json');
    expect(loadSavedRoutes()).toEqual([]);
    localStorage.setItem(SAVED_ROUTES_KEY, '{"routeId":"nope"}');
    expect(loadSavedRoutes()).toEqual([]);
    localStorage.setItem(SAVED_ROUTES_KEY, '[{"routeId":"ok","savedAt":""},{"bad":1}]');
    expect(loadSavedRoutes()).toEqual([{ routeId: 'ok', savedAt: '' }]);
  });

  it('saveSavedRoutes replaces the whole list', () => {
    saveSavedRoutes([
      { routeId: 'route-a', savedAt: '2026-08-08T00:00:00.000Z' },
      { routeId: 'route-b', savedAt: '2026-08-08T00:00:00.000Z' },
    ]);
    expect(loadSavedRoutes()).toHaveLength(2);
  });

  it('clearSavedRoutes removes the whole list (demo reset)', () => {
    saveRoute('route-a');
    saveRoute('route-b');
    expect(loadSavedRoutes()).toHaveLength(2);
    clearSavedRoutes();
    expect(loadSavedRoutes()).toEqual([]);
    expect(localStorage.getItem(SAVED_ROUTES_KEY)).toBeNull();
  });
});
