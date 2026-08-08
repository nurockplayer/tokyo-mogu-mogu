/**
 * Thin Google Sign-In adapter (Issue #21, extended by #23).
 *
 * Wraps Google Identity Services (GIS) via the official script
 * `https://accounts.google.com/gsi/client` — no npm dependency. It is the only
 * module that talks to Google; feature code receives a `GoogleIdentity` or a
 * typed `{ cancelled } | { error }` and never sees raw tokens/credentials.
 *
 * #23 additions (sign-out + failure recovery) keep the same boundary: raw
 * provider payloads never leave this module. `signOutGoogle()` is a best-effort
 * GIS session teardown, and `getOAuthRecoveryInfo()` maps a sign-in result to a
 * recoverable, token-free state for the UI.
 *
 * The client id is read from `config.googleClientId` (public; empty string when
 * unset — #13). When it is unset, sign-in fails with a typed `{ error }` so
 * callers can show a clear message without leaking anything.
 *
 * Provisioning happens ONLY after a successful sign-in response (see
 * `identity.ts`) — cancel/failure returns a typed result and creates no partial
 * user.
 */
import { getConfig } from '../config';
import type { GoogleIdentity } from './model';

/** Minimal surface of the GIS global we use (the script ships its own types). */
interface GsiAccountsId {
  initialize: (config: { client_id: string; callback: (response: unknown) => void }) => void;
  renderButton: (element: HTMLElement, options: unknown) => void;
  prompt: (options?: unknown) => void;
  /** Disables One Tap auto-select so a just-signed-out Google session is not
   *  silently re-used (used by `signOutGoogle`, #23). */
  disableAutoSelect: () => void;
}

interface GsiAccounts {
  id: GsiAccountsId;
}

declare global {
  interface Window {
    google?: { accounts?: GsiAccounts };
  }
}

/** Result of a sign-in attempt — never carries tokens/credentials. */
export type GoogleSignInResult =
  | { ok: true; identity: GoogleIdentity }
  | { ok: false; cancelled: true }
  | { ok: false; cancelled: false; error: string };

/** Shape of a GIS credential response (profile fields we care about). */
interface GsiCredentialResponse {
  credential?: string;
  sub?: string;
  email?: string;
  name?: string;
  picture?: string;
}

/**
 * Shapes of the non-credential GIS callback payloads. GIS calls `callback`
 * with `{ type: 'suppressed' }` when the One Tap UI was dismissed or FedCM
 * suppressed it, and `{ type: 'credential_not_found' }` when the user has no
 * usable session. Both mean "no sign-in happened" — never a partial user.
 */
interface GsiSuppressedResponse {
  type: 'suppressed' | 'credential_not_found';
}

const GIS_SCRIPT_URL = 'https://accounts.google.com/gsi/client';

let gsiPromise: Promise<GsiAccounts> | null = null;

/** Loads the GIS script once and caches the promise for repeat calls. */
function loadGsiScript(): Promise<GsiAccounts> {
  if (typeof window === 'undefined') {
    return Promise.reject(new Error('Google Sign-In requires a browser environment'));
  }
  if (gsiPromise) {
    return gsiPromise;
  }
  gsiPromise = new Promise((resolve, reject) => {
    const accounts = window.google?.accounts;
    if (accounts?.id) {
      resolve(accounts);
      return;
    }
    const script = document.createElement('script');
    script.src = GIS_SCRIPT_URL;
    script.async = true;
    script.onload = () => {
      const loaded = window.google?.accounts;
      if (loaded?.id) {
        resolve(loaded);
      } else {
        gsiPromise = null;
        reject(new Error('Google Identity Services failed to initialize'));
      }
    };
    script.onerror = () => {
      gsiPromise = null;
      reject(new Error('Failed to load Google Sign-In script'));
    };
    document.head.appendChild(script);
  });
  return gsiPromise;
}

/** Validates a GIS callback payload into a `GoogleIdentity` (no tokens). */
function toGoogleIdentity(response: unknown): GoogleIdentity {
  const data = (response ?? {}) as GsiCredentialResponse;
  const googleId = data.sub;
  const email = data.email;
  if (!googleId || !email) {
    throw new Error('Google Sign-In response was missing required identity fields');
  }
  return {
    googleId,
    email,
    displayName: data.name ?? '',
    avatarUrl: data.picture ?? '',
  };
}

