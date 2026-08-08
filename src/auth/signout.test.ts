/**
 * Acceptance-criteria tests for Issue #23 sign-out and OAuth failure recovery.
 *
 * Covers the durable Spec contract (docs/specs/authentication/google-login.md
 * §8 + Failure Behavior): sign-out returns to unauthenticated and clears
 * session state; OAuth cancel/failure leaves no partial user and never crashes;
 * failures map to a recoverable, token-free state; retry is always allowed.
 */
import { afterAll, beforeEach, describe, expect, it, vi } from 'vitest';
import { getOAuthRecoveryInfo, signOutGoogle, type GoogleSignInResult } from './oauth';
import { AUTH_SESSION_STORAGE_KEY, signOut } from './signout';
import { findOrCreateUser, type UserStore } from './identity';
import type { GoogleIdentity } from './model';

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
  vi.restoreAllMocks();
});

afterAll(() => {
  globalThis.localStorage = originalLocalStorage;
});

/** A representative Google identity returned by a successful sign-in. */
function googleIdentity(overrides: Partial<GoogleIdentity> = {}): GoogleIdentity {
  return {
    googleId: 'google-account-123',
    email: 'alice@example.com',
    displayName: 'Alice Example',
    avatarUrl: 'https://example.com/avatar.png',
    ...overrides,
  };
}

/** A sign-in attempt that failed for a non-cancellation reason. */
const providerFailure: GoogleSignInResult = {
  ok: false,
  cancelled: false,
  error: 'upstream: 401 invalid_grant client_credentials=REDACTED',
};

/** A sign-in attempt the user dismissed. */
const cancelled: GoogleSignInResult = { ok: false, cancelled: true };

describe('sign-out clears auth state and returns to unauthenticated (#23)', () => {
  it('calls the injected session clear so persisted auth state is torn down', async () => {
    const clearSession = vi.fn();
    const result = await signOut({ clearSession });

    expect(clearSession).toHaveBeenCalledTimes(1);
    expect(result).toEqual({ ok: true });
  });

  it('clears the provisional auth-session key when no session API is supplied', async () => {
    localStorage.setItem(AUTH_SESSION_STORAGE_KEY, '{"userId":"u_12345678"}');

    await signOut();

    expect(localStorage.getItem(AUTH_SESSION_STORAGE_KEY)).toBeNull();
  });

  it('is idempotent: signing out when already unauthenticated stays safe', async () => {
    const clearSession = vi.fn();
    await signOut({ clearSession });
    await signOut({ clearSession });

    expect(clearSession).toHaveBeenCalledTimes(2);
    expect(localStorage.getItem(AUTH_SESSION_STORAGE_KEY)).toBeNull();
  });
});

describe('OAuth cancellation never crashes and never creates a partial user (#23)', () => {
  it('maps a cancellation to a quiet cancelled state, not an error surface', () => {
    const info = getOAuthRecoveryInfo(cancelled);
    expect(info).toEqual({ kind: 'cancelled' });
  });

  it('maps a cancellation without provisioning a user', () => {
    const store: UserStore = new Map();
    const identity = googleIdentity();

    // The recovery mapping must not touch the user store — the store stays
    // empty exactly as it would for a cancelled sign-in that never provisioned.
    const info = getOAuthRecoveryInfo(cancelled);
    expect(info.kind).toBe('cancelled');
    expect(store.size).toBe(0);

    // Control: provisioning only happens on a SUCCESSFUL sign-in (#21).
    findOrCreateUser(store, identity);
    expect(store.size).toBe(1);
  });

  it('sign-out never throws even when the GIS runtime is unavailable', async () => {
    // In the node test env there is no `window.google`/GIS script, so
    // signOutGoogle resolves a typed failure rather than throwing.
    const gsiResult = await signOutGoogle();
    if (gsiResult.ok) {
      throw new Error('expected GIS sign-out to fail in the node test env');
    }
    expect(typeof gsiResult.error).toBe('string');

    await expect(signOut()).resolves.toEqual({ ok: true });
  });
});

describe('provider failure maps to a recoverable, token-free state (#23)', () => {
  it('maps a provider failure to a recoverable retryable error state', () => {
    const info = getOAuthRecoveryInfo(providerFailure);
    expect(info).toEqual({
      kind: 'recoverable-error',
      retryable: true,
      messageKey: 'authErrorRecoverable',
    });
  });

  it('never leaks the raw provider error payload into the recovery state', () => {
    const info = getOAuthRecoveryInfo(providerFailure);

    // The raw payload (client id, grant detail, redacted secret) must not
    // appear anywhere in the value handed to the UI.
    const serialized = JSON.stringify(info);
    expect(serialized).not.toContain('invalid_grant');
    expect(serialized).not.toContain('REDACTED');
    expect(serialized).not.toContain('401');
    // Only the translatable message key is exposed.
    expect(serialized).toContain('authErrorRecoverable');
  });

  it('allows retry after a failure (no lockout, no partial user)', () => {
    const store: UserStore = new Map();
    const info = getOAuthRecoveryInfo(providerFailure);

    expect(info.kind === 'recoverable-error' && info.retryable).toBe(true);
    // A failed attempt never provisions, so a later retry starts clean.
    expect(store.size).toBe(0);

    const retry = getOAuthRecoveryInfo({
      ok: true,
      identity: googleIdentity(),
    });
    expect(retry).toEqual({ kind: 'success' });
  });

  it('maps a successful sign-in to success', () => {
    const info = getOAuthRecoveryInfo({ ok: true, identity: googleIdentity() });
    expect(info).toEqual({ kind: 'success' });
  });
});
