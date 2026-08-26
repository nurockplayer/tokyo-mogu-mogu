import { describe, expect, it } from 'vitest';
import { compileLedgerClaims, renderDataVerificationLedger } from './data-verification-ledger';
import { currentDataVerificationClaims } from './current-data-verification-ledger';

describe('current data verification ledger inputs (#333)', () => {
  it('represents the merged #322 tourism-office source/presentation boundary without promotion', () => {
    const claims = currentDataVerificationClaims();
    const address = claims.find((claim) =>
      claim.entityId === 'okutama-tourism-office' && claim.claimId === 'address');
    const phone = claims.find((claim) =>
      claim.entityId === 'okutama-tourism-office' && claim.claimId === 'phone');
    const displayedStatus = claims.find((claim) =>
      claim.entityId === 'okutama-tourism-office'
      && claim.claimId === 'verification-status');

    expect(address).toMatchObject({
      canonicalValue: '東京都西多摩郡奥多摩町氷川210',
      displayedValue: '東京都西多摩郡奥多摩町氷川210',
      verification: 'needs_confirmation',
      retrievedAt: '2026-08-26',
      confirmedAt: undefined,
    });
    expect(displayedStatus).toMatchObject({
      canonicalValue: undefined,
      displayedValue: expect.stringContaining('掲載内容は現在確認中'),
      presentationOrigin: 'editorial',
      verification: 'needs_confirmation',
      confirmedAt: undefined,
    });
    expect(phone).toMatchObject({
      canonicalValue: '0428-83-2152',
      displayedValue: '0428-83-2152',
      verification: 'needs_confirmation',
      canonicalSourceFile: 'scripts/ingest-okutama/snapshots/okutama-tourism-directory.json',
      retrievedAt: '2026-08-26',
      confirmedAt: undefined,
    });
  });

  it('emits report-only unknown rows for the bounded visible Spot inventory', () => {
    const claims = currentDataVerificationClaims();
    const unknowns = claims.filter((claim) =>
      claim.entityId === 'okutama-tourism-office' && claim.verification === 'unknown');

    expect(unknowns.map((claim) => claim.claimId)).toEqual(expect.arrayContaining([
      'opening-hours',
      'closed-days',
      'price-menu-product-availability',
      'reservation',
      'booking-destination',
      'parking',
      'multilingual-support',
      'dietary-allergy-halal-vegan',
      'accessibility',
    ]));
    expect(unknowns.every((claim) =>
      claim.canonicalValue === undefined
      && claim.displayedValue === undefined
      && claim.canonicalOrigin === undefined
      && claim.presentationOrigin === undefined
      && claim.primarySourceName === undefined
      && claim.retrievedAt === undefined
      && claim.confirmedAt === undefined
      && claim.canonicalSourceFile === undefined)).toBe(true);
    expect(claims.filter((claim) => claim.verification === 'unknown').every((claim) =>
      claim.canonicalValue === undefined && claim.displayedValue === undefined)).toBe(true);
  });

  it('keeps current demo presentation data out of verified status', () => {
    const claims = currentDataVerificationClaims();
    const demoName = claims.find((claim) =>
      claim.entityId === 'wasabi-kitchen' && claim.claimId === 'name');

    expect(demoName).toMatchObject({
      canonicalValue: undefined,
      displayedValue: 'わさび食堂',
      presentationOrigin: 'demo',
      verification: 'demo',
    });
    expect(claims.some((claim) =>
      claim.presentationOrigin === 'demo' && claim.verification === 'verified')).toBe(false);
  });

  it('compares canonical Route structure with the actual current presentation records', () => {
    const claims = compileLedgerClaims(currentDataVerificationClaims());
    const stopCount = claims.find((claim) =>
      claim.entityId === 'okutama-wasabi-journey'
      && claim.claimId === 'route.stop-count.half-day');
    const missingCanonicalStop = claims.find((claim) =>
      claim.entityId === 'okutama-wasabi-journey'
      && claim.claimId === 'route.stop.chishima-wasabi-garden.membership.half-day');
    const extraPresentationStop = claims.find((claim) =>
      claim.entityId === 'okutama-wasabi-journey'
      && claim.claimId === 'route.stop.okutama-station.membership.half-day');
    const sharedStopPosition = claims.find((claim) =>
      claim.entityId === 'okutama-wasabi-journey'
      && claim.claimId === 'route.stop.okutama-tourism-office.position.half-day');

    expect(stopCount).toMatchObject({
      canonicalValue: '4',
      displayedValue: '7',
      canonicalOrigin: 'editorial',
      presentationOrigin: 'demo',
      verification: 'needs_confirmation',
      mismatch: true,
    });
    expect(missingCanonicalStop).toMatchObject({
      canonicalValue: 'included',
      displayedValue: 'not included',
      mismatch: true,
    });
    expect(extraPresentationStop).toMatchObject({
      canonicalValue: 'not included',
      displayedValue: 'included',
      mismatch: true,
    });
    expect(sharedStopPosition).toMatchObject({
      canonicalValue: '1',
      displayedValue: '2',
      mismatch: true,
    });
    expect(claims.some((claim) => /route\.stop\.\d+\./.test(claim.claimId)))
      .toBe(false);
  });

  it('projects the represented meeting time through semantic audit metadata', () => {
    const claims = currentDataVerificationClaims();
    const meetingTime = claims.find((claim) =>
      claim.entityId === 'okutama-wasabi-journey'
      && claim.claimId === 'route.meeting-time.full-day');

    expect(meetingTime).toMatchObject({
      canonicalValue: undefined,
      displayedValue: '集合 8:30',
      presentationOrigin: 'demo',
      verification: 'demo',
      auditMetadata: true,
    });
  });

  it('projects current Result-card facts and queues cross-surface travel-time disagreement', () => {
    const claims = currentDataVerificationClaims();
    const compiled = compileLedgerClaims(claims);
    const resultDescription = claims.find((claim) =>
      claim.entityId === 'okutama-wasabi-journey'
      && claim.claimId === 'result.description');
    const resultTravelTime = claims.find((claim) =>
      claim.entityId === 'okutama-wasabi-journey'
      && claim.claimId === 'result.origin-travel-time');
    const routeTravelTime = claims.find((claim) =>
      claim.entityId === 'okutama-wasabi-journey'
      && claim.claimId === 'route.origin-travel-time.half-day');
    const matchingYamameTime = claims.find((claim) =>
      claim.entityId === 'okutama-yamame-journey'
      && claim.claimId === 'result.origin-travel-time');
    const compiledResultTravelTime = compiled.find((claim) =>
      claim.entityId === 'okutama-wasabi-journey'
      && claim.claimId === 'result.origin-travel-time');
    const compiledYamameTime = compiled.find((claim) =>
      claim.entityId === 'okutama-yamame-journey'
      && claim.claimId === 'result.origin-travel-time');

    expect(resultDescription).toMatchObject({
      entityType: 'Route',
      claimKind: 'editorial-narrative',
      displayedValue: expect.stringContaining('奥多摩わさび'),
      presentationOrigin: 'demo',
      verification: 'demo',
      presentationSourceFile: 'src/features/netlify-parity/content.ts',
    });
    expect(resultTravelTime).toMatchObject({
      displayedValue: '120',
      presentationOrigin: 'demo',
      verification: 'demo',
      presentationSourceFile: 'src/features/netlify-parity/screens/JourneyResultCard.tsx',
      comparedPresentationClaimId: 'route.origin-travel-time.half-day',
      nextAction: expect.stringContaining('route.origin-travel-time.half-day'),
    });
    expect(routeTravelTime).toMatchObject({
      displayedValue: '60',
      presentationOrigin: 'demo',
      verification: 'demo',
    });
    expect(matchingYamameTime).toMatchObject({
      displayedValue: '90',
      verification: 'demo',
    });
    expect(compiledResultTravelTime).toMatchObject({
      mismatch: false,
      presentationMismatch: true,
    });
    expect(compiledYamameTime).toMatchObject({
      mismatch: false,
      presentationMismatch: false,
    });
    expect(renderDataVerificationLedger(claims)).toContain(
      '`okutama-wasabi-journey + result.origin-travel-time` vs `route.origin-travel-time.half-day`: displayed “120”; related display “60”',
    );
  });

  it('distinguishes current Story narrative from source-backed factual records', () => {
    const claims = currentDataVerificationClaims();
    const chapter = claims.find((claim) =>
      claim.entityId === 'wasabi-okutama'
      && claim.claimId === 'story.chapter.why-wasabi');
    const name = claims.find((claim) =>
      claim.entityId === 'wasabi-okutama' && claim.claimId === 'name');

    expect(chapter).toMatchObject({
      entityType: 'Story',
      claimKind: 'editorial-narrative',
      presentationOrigin: 'demo',
      verification: 'demo',
    });
    expect(name).toMatchObject({
      entityType: 'FoodCulture',
      claimKind: 'factual',
      canonicalOrigin: 'editorial',
      verification: 'needs_confirmation',
    });
  });

  it('keeps distinct same-entity Story cards under semantic claim IDs', () => {
    const claims = currentDataVerificationClaims().filter((claim) =>
      claim.entityId === 'yamame-okutama'
      && claim.claimId.startsWith('story.nature.hikawa-valley.'));

    expect(claims.map((claim) => claim.claimId)).toEqual([
      'story.nature.hikawa-valley.stream-walk',
      'story.nature.hikawa-valley.water-culture',
    ]);
  });

  it('surfaces factual assertions embedded in Story prose as metadata-only audit gaps', () => {
    const claims = currentDataVerificationClaims();
    const successorCount = claims.find((claim) =>
      claim.entityId === 'wasabi-okutama'
      && claim.claimId === 'story.factual.successor-count');
    const researchFacilities = claims.find((claim) =>
      claim.entityId === 'yamame-okutama'
      && claim.claimId === 'story.factual.research-facility-count');
    const eatingWindow = claims.find((claim) =>
      claim.entityId === 'wasabi-okutama'
      && claim.claimId === 'story.factual.optimal-eating-window');
    const yamameSize = claims.find((claim) =>
      claim.entityId === 'yamame-okutama'
      && claim.claimId === 'story.factual.fish-longevity-size');

    expect(successorCount).toMatchObject({
      claimKind: 'factual',
      canonicalValue: undefined,
      displayedValue: undefined,
      verification: 'unknown',
      auditMetadata: true,
      nextAction: expect.stringContaining('story.chapter.makers'),
    });
    expect(researchFacilities).toMatchObject({
      claimKind: 'factual',
      canonicalValue: undefined,
      displayedValue: undefined,
      verification: 'unknown',
      auditMetadata: true,
      nextAction: expect.stringContaining('story.chapter.regional-fit'),
    });
    expect(eatingWindow).toMatchObject({
      claimKind: 'factual',
      canonicalValue: undefined,
      displayedValue: undefined,
      verification: 'unknown',
      auditMetadata: true,
      nextAction: expect.stringContaining('story.point'),
    });
    expect(yamameSize?.nextAction).toContain('story.chapter.fish-characteristics');
    expect(yamameSize?.nextAction).toContain('story.point');
  });

  it('keeps presentation provenance tied to the record that supplies each visible Spot value', () => {
    const claims = currentDataVerificationClaims();
    const lead = claims.find((claim) =>
      claim.entityId === 'okutama-tourism-office' && claim.claimId === 'spot.lead');
    const description = claims.find((claim) =>
      claim.entityId === 'okutama-tourism-office' && claim.claimId === 'spot.description');
    const safety = claims.find((claim) =>
      claim.entityId === 'okutama-tourism-office' && claim.claimId === 'safety-guidance');

    expect(lead).toMatchObject({
      canonicalOrigin: undefined,
      presentationOrigin: 'demo',
      verification: 'demo',
      primarySourceName: undefined,
      presentationSourceFile: 'src/features/netlify-parity/content.ts',
    });
    expect(description).toMatchObject({
      canonicalOrigin: 'editorial',
      presentationOrigin: 'editorial',
      verification: 'needs_confirmation',
      presentationSourceFile: 'src/features/netlify-parity/screens/SpotScreen.tsx',
    });
    expect(safety).toMatchObject({
      canonicalOrigin: undefined,
      presentationOrigin: 'editorial',
      verification: 'needs_confirmation',
      primarySourceName: undefined,
      presentationSourceFile: 'src/features/netlify-parity/screens/SpotScreen.tsx',
    });
  });

  it('does not guess claim-level FoodCulture provenance from source-array order', () => {
    const maker = currentDataVerificationClaims().find((claim) =>
      claim.entityId === 'hachioji-ginger' && claim.claimId === 'maker');

    expect(maker).toMatchObject({
      primarySourceName: undefined,
      primarySourceUrl: undefined,
      retrievedAt: undefined,
      confirmedAt: undefined,
      auditMetadata: true,
      nextAction: expect.stringContaining('claim-level source mapping'),
    });
  });

  it('keeps fieldwork observations distinct from stable facts and stakeholder confirmation', () => {
    const claims = currentDataVerificationClaims();
    const observation = claims.find((claim) =>
      claim.entityId === 'okutama-tourism-office'
      && claim.claimId === 'fieldwork.observation.okutama-tourism-office-stamps');

    expect(observation).toMatchObject({
      claimKind: 'fieldwork-observation',
      canonicalOrigin: 'source',
      verification: 'needs_confirmation',
      retrievedAt: '2026-08-23',
      confirmedAt: undefined,
    });
  });

  it('includes externally sourced Story metrics without treating retrieval as verification', () => {
    const claims = currentDataVerificationClaims();
    const visitRate = claims.find((claim) =>
      claim.entityId === 'wasabi-okutama'
      && claim.claimId === 'story.regional-evidence.visit-rate');

    expect(visitRate).toMatchObject({
      entityType: 'Story',
      claimKind: 'factual',
      canonicalValue: '1.1%',
      canonicalOrigin: 'source',
      verification: 'needs_confirmation',
      retrievedAt: '2026-08-22',
      sourceUpdatedAt: '2026-06-30',
      confirmedAt: undefined,
    });
  });

  it('keeps claim identities unique and current rendering byte-identical', () => {
    const first = currentDataVerificationClaims();
    const identities = first.map((claim) => `${claim.entityId}:${claim.claimId}`);

    expect(new Set(identities).size).toBe(identities.length);
    expect(identities.some((identity) => identity.includes('unmapped-'))).toBe(false);
    expect(renderDataVerificationLedger(first)).toBe(
      renderDataVerificationLedger(currentDataVerificationClaims()),
    );
  });

  it('preserves needs_confirmation for populated canonical practical facts without confirmedAt', () => {
    const claims = currentDataVerificationClaims();
    const hours = claims.find((claim) =>
      claim.entityId === 'sawanoien-garden' && claim.claimId === 'opening-hours');

    expect(hours).toMatchObject({
      entityType: 'Spot',
      canonicalValue: '10:00〜17:00',
      canonicalOrigin: 'editorial',
      verification: 'needs_confirmation',
      confirmedAt: undefined,
    });
  });
});
