import { describe, expect, it } from 'vitest';
import { readingMinutes } from './story-reading';

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
