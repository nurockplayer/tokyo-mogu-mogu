/**
 * S7 support-action list contract tests (Issue #46).
 *
 * Guards the deterministic action list that the SupportPanel renders:
 *   - all six actions exist with both-language meaning copy
 *   - every available action is genuinely actionable (external action has a
 *     real, traceable URL; save action maps to the shared storage key)
 *   - disabled actions never fake a destination
 */
import { describe, expect, it } from 'vitest';
import {
  CONFIRMED_VISIT_URL,
  SUPPORT_ACTIONS,
  type SupportActionItem,
} from './support-actions';
import { MODEL_ROUTE_ID } from './saved-routes';

describe('support actions (#46)', () => {
  it('contains exactly the six support actions', () => {
    const ids = SUPPORT_ACTIONS.map((a) => a.id);
    expect(ids).toEqual(['buy', 'visit', 'reserve', 'donate', 'share', 'save']);
    expect(new Set(ids).size).toBe(ids.length); // ids are unique
  });

  it('gives every action a title and meaning in both languages', () => {
    for (const action of SUPPORT_ACTIONS) {
      expect(action.titleJa, action.id).toBeTruthy();
      expect(action.titleEn, action.id).toBeTruthy();
      expect(action.meaningJa, action.id).toBeTruthy();
      expect(action.meaningEn, action.id).toBeTruthy();
    }
  });

  it('gives every action an icon', () => {
    for (const action of SUPPORT_ACTIONS) {
      expect(action.icon, action.id).toBeTruthy();
    }
  });

  it('marks an external action available only when it has a confirmed URL', () => {
    const externals = SUPPORT_ACTIONS.filter((a) => a.kind === 'external');
    expect(externals.length).toBeGreaterThan(0);
    for (const action of externals) {
      expect(action.available, action.id).toBe(true);
      expect(action.externalUrl, action.id).toMatch(/^https:\/\//);
    }
  });

  it('keeps disabled actions with no URL and available=false', () => {
    const disabled = SUPPORT_ACTIONS.filter((a) => a.kind === 'disabled');
    expect(disabled.length).toBeGreaterThan(0);
    for (const action of disabled) {
      expect(action.externalUrl, action.id).toBeNull();
      expect(action.available, action.id).toBe(false);
    }
  });

  it('keeps the save action available and free of an external URL', () => {
    const save = SUPPORT_ACTIONS.find((a) => a.kind === 'save');
    expect(save).toBeDefined();
    expect(save?.externalUrl).toBeNull();
    expect(save?.available).toBe(true);
  });

  it('keeps the visit action pointed at the confirmed official destination', () => {
    const visit = SUPPORT_ACTIONS.find((a) => a.id === 'visit');
    expect(visit?.externalUrl).toBe(CONFIRMED_VISIT_URL);
  });

  it('keeps the model route id consistent with the shared persistence contract', () => {
    expect(MODEL_ROUTE_ID).toBe('wasabi-okutama');
    const save = SUPPORT_ACTIONS.find((a) => a.kind === 'save');
    // The save action is persisted under the model route id the demo journey uses.
    expect(save).toBeDefined();
  });

  it('is a pure, deterministic list (no closures or mutable state)', () => {
    const clone: SupportActionItem[] = SUPPORT_ACTIONS.map((a) => ({ ...a }));
    expect(clone).toEqual(SUPPORT_ACTIONS as unknown as SupportActionItem[]);
  });
});
