/**
 * Badge persistence — logic tests (Issue #39, contract #38).
 *
 * Vitest runs in a node environment; localStorage is not available, so
 * loadBadgeState/saveBadges degrade safely (load returns []). We test the
 * contract-level invariants that don't need storage: demo-earned baseline,
 * idempotency of the wasabi fixture, and separation from MOGU / Saved keys.
 */
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import {
  BADGES_KEY,
  BADGE_WASABI_OKUTAMA,
  FIRST_PILOT_BADGE,
  loadBadgeState,
  saveBadges,
} from './badges';

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

describe('Badge persistence (#39/#38)', () => {
  it('uses its own storage key, distinct from MOGU and Saved Routes', () => {
    expect(BADGES_KEY).toBe('tmm:badges:v1');
    expect(BADGES_KEY).not.toBe('tmm:moguRecent:v1');
    expect(BADGES_KEY).not.toBe('tmm:savedRoutes');
  });

  it('derives the first-pilot badge from the configurable fixture (#112)', () => {
    // Tokyo Wasabi is the current demo fixture, but it must flow through the
    // single FIRST_PILOT_BADGE config, not be hard-coded in persistence or UI.
    expect(FIRST_PILOT_BADGE.id).toBe('badge-wasabi-okutama');
    expect(FIRST_PILOT_BADGE.cultureId).toBe('wasabi-okutama');
    expect(BADGE_WASABI_OKUTAMA).toBe(FIRST_PILOT_BADGE.id);
  });

  it('demo-earned baseline makes the first-pilot fixture earned and persists it idempotently', () => {
    // First load seeds the demo baseline.
    const first = loadBadgeState();
    const pilot = first.find((b) => b.id === FIRST_PILOT_BADGE.id);
    expect(pilot?.status).toBe('earned');

    // A re-load must not duplicate the fixture.
    const second = loadBadgeState();
    expect(second.filter((b) => b.id === FIRST_PILOT_BADGE.id)).toHaveLength(1);

    // Direct save round-trips through the same key.
    saveBadges(second);
    expect(loadBadgeState().filter((b) => b.id === FIRST_PILOT_BADGE.id)).toHaveLength(1);
  });

  it('degrades safely when storage is unavailable without throwing', () => {
    globalThis.localStorage = undefined as unknown as Storage;
    expect(Array.isArray(loadBadgeState())).toBe(true);
  });
});
