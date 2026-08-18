import { describe, expect, it } from 'vitest';
import { compareCheckpoint } from './compare.ts';
import { hashNode } from './hash.ts';
import { nodeEntry, nodeEntryVariant } from './fixtures.ts';
import type { Checkpoint, FigmaFileMeta, WatchedNode } from './types.ts';

const CHECKPOINT: Checkpoint = {
  createdAt: '2026-08-18T00:00:00Z',
  fileName: 'KiKi Food App',
  fileVersion: 'v9948f714',
  fileLastModified: '2026-08-18T00:00:00Z',
};

/** A watchlist whose checkpoint hashes are precomputed for the given live nodes. */
function watchedWithHashes(nodes: Record<string, unknown>): WatchedNode[] {
  return Object.entries(nodes).map(([id, entry]) => ({
    id,
    name: (entry as { name?: string }).name ?? id,
    hash: hashNode(entry),
  }));
}

describe('compareCheckpoint', () => {
  it('classifies unchanged when live hash equals the checkpoint hash', () => {
    const landing = nodeEntry('Landing');
    const live = { '1:95': landing };
    const result = compareCheckpoint(
      CHECKPOINT,
      null,
      live,
      watchedWithHashes(live),
    );
    expect(result.entries).toHaveLength(1);
    expect(result.entries[0].status).toBe('unchanged');
    expect(result.entries[0].nodeId).toBe('1:95');
    expect(result.hasDrift).toBe(false);
  });

  it('classifies changed when the live hash differs', () => {
    const landing = nodeEntry('Landing');
    const live = { '1:95': nodeEntryVariant('Landing') };
    const result = compareCheckpoint(
      CHECKPOINT,
      null,
      live,
      watchedWithHashes({ '1:95': landing }),
    );
    expect(result.entries[0].status).toBe('changed');
    expect(result.hasDrift).toBe(true);
  });

  it('classifies new when the checkpoint has no hash yet', () => {
    const landing = nodeEntry('Landing');
    const watched: WatchedNode[] = [{ id: '1:95', name: 'Landing', hash: null }];
    const result = compareCheckpoint(CHECKPOINT, null, { '1:95': landing }, watched);
    expect(result.entries[0].status).toBe('new');
    expect(result.hasDrift).toBe(true);
  });

  it('classifies missing when a watched node is absent from the live response', () => {
    const landing = nodeEntry('Landing');
    const result = compareCheckpoint(
      CHECKPOINT,
      null,
      {},
      watchedWithHashes({ '1:95': landing }),
    );
    expect(result.entries[0].status).toBe('missing');
    expect(result.entries[0].liveName).toBeNull();
    expect(result.hasDrift).toBe(true);
  });

  it('surfaces a live node that is not in the watchlist as new', () => {
    const landing = nodeEntry('Landing');
    const live = { '1:95': landing, '999:9': nodeEntry('Unexpected') };
    const result = compareCheckpoint(
      CHECKPOINT,
      null,
      live,
      watchedWithHashes({ '1:95': landing }),
    );
    expect(result.entries.map((e) => e.nodeId)).toEqual(
      expect.arrayContaining(['1:95', '999:9']),
    );
    const extra = result.entries.find((e) => e.nodeId === '999:9');
    expect(extra?.status).toBe('new');
    expect(result.hasDrift).toBe(true);
  });

  it('does not set drift for a file-metadata change alone', () => {
    const landing = nodeEntry('Landing');
    const live = { '1:95': landing };
    const watched = watchedWithHashes(live);
    const liveMeta: FigmaFileMeta = {
      fileKey: 'fHqhA3d26OdXqm0cQxfK31',
      name: 'KiKi Food App',
      version: 'vNEW',
      lastModified: '2026-08-19T00:00:00Z',
    };
    const result = compareCheckpoint(
      { ...CHECKPOINT, fileVersion: 'vNEW', fileLastModified: '2026-08-19T00:00:00Z' },
      liveMeta,
      live,
      watched,
    );
    expect(result.entries[0].status).toBe('unchanged');
    expect(result.hasDrift).toBe(false);
  });

  it('reports mixed statuses across multiple watched nodes', () => {
    const landing = nodeEntry('Landing');
    const result = compareCheckpoint(
      CHECKPOINT,
      null,
      {
        '1:95': landing, // present, hash matches → unchanged
        '23:3380': nodeEntry('Result'), // present but no checkpoint hash → new
      },
      [
        ...watchedWithHashes({ '1:95': landing }),
        { id: '23:3380', name: 'Result', hash: null }, // new (never acknowledged)
        { id: '55:4166', name: 'Route', hash: hashNode(nodeEntry('Route')) }, // missing
      ],
    );
    const byId = new Map(result.entries.map((e) => [e.nodeId, e.status]));
    expect(byId.get('1:95')).toBe('unchanged');
    expect(byId.get('23:3380')).toBe('new');
    expect(byId.get('55:4166')).toBe('missing');
    expect(result.hasDrift).toBe(true);
  });
});
