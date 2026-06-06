# Project Handover

## Purpose

This repository is the London Business School Generative AI Elective group prototype.

The current product is the Event Readiness Assistant: a student-facing LBS event planning assistant that helps a club organiser complete a structured `EventRequest` / Space Request Form draft, generate a Space Request DOCX, and assess deterministic Key Event candidacy when enough confirmed information is available.

## Current Product Direction

Current source-of-truth planning lives in:

- `lbs-files/PLAN.md`
- `docs/project-context/product-brief.md`
- `docs/project-context/05_ws1_pains_jtbd_features_epics_user_stories.md`
- `docs/project-context/06_user_view_prd_phase1_event_readiness_assistant.md`
- `docs/project-context/event_readiness_assistant_phase_1_conversation_rules_spec.md`
- `docs/project-context/key_event_identification_spec.md`

Historical/supplanted planning files have been moved to `docs/project-context/historical-supplanted/` and are no longer source of truth.

The old four technical workstream split is obsolete. João is the only technical delivery owner, with Codex as the technical build partner.

Phase 1 creates a fully populated `EventRequest` object using the official field source in `lbs-files/raw/request-event/CribSheet - Copy.docx`. The generated Space Request output should be DOCX and include all of the same fields, though it does not need to match the original visual formatting.

Current Phase 1 ends at:

- complete `EventRequest` / Space Request field coverage;
- source-data guidance for toolkit shaping, finance, space, catering, policy, security, and timeline implications;
- Space Request DOCX generation;
- deterministic Key Event assessment when existing EventRequest facts are sufficient.

The first post-Phase-1 backend QA implementation now exists as a proof-of-concept testing surface. It treats the completed flat Phase 1 `EventRequest` as the source of truth and generates deterministic Key Event assessment, EIS draft, real LBS stakeholder routing, editable stakeholder email drafts, timeline/checklist guidance, optional OpenAI complexity/risk classification, and a mock-only Monday payload.

Important rules:

- `docs/project-context/key_event_identification_spec.md` is the sole deterministic source for Key Event categorisation.
- Finance-code lookup must be surfaced whenever budget is involved, and finance codes may be shown to users.
- Space lookup should use `lbs-files/raw/space/Space Matrix (1) - Copy.xlsx` first, with fallbacks only when needed.
- Pasted text/manual draft material is handled by the normal conversational loop, not as a standalone epic.
- In-chat form preview is post-MVP; users can review the generated DOCX.
- For demo/testing, Space Request DOCX download should remain available for incomplete drafts; missing or uncertain fields must be visibly marked in the generated DOCX rather than blocking download.
- No automatic form submission, email sending, real Monday API call, web speaker lookup, or write-back to LBS systems is in scope.

## Current Architecture

- `client/`: React single-page app built with Vite, TypeScript, Tailwind CSS, React Router, and Auth0 React SDK.
- `server/`: Node.js Express API built with TypeScript.
- `prisma/`: Prisma schema for PostgreSQL.
- `assets/`: original supplied LBS assets.
- `docs/`: human-readable setup and project documentation.
- `lbs-files/`: raw and planned processed LBS event-planning data.
- Root `package.json`: workspace scripts, including `npm run dev`.

The supplied LBS logo is preserved in `assets/lbs-logo/LBS Logo.jpg` and copied into `client/src/assets/lbs-logo.jpg` for the UI. The supplied brand guidelines are stored in `assets/lbs-branding/LBS Brand Guidelines.pdf`.

## Local Development

Root command:

```powershell
npm run dev
```

Frontend URL:

```text
http://localhost:3000/
```

Backend URL:

```text
http://localhost:3001
```

Do not silently change the frontend port because Auth0 is configured for `http://localhost:3000/`.

## Frontend

Current routes:

