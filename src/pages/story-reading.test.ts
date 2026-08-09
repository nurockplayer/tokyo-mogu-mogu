import { describe, expect, it } from 'vitest';
import { readingMinutes, resolveBackTo } from './story-reading';

describe('readingMinutes (#44)', () => {
  it('never returns less than 1 minute', () => {
    expect(readingMinutes('', 'ja')).toBe(1);
    expect(readingMinutes('', 'en')).toBe(1);
    expect(readingMinutes('hello', 'en')).toBe(1);
  });

  it('estimates Japanese by character count (~400 chars/min)', () => {
    expect(readingMinutes('あ'.repeat(400), 'ja')).toBe(1);
    expect(readingMinutes('あ'.repeat(401), 'ja')).toBe(2);
    expect(readingMinutes('あ'.repeat(799), 'ja')).toBe(2);
  });

  it('estimates English by word count (~200 words/min)', () => {
    const twoHundred = 'word '.repeat(200).trim();
    expect(readingMinutes(twoHundred, 'en')).toBe(1);
    const twoHundredOne = 'word '.repeat(201).trim();
    expect(readingMinutes(twoHundredOne, 'en')).toBe(2);
  });
});

describe('resolveBackTo (#79)', () => {
  it('uses the caller-supplied relative path when present', () => {
    expect(resolveBackTo('/discover', '/diagnosis/result')).toBe('/discover');
  });

  it('keeps the default Result back target when no query is given', () => {
    expect(resolveBackTo(null, '/diagnosis/result')).toBe('/diagnosis/result');
  });

  it('rejects a non-relative caller value (no SPA-external navigation)', () => {
    expect(resolveBackTo('https://example.com', '/diagnosis/result')).toBe('/diagnosis/result');
    expect(resolveBackTo('discover', '/diagnosis/result')).toBe('/diagnosis/result');
  });
});
