/**
 * Auth domain model (Issue #21).
 *
 * These are the shared shapes for the Google identity → application user
 * mapping. Per `docs/specs/authentication/google-login.md`, the internal
 * `userId` is the canonical domain identifier; email and googleId are lookup
 * keys for provisioning only, never foreign keys for domain data.
 */

/**
 * An application user. `userId` is the stable internal canonical identifier
 * that domain data (collections, favorites, stories, etc.) references. The
 * email / display name / avatar are presentational profile fields — never
 * domain foreign keys.
 */
export interface AppUser {
  /** Stable internal canonical identifier for the user. */
  userId: string;
  /** Profile email (lookup/display only, not a domain FK). */
  email: string;
  /** Profile display name. */
  displayName: string;
  /** Profile avatar URL. */
  avatarUrl: string;
}

/** Lifecycle state of the auth flow. Persisted-session restore is #22. */
export type AuthStatus = 'unauthenticated' | 'authenticating' | 'authenticated' | 'error';

/**
 * Carrier for the Google identity returned by the OAuth adapter after a
 * successful sign-in. Deliberately contains no raw tokens/credentials — the
 * adapter extracts exactly these profile fields and nothing more.
 */
export interface GoogleIdentity {
  /** Google provider ID (`sub` claim). Lookup key for provisioning only. */
  googleId: string;
  /** Verified Google account email. Lookup key for provisioning only. */
  email: string;
  /** Google profile display name. */
  displayName: string;
  /** Google profile picture URL. */
  avatarUrl: string;
}
