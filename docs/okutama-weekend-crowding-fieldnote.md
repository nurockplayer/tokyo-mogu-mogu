# 青梅→奥多摩方面 週末午前の混雑 — Fieldwork Note (一次観察)

> **Status: primary observation / field note, NOT a verified statistical fact.**
> This document records a single fieldwork observation (Issue #83). It does not
> establish crowding trends, weekday patterns, or schedule-level facts. Do not
> quote it as verified data in product copy, dashboards, or pitch material.

## Observation

| Item | Value |
| --- | --- |
| Observation date | 2026-08-09 (Sunday) |
| Observer context | Team fieldwork / demo research trip; example traveler travel day (inbound traveler, day-trip range) |
| Corridor | 青梅 (Ome) → 奥多摩 (Okutama) direction (JR 青梅線 御嶽・鳩ノ巣・奥多摩方面) |
| Time window | Weekend morning (午前) |
| What was observed | Trains heading from 青梅 toward 奥多摩 (incl. 御嶽 / 鳩ノ巣) were **very crowded** during the weekend morning |

## Interpretation (carefully hedged)

- 青梅以西 (west of Ome) is a common concentration point for sightseeing /
  hiking demand toward 奥多摩・御嶽・鳩ノ巣, so crowding can concentrate on
  weekend mornings.
- The consequence for travelers: the **displayed travel time** on the route may
  differ from the **actual comfort level and transfer buffer** (e.g. standing,
  crowded platforms, less slack for connections).
- This is a **single primary observation**. No formal crowding statistics,
  weekday-vs-weekend trend analysis, or per-train data has been verified yet.
  Avoid asserting it as an established fact.

## What would be needed to verify

- JR 東日本 official operating / crowding information (混雑状況, 運行状況,
  列車ダイヤ) — realtime or published congestion data.
- Formal crowding statistics (混雑率) or day-of-week / time-of-day trend data
  for the 青梅線 / 奥多摩 corridor.
- Multi-point, multi-date observations rather than a single trip.

Until such verified sources exist, this note remains a primary observation. Any
user-facing advisory derived from it must be hedged ("may be crowded",
"場合があります") and labeled as an observation-based advisory, not realtime
data.

## Relationship to related issues

- **Issue #10 (Okutama fieldwork)**: this note is one fieldwork observation in
  that spirit, but #10 remains the owner of stronger / verified site data.
- **Issue #17 (GTFS)**: the 西東京バス GTFS fixture is **demo data** and does
  not model crowding; it must not be read as evidence for this observation.
  GTFS represents schedules (a static timetable), not live occupancy.
- **Issue #83 (this note)**: the accompanying UI advisory on the S5 Model Route
  renders a short three-locale hedged message sourced from this observation,
  and does not implement realtime crowd prediction.
