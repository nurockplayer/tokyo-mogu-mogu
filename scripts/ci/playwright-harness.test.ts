import { execFile } from 'node:child_process';
import { readFileSync } from 'node:fs';
import net from 'node:net';
import { promisify } from 'node:util';
import { fileURLToPath } from 'node:url';
import { describe, expect, it } from 'vitest';

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
  name: string;
  runCommands: string[];
};

type ParsedWorkflowJob = {
  steps: WorkflowStep[];
  runCommands: string[];
};

function normalizeYamlScalar(value: string): string {
  const trimmed = value.trim();
  const quote = trimmed[0];
  return (quote === '"' || quote === "'") && trimmed.endsWith(quote)
    ? trimmed.slice(1, -1)
    : trimmed;
}

function readGoldenPathJobLines(workflow: string): string[] {
  const lines = workflow.split(/\r?\n/);
  const jobStart = lines.findIndex((line) => line === '  golden-path-e2e:');
  if (jobStart === -1) {
    throw new Error('Golden Path job is missing from CI workflow');
  }

  const jobEnd = lines.findIndex(
    (line, index) => index > jobStart && /^\s{2}[a-z0-9_-]+:\s*$/.test(line),
  );
  return lines.slice(jobStart, jobEnd === -1 ? lines.length : jobEnd);
}

function parseGoldenPathJob(workflow: string): ParsedWorkflowJob {
  const steps: WorkflowStep[] = [];
  const runCommands: string[] = [];
  let currentStep: WorkflowStep | undefined;
  const lines = readGoldenPathJobLines(workflow);

  for (let index = 0; index < lines.length; index += 1) {
    const stepMatch = lines[index].match(/^\s{6}-\s+(.+)$/);
    if (stepMatch) {
      const nameMatch = stepMatch[1].match(/^name:\s*(.+?)\s*$/);
      currentStep = nameMatch ? { name: normalizeYamlScalar(nameMatch[1]), runCommands: [] } : undefined;
      if (currentStep) {
        steps.push(currentStep);
      }
      continue;
    }

    const runMatch = lines[index].match(/^(\s+)run:\s*(.*)$/);
    if (!runMatch) {
      continue;
    }

    const runIndent = runMatch[1].length;
    const runValue = runMatch[2].trim();
    const commands: string[] = [];
    if (/^[|>][-+]?$/.test(runValue)) {
      const blockLines: string[] = [];
      let nextIndex = index + 1;
      while (nextIndex < lines.length) {
        const nextLine = lines[nextIndex];
        const nextIndent = nextLine.search(/\S|$/);
        if (nextLine.trim() !== '' && nextIndent <= runIndent) {
          break;
        }
        if (nextLine.trim() !== '' && !nextLine.trim().startsWith('#')) {
          blockLines.push(nextLine.trim());
        }
        nextIndex += 1;
      }
      index = nextIndex - 1;
      if (runValue.startsWith('>')) {
        commands.push(blockLines.join(' '));
      } else {
        commands.push(...blockLines);
      }
    } else if (runValue !== '') {
      commands.push(runValue);
    }

    runCommands.push(...commands);
    currentStep?.runCommands.push(...commands);
  }

  return { steps, runCommands };
}

function goldenPathBuildCommand(workflow = readFileSync(ciWorkflow, 'utf8')): string {
  const parsed = parseGoldenPathJob(workflow);
  const buildStep = parsed.steps.find(({ name }) => name === 'Build');
  if (!buildStep || buildStep.runCommands.length !== 1 || buildStep.runCommands[0] !== 'pnpm build:bundle') {
    throw new Error(
      `Golden Path Build step must run exactly "pnpm build:bundle"; received ${JSON.stringify(buildStep?.runCommands ?? [])}`,
    );
  }

  const disallowed = parsed.runCommands.filter((command) => /\b(?:npm|npx|yarn|bun)\b/.test(command));
  if (disallowed.length > 0) {
    throw new Error(`Golden Path job contains a disallowed package-manager command: ${disallowed.join('; ')}`);
  }

  return buildStep.runCommands[0];
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
      'Golden Path Build step must run exactly "pnpm build:bundle"; received []',
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
      '          # Keep the E2E build separate from typechecking',
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
});
