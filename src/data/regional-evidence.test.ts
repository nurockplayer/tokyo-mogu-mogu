import { describe, expect, it } from 'vitest';
import { resolveKey } from '../i18n/fallback';
import { strings, type Locale } from '../i18n/resources';
import {
  getVerifiedStoryRegionalEvidence,
  getStoryRegionalEvidence,
} from './regional-evidence';

describe('Story regional evidence (#264)', () => {
  it('associates Okutama with the source-backed 1.1% visit rate', () => {
    const evidence = getVerifiedStoryRegionalEvidence('wasabi-okutama');

    expect(evidence).toMatchObject({
      foodCultureId: 'wasabi-okutama',
      regionId: 'okutama',
      value: 1.1,
      unit: '%',
      sourceYear: 2025,
    });
    expect(evidence?.source.name).toContain('令和7年 国・地域別外国人旅行者行動特性調査');
    expect(evidence?.source.url).toBe(
      'https://www.sangyo-rodo.metro.tokyo.lg.jp/documents/d/sangyo-rodo/01_r7kekka',
    );
  });

  it('associates Ome / Mitake with the source-backed 0.8% visit rate', () => {
    const evidence = getVerifiedStoryRegionalEvidence('sake-ome');

    expect(evidence).toMatchObject({
      foodCultureId: 'sake-ome',
      regionId: 'ome',
      value: 0.8,
      unit: '%',
      sourceYear: 2025,
    });
    expect(evidence?.regionName).toBe('dataRegionalEvidenceOmeMitake');
  });

  it('does not attach Okutama evidence to another Story culture', () => {
    expect(getStoryRegionalEvidence('hachioji-ginger')).toBeUndefined();
    expect(getVerifiedStoryRegionalEvidence('unknown')).toBeUndefined();
  });

  it('keeps every evidence copy key available in ja, en, and zh-TW', () => {
    const locales: Locale[] = ['ja', 'en', 'zh-TW'];
    const evidence = getVerifiedStoryRegionalEvidence('sake-ome');

    expect(evidence).toBeDefined();
    for (const locale of locales) {
      expect(resolveKey(strings, locale, evidence!.regionName)).not.toMatch(/^missing:/);
      expect(resolveKey(strings, locale, evidence!.summary)).not.toMatch(/^missing:/);
      expect(resolveKey(strings, locale, evidence!.metricLabel)).not.toMatch(/^missing:/);
      expect(resolveKey(strings, locale, evidence!.context)).not.toMatch(/^missing:/);
    }
  });
});
