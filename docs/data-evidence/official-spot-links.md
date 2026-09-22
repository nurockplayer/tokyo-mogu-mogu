# Official Spot destinations — Issue #331

Checked on 2026-09-22 after #324–#330 merged. This is a navigation audit,
not stakeholder confirmation, availability verification, or a media license.
Canonical records and their verification dates/statuses are unchanged.

The Spot guide consumes `resolveSpotOfficialLink(getPlaceById(spot.id), getSpotDetail(spot.id))`.
There is no presentation-only URL table. Existing guide titles, bodies and
actions remain localized; unsupported destinations display localized feedback
without navigating. Only credential-free HTTP(S) official-web sources qualify.
Sensitive records fail closed instead of falling back to a less relevant page.
Matching Spot-detail practical provenance takes precedence over a generic Place
homepage when both sources are official and share the same origin.

| Destination | Existing source used | Re-check |
| --- | --- | --- |
| Wasabi Shokudo | [Operator announcements](https://tokyowasabi.com/category/information/) | Current directory includes monthly schedules; dated August evidence is not the destination. |
| WASABI EXPERIENCE | [Existing booking form](https://tokyowasabi.com/wasabi-experience/#booking-form) | Operator page has the booking form; same-origin validation retains the canonical fragment. No booking submitted. |
| Hikawa Valley | [Town safety/entrance notice](https://www.town.okutama.tokyo.jp/1/kankosangyoka/kankojoho/3/436.html) | Notice updated September 22 says the September 19 closure continues. The durable URL is used; no live-open claim is introduced. |
| Tourist information office | [Tourism Association](https://www.okutama.gr.jp/site/) | Direct HTML fetch returned 200 and the Association/office title after the browsing tool could not fetch it. |
| Yamashiroya | [Official shop guide](https://www.yamasiroya.co.jp/shop.html) | Direct HTML fetch returned 200 and the shop-guide title after the browsing tool timed out. |
| Akabeko | [Official site](https://akabeko.tokyo/) | Current restaurant page with operating information and calendar links. |
| Okutama Kitchen | [Official site](https://www.okutamanodaidokoro.com/) | Current operator page. |
| PORT Okutama | [Official operator site](https://www.okutama.ne.jp/) | Current Okutama Stations Life page. |
| Ozawa Brewery | [Official brewery-tour page](https://www.sawanoi-sake.com/service/kengaku/) | Existing Spot-detail practical source, rechecked September 22: tour information and operator reservation link. No booking submitted. |
| Sawanoien | [Official garden page](https://www.sawanoi-sake.com/service/sawanoien/) | Current venue page; no guide block is added where the existing composition has none. |

Mitake Shrine and Baba House have public-dataset provenance but no supported
official visitor destination in canonical data. The station presentation
fixtures have no canonical Place source. None receives a guessed link or a new
guide block. Oku-Hikawa Shrine retains its institutional publication as evidence;
it has no guide CTA and is not presented as a current visitor-information site.

Browser coverage checks native keyboard activation, a separate tab, null opener,
and preserved original route with intercepted external requests. A fault-injected
unsupported source checks the existing guide's non-navigation fallback and
localized feedback at 375px in ja/en/zh-TW. No operator form is submitted and no
third-party media is copied. Unit coverage checks unsupported provenance,
malformed/unsafe URLs, sensitive-source mismatch and unchanged source metadata.

The Ledger generator's `--check` remains clean: no Ledger-covered factual values
or source claims change. KiKi is not connected through Hopp (only Tachiko Sheet
is exposed); this change preserves current-main layout and claims no Figma signoff.
