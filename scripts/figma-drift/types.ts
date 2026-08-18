/**
 * Shared types for the read-only Figma drift / checkpoint tooling (Issue #233).
 *
 * Exit-code contract (Issue #233): drift and tool failure must be distinct so
 * CI / humans can react differently. `0` = no drift, `1` = drift, `2` =
 * operational failure (auth / network / schema / missing token / missing
 * checkpoint). An operational failure must never overwrite the last good
 * checkpoint.
 */

export const STATE_SCHEMA_VERSION = 1;

/** Exit code: no drift detected. */
export const EXIT_OK = 0;
/** Exit code: at least one watched surface changed / is new / is missing. */
export const EXIT_DRIFT = 1;
/** Exit code: the tool could not complete (auth, network, schema, missing token, missing checkpoint). */
export const EXIT_OPERATIONAL = 2;

/** A single watched Figma surface. `hash` stays null until the first checkpoint. */
export interface WatchedNode {
  id: string;
  name: string;
  hash: string | null;
}

/** The acknowledged checkpoint: file identity + when it was reviewed/acknowledged. */
export interface Checkpoint {
  createdAt: string;
  fileName: string;
  fileVersion: string;
  fileLastModified: string;
}

/**
 * On-disk sync state (`docs/design/figma-sync-state.json`).
 *
 * Only `pnpm figma:checkpoint` writes this file (atomically). `pnpm figma:check`
 * and `pnpm figma:gate` are strictly read-only.
 */
export interface SyncState {
  schemaVersion: typeof STATE_SCHEMA_VERSION;
  fileKey: string;
  checkpoint: Checkpoint | null;
  watchedNodes: WatchedNode[];
}

/**
 * Map status enum (Issue #233). The initial surface map is populated from the
 * acknowledged #234 baseline audit; later runs can mark a surface with any of
 * these values without changing the schema.
 */
export type MapStatus =
  | 'MATCH'
  | 'FIGMA_CHANGED'
  | 'IMPLEMENTATION_BEHIND'
  | 'ISSUE_MISSING'
  | 'INTENTIONALLY_DIFFERENT'
  | 'UNRESOLVED';

/** One row of the machine-readable implementation map. */
export interface MapEntry {
  /** Figma node id. Null for cross-cutting engineering deviations without a single node. */
  nodeId: string | null;
  surface: string;
  journeyRole: string;
  implementation: string;
  codeFiles: string[];
  issues: string[];
  status: MapStatus;
  /** Whether this surface has a watched Figma node (i.e. appears in the sync-state watchlist). */
  watched: boolean;
  note?: string;
}

/** Per-watched-node classification of live Figma vs the checkpoint. */
export type DriftStatus = 'unchanged' | 'changed' | 'new' | 'missing';

export interface DriftEntry {
  nodeId: string;
  checkpointName: string;
  liveName: string | null;
  status: DriftStatus;
  mapEntry: MapEntry | null;
}

export interface FigmaFileMeta {
  fileKey: string;
  name: string;
  version: string;
  lastModified: string;
}

export type OperationalCode =
  | 'missing-token'
  | 'auth-failed'
  | 'rate-limited'
  | 'file-unavailable'
  | 'network-error'
  | 'schema-incomplete'
  | 'state-file-missing'
  | 'missing-checkpoint'
  | 'state-write-failed';

/**
 * A recoverable, operator-facing failure. Never a corrupt or partial write.
 * Thrown inside the API/client layers and converted to `EXIT_OPERATIONAL` by
 * the run-* orchestrators.
 */
export class OperationalError extends Error {
  readonly code: OperationalCode;

  constructor(code: OperationalCode, message: string) {
    super(message);
    this.name = 'OperationalError';
    this.code = code;
  }
}

/** Outcome of a `figma:check`-style comparison against the checkpoint. */
export interface DriftResult {
  fileMeta: FigmaFileMeta | null;
  checkpoint: Checkpoint;
  entries: DriftEntry[];
  hasDrift: boolean;
}

/**
 * Change-classification contract (Issue #233). A downstream reviewer must be
 * able to classify any surfaced change into exactly one of these categories.
 * Only the first four are usually direct prototype-parity work; Product
 * semantics must never silently become production architecture.
 */
export const CHANGE_CLASSIFICATIONS = [
  'Visual-only: spacing/color/radius/type/image',
  'Interaction: sequential reveal/scroll/button state',
  'Content: wording/options/order',
  'Flow: added/removed/reordered screen',
  'Product semantics: persistence/recommendation/safety/data meaning',
] as const;
