import { execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import net from 'node:net';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';
import { parse as parseYaml } from 'yaml';

/**
 * Deterministic regression harness for the Playwright preview-server guard
 * (Issue #188). Pins the two guarantees that stop a stale `vite preview` from
 * another worktree being silently reused as the E2E target:
 *
 *  1. playwright.config.ts never opts into `reuseExistingServer`.
 *  2. scripts/assert-preview-port-free.mjs fails fast (exit 1, recovery hint)
 *     when its port is occupied and passes (exit 0) when free.
 */

const execFileAsync = promisify(execFile);
const guardScript = fileURLToPath(new URL('../assert-preview-port-free.mjs', import.meta.url));
const ciWorkflow = fileURLToPath(new URL('../../.github/workflows/ci.yml', import.meta.url));

type WorkflowStep = {
  name?: unknown;
  run?: unknown;
};

type WorkflowJob = {
  steps?: WorkflowStep[];
};

function parseGoldenPathJob(workflow: string): WorkflowJob {
  const parsed = parseYaml(workflow) as { jobs?: Record<string, WorkflowJob> };
  const job = parsed.jobs?.['golden-path-e2e'];
  if (!job) {
    throw new Error('Golden Path job is missing from CI workflow');
  }
  return job;
}

function goldenPathBuildCommand(workflow = readFileSync(ciWorkflow, 'utf8')): string {
  const job = parseGoldenPathJob(workflow);
  const steps = Array.isArray(job.steps) ? job.steps : [];
  const buildStep = steps.find((step) => String(step.name ?? '').trim() === 'Build');
  const buildCommand = typeof buildStep?.run === 'string' ? buildStep.run.trim() : '';
  if (buildCommand !== 'pnpm build:bundle') {
    throw new Error(
      `Golden Path Build step must run exactly "pnpm build:bundle"; received ${JSON.stringify(buildCommand)}`,
    );
  }

  const disallowed = steps
    .map((step) => (typeof step.run === 'string' ? step.run.trim() : ''))
    .filter((command) => /\b(?:npm|npx|yarn|bun)\b/.test(command));
  if (disallowed.length > 0) {
    throw new Error(`Golden Path job contains a disallowed package-manager command: ${disallowed.join('; ')}`);
  }

  return buildCommand;
}

/** Grab a currently-free loopback port, then release it. */
function freePort(): Promise<number> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.unref();
    server.once('error', reject);
    server.listen(0, '127.0.0.1', () => {
      const port = (server.address() as net.AddressInfo).port;
      server.close(() => resolve(port));
    });
  });
}

/** Bind a server to the port so the guard sees it as occupied. */
function occupyPort(port: number): Promise<net.Server> {
  return new Promise((resolve, reject) => {
    const server = net.createServer();
    server.once('error', reject);
    server.listen(port, '127.0.0.1', () => resolve(server));
  });
}

function closeServer(server: net.Server): Promise<void> {
  return new Promise((resolve) => server.close(() => resolve()));
}

async function runGuard(port?: string): Promise<{ code: number; stderr: string }> {
  const args = port === undefined ? [] : [port];
  try {
    const { stderr } = await execFileAsync(process.execPath, [guardScript, ...args]);
    return { code: 0, stderr: String(stderr) };
  } catch (err) {
    const e = err as { code?: number; stderr?: string | Buffer };
    return { code: e.code ?? 1, stderr: String(e.stderr ?? '') };
  }
}

describe('playwright preview-server guard (#188)', () => {
  it('never reuses an existing preview server and runs the port-free guard first', async () => {
    const cfg = (await import('../../playwright.config.ts')).default;
    const webServer = cfg.webServer;
    expect(webServer.reuseExistingServer).toBe(false);
    expect(webServer.command).toContain('assert-preview-port-free.mjs 4173');
    expect(webServer.command).toContain('--strictPort');
  });

  it('exits 1 with a recovery hint when the port is already in use', async () => {
    const port = await freePort();
    const server = await occupyPort(port);
    try {
      const { code, stderr } = await runGuard(String(port));
      expect(code).toBe(1);
      expect(stderr).toContain(`Port ${port} is already in use`);
      expect(stderr).toContain('lsof');
    } finally {
      await closeServer(server);
    }
  });

  it('exits 0 when the port is free', async () => {
    const port = await freePort();
    expect((await runGuard(String(port))).code).toBe(0);
  });

  it('exits 0 when no port is given', async () => {
    expect((await runGuard()).code).toBe(0);
  });

  it('keeps the canonical gate separate from focused browser regressions', async () => {
    const canonical = (await import('../../playwright.config.ts')).default;
    const focused = (await import('../../playwright.regressions.config.ts')).default;

    expect(canonical.testMatch).toBe('current-mvp-smoke.spec.ts');
    expect(focused.testMatch).toEqual([
      'issue-283-visual-parity.spec.ts',
      'issue-296-my-badges.spec.ts',
      'issue-313-my-badges-layout.spec.ts',
      'issue-348-ome-sake.spec.ts',
    ]);
  });
});

