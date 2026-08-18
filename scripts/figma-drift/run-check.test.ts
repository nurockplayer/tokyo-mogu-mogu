import { mkdtempSync, readFileSync, readdirSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { hashNode } from './hash.ts';
import { runCheck } from './run-check.ts';
import {
  fileMeta,
  makeFetch,
  makeState,
  nodeEntry,
  nodeEntryVariant,
} from './fixtures.ts';
import type { Checkpoint, SyncState } from './types.ts';

let tempRoots: string[] = [];

function tempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'tmm-figma-check-'));
  tempRoots.push(dir);
  return dir;
}

afterEach(() => {
  for (const root of tempRoots) {
    rmSync(root, { recursive: true, force: true });
  }
  tempRoots = [];
});

const CHECKPOINT: Checkpoint = {
  createdAt: '2026-08-18T00:00:00Z',
  fileName: 'KiKi Food App',
  fileVersion: 'v9948f714',
  fileLastModified: '2026-08-18T00:00:00Z',
};

/** A checkpointed state whose hashes match the given live node entries. */
function checkpointedState(live: Record<string, unknown>): SyncState {
  const watchedNodes = Object.entries(live).map(([id, entry]) => ({
    id,
    name: (entry as { name?: string }).name ?? id,
    hash: hashNode(entry),
  }));
  return makeState(watchedNodes, CHECKPOINT);
}

function writeState(dir: string, state: SyncState): string {
  const path = join(dir, 'figma-sync-state.json');
  writeFileSync(path, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  return path;
}

const LIVE = {
  '1:95': nodeEntry('Landing'),
  '23:3380': nodeEntry('Result'),
};

describe('runCheck', () => {
  it('exits 2 without a token and reads/writes nothing', async () => {
    const dir = tempDir();
    const statePath = join(dir, 'figma-sync-state.json');
    const result = await runCheck({ statePath, token: '' });
    expect(result.exitCode).toBe(2);
    expect(result.report).toContain('FIGMA_ACCESS_TOKEN');
    expect(readdirSync(dir)).toEqual([]);
  });

  it('exits 2 with a clear message when no checkpoint exists yet', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, makeState(
      [{ id: '1:95', name: 'Landing', hash: null }],
    ));
    const result = await runCheck({ statePath, token: 'fake' });
    expect(result.exitCode).toBe(2);
    expect(result.report).toContain('no checkpoint yet');
    expect(result.report).toContain('figma:checkpoint');
  });

  it('exits 0 when every watched surface is unchanged', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, checkpointedState(LIVE));
    const result = await runCheck({
      statePath,
      token: 'fake',
      fetchImpl: makeFetch(fileMeta(), LIVE),
    });
    expect(result.exitCode).toBe(0);
    expect(result.report).toContain('OK: no watched surface differs');
  });

  it('exits 1 when a watched surface changed', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, checkpointedState(LIVE));
    const liveChanged = { ...LIVE, '1:95': nodeEntryVariant('Landing') };
    const result = await runCheck({
      statePath,
      token: 'fake',
      fetchImpl: makeFetch(fileMeta(), liveChanged),
    });
    expect(result.exitCode).toBe(1);
    expect(result.report).toContain('DRIFT');
    expect(result.report).toContain('Landing');
    expect(result.report).toContain('1:95');
    // Implementation map co-report (Landing maps to LandingPage).
    expect(result.report).toContain('LandingPage');
  });

  it('exits 1 when a watched surface is missing from the live response', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, checkpointedState(LIVE));
    const result = await runCheck({
      statePath,
      token: 'fake',
      fetchImpl: makeFetch(fileMeta(), { '23:3380': LIVE['23:3380'] }), // 1:95 missing
    });
    expect(result.exitCode).toBe(1);
    expect(result.report).toContain('MISSING');
    expect(result.report).toContain('1:95');
  });

  it('exits 2 on an operational failure (401) and never overwrites state', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, checkpointedState(LIVE));
    const before = readFileSync(statePath, 'utf8');
    const result = await runCheck({
      statePath,
      token: 'bad',
      fetchImpl: async () => ({
        ok: false,
        status: 401,
        statusText: 'Unauthorized',
        json: async () => ({}),
      }),
    });
    expect(result.exitCode).toBe(2);
    expect(result.report).toContain('401');
    expect(readFileSync(statePath, 'utf8')).toBe(before);
  });

  it('is strictly read-only: no drift check leaves any extra file', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, checkpointedState(LIVE));
    const before = readFileSync(statePath, 'utf8');
    const result = await runCheck({
      statePath,
      token: 'fake',
      fetchImpl: makeFetch(fileMeta(), LIVE),
    });
    expect(result.exitCode).toBe(0);
    expect(readdirSync(dir)).toEqual(['figma-sync-state.json']);
    expect(readFileSync(statePath, 'utf8')).toBe(before);
  });
});
