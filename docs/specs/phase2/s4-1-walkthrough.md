# S4-1 release candidate walkthrough

Lead sign-off is pending in [acceptance.md](acceptance.md). Screenshots were captured on the built Vite preview in the 2026-11-28 14:43 JST run. Start a current built preview with `pnpm build && pnpm preview`. The S4-1 Playwright cases run through `e2e/current-mvp-smoke.spec.ts` and choose the trips from `pnpm data:journey-admission --json`.

## Lead checklist

Start at `/food-profile`. Choose the locale, complete Food Profile, set the area and time below, and keep those filters through Explore to reach Result. Follow the matching Result to Story, Route and the primary Spot. Check that Result explains the match, Route names the arrival and Spot opens the evidenced official destination. The automated run checks the popup URL using an intercepted response.

| Locale | Area, food culture and time | 375px | 1440px |
| --- | --- | --- | --- |
| ja | Ōme · Ōme sake · 240 min · 沢井駅 | [Profile](evidence/s4/s4-1-ja-375-profile.png) · [Result](evidence/s4/s4-1-ja-375-result.png) · [Story](evidence/s4/s4-1-ja-375-story.png) · [Route](evidence/s4/s4-1-ja-375-route.png) · [Spot](evidence/s4/s4-1-ja-375-spot.png) | [Profile](evidence/s4/s4-1-ja-1440-profile.png) · [Result](evidence/s4/s4-1-ja-1440-result.png) · [Story](evidence/s4/s4-1-ja-1440-story.png) · [Route](evidence/s4/s4-1-ja-1440-route.png) · [Spot](evidence/s4/s4-1-ja-1440-spot.png) |
| en | Hachiōji · ginger · 180 min · Michi-no-Eki Hachiōji Takiyama Iriguchi bus stop | [Profile](evidence/s4/s4-1-en-375-profile.png) · [Result](evidence/s4/s4-1-en-375-result.png) · [Story](evidence/s4/s4-1-en-375-story.png) · [Route](evidence/s4/s4-1-en-375-route.png) · [Spot](evidence/s4/s4-1-en-375-spot.png) | [Profile](evidence/s4/s4-1-en-1440-profile.png) · [Result](evidence/s4/s4-1-en-1440-result.png) · [Story](evidence/s4/s4-1-en-1440-story.png) · [Route](evidence/s4/s4-1-en-1440-route.png) · [Spot](evidence/s4/s4-1-en-1440-spot.png) |
| zh-TW | Fussa · Fussa sake · 240 min · 福生站西口 | [Profile](evidence/s4/s4-1-zh-TW-375-profile.png) · [Result](evidence/s4/s4-1-zh-TW-375-result.png) · [Story](evidence/s4/s4-1-zh-TW-375-story.png) · [Route](evidence/s4/s4-1-zh-TW-375-route.png) · [Spot](evidence/s4/s4-1-zh-TW-375-spot.png) | [Profile](evidence/s4/s4-1-zh-TW-1440-profile.png) · [Result](evidence/s4/s4-1-zh-TW-1440-result.png) · [Story](evidence/s4/s4-1-zh-TW-1440-story.png) · [Route](evidence/s4/s4-1-zh-TW-1440-route.png) · [Spot](evidence/s4/s4-1-zh-TW-1440-spot.png) |

- [ ] Complete the ja walkthrough at both widths.
- [ ] Complete the en walkthrough at both widths.
- [ ] Complete the zh-TW walkthrough at both widths.
- [ ] Tab through the path and use arrow keys in the Story chapter strip. Check visible focus and that Tab leaves the strip.
- [ ] With a screen reader, check each locale's pronunciation, profile dialog and fields, Result card and match reason, Story chapter region, Route arrival, and the Spot link.
- [ ] With reduced motion enabled, confirm that the path stays usable without non-essential animation.
- [ ] At `/route?candidateId=demo-ome-sake`, block local storage writes, then try saving the route and Spot. Check the spoken and visible error, unchanged save state after reload, and continued browsing. [Blocked save](evidence/s4/s4-1-blocked-save.png)
- [ ] Open `/route?candidateId=s4-1-nonexistent-journey` and `/spot/s4-1-nonexistent-spot?candidateId=demo-ome-sake`. Check the unavailable message and return to MOGU from each. [Wrong journey](evidence/s4/s4-1-wrong-journey.png) · [Wrong Spot](evidence/s4/s4-1-wrong-spot.png)
- [ ] Open `/spot/sawanoien-garden?candidateId=demo-ome-sake`. Check that it shows guidance without a dead action and returns to its route. [Missing optional action](evidence/s4/s4-1-missing-action.png)

## Defects to verify

The second run cleared the Result accessible-name and progress violations and the Story keyboard-scroll violation. All six runs reached their official handoff. Axe still reported serious `color-contrast` violations at both widths. To reproduce, follow a sample above on the built preview and scan these surfaces.

| Surface | Reproduction |
| --- | --- |
| Food Profile | Answer the four questions and scan the summary bubble and its summary box (`.profile-box`). |
| Result | Apply the sample's area and time. Scan the sample card's match reason, description and source retrieval note (`.res-card .tx p`). |
| Spot content | Open the sample's primary Spot and scan the introductory text and colored tags (`.lead` and `.spot-tags`). |
| Spot dock | On the same Spot, scan the inactive Explore, Favorites and My labels. |
