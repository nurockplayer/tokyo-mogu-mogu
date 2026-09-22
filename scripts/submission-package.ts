import { rmSync } from 'node:fs';

/** A failed attempt must never leave a package that looks approved. */
export async function buildSubmissionPackage(
  outputDirectory: string,
  checkRights: () => Promise<void> | void,
  build: () => Promise<void> | void,
): Promise<void> {
  rmSync(outputDirectory, { recursive: true, force: true });
  try {
    await checkRights();
    await build();
  } catch (error) {
    rmSync(outputDirectory, { recursive: true, force: true });
    throw error;
  }
}
