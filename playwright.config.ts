/**
 * Playwright E2E configuration (Issue #120).
 *
 * The Issue #276 Netlify-authoritative golden path, run in a real browser at
 * the mobile baseline viewport (375px). The suite covers the complete timed
 * Food Profile choreography and Result → Story → Route → Spot, plus a
 * ja/en/zh-TW overflow and primary-action matrix. Sequential screenshots are
 * captured when ISSUE_276_EVIDENCE=1; trace/video are enabled by that spec.
 *
 * A `webServer` boots `vite preview` from the production build so the browser
 * exercises the same bundle that ships (dist/) rather than the dev server.
 * `reuseExistingServer` is always false (Issue #188): the E2E must serve the
 * current worktree's fresh build and never silently reuse a stale `vite
 * preview` left running by another worktree on port 4173. A port-free guard
 * runs first so an occupied port fails fast with a recovery hint instead of a
 * misleading test run. In CI, the E2E job builds the bundle with `vite build`
 * before running (Issue #137 — the TypeScript typecheck stays owned by Quality
 * Gates).
 */
import { defineConfig } from '@playwright/test';

export default defineConfig({
  testDir: './e2e',
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    viewport: { width: 375, height: 812 },
    locale: 'ja-JP',
    trace: 'retain-on-failure',
  },
  webServer: {
    command:
      'node scripts/assert-preview-port-free.mjs 4173 && pnpm preview --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
