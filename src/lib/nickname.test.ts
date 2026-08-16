/**
 * Session-only conversational nickname (Issue #217).
 *
 * Vitest runs in a node environment, so this uses a minimal sessionStorage
 * shim. The contract: nickname is persisted to sessionStorage (cleared on tab
 * close / reload), never localStorage, so it can never become an
 * account/profile.
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

const originalSessionStorage = globalThis.sessionStorage;

beforeEach(() => {
  globalThis.sessionStorage = new MemoryStorage() as unknown as Storage;
});

afterAll(() => {
  globalThis.sessionStorage = originalSessionStorage;
});

describe('nickname (session-only, Issue #217)', () => {
  it('round-trips a nickname in sessionStorage', () => {
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
