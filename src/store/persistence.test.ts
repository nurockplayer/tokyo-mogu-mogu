import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { clearCollection, loadCollection, saveCollection } from './persistence';
import type { CollectionState } from './collection';

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

describe('collection persistence (#7)', () => {
  const sample: CollectionState = {
    collected: [{ foodCultureId: 'wasabi-okutama', collectedAt: '2026-08-08T00:00:00.000Z' }],
    visitedPlaces: [{ placeId: 'okutama-wasabi-field', visitedAt: '2026-08-08T00:00:00.000Z' }],
  };

  it('saves then loads the same state', () => {
    saveCollection(sample);
    expect(loadCollection()).toEqual(sample);
  });

  it('returns null when nothing is stored', () => {
    expect(loadCollection()).toBeNull();
  });

  it('returns null for corrupted data', () => {
    localStorage.setItem('tokyo-mogu-mogu:collection', '{not json');
    expect(loadCollection()).toBeNull();
    localStorage.setItem('tokyo-mogu-mogu:collection', '{"collected":"nope"}');
    expect(loadCollection()).toBeNull();
  });

  it('clearCollection removes persisted state', () => {
    saveCollection(sample);
    clearCollection();
    expect(loadCollection()).toBeNull();
  });
});
