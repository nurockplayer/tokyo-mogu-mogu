import { describe, expect, it, vi } from 'vitest';
import {
  ESTAT_APPLICATION_ID,
  estatRestUrl,
  isEstatCredentialPresent,
  missingCredentialReason,
  resolveEstatCredential,
} from './estat.ts';
import type { SourceManifest } from '../types.ts';

describe('resolveEstatCredential', () => {
  it('returns undefined when the env var is missing', () => {
    expect(resolveEstatCredential({})).toBeUndefined();
  });

  it('returns undefined when the env var is blank or whitespace-only', () => {
    expect(resolveEstatCredential({ [ESTAT_APPLICATION_ID]: '' })).toBeUndefined();
    expect(resolveEstatCredential({ [ESTAT_APPLICATION_ID]: '   ' })).toBeUndefined();
  });

  it('returns the trimmed value when present', () => {
    expect(resolveEstatCredential({ [ESTAT_APPLICATION_ID]: '  ab12cd34  ' })).toBe('ab12cd34');
  });
});

describe('isEstatCredentialPresent', () => {
  it('is false when the credential is missing or blank', () => {
    expect(isEstatCredentialPresent({})).toBe(false);
    expect(isEstatCredentialPresent({ [ESTAT_APPLICATION_ID]: '  ' })).toBe(false);
  });

  it('is true when a non-blank credential is present', () => {
    expect(isEstatCredentialPresent({ [ESTAT_APPLICATION_ID]: 'abc' })).toBe(true);
  });
});

describe('estatRestUrl', () => {
  it('builds the v3.0 getStatsData URL with appId and statsDataId', () => {
    const url = estatRestUrl('app-id-123', '000001032920');
    expect(url.startsWith('https://api.e-stat.go.jp/rest/3.0/app/json/getStatsData?')).toBe(true);
    expect(url).toContain('appId=app-id-123');
    expect(url).toContain('statsDataId=000001032920');
  });

  it('encodes reserved characters in the credential and statsDataId', () => {
    expect(estatRestUrl('a b&c', 'x/y')).toContain('appId=a%20b%26c');
    expect(estatRestUrl('a b&c', 'x/y')).toContain('statsDataId=x%2Fy');
  });

  it('never performs a live fetch (pure URL construction)', () => {
    const fetchSpy = vi.spyOn(globalThis, 'fetch');
    try {
      const url = estatRestUrl('app-id-123', '000001032920');
      expect(url).toContain('appId=app-id-123');
      expect(fetchSpy).not.toHaveBeenCalled();
    } finally {
      fetchSpy.mockRestore();
    }
  });
});

describe('missingCredentialReason', () => {
  const BASE: SourceManifest = {
    id: 'estat-agriculture-census',
    provider: '農林水産省 / e-Stat',
    url: 'https://www.e-stat.go.jp/stat-search/files?toukei=00500209&tstat=000001032920',
    acquisitionType: 'api',
    datasetId: '000001032920',
    format: 'json',
    license: '政府標準利用規約（第2.0版）準拠・出典表示が必要（e-Stat）',
    adapterId: 'estat',
    credentialsRequired: true,
    credentialEnv: ESTAT_APPLICATION_ID,
  };

  it('returns undefined for a source that does not require credentials', () => {
    expect(missingCredentialReason({ ...BASE, credentialsRequired: false }, {})).toBeUndefined();
  });

  it('returns undefined when the required credential is present', () => {
    expect(missingCredentialReason(BASE, { [ESTAT_APPLICATION_ID]: 'abc' })).toBeUndefined();
  });

  it('returns the sync engine skipped reason when the credential is missing', () => {
    expect(missingCredentialReason(BASE, {})).toBe('missing credential ESTAT_APPLICATION_ID');
  });

  it('returns the sync engine skipped reason when credentialEnv is unset', () => {
    expect(missingCredentialReason({ ...BASE, credentialEnv: undefined }, {})).toBe(
      'credentialsRequired but no credentialEnv configured',
    );
  });
});
