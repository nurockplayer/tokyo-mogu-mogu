import { describe, expect, it } from 'vitest';
import { decodeText, indexRequiredColumns, splitCsv } from './csv.ts';

describe('splitCsv', () => {
  it('parses simple fields and rows', () => {
    expect(splitCsv('a,b,c\nd,e,f\n')).toEqual([
      ['a', 'b', 'c'],
      ['d', 'e', 'f'],
    ]);
  });

  it('handles quoted fields containing commas and escaped quotes', () => {
    expect(splitCsv('a,"b,c","say ""hi"""\n')).toEqual([['a', 'b,c', 'say "hi"']]);
  });

  it('handles CRLF line endings', () => {
    expect(splitCsv('a,b\r\nc,d\r\n')).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });

  it('drops rows that are entirely empty', () => {
    expect(splitCsv('a,b\n\nc,d\n')).toEqual([
      ['a', 'b'],
      ['c', 'd'],
    ]);
  });
});

describe('decodeText', () => {
  it('decodes utf-8 by default', () => {
    const bytes = new TextEncoder().encode('東京');
    expect(decodeText(bytes.buffer)).toBe('東京');
  });

  it('decodes CP932 bytes via the shift_jis label', () => {
    // CP932 bytes for 東京都教育庁 (encoded via Python `str.encode('cp932')`).
    const cp932 = new Uint8Array([0x93, 0x8c, 0x8b, 0x9e, 0x93, 0x73, 0x8b, 0xb3, 0x88, 0xe7, 0x92, 0xa1]);
    expect(decodeText(cp932.buffer, 'cp932')).toBe('東京都教育庁');
  });

  it('throws loudly for an unknown encoding instead of producing corrupt text', () => {
    expect(() => decodeText(new ArrayBuffer(0), 'not-an-encoding')).toThrow();
  });
});

describe('indexRequiredColumns', () => {
  it('returns column indexes for present columns', () => {
    expect(indexRequiredColumns(['名称', '文化財分類'], ['名称'])).toEqual({ 名称: 0 });
  });

  it('throws a clear error when a required column is missing', () => {
    expect(() => indexRequiredColumns(['名称'], ['文化財分類'])).toThrow('Missing expected column: 文化財分類');
  });
});
