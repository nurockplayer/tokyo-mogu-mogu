/**
 * Deterministic generator for the Okutama tourism-facilities seed dataset (#16).
 *
 * Reads the committed source snapshots under `./snapshots/` and writes
 * `src/data/generated/okutama-places.ts` exporting `OKUTAMA_PLACES: Place[]`.
 *
 * Run from the repository root:
 *
 *   node scripts/ingest-okutama/generate.ts
 *
 * The output is deterministic: re-running with unchanged snapshots produces an
 * identical file (no duplicate ids, byte-stable output), so the ingestion is
 * idempotent and safe to re-run when a source updates.
 */
import { readFileSync, writeFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, join } from 'node:path';
import { buildOkutamaPlaces } from './normalize.ts';
import type { Place } from '../src/data/model.ts';

const HERE = dirname(fileURLToPath(import.meta.url));
const ROOT = join(HERE, '..', '..');

function readSnapshot(name: string): string {
  return readFileSync(join(HERE, 'snapshots', name), 'utf8');
}

/** The 施設関連情報 CSV is Shift-JIS encoded at source; decode to UTF-8. */
function readShiftJisSnapshot(name: string): string {
  const buf = readFileSync(join(HERE, 'snapshots', name));
  return new TextDecoder('shift_jis').decode(buf);
}

function buildSourceText(places: Place[]): string {
  const header = `/**
 * GENERATED FILE — do not edit by hand.
 *
 * Okutama tourism facilities seed dataset, generated deterministically by
 * \`scripts/ingest-okutama/generate.ts\` from the committed source snapshots
 * under \`scripts/ingest-okutama/snapshots/\` (#16).
 *
 * Provenance:
 * - Rows with origin 'source' come from the Tokyo Open Data Catalog (CC BY 4.0):
 *   Okutama スポーツ施設一覧 (t133086d3100000004) and 施設関連情報_奥多摩町
 *   (t000021d2000000151). Coordinates are authoritative from the source.
 * - Rows with origin 'demo' come from the 一般社団法人奥多摩観光協会 directory
 *   (https://www.okutama.gr.jp/site/), a de-facto 観光施設一覧 published as HTML
 *   with All Rights Reserved. Names/addresses are from the association site;
 *   coordinates are APPROXIMATE (district centroid) and must be re-verified in
 *   the field (Issue #10) before production use.
 *
 * Re-generate with: node scripts/ingest-okutama/generate.ts
 */
import type { Place } from '../model';

export const OKUTAMA_PLACES: Place[] = [`;

  const rows = places.map((p) => {
    const lines = [
      '  {',
      `    id: ${JSON.stringify(p.id)},`,
      `    nameJa: ${JSON.stringify(p.nameJa)},`,
      `    nameEn: ${JSON.stringify(p.nameEn)},`,
      `    address: ${JSON.stringify(p.address)},`,
      `    latitude: ${JSON.stringify(p.latitude)},`,
      `    longitude: ${JSON.stringify(p.longitude)},`,
      '    foodCultureIds: [],',
      `    type: '${p.type}',`,
      '    source: {',
      `      name: ${JSON.stringify(p.source.name)},`,
    ];
    if (p.source.url !== undefined) lines.push(`      url: ${JSON.stringify(p.source.url)},`);
    if (p.source.license !== undefined) lines.push(`      license: ${JSON.stringify(p.source.license)},`);
    if (p.source.sourceType !== undefined) lines.push(`      sourceType: '${p.source.sourceType}',`);
    if (p.source.sourceDatasetId !== undefined) {
      lines.push(`      sourceDatasetId: ${JSON.stringify(p.source.sourceDatasetId)},`);
    }
    if (p.source.retrievedAt !== undefined) {
      lines.push(`      retrievedAt: ${JSON.stringify(p.source.retrievedAt)},`);
    }
    if (p.source.originalId !== undefined) {
      lines.push(`      originalId: ${JSON.stringify(p.source.originalId)},`);
    }
    lines.push('    },', `    origin: '${p.origin}',`, '  },');
    return lines.join('\n');
  });

  return `${header}\n${rows.join('\n')}\n];\n`;
}

const places = buildOkutamaPlaces({
  sportsCsv: readSnapshot('okutama-sports-facilities.csv'),
  generalCsv: readShiftJisSnapshot('okutama-general-facilities.csv'),
  directoryJson: readSnapshot('okutama-tourism-directory.json'),
});

const outPath = join(ROOT, 'src', 'data', 'generated', 'okutama-places.ts');
writeFileSync(outPath, buildSourceText(places), 'utf8');

const ids = places.map((p) => p.id);
const unique = new Set(ids);
console.log(`Wrote ${outPath}`);
console.log(`Places: ${places.length} (${unique.size} unique ids)`);
console.log(
  `  source: ${places.filter((p) => p.origin === 'source').length}, demo: ${places.filter((p) => p.origin === 'demo').length}`,
);
if (unique.size !== ids.length) {
  console.error('Duplicate ids detected — aborting');
  process.exit(1);
}
