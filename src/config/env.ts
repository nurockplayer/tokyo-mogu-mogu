/**
 * Typed public application configuration, read from `import.meta.env`.
 *
 * SECRET BOUNDARY (also documented in `.env.example`):
 * Vite inlines every `VITE_`-prefixed variable into the client bundle, so any
 * value read through this module is visible to anyone who opens the app.
 * Server-only secrets (OAuth client secrets, API keys, database URLs, tokens)
 * must NOT use the `VITE_` prefix and must NEVER be imported or read in client
 * code. This repo has no server today; anything sensitive must stay out of the
 * client entirely.
 */

export type AppMode = 'development' | 'production' | 'preview' | 'test';

/** Typed public configuration exposed to feature code via `src/config`. */
export interface AppConfig {
  /** Public Google OAuth client id (from #11). Empty string when unset. */
  googleClientId: string;
  /** Base URL for future API calls. Empty string => same-origin / unset. */
  apiBaseUrl: string;
  /** Map provider used by the map feature ('leaflet' by default). */
  mapProvider: string;
  /** Vite mode: development | production | preview (vitest sets 'test'). */
  mode: AppMode;
}

/**
 * Raw environment map, shaped like `import.meta.env`. Kept as a plain record
 * so the pure reader/validator below can be unit-tested with a stub.
 */
export type RawEnv = Record<string, string | undefined>;

/**
 * The env variables this app reads. All are `VITE_`-prefixed => client-visible.
 * Keep in sync with `.env.example`.
 */
export const PUBLIC_ENV_KEYS = [
  'VITE_GOOGLE_CLIENT_ID',
  'VITE_API_BASE_URL',
  'VITE_MAP_PROVIDER',
] as const;

/** Default map provider used when `VITE_MAP_PROVIDER` is unset. */
export const DEFAULT_MAP_PROVIDER = 'leaflet';

/** `VITE_`-prefixed values are bundled and visible to any client user. */
export function isPublicKey(key: string): boolean {
  return key.startsWith('VITE_');
}

/** Anything without the `VITE_` prefix is a server-side secret boundary. */
export function isSecretKey(key: string): boolean {
  return !isPublicKey(key);
}

/** Maps an unknown mode string to a known `AppMode` (defaults to development). */
export function toAppMode(value: string | undefined): AppMode {
  switch (value) {
    case 'development':
    case 'production':
    case 'preview':
    case 'test':
      return value;
    default:
      return 'development';
  }
}

/**
 * The live Vite env. `import.meta.env` only exposes `VITE_`-prefixed variables
 * (plus built-ins like `MODE`); see the boundary note at the top of this file.
 */
export const rawEnv: RawEnv = import.meta.env as RawEnv;

/** Pure mapper: raw env map -> typed public config (unit-testable). */
export function readPublicConfig(env: RawEnv): AppConfig {
  return {
    googleClientId: env.VITE_GOOGLE_CLIENT_ID ?? '',
    apiBaseUrl: env.VITE_API_BASE_URL ?? '',
    mapProvider: env.VITE_MAP_PROVIDER ?? DEFAULT_MAP_PROVIDER,
    mode: toAppMode(env.MODE),
  };
}
