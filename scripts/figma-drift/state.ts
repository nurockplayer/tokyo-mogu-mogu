import { readFileSync, renameSync, rmSync, mkdirSync, writeFileSync } from 'node:fs';
import { dirname } from 'node:path';
import {
  OperationalError,
  STATE_SCHEMA_VERSION,
  type SyncState,
} from './types';

/**
 * Sync-state file handling (Issue #233).
 *
 * `figma:check` / `figma:gate` only ever READ this file. `figma:checkpoint`
 * is the only writer and always writes atomically (temp file + rename) so a
 * partial write can never corrupt the last good checkpoint.
 */

export const DEFAULT_STATE_PATH = 'docs/design/figma-sync-state.json';

/** Parse + validate a state file, throwing OperationalError on any schema problem. */
export function parseState(text: string, source: string): SyncState {
  let data: unknown;
  try {
    data = JSON.parse(text) as unknown;
  } catch {
    throw new OperationalError(
      'schema-incomplete',
      `state file is not valid JSON: ${source}`,
    );
  }
  const record = data as Partial<SyncState>;
  if (record.schemaVersion !== STATE_SCHEMA_VERSION) {
    throw new OperationalError(
      'schema-incomplete',
      `state file schemaVersion mismatch (expected ${STATE_SCHEMA_VERSION})`,
    );
  }
  if (typeof record.fileKey !== 'string') {
    throw new OperationalError('schema-incomplete', 'state file missing fileKey');
  }
  const checkpoint = record.checkpoint;
  if (checkpoint !== null && typeof checkpoint !== 'object') {
    throw new OperationalError(
      'schema-incomplete',
      'state file checkpoint must be null or an object',
    );
  }
  if (!Array.isArray(record.watchedNodes)) {
    throw new OperationalError(
      'schema-incomplete',
      'state file missing watchedNodes array',
    );
  }
  for (const node of record.watchedNodes) {
    const watched = node as { id?: unknown; name?: unknown; hash?: unknown };
    if (
      typeof watched.id !== 'string' ||
      typeof watched.name !== 'string' ||
      (watched.hash !== null && typeof watched.hash !== 'string')
    ) {
      throw new OperationalError(
        'schema-incomplete',
        'state file watchedNodes entry malformed',
      );
    }
  }
  return record as SyncState;
}

export function loadState(path: string): SyncState {
  let text: string;
  try {
    text = readFileSync(path, 'utf8');
  } catch {
    throw new OperationalError('state-file-missing', `state file not found: ${path}`);
  }
  return parseState(text, path);
}

/**
 * Atomic state write: write to a temp sibling, then rename over the target.
 * On any failure the temp file is cleaned up and the previous state is left
 * byte-for-byte intact.
 */
export function writeStateAtomic(path: string, state: SyncState): void {
  const tempPath = `${path}.${process.pid}.tmp`;
  const json = `${JSON.stringify(state, null, 2)}\n`;
  try {
    mkdirSync(dirname(path), { recursive: true });
    writeFileSync(tempPath, json, 'utf8');
    renameSync(tempPath, path);
  } catch (error) {
    try {
      rmSync(tempPath, { force: true });
    } catch {
      // best-effort cleanup only
    }
    throw new OperationalError(
      'state-write-failed',
      `failed to write state atomically to ${path}: ${String(error)}`,
    );
  }
}
