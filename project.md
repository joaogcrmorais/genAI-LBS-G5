# Project Handover

## Purpose

This repository is the London Business School Generative AI Elective group prototype. It is set up as a secure, maintainable full-stack starter that non-technical group members can continue shaping with Codex.

## Current Architecture

- `client/`: React single-page app built with Vite, TypeScript, Tailwind CSS, React Router, and the Auth0 React SDK.
- `server/`: Node.js Express API built with TypeScript.
- `prisma/`: Prisma schema for PostgreSQL.
- `assets/`: original supplied LBS assets.
- `docs/`: human-readable setup documentation.
- Root `package.json`: workspace scripts, including `npm run dev`.

## Repository Structure

```text
client/
server/
docs/
assets/lbs-logo/
assets/lbs-branding/
prisma/
scripts/
.env
.gitignore
README.md
project.md
AGENTS.md
package.json
```

The original `LBS Logo.jpg` was moved to `assets/lbs-logo/LBS Logo.jpg`. A copy is used by the frontend at `client/src/assets/lbs-logo.jpg`. The original `LBS Brand Guidelines.pdf` was moved to `assets/lbs-branding/LBS Brand Guidelines.pdf`.

## Frontend

The frontend runs at `http://localhost:3000/` and uses strict Vite port configuration so it does not silently switch ports away from the Auth0 local callback URL.

Key files:

- `client/src/main.tsx`
- `client/src/App.tsx`
- `client/src/auth/AuthProvider.tsx`
- `client/src/auth/ProtectedRoute.tsx`
- `client/src/components/AppShell.tsx`
- `client/src/pages/*`
- `client/vite.config.cjs`

Current routes:

- `/`: public landing/status page.
- `/health`: public backend health check page.
- `/dashboard`: Auth0 login plus `user_normal` or `user_admin` permission.
- `/admin`: Auth0 login plus `user_admin` permission.

The final private-only versus public-facing route policy is not decided yet. The current code supports both patterns.

Local note: the Codex sandbox cannot read `C:\Users\joaog`, which Vite's dependency scanner tries to inspect. Running the dev server outside the sandbox works; normal user terminals should not have this sandbox restriction.

## Backend

The backend runs at `http://localhost:3001` and exposes routes under `/api`.

Key files:

- `server/src/server.ts`
- `server/src/config/env.ts`
- `server/src/auth/auth0.ts`
- `server/src/routes/api.ts`
- `server/src/services/openai.ts`

Routes:

- `GET /api/health`: public health response.
- `GET /api/me`: authenticated Auth0 token claims summary.
- `GET /api/normal/check`: requires `user_normal` or `user_admin`.
- `GET /api/admin/check`: requires `user_admin`.
- `GET /api/ai/status`: protected status showing whether backend OpenAI configuration exists.

The backend validates Auth0 JWTs using issuer, audience, and JWKS. It does not trust client-supplied users, roles, emails, or permissions.

## Database And Prisma

Database choice: PostgreSQL.

Prisma schema: `prisma/schema.prisma`.

Initial models:

- `UserProfile`: keyed by Auth0 subject, with optional display name and email for future use.
- `AppEventLog`: safe event log for non-sensitive events.

Migration status: completed. Prisma migration `20260525142609_init` has been applied to the local PostgreSQL database.

`DATABASE_URL` is configured in `.env` and was verified locally without printing its value. PostgreSQL 18 is installed and the `postgresql-x64-18` service is running. The local database is `genai_lbs_g5`.

## Auth0

Auth0 values are read from environment variables. Browser-safe values use `VITE_` names. Server-only values stay without the `VITE_` prefix.

Permission model:

- Public: no token required.
- Normal user: `user_normal` or `user_admin` permission in the verified access token.
- Admin: `user_admin` permission in the verified access token.

The requested non-secret permission variables were added to `.env`:

- `AUTH0_PERMISSION_NORMAL`
- `AUTH0_PERMISSION_ADMIN`

