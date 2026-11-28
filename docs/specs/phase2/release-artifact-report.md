# S4-2 public release artifact

**Not yet.** The public Vite build checked on 2026-11-28 at 09:22 JST contained all **251 admitted journey IDs** out of 254 reviewed Stage C records. It also shipped excluded and demo content. The checker exited 1 after inspecting 124 files.

| Evidence in `dist/` | Finding |
| --- | --- |
| `assets/app-*.js` | Excluded Stage C records `b02-ome-konnyaku`, `b13-ogasawara-rum`, and `b13-ogasawara-craft-beer`. The same bundle includes both Okutama demo journeys, their route and Spot identities, and localized fixture copy such as “奥多摩わさびは、どんな味？”. |
| Lazy JS and images | Okutama fixture identities appear in Story, Route and Spot chunks. The fieldwork chunk includes Okutama-tourism-office photo captions. Emitted fixture images include `akabeko_yamame-*.jpg`, `annaijo-*.jpg`, and the sample earned badge. |
| Editorial review | The Data Review Board now builds to `dist-data-review/`. Its HTML entry is present there and absent from `dist/`. |
| Static data and sitemap | This build emitted no standalone JSON catalog or sitemap. The excluded data was embedded in executable JS. |

Publication filtering currently runs after the browser downloads the catalog. The app also imports demo data and media through its public presentation and legacy routes. Clearing the remaining leak requires separating the admitted build inputs from those dependencies and resolving the standalone demo Spot behavior covered by S2-7.

## D5 coverage

Counts are admitted/reviewed. All 39 municipalities in the research catalog have at least one admitted journey.

| Area | Municipality counts |
| --- | --- |
| Tama cities | Hachioji 12/12, Tachikawa 5/5, Musashino 7/7, Mitaka 5/5, Ome 11/12, Fuchu 5/5, Akishima 7/7, Chofu 7/7, Machida 14/14, Koganei 6/6, Kodaira 6/6, Hino 4/4, Higashimurayama 9/9, Kokubunji 5/5, Kunitachi 7/7, Fussa 4/4, Komae 6/6, Higashiyamato 2/2, Kiyose 7/7, Higashikurume 3/3, Musashimurayama 5/5, Tama 6/6, Inagi 3/3, Hamura 6/6, Akiruno 11/11, Nishitokyo 6/6 |
| Nishitama | Mizuho 10/10, Hinode 3/3, Hinohara 10/10, Okutama 5/5 |
| Islands | Oshima 8/8, Toshima 2/2, Niijima 9/9, Kozushima 9/9, Miyake 6/6, Mikurashima 3/3, Hachijo 8/8, Aogashima 3/3, Ogasawara 6/8 |

Each of the 254 reviewed food-culture IDs has one Stage C record. Of these, 251 are 1/1. Ome konnyaku, Ogasawara rum and Ogasawara craft beer are each 0/1. The checker prints every food-culture ID in its coverage group.

## Reproduce

```sh
pnpm build
pnpm data:release-artifact
```

The checker reads `pnpm data:journey-admission --json` and scans all of `dist/`, including lazy chunks. It compares source identities and copy, validates route aliases and reports unexpected data files. It checks image bytes against referenced media with rights evidence and known UI assets. The current output has no standalone catalog format, so standalone JSON files require explicit review.
