# S4-2 public release artifact

**Pass.** On 2026-11-28 JST at commit `23ae0ea`, the checker exited 0 after inspecting all 25 files in `dist/`. It found all **251 admitted journey IDs** out of 254 reviewed Stage C records and reported no excluded journey IDs. All 42 hosted smoke cases passed on the same commit. [Hosted smoke results](https://github.com/nurockplayer/tokyo-mogu-mogu/actions/runs/46095208738/job/140825517323)

| Evidence in `dist/` | Finding |
| --- | --- |
| Catalog and aliases | The build uses the admitted catalog. The checker found zero excluded or demo identities, copy, or aliases. |
| Media and data files | Every emitted image matched admitted media with rights evidence or a known UI asset. The build emitted no standalone JSON catalog or sitemap. |
| Editorial review | The internal Data Review Board and demo preview build separately to `dist-data-review/`. |

The local focused smoke run lost the S1-4 worker to `SIGKILL` and the S2-10 browser page crashed. The hosted smoke run passed both cases.

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
