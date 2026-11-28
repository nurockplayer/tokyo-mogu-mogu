# S4-3 · Correct, withdraw and roll back a release candidate

Work on a candidate branch. Keep a reference to the previous accepted source revision and the current [withdrawal registry](../../../src/data/journey-withdrawals.ts).

1. **Correct a fact.** Edit the journey record under `src/data/journey-records/` (and its locale values where applicable). Update its `facts` and `sources` as needed and record the supporting URL and JST retrieval date in the existing batch evidence under `docs/data-evidence/regions/`. Retain stable journey, Story, Route and Spot IDs. Run `pnpm data:journey-admission` and rebuild with `pnpm build`. In the local preview, check that the record remains admitted and displays the corrected value.
2. **Withdraw a journey.** Add its journey ID, reason and JST timestamp to `journeyWithdrawals` in the registry. Rebuild the report and candidate. The report must show `<journey-id> excluded — withdrawn` for a previously passing record. At 375px, check that MOGU omits it, previously working Story, Route and journey Spot links show the localized unavailable screen, and an existing save on the same origin shows unavailable and can be removed.
3. **Roll back with the withdrawals intact.** Start from the previous accepted source revision in a separate worktree and copy forward the complete current registry. If that revision predates the registry, carry forward the admission gate and its reporting as well. Build a fresh artifact with those inputs. Rerun admission and the same browser checks against the rollback candidate. Verify a restored fact on an unaffected journey and that every active withdrawal that exists in the rollback catalog stays excluded. Give the lead the rebuilt candidate and its admission report for acceptance. Hosting and cache checks belong to release promotion.

## Rehearse locally at 375px

```sh
tachi-run --image tachi-run-playwright --out test-results -- sh -ec 'pnpm exec playwright install chromium --only-shell && pnpm build:bundle && pnpm exec playwright test e2e/current-mvp-smoke.spec.ts -g S4-3'
```

The smoke case uses two admitted records at a fixed evidence date. Temporary build overrides change the first Route's arrival label, then withdraw the second journey after saving it in the app. The rollback build restores the arrival label and reuses the active withdrawal. The same browser origin retains the save across all three builds. Playwright checks MOGU, the Story URL, both Route URL forms, the journey's Spot links, and Favorites after withdrawal and rollback.

The 375px Japanese run passed on 2026-11-28 at 09:14 JST.

- [Corrected arrival](evidence/s4/s4-3-correction-ja.png)
- [MOGU after withdrawal](evidence/s4/s4-3-withdrawal-mogu-ja.png)
- [Withdrawn link](evidence/s4/s4-3-withdrawal-link-ja.png)
- [Existing save after withdrawal](evidence/s4/s4-3-withdrawal-save-ja.png)
- [Original arrival after rollback](evidence/s4/s4-3-rollback-ja.png)
