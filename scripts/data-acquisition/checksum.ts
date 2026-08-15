/**
 * Checksum helpers for the acquisition layer (#175).
 *
 * The sha256 of the raw artifact bytes is the traceability anchor: a cached
 * artifact can be verified against the registry / report even when the raw
 * file itself is not committed.
 */
import { createHash } from 'node:crypto';
import type { Checksum } from './types.ts';

/** sha256 of a byte buffer as a hex Checksum object. */
export function sha256Hex(buffer: ArrayBuffer): Checksum {
  return {
    algorithm: 'sha256',
    value: createHash('sha256').update(new Uint8Array(buffer)).digest('hex'),
  };
}
