/**
 * S7 support-action boundary tests (Issue #46, #68, #177).
 *
 * The shared default must be safe for every non-pilot journey. The Okutama ×
 * Wasabi override is selected only by its explicit route id, so a new or
 * unknown slice cannot inherit Wasabi copy or the Okutama tourism URL.
 */
import { describe, expect, it } from 'vitest';
import {
  CONFIRMED_VISIT_URL,
  SUPPORT_ACTIONS,
  actionMeaning,
  actionTitle,
  supportActionsForJourney,
  type SupportActionItem,
} from './support-actions';
import { MODEL_ROUTE_ID } from './saved-routes';

const OME_ROUTE_ID = 'ome-sawai-sake-journey';
const FORBIDDEN_GENERIC_TERMS = ['わさび', 'wasabi', '山葵', '奥多摩', 'Okutama'];

function combinedCopy(actions: readonly SupportActionItem[]): string {
  return actions
    .flatMap((action) => [
      action.titleJa,
      action.titleEn,
      action.titleZh,
      action.meaningJa,
      action.meaningEn,
      action.meaningZh,
      action.externalUrl ?? '',
    ])
    .join('\n');
}

describe('support actions (#46 / #177)', () => {
  it('contains exactly the six support actions in the safe generic default', () => {
    const ids = SUPPORT_ACTIONS.map((a) => a.id);
    expect(ids).toEqual(['buy', 'visit', 'reserve', 'donate', 'share', 'save']);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every generic action complete ja/en/zh-TW copy', () => {
    for (const action of SUPPORT_ACTIONS) {
      expect(action.titleJa, action.id).toBeTruthy();
      expect(action.titleEn, action.id).toBeTruthy();
      expect(action.titleZh, action.id).toBeTruthy();
      expect(action.meaningJa, action.id).toBeTruthy();
      expect(action.meaningEn, action.id).toBeTruthy();
      expect(action.meaningZh, action.id).toBeTruthy();

      for (const locale of ['ja', 'en', 'zh-TW'] as const) {
        expect(actionTitle(action, locale), `${action.id} ${locale} title`).toBeTruthy();
        expect(actionMeaning(action, locale), `${action.id} ${locale} meaning`).toBeTruthy();
      }
    }
  });

  it('does not let zh-TW generic copy fall back to English', () => {
    for (const action of SUPPORT_ACTIONS) {
      expect(actionTitle(action, 'zh-TW'), action.id).not.toBe(action.titleEn);
      expect(actionMeaning(action, 'zh-TW'), action.id).not.toBe(action.meaningEn);
    }
  });

  it('keeps the safe default free of Wasabi / Okutama semantics and destinations', () => {
    const copy = combinedCopy(SUPPORT_ACTIONS);
    for (const forbidden of FORBIDDEN_GENERIC_TERMS) {
      expect(copy.toLowerCase()).not.toContain(forbidden.toLowerCase());
    }
    expect(copy).not.toContain(CONFIRMED_VISIT_URL);
  });

  it('uses the safe generic default for Ome/Sawai and unknown journeys', () => {
    expect(supportActionsForJourney(OME_ROUTE_ID)).toBe(SUPPORT_ACTIONS);
    expect(supportActionsForJourney('future-region-food-journey')).toBe(SUPPORT_ACTIONS);
    expect(supportActionsForJourney()).toBe(SUPPORT_ACTIONS);
  });

  it('does not give Ome/Sawai any external action without a verified destination', () => {
    const actions = supportActionsForJourney(OME_ROUTE_ID);
    expect(actions.some((action) => action.kind === 'external')).toBe(false);
    expect(actions.every((action) => action.externalUrl === null)).toBe(true);
  });

  it('keeps the save action available in the generic fallback without an external URL', () => {
    const save = SUPPORT_ACTIONS.find((a) => a.kind === 'save');
    expect(save).toBeDefined();
    expect(save?.externalUrl).toBeNull();
    expect(save?.available).toBe(true);
  });

  it('keeps unsupported generic actions disabled without fake destinations', () => {
    const disabled = SUPPORT_ACTIONS.filter((a) => a.kind === 'disabled');
    expect(disabled.length).toBeGreaterThan(0);
    for (const action of disabled) {
      expect(action.externalUrl, action.id).toBeNull();
      expect(action.available, action.id).toBe(false);
    }
  });

  it('preserves the explicit Okutama × Wasabi pilot override', () => {
    const actions = supportActionsForJourney(MODEL_ROUTE_ID);
    expect(MODEL_ROUTE_ID).toBe('okutama-wasabi-journey');
    expect(actions).not.toBe(SUPPORT_ACTIONS);

    const visit = actions.find((a) => a.id === 'visit');
    const buy = actions.find((a) => a.id === 'buy');
    expect(visit?.kind).toBe('external');
    expect(visit?.available).toBe(true);
    expect(visit?.externalUrl).toBe(CONFIRMED_VISIT_URL);
    expect(buy?.meaningJa).toContain('わさび');
    expect(buy?.meaningEn.toLowerCase()).toContain('wasabi');
    expect(buy?.meaningZh).toContain('山葵');
  });

  it('returns stable action-list instances on repeated resolution', () => {
    expect(supportActionsForJourney(OME_ROUTE_ID)).toBe(supportActionsForJourney(OME_ROUTE_ID));
    expect(supportActionsForJourney(MODEL_ROUTE_ID)).toBe(
      supportActionsForJourney(MODEL_ROUTE_ID),
    );
  });
});