describe('Golden Path workflow contract (#301)', () => {
  it('builds the E2E bundle through the repository-local pnpm script', () => {
    expect(goldenPathBuildCommand()).toBe('pnpm build:bundle');
  });

  it('does not borrow a later run command when the Build step has no command', () => {
    const workflow = [
      'jobs:',
      '  golden-path-e2e:',
      '    steps:',
      '      - name: Build',
      '      - name: Later step',
      '        run: pnpm build:bundle',
      '  merge-gate:',
      '    runs-on: ubuntu-latest',
    ].join('\n');

    expect(() => goldenPathBuildCommand(workflow)).toThrow(
      'Golden Path Build step must run exactly "pnpm build:bundle"; received ""',
    );
  });

  it('rejects a disallowed package manager in any Golden Path run command', () => {
    const workflow = [
      'jobs:',
      '  golden-path-e2e:',
      '    steps:',
      '      - name: Build',
      '        run: pnpm build:bundle',
      '      - name: Later step',
      '        run: npx playwright test',
      '  merge-gate:',
      '    runs-on: ubuntu-latest',
    ].join('\n');

    expect(() => goldenPathBuildCommand(workflow)).toThrow(
      'Golden Path job contains a disallowed package-manager command: npx playwright test',
    );
  });

  it('stops at a valid underscore-named job boundary', () => {
    const workflow = [
      'jobs:',
      '  golden-path-e2e:',
      '    steps:',
      '      - name: Build',
      '        run: pnpm build:bundle',
      '  merge_gate:',
      '    runs-on: ubuntu-latest',
      '    steps:',
      '      - name: Unrelated',
      '        run: npx should-not-be-in-golden-path',
    ].join('\n');

    expect(goldenPathBuildCommand(workflow)).toBe('pnpm build:bundle');
  });

  it('normalizes a quoted Build step name', () => {
    const workflow = [
      'jobs:',
      '  golden-path-e2e:',
      '    steps:',
      '      - name: "Build"',
      '        run: pnpm build:bundle',
      '  merge-gate:',
      '    runs-on: ubuntu-latest',
    ].join('\n');

    expect(goldenPathBuildCommand(workflow)).toBe('pnpm build:bundle');
  });

  it('interprets a literal run scalar as one bundle-only script', () => {
    const workflow = [
      'jobs:',
      '  golden-path-e2e:',
      '    steps:',
      '      - name: Build',
      '        run: |',
      '          pnpm build:bundle',
      '  merge-gate:',
      '    runs-on: ubuntu-latest',
    ].join('\n');

    expect(goldenPathBuildCommand(workflow)).toBe('pnpm build:bundle');
  });

  it('folds a multiline run scalar before checking the Build command', () => {
    const workflow = [
      'jobs:',
      '  golden-path-e2e:',
      '    steps:',
      '      - name: Build',
      '        run: >-',
      '          pnpm',
      '          build:bundle',
      '  merge-gate:',
      '    runs-on: ubuntu-latest',
    ].join('\n');

    expect(goldenPathBuildCommand(workflow)).toBe('pnpm build:bundle');
  });

  it('does not execute a folded scalar whose first line comments out the build', () => {
    const workflow = [
      'jobs:',
      '  golden-path-e2e:',
      '    steps:',
      '      - name: Build',
      '        run: >-',
      '          # build disabled',
      '          pnpm build:bundle',
      '  merge-gate:',
      '    runs-on: ubuntu-latest',
    ].join('\n');

    expect(() => goldenPathBuildCommand(workflow)).toThrow('Golden Path Build step must run exactly');
  });
});
