import { CHANGE_CLASSIFICATIONS, type DriftResult } from './types';

/**
 * Human-readable report for `figma:check` (Issue #233).
 *
 * Every changed/new/missing node is printed with a human-readable surface
 * name, the Figma node id, and (when the implementation map has it) the
 * related code path + owning Issue(s) so a reviewer can trace the change.
 */

export function formatReport(result: DriftResult): string {
  const lines: string[] = [];
  const checkpoint = result.checkpoint;

  lines.push(
    `Figma drift vs last reviewed checkpoint (created ${checkpoint.createdAt})`,
  );
  if (result.fileMeta) {
    const meta = result.fileMeta;
    lines.push(
      `  file: ${meta.name} @ version ${meta.version} (lastModified ${meta.lastModified})`,
    );
  }

  for (const entry of result.entries) {
    const label = entry.status.toUpperCase().padEnd(10);
    const name = entry.checkpointName || entry.liveName || entry.nodeId;
    const mapSuffix = entry.mapEntry
      ? `  -> ${entry.mapEntry.implementation} [${entry.mapEntry.issues.join(', ')}]`
      : '';
    lines.push(`  ${label} ${name} (${entry.nodeId})${mapSuffix}`);
  }

  lines.push('');
  if (result.hasDrift) {
    const diff = result.entries.filter((entry) => entry.status !== 'unchanged');
    lines.push(
      `DRIFT: ${diff.length} watched surface(s) differ from the last reviewed checkpoint.`,
    );
    lines.push(
      '  Classify each change before implementation (#233): ' +
        CHANGE_CLASSIFICATIONS.join(' | '),
    );
  } else {
    lines.push('OK: no watched surface differs from the last reviewed checkpoint.');
  }

  return `${lines.join('\n')}\n`;
}
