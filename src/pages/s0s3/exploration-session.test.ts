import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  clearExplorationAnswers,
  loadExplorationAnswers,
  saveExplorationAnswers,
} from './exploration-session';
import { createDefaultExplorationAnswers } from '../../lib/exploration';

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

describe('exploration session persistence (#78)', () => {
  it('round-trips saved answers through sessionStorage', () => {
    const answers = createDefaultExplorationAnswers();
    saveExplorationAnswers(answers);
    expect(loadExplorationAnswers()).toEqual(answers);
  });

  it('returns null when nothing is stored', () => {
    expect(loadExplorationAnswers()).toBeNull();
  });

  it('returns null for corrupted data', () => {
    sessionStorage.setItem('tmm:exploration:v1', '{not json');
    expect(loadExplorationAnswers()).toBeNull();
  });

  it('clearExplorationAnswers removes the persisted exploration (demo reset)', () => {
    saveExplorationAnswers(createDefaultExplorationAnswers());
    expect(loadExplorationAnswers()).not.toBeNull();
    clearExplorationAnswers();
    expect(loadExplorationAnswers()).toBeNull();
    expect(sessionStorage.getItem('tmm:exploration:v1')).toBeNull();
  });
});
