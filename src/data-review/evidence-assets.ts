const assets = import.meta.glob('../../docs/data-evidence/**/*.{png,webp}', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

const assetsByRepositoryPath = new Map(
  Object.entries(assets).map(([modulePath, assetUrl]) => [
    modulePath.replace(/^\.\.\/\.\.\//, ''),
    assetUrl,
  ]),
);

/** Resolve an existing evidence-manifest path to its Vite-built asset URL. */
export function dataReviewEvidenceAssetUrl(repositoryPath: string): string {
  const assetUrl = assetsByRepositoryPath.get(repositoryPath);
  if (!assetUrl) {
    throw new Error(`Data Review Board evidence asset is not bundled: ${repositoryPath}`);
  }
  return assetUrl;
}
