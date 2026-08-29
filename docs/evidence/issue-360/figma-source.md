# Issue #360 live Figma source

Inspected on 2026-08-29 through the local Hopp `figma-bridge` connected to the
live KiKi file `tokyo-mogu-mogu` (`Page 1`, page node `0:1`). `list_files`
resolved the active bridge-local file key before node reads.

## Live nodes

| Design / state | Live node | Evidence |
| --- | --- | --- |
| Three finished stamp designs | `269:1420` (`image 25`) | 1284×428 image rectangle containing three equal 428×428 regions: green 奥多摩わさび, blue 奥多摩やまめ, red 江戸東京野菜 |
| 奥多摩わさび standalone crop | `269:1422` (`image 26`) | 431×428 crop of the left region from the same image fill |
| 奥多摩わさび earned stamp | `269:1423` (`image 26`) | 303×300 crop inside earned frame `269:1210` |
| Earned collection state | `269:1210` | `1/100`, `1枚`, acquisition date, and store card exist only for 奥多摩わさび |
| Generic empty state | `269:1451` | `2/100` in Figma, with empty stamp `269:1570` and QR guidance `269:1572` |

The three designs share image fill hash
`c5e9133f1cb1515685bd766268a1a8b3ab390b49`. KiKi does not contain separate
earned frames, acquisition dates, store cards, or an increased earned count for
奥多摩やまめ or 江戸東京野菜. Their source IDs are therefore recorded honestly
as equal regions of `269:1420`, rather than inventing nonexistent per-design
nodes.

## Export provenance

`269:1420` was exported through the local bridge as a 2× PNG (2568×856). The
middle and right 856×856 regions were cropped on exact pixel boundaries to
produce:

- `src/assets/figma-360/badge-yamame.png` — source x=856..1711;
  SHA-256 `cbf64b5bcbd2ea7d5fa31e832e369f12da71d376f7b4e71eeaec4506b0faa731`
- `src/assets/figma-360/badge-edo-tokyo-vegetables.png` — source x=1712..2567;
  SHA-256 `86a39cc928d8dc21fd374a36f52a6783bc78408978a60b7dbf841590c3396580`

No artwork was redrawn, traced, recolored, or derived from the Issue screenshot.
The existing 2× green earned export from `269:1423` remains in
`src/assets/figma-296/badge-earned.png`.

## Product / acquisition decision

Live Figma still explicitly shows `1枚` and supplies earned metadata only for
奥多摩わさび. Repository acquisition semantics require an explicit award and
forbid inferring one from artwork. The runtime therefore keeps the truthful
earned count at one, presents 奥多摩やまめ and 江戸東京野菜 as visible
`unearned` collection previews without date/store claims, and places the generic
empty slot after them at runtime page `4/100`.

The existing #296 binder, header, count composition, navigation controls, and
100-slot presentation capacity remain unchanged.
