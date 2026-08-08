import { readPublicConfig, rawEnv } from './env';
import type { AppConfig } from './env';
import { validateConfig } from './validate';

// Fail fast at startup: if a required env variable is missing, the app refuses
// to boot with a clear reason instead of silently running misconfigured.
validateConfig();

/**
 * THE config entry point for feature code. Import `config` (or `getConfig()`)
 * from `src/config` — do not scatter `import.meta.env` reads across features.
 */
export const config: AppConfig = readPublicConfig(rawEnv);

/** Function accessor for features that prefer calling over property access. */
export function getConfig(): AppConfig {
  return config;
}

export type { AppConfig, AppMode, RawEnv } from './env';
export {
  DEFAULT_MAP_PROVIDER,
  PUBLIC_ENV_KEYS,
  isPublicKey,
  isSecretKey,
  toAppMode,
} from './env';
export { checkMissingEnv, requiredEnv, validateConfig } from './validate';
