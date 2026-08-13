/**
 * MOGU Recent page — logic tests (Issue #94).
 *
 * Vitest runs in a node environment, so we test the pure helpers (reopen href
 * construction) rather than the DOM. Persistence round-trips (max 5, ordering,
 * dedupe, corruption) are already covered by src/lib/mogu-recent.test.ts; the
 * Result→MOGU auto-record is covered by ResultPage's ResultRecorder.
 */
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { loadMoguRecent } from '../lib/mogu-recent';
import type { MoguRecentEntry } from '../lib/mogu-recent';
import { saveExplorationAnswers, loadExplorationAnswers } from './s0s3/exploration-session';
import { reopenHref, restoreReopenSession } from './MoguPage';

/** Minimal in-memory sessionStorage shim (vitest env is node). */
class MemorySessionStorage implements Storage {
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

const originalSessionStorage = globalThis.sessionStorage;

beforeEach(() => {
  globalThis.sessionStorage = new MemorySessionStorage() as unknown as Storage;
});

afterAll(() => {
  globalThis.sessionStorage = originalSessionStorage;
});

function makeEntry(overrides: Partial<MoguRecentEntry> = {}): MoguRecentEntry {
  return {
    resultId: 'wasabi-okutama',
    titleKey: 'dataWasabiName',
    summary: ['grate-fresh', 'nature-valley'],
    createdAt: '2026-08-10T02:00:00.000Z',
    exploration: {
      tastes: ['refreshing'],
      experiences: ['eat'],
      baseArea: 'okutama',
      travelTime: 'within-60',
      interests: ['nature'],
      duration: 'half-day',
    },
    hasDietaryConsiderations: false,
    ...overrides,
  };
}

describe('MOGU Recent page helpers (#94)', () => {
  it('reopen href is a pure href builder and does not touch the session', () => {
    // An in-progress current-trip session must survive browsing MOGU.
    saveExplorationAnswers({
      tastes: ['spicy'],
      experiences: ['make'],
      baseArea: null,
      travelTime: null,
      interests: ['craft'],
      duration: null,
    });
    const before = loadExplorationAnswers();
    const href = reopenHref(makeEntry());
    expect(href).toBe('/explore/result?from=mogu&resultId=wasabi-okutama');
    // Building the link (what render does per card) must not overwrite the session.
    expect(loadExplorationAnswers()).toEqual(before);
  });

  it('restoreReopenSession (click-time) replaces the session with the entry answers', () => {
    const entry = makeEntry();
    restoreReopenSession(entry);
    expect(loadExplorationAnswers()).toEqual(entry.exploration);
  });

  it('includes candidate identity for new multi-candidate history entries', () => {
    expect(reopenHref(makeEntry({ candidateId: 'demo-okutama-wasabi' }))).toBe(
      '/explore/result?from=mogu&resultId=wasabi-okutama&candidateId=demo-okutama-wasabi',
    );
  });

  it('restoreReopenSession overwrites any previous current-trip answers', () => {
    saveExplorationAnswers({
      tastes: ['spicy'],
      experiences: ['make'],
      baseArea: null,
      travelTime: null,
      interests: ['craft'],
      duration: null,
    });
    const entry = makeEntry();
    restoreReopenSession(entry);
    expect(loadExplorationAnswers()).toEqual(entry.exploration);
  });

  it('loadMoguRecent is the data source for the list (empty when nothing stored)', () => {
    // The lib already caps/dedupes/validates; the page just renders it.
    expect(Array.isArray(loadMoguRecent())).toBe(true);
    expect(loadMoguRecent()).toHaveLength(0);
  });
});