- `/`: public landing/status page.
- `/health`: public backend health check page.
- `/dashboard`: protected by Auth0 login plus `user_normal` or `user_admin`.
- `/admin`: protected by Auth0 login plus `user_admin`.
- `/event-readiness-demo`: protected current-scope Phase 1 validation surface for E-01 through E-06.
- `/event-readiness-post-phase1-demo`: protected internal QA surface for post-Phase-1 backend outputs using complete EventRequest fixtures.
- `/ws4-demo`: historical protected demo harness from the previous WS4 prototype slice.

The `/ws4-demo` route and related files may be reused or replaced during the new epic-by-epic build, but they should not define current product scope by themselves.

Current scope reset note as of 2026-06-03:

- The historical WS4 `EventRequest` shape and historical tiering/routing/Monday endpoints are no longer authoritative for the Event Readiness Assistant.
- They may be mined for useful implementation ideas, but new MVP work should use the active processed CribSheet/EventRequest artifacts and new `event-readiness` backend contract.
- The first current-scope frontend validation URL is `/event-readiness-demo`.

## Backend

The backend exposes routes under `/api`.

Current notable routes:

- `GET /api/health`
- `GET /api/me`
- `GET /api/normal/check`
- `GET /api/admin/check`
- `GET /api/ai/status`
- `GET /api/event-readiness/bootstrap`
- `POST /api/event-readiness/event-request/evaluate`
- `POST /api/event-readiness/chat`
- `POST /api/event-readiness/space-request-docx`
- `GET /api/event-readiness/post-phase1/bootstrap`
- `POST /api/event-readiness/post-phase1/run`
- historical WS4 routes for tiering, stakeholder packets, and Monday mock payloads

The new Event Readiness endpoints are the active Phase 1 contract. The `/api/event-readiness/chat` endpoint is the current chatbot testing contract: OpenAI interprets organiser messages and proposes field updates, then deterministic coverage/readiness logic evaluates the resulting `EventRequest`. The current contract also exposes source guidance, deterministic Key Event assessment, and Space Request DOCX generation. The historical WS4 routes remain present for now, but are not source-of-truth product endpoints.

The post-Phase-1 endpoints are a new POC/testing contract, not the historical WS4 contract. They use complete flat Phase 1 EventRequests from `lbs-files/processed/examples/post_phase1_event_requests.json`, route stakeholders from converted LBS lifecycle/routing/contact sources, draft emails without sending, and allow OpenAI risk classification to be skipped so deterministic outputs remain reliable for demo use.

Current Event Readiness chat behaviour notes:

- The chat should behave like it has full current-session memory. Each organiser message should be mined for any official CribSheet field it can fill, even when the organiser was answering a different question.
- The assistant should ask 3-5 broad, themed questions when many fields are missing, and fewer only when the remaining blocker is narrow.
- Repetitive note-taking openers such as "I noted" / "I've captured" should be avoided.
- Catering and alcohol remain separate official fields for DOCX compatibility, but should be handled as one conversational food-and-drink topic.
- Source-backed guidance should be used in the chat turn when relevant, including room matches, finance-code next steps, catering/alcohol policy, and timeline implications.
- Ordinary alumni/career/product/mixer topics should not trigger political/controversial confirmation unless the organiser gives a real sensitivity signal.
- Concrete organiser-provided facts should be marked final or best-estimate, not `needs_confirmation`; use `needs_confirmation` only when the organiser explicitly says they need to check or do not know.
- Low-probability miscellaneous fields such as children, decorations, recorded/live music, cloakroom, hired equipment, and filming should be bundled and/or auto-closed as not present when the organiser gives no indication they apply.
- When deterministic `next_questions` is empty and Phase 1 is ready, the assistant should stop asking follow-ups and tell the organiser the Space Request DOCX draft is the next step.

OpenAI SDK configuration exists only in the backend. The frontend must never read `OPENAI_API_KEY`.

## Database And Prisma

Database choice: PostgreSQL.

Prisma schema: `prisma/schema.prisma`.

