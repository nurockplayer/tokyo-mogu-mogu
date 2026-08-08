# Demo Script (60–90 seconds)

For Issue #9. This is the hackathon demo walkthrough. All steps are verified working in the browser.

## Demo location (important)

The app uses real geolocation by default. For a repeatable demo, open the app with a **demo location override** so check-in works without traveling to Okutama:

```
http://localhost:5173/food-cultures/wasabi-okutama?at=place:okutama-wasabi-field
```

- `?at=place:<id>` pretends the user is at that seed place.
- `?demoLat=<lat>&demoLng=<lng>` pretends the user is at explicit coordinates.
- `?demoRadius=<meters>` widens the unlock radius (default 500 m).

The check-in panel shows a "Demo location mode" hint when an override is active.

## Steps (target: ≤90 seconds)

1. **Top page** — the concept is readable in one glance: tagline + "next discovery" suggestions, each showing its nearest bus stop and next departure (transit-aware, demo GTFS). (5 s)
2. **Pokédex** (`/pokedex`) — 7 food cultures; locked cards show muted art + a hint; top bar shows `0 / 7` and a progress bar. (10 s)
3. **Pick "Tokyo Wasabi"** — tap the wasabi card → detail page. Locked: shows the overview, a "not yet discovered" notice, and the places where you can experience it. (10 s)
4. **Check in** — with the demo override URL, tap **チェックイン** on the wasabi field panel. (5 s)
5. **"GET!"** — the vermilion GET seal appears; the full story, history, maker, how-to-enjoy, and sources sections unlock instantly. (5 s)
6. **Sources** — the "Sources" section lists 奥多摩観光協会 / 東京都産業労働局 with links and a last-verified date — provenance is explicit. (5 s)
7. **Progress updates** — back to the Pokédex: `1 / 7`, progress bar at 14%, wasabi card now shows the GET seal + full description. (5 s)
8. **Next discovery** — the home page suggests the next collectible (e.g. 奥多摩やまめ) with its nearest bus stop + next departure; tap through to its detail. (5 s)

Total walkthrough: ~50 s of presenter time; leaves room to mention the JA/EN toggle, the map (`/map`), and demo reset.

### Optional: Google sign-in (auth is integrated but optional for the demo)

The header shows **ログイン / Sign in** when unauthenticated. Signing in provisions a user (canonical `userId`), persists the session, and shows the avatar + **サインアウト / Sign out** in the header. A reload restores the session without a second login. Skip this for a pure 60–90 s demo; it needs `VITE_GOOGLE_CLIENT_ID` set (see `.env.example`).

## Reset for repeat demos

Tap **デモデータをリセット** in the header twice (confirmation), or open a fresh browser profile / private window. Collection state is stored in `localStorage` only.

## English version

Tap **EN** in the header to switch the whole app to English — the same flow works.
