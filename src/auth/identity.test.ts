/**
 * Acceptance-criteria tests for Issue #21 identity mapping.
 *
 * Covers the durable Spec contract (docs/specs/authentication/google-login.md):
 * first login creates exactly one user, repeat login reuses the same internal
 * `userId` (no duplicates), and `userId` is the canonical identifier.
 */
import { describe, expect, it } from 'vitest';
import {
  deriveUserId,
  findOrCreateUser,
  findUser,
  type UserStore,
} from './identity';
import type { GoogleIdentity } from './model';

/** Fresh in-memory store per test (no cross-test pollution). */
function freshStore(): UserStore {
  return new Map();
}

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

describe('deterministic userId derivation (#21)', () => {
  it('derives the same userId for the same Google identity', () => {
    const identity = googleIdentity();
    expect(deriveUserId(identity)).toBe(deriveUserId(identity));
  });

  it('derives the same userId regardless of email / display / avatar changes', () => {
    const original = googleIdentity();
    const changed = googleIdentity({ email: 'alice.changed@example.com' });
    expect(deriveUserId(original)).toBe(deriveUserId(changed));
  });

  it('derives distinct userIds for distinct Google accounts', () => {
    const a = googleIdentity({ googleId: 'google-account-123' });
    const b = googleIdentity({ googleId: 'google-account-456' });
    expect(deriveUserId(a)).not.toBe(deriveUserId(b));
  });

  it('returns a userId that looks like a canonical internal id', () => {
    expect(deriveUserId(googleIdentity())).toMatch(/^u_[0-9a-f]{8}$/);
  });
});

describe('first login creates exactly one user (#21)', () => {
  it('provisions a user on first login', () => {
    const store = freshStore();
    const user = findOrCreateUser(store, googleIdentity());

    expect(store.size).toBe(1);
    expect(user).toEqual({
      userId: deriveUserId(googleIdentity()),
      email: 'alice@example.com',
      displayName: 'Alice Example',
      avatarUrl: 'https://example.com/avatar.png',
    });
  });

  it('exposes the derived userId as the canonical identifier', () => {
    const store = freshStore();
    const user = findOrCreateUser(store, googleIdentity());
    expect(user.userId).toBe(deriveUserId(googleIdentity()));
  });

  it('finds the provisioned user by identity after first login', () => {
    const store = freshStore();
    findOrCreateUser(store, googleIdentity());
    expect(findUser(store, googleIdentity())?.userId).toBe(deriveUserId(googleIdentity()));
  });
});

describe('repeat login reuses the same internal userId (#21)', () => {
  it('returns the same userId on a second login with the same Google identity', () => {
    const store = freshStore();
    const first = findOrCreateUser(store, googleIdentity());
    const second = findOrCreateUser(store, googleIdentity());

    expect(second.userId).toBe(first.userId);
  });

  it('never creates a duplicate user on repeat login', () => {
    const store = freshStore();
    findOrCreateUser(store, googleIdentity());
    findOrCreateUser(store, googleIdentity());
    findOrCreateUser(store, googleIdentity());

    expect(store.size).toBe(1);
  });

  it('reuses the existing user without re-provisioning', () => {
    const store = freshStore();
    const first = findOrCreateUser(store, googleIdentity());
    const second = findOrCreateUser(store, googleIdentity());

    // The stored record is the same object — repeat login resolves to the
    // existing identity rather than replacing it.
    expect(store.get(googleIdentity().googleId)).toBe(first);
    expect(second).toBe(first);
  });

  it('treats a later profile change as the same user', () => {
    const store = freshStore();
    const first = findOrCreateUser(store, googleIdentity());
    const later = findOrCreateUser(
      store,
      googleIdentity({ displayName: 'Alice (updated)' }),
    );

    expect(later.userId).toBe(first.userId);
    expect(store.size).toBe(1);
  });

  it('provisions separate users for separate Google accounts', () => {
    const store = freshStore();
    const a = findOrCreateUser(store, googleIdentity({ googleId: 'google-account-123' }));
    const b = findOrCreateUser(store, googleIdentity({ googleId: 'google-account-456' }));

    expect(a.userId).not.toBe(b.userId);
    expect(store.size).toBe(2);
  });
});

describe('canonical identity contract (#21)', () => {
  it('maps one Google identity to exactly one application user', () => {
    const store = freshStore();
    const identity = googleIdentity();
    const user = findOrCreateUser(store, identity);

    // One identity → one user, and the user stores the identity that created it.
    expect(store.size).toBe(1);
    expect(store.get(identity.googleId)).toBe(user);
  });
});
