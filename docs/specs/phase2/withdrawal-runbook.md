# S4-3 · Correct, withdraw and roll back a release candidate

Work on a candidate branch. Keep a reference to the previous accepted source revision and the current [withdrawal registry](../../../src/data/journey-withdrawals.ts).

1. **Correct a fact.** Edit the journey record under `src/data/journey-records/` (and its locale values where applicable). Update its `facts` and `sources` as needed and record the supporting URL and JST retrieval date in the existing batch evidence under `docs/data-evidence/regions/`. Retain stable journey, Story, Route and Spot IDs. Run `pnpm data:journey-admission` and rebuild with `pnpm build`. In the local preview, check that the record remains admitted and displays the corrected value.
2. **Withdraw a journey.** Add its journey ID, reason and JST timestamp to `journeyWithdrawals` in the registry. Rebuild the report and candidate. The report must show `<journey-id> excluded — withdrawn` for a previously passing record. Run `pnpm data:release-artifact` on the public build. At 375px, check that MOGU omits the journey, previously working Story, Route and journey Spot links show the localized unavailable screen, and an existing save on the same origin shows unavailable.
3. **Roll back with the withdrawals intact.** Start from the previous accepted source revision in a separate worktree and copy forward the complete current registry. If that revision predates the withdrawal mechanism, carry forward the admission rule in `src/data/journey-admission.ts` and the public bundle filtering in `vite.config.ts`. Build a fresh artifact with those inputs. Rerun admission, `pnpm data:release-artifact`, and the same browser checks against the rollback candidate. Verify a restored fact on an unaffected journey and that every active withdrawal that exists in the rollback catalog stays excluded. Remove the unavailable save from Favorites and reload to verify that it stays removed. Give the lead the rebuilt candidate and its reports for acceptance. Hosting and cache checks belong to release promotion.

## Rehearse locally at 375px

```sh
tachi-run --image tachi-run-playwright --out test-results -- sh -ec 'pnpm exec playwright install chromium --only-shell && pnpm build:bundle && pnpm exec playwright test e2e/current-mvp-smoke.spec.ts -g S4-3'
```

The previous release state for this rehearsal is merged revision `7fab3deac861cf0e976cd54c7acaa971c7e95df1`, which includes the S4-2 checker. Playwright fetches that revision into a temporary repository and builds the correction, withdrawal, and rollback candidates before launching Chromium. For rollback it checks out the named revision in a fresh worktree and carries over the withdrawal mechanism and active registry. It writes admission and artifact reports for the withdrawal and rollback under `test-results`. The browser saves the journey in the correction build and reuses one origin through the next two builds. It checks the prior arrival label, MOGU, Story, both Route URL forms, Spot links, and the retained save. It then removes the unavailable save and reloads Favorites.

- [Corrected arrival](evidence/s4/s4-3-correction-ja.png)
- [MOGU after withdrawal](evidence/s4/s4-3-withdrawal-mogu-ja.png)
- [Withdrawn link](evidence/s4/s4-3-withdrawal-link-ja.png)
- [Existing save after withdrawal](evidence/s4/s4-3-withdrawal-save-ja.png)
- [Original arrival after rollback](evidence/s4/s4-3-rollback-ja.png)
- [Favorites after removing the save and reloading](evidence/s4/s4-3-rollback-save-removed-ja.png)
