/**
 * Fetch + local raw cache for the acquisition layer (#175).
 *
 * Large / full downloads go to a gitignored local cache (`.data-cache/`) —
 * they are never committed. Each cached artifact is accompanied by a small
 * metadata file recording its retrieval timestamp, sha256, and size, so a
 * fetched artifact stays traceable even when the raw file is not in git.
 *
 * Idempotency: a re-run re-downloads and compares checksums. When the bytes
 * are unchanged, the cached artifact and its original `retrievedAt` are kept
 * (no-op), so `data:sync` never churns the cache for an unchanged source.
 */
import { basename, dirname, join } from 'node:path';
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { sha256Hex } from './checksum.ts';
import type { CachedArtifact, SourceManifest } from './types.ts';

/** Serialized per-source cache state (kept under the cache root). */
interface CacheMetadata {
  retrievedAt: string;
  checksum: { algorithm: 'sha256'; value: string };
  size: number;
}

/** Absolute path of the cached raw artifact for a source. */
export function artifactPathFor(cacheRoot: string, manifest: SourceManifest): string {
  const fallback = `${manifest.id}/${basename(new URL(manifest.url).pathname)}`;
  return join(cacheRoot, manifest.cachePath ?? fallback);
}

/** Absolute path of the per-source cache metadata file. */
export function metadataPathFor(cacheRoot: string, manifest: SourceManifest): string {
  return join(cacheRoot, `${manifest.id}.metadata.json`);
}

function readMetadata(metaPath: string): CacheMetadata | undefined {
  if (!existsSync(metaPath)) return undefined;
  try {
    return JSON.parse(readFileSync(metaPath, 'utf8')) as CacheMetadata;
  } catch {
    // Corrupt metadata must not silently corrupt acquisition — treat as absent.
    return undefined;
  }
}

async function defaultFetcher(url: string): Promise<ArrayBuffer> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`fetch ${url} failed with HTTP ${res.status}`);
  return res.arrayBuffer();
}

export interface FetchOptions {
  /** HTTP fetch implementation; injectable for tests. */
  fetcher?: (url: string) => Promise<ArrayBuffer>;
  /** Clock; injectable for deterministic tests. */
  now?: () => string;
}

/**
 * Fetch a source artifact into the local cache and return its metadata.
 * Returns a `downloaded: false` artifact when the bytes are unchanged.
 */
export async function fetchToCache(
  manifest: SourceManifest,
  cacheRoot: string,
  options: FetchOptions = {},
): Promise<CachedArtifact> {
  const fetcher = options.fetcher ?? defaultFetcher;
  const now = options.now ?? (() => new Date().toISOString());
  const path = artifactPathFor(cacheRoot, manifest);
  const metaPath = metadataPathFor(cacheRoot, manifest);
  const prev = readMetadata(metaPath);

  const bytes = await fetcher(manifest.url);
  const checksum = sha256Hex(bytes);

  if (prev !== undefined && prev.checksum.value === checksum.value && existsSync(path)) {
    return {
      manifestId: manifest.id,
      filePath: path,
      size: prev.size,
      checksum,
      downloaded: false,
      retrievedAt: prev.retrievedAt,
    };
  }

  mkdirSync(dirname(path), { recursive: true });
  writeFileSync(path, new Uint8Array(bytes));
  const size = bytes.byteLength;
  const retrievedAt = now();
  const meta: CacheMetadata = { retrievedAt, checksum, size };
  writeFileSync(metaPath, `${JSON.stringify(meta, null, 2)}\n`, 'utf8');
  return { manifestId: manifest.id, filePath: path, size, checksum, downloaded: true, retrievedAt };
}
