/**
 * Sync engine + CLI for the acquisition layer (#175).
 *
 * `pnpm data:sync` iterates the source registry, fetches each artifact into
 * the gitignored local cache (`.data-cache/`), computes/verifies checksums,
 * and runs the source-specific adapter to produce provenance-carrying
 * normalized records. A concise per-source report is printed.
 *
 * Failure isolation: one malformed or unreachable source is reported as an
 * error and never poisons the other sources' output. When any source fails,
 * the command exits non-zero so CI / humans can react.
 */
import { readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { ADAPTERS } from './adapters/index.ts';
import { decodeText, splitCsv } from './csv.ts';
import { fetchToCache } from './fetch.ts';
import { SOURCE_MANIFESTS } from './manifest.ts';
import type {
  AcquisitionAdapter,
  AcquisitionReport,
  AdapterHelpers,
  SourceManifest,
} from './types.ts';

export interface SyncOptions {
  /** Local raw-cache root (large artifacts live here, never in git). */
  cacheRoot: string;
  /** HTTP fetch implementation; injectable for tests. */
  fetcher?: (url: string) => Promise<ArrayBuffer>;
  /** Clock; injectable for deterministic tests. */
  now?: () => string;
  /** Adapter registry; defaults to the built-in adapters. */
  adapters?: AcquisitionAdapter[];
  /** Env map for credential resolution; defaults to process.env. */
  env?: Record<string, string | undefined>;
}

const DEFAULT_HELPERS: AdapterHelpers = { decodeText, parseCsv: splitCsv };

function toArrayBuffer(fileBytes: Uint8Array): ArrayBuffer {
  return fileBytes.buffer.slice(fileBytes.byteOffset, fileBytes.byteOffset + fileBytes.byteLength);
}

/** Run acquisition for every configured source and return the report. */
export async function runSync(
  manifests: SourceManifest[],
  options: SyncOptions,
): Promise<AcquisitionReport> {
  const adapters = options.adapters ?? ADAPTERS;
  const now = options.now ?? (() => new Date().toISOString());
  const env = options.env ?? process.env;
  const report: AcquisitionReport = { runAt: now(), sources: [] };

  for (const manifest of manifests) {
    // Credential boundary: a source that requires credentials must never be
    // fetched without them. Missing credentials produce an explicit 'skipped'
    // report — public sources keep working regardless (Issue #175).
    if (manifest.credentialsRequired) {
      const key = manifest.credentialEnv ?? '';
      if (key === '' || !env[key]) {
        report.sources.push({
          sourceId: manifest.id,
          status: 'skipped',
          skippedReason:
            key === ''
              ? 'credentialsRequired but no credentialEnv configured'
              : `missing credential ${key}`,
        });
        continue;
      }
    }
    try {
      const adapter = adapters.find((a) => a.id === manifest.adapterId);
      if (adapter === undefined) {
        throw new Error(`no adapter registered for adapterId "${manifest.adapterId}"`);
      }
      const artifact = await fetchToCache(manifest, options.cacheRoot, options);
      const fileBytes = readFileSync(artifact.filePath);
      const rows = adapter.parse(
        { bytes: toArrayBuffer(fileBytes), artifact, manifest },
        DEFAULT_HELPERS,
      );
      const records = adapter.normalize(rows, { manifest, artifact });
      report.sources.push({
        sourceId: manifest.id,
        status: 'ok',
        artifact,
        recordCount: records.length,
      });
    } catch (err) {
      report.sources.push({
        sourceId: manifest.id,
        status: 'error',
        error: err instanceof Error ? err.message : String(err),
      });
    }
  }

  return report;
}

function shortHex(value: string): string {
  return value.length > 12 ? `${value.slice(0, 8)}…${value.slice(-4)}` : value;
}

/** Render the report as concise human-readable lines (also unit-testable). */
export function renderReport(report: AcquisitionReport): string {
  const lines = [`[data:sync] ${report.runAt}`];
  for (const source of report.sources) {
    if (source.status === 'ok') {
      const artifact = source.artifact!;
      lines.push(
        `[ok] ${source.sourceId}  ${source.recordCount ?? 0} records  sha256:${shortHex(artifact.checksum.value)}  cached(${artifact.filePath})  downloaded:${artifact.downloaded}  retrievedAt:${artifact.retrievedAt}`,
      );
    } else if (source.status === 'skipped') {
      lines.push(`[skipped] ${source.sourceId}  ${source.skippedReason ?? 'skipped'}`);
    } else {
      lines.push(`[error] ${source.sourceId}  ${source.error}`);
    }
  }
  const ok = report.sources.filter((s) => s.status === 'ok').length;
  const skipped = report.sources.filter((s) => s.status === 'skipped').length;
  const failed = report.sources.filter((s) => s.status === 'error').length;
  lines.push(`${ok} ok, ${skipped} skipped, ${failed} error of ${report.sources.length} sources`);
  return lines.join('\n');
}

/** CLI entry: `pnpm data:sync`. */
async function main(): Promise<void> {
  const cacheRoot = join(dirname(fileURLToPath(import.meta.url)), '..', '..', '.data-cache');
  const report = await runSync(SOURCE_MANIFESTS, { cacheRoot });
  // eslint-disable-next-line no-console
  console.log(renderReport(report));
  process.exit(report.sources.some((s) => s.status === 'error') ? 1 : 0);
}

const cliArg = process.argv[1];
if (cliArg !== undefined && import.meta.url === pathToFileURL(cliArg).href) {
  void main();
}
