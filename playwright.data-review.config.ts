import { defineConfig } from '@playwright/test';

const previewPort = process.env.PLAYWRIGHT_PORT ?? '4174';
const previewUrl = `http://127.0.0.1:${previewPort}`;

export default defineConfig({
  testDir: './e2e',
  testMatch: 'data-review-board.spec.ts',
  timeout: 30_000,
  fullyParallel: false,
  workers: 1,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: previewUrl,
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
