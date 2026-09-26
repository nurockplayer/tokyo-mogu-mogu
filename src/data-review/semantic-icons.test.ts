import { describe, expect, it } from 'vitest';
import type { LedgerVerification } from '../lib/data-verification-ledger';
import { DATA_REVIEW_STATUS_LABELS_JA, type HumanDataReviewContext } from '../lib/human-data-review-board';
import { boardFieldIconRole } from './semantic-icons';

function context(overrides: Partial<HumanDataReviewContext> = {}): HumanDataReviewContext {
  return {
    decisionItems: [],
    reviewFocus: [],
    productImpacts: [],
    affectedSurfaces: [],
    uncertainties: [],
    findings: [],
    ...overrides,
  };
}

describe('Human Data Review Board semantic icons', () => {
  it('maps common practical, source, and review fields to distinct roles', () => {
    expect(boardFieldIconRole('name')).toBe('identity');
    expect(boardFieldIconRole('address')).toBe('location');
    expect(boardFieldIconRole('hours')).toBe('schedule');
    expect(boardFieldIconRole('price_availability')).toBe('price');
    expect(boardFieldIconRole('official_current_url')).toBe('source');
    expect(boardFieldIconRole('schedule_url')).toBe('current-information');
    expect(boardFieldIconRole('unknown_field')).toBe('info');
    expect(boardFieldIconRole('constructor')).toBe('info');
    expect(boardFieldIconRole('__proto__')).toBe('info');
  });

  it('uses mobile-venue semantics from structured review context', () => {
    const decisionContext = context({
      decisionItems: [{
        id: 'mobile:no-fixed-storefront',
        kind: 'mobile_behavior',
        label: '営業形態',
        statusLabel: '固定地点として扱わない',
        reason: '移動型の営業形態です。',
        recommendationLabel: '表示制約',
        recommendation: '固定住所を示しません。',
        factFieldKeys: ['venue_model'],
        affectedSurfaces: ['Spot'],
      }],
    });
    const focusContext = context({
      reviewFocus: [{ id: 'mobile-venue-representation', label: '移動型の営業形態' }],
    });
    const impactContext = context({
      productImpacts: [{ id: 'no-fixed-location-behavior', label: '固定地点として扱わない' }],
    });
    const standardContext = context();

    expect(boardFieldIconRole('venue_model', decisionContext)).toBe('mobile-business');
    expect(boardFieldIconRole('venue_model', focusContext)).toBe('mobile-business');
    expect(boardFieldIconRole('venue_model', impactContext)).toBe('mobile-business');
    expect(boardFieldIconRole('venue_model', standardContext)).toBe('business');
    expect(boardFieldIconRole('phone', decisionContext)).toBe('contact');
  });

  it('keeps source, current-information, and verification roles separate', () => {
    expect(boardFieldIconRole('official_current_url')).toBe('source');
    expect(boardFieldIconRole('schedule_url')).toBe('current-information');
    expect(boardFieldIconRole('hours')).toBe('schedule');
  });

  it('preserves all six explicit textual verification statuses', () => {
    const statuses: readonly LedgerVerification[] = [
      'conflict', 'stale', 'needs_confirmation', 'unknown', 'demo', 'verified',
    ];
    const labels = statuses.map((status) => DATA_REVIEW_STATUS_LABELS_JA[status]);

    expect(labels).toEqual([
      '⚠️ 情報に矛盾あり',
      '🟠 情報が古いため再確認',
      '🟡 人の確認待ち',
      '❓ 根拠未登録・確認が必要',
      '🧪 デモ情報',
      '✅ 人による確認済み',
    ]);
    expect(new Set(labels).size).toBe(statuses.length);
  });
});
