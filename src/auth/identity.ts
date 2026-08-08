/**
 * Identity mapping and provisioning (Issue #21).
 *
 * Pure, framework-free functions that guarantee the Spec's core invariant:
 * one Google identity ↔ exactly one application user, with the same internal
 * `userId` on every login.
 *
 * - `deriveUserId(identity)` deterministically maps a Google identity to the
 *   canonical internal `userId` (a hash of the immutable googleId), so repeat
 *   login always resolves to the same `userId`.
 * - `findOrCreateUser(store, identity)` provisions on first login (creating
 *   exactly one user) and reuses the existing user on repeat login (never a
 *   duplicate). Provisioning only happens after a successful OAuth response —
 *   callers must not call this for cancelled/failed flows (see `oauth.ts`).
 *
 * An in-memory `Map<googleId, AppUser>` is the MVP store (no backend).
 * Persistence across reloads is #22's job.
 */
import type { AppUser, GoogleIdentity } from './model';

/** In-memory user store: keyed by the Google provider id (a lookup key). */
export type UserStore = Map<string, AppUser>;

/** Minimal stable hash suitable for deterministic user id derivation. */
function hashString(input: string): string {
  // FNV-1a 32-bit — deterministic, dependency-free, and stable across runs.
  let hash = 0x811c9dc5;
  for (let i = 0; i < input.length; i += 1) {
    hash ^= input.charCodeAt(i);
    hash = Math.imul(hash, 0x01000193);
  }
  return (hash >>> 0).toString(16).padStart(8, '0');
}

/**
 * Derives the canonical internal `userId` from a Google identity. Uses the
 * immutable Google provider id (`googleId`), never the mutable email, so the
 * mapping stays stable even if the user changes their email address. Returns
 * a hex string, e.g. `u_1a2b3c4d`.
 */
export function deriveUserId(identity: GoogleIdentity): string {
  return `u_${hashString(identity.googleId)}`;
}

/**
 * Looks up the user that maps to this Google identity, returning `undefined`
 * when none has been provisioned yet.
 */
export function findUser(store: UserStore, identity: GoogleIdentity): AppUser | undefined {
  return store.get(identity.googleId);
}

/**
 * Finds the user for a Google identity, or provisions exactly one on first
 * login. Repeat login with the same Google identity reuses the same internal
 * `userId` — never creates a duplicate.
 *
 * The resulting `AppUser` always carries the canonical `userId` derived from
 * the identity; email / displayName / avatarUrl are profile fields only.
 */
export function findOrCreateUser(store: UserStore, identity: GoogleIdentity): AppUser {
  const existing = findUser(store, identity);
  if (existing) {
    return existing;
  }
  const user: AppUser = {
    userId: deriveUserId(identity),
    email: identity.email,
    displayName: identity.displayName,
    avatarUrl: identity.avatarUrl,
  };
  store.set(identity.googleId, user);
  return user;
}
