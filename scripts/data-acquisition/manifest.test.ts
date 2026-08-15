import { describe, expect, it } from 'vitest';
import { CULTURAL_PROPERTY_SOURCE, SOURCE_MANIFESTS } from './manifest.ts';
import { ADAPTERS } from './adapters/index.ts';
import type { SourceManifest } from './types.ts';

/** Fields a manifest must always carry for the source to be acquirable. */
const REQUIRED_MANIFEST_FIELDS: (keyof SourceManifest)[] = [
  'id',
  'provider',
  'url',
  'acquisitionType',
  'format',
  'license',
  'adapterId',
  'credentialsRequired',
];

describe('SOURCE_MANIFESTS registry', () => {
  it('is non-empty', () => {
    expect(SOURCE_MANIFESTS.length).toBeGreaterThan(0);
  });

  it('has unique stable source ids', () => {
    const ids = SOURCE_MANIFESTS.map((s) => s.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('carries every required acquisition field on each manifest', () => {
    for (const manifest of SOURCE_MANIFESTS) {
      for (const field of REQUIRED_MANIFEST_FIELDS) {
        expect(manifest[field], `${manifest.id}.${field}`).toBeDefined();
      }
      if (manifest.credentialsRequired) {
        // A credential-required source must name the env var that carries it.
        expect(manifest.credentialEnv, `${manifest.id}.credentialEnv`).toBeDefined();
      } else {
        expect(manifest.credentialEnv, `${manifest.id}.credentialEnv`).toBeUndefined();
      }
    }
  });

  it('references an adapter that is registered (credential seams exempt)', () => {
    const adapterIds = new Set(ADAPTERS.map((a) => a.id));
    for (const manifest of SOURCE_MANIFESTS) {
      // A credential-required source without a credential is reported as
      // 'skipped' before the adapter lookup, so an unimplemented adapter is a
      // declared seam, not a broken source.
      if (manifest.credentialsRequired && !adapterIds.has(manifest.adapterId)) continue;
      expect(adapterIds.has(manifest.adapterId), `${manifest.id} → ${manifest.adapterId}`).toBe(true);
    }
  });

  it('keeps the cultural-property source traceable to its catalog dataset', () => {
    expect(CULTURAL_PROPERTY_SOURCE).toMatchObject({
      id: 'tokyo-designated-cultural-property',
      provider: '東京都教育庁',
      datasetId: 't000021d0000000017',
      catalogUrl: 'https://catalog.data.metro.tokyo.lg.jp/dataset/t000021d0000000017',
      acquisitionType: 'http_file',
      format: 'csv',
      encoding: 'cp932',
      license: 'CC BY 4.0',
      adapterId: 'cultural-property',
      credentialsRequired: false,
    });
  });
});
