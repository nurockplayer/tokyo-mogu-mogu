# Route aggregate audit — Issue #330

Captured 2026-09-22 from the current production bundle, with a 375 × 812 viewport
in ja/en/zh-TW. Each route has an access/caveat capture and a scrolled summary
capture. Result captures show each card's station guidance. The structured
manifest attaches them to stable Ledger claims; screenshots are presentation
evidence only and do not grant media rights or factual confirmation.

## Decisions and provenance

- Current displayed itineraries are the source for aggregate duration and count:
  wasabi half-day 150 minutes / 7 stops, wasabi full-day 420 / 6, yamame 240 / 4.
  Counts include starting stations. Duration is an editorial local estimate,
  excludes origin travel, and does not guarantee an executable booked schedule.
  Older seed itineraries have different steps and are not used to overwrite the
  current visible route. Ome's existing 215/370 minute itineraries and 3/4 counts
  use the same derivation; its existing access and transport caveats are retained.
- [GO TOKYO](https://www.gotokyo.org/en/destinations/outlying-area/okutama-and-around/index.html),
  checked 2026-09-22, page updated 2025-12-19: approximately 135 minutes by rail
  from Tokyo Station and 120 from Shinjuku to Okutama Station. Both Result and
  Route consume one structured source record and explicitly require rechecking.
  This is planning guidance, not a live or departure-specific timetable.
- The full-day wasabi route starts at Mitake. It does not inherit the Okutama
  estimate. The existing canonical TOKYO WASABI meeting-place access and booking
  instructions supply that guidance; seasonal meeting times, conflicting tour
  durations, availability, and the confirmation-email requirement remain intact.
  Confirm return to the meeting place, travel to Mitake Station, and onward trains
  before planning subsequent stops. A visible winter-tour caveat warns that
  Akabeko lunch may be missed; adjust the sequence/stops before booking. No
  guaranteed return time is introduced.
- JR indexes checked 2026-09-22:
  [Mitake](https://timetables.jreast.co.jp/timetable/list1464.html) (the URL in the
  Issue) and [Okutama](https://timetables.jreast.co.jp/timetable/list0368.html).
  Station identification only; no numeric travel time is derived from an index.
- No reproducible route geometry supports the former 6 km / 4 km summaries.
  Stable distance claims now inventory confirmation guidance with the omission
  explained. No provider, coordinates, routing dependency, or map asset is added.
- Segment audit: remove unsupported 1/5/15-minute links to the tourism office,
  shrine, Akabeko, and PORT; remove the invented 20-minute Mitake rail segment.
  Travel after Wasabi Shokudo depends on its current mobile stall location.
  Existing source-backed Spot access and Hikawa's 40–50 minute promenade guidance
  remain separate from those unsupported inter-stop estimates.

Source screenshots are omitted because reproduction rights are not established;
GO TOKYO is All Rights Reserved. URLs, dates, and reasons are recorded in the
structured evidence manifest. No third-party planner output is treated as
canonical data. Hopp exposed only Tachiko Sheet, so KiKi was not inspected; the
existing compact Route layout is retained under mission #388's factual-correction
authority. These captures do not claim Figma approval.

Reproduce after `pnpm build` with a production preview on port 4196:

```sh
ISSUE_330_PREVIEW_URL=http://127.0.0.1:4196 node scripts/capture-issue-330-evidence.mjs
```
