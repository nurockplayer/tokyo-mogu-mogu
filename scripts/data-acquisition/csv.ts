/**
 * Small shared decoding / CSV helpers for the acquisition layer (#175).
 *
 * Encoding churn (CP932 vs UTF-8) recurs across official Japanese open-data
 * artifacts, so a shared decoder avoids repeating the same conversion per
 * adapter. These are pure functions; nothing here performs I/O.
 */

/**
 * Decode raw bytes as text using the given encoding.
 *
 * Supports any label the platform TextDecoder accepts. `cp932` is mapped to
 * the WHATWG `shift_jis` label (the standard decoding of Shift-JIS / CP932).
 * Unknown encodings throw — a malformed encoding must fail loudly rather than
 * produce corrupt rows.
 */
export function decodeText(buffer: ArrayBuffer, encoding = 'utf-8'): string {
  const label = encoding === 'cp932' ? 'shift_jis' : encoding;
  return new TextDecoder(label).decode(buffer);
}

/**
 * Minimal RFC-4180-ish CSV splitter (handles quoted fields, `""` escapes,
 * CRLF / LF). Rows that are entirely empty are dropped.
 */
export function splitCsv(text: string): string[][] {
  const rows: string[][] = [];
  let row: string[] = [];
  let field = '';
  let inQuotes = false;
  for (let i = 0; i < text.length; i++) {
    const c = text[i];
    if (inQuotes) {
      if (c === '"') {
        if (text[i + 1] === '"') {
          field += '"';
          i++;
        } else {
          inQuotes = false;
        }
      } else {
        field += c;
      }
    } else if (c === '"') {
      inQuotes = true;
    } else if (c === ',') {
      row.push(field);
      field = '';
    } else if (c === '\n' || c === '\r') {
      if (c === '\r' && text[i + 1] === '\n') i++;
      row.push(field);
      field = '';
      rows.push(row);
      row = [];
    } else {
      field += c;
    }
  }
  if (field !== '' || row.length > 0) {
    row.push(field);
    rows.push(row);
  }
  return rows.filter((r) => r.some((cell) => cell.trim() !== ''));
}

/**
 * Column index lookup that throws with a clear message when a required
 * column is missing — a source schema change must fail loudly instead of
 * silently producing undefined fields.
 */
export function indexRequiredColumns(header: string[], names: string[]): Record<string, number> {
  const idx: Record<string, number> = {};
  for (const name of names) {
    const i = header.indexOf(name);
    if (i === -1) throw new Error(`Missing expected column: ${name}`);
    idx[name] = i;
  }
  return idx;
}
