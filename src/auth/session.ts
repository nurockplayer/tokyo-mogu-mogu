/**
 * Session persistence for authenticated state (Issue #22).
 *
 * Persists the canonical `AppUser` to localStorage so a valid session survives
 * page reloads (Spec: docs/specs/authentication/google-login.md §7). The stored
 * record carries only the app-level profile — `userId` / email / displayName /
 * avatarUrl — never provider tokens or raw GIS details. Token lifetime and
 * refresh are provider concerns owned by #23 / `oauth.ts`; #22 restores the app
 * user and exposes it through the shared auth surface.
 *
 * DOM-guarded: every access is wrapped in try/catch so unreadable or blocked
 * storage (private mode, SSR, missing localStorage) degrades to no session
 * instead of crashing. Node tests install a localStorage shim (see
 * `session.test.ts`).
 */
import type { AppUser } from './model';

/** localStorage key for the persisted session. */
export const SESSION_KEY = 'tokyo-mogu-mogu:auth-session';

/** True when the value is a structurally valid `AppUser`. */
const isAppUser = (value: unknown): value is AppUser => {
  if (typeof value !== 'object' || value === null) return false;
  const v = value as Record<string, unknown>;
  return (
    typeof v.userId === 'string' &&
    typeof v.email === 'string' &&
    typeof v.displayName === 'string' &&
    typeof v.avatarUrl === 'string'
  );
};

/**
 * Loads a persisted session, or `null` when nothing valid is stored. Corrupt,
 * malformed, or unreadable data resolves to `null` (→ unauthenticated), never a
 * crash. Storage unavailability is treated as no session.
 */
export function loadSession(): AppUser | null {
  try {
    const raw = localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    const parsed: unknown = JSON.parse(raw);
    if (!isAppUser(parsed)) return null;
    return parsed;
  } catch {
    // Unreadable or blocked storage — treat as no session.
    return null;
  }
}

/** Persists a session; silently no-ops when storage is unavailable. */
export function saveSession(user: AppUser): void {
  try {
    localStorage.setItem(SESSION_KEY, JSON.stringify(user));
  } catch {
    // Storage unavailable — nothing to do.
  }
}

/**
 * Removes the persisted session. This is the local clear for #22; the full
 * sign-out lifecycle (Google account teardown, failure recovery) is #23's seam.
 */
export function clearSession(): void {
  try {
    localStorage.removeItem(SESSION_KEY);
  } catch {
    // Storage unavailable — nothing to do.
  }
}
