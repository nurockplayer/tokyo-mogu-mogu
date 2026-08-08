import { describe, expect, it } from 'vitest';
import { resolveKey } from './i18n/fallback';
import { DEFAULT_LOCALE, strings, type LocaleKey } from './i18n/resources';
import { formatDate, formatNumber } from './i18n-format';

describe('i18n fallback (#12)', () => {
  it('resolves a key present in the active locale', () => {
    expect(resolveKey(strings, 'ja', 'appName')).toBe('東京もぐもぐ');
    expect(resolveKey(strings, 'en', 'appName')).toBe('Tokyo Mogu Mogu');
  });

  it('resolves a key from the other locale when the active one lacks it', () => {
    // Simulate a stale bundle missing `appTagline` in ja.
    const staleJa: Partial<Record<LocaleKey, string>> = { ...strings.ja };
    delete staleJa.appTagline;
    const bundles = { ...strings, ja: staleJa };

    expect(resolveKey(bundles, 'ja', 'appTagline')).toBe(strings.en.appTagline);
  });

  it('falls back to a placeholder when the key is missing everywhere', () => {
    const empty = { ja: {}, en: {} };
    expect(resolveKey(empty, 'ja', 'appName')).toBe('missing:appName');
    expect(resolveKey(empty, 'en', 'appName')).toBe('missing:appName');
  });

  it('never returns undefined for any key in either locale', () => {
    const keys = Object.keys(strings.ja) as Array<keyof typeof strings.ja>;
    for (const locale of ['ja', 'en'] as const) {
      for (const key of keys) {
        const value = resolveKey(strings, locale, key);
        expect(value).toBeTypeOf('string');
        expect(value.length).toBeGreaterThan(0);
      }
    }
  });

  it('keeps the two locale blocks structurally equivalent', () => {
    expect(Object.keys(strings.ja).sort()).toEqual(Object.keys(strings.en).sort());
  });

  it('exports a defined default locale', () => {
    expect(DEFAULT_LOCALE).toBe('ja');
  });
});

describe('formatDate / formatNumber (#12)', () => {
  it('formats a date-only ISO string for ja', () => {
    expect(formatDate('2026-08-08', 'ja')).toMatch(/2026年/);
    expect(formatDate('2026-08-08', 'ja')).toContain('8月');
    expect(formatDate('2026-08-08', 'ja')).toContain('8日');
  });

  it('formats a date-only ISO string for en', () => {
    const en = formatDate('2026-08-08', 'en');
    expect(en).toContain('2026');
    expect(en).toContain('Aug');
  });

  it('formats a Date object without timezone drift for date-only values', () => {
    const d = new Date('2026-08-08T00:00:00.000Z');
    expect(formatDate(d, 'ja')).toContain('8月');
  });

  it('returns an empty string for unparseable input', () => {
    expect(formatDate('not-a-date', 'ja')).toBe('');
    expect(formatDate(new Date('invalid'), 'en')).toBe('');
  });

  it('formats numbers with locale grouping for ja and en', () => {
    expect(formatNumber(1234567, 'ja')).toBe('1,234,567');
    expect(formatNumber(1234567, 'en')).toBe('1,234,567');
  });

  it('formats decimals with the locale separator', () => {
    expect(formatNumber(1234.5, 'en')).toBe('1,234.5');
  });
});
