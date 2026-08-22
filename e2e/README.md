# Browser acceptance authority

Issue #276 replaced the previous frontend choreography with the deployed
Netlify experience as the visible UX authority. The browser gate is therefore
`issue-276-netlify-parity.spec.ts`, which covers:

- the complete progressive Food Profile conversation and its exact delays;
- the authoritative five-step Exploration sequence;
- Result → Story → 2.2-second route generation → Route → Spot;
- 375px overflow/action checks for ja, en, and zh-TW;
- trace/video output and opt-in sequential screenshot evidence.

The removed pre-#276 browser specs asserted superseded question orders,
automatic-advance behavior, route identities, modal interaction models, and
screen composition. Durable data, persistence, i18n, and reusable Product
scope contracts continue to be covered by the Vitest suite.
