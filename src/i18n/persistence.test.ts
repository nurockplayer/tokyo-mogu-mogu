/**
 * Acceptance-criteria tests for Issue #82 locale persistence.
 *
 * Mirrors the localStorage contract from `src/auth/session.test.ts`: a valid
 * locale survives a save/load round-trip (so a full page reload keeps the
 * language), an unknown/corrupt value resolves safely to the default locale,
 * and unavailable storage degrades to the default instead of crashing.
 */
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { DEFAULT_LOCALE } from './resources';
import { LOCALE_STORAGE_KEY, loadStoredLocale, storeLocale } from './persistence';

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

describe('i18n locale persistence (#82)', () => {
  it('restores the persisted locale on load', () => {
    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      storeLocale(locale);
      expect(loadStoredLocale()).toBe(locale);
    }
  });

  it('round-trips the last selected locale', () => {
    storeLocale('en');
    storeLocale('zh-TW');
    expect(loadStoredLocale()).toBe('zh-TW');
  });

  it('persists under the tmm:locale key', () => {
    storeLocale('en');
    expect(localStorage.getItem(LOCALE_STORAGE_KEY)).toBe('en');
  });

  it('returns the default locale when nothing is stored', () => {
    expect(loadStoredLocale()).toBe(DEFAULT_LOCALE);
  });

  it('returns the default locale for an unknown / corrupt stored value', () => {
    localStorage.setItem(LOCALE_STORAGE_KEY, 'fr');
    expect(loadStoredLocale()).toBe(DEFAULT_LOCALE);

    // Case-sensitive: 'EN' is not a valid Locale code.
    localStorage.setItem(LOCALE_STORAGE_KEY, 'EN');
    expect(loadStoredLocale()).toBe(DEFAULT_LOCALE);

    localStorage.setItem(LOCALE_STORAGE_KEY, '');
    expect(loadStoredLocale()).toBe(DEFAULT_LOCALE);
  });

  it('degrades to the default locale when storage is unavailable', () => {
    globalThis.localStorage = undefined as unknown as Storage;
    expect(loadStoredLocale()).toBe(DEFAULT_LOCALE);
    expect(() => storeLocale('en')).not.toThrow();
    globalThis.localStorage = new MemoryStorage() as unknown as Storage;
  });

  it('swallows storage read/write errors (private mode, quota)', () => {
    const throwing = {
      getItem: () => {
        throw new Error('denied');
      },
      setItem: () => {
        throw new Error('quota');
      },
    } as unknown as Storage;
    globalThis.localStorage = throwing;
    expect(loadStoredLocale()).toBe(DEFAULT_LOCALE);
    expect(() => storeLocale('ja')).not.toThrow();
    globalThis.localStorage = new MemoryStorage() as unknown as Storage;
  });
});