Browser login test status: unauthenticated protected routes attempt Auth0 login, but Auth0 currently returns an error that client `VITE_AUTH0_CLIENT_ID` is not authorised to access the configured API audience. The exact audience value is read from `.env` and was not printed. This is being treated as an Auth0 integration blocker to raise with the professor; it does not block work on public UI, backend structure, database schema, Prisma, OpenAI backend wiring, or non-auth application logic.

## OpenAI

OpenAI SDK configuration exists only in the backend. The frontend never reads `OPENAI_API_KEY`. No paid OpenAI API calls have been added or run.

## Workstream 4 Direction

Workstream 4 now has dedicated planning docs:

- `docs/project-context/event-request-contract.md`
- `docs/project-context/monday-workflow-takeaways.md`
- `docs/project-context/workstream-4-mini-prd.md`
- `docs/project-context/workstream-4-workplan.md`

The latest planning context comes from two Monday.com LLM assistant exports now stored in `docs/monday-llm-responses/`. The exports describe Jo's real `Events and Key Dates 25/26` Monday board, board ID `2008539622`, with about 844 active event items, 47 tracked fields, 7 event categories, 19 filtered views, 38 organising departments, and 109 faculty members. The lifecycle export is incomplete and ends during Phase 3 data-flow detail at `numeric_mm2w8`, so field-level details may change when the full response arrives.

The agreed direction is:

- `POST /api/tiering/classify` should use OpenAI for event tiering because tiering depends on contextual event-planning judgment.
- `POST /api/routing/stakeholder-packets` should use deterministic service logic because it feeds Workstream 3 email and summary generation.
- `POST /api/integrations/monday/build-payload` should remain a deterministic mock payload builder and must not call the real Monday.com API.
- The Monday mock payload should now be planned as a mapping toward Jo's real board shape rather than a generic invented board. It should reference lifecycle status, event category/group, Monday-like columns, review gates, stakeholder tags, links, and subitem task suggestions.
- The tiering endpoint should return either `classified` with user-visible reasoning or `needs_more_information` with explicit questions. It should not return confidence scores or `needs_human_review`.
- Tiering output must be labelled as prototype guidance, not official LBS policy.
- The Wednesday schema-lock milestone should settle the shared `EventRequest` fields needed by Workstream 4, including which Monday-derived fields are intake facts versus downstream integration mapping.
- Current active pre-Wednesday work is the `EventRequest` contract. The proposed direction is that `EventRequest` contains shared intake facts, while tiering, stakeholder packets, generated outputs, and mock integration payloads remain separate service outputs that reference the event request.
- Monday changes the product framing from a one-off intake helper to a lifecycle-aware assistant. Planning now needs to account for ideation, feasibility/business case, detailed planning, editorial/content planning, final pre-event checks, event-day execution, and post-event closure.

Implemented backend contract slice:

