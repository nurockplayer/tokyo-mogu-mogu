import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  completeGuidedTutorial,
  isGuidedTutorialActive,
  isGuidedTutorialComplete,
  resetGuidedTutorial,
  shouldStartGuidedTutorial,
  startGuidedTutorial,
} from './tutorial-session';

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

describe('guided tutorial session (#257)', () => {
  it('activates only when the first-use flow explicitly starts it', () => {
    expect(isGuidedTutorialActive()).toBe(false);
    expect(shouldStartGuidedTutorial()).toBe(true);

    startGuidedTutorial();

    expect(isGuidedTutorialActive()).toBe(true);
  });

  it('stays inactive after Result completes the tutorial', () => {
    startGuidedTutorial();

    completeGuidedTutorial();

    expect(isGuidedTutorialActive()).toBe(false);
    expect(isGuidedTutorialComplete()).toBe(true);
    expect(shouldStartGuidedTutorial()).toBe(false);
  });

  it('demo reset removes tutorial state so the next first-use flow can restart it', () => {
    startGuidedTutorial();
    completeGuidedTutorial();

    resetGuidedTutorial();
    expect(isGuidedTutorialActive()).toBe(false);

    startGuidedTutorial();
    expect(isGuidedTutorialActive()).toBe(true);
  });

  it('fails open to normal exploration when session storage is unavailable', () => {
    globalThis.sessionStorage = {
      getItem: () => {
        throw new Error('blocked');
      },
      setItem: () => {
        throw new Error('blocked');
      },
      removeItem: () => {
        throw new Error('blocked');
      },
    } as unknown as Storage;

    expect(() => startGuidedTutorial()).not.toThrow();
    expect(isGuidedTutorialActive()).toBe(false);
    expect(shouldStartGuidedTutorial()).toBe(false);
    expect(() => completeGuidedTutorial()).not.toThrow();
    expect(() => resetGuidedTutorial()).not.toThrow();
  });
});
