# Project Handover

## Purpose

This repository is the London Business School Generative AI Elective group prototype.

The current product is the Event Readiness Assistant: a student-facing LBS event planning assistant that first helps a club organiser complete a structured `EventRequest` / Space Request Form draft, then uses that event object to generate downstream planning outputs.

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

Phase 1 creates a fully populated `EventRequest` object using the official updated field source in `lbs-files/raw/request-event/Event form - Space Request Form.docx`. `lbs-files/raw/request-event/LBS Crib Sheet_AMC.docx` is a completed example used for mapping and test values, not the field source. The generated Space Request output should be DOCX and include all of the same fields, though it does not need to match the original visual formatting.

Space Request DOCX generation may proceed with declaration fields marked `needs_confirmation`. After generation, the UI should show the download link followed by the declarations that apply when the organiser sends the form to `space@london.edu`.

After Phase 1, the core MVP should use the completed `EventRequest` to produce:

- deterministic Key Event assessment;
- Key Event / EIS recommendation;
- full SA Operations / Eventscase email draft to `saoperations@london.edu`;
- timeline/checklist display;
- OpenAI-backed preliminary complexity/risk flags for LBS staff;
- Monday.com-ready mock JSON payload.

EIS-style drafting and stakeholder routing are MVP stretch. Broader stakeholder email drafting is stretch / V2 unless templates and stakeholder expectations are confirmed.
The Eventscase email draft is generated or noted with the Space Request output only when Audience includes anything besides `Current students` and `Children (Under 18s)`. Student admin names and LBS emails are optional Eventscase email fields, not official Space Request fields.

Important rules:

- `docs/project-context/key_event_identification_spec.md` is the sole deterministic source for Key Event categorisation.
- Finance-code lookup must be surfaced whenever budget is involved, and finance codes may be shown to users.
- Space lookup should use `lbs-files/raw/space/Space Matrix (1) - Copy.xlsx` first, with fallbacks only when needed.
- The MVP uses pasted text/manual input for existing drafts, not document upload.
- In-chat form preview is post-MVP; users can review the generated DOCX.
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
- `/ws4-demo`: historical protected demo harness from the previous WS4 prototype slice.

The `/ws4-demo` route and related files may be reused or replaced during the new epic-by-epic build, but they should not define current product scope by themselves.

## Backend

The backend exposes routes under `/api`.

Current notable routes:

- `GET /api/health`
- `GET /api/me`
- `GET /api/normal/check`
- `GET /api/admin/check`
- `GET /api/ai/status`
- historical WS4 routes for tiering, stakeholder packets, and Monday mock payloads

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

1. Start Epic 1 in a fresh session.
2. Build against the processed files and PostgreSQL runtime-data tables.
3. For each epic, provide a frontend test/demo surface with predetermined event scenarios, editable form fields where relevant, visible `EventRequest` population, OpenAI reasoning via backend, user stories, and checklist-style acceptance criteria.
