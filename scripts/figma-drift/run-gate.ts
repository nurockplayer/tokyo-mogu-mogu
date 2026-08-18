import { execSync } from 'node:child_process';
import { createFigmaClient, type FetchLike } from './api';
import { compareCheckpoint } from './compare';
import { IMPLEMENTATION_MAP } from './map';
import { loadState } from './state';
import {
  EXIT_DRIFT,
  EXIT_OK,
  EXIT_OPERATIONAL,
  OperationalError,
} from './types';

/**
 * `figma:gate` (Issue #233, optional) — surfaces the overlap between surfaces
 * that changed in Figma since the checkpoint and surfaces whose code changed
 * in the current branch/PR diff.
 *
 * Gate policy (informational, never a hard pixel gate):
 * - no overlap -> informational only, exit 0
 * - overlap -> exit 1, the reviewer must re-check live Figma before merge
 * - Product/semantic ambiguity -> surfaced, never auto-fixed
 *
 * Requires a checkpoint (exit 2 with a clear note if none exists yet) because
 * without a baseline we cannot know which Figma surfaces changed.
 */

export interface GateOptions {
  statePath: string;
  token: string;
  baseRef?: string;
  fetchImpl?: FetchLike;
  baseUrl?: string;
  cwd?: string;
  /** Injectable command runner; defaults to execSync. Used by tests to avoid git. */
  exec?: (command: string) => string;
}

export interface GateResult {
  exitCode: number;
  report: string;
}

function defaultExec(command: string): string {
  return execSync(command, { encoding: 'utf8' }).toString();
}

/** Normalize a relative path so './src/x' and 'src/x' compare equal. */
function normalizePath(path: string): string {
  return path.replace(/^\.\//, '');
}

/** Map changed code files to the map surfaces they belong to. */
export function codeChangedSurfaces(
  changedFiles: string[],
): { surface: string; codeFiles: string[] }[] {
  const normalized = new Set(changedFiles.map(normalizePath));
  const bySurface = new Map<string, Set<string>>();
  for (const entry of IMPLEMENTATION_MAP) {
    if (!entry.watched) {
      continue;
    }
    const hit = entry.codeFiles
      .map(normalizePath)
      .find((file) => normalized.has(file));
    if (hit !== undefined) {
      if (!bySurface.has(entry.surface)) {
        bySurface.set(entry.surface, new Set());
      }
      bySurface.get(entry.surface)?.add(hit);
    }
  }
  return [...bySurface.entries()].map(([surface, files]) => ({
    surface,
    codeFiles: [...files],
  }));
}

export async function runGate(options: GateOptions): Promise<GateResult> {
  const operational = (message: string): GateResult => ({
    exitCode: EXIT_OPERATIONAL,
    report: `OPERATIONAL: ${message}\n`,
  });

  if (options.token === '') {
    return operational('FIGMA_ACCESS_TOKEN is not set');
  }

  let state;
  try {
    state = loadState(options.statePath);
  } catch (error) {
    if (error instanceof OperationalError) {
      return operational(error.message);
    }
    throw error;
  }

  if (state.checkpoint === null) {
    return operational(
      'no checkpoint yet — run `pnpm figma:checkpoint` after review before using figma:gate',
    );
  }

  // 1) Figma-changed surfaces.
  const client = createFigmaClient({
    fileKey: state.fileKey,
    token: options.token,
    fetchImpl: options.fetchImpl,
    baseUrl: options.baseUrl,
  });
  let figmaChanged: string[];
  let metaName: string;
  try {
    const [meta, nodes] = await Promise.all([
      client.getFileMeta(),
      client.getWatchedNodes(state.watchedNodes.map((node) => node.id)),
    ]);
    metaName = meta.name;
    const result = compareCheckpoint(
      state.checkpoint,
      meta,
      nodes,
      state.watchedNodes,
    );
    figmaChanged = result.entries
      .filter((entry) => entry.status === 'changed')
      .map((entry) => entry.checkpointName || entry.liveName || entry.nodeId);
  } catch (error) {
    if (error instanceof OperationalError) {
      return operational(error.message);
    }
    throw error;
  }

  // 2) Code-changed surfaces from the branch diff.
  const baseRef = options.baseRef ?? 'origin/main';
  if (!/^[A-Za-z0-9/._-]+$/.test(baseRef)) {
    return operational(`invalid baseRef "${baseRef}" (only ref characters allowed)`);
  }
  const run = options.exec ?? defaultExec;
  let changedFiles: string[];
  try {
    const out = run(`git diff --name-only ${baseRef}...HEAD`);
    changedFiles = out
      .split('\n')
      .map((line) => line.trim())
      .filter((line) => line.length > 0);
  } catch {
    return operational(`failed to read the git diff against ${baseRef}`);
  }
  const codeChanged = codeChangedSurfaces(changedFiles);

  // 3) Overlap.
  const figmaSet = new Set(figmaChanged);
  const overlap = codeChanged
    .map((entry) => entry.surface)
    .filter((surface) => figmaSet.has(surface));

  const lines: string[] = [];
  lines.push(`Figma changed since checkpoint (${metaName}):`);
  for (const surface of figmaChanged) {
    lines.push(`  - ${surface}`);
  }
  lines.push('');
  lines.push('PR/code surfaces:');
  for (const entry of codeChanged) {
    lines.push(`  - ${entry.surface} (${entry.codeFiles.join(', ')})`);
  }
  lines.push('');
  if (overlap.length > 0) {
    lines.push('Overlap (reviewer must re-check live Figma before merge):');
    for (const surface of overlap) {
      lines.push(`  - ${surface}`);
    }
    lines.push(
      '  Do not auto-fix Product/semantic ambiguity — flag it for a decision.',
    );
    return { exitCode: EXIT_DRIFT, report: `${lines.join('\n')}\n` };
  }

  lines.push('Overlap: none (informational only).');
  return { exitCode: EXIT_OK, report: `${lines.join('\n')}\n` };
}