Initial models:

- `UserProfile`: keyed by Auth0 subject, with optional display name and email.
- `AppEventLog`: safe event log for non-sensitive events.

The initial migration `20260525142609_init` has been applied locally.

The processed runtime-data migration `20260603214402_add_processed_runtime_data` has also been applied locally.

Processed runtime data has been loaded into PostgreSQL with `npm.cmd run data:load`.

Latest loaded counts:

- `ProcessedDataSource`: 7
- `KnowledgeChunk`: 115
- `RuntimeLookupRecord`: 12047
- `RuntimeRule`: 34
- `EventScenario`: 11
- `OutputTemplate`: 8

## Auth0

Auth0 is the only authentication approach.

Permission model:

- Public: no token required.
- Normal user: `user_normal` or `user_admin`.
- Admin: `user_admin`.

Backend checks are authoritative. Frontend checks are only for user experience.

Known Auth0 blocker: protected route login previously reached Auth0 but returned an audience authorization error for the configured SPA client/API audience. This must be corrected in Auth0 before protected routes can be fully tested.

## Data And Source Files

Raw files live in `lbs-files/raw/`.

Raw XLSX/DOCX/PDF/PPTX files remain source-of-truth backups. The app should use processed CSV/JSON/Markdown/DOCX templates or PostgreSQL tables at runtime, not raw Office/PDF parsing in normal chatbot flow.

Processed files now live in `lbs-files/processed/`, including deterministic lookup data, retrieval chunks, output templates, schemas, example/test scenarios, routing rules, timeline rules, and Monday mock payload structure.

`[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf` remains the most authoritative toolkit source. `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md` is now stored in the repo as its authoritative parsed markdown companion, supplied by Joao after ChatGPT parsed the PDF. Current processed toolkit chunks come from that parsed markdown file, not from the older PPTX proxy.

Known conversion limitation: direct local PDF text extraction is not available in this workspace yet. The Hospitality Brochure PDF currently has a placeholder extraction record.

## Security, Privacy, AI, And Copyright Safeguards

- `.env` and `.env.*` are ignored by Git.
- The repo `.gitignore` includes explicit recursive `.env`, `.env.*`, `.envrc`, credential, token, and secret patterns.
- The local machine's Git global excludes file is configured to `C:\Users\joaog\.gitignore_global` because Git could not access the default `C:\Users\joaog\.config\git\ignore` path.
- Do not create sample/template environment files.
- Do not commit `.env` or secret-bearing files.
- No local backdoor users, mock login routes, demo passwords, or authentication bypasses should be created.
- Auth0 permissions are the source of truth for access control.
- Backend error responses should avoid stack traces and secret values.
- OpenAI calls must remain backend-only.
- The database schema should avoid storing tokens, API keys, or unnecessary personal data.
- The original LBS logo and brand files must be preserved.

## Historical Implementation Notes

The repo currently contains historical WS4 prototype code for:

- OpenAI-backed tiering/classification;
- deterministic stakeholder packet generation;
- deterministic Monday.com mock payload generation;
- a protected `/ws4-demo` UI harness.

This work may be reused for post-Phase-1 outputs, but it is not the current product plan or workstream structure. Historical planning docs are in `docs/project-context/historical-supplanted/`.

## Test Status

Latest recorded checks:

