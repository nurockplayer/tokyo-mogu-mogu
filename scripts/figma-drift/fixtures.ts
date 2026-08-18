import type { FetchLike } from './api';
import type { SyncState, WatchedNode } from './types';

/**
 * Deterministic test fixtures (Issue #233). No live network, no token — the
 * Figma REST responses below are the same shapes the real API returns.
 */

/** A minimal, realistic `/nodes` response entry for a watched node. */
export function nodeEntry(
  name: string,
  overrides: Record<string, unknown> = {},
): Record<string, unknown> {
  return {
    name,
    document: {
      id: 'root',
      name,
      type: 'FRAME',
      children: [
        { id: 'child-1', type: 'TEXT', characters: 'Hello', x: 0, y: 0 },
        { id: 'child-2', type: 'RECTANGLE', fill: { type: 'SOLID', color: { r: 1, g: 0, b: 0 } } },
      ],
    },
    components: { '123:4': { key: 'x', name: 'Button' } },
    componentSets: {},
    styles: {},
    ...overrides,
  };
}

/** A structurally different document for the same node (simulates a Figma edit). */
export function nodeEntryVariant(name: string): Record<string, unknown> {
  return nodeEntry(name, {
    document: {
      id: 'root',
      name,
      type: 'FRAME',
      children: [{ id: 'child-9', type: 'TEXT', characters: 'Changed copy' }],
    },
  });
}

/** Deterministic file metadata response. */
export function fileMeta(): Record<string, unknown> {
  return {
    name: 'KiKi Food App',
    version: 'v9948f714',
    lastModified: '2026-08-18T00:00:00Z',
    thumbnailUrl: 'https://example.invalid/thumb.png', // placeholder only; never committed from live data
  };
}

/** A fetch stub that serves fixed file metadata and a fixed `/nodes` map. */
export function makeFetch(
  meta: Record<string, unknown>,
  nodes: Record<string, unknown>,
): FetchLike {
  return async (url: string) => {
    const body = url.includes('/nodes') ? { nodes } : meta;
    return {
      ok: true,
      status: 200,
      statusText: 'OK',
      json: async () => body,
    };
  };
}

/** An operational-failure fetch stub (e.g. 401) for a given URL fragment. */
export function makeFailingFetch(
  status: number,
  fragment = '/nodes',
): FetchLike {
  return async (url: string) => {
    if (!url.includes(fragment)) {
      throw new Error(`unexpected URL in failing fetch stub: ${url}`);
    }
    return { ok: false, status, statusText: 'FAIL', json: async () => ({}) };
  };
}

/** Build a valid state object from a watchlist (checkpoint defaults to null). */
export function makeState(
  watchedNodes: WatchedNode[],
  checkpoint: SyncState['checkpoint'] = null,
): SyncState {
  return {
    schemaVersion: 1,
    fileKey: 'fHqhA3d26OdXqm0cQxfK31',
    checkpoint,
    // Copy entries so tests can never mutate the shared TWO_NODE_WATCH fixture.
    watchedNodes: watchedNodes.map((node) => ({ ...node })),
  };
}

/** The standard 2-node watchlist used across drift tests. */
export const TWO_NODE_WATCH: WatchedNode[] = [
  { id: '1:95', name: 'Landing', hash: null },
  { id: '23:3380', name: 'Result', hash: null },
];
