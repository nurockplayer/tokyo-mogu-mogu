import { describe, expect, it } from 'vitest';
import { checkMissingEnv, requiredEnv, validateConfigImpl } from './validate';
import {
  PUBLIC_ENV_KEYS,
  isPublicKey,
  isSecretKey,
  readPublicConfig,
} from './env';
import type { RawEnv } from './env';

describe('config validation (#13)', () => {
  it('passes when all required vars are present', () => {
    const env: RawEnv = {
      VITE_GOOGLE_CLIENT_ID: 'client-id',
      VITE_API_BASE_URL: 'https://api.example.com',
      VITE_MAP_PROVIDER: 'leaflet',
    };
    expect(checkMissingEnv(env, ['VITE_GOOGLE_CLIENT_ID', 'VITE_API_BASE_URL'])).toEqual([]);
    expect(() => validateConfigImpl(env, ['VITE_GOOGLE_CLIENT_ID', 'VITE_API_BASE_URL'])).not.toThrow();
  });

  it('throws a clear error listing every missing required var', () => {
    const env: RawEnv = { VITE_GOOGLE_CLIENT_ID: 'client-id' };
    expect(() =>
      validateConfigImpl(env, ['VITE_GOOGLE_CLIENT_ID', 'VITE_API_BASE_URL', 'VITE_MAP_PROVIDER']),
    ).toThrow(/VITE_API_BASE_URL, VITE_MAP_PROVIDER/);
  });

  it('throws when any single required var is missing', () => {
    expect(() => validateConfigImpl({}, ['VITE_MAP_PROVIDER'])).toThrow(/VITE_MAP_PROVIDER/);
  });

  it('treats an empty value as missing', () => {
    const env: RawEnv = { VITE_GOOGLE_CLIENT_ID: '' };
    expect(checkMissingEnv(env, ['VITE_GOOGLE_CLIENT_ID'])).toEqual(['VITE_GOOGLE_CLIENT_ID']);
  });

  it('does not throw with the real required set (none required today)', () => {
    expect(requiredEnv).toEqual([]);
    expect(() => validateConfigImpl({})).not.toThrow();
  });
});

describe('public config reader (#13)', () => {
  it('applies safe defaults for unset vars', () => {
    const cfg = readPublicConfig({});
    expect(cfg.googleClientId).toBe('');
    expect(cfg.apiBaseUrl).toBe('');
    expect(cfg.mapProvider).toBe('leaflet');
    expect(cfg.mode).toBe('development');
  });

  it('maps raw env to typed config', () => {
    const cfg = readPublicConfig({
      VITE_GOOGLE_CLIENT_ID: 'client-id-123',
      VITE_API_BASE_URL: 'https://api.example.com',
      VITE_MAP_PROVIDER: 'mapbox',
      MODE: 'production',
    });
    expect(cfg).toEqual({
      googleClientId: 'client-id-123',
      apiBaseUrl: 'https://api.example.com',
      mapProvider: 'mapbox',
      mode: 'production',
    });
  });

  it('detects preview mode', () => {
    expect(readPublicConfig({ MODE: 'preview' }).mode).toBe('preview');
  });

  it('falls back to development for unknown modes', () => {
    expect(readPublicConfig({ MODE: 'staging' }).mode).toBe('development');
  });
});

describe('secret boundary helpers (#13)', () => {
  it('classifies VITE_-prefixed vars as public', () => {
    expect(isPublicKey('VITE_GOOGLE_CLIENT_ID')).toBe(true);
    expect(isSecretKey('VITE_GOOGLE_CLIENT_ID')).toBe(false);
  });

  it('classifies non-VITE_ vars as server-side secrets', () => {
    expect(isPublicKey('GOOGLE_CLIENT_SECRET')).toBe(false);
    expect(isSecretKey('GOOGLE_CLIENT_SECRET')).toBe(true);
  });

  it('lists only VITE_-prefixed keys as public', () => {
    expect(PUBLIC_ENV_KEYS.every((key) => isPublicKey(key))).toBe(true);
  });
});
