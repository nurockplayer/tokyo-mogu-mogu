import { describe, expect, it } from 'vitest';
import { sha256Hex } from './checksum.ts';

describe('sha256Hex', () => {
  it('returns a stable sha256 hex for fixed bytes', () => {
    const bytes = new TextEncoder().encode('tokyo mogu mogu');
    expect(sha256Hex(bytes.buffer)).toEqual({
      algorithm: 'sha256',
      value: 'c52c7487a0740b2052bce1eb0bcd3827595eb1db9430c878d70b747d4a37477c',
    });
  });

  it('returns the known empty-input digest', () => {
    expect(sha256Hex(new ArrayBuffer(0)).value).toBe(
      'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
    );
  });
});
