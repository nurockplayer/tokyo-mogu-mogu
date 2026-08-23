# Issue #296 live Figma source

Inspected on 2026-08-23 through the local Hopp `figma-bridge` connected to the live KiKi file `tokyo-mogu-mogu` (`Page 1`, page node `0:1`). The matching frames were located from their live copy and measured node composition, not from the issue screenshots.

| State | Live frame | Matching evidence |
| --- | --- | --- |
| マイページ | `269:1031` | `Talk1`, 390×844, green header, profile controls, two action cards, settings rows, logout, and four-item Dock |
| 食のバッジ earned `1/100` | `269:1210` | `Talk1`, 390×844, earned-count card and binder frame with the 奥多摩わさび stamp |
| 食のバッジ empty `2/100` | `269:1451` | `Talk1`, 390×844, empty rotated stamp and QR guidance state |

Key measured/exported nodes:

- shared My background `269:1114`; My status bar `269:1200`; My header `269:1032`
- profile avatar `269:1034`; camera `269:1115`; profile edit `269:1196`
- My action cards `269:1184` and `269:1189`; route art `269:1188`; badge art `269:1195`
- My settings rows `269:1152`, `269:1162`, and `269:1174`; logout `269:1198`; Dock `269:1122`
- badge earned header `269:1389`; intro `269:1413`; count group `269:1522`
- earned binder `269:1399`; cover/page/rings `269:1400`–`269:1411`; earned stamp `269:1423`; date `269:1425`; store card `269:1437`; `1/100` `269:1438`; controls `269:1443` and `269:1447`
- badge empty header `269:1454`; intro `269:1488`; count group `269:1523`; binder `269:1457`; empty stamp `269:1570`; empty copy `269:1572`; `2/100` `269:1474`; controls `269:1477` and `269:1475`

The binder was reproduced from the exported live vectors and their exact measured offsets, including the partially off-canvas green cover and nine orange rings. Raster artwork was exported at 2× and displayed at its live logical dimensions.
