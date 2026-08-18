import { mkdtempSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it } from 'vitest';
import { hashNode } from './hash.ts';
import { runCheckpoint, summarizeProposedState } from './run-checkpoint.ts';
import { loadState } from './state.ts';
import {
  fileMeta,
  makeFetch,
  makeState,
  nodeEntry,
  nodeEntryVariant,
  TWO_NODE_WATCH,
} from './fixtures.ts';
import type { Checkpoint, SyncState } from './types.ts';

let tempRoots: string[] = [];

function tempDir(): string {
  const dir = mkdtempSync(join(tmpdir(), 'tmm-figma-checkpoint-'));
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

function writeState(dir: string, state: SyncState): string {
  const path = join(dir, 'figma-sync-state.json');
  writeFileSync(path, `${JSON.stringify(state, null, 2)}\n`, 'utf8');
  return path;
}

function checkpointedState(live: Record<string, unknown>): SyncState {
  return makeState(
    Object.entries(live).map(([id, entry]) => ({
      id,
      name: (entry as { name?: string }).name ?? id,
      hash: hashNode(entry),
    })),
    CHECKPOINT,
  );
}

const LIVE = {
  '1:95': nodeEntry('Landing'),
  '23:3380': nodeEntry('Result'),
};

const NOW = () => '2026-08-19T00:00:00Z';

describe('runCheckpoint (bootstrap)', () => {
  it('writes the first baseline atomically on confirmation', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, makeState(TWO_NODE_WATCH));
    const result = await runCheckpoint({
      statePath,
      token: 'fake',
      now: NOW,
      fetchImpl: makeFetch({ name: 'KiKi Food App', version: 'v1', lastModified: '2026-08-18T00:00:00Z' }, LIVE),
      confirm: async () => true,
    });
    expect(result.exitCode).toBe(0);
    expect(result.wrote).toBe(true);
    expect(result.report).toContain('Initial checkpoint');
    const state = loadState(statePath);
    expect(state.checkpoint).not.toBeNull();
    expect(state.checkpoint?.createdAt).toBe('2026-08-19T00:00:00Z');
    for (const node of state.watchedNodes) {
      expect(node.hash).toMatch(/^[0-9a-f]{64}$/);
    }
    expect(result.report).toContain(statePath);
  });

  it('leaves the state untouched when confirmation is declined', async () => {
    const dir = tempDir();
    const before = makeState(TWO_NODE_WATCH);
    const statePath = writeState(dir, before);
    const result = await runCheckpoint({
      statePath,
      token: 'fake',
      now: NOW,
      fetchImpl: makeFetch(fileMeta(), LIVE),
      confirm: async () => false,
    });
    expect(result.exitCode).toBe(2);
    expect(result.wrote).toBe(false);
    expect(result.report).toContain('Checkpoint declined');
    expect(loadState(statePath)).toEqual(before);
  });

  it('refuses a partial response where a watched node is missing live', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, makeState(TWO_NODE_WATCH));
    const partial = { '1:95': LIVE['1:95'] }; // 23:3380 missing
    const result = await runCheckpoint({
      statePath,
      token: 'fake',
      now: NOW,
      fetchImpl: makeFetch(fileMeta(), partial),
      confirm: async () => true,
    });
    expect(result.exitCode).toBe(2);
    expect(result.wrote).toBe(false);
    expect(result.report).toContain('23:3380');
    expect(result.report).toContain('Nothing was written');
    expect(loadState(statePath).checkpoint).toBeNull();
  });

  it('refuses a malformed metadata response and never corrupts state', async () => {
    const dir = tempDir();
    const before = makeState(TWO_NODE_WATCH);
    const statePath = writeState(dir, before);
    // metadata missing `version` → schema-incomplete
    const malformed = async () => ({
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => ({ name: 'KiKi Food App', lastModified: '2026-08-18T00:00:00Z' }),
    });
    const result = await runCheckpoint({
      statePath,
      token: 'fake',
      now: NOW,
      fetchImpl: malformed,
      confirm: async () => true,
    });
    expect(result.exitCode).toBe(2);
    expect(result.wrote).toBe(false);
    expect(loadState(statePath)).toEqual(before);
  });

  it('exits 2 without a token', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, makeState(TWO_NODE_WATCH));
    const result = await runCheckpoint({ statePath, token: '' });
    expect(result.exitCode).toBe(2);
    expect(result.wrote).toBe(false);
  });
});

describe('runCheckpoint (update)', () => {
  it('proposes a changed/new/unchanged summary and updates the hash on confirm', async () => {
    const dir = tempDir();
    const statePath = writeState(dir, checkpointedState(LIVE));
    const liveChanged = { ...LIVE, '1:95': nodeEntryVariant('Landing') };
    const result = await runCheckpoint({
      statePath,
      token: 'fake',
      now: NOW,
      fetchImpl: makeFetch(fileMeta(), liveChanged),
      confirm: async () => true,
    });
    expect(result.exitCode).toBe(0);
    expect(result.wrote).toBe(true);
    expect(result.report).toContain('1 changed');
    const state = loadState(statePath);
    const landing = state.watchedNodes.find((n) => n.id === '1:95');
    expect(landing?.hash).toBe(hashNode(nodeEntryVariant('Landing')));
  });

  it('declining an update leaves the previous checkpoint intact', async () => {
    const dir = tempDir();
    const before = checkpointedState(LIVE);
    const statePath = writeState(dir, before);
    const liveChanged = { ...LIVE, '1:95': nodeEntryVariant('Landing') };
    const result = await runCheckpoint({
      statePath,
      token: 'fake',
      now: NOW,
      fetchImpl: makeFetch(fileMeta(), liveChanged),
      confirm: async () => false,
    });
    expect(result.exitCode).toBe(2);
    expect(loadState(statePath)).toEqual(before);
  });
});

describe('summarizeProposedState', () => {
  it('labels the bootstrap case', () => {
    const proposed = makeState(TWO_NODE_WATCH, CHECKPOINT);
    const summary = summarizeProposedState(makeState(TWO_NODE_WATCH), proposed);
    expect(summary).toContain('Initial checkpoint');
    expect(summary).toContain('2 watched node(s)');
  });

  it('counts changed/new/unchanged on update', () => {
    const current = checkpointedState(LIVE);
    const proposed = makeState(
      [
        { id: '1:95', name: 'Landing', hash: 'x'.repeat(64) }, // changed
        { id: '23:3380', name: 'Result', hash: hashNode(nodeEntry('Result')) }, // unchanged
        { id: '55:4166', name: 'Route', hash: 'y'.repeat(64) }, // new
      ],
      CHECKPOINT,
    );
    const summary = summarizeProposedState(current, proposed);
    expect(summary).toContain('1 changed, 1 new, 1 unchanged');
    expect(summary).toContain('reviewed baseline');
  });
});
