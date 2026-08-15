/**
 * Core contracts for the source-driven data acquisition layer (#175).
 *
 * The layer is deliberately thin: a small machine-readable source registry
 * (SourceManifest), a uniform adapter contract (AcquisitionAdapter), and a
 * provenance-preserving pipeline (raw artifact → checksum → normalized
 * records). It is not a plugin loader, CMS, job scheduler, or universal
 * schema registry.
 *
 * Acquisition and Product editorial meaning are separate: normalized records
 * carry provenance but never make a Product-visible claim on their own.
 */

/** How a source is acquired. */
export type AcquisitionType = 'ckan' | 'http_file' | 'api' | 'html';

/** Artifact checksum (the only supported algorithm today is sha256). */
export interface Checksum {
  algorithm: 'sha256';
  /** Hex digest of the raw bytes. */
  value: string;
}

/**
 * Machine-readable description of one official public data source.
 *
 * Every field the registry can express is optional except the identity,
 * provider, URL, acquisition type, format, license, and adapter identity —
 * those are required for a source to be acquirable at all.
 */
export interface SourceManifest {
  /** Stable source id, e.g. "tokyo-designated-cultural-property". */
  id: string;
  /** Provider / publisher, e.g. "東京都教育庁". */
  provider: string;
  /** Direct artifact URL. */
  url: string;
  /** Acquisition type hint (ckan | http_file | api | html). */
  acquisitionType: AcquisitionType;
  /** Dataset id within the provider's catalog, when applicable. */
  datasetId?: string;
  /** Catalog / dataset page URL when applicable. */
  catalogUrl?: string;
  /** Artifact format, e.g. "csv", "xlsx", "zip", "geojson". */
  format: string;
  /** Character encoding of the artifact when applicable, e.g. "cp932". */
  encoding?: string;
  /** License identifier / name, e.g. "CC BY 4.0". */
  license: string;
  /** URL of the license text when known. */
  licenseUrl?: string;
  /** Reuse / attribution notes when known. */
  reuseNotes?: string;
  /** Adapter id; must match a registered adapter in the adapter registry. */
  adapterId: string;
  /** Whether credentials are required to fetch this source. */
  credentialsRequired: boolean;
  /** Last known retrieval timestamp (ISO 8601). Updated by `data:sync`. */
  retrievedAt?: string;
  /** Last known raw-artifact checksum. Updated by `data:sync`. */
  checksum?: Checksum;
  /** The source document's own last-updated timestamp when known. */
  sourceUpdatedAt?: string;
  /** Team last-verified date (ISO 8601). */
  lastVerifiedAt?: string;
  /**
   * Related Product usage as evaluated in research (informational only).
   * It records *potential* surface support — it is not a claim that any
   * Product-visible record has been produced from this data.
   */
  productUsage?: string;
  /** Path of the cached raw artifact, relative to the cache root. */
  cachePath?: string;
}

/**
 * A raw artifact that has been fetched and cached locally.
 * The raw bytes are never interpreted here — provenance is preserved so a
 * downstream consumer can always trace back to the source artifact.
 */
export interface CachedArtifact {
  /** Source manifest id this artifact belongs to. */
  manifestId: string;
  /** Absolute path of the cached raw bytes. */
  filePath: string;
  /** Byte size of the artifact. */
  size: number;
  /** sha256 of the raw bytes. */
  checksum: Checksum;
  /** True when bytes were freshly downloaded; false when the cache was up to date. */
  downloaded: boolean;
  /** ISO 8601 retrieval timestamp (kept from the previous run when unchanged). */
  retrievedAt: string;
}

/**
 * Provenance attached to every normalized record.
 *
 * This is the transformation boundary: source identity, retrieval timestamp,
 * the exact raw artifact reference (path + checksum), and license. Nothing
 * may enter Product without carrying this metadata.
 */
