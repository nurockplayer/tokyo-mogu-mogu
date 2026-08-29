# Figma asset provenance

Exact exports from the live KiKi file for Issue #360 on 2026-08-29. Detailed
node measurements and acquisition-state decisions are recorded in
`docs/evidence/issue-360/figma-source.md`.

| Asset | Live Figma source | Export operation |
| --- | --- | --- |
| `badge-yamame.png` | `269:1420`, middle 428×428 region | 2× PNG export, exact 856×856 crop at x=856 |
| `badge-edo-tokyo-vegetables.png` | `269:1420`, right 428×428 region | 2× PNG export, exact 856×856 crop at x=1712 |

The source node is the single 1284×428 live raster containing the green
奥多摩わさび, blue 奥多摩やまめ, and red 江戸東京野菜 designs in equal square
regions. The crops preserve the exported pixels without redrawing, tracing, or
recoloring them. The earned green crop remains the existing exact export
`src/assets/figma-296/badge-earned.png` from live node `269:1423`.
