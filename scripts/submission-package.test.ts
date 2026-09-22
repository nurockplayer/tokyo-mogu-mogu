import { existsSync, mkdtempSync, mkdirSync, readFileSync, rmSync, writeFileSync } from 'node:fs';
import { tmpdir } from 'node:os';
import { join } from 'node:path';
import { afterEach, describe, expect, it, vi } from 'vitest';
import { buildSubmissionPackage } from './submission-package';

const directories: string[] = [];
function output(): string {
  const root = mkdtempSync(join(tmpdir(), 'tmm-submission-test-'));
  directories.push(root);
  const directory = join(root, 'dist-submission');
  mkdirSync(directory);
  writeFileSync(join(directory, 'old.html'), 'previously approved');
  return directory;
}
afterEach(() => directories.splice(0).forEach((directory) => rmSync(directory, { recursive: true, force: true })));

describe('submission package lifecycle', () => {
  it('removes stale approval output before a revoked permission check and never builds', async () => {
    const directory = output();
    const build = vi.fn();
    await expect(buildSubmissionPackage(directory, () => {
      expect(existsSync(directory)).toBe(false);
      throw new Error('Permission revoked');
    }, build)).rejects.toThrow('Permission revoked');
    expect(build).not.toHaveBeenCalled();
    expect(existsSync(directory)).toBe(false);
  });

  it('removes partial output when a build fails after successful clearance', async () => {
    const directory = output();
    await expect(buildSubmissionPackage(directory, () => {}, () => {
      mkdirSync(directory);
      writeFileSync(join(directory, 'partial.html'), 'incomplete');
      throw new Error('Build failed');
    })).rejects.toThrow('Build failed');
    expect(existsSync(directory)).toBe(false);
  });

  it('keeps only the fresh package after both clearance and build succeed', async () => {
    const directory = output();
    await buildSubmissionPackage(directory, () => {}, () => {
      mkdirSync(directory);
      writeFileSync(join(directory, 'index.html'), 'approved');
    });
    expect(existsSync(join(directory, 'old.html'))).toBe(false);
    expect(readFileSync(join(directory, 'index.html'), 'utf8')).toBe('approved');
  });
});
