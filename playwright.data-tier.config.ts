import { defineConfig } from '@playwright/test';
import canonicalConfig from './playwright.config';

export default defineConfig({
  ...canonicalConfig,
  testMatch: 'data-tier.spec.ts',
});
