/**
 * Saved-route persistence contract tests (Issue #46, shared with #45/#47).
 *
 * Asserts the shared localStorage contract (`tmm:savedRoutes`,
 * `Array<{ routeId; savedAt }>`) and the idempotent save/unsave behavior.
 */
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  MODEL_ROUTE_ID,
  isRouteSaved,
  loadSavedRoutes,
  saveRoute,
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

describe('saved routes (#46)', () => {
  it('loads an empty list when nothing is stored', () => {
    expect(loadSavedRoutes()).toEqual([]);
    expect(isRouteSaved(MODEL_ROUTE_ID)).toBe(false);
  });

  it('saves a route idempotently without duplicates', () => {
    saveRoute(MODEL_ROUTE_ID);
    saveRoute(MODEL_ROUTE_ID);
    const routes = loadSavedRoutes();
    expect(routes).toHaveLength(1);
    expect(routes[0].routeId).toBe(MODEL_ROUTE_ID);
    expect(routes[0].savedAt).toMatch(/^\d{4}-\d{2}-\d{2}T/); // ISO 8601
    expect(isRouteSaved(MODEL_ROUTE_ID)).toBe(true);
  });

  it('unsaves idempotently and returns [] when nothing remains', () => {
    saveRoute(MODEL_ROUTE_ID);
    const after = unsaveRoute(MODEL_ROUTE_ID);
    expect(after).toEqual([]);
    expect(isRouteSaved(MODEL_ROUTE_ID)).toBe(false);
    // Unsave again is a safe no-op.
    expect(unsaveRoute(MODEL_ROUTE_ID)).toEqual([]);
  });

  it('persists across a fresh load (reload simulation)', () => {
    saveRoute(MODEL_ROUTE_ID);
    expect(loadSavedRoutes()).toHaveLength(1);
  });

  it('uses the exact shared storage key and value shape', () => {
    saveRoute(MODEL_ROUTE_ID);
    const raw = localStorage.getItem('tmm:savedRoutes');
    expect(raw).toBeTruthy();
    const parsed: unknown = JSON.parse(raw ?? '[]');
    expect(Array.isArray(parsed)).toBe(true);
    const entry = (parsed as Array<Record<string, unknown>>)[0];
    expect(entry.routeId).toBe(MODEL_ROUTE_ID);
    expect(typeof entry.savedAt).toBe('string');
  });

  it('treats corrupted storage as an empty list', () => {
    localStorage.setItem('tmm:savedRoutes', '{not json');
    expect(loadSavedRoutes()).toEqual([]);
    expect(isRouteSaved(MODEL_ROUTE_ID)).toBe(false);
  });
});
