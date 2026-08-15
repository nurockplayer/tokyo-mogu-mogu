#!/usr/bin/env node
/**
 * Fail-fast guard for the Playwright webServer (Issue #188).
 *
 * Usage:
 *   node scripts/assert-preview-port-free.mjs <port>
 *
 * Exit 0 when <port> is free (or when no port is given). Exit 1 with a clear
 * recovery hint when the port is already in use, so a stale `vite preview`
 * left running by another worktree is surfaced as an explicit failure instead
 * of Playwright silently reusing it and testing the wrong build.
 *
 * The probe binds to 127.0.0.1 because that is the exact origin the E2E
 * browser hits (playwright.config.ts baseURL); a server on that loopback
 * address/port is the only collision that matters for the test.
 *
 * Built-ins only — no dependencies.
 */
import net from 'node:net';

const port = Number(process.argv[2]);

// No (or invalid) port: nothing to guard; let the webServer command decide.
if (!Number.isInteger(port) || port < 1 || port > 65535) process.exit(0);

const probe = net.createServer();
probe.once('error', (err) => {
  // Only an address-in-use on the target port is our signal. Any other bind
  // error is unrelated; let the webServer command surface it.
  if (err?.code !== 'EADDRINUSE') process.exit(0);
  console.error(
    `[assert-preview-port-free] Port ${port} is already in use — likely a stale ` +
      '`vite preview` left running by another worktree. Playwright will NOT ' +
      'reuse it.\nStop the stale server, then re-run the E2E so the current ' +
      'worktree build is served:\n' +
      `  lsof -ti tcp:${port} | xargs kill`,
  );
  process.exit(1);
});
probe.listen(port, '127.0.0.1', () => probe.close(() => process.exit(0)));
