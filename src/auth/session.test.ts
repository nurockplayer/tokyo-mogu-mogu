/**
 * Acceptance-criteria tests for Issue #22 session persistence.
 *
 * Covers the durable Spec contract (docs/specs/authentication/google-login.md):
 * a valid session survives reload (round-trip), an invalid/expired session
 * resolves safely to no session (→ unauthenticated), and the restored current
 * user exposes the same canonical internal `userId`.
 */
import { afterAll, beforeEach, describe, expect, it } from 'vitest';
import { SESSION_KEY, clearSession, loadSession, saveSession } from './session';
import type { AppUser } from './model';

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

/** A representative persisted application user (canonical AppUser shape). */
function appUser(overrides: Partial<AppUser> = {}): AppUser {
  return {
    userId: 'u_1a2b3c4d',
    email: 'alice@example.com',
    displayName: 'Alice Example',
    avatarUrl: 'https://example.com/avatar.png',
    ...overrides,
  };
}

describe('session persistence (#22)', () => {
  it('saves then loads the same session', () => {
    const user = appUser();
    saveSession(user);
    expect(loadSession()).toEqual(user);
  });

  it('returns null when nothing is stored', () => {
    expect(loadSession()).toBeNull();
  });

  it('returns null for corrupt / malformed data', () => {
    localStorage.setItem(SESSION_KEY, '{not json');
    expect(loadSession()).toBeNull();

    localStorage.setItem(SESSION_KEY, '{"userId":42}');
    expect(loadSession()).toBeNull();

    localStorage.setItem(SESSION_KEY, 'null');
    expect(loadSession()).toBeNull();
  });

  it('returns null when the stored record is not a valid AppUser', () => {
    localStorage.setItem(SESSION_KEY, JSON.stringify({ userId: 'u_1', email: 'x@y.z' }));
    expect(loadSession()).toBeNull();
  });

  it('clearSession removes the persisted session', () => {
    saveSession(appUser());
    clearSession();
    expect(loadSession()).toBeNull();
  });
});

describe('reload preserves the canonical internal userId (#22)', () => {
  it('restores the same canonical userId after a save/load round-trip', () => {
    const user = appUser({ userId: 'u_deadbeef' });
    saveSession(user);
    const restored = loadSession();
    expect(restored?.userId).toBe('u_deadbeef');
  });

  it('does not store or expose raw provider details', () => {
    saveSession(appUser());
    const raw = localStorage.getItem(SESSION_KEY);
    expect(raw).not.toContain('googleId');
    expect(raw).not.toContain('credential');
    expect(raw).not.toContain('token');
  });
});
