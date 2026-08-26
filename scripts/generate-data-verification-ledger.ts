import { existsSync, readFileSync, writeFileSync } from 'node:fs';
import { resolve } from 'node:path';
import { createServer } from 'vite';

function argument(name: string): string | undefined {
  const index = process.argv.indexOf(name);
  return index >= 0 ? process.argv[index + 1] : undefined;
}

async function generateLedger(): Promise<string> {
  // The current presentation records import bundled image assets. Loading the
  // adapter through the repository's existing Vite runtime lets the CLI read
  // those exact records without copying facts or parsing source code.
  const server = await createServer({
    configFile: false,
    appType: 'custom',
    logLevel: 'silent',
    optimizeDeps: { noDiscovery: true },
    server: { middlewareMode: true },
  });

  try {
    const current = await server.ssrLoadModule(
      '/src/lib/current-data-verification-ledger.ts',
    ) as {
      currentDataVerificationClaims: () => unknown[];
    };
    const ledger = await server.ssrLoadModule(
      '/src/lib/data-verification-ledger.ts',
    ) as {
      renderDataVerificationLedger: (claims: unknown[]) => string;
    };
    return ledger.renderDataVerificationLedger(current.currentDataVerificationClaims());
  } finally {
    await server.close();
  }
}

const outputPath = resolve(
  process.cwd(),
  argument('--output') ?? 'docs/data-verification-ledger.md',
);
const generated = await generateLedger();

if (process.argv.includes('--check')) {
  const committed = existsSync(outputPath) ? readFileSync(outputPath, 'utf8') : undefined;
  if (committed !== generated) {
    console.error('Data Verification Ledger is stale. Run `pnpm data:ledger`.');
    process.exitCode = 1;
  } else {
    console.log('Data Verification Ledger is current.');
  }
} else {
  writeFileSync(outputPath, generated, 'utf8');
  console.log(`Wrote ${outputPath}`);
}
