import { describe, expect, it } from 'vitest';
import { resolveKey } from '../i18n/fallback';
import { strings, type Locale } from '../i18n/resources';
import { deriveVerificationStatus, sourceDateLabel } from '../lib/verification';
import {
  getDisplayableStoryRegionalEvidence,
  getStoryRegionalEvidence,
  isStoryRegionalEvidenceDisplayable,
} from './regional-evidence';

describe('Story regional evidence (#264)', () => {
  it('associates Okutama with the source-backed 1.1% visit rate', () => {
    const evidence = getDisplayableStoryRegionalEvidence('wasabi-okutama');

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
    const evidence = getDisplayableStoryRegionalEvidence('sake-ome');

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
    expect(getDisplayableStoryRegionalEvidence('unknown')).toBeUndefined();
  });

  it('keeps official survey evidence unconfirmed until stakeholder confirmation', () => {
    const evidence = getStoryRegionalEvidence('wasabi-okutama');

    expect(evidence?.source).toMatchObject({
      sourceType: 'official_web',
      sourceUpdatedAt: '2026-06-30',
      retrievedAt: '2026-08-22',
      verificationStatus: 'needs_confirmation',
    });
    expect(evidence?.source.confirmedAt).toBeUndefined();
  });

  it('renders needs_confirmation evidence with a retrieval date, not a verified date', () => {
    const evidence = getDisplayableStoryRegionalEvidence('sake-ome');

    expect(evidence).toBeDefined();
    expect(deriveVerificationStatus(evidence!.source, 'source')).toBe('needs_confirmation');
    expect(sourceDateLabel(evidence!.source, 'source')).toEqual({
      label: 'detailRetrieved',
      date: '2026-08-22',
    });
  });

  it.each([
    ['demo', { sourceType: 'demo' as const }],
    ['conflict', { verificationStatus: 'conflict' as const }],
    ['stale', { verificationStatus: 'stale' as const }],
    [
      'missing provenance',
      {
        name: '',
        url: undefined,
        sourceDatasetId: undefined,
        sourceType: undefined,
        retrievedAt: undefined,
        lastVerified: undefined,
      },
    ],
  ])('does not display %s evidence', (_reason, sourcePatch) => {
    const evidence = getStoryRegionalEvidence('sake-ome')!;

    expect(
      isStoryRegionalEvidenceDisplayable({
        ...evidence,
        source: { ...evidence.source, ...sourcePatch },
      }),
    ).toBe(false);
  });

  it('keeps every evidence copy key available in ja, en, and zh-TW', () => {
    const locales: Locale[] = ['ja', 'en', 'zh-TW'];
    const evidence = getDisplayableStoryRegionalEvidence('sake-ome');

    expect(evidence).toBeDefined();
    for (const locale of locales) {
      expect(resolveKey(strings, locale, evidence!.regionName)).not.toMatch(/^missing:/);
      expect(resolveKey(strings, locale, evidence!.summary)).not.toMatch(/^missing:/);
      expect(resolveKey(strings, locale, evidence!.metricLabel)).not.toMatch(/^missing:/);
      expect(resolveKey(strings, locale, evidence!.context)).not.toMatch(/^missing:/);
    }
  });
});
