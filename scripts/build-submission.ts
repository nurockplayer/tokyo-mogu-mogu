import { spawnSync } from 'node:child_process';
import { buildSubmissionPackage } from './submission-package';

function run(args: string[]): void {
  const result = spawnSync(process.execPath, args, { stdio: 'inherit' });
  if (result.error) throw result.error;
  if (result.status !== 0) throw new Error(`Submission command failed (${result.status ?? result.signal}).`);
}

try {
  await buildSubmissionPackage(
    'dist-submission',
    () => run(['--import', 'tsx', 'scripts/check-submission-rights.ts']),
    () => run(['node_modules/vite/bin/vite.js', 'build', '--outDir', 'dist-submission']),
  );
} catch (error) {
  console.error(error instanceof Error ? error.message : error);
  process.exitCode = 1;
}
