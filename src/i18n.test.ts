import { describe, expect, it } from 'vitest';
import { resolveKey } from './i18n/fallback';
import { DEFAULT_LOCALE, strings, type LocaleKey } from './i18n/resources';
import { formatDate, formatNumber } from './i18n-format';

describe('i18n fallback (#12)', () => {
  it('resolves a key present in the active locale', () => {
    expect(resolveKey(strings, 'ja', 'appName')).toBe('東京もぐもぐ');
    expect(resolveKey(strings, 'en', 'appName')).toBe('Tokyo Mogu Mogu');
    expect(resolveKey(strings, 'zh-TW', 'appName')).toBe('東京もぐもぐ');
  });

  it('resolves a key from the other locale when the active one lacks it', () => {
    // Simulate a stale bundle missing `appTagline` in ja.
    const staleJa: Partial<Record<LocaleKey, string>> = { ...strings.ja };
    delete staleJa.appTagline;
    const bundles = { ...strings, ja: staleJa };

    expect(resolveKey(bundles, 'ja', 'appTagline')).toBe(strings.en.appTagline);
  });

  it('falls back to a placeholder when the key is missing everywhere', () => {
    const empty = { ja: {}, en: {}, 'zh-TW': {} };
    expect(resolveKey(empty, 'ja', 'appName')).toBe('missing:appName');
    expect(resolveKey(empty, 'en', 'appName')).toBe('missing:appName');
    expect(resolveKey(empty, 'zh-TW', 'appName')).toBe('missing:appName');
  });

  it('falls back from zh-TW to en for an untranslated key', () => {
    // Simulate a zh-TW bundle that is missing `s0Cta`.
    const staleZh: Partial<Record<LocaleKey, string>> = { ...strings['zh-TW'] };
    delete staleZh.s0Cta;
    const bundles = { ...strings, 'zh-TW': staleZh };
    expect(resolveKey(bundles, 'zh-TW', 's0Cta')).toBe(strings.en.s0Cta);
  });

  it('never returns undefined for any key in every locale', () => {
    const keys = Object.keys(strings.ja) as Array<keyof typeof strings.ja>;
    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      for (const key of keys) {
        const value = resolveKey(strings, locale, key);
        expect(value).toBeTypeOf('string');
        expect(value.length).toBeGreaterThan(0);
      }
    }
  });

  it('keeps all locale blocks structurally equivalent', () => {
    const jaKeys = Object.keys(strings.ja).sort();
    expect(jaKeys).toEqual(Object.keys(strings.en).sort());
    expect(jaKeys).toEqual(Object.keys(strings['zh-TW']).sort());
  });

  it('ships real zh-TW translations for the S0-S8 journey chrome', () => {
    // Spot-check that zh-TW is not just an empty placeholder block.
    expect(strings['zh-TW'].s0Cta).toBe('開始飲食文化之旅');
    expect(strings['zh-TW'].s8PageTitle).toBe('我的路線');
    expect(strings['zh-TW'].s3PrimaryCta).toContain('東京山葵');
    expect(strings['zh-TW'].s1Skip).toBe('沒有飲食限制');
  });

  it('frames the header tagline around the #41 journey, not collection (#66)', () => {
    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      const tagline = strings[locale].appTagline;
      expect(tagline.length).toBeGreaterThan(0);
      // Legacy collection framing must not leak into the header tagline.
      expect(tagline.toLowerCase()).not.toMatch(/collect|集め|集齊|図鑑|圖鑑/);
      // New journey nav keys exist in every locale.
      expect(strings[locale].navDiagnosis.length).toBeGreaterThan(0);
      expect(strings[locale].navSupport.length).toBeGreaterThan(0);
    }
    // The journey framing (know / visit / support) is expressed in each locale.
    expect(strings.ja.appTagline).toMatch(/知って/);
    expect(strings.en.appTagline.toLowerCase()).toMatch(/know/);
    expect(strings['zh-TW'].appTagline).toMatch(/認識/);
  });

  it('uses neutral demo copy for the reset confirmation in every locale (#66)', () => {
    for (const locale of ['ja', 'en', 'zh-TW'] as const) {
      expect(strings[locale].resetConfirm.length).toBeGreaterThan(0);
      // No collection-specific framing in the reset prompt.
      expect(strings[locale].resetConfirm.toLowerCase()).not.toMatch(/collect|収集|收藏/);
    }
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
