import { createFigmaClient, type FetchLike } from './api';
import { extractNodeName, hashNode } from './hash';
import { loadState, writeStateAtomic } from './state';
import {
  EXIT_OK,
  EXIT_OPERATIONAL,
  OperationalError,
  STATE_SCHEMA_VERSION,
  type SyncState,
  type WatchedNode,
} from './types';

/**
 * `figma:checkpoint` orchestration (Issue #233) — the ONLY normal baseline-write
 * path. Re-fetches live Figma, shows a proposed change summary, and only on
 * explicit confirmation writes the state file atomically (temp file + rename).
 *
 * Safety rules:
 * - Malformed / incomplete / partial API responses are refused and NEVER
 *   overwrite the last good checkpoint.
 * - A watched node missing from the live response (deleted / moved / renamed)
 *   also refuses the write: silently acknowledging deletion would be a
 *   data-losing baseline update.
 * - A null checkpoint is the bootstrap case: it writes the first baseline and
 *   is an explicit, human-confirmed action (never auto-created by figma:check).
 */

export interface CheckpointOptions {
  statePath: string;
  token: string;
  fetchImpl?: FetchLike;
  baseUrl?: string;
  now?: () => string;
  /** Injectable confirmation gate; the CLI wires an interactive prompt / --yes. */
  confirm?: (message: string) => Promise<boolean> | boolean;
}

export interface CheckpointResult {
  exitCode: number;
  report: string;
  wrote: boolean;
}

function operationalResult(message: string): CheckpointResult {
  return {
    exitCode: EXIT_OPERATIONAL,
    report: `OPERATIONAL: ${message}\nNothing was written.\n`,
    wrote: false,
  };
}

/** Human-readable proposed-change summary vs the current state. */
export function summarizeProposedState(
  current: SyncState,
  proposed: SyncState,
): string {
  const lines: string[] = [];
  if (current.checkpoint === null) {
    lines.push(
      `Initial checkpoint (no prior baseline): ${proposed.watchedNodes.length} watched node(s) will be recorded.`,
    );
  } else {
    const currentById = new Map(
      current.watchedNodes.map((node) => [node.id, node]),
    );
    let changed = 0;
    let newNodes = 0;
    for (const node of proposed.watchedNodes) {
      const prior = currentById.get(node.id);
      if (prior === undefined) {
        newNodes += 1;
      } else if (prior.hash !== node.hash) {
        changed += 1;
      }
    }
    lines.push(
      `Proposed checkpoint update: ${changed} changed, ${newNodes} new, ` +
        `${proposed.watchedNodes.length - changed - newNodes} unchanged.`,
    );
  }
  const meta = proposed.checkpoint;
  if (meta !== null) {
    lines.push(
      `  file: ${meta.fileName} @ version ${meta.fileVersion} (lastModified ${meta.fileLastModified})`,
    );
  }
  lines.push('  This acknowledges the current Figma as the reviewed baseline.');
  return lines.join('\n');
}

export async function runCheckpoint(
  options: CheckpointOptions,
): Promise<CheckpointResult> {
  const now = options.now ?? (() => new Date().toISOString());

  if (options.token === '') {
    return operationalResult('FIGMA_ACCESS_TOKEN is not set');
  }

  let state: SyncState;
  try {
    state = loadState(options.statePath);
  } catch (error) {
    if (error instanceof OperationalError) {
      return operationalResult(error.message);
    }
    throw error;
  }

  const client = createFigmaClient({
    fileKey: state.fileKey,
    token: options.token,
    fetchImpl: options.fetchImpl,
    baseUrl: options.baseUrl,
  });

  let meta;
  let nodes: Record<string, unknown>;
  try {
    [meta, nodes] = await Promise.all([
      client.getFileMeta(),
      client.getWatchedNodes(state.watchedNodes.map((node) => node.id)),
    ]);
  } catch (error) {
    if (error instanceof OperationalError) {
      return operationalResult(error.message);
    }
    throw error;
  }

  // Partial-response guard: every watched node must resolve live before a
  // baseline can be acknowledged (no fabricated hashes, no silent deletion).
  const unresolved = state.watchedNodes
    .filter((watched) => {
      const live = nodes[watched.id];
      return live === undefined || live === null;
    })
    .map((watched) => watched.id);
  if (unresolved.length > 0) {
    return operationalResult(
      `watched node(s) missing from the live Figma response: ${unresolved.join(
        ', ',
      )} — resolve (deleted / renamed / moved?) before acknowledging a checkpoint`,
    );
  }

  const proposedNodes: WatchedNode[] = state.watchedNodes.map((watched) => {
    const live = nodes[watched.id];
    return {
      id: watched.id,
      name: extractNodeName(live) ?? watched.name,
      hash: hashNode(live),
    };
  });

  const proposed: SyncState = {
    schemaVersion: STATE_SCHEMA_VERSION,
    fileKey: state.fileKey,
    checkpoint: {
      createdAt: now(),
      fileName: meta.name,
      fileVersion: meta.version,
      fileLastModified: meta.lastModified,
    },
    watchedNodes: proposedNodes,
  };

  const summary = summarizeProposedState(state, proposed);
  if (options.confirm !== undefined && !(await options.confirm(summary))) {
    return {
      exitCode: EXIT_OPERATIONAL,
      report: `${summary}\nCheckpoint declined; state file was not modified.\n`,
      wrote: false,
    };
  }

  try {
    writeStateAtomic(options.statePath, proposed);
  } catch (error) {
    if (error instanceof OperationalError) {
      return operationalResult(error.message);
    }
    throw error;
  }

  return {
    exitCode: EXIT_OK,
    report: `${summary}\nCheckpoint written to ${options.statePath}\n`,
    wrote: true,
  };
}