/** True when the callback payload means "no sign-in happened" (dismissed/unsupported). */
function isSuppressedResponse(response: unknown): boolean {
  const type = (response as GsiSuppressedResponse)?.type;
  return type === 'suppressed' || type === 'credential_not_found';
}

/**
 * Opens the Google One Tap / account chooser. Resolves with the profile
 * identity on success, or `null` when the user dismissed the flow (no sign-in,
 * no partial user). Rejects on load/credentialing errors.
 */
function openGoogleSignIn(clientId: string): Promise<GoogleIdentity | null> {
  return loadGsiScript().then((accounts) => {
    const id = accounts.id;
    return new Promise<GoogleIdentity | null>((resolve, reject) => {
      id.initialize({
        client_id: clientId,
        callback: (response: unknown) => {
          try {
            if (isSuppressedResponse(response)) {
              resolve(null);
              return;
            }
            resolve(toGoogleIdentity(response));
          } catch (err) {
            reject(err);
          }
        },
      });
      try {
        id.prompt();
      } catch (err) {
        reject(err);
      }
    });
  });
}

/**
 * Starts Google Sign-In. Resolves with the profile `GoogleIdentity` on success,
 * or a typed failure: `{ cancelled: true }` when the user dismissed the flow,
 * or `{ cancelled: false, error }` for any other failure. Never exposes raw
 * tokens/credentials. A cancelled/failed attempt creates no user — provisioning
 * (see `identity.ts`) only happens after a successful sign-in.
 */
export async function signInWithGoogle(): Promise<GoogleSignInResult> {
  const clientId = getConfig().googleClientId;
  if (!clientId) {
    return {
      ok: false,
      cancelled: false,
      error: 'Google Sign-In is not configured (VITE_GOOGLE_CLIENT_ID is empty)',
    };
  }

  try {
    const identity = await openGoogleSignIn(clientId);
    if (identity === null) {
      return { ok: false, cancelled: true };
    }
    return { ok: true, identity };
  } catch (err) {
    return {
      ok: false,
      cancelled: false,
      error: err instanceof Error ? err.message : 'Google Sign-In failed',
    };
  }
}

/** Result of a best-effort Google-side sign-out. Never carries a raw payload. */
export type GoogleSignOutResult = { ok: true } | { ok: false; error: string };

/**
 * Best-effort Google session teardown (Issue #23).
 *
 * Disables One Tap auto-select so a just-signed-out Google session is not
 * silently re-used on the next sign-in attempt. There is no server-side token
 * to revoke in this client-only MVP, so this is intentionally minimal. It
 * never throws — returns a typed result instead. The failure message is a
 * generic internal string and never carries a raw GIS payload; consumers
 * (see `signout.ts`) must not surface it to the UI.
 */
export async function signOutGoogle(): Promise<GoogleSignOutResult> {
  try {
    const accounts = await loadGsiScript();
    accounts.id.disableAutoSelect();
    return { ok: true };
  } catch (err) {
    return {
      ok: false,
      error: err instanceof Error ? err.message : 'Google Sign-Out failed',
    };
  }
}

/**
 * i18n message key for a recoverable sign-in failure. Appended to BOTH locale
 * blocks in `src/i18n/resources.ts` (#23). The auth module references the key
 * only — it owns no UI strings.
 */
export type OAuthErrorMessageKey = 'authErrorRecoverable';

/**
 * A user-facing recovery state derived from a sign-in attempt (Issue #23).
 *
 * Deliberately carries NO raw provider error: a failure maps to a translatable
 * message key plus a `retryable` flag, and cancellation maps to a quiet
 * "back to unauthenticated" state. Nothing about the underlying error payload
 * reaches the UI.
 */
export type OAuthRecoveryInfo =
  | { kind: 'success' }
  | { kind: 'cancelled' }
  | { kind: 'recoverable-error'; retryable: true; messageKey: OAuthErrorMessageKey };

/**
 * Maps a `signInWithGoogle()` result to a recoverable, non-leaking recovery
 * state. Cancellation is not an error (the user simply dismissed the flow) — it
 * returns to the safe unauthenticated state with no message. Any other failure
 * is recoverable and retryable, with a message key the UI can translate. The
 * raw provider error is dropped here and never exposed.
 */
export function getOAuthRecoveryInfo(result: GoogleSignInResult): OAuthRecoveryInfo {
  if (result.ok) {
    return { kind: 'success' };
  }
  if (result.cancelled) {
    return { kind: 'cancelled' };
  }
  return { kind: 'recoverable-error', retryable: true, messageKey: 'authErrorRecoverable' };
}
