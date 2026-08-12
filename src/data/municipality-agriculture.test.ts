/**
 * Municipality agriculture context tests (Issue #128).
 *
 * Guards the #128 acceptance criteria that the reusable municipality
 * agriculture context: keeps full provenance, never derives verified without
 * stakeholder confirmation, keeps suppressed values explicit, and exposes the
 * Okutama demo/evidence record safely.
 */
import { describe, expect, it } from 'vitest';
import { deriveVerificationStatus } from '../lib/verification';
import {
  getMunicipalityAgricultureById,
  MUNICIPALITY_AGRICULTURE_PROFILES,
  MUNICIPALITY_INDICATOR_KEYS,
  municipalityIndicatorValue,
  OKUTAMA_MUNICIPALITY_ID,
} from './municipality-agriculture';

describe('municipality agriculture context', () => {
  it('keeps municipality ids unique', () => {
    const ids = MUNICIPALITY_AGRICULTURE_PROFILES.map((p) => p.municipalityId);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('carries full traceable provenance on every profile', () => {
    for (const p of MUNICIPALITY_AGRICULTURE_PROFILES) {
      expect(p.origin).toBe('source');
      expect(p.source.sourceType).toBe('open_data');
      expect(p.source.retrievedAt).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      // Canonical municipality id is the 6-digit code including check digit;
      // the source-specific originalId is the census's 5-digit area code.
      expect(p.municipalityId).toMatch(/^\d{6}$/);
      expect(p.source.originalId).toMatch(/^\d{5}$/);
      expect(p.source.license).toBeTruthy();
      expect(p.source.url).toBeTruthy();
      expect(p.source.verificationStatus).toBe('needs_confirmation');
      expect(p.censusSurveyDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(p.censusYear).toBeGreaterThan(2000);
      expect(p.interpretationNoteJa.length).toBeGreaterThan(0);
      expect(p.interpretationNoteEn.length).toBeGreaterThan(0);
    }
  });

  it('uses the 6-digit canonical code and keeps the census 5-digit source code', () => {
    const okutama = getMunicipalityAgricultureById(OKUTAMA_MUNICIPALITY_ID)!;
    expect(OKUTAMA_MUNICIPALITY_ID).toBe('133086');
    expect(okutama.source.originalId).toBe('13308');
  });

  it('never derives verified without stakeholder confirmation', () => {
    for (const p of MUNICIPALITY_AGRICULTURE_PROFILES) {
      expect(deriveVerificationStatus(p.source, p.origin)).not.toBe('verified');
    }
  });

  it('exposes the verified Okutama agricultural entity count for the demo', () => {
    const okutama = getMunicipalityAgricultureById(OKUTAMA_MUNICIPALITY_ID);
    expect(okutama).toBeDefined();
    const entities = municipalityIndicatorValue(okutama!, MUNICIPALITY_INDICATOR_KEYS.agriculturalEntities);
    expect(entities).toBe(1);
  });

  it('keeps suppressed values explicit and never leaks them as numbers', () => {
    const okutama = getMunicipalityAgricultureById(OKUTAMA_MUNICIPALITY_ID)!;
    const land = okutama.indicators.find((i) => i.key === MUNICIPALITY_INDICATOR_KEYS.cultivatedLandHa)!;
    expect(land.suppressed).toBe(true);
    expect(land.value).toBeUndefined();
    // A suppressed indicator must not become a usable figure.
    expect(municipalityIndicatorValue(okutama, MUNICIPALITY_INDICATOR_KEYS.cultivatedLandHa)).toBeUndefined();
  });

  it('returns undefined for unknown municipalities (safe missing handling)', () => {
    expect(getMunicipalityAgricultureById('999999')).toBeUndefined();
  });
});
