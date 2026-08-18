import { createFigmaClient, type FetchLike } from './api';
import { compareCheckpoint } from './compare';
import { formatReport } from './report';
import { loadState } from './state';
import {
  EXIT_DRIFT,
  EXIT_OK,
  EXIT_OPERATIONAL,
  OperationalError,
} from './types';

/**
 * `figma:check` orchestration (Issue #233) — STRICTLY READ-ONLY.
 *
 * Never writes `figma-sync-state.json`. Exit codes:
 *   EXIT_OK (0)  = no drift
 *   EXIT_DRIFT (1) = at least one watched surface changed / new / missing
 *   EXIT_OPERATIONAL (2) = auth/network/schema/missing token/missing checkpoint
 *
 * A null checkpoint is reported clearly and is NOT auto-created here: only an
 * explicit `pnpm figma:checkpoint` bootstraps the baseline.
 */

export interface CheckOptions {
  statePath: string;
  token: string;
  fetchImpl?: FetchLike;
  baseUrl?: string;
}

export interface CheckResult {
  exitCode: number;
  report: string;
}

export async function runCheck(options: CheckOptions): Promise<CheckResult> {
  if (options.token === '') {
    return {
      exitCode: EXIT_OPERATIONAL,
      report:
        'OPERATIONAL: FIGMA_ACCESS_TOKEN is not set. Nothing was read or written.\n',
    };
  }

  let state;
  try {
    state = loadState(options.statePath);
  } catch (error) {
    if (error instanceof OperationalError) {
      return { exitCode: EXIT_OPERATIONAL, report: `OPERATIONAL: ${error.message}\n` };
    }
    throw error;
  }

  if (state.checkpoint === null) {
    return {
      exitCode: EXIT_OPERATIONAL,
      report:
        'OPERATIONAL: no checkpoint yet (figma-sync-state.json "checkpoint": null).\n' +
        '  figma:check is read-only and never auto-creates a baseline.\n' +
        '  After a human/team review of the current Figma, run `pnpm figma:checkpoint` to acknowledge it.\n',
    };
  }

  const client = createFigmaClient({
    fileKey: state.fileKey,
    token: options.token,
    fetchImpl: options.fetchImpl,
    baseUrl: options.baseUrl,
  });

  try {
    const [meta, nodes] = await Promise.all([
      client.getFileMeta(),
      client.getWatchedNodes(state.watchedNodes.map((node) => node.id)),
    ]);
    const result = compareCheckpoint(
      state.checkpoint,
      meta,
      nodes,
      state.watchedNodes,
    );
    return {
      exitCode: result.hasDrift ? EXIT_DRIFT : EXIT_OK,
      report: formatReport(result),
    };
  } catch (error) {
    if (error instanceof OperationalError) {
      return {
        exitCode: EXIT_OPERATIONAL,
        report: `OPERATIONAL: ${error.message}\n`,
      };
    }
    throw error;
  }
}