- `server/src/schemas/ws4.ts` defines the permissive `EventRequest` v0 input schema and derived WS4 output schemas.
- `EventRequest` now includes Monday-derived lifecycle planning fields such as `event_basics.lifecycle_phase`, `event_basics.monday_status_hint`, `event_basics.registration_link`, optional `actual_attendance`, and a permissive `planning_and_governance` object for business-case, Dean, security, Advancement, editorial, promotion, review-date, and briefing-link metadata.
- `server/src/prompts/tieringPrompts.ts` keeps the tiering classifier and validator prompts in a dedicated editable prompt module.
- `POST /api/tiering/classify` is protected by Auth0 normal-user access and calls the backend-only OpenAI tiering service.
- The tiering service uses a classifier pass plus a validator pass, tells the model to apply baseline tier rules before adding nuance, requires structured JSON, validates the final response with Zod, and preserves the prototype policy disclaimer.
- `POST /api/routing/stakeholder-packets` is protected by Auth0 normal-user access and uses deterministic routing logic only.
- The deterministic stakeholder packet endpoint now covers both the original operational stakeholders and Monday-derived editorial/governance stakeholders: Events Oversight Group, Dean's Office, Editorial Group, Event Promo Group, PR Managers / Communications, Advancement, CC Network, Social Media, Photography, Sponsorship, faculty, and task owners.
- `POST /api/integrations/monday/build-payload` is protected by Auth0 normal-user access and returns a deterministic mock-only Monday.com payload mapped toward `Events and Key Dates 25/26` with board ID hint `2008539622`. It does not call Monday.com.
- The Monday mock payload now includes lifecycle status, Monday-like column categories, review gates, stakeholder tags, links, and subitems for stakeholder follow-up, lifecycle review, and post-event follow-up.
- Current WS4 tests mock OpenAI and cover prompt contract text, classified tiering, missing-information tiering, validator revision, invalid AI JSON handling, deterministic routing scenarios including Monday lifecycle/governance tags, mock Monday payloads, and unauthenticated route protection.
- `npm run test:live:openai` runs the gated live OpenAI classifier test when `RUN_LIVE_OPENAI_TEST=true` is set. It is skipped during normal tests.
- The live OpenAI classifier test was run successfully on 2026-05-26. It sent the real classifier and validator prompts to OpenAI using the configured backend key and validated the final response against the WS4 schema.
- `client/src/pages/Ws4DemoPage.tsx` adds a scrappy protected `/ws4-demo` testing harness with five scenarios, a full editable Event Request form, raw JSON preview, and buttons for auth/API checks, AI status, tiering, stakeholder packets, Monday mock payloads, and the full flow.
- The WS4 demo scenarios and form now include Monday-derived lifecycle/status, registration, actual attendance, faculty, Dean, business-case, security, Advancement, editorial, promotion, review-date, photography, and overview-tag fields so the updated endpoints can be exercised from the UI.
- `docs/project-context/wednesday-discussion-notes.md` captures product/requirements discussion points for Wednesday, with Event Request as the main section.

## Branching And Workstream Coordination

Current active branch:

- `docs/add-monday-llm-outputs`

Use the conventional short-lived feature branch workflow described in `docs/project-context/03_github_setup_and_coordination.md`. The earlier failure to create a slash-style branch was a local filesystem permission issue writing inside `.git`, not a Git naming problem. After running Git with the required permission, `feature/ws4-event-request-contract` was created successfully.

Workstream guidance:

- Keep `main` as the stable shared baseline.
- Use `feature/ws1-intake`, `feature/ws2-post-event`, `feature/ws3-outputs-knowledge`, `feature/ws4-routing-integrations`, or similarly scoped feature branches for new work.
- Merge schema/API contract changes early so other workstreams can branch from a stable shared contract.
- Workstream 1 owns the shared `EventRequest` intake facts object; Workstream 4 owns derived tiering and stakeholder packet outputs; Workstream 3 consumes WS4 packets for generated emails and summaries.
- Workstream 4 should distinguish operational stakeholder routing from Jo's Monday editorial/governance routing. Monday adds first-class planning stakeholders such as Events Oversight Group, Editorial Group, Event Promo Group, Dean's Office, PR Managers, Advancement, CC Network, Social Media, Photography, Sponsorship, faculty, and task owners.
- Pull latest `main` before starting work and before opening pull requests.
- Before opening or merging a PR, verify the feature branch contains the intended work with `git status --short --branch`, `git log --oneline origin/main..HEAD`, and `git diff --stat origin/main..HEAD`.
- In GitHub, review the PR `Files changed` tab and confirm the expected routes, services, schemas, tests, and docs are present before merging.
- After merging, fetch or pull `origin/main`, test the actual merged `main`, and only then delete the feature branch. GitHub's "safe to delete branch" message means the commits in that PR are reachable from `main`; it does not prove later local or unpushed commits were merged.

The WS4 demo temporarily appeared missing because the first merged PR contained the docs/contract slice but not the later WS4 demo/backend commits. The follow-up merge to `main` restored `/ws4-demo`, the WS4 API endpoints, services, schemas, tests, and demo guidance.

