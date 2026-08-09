import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  clearMoguRecent,
  loadMoguRecent,
  MOGU_RECENT_KEY,
  MOGU_RECENT_MAX,
  recordMoguRecent,
  type MoguRecentEntry,
} from './mogu-recent';
import { createDefaultExplorationAnswers } from './exploration';

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

const baseEntry = {
  resultId: 'wasabi-okutama',
  titleKey: 'dataWasabiName',
  summary: ['grate-fresh'],
  exploration: createDefaultExplorationAnswers(),
  hasDietaryConsiderations: false,
};

describe('MOGU Recent (#78 → #94)', () => {
  it('records a successful result automatically (no Save needed)', () => {
    recordMoguRecent(baseEntry, '2026-08-10T01:00:00.000Z');
    const recent = loadMoguRecent();
    expect(recent).toHaveLength(1);
    expect(recent[0].resultId).toBe('wasabi-okutama');
    expect(recent[0].createdAt).toBe('2026-08-10T01:00:00.000Z');
  });

  it('keeps newest first and caps at MOGU_RECENT_MAX', () => {
    for (let i = 1; i <= MOGU_RECENT_MAX + 3; i += 1) {
      recordMoguRecent(
        { ...baseEntry, resultId: `result-${i}` },
        `2026-08-10T0${i}:00:00.000Z`,
      );
    }
    const recent = loadMoguRecent();
    expect(recent).toHaveLength(MOGU_RECENT_MAX);
    // Newest (result-8) first, oldest kept is result-4 (the 5 most recent).
    expect(recent[0].resultId).toBe(`result-${MOGU_RECENT_MAX + 3}`);
    expect(recent[MOGU_RECENT_MAX - 1].resultId).toBe(`result-${MOGU_RECENT_MAX - 1}`);
  });

  it('replaces a repeated deterministic result instead of duplicating it', () => {
    const first = recordMoguRecent(baseEntry, '2026-08-10T01:00:00.000Z');
    const second = recordMoguRecent(baseEntry, '2026-08-10T02:00:00.000Z');
    expect(first).toHaveLength(1);
    expect(second).toHaveLength(1);
    expect(second[0].createdAt).toBe('2026-08-10T02:00:00.000Z');
    expect(loadMoguRecent()).toHaveLength(1);
  });

  it('returns empty for no data and fails safely on corruption', () => {
    expect(loadMoguRecent()).toEqual([]);
    localStorage.setItem(MOGU_RECENT_KEY, '{not json');
    expect(loadMoguRecent()).toEqual([]);
    localStorage.setItem(MOGU_RECENT_KEY, JSON.stringify([{ bad: true }]));
    expect(loadMoguRecent()).toEqual([]);
  });

  it('remains distinct from Saved Routes storage', () => {
    recordMoguRecent(baseEntry);
    expect(localStorage.getItem(MOGU_RECENT_KEY)).not.toBeNull();
    expect(localStorage.getItem('tmm:savedRoutes')).toBeNull();
  });

  it('preserves the dietary-context snapshot for historical results', () => {
    recordMoguRecent({ ...baseEntry, hasDietaryConsiderations: true });
    expect(loadMoguRecent()[0].hasDietaryConsiderations).toBe(true);
  });

  it('clearMoguRecent removes the Recent history (demo reset)', () => {
    recordMoguRecent(baseEntry);
    expect(loadMoguRecent()).toHaveLength(1);
    clearMoguRecent();
    expect(loadMoguRecent()).toEqual([]);
    expect(localStorage.getItem(MOGU_RECENT_KEY)).toBeNull();
  });

  it('loads only well-formed entries and drops stale/malformed ones', () => {
    localStorage.setItem(
      MOGU_RECENT_KEY,
      JSON.stringify([
        { ...baseEntry, createdAt: '2026-08-10T01:00:00.000Z' },
        { resultId: 'x', titleKey: 'y', summary: ['ok'], createdAt: '2026-01-01T00:00:00.000Z' }, // no exploration
      ] as MoguRecentEntry[]),
    );
    const recent = loadMoguRecent();
    expect(recent).toHaveLength(1);
    expect(recent[0].resultId).toBe('wasabi-okutama');
  });
});
