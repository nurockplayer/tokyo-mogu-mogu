/**
 * Sign-out lifecycle and authenticated-state teardown (Issue #23).
 *
 * Durable contract (docs/specs/authentication/google-login.md §8):
 *   - sign-out returns the application to an unauthenticated state, and
 *   - auth failures are recoverable and leave no partial user.
 *
 * This module is the single place that tears down the authenticated state. It
 * is intentionally thin and side-effect-injectable so the lifecycle is
 * unit-testable without a browser:
 *
 *   - `signOut(sessionApi)` clears local session state (the durable
 *     unauthenticated transition) and then performs a BEST-EFFORT Google-side
 *     sign-out that never throws into the UI.
 *
 * Seam note for #22 (`src/auth/session.ts`, in flight): the persisted session
 * lives in #22's `session.ts`. `SessionApi.clearSession` is the hook through
 * which #22's real `clearSession` is injected once it merges. Until then this
 * module uses a minimal local clear of the provisional auth-session storage
 * key. #22's AuthProvider should call `signOut({ clearSession })` so the real
 * persisted session is cleared too — never bypass this module.
 */
import { signOutGoogle } from './oauth';

/**
 * The session-teardown capability #23 needs. `clearSession` is owned by #22's
 * `src/auth/session.ts`; it is injected here so this module stays independent
 * of #22's storage layout.
 */
export interface SessionApi {
  /** Clears persisted auth session state (back to unauthenticated). */
  clearSession: () => void;
}

/**
 * Outcome of a sign-out. Always resolves to the unauthenticated state; the
 * discriminated union is a stable surface for #22's provider to consume.
 */
export type SignOutResult = { ok: true };

/**
 * Provisional auth-session storage key. #22's `session.ts` owns the canonical
 * persistence contract; until it merges, this module clears this key as a
 * minimal local fallback so stale authenticated state is never retained.
 */
export const AUTH_SESSION_STORAGE_KEY = 'tokyo-mogu-mogu:auth-session';

/** Minimal local clear used when no `SessionApi.clearSession` is supplied. */
function localClearSession(): void {
  try {
    localStorage.removeItem(AUTH_SESSION_STORAGE_KEY);
  } catch {
    // Storage unavailable (e.g. private mode) — nothing persisted to clear.
  }
}

/**
 * Signs the user out: clears local session state so the app returns to the
 * unauthenticated state (the durable Spec contract), then best-effort tears
 * down the Google-side session. The Google-side step never throws and its
 * outcome is intentionally not surfaced — a best-effort failure must not
 * retain stale authenticated UI or block the unauthenticated transition.
 *
 * No partial user is created or left behind: provisioning only ever happens on
 * a successful sign-in (#21), and sign-out only clears, never writes.
 */
export async function signOut(sessionApi?: Partial<SessionApi>): Promise<SignOutResult> {
  // Durable transition: clear local session state first, so the app is
  // unauthenticated regardless of what happens in the (best-effort) GIS step.
  const clearSession = sessionApi?.clearSession ?? localClearSession;
  clearSession();

  // Best-effort, never throws (oauth.ts catches and returns a typed result).
  await signOutGoogle();

  return { ok: true };
}