## LBS Branding

The supplied LBS logo file is used directly in the React UI. The UI uses a restrained LBS-style blue and red palette and keeps the original logo asset intact.

Brand guidelines are stored in `assets/lbs-branding/` for reference.

## Security, Privacy, AI, And Copyright Safeguards

- `.env` and `.env.*` are ignored by Git.
- No sample/template environment file exists.
- No local backdoor users, mock login routes, demo passwords, or authentication bypasses were created.
- Auth0 permissions are the source of truth for access control.
- Backend error responses avoid stack traces and secret values.
- OpenAI calls are backend-only.
- The database schema avoids storing tokens, API keys, or unnecessary personal data.
- The original LBS logo and brand file are preserved.

## Azure Readiness

The app is structured for later Azure deployment:

- React can be hosted on Azure Static Web Apps, or built and served by the Node service.
- Express can run on Azure App Service.
- PostgreSQL can move to Azure Database for PostgreSQL.
- Auth0, OpenAI, database, and port/origin settings are environment-variable driven.

No Azure deployment has been attempted.

## Local Run

Command:

```powershell
npm run dev
```

Browser URL:

```text
http://localhost:3000/
```

## Test Status

Latest checks:

- `npm install`: completed.
- `npm run typecheck`: passed after WS4 backend implementation.
- `npm run lint`: passed.
- `npm run test`: passed after WS4 backend implementation; backend has 16 passing tests, client has no tests yet.
- `npm.cmd run typecheck`: passed on 2026-05-26 after Monday lifecycle endpoint updates.
- `npm.cmd run test`: passed on 2026-05-26 after Monday lifecycle endpoint updates; backend has 17 passing tests and 1 skipped gated live OpenAI test, client has no tests yet.
- `npm.cmd run lint`: passed on 2026-05-26 after Monday lifecycle endpoint updates.
- `npm run prisma:generate`: passed.
- `npm run prisma:migrate`: passed and applied the initial migration.
- `npm run dev`: passed when launched outside the sandbox; frontend listened on port 3000 and backend listened on port 3001.
- `GET /api/health`: passed.
- Browser test of `http://localhost:3000/`: passed.
- Browser test of `/health`: passed and showed backend status.
- Browser test of `/dashboard`: reached Auth0 flow but returned an Auth0 audience authorization error.
- Browser test of `/ws4-demo`: protected route reached Auth0 login in the in-app browser. The user reported localhost Auth0 login is working in their own admin session after the Auth0 audience change.
- `npm run test:live:openai` with `RUN_LIVE_OPENAI_TEST=true`: passed after tightening the prompt contract to include exact approved output shapes.

Remaining blockers:

- The current terminal still resolves `node` by name to a stale WindowsApps Codex path unless `C:\Program Files\nodejs` is prepended for the process. A fresh terminal should normally resolve the installed Node.js.
- Auth0 must authorize the configured SPA client for the configured API audience before protected route login and permission checks can be fully tested. This has been escalated as an integration blocker.

## Teammate Onboarding Note

The external `INITIAL_CODEX_SETUP_INSTRUCTION.md` has been updated with a Group 5 follow-on setup section. Teammates should clone and read this existing baseline repo instead of creating or scaffolding a new repository, preserve the current architecture, configure only their local `.env`/PostgreSQL/dependencies, run the existing verification commands, and document any local blockers here.

## Next Steps

1. Review the Monday-derived planning synthesis in `docs/project-context/monday-workflow-takeaways.md`.
2. Update the Wednesday schema discussion to decide which Monday lifecycle fields belong in `EventRequest` now and which stay as future Monday mapping.
3. Keep endpoints unchanged until the team explicitly asks for endpoint/schema implementation changes.
4. Have each workstream branch from latest `main` after schema/API contract decisions merge.
5. Fix the Auth0 client/API audience authorization in the Auth0 dashboard before full protected-route browser testing.
