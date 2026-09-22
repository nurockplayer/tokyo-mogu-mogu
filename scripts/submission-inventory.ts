import { readdirSync, writeFileSync } from 'node:fs';
import { extname, join } from 'node:path';

const extensions = new Set(['.png', '.jpg', '.jpeg', '.webp', '.svg', '.gif', '.mp4', '.webm', '.mov', '.mp3', '.wav', '.pdf', '.pptx', '.docx']);
export function discoverSubmissionAssets(root = process.cwd()): string[] {
  function walk(relative: string): string[] {
    let entries;
    try { entries = readdirSync(join(root, relative), { withFileTypes: true }); }
    catch (error) {
      if ((error as NodeJS.ErrnoException).code === 'ENOENT') return [];
      throw error;
    }
    return entries.flatMap((entry) => {
      const path = `${relative}/${entry.name}`;
      if (entry.isDirectory()) return walk(path);
      return entry.isFile() && extensions.has(extname(path).toLowerCase()) ? [path] : [];
    });
  }
  return ['src/assets', 'public', 'docs'].flatMap(walk).sort();
}

if (process.argv.includes('--write')) {
  writeFileSync('src/data/submission-asset-paths.json', `${JSON.stringify(discoverSubmissionAssets(), null, 2)}\n`);
}
