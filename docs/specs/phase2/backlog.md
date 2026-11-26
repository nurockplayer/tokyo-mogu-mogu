# Phase 2 backlog proposal

**Order** · Lead and Owner approval → S1 Jindaiji vertical slice → S2 two-journey discovery → S3 local saves and sharing → S4 release and operations.

The lead can brief S1 from this document after the Owner disposes the [Product decisions](first-release.md#product-decisions-for-the-owner) needed for that stage. The lead files issues and assigns one implementation stage at a time. Each stage starts from the latest approved integration base and records its running-product evidence. Keep candidates local or in approved restricted preview until S4. Confirm the integration branch does not trigger public hosting before moving beyond local preview.

## S1 · Make one cultural trip actionable

| Field | Brief |
| --- | --- |
| Current | `/story/b03-chofu-jindaiji-soba` renders trilingual culture content. Its authored half-day Route has blank station/access fields and its Spot data has pending source statuses. Today Story simulates generation, Route can simulate regeneration and Spot may show an unavailable toast. [Jindaiji record][chofu] · [Flow gaps](gap-audit.md#gaps) |
| Target | In the candidate build, a direct Story link opens a real half-day plan and offers one evidence-backed official next action on a Spot. |
| Scope | Start with `b03-chofu-jindaiji-soba` and the existing authored half-day variant. Use the editor's approved arrival point, ordered stops, estimate, primary Spot and official destination. Keep the existing Story, Route and Spot components. Render a direct “View itinerary” action, label the estimate as on-site, remove simulation for this slice, and show dated source/unknown state beside the primary action. Use ja/en/zh-TW and no-photo state where required. |
| Acceptance on the running product | At 375px, open `/story/b03-chofu-jindaiji-soba` in a fresh session, see the maker/crop connection, open `/route?candidateId=b03-chofu-jindaiji-soba`, then open the primary Spot. Confirm the ordered stops, access guidance, estimate, localized caution and source-date label. The primary CTA opens the editor-reviewed destination. For a second Spot with a missing or expired optional destination, see guidance and no action button, and return to the itinerary. For a candidate build with the primary destination expired, direct entry displays unavailable and offers a way back. In all three languages confirm no generation, successful booking or dietary-safety message on this path. Save actual route/Spot URLs and evidence for the fresh and unavailable states. |
| Dependencies | Lead disposition and Owner approval for D2, D4, D5 and the relevant D6 copy. Editor supplies the dated Jindaiji source pack and identified primary Spot, or the lead waits for admissible inputs. Inspect the connected KiKi Figma for the three affected screens before editing, and record any new design decision. |
| Out of scope | Public cutover, Ome, Result/filter changes, persistence, share, CMS, authentication, live transit and transactions. Preserve other prototype flows in this candidate. |

## S2 · Put two published journeys behind one discovery flow

| Field | Brief |
| --- | --- |
| Current → target | Fixture Result and mixed MOGU → entry and Result/MOGU driven by one approved release catalog, with direct entry and no profile requirement. |
| Scope | D1/D2/D5/D6. Connect release admission to the existing adapter and URL resolver. Add approved Ome data through the same editorial path, cut over Home and discovery, retire scores, faux history and simulated generation. Keep the maker/story/route/spot structure and all three locales. |
| Acceptance on the running product | A fresh user opens either published Story without onboarding. Selecting Chofu versus Ome changes the returned itinerary and reason. A time limit below all available estimates yields an empty state and Clear restores both. Add the second journey through data and evidence changes only. Old demo, unlisted research and invalid/cross-journey deep links cannot reveal hidden content or default to a fixture. Expiring a primary action removes the itinerary from browse and filters. |
| Dependencies | S1, approved decisions and second editorial pack, KiKi inspection for entry/discovery and changed navigation. |
| Out of scope | More regions, recommendations based on profiles, personalized history, external integrations. |

## S3 · Make a plan easy to reopen and share

| Field | Brief |
| --- | --- |
| Current → target | Best-effort saves and site-root sharing → truthful same-browser saves, reset and exact itinerary links. |
| Scope | D3/D6. Preserve compatible local IDs, retire account/profile affordances and unused dietary collection, and remove the legacy auth dependency from the public flow. Support save/stale/unsave/reset and canonical sharing with localized failure recovery. |
| Acceptance on the running product | Save a journey and a Spot, reload, reopen and remove each independently. Import an approved legacy route on the same origin and show an unavailable saved item for a withdrawn ID. With browser writes blocked, retain browsing and show save/reset failure without success feedback. With writes enabled, reset and reload to empty saves and defaults. A share from one browser opens the same itinerary in a clean browser without visitor data in the URL. Cancel/fail a share and recover via a selectable link. |
| Dependencies | S2, stable release IDs, approved persistence scope and KiKi inspection of Favorites, My and share. |
| Out of scope | Accounts, sync, save transfer across origins, offline app and behavioural analytics. |

## S4 · Prove release and editorial operations

| Field | Brief |
| --- | --- |
| Current → target | Prototype checks and hosted deploy → approved trilingual artifact, named operator and a demonstrated correction/withdrawal cycle. |
| Scope | Inspect emitted assets and all public route/alias entry points, verify expiry and HTTPS handoffs, audit hosting/cache/privacy and rehearsals, and complete the [traveller and safety gates](first-release.md#editorial-operations-and-release-criteria). |
| Acceptance on the running product | In the release candidate, complete both trips in all locales and exercise blocked storage, wrong IDs, missing actions, narrow/wide layout, keyboard, screen reader and reduced motion. Demonstrate a data-only correction followed by urgent withdrawal, then verify that reload, shared links and rollback do not resurface withdrawn material on supported public URLs. Record traveller trials and editorial receipts. After Owner launch approval, check the production catalog and a deep link on the promoted build. |
| Dependencies | S3, completed rights and content review, named editor and deployment operator, approved publication and rollback controls. |
| Out of scope | Partner portal, live availability, payments, bookings and Tokyo-wide expansion. |

[chofu]: https://github.com/nurockplayer/tokyo-mogu-mogu/blob/926e686/src/data/journey-records/b03-chofu-jindaiji-soba.ts#L4-L39
