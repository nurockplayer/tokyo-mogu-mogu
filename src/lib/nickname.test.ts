/**
 * Locally persisted conversational nickname (Issue #217; Issue #226 moves it to
 * localStorage for prototype continuity).
 *
 * Vitest runs in a node environment, so this uses a minimal localStorage shim.
 * The contract: nickname is persisted to localStorage (cleared by the demo
 * reset), never an account/profile.
 */
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { clearNickname, hasNickname, loadNickname, saveNickname } from './nickname';

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

describe('nickname (local prototype continuity, Issue #226)', () => {
  it('round-trips a nickname in localStorage', () => {
    expect(loadNickname()).toBeNull();
    saveNickname('ナナミ');
    expect(loadNickname()).toBe('ナナミ');
    expect(hasNickname()).toBe(true);
  });

  it('trims input and treats blank as unset', () => {
    saveNickname('  ナナミ  ');
    expect(loadNickname()).toBe('ナナミ');
    saveNickname('   ');
    expect(loadNickname()).toBeNull();
    expect(hasNickname()).toBe(false);
  });

  it('caps over-long input', () => {
    saveNickname('a'.repeat(200));
    expect(loadNickname()!.length).toBeLessThanOrEqual(32);
  });

  it('clears the nickname', () => {
    saveNickname('ナナミ');
    clearNickname();
    expect(loadNickname()).toBeNull();
    expect(hasNickname()).toBe(false);
  });
});
