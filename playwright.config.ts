/**
 * Current Figma-complete MVP smoke configuration.
 *
 * Product behavior comes from live KiKi Figma and current merged main. This
 * suite validates that behavior at the 375px Japanese baseline; it does not
 * define or preserve historical choreography.
 */
import { defineConfig } from '@playwright/test';

const previewPort = process.env.PLAYWRIGHT_PORT ?? '4173';
const previewUrl = `http://127.0.0.1:${previewPort}`;

export default defineConfig({
  testDir: './e2e',
  testMatch: 'current-mvp-smoke.spec.ts',
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: previewUrl,
    viewport: { width: 375, height: 812 },
    locale: 'ja-JP',
    trace: 'retain-on-failure',
  },
  webServer: {
    command:
      `node scripts/assert-preview-port-free.mjs ${previewPort} && pnpm preview --host 127.0.0.1 --port ${previewPort} --strictPort`,
    url: previewUrl,
    reuseExistingServer: false,
    timeout: 30_000,
  },
});
