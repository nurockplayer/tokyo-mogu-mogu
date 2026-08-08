#!/usr/bin/env node
/**
 * Fetch the official 西東京バス GTFS-JP zip from the Public Transportation
 * Open Data Center (公共交通オープンデータセンター) and unzip it.
 *
 * Usage:
 *   node scripts/ingest-gtfs/fetch-gtfs.mjs --date 20260808 --out /tmp/ntbus-gtfs
 *
 * Environment: ODPT_ACCESS_TOKEN (required).
 * Built-ins only — no dependencies. See scripts/ingest-gtfs/README.md.
 */
import { mkdir, writeFile } from 'node:fs/promises';
import { join } from 'node:path';
import { createInflateRaw } from 'node:zlib';

const args = process.argv.slice(2);
const date = readArg(args, '--date');
const outDir = readArg(args, '--out') ?? './gtfs';
const token = process.env.ODPT_ACCESS_TOKEN;

if (!token) {
  console.error('ODPT_ACCESS_TOKEN is not set. Get one from https://developer.odpt.org/.');
  process.exit(1);
}

// The download endpoint needs an exact timetable date. Without one, discover
// the newest date by walking the dataset page -> resource pages, which carry
// the `date=YYYYMMDD` param in the download links.
let dateToUse = date;
if (!dateToUse) {
  console.log('No --date given; discovering the newest date from the catalog…');
  const catalog = await fetch('https://ckan.odpt.org/dataset/nishi_tokyo_bus_nt_bus').then((r) => r.text());
  const resourceUrls = [...catalog.matchAll(/\/dataset\/nishi_tokyo_bus_nt_bus\/resource\/[0-9a-f-]+/g)]
    .map((m) => `https://ckan.odpt.org${m[0]}`);
  const dates = [];
  for (const url of resourceUrls) {
    const html = await fetch(url).then((r) => r.text());
    for (const m of html.matchAll(/NTBus\.zip\?date=(\d{8})/g)) dates.push(m[1]);
  }
  if (dates.length === 0) {
    console.error('Could not discover a date from the catalog. Pass --date YYYYMMDD explicitly.');
    process.exit(1);
  }
  dateToUse = dates.sort().at(-1);
}

const url =
  `https://api.odpt.org/api/v4/files/odpt/NishiTokyoBus/NTBus.zip` +
  `?date=${dateToUse}&acl:consumerKey=${encodeURIComponent(token)}`;

console.log(`Downloading ${url.replace(token, '***')}`);
const res = await fetch(url);
if (!res.ok) {
  console.error(`Download failed: HTTP ${res.status} ${res.statusText}`);
  process.exit(1);
}
const buf = Buffer.from(await res.arrayBuffer());

await mkdir(outDir, { recursive: true });
const entries = await extractZip(buf, outDir);
console.log(`Wrote ${entries.length} file(s) to ${outDir}`);
for (const name of entries) console.log(`  ${name}`);
console.log(`Timetable date: ${dateToUse}`);
console.log(`Add --date ${dateToUse} to reproduce this exact snapshot.`);

function readArg(argv, flag) {
  const i = argv.indexOf(flag);
  return i >= 0 ? argv[i + 1] : undefined;
}

/** Minimal ZIP inflater: only supports the stored/deflated, no-encryption
 *  central-directory entries that standard GTFS zips use. */
async function extractZip(buf, outDir) {
  // Locate End of Central Directory (EOCD) signature.
  const eocdPos = buf.lastIndexOf(Buffer.from('PK\x05\x06'));
  if (eocdPos < 0) throw new Error('Not a ZIP file (no EOCD found).');
  const entryCount = buf.readUInt16LE(eocdPos + 10);
  const cdOffset = buf.readUInt32LE(eocdPos + 16);

  const files = [];
  let offset = cdOffset;
  for (let i = 0; i < entryCount; i++) {
    if (buf.readUInt32LE(offset) !== 0x02014b50) throw new Error('Bad central directory.');
    const method = buf.readUInt16LE(offset + 10);
    const compSize = buf.readUInt32LE(offset + 20);
    const nameLen = buf.readUInt16LE(offset + 28);
    const extraLen = buf.readUInt16LE(offset + 30);
    const commentLen = buf.readUInt16LE(offset + 32);
    const localOffset = buf.readUInt32LE(offset + 42);
    const name = buf.subarray(offset + 46, offset + 46 + nameLen).toString('utf8');

    const local = buf.readUInt32LE(localOffset);
    if (local !== 0x04034b50) throw new Error(`Bad local header for ${name}`);
    const dataStart = localOffset + 30 + buf.readUInt16LE(localOffset + 26) + buf.readUInt16LE(localOffset + 28);
    const raw = buf.subarray(dataStart, dataStart + compSize);

    let data;
    if (method === 0) {
      data = raw;
    } else if (method === 8) {
      data = await inflateRaw(raw);
    } else {
      throw new Error(`Unsupported ZIP compression method ${method} for ${name}`);
    }
    const outPath = join(outDir, name);
    await writeFile(outPath, data);
    files.push(name);
    offset += 46 + nameLen + extraLen + commentLen;
  }
  return files;
}

function inflateRaw(raw) {
  return new Promise((resolve, reject) => {
    const inflater = createInflateRaw();
    const chunks = [];
    inflater.on('data', (c) => chunks.push(c));
    inflater.on('end', () => resolve(Buffer.concat(chunks)));
    inflater.on('error', reject);
    inflater.write(raw);
    inflater.end();
  });
}
