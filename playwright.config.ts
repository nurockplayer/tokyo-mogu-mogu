/**
 * Playwright E2E configuration (Issue #120).
 *
 * One deterministic golden path through the hackathon demo, run in a real
 * browser at the mobile baseline viewport (375px). This is deliberately a
 * minimal single-flow release gate — no full E2E suite, no visual-regression
 * infrastructure, no locale matrix (ja is the blocking path; en / zh-TW stay
 * covered by #82's real-browser smoke / manual release gate).
 *
 * A `webServer` boots `vite preview` from the production build so the browser
 * exercises the same bundle that ships (dist/) rather than the dev server.
 * `reuseExistingServer` keeps local iteration fast; CI always builds first via
 * the `pnpm build` step in the workflow.
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
    command: 'pnpm preview --host 127.0.0.1 --port 4173 --strictPort',
    url: 'http://127.0.0.1:4173',
    reuseExistingServer: !process.env.CI,
    timeout: 30_000,
  },
});
