import { readFileSync } from 'node:fs';
import { describe, expect, it } from 'vitest';

// Deterministic regression coverage for the repository-owned local validation
// command surface (Issue #153). These assertions pin the agent-facing commands
// to native Vitest behavior and keep the T2 pre-PR gate complete, so a future
// script edit cannot silently swap in a third-party graph framework, drop a
// gate, or hide a failure with `;` instead of `&&`.
const pkg = JSON.parse(
  readFileSync(new URL('../../package.json', import.meta.url), 'utf8'),
) as { scripts: Record<string, string> };

describe('local validation command surface (#153)', () => {
  it('exposes native focused and related-test commands', () => {
    expect(pkg.scripts['test:related']).toContain('vitest related');
    expect(pkg.scripts['test:related']).toContain('--run');
    expect(pkg.scripts['test:focused']).toContain('vitest run');
  });

  it('does not route test selection through a third-party graph framework', () => {
    for (const key of ['test:related', 'test:focused']) {
      expect(pkg.scripts[key]).not.toMatch(/\b(nx|turbo|bazel)\b/);
    }
  });

  it('keeps the T2 pre-PR runtime gate complete and failure-propagating', () => {
    const validate = pkg.scripts.validate;
    expect(validate).toContain('pnpm typecheck');
    expect(validate).toContain('pnpm lint');
    expect(validate).toContain('pnpm test');
    expect(validate).toContain('pnpm build');
    // `&&` aborts the chain on the first failure; `;` would hide it.
    expect(validate).toContain('&&');
    expect(validate).not.toContain(';');
  });
});
