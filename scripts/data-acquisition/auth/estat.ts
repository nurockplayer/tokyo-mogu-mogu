/**
 * e-Stat (政府統計総合窓口) credential seam for the acquisition layer (#175).
 *
 * e-Stat's REST v3.0 API requires an application id (`appId`) issued via
 * https://www.e-stat.go.jp/api/ (無料 API キー). This module only *resolves*
 * that credential and *constructs* API URLs — it never performs a live fetch.
 * The sync engine (`sync.ts`) owns the skip/fetch decision: a source marked
 * `credentialsRequired` with a missing `ESTAT_APPLICATION_ID` is reported as
 * 'skipped', never fetched.
 *
 * All functions here are pure so the seam is unit-testable without network
 * access.
 */
import type { SourceManifest } from '../types.ts';

/** Env var name carrying the e-Stat application id. */
export const ESTAT_APPLICATION_ID = 'ESTAT_APPLICATION_ID';

/** e-Stat REST v3.0 `getStatsData` endpoint (JSON). */
const ESTAT_REST_BASE_URL = 'https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData';

/** Env map shape accepted by the seam; `process.env` is assignable to it. */
type EnvMap = Record<string, string | undefined>;

/**
 * Resolve the trimmed e-Stat application id from `env` (defaults to
 * `process.env`). Returns `undefined` when the env var is missing or blank so
 * callers treat "absent" and "empty" the same way.
 */
export function resolveEstatCredential(env: EnvMap = process.env): string | undefined {
  const value = env[ESTAT_APPLICATION_ID];
  const trimmed = value?.trim();
  return trimmed === '' ? undefined : trimmed;
}

/** Whether a non-blank e-Stat application id is present in `env`. */
export function isEstatCredentialPresent(env: EnvMap = process.env): boolean {
  return resolveEstatCredential(env) !== undefined;
}

/**
 * Build the e-Stat REST v3.0 `getStatsData` endpoint URL for the given
 * credential and statistics-table id. URL construction only — never fetches.
 */
export function estatRestUrl(credential: string, statsDataId: string): string {
  return (
    `${ESTAT_REST_BASE_URL}?appId=${encodeURIComponent(credential)}` +
    `&statsDataId=${encodeURIComponent(statsDataId)}`
  );
}

/**
 * Mirrors the sync engine's skipped semantics (see `sync.ts`): returns the
 * exact `skippedReason` the engine would emit for a `credentialsRequired`
 * source whose credential is missing, or `undefined` when the source can be
 * fetched (credential present, or credentials not required).
 */
export function missingCredentialReason(
  manifest: SourceManifest,
  env: EnvMap = process.env,
): string | undefined {
  if (!manifest.credentialsRequired) return undefined;
  const key = manifest.credentialEnv ?? '';
  if (key === '' || !env[key]) {
    return key === ''
      ? 'credentialsRequired but no credentialEnv configured'
      : `missing credential ${key}`;
  }
  return undefined;
}
