import { execFile } from 'node:child_process';
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
});
