/**
 * Focused, non-gating browser regressions for current Product behavior.
 *
 * The canonical merge/release gate remains playwright.config.ts and
 * e2e/current-mvp-smoke.spec.ts. This config exists only for targeted checks
 * that are too implementation-specific for the Golden Path.
 */
import { defineConfig } from '@playwright/test';
import canonicalConfig from './playwright.config';

export default defineConfig({
  ...canonicalConfig,
  testMatch: [
    'issue-283-visual-parity.spec.ts',
    'issue-296-my-badges.spec.ts',
    'issue-313-my-badges-layout.spec.ts',
    'issue-348-ome-sake.spec.ts',
    'issue-374-route-spacing.spec.ts',
  ],
});
