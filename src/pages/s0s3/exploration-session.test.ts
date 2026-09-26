import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  beginNewExploration,
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

const originalSessionStorageDescriptor = Object.getOwnPropertyDescriptor(globalThis, 'sessionStorage');

beforeEach(() => {
  Object.defineProperty(globalThis, 'sessionStorage', {
    configurable: true,
    enumerable: true,
    writable: true,
    value: new MemorySessionStorage() as unknown as Storage,
  });
});

afterAll(() => {
  if (originalSessionStorageDescriptor) {
    Object.defineProperty(globalThis, 'sessionStorage', originalSessionStorageDescriptor);
  } else {
    Reflect.deleteProperty(globalThis, 'sessionStorage');
  }
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

  it('treats missing storage and a throwing storage getter as unavailable', () => {
    Reflect.deleteProperty(globalThis, 'sessionStorage');
    expect(loadExplorationAnswers()).toBeNull();
    expect(() => saveExplorationAnswers(createDefaultExplorationAnswers())).not.toThrow();
    expect(() => clearExplorationAnswers()).not.toThrow();
    expect(() => beginNewExploration()).not.toThrow();

    Object.defineProperty(globalThis, 'sessionStorage', {
      configurable: true,
      get() {
        throw new Error('blocked storage getter');
      },
    });
    expect(loadExplorationAnswers()).toBeNull();
    expect(() => saveExplorationAnswers(createDefaultExplorationAnswers())).not.toThrow();
    expect(() => clearExplorationAnswers()).not.toThrow();
    expect(() => beginNewExploration()).not.toThrow();
  });

  it('returns null for a throwing read and recovers when storage is available', () => {
    const answers = createDefaultExplorationAnswers();
    saveExplorationAnswers(answers);
    const storage = globalThis.sessionStorage as unknown as MemorySessionStorage;
    storage.getItem = () => {
      throw new Error('blocked read');
    };

    expect(loadExplorationAnswers()).toBeNull();
    storage.getItem = MemorySessionStorage.prototype.getItem;
    expect(loadExplorationAnswers()).toEqual(answers);
  });

  it('ignores a throwing write and recovers when storage is available', () => {
    const answers = createDefaultExplorationAnswers();
    const storage = globalThis.sessionStorage as unknown as MemorySessionStorage;
    storage.setItem = () => {
      throw new Error('blocked write');
    };

    expect(() => saveExplorationAnswers(answers)).not.toThrow();
    storage.setItem = MemorySessionStorage.prototype.setItem;
    saveExplorationAnswers(answers);
    expect(loadExplorationAnswers()).toEqual(answers);
  });

  it('makes clear and new-trip removal best effort, then recovers', () => {
    const answers = createDefaultExplorationAnswers();
    saveExplorationAnswers(answers);
    const storage = globalThis.sessionStorage as unknown as MemorySessionStorage;
    storage.removeItem = () => {
      throw new Error('blocked removal');
    };

    expect(() => clearExplorationAnswers()).not.toThrow();
    expect(() => beginNewExploration()).not.toThrow();
    expect(loadExplorationAnswers()).toEqual(answers);

    storage.removeItem = MemorySessionStorage.prototype.removeItem;
    beginNewExploration();
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

  it('beginNewExploration clears answers from the previous trip', () => {
    saveExplorationAnswers({
      ...createDefaultExplorationAnswers(),
      tastes: ['refreshing'],
      duration: 'half-day',
    });
    beginNewExploration();
    expect(loadExplorationAnswers()).toBeNull();
  });
});
