import { describe, expect, it } from 'vitest';
import { getPlaceById, places } from './index';
import { resolveSpotOfficialLink } from './spot-official-link';

describe('source-backed Spot destinations', () => {
  it.each([
    ['wasabi-kitchen', 'https://tokyowasabi.com/category/information/', 'current-schedule'],
    ['wasabi-experience', 'https://tokyowasabi.com/wasabi-experience/#booking-form', 'booking'],
    ['hikawa-valley', 'https://www.town.okutama.tokyo.jp/1/kankosangyoka/kankojoho/3/436.html', 'current-information'],
    ['okutama-tourism-office', 'https://www.okutama.gr.jp/site/', 'official-information'],
    ['yamashiroya', 'https://www.yamasiroya.co.jp/shop.html', 'official-information'],
    ['akabeko', 'https://akabeko.tokyo/', 'official-information'],
    ['okutama-kitchen', 'https://www.okutamanodaidokoro.com/', 'official-information'],
    ['port-okutama', 'https://www.okutama.ne.jp/', 'official-information'],
    ['sawai-ozawa-shuzo', 'https://www.sawanoi-sake.com/', 'official-information'],
    ['sawanoien-garden', 'https://www.sawanoi-sake.com/service/sawanoien/', 'official-information'],
  ])('uses the supported visitor destination for %s', (id, url, kind) => {
    const place = getPlaceById(id)!;
    expect(resolveSpotOfficialLink(place)).toMatchObject({ url, kind });
  });

  it.each(['mitake-shrine', 'baba-oshijutaku', 'okutama-station', 'missing'])('does not guess a destination for %s', (id) => {
    expect(resolveSpotOfficialLink(getPlaceById(id))).toBeUndefined();
  });

  it.each(['open_data', 'business', 'manual', 'fieldwork', 'demo'] as const)('does not present %s as an official site', (sourceType) => {
    const place = getPlaceById('okutama-tourism-office')!;
    expect(resolveSpotOfficialLink({ ...place, source: { ...place.source, sourceType } })).toBeUndefined();
  });

  it.each([undefined, '', '/relative', 'not a URL', 'javascript:alert(1)', 'data:text/html,hello', 'ftp://example.test/', 'https://name:secret@example.test/'])('rejects unsupported or unsafe URL %s', (url) => {
    const place = getPlaceById('okutama-tourism-office')!;
    expect(resolveSpotOfficialLink({ ...place, source: { ...place.source, url } })).toBeUndefined();
  });

  it('fails closed when a sensitive destination loses support', () => {
    const mobile = structuredClone(getPlaceById('wasabi-kitchen')!);
    if (mobile.locationKind !== 'mobile') throw new Error('Expected mobile venue');
    mobile.mobileVenue.scheduleDirectorySource.url = undefined;
    expect(resolveSpotOfficialLink(mobile)).toBeUndefined();

    const area = structuredClone(getPlaceById('hikawa-valley')!);
    if (area.locationKind !== 'area') throw new Error('Expected natural area');
    area.naturalArea.safety.currentInformationUrl = 'https://unrelated.test/';
    expect(resolveSpotOfficialLink(area)).toBeUndefined();

    const experience = structuredClone(getPlaceById('wasabi-experience')!);
    if (experience.locationKind === 'mobile' || experience.locationKind === 'area') throw new Error('Expected fixed experience');
    for (const bookingUrl of ['https://unrelated.test/booking', 'broken', 'javascript:alert(1)', 'https://user@tokyowasabi.com/booking']) {
      experience.visitorInformation!.experienceTour!.bookingUrl = bookingUrl;
      expect(resolveSpotOfficialLink(experience)).toBeUndefined();
    }
  });

  it('never changes confirmation, provenance, or rights metadata', () => {
    const before = JSON.stringify(places);
    places.forEach(resolveSpotOfficialLink);
    expect(JSON.stringify(places)).toBe(before);
    const mobile = getPlaceById('wasabi-kitchen')!;
    if (mobile.locationKind !== 'mobile') throw new Error('Expected mobile venue');
    expect(resolveSpotOfficialLink(mobile)?.source).toBe(mobile.mobileVenue.scheduleDirectorySource);
  });
});
