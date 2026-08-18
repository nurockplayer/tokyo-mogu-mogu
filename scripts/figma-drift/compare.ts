import { extractNodeName, hashNode } from './hash';
import { lookupMapEntry } from './map';
import type { Checkpoint, DriftEntry, DriftResult, FigmaFileMeta, WatchedNode } from './types';

/**
 * Classify live Figma nodes against the last reviewed checkpoint (Issue #233).
 *
 * - `unchanged`: live hash equals the checkpoint hash
 * - `changed`: live hash differs (layout, content, structure, or name changed)
 * - `new`: in the live response but never acknowledged by a checkpoint
 * - `missing`: watched in the checkpoint but absent from the live response
 *   (deleted / renamed / moved) — this is drift, not an operational error
 *
 * File-identity changes (`version` / `lastModified`) are reported through
 * `fileMeta` but do not by themselves set `hasDrift`: drift is defined per
 * watched node, matching "what changed since the last reviewed checkpoint".
 */
export function compareCheckpoint(
  checkpoint: Checkpoint,
  liveMeta: FigmaFileMeta | null,
  liveNodes: Record<string, unknown>,
  watchedNodes: WatchedNode[],
): DriftResult {
  const entries: DriftEntry[] = [];
  const watchedById = new Map(watchedNodes.map((node) => [node.id, node]));

  for (const watched of watchedNodes) {
    const live = liveNodes[watched.id];
    const mapEntry = lookupMapEntry(watched.id);
    if (live === undefined || live === null) {
      entries.push({
        nodeId: watched.id,
        checkpointName: watched.name,
        liveName: null,
        status: 'missing',
        mapEntry,
      });
      continue;
    }
    const liveName = extractNodeName(live) ?? watched.name;
    if (watched.hash === null) {
      entries.push({
        nodeId: watched.id,
        checkpointName: watched.name,
        liveName,
        status: 'new',
        mapEntry,
      });
      continue;
    }
    const status = hashNode(live) === watched.hash ? 'unchanged' : 'changed';
    entries.push({
      nodeId: watched.id,
      checkpointName: watched.name,
      liveName,
      status,
      mapEntry,
    });
  }

  // A node returned by the API that is not in the watchlist (should not
  // normally happen since we request only watched ids) surfaces as `new`.
  for (const id of Object.keys(liveNodes)) {
    if (!watchedById.has(id)) {
      const live = liveNodes[id];
      entries.push({
        nodeId: id,
        checkpointName: '',
        liveName: extractNodeName(live) ?? id,
        status: 'new',
        mapEntry: lookupMapEntry(id),
      });
    }
  }

  const hasDrift = entries.some((entry) => entry.status !== 'unchanged');
  return { fileMeta: liveMeta, checkpoint, entries, hasDrift };
}
