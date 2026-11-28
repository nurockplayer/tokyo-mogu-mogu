/// <reference types="vitest/config" />
import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import { checkJourneyAdmission } from './src/data/journey-admission';
import { JOURNEY_RECORDS } from './src/data/journey-records';
import { referenceAssetFiles, shellAssetIds, type ReferenceAssetId } from './src/features/netlify-parity/reference-asset-files';

function publicCatalog(): Plugin {
  const now = new Date();
  const records = JOURNEY_RECORDS.filter((record) => checkJourneyAdmission(record, now).admitted);
  const assets = new Set<ReferenceAssetId>(shellAssetIds);
  for (const { journey, spots, story, mediaRights } of records) {
    const presentation = JSON.stringify([journey, spots, story]);
    for (const [id, rights] of Object.entries(mediaRights ?? {})) {
      if (rights.sourceUrl && rights.license && presentation.includes(JSON.stringify(id))) {
        assets.add(id as ReferenceAssetId);
      }
    }
  }

  return {
    name: 'public-catalog',
    apply: 'build',
    enforce: 'pre',
    transform(_source, id) {
      if (id.endsWith('/src/data/journey-records/index.ts')) {
        return `export const JOURNEY_RECORDS = ${JSON.stringify(records)};`;
      }
      if (id.endsWith('/src/features/netlify-parity/factual-presentation.ts')) {
        return "export * from './public-factual-presentation';";
      }
      if (id.endsWith('/src/features/netlify-parity/reference-assets.ts')) {
        const imports = [...assets].map((key) => `import ${key} from ${JSON.stringify(referenceAssetFiles[key])};`);
        return `${imports.join('\n')}\nexport const referenceAssets = { ${[...assets].join(', ')} };`;
      }
    },
  };
}

// https://vite.dev/config/
export default defineConfig(({ command, mode }) => ({
  plugins: [react(), command === 'build' && mode !== 'data-review' && publicCatalog()],
  build: {
    outDir: mode === 'data-review' ? 'dist-data-review' : 'dist',
    rollupOptions: {
      input: {
        app: 'index.html',
        ...(mode === 'data-review' ? { dataReview: 'data-review/index.html' } : {}),
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
}));
