/**
 * Frozen-journey copy honesty regression (Issue #127).
 *
 * Guards the principle "real entity exists != verified experience exists":
 * the route/Spot copy for the frozen wasabi journey must describe what the
 * committed source evidence actually establishes (entity, address, category,
 * retail function) — never an unverified visit/experience/menu claim.
 *
 * Checked against the rendered i18n bundle (what users actually see) and the
 * canonical seed copy in SPOT_DETAILS.
 */
import { describe, expect, it } from 'vitest';
import { getRouteById, getPlaceById, getRelatedFoodCultures, getRouteIdForPlace, PILOT_JOURNEY } from './index';
import { SPOT_DETAILS } from './seed-routes';
import { strings } from '../i18n/resources';
import { resolveKey } from '../i18n/fallback';
import { stepRoleKey, spotRoleKey } from '../i18n/data-content';

const ROUTE = getRouteById(PILOT_JOURNEY.routeId)!;
const DURATIONS = ['half-day', '1-day'] as const;

/** The bundle string rendered for a route step role (ja). */
function stepJa(placeId: string, duration: (typeof DURATIONS)[number]): string {
  return resolveKey(strings, 'ja', stepRoleKey(ROUTE.id, placeId, duration)!);
}

/** The bundle string rendered for a spot role (ja). */
function spotJa(placeId: string): string {
  return resolveKey(strings, 'ja', spotRoleKey(placeId)!);
}

describe('frozen-journey copy honesty (Issue #127)', () => {
  it('does not claim visitors can tour 千島わさび園 or see wasabi paddies', () => {
    // The committed snapshot only establishes the entity, address, and
    // wasabi/products listing — NOT public farm access or a visit experience.
    for (const duration of DURATIONS) {
      expect(stepJa('chishima-wasabi-garden', duration)).not.toMatch(/見学|栽培現場/);
    }
    expect(spotJa('chishima-wasabi-garden')).not.toMatch(/見学|栽培現場|自分の目で/);
  });

  it('does not claim handmade soba or freshly grated wasabi at 一心亭', () => {
    // The committed snapshot lists 一心亭 as a soba restaurant only — no menu
    // or dish specifics are sourced.
    for (const duration of DURATIONS) {
      expect(stepJa('soba-isshintei', duration)).not.toMatch(/手打ち|おろしたて/);
    }
    expect(spotJa('soba-isshintei')).not.toMatch(/手打ち|おろしたて/);
  });

  it('does not claim a verified fishing experience at 大丹波川国際虹ます釣場', () => {
    // The entity is a rainbow-trout fishing facility; whether it is open to the
    // public and can be experienced is not established by the source.
    expect(stepJa('odanba-fishing', '1-day')).not.toMatch(/体験|釣りを楽しめます/);
    expect(spotJa('odanba-fishing')).not.toMatch(/体験|楽しめます/);
  });

  it('keeps the sourced entity/category framing for 獅子口屋 (wasabi shop)', () => {
    // A wasabi shop (category 買う) — retail function, not a visit experience.
    expect(stepJa('shishiguchiya', 'half-day')).toMatch(/わさび/);
    expect(stepJa('shishiguchiya', 'half-day')).not.toMatch(/見学|体験/);
    expect(spotJa('shishiguchiya')).not.toMatch(/見学|体験/);
  });

  it('keeps the SPOT_DETAILS canonical copy consistent with the rendered bundle', () => {
    // The seed records' roleJa (canonical) must not carry the removed claims
    // either, so seed and bundle cannot drift.
    expect(SPOT_DETAILS['chishima-wasabi-garden'].roleJa).not.toMatch(/見学|栽培現場/);
    expect(SPOT_DETAILS['soba-isshintei'].roleJa).not.toMatch(/手打ち|おろしたて/);
    expect(SPOT_DETAILS['odanba-fishing'].roleJa).not.toMatch(/体験/);
    expect(SPOT_DETAILS['shishiguchiya'].roleJa).not.toMatch(/見学|体験/);
  });

  it('does not treat 大丹波川国際虹ます釣場 as a Tokyo Wasabi experience', () => {
    // The committed snapshot establishes a rainbow-trout fishing facility, not a
    // wasabi experience. foodCultureIds must keep its "experienced HERE" meaning
    // — the facility stays on the journey as an editorial stop, but carries no
    // FoodCulture association.
    const odanba = getPlaceById('odanba-fishing')!;
    expect(odanba.foodCultureIds).toEqual([]);
    expect(getRelatedFoodCultures(odanba)).toEqual([]);
    // Still referenced by the wasabi journey route editorially.
    expect(getRouteIdForPlace('odanba-fishing')).toBe(PILOT_JOURNEY.routeId);
  });

  it('does not treat 一心亭 as a Tokyo Wasabi experience (only soba)', () => {
    // A soba restaurant whose snapshot has no wasabi connection lists only the
    // soba culture — never wasabi merely for being in the wasabi journey.
    const isshintei = getPlaceById('soba-isshintei')!;
    expect(isshintei.foodCultureIds).not.toContain('wasabi-okutama');
    expect(isshintei.foodCultureIds).toContain('okutama-soba');
  });

  it('keeps the source-backed English name Otaba-gawa', () => {
    // The committed snapshot names the facility "Otaba-gawa International
    // Rainbow Trout Pond" (not "Odanba-gawa"); the surfaced seed + en bundle
    // must preserve it.
    expect(getPlaceById('odanba-fishing')!.nameEn).toBe(
      'Otaba-gawa International Rainbow Trout Pond',
    );
    expect(spotJa('odanba-fishing')).toContain('大丹波川国際虹ます釣場');
    const enSpotRole = resolveKey(strings, 'en', spotRoleKey('odanba-fishing')!);
    expect(enSpotRole).toContain('Otaba-gawa');
  });
});
