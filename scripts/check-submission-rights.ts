import { FINAL_PRESENTATION_REVIEW } from '../src/data/submission-rights';
import { buildSubmissionAssetRightsInventory, summarizeSubmissionAssetRights } from '../src/lib/submission-rights';
import { discoverSubmissionAssets } from './submission-inventory';

const inventory = buildSubmissionAssetRightsInventory();
const actualPaths = discoverSubmissionAssets();
if (JSON.stringify(inventory.map((asset) => asset.path).sort()) !== JSON.stringify(actualPaths)) {
  console.error('Asset inventory is out of date. Run pnpm submission:inventory and review the new assets.');
  process.exitCode = 1;
}
const summary = summarizeSubmissionAssetRights(inventory);
console.log(JSON.stringify({ ...summary, finalArtifacts: FINAL_PRESENTATION_REVIEW }, null, 2));
if (summary.submissionBlockedPaths.length || summary.publicDemoBlockedPaths.length
  || FINAL_PRESENTATION_REVIEW.some((artifact) => artifact.status !== 'ready')) {
  console.error('Submission/public presentation is NOT cleared. Record permissions or exclude/replace affected media and review the final artifacts.');
  process.exitCode = 1;
}