- `npm.cmd --workspace @lbs-genai/client run typecheck`: passed on 2026-06-06 after the Event Readiness MVP frontend rebuild; initial `npm` PowerShell invocation was blocked by local execution policy, so the check was rerun with `npm.cmd`.
- `npm.cmd --workspace @lbs-genai/client run lint`: passed on 2026-06-06 after the Event Readiness MVP frontend rebuild.
- `npm.cmd --workspace @lbs-genai/client run test`: passed on 2026-06-06 with the existing no-op client test script.
- `npm.cmd --workspace @lbs-genai/client run build`: passed on 2026-06-06 after rerunning outside the sandbox because Vite config loading hit a sandbox access error.
- `npm.cmd --workspace @lbs-genai/server run test`: passed on 2026-06-05 after adding post-Phase-1 fixtures, deterministic Key Event assessment, real-contact stakeholder routing, stakeholder email drafts, EIS draft, timeline/checklist, mock Monday payload, optional OpenAI risk fallback, and route auth checks; backend had 44 passing tests and 1 skipped gated live OpenAI test.
- `npm.cmd run typecheck`: passed on 2026-06-04 after adding Event Readiness session-memory extraction, broader chat prompting, source-guidance prompt context, food/drink grouping, and incomplete-draft DOCX download support.
- `npm.cmd run lint`: passed on 2026-06-04 after adding Event Readiness session-memory extraction, broader chat prompting, source-guidance prompt context, food/drink grouping, and incomplete-draft DOCX download support.
- `npm.cmd run test`: passed on 2026-06-04; backend had 36 passing tests and 1 skipped gated live OpenAI test, client had no tests yet.
- `npm.cmd run typecheck`: passed on 2026-06-04 after implementing Phase 1 E-03 through E-06 source guidance, DOCX generation, Key Event assessment, QA checklist, and OpenAI contract retry.
- `npm.cmd run lint`: passed on 2026-06-04 after implementing Phase 1 E-03 through E-06 source guidance, DOCX generation, Key Event assessment, QA checklist, and OpenAI contract retry.
- `npm.cmd run test`: passed on 2026-06-04; backend had 32 passing tests and 1 skipped gated live OpenAI test, client had no tests yet.
- `npm.cmd run typecheck`: passed on 2026-06-04 after tightening Event Readiness chat guidance and deterministic field handling.
- `npm.cmd run lint`: passed on 2026-06-04 after tightening Event Readiness chat guidance and deterministic field handling.
- `npm.cmd run test`: passed on 2026-06-04; backend had 25 passing tests and 1 skipped gated live OpenAI test, client had no tests yet.
- `npm.cmd run typecheck`: passed on 2026-06-03 after adding the first Event Readiness backend/frontend validation slice.
- `npm.cmd run lint`: passed on 2026-06-03 after adding the first Event Readiness backend/frontend validation slice.
- `npm.cmd run test`: passed on 2026-06-03; backend had 22 passing tests and 1 skipped gated live OpenAI test, client had no tests yet.
- `powershell -NoProfile -ExecutionPolicy Bypass -File scripts\convert-lbs-files.ps1`: passed on 2026-06-03.
- `npm.cmd run data:load`: passed on 2026-06-03 and loaded processed runtime data into PostgreSQL.
- Generated JSON/JSONL parse check: passed on 2026-06-03.
- Generated DOCX template zip integrity check: `space_request_form_template.docx` and `eis_template.docx` opened successfully on 2026-06-03.

Latest recorded app checks from prior implementation work:

- `npm.cmd run typecheck`: passed on 2026-05-30.
- `npm.cmd run lint`: passed on 2026-05-30.
- `npm.cmd run test`: passed on 2026-05-30; backend had 17 passing tests and 1 skipped gated live OpenAI test, client had no tests yet.

No app lint/typecheck/test suite was run for the latest data-conversion update because no app logic changed.

## Current Next Steps

1. Validate the new protected `/` and `/event-readiness-mvp` Event Readiness Assistant frontend on `http://localhost:3000/` with both scripted Monday demo scenarios.
2. Validate free-form chat against `/api/event-readiness/chat` and confirm the Auth0 audience configuration allows protected-route testing.
3. Validate Space Request DOCX downloads, the failsafe Force DOCX generation button, EIS markdown download, stakeholder drawer copy/mailto actions, and restart/reset behavior.
4. Work through `backlog.md`, especially the P0 EIS DOCX endpoint and full backend-driven conversation replacement.