export interface ProvenanceMetadata {
  /** Source manifest id. */
  sourceId: string;
  /** Provider name. */
  provider: string;
  /** Dataset id within the provider's catalog when applicable. */
  datasetId?: string;
  /** Catalog / dataset page URL when applicable. */
  sourceUrl?: string;
  /** Direct artifact URL that was fetched. */
  artifactUrl: string;
  /** License identifier. */
  license: string;
  /** ISO 8601 retrieval timestamp. */
  retrievedAt: string;
  /** Reference to the exact raw artifact bytes. */
  artifact: {
    /** Cache-relative path of the raw artifact. */
    filePath: string;
    /** sha256 of the raw bytes. */
    checksum: Checksum;
    /** Byte size. */
    size: number;
  };
  /** The source document's own last-updated timestamp when known. */
  sourceUpdatedAt?: string;
}

/**
 * One normalized evidence record produced by an adapter.
 *
 * `data` is adapter-specific and must not silently invent values: fields that
 * are missing or unverifiable in the source stay undefined.
 */
export interface NormalizedRecord<
  TData extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Deterministic id within the acquisition layer (stable across re-runs). */
  id: string;
  /** Original record id within the source dataset. */
  originalId: string;
  /** Provenance of this record. */
  provenance: ProvenanceMetadata;
  /** Normalized fields produced by the adapter. */
  data: TData;
}

/** A raw, unnormalized row as parsed from the artifact (adapter-specific). */
export type RawRow = Record<string, string | undefined>;

/** Shared pure helpers adapters can use (CSV split, encoding decode). */
export interface AdapterHelpers {
  /** Decode raw bytes as text using the given encoding (default utf-8). */
  decodeText(buffer: ArrayBuffer, encoding?: string): string;
  /** Minimal RFC-4180-ish CSV splitter. */
  parseCsv(text: string): string[][];
}

/** Input handed to an adapter's parse step. */
export interface AdapterInput {
  /** Raw artifact bytes (decoding is the adapter's job via helpers). */
  bytes: ArrayBuffer;
  /** Cached artifact metadata. */
  artifact: CachedArtifact;
  /** The source being parsed. */
  manifest: SourceManifest;
}

/** Context passed to an adapter's normalize step. */
export interface NormalizeContext {
  /** The source being normalized. */
  manifest: SourceManifest;
  /** The cached raw artifact the rows came from. */
  artifact: CachedArtifact;
}

/**
 * A source-specific acquisition adapter.
 *
 * Implementations are plain modules: a `parse` step that turns the raw
 * artifact bytes into source-shaped rows, and a `normalize` step that turns
 * rows into deterministic, provenance-carrying NormalizedRecords. Both steps
 * are pure where possible so the pipeline is unit-testable without network
 * access (file I/O stays in the sync engine / tests).
 */
export interface AcquisitionAdapter<
  TData extends Record<string, unknown> = Record<string, unknown>,
> {
  /** Adapter id; must match SourceManifest.adapterId. */
  id: string;
  /** Parse raw artifact bytes into source-shaped rows. */
  parse(input: AdapterInput, helpers: AdapterHelpers): RawRow[];
  /** Normalize rows into deterministic normalized records. */
  normalize(rows: RawRow[], ctx: NormalizeContext): NormalizedRecord<TData>[];
}

/** Outcome of acquiring one source. */
export interface SourceReport {
  /** Source manifest id. */
  sourceId: string;
  /** 'ok' when the source was acquired and normalized; 'error' otherwise. */
  status: 'ok' | 'error';
  /** Cached artifact when acquisition succeeded. */
  artifact?: CachedArtifact;
  /** Number of normalized records when acquisition succeeded. */
  recordCount?: number;
  /** Error message when acquisition failed. */
  error?: string;
}

/** Concise report produced by a `data:sync` run. */
export interface AcquisitionReport {
  /** ISO 8601 run timestamp. */
  runAt: string;
  /** Per-source outcomes, one per configured source. */
  sources: SourceReport[];
}
