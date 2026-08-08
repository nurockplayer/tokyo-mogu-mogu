/**
 * Shared auth state provider (Issue #22).
 *
 * The single auth-state surface every feature consumes via `useAuth()`. It owns
 * session restoration after reload and exposes exactly three states —
 * `restoring` / `authenticated` / `unauthenticated` — with the current
 * `AppUser`. No provider tokens, GIS internals, or raw Google session details
 * are exposed: feature code sees only the canonical app user and the status.
 *
 * Restore contract (Spec: docs/specs/authentication/google-login.md):
 * - A valid persisted session (see `session.ts`) is restored on mount, so a
 *   reload never requires a second manual login, and the same canonical
 *   `userId` (from #21) is exposed.
 * - No / invalid / corrupt session resolves to `unauthenticated` — never a
 *   crash. While `restoring`, `user` is `null`, so no stale authenticated UI
 *   can flash.
 *
 * Sign-in: on a successful Google response, provisions the app user
 * (`findOrCreateUser`, #21) and persists the session. Cancellation / failure
 * leaves no partial user and returns to `unauthenticated`.
 *
 * Sign-out: #22 performs only the local clear. The full Google sign-out
 * lifecycle (provider teardown, failure recovery) is #23's seam.
 */
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react';
import { findOrCreateUser, signInWithGoogle, type AppUser, type UserStore } from '../auth';
import { signOut as runSignOut } from './signout';
import { clearSession, loadSession, saveSession } from './session';

/** Module-level in-memory user store: one app user per Google identity (#21). */
const userStore: UserStore = new Map();

/**
 * Shared auth-state exposed to features. The `status` union is deliberately
 * product-agnostic — provider/session details never leak here.
 */
export interface AuthState {
  /** Lifecycle state: restoring until a persisted session is decided. */
  status: 'restoring' | 'authenticated' | 'unauthenticated';
  /** Current canonical app user, or null when unauthenticated / restoring. */
  user: AppUser | null;
  /** Starts Google sign-in; resolves to authenticated or back to unauthenticated. */
  signIn: () => Promise<void>;
  /** Local sign-out (clears the persisted session). #23 extends this seam. */
  signOut: () => void;
}

const AuthContext = createContext<AuthState | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  // Start restoring with no user so a stale authenticated UI can never flash.
  const [status, setStatus] = useState<AuthState['status']>('restoring');
  const [user, setUser] = useState<AppUser | null>(null);

  // Restore a persisted session once on mount (idempotent under StrictMode).
  useEffect(() => {
    const restored = loadSession();
    setUser(restored);
    setStatus(restored ? 'authenticated' : 'unauthenticated');
  }, []);

  const signIn = useCallback(async () => {
    const result = await signInWithGoogle();
    if (result.ok) {
      const nextUser = findOrCreateUser(userStore, result.identity);
      saveSession(nextUser);
      setUser(nextUser);
      setStatus('authenticated');
      return;
    }
    // Cancelled or failed: no partial user, recover to safe unauthenticated.
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const signOut = useCallback(async () => {
    // Full sign-out lifecycle (#23): clears the persisted session via the
    // injected seam and performs the best-effort Google-side teardown, then
    // returns the app to unauthenticated. Never throws.
    await runSignOut({ clearSession });
    setUser(null);
    setStatus('unauthenticated');
  }, []);

  const value = useMemo(
    () => ({ status, user, signIn, signOut }),
    [status, user, signIn, signOut],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/** Reads the shared auth state; must be used within `AuthProvider`. */
export function useAuth(): AuthState {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return ctx;
}
