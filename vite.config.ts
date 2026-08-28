/// <reference types="vitest/config" />
import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        app: 'index.html',
        dataReview: 'data-review/index.html',
      },
    },
  },
  test: {
    environment: 'node',
    globals: true,
    // Keep vitest unit/component scope away from node_modules and the Playwright
    // E2E specs in e2e/ (run by `pnpm test:e2e`, Issue #120).
    exclude: ['e2e/**', '**/node_modules/**', '**/dist/**'],
  },
});
