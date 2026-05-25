# Event Readiness Assistant: Architecture and 4-Workstream Build Plan

Version: 3 — LBS Codex-compliant  
Date: 2026-05-25  
Status: Working baseline for build coordination  
Supersedes: `02_architecture_workstreams_plan_v2_4_streams.md`

---

## 0. Governing Principle

The official **LBS Codex Prototype Project Setup Guide** and the active `INITIAL_CODEX_SETUP_INSTRUCTION.md` override this document wherever there is a conflict.

This v3 plan updates the earlier 4-workstream architecture so that the project remains compliant with the official LBS setup requirements while preserving the team’s core product direction: an AI-powered event readiness and orchestration prototype for LBS student club events.

The team may simplify product scope, but must not simplify or bypass the official technical setup, authentication, secret-handling, data-safety, or documentation requirements.

---

## 1. Project Purpose

The Event Readiness Assistant is a prototype AI-powered event readiness and orchestration assistant for London Business School student club events.

The sponsor problem is that LBS receives many event requests, but event intake is often manual, inconsistent, and spread across fragmented processes. Student organisers often do not know:

- what information to provide,
- which LBS teams to contact,
- what lead times apply,
- what forms are needed,
- when an event should be escalated,
- or how to turn a rough event idea into an operationally useful event package.

The product should help a student organiser move from an uncertain event idea to a structured event readiness package that LBS stakeholders can actually use.

The prototype is **not just a chatbot** and **not just a form**. It is an intake and orchestration layer.

---

## 2. Biggest Recommendation for the Team

Build a coherent, end-to-end, thin vertical slice before polishing isolated modules.

A basic but connected flow is better than four polished but disconnected demos.

The demo should show how one shared event object can feed:

1. student-facing intake,
2. missing-information checks,
3. risk/tier classification,
4. stakeholder routing,
5. generated crib sheet / EIS-style outputs,
6. draft stakeholder emails,
7. Jo/internal operations summary,
8. Monday.com-ready mock integration JSON,
9. and post-event feedback / handover capture.

If a feature does not strengthen that demo, cut or defer it.

---

## 3. LBS-Compliant Technical Architecture

The official setup requires the following architecture:

- **Frontend:** React single-page application.
- **Frontend build tooling:** Vite.
- **Frontend language:** TypeScript.
- **Frontend styling:** Tailwind CSS.
- **Frontend routing:** React Router.
- **Authentication:** Auth0 React SDK on the frontend, Auth0 JWT validation on the backend.
- **Backend:** Node.js API service, preferably Express with TypeScript.
- **Backend API structure:** routes under `/api`.
- **Database:** PostgreSQL.
- **Database layer:** Prisma.
- **AI access:** OpenAI API calls through the backend only.
- **Deployment readiness:** Azure-ready structure.
- **Documentation:** `project.md` must always describe the current state of the project and be updated after meaningful changes.

### Required local ports

- Frontend: `http://localhost:3000/`
- Backend: `http://localhost:3001`

The Auth0 local application has already been configured for `http://localhost:3000/`, so the frontend must not silently switch ports.

### Required repository structure

The official setup instruction expects a simple structure that non-technical students can understand:

```txt
repo-root/
  client/                 React/Vite frontend
  server/                 Node.js backend
  docs/                   Human-readable documentation
  assets/                 Shared source assets, including original LBS logo and branding files
  prisma/                 Prisma schema and migrations, unless placed under server/prisma for a clear reason
  .env                    Local-only secrets and configuration; must not be committed
  .gitignore              Must prevent secrets and generated files from being committed
  README.md               Student-facing local run guide
  project.md              Current project handover document
  AGENTS.md               Stable instructions for future Codex sessions
  package.json            Root scripts, including npm run dev
```

This structure replaces the earlier monorepo-style `apps/` and `packages/` proposal. The project can still use shared TypeScript files, but they should live in a structure compatible with the official setup, such as:

```txt
server/src/domain/
server/src/routes/
server/src/services/
server/src/integrations/
server/src/types/
client/src/
docs/
assets/
prisma/
```

Do not force a monorepo layout if Codex has already created the official `client/` and `server/` structure.

---

## 4. Non-Negotiable Compliance and Safety Rules

The project must not include:

- custom username/password login,
- hardcoded demo users,
- hidden login bypass routes,
- mock login routes,
- development-only authentication bypasses,
- frontend OpenAI API calls,
- committed `.env` files,
- committed API keys, tokens, passwords, or connection strings,
- raw access token storage,
- unnecessary personal data storage,
- fake routes that pretend to work while hiding missing implementation,
- or use of real personal, confidential, student, staff, applicant, or internal LBS operational data unless explicitly authorised.

The project may include:

- genuine health checks,
- configuration-error messages that do not leak secrets,
- labelled sample data for UI demonstration,
- mock Monday.com-ready payload generation,
- and simple prototype workflows using synthetic examples.

### Environment files

The instructor-provided `.env` is local only and must remain in the repo root. It must not be committed.

The active setup instruction says **do not create sample, template, or placeholder environment files**. Therefore, unlike earlier plans, this project should not create `.env.example` unless the instructor later changes the rule.

Expected variable names include:

```txt
VITE_AUTH0_DOMAIN
VITE_AUTH0_CLIENT_ID
VITE_AUTH0_AUDIENCE
VITE_API_BASE_URL
VITE_APP_ORIGIN
AUTH0_DOMAIN
AUTH0_AUDIENCE
AUTH0_ISSUER_BASE_URL
CLIENT_ORIGIN
PORT
DATABASE_URL
OPENAI_API_KEY
AUTH0_PERMISSION_NORMAL
AUTH0_PERMISSION_ADMIN
```

Permission values:

```txt
AUTH0_PERMISSION_NORMAL=user_normal
AUTH0_PERMISSION_ADMIN=user_admin
```

---

## 5. Authentication and Permissions

Authentication must route through Auth0 only.

The app must support:

- public pages,
- authenticated user pages,
- normal-user pages requiring `user_normal` or `user_admin`,
- and admin-only pages requiring `user_admin`.

The final route-access policy depends on the product decision:

- If the app is private-only, unauthenticated visitors should be sent directly to Auth0 Universal Login.
- If the app has public-facing pages, public routes should load without forcing login and login/logout buttons should appear where useful.

Backend permission checks are the authority. Frontend permission checks can improve the UI, but must not be trusted as the source of truth.

The backend must validate Auth0 JWTs using the issuer/JWKS approach and read permissions from the verified token’s `permissions` claim.

---

## 6. Database and Persistence

Use PostgreSQL with Prisma as required by the official setup.

Earlier plans proposed local JSON first. That is no longer the baseline. Sample JSON may still be used for fixtures and UI demonstration, but the app architecture should include a real PostgreSQL + Prisma layer.

The first database schema should remain simple. Do not over-design the full domain model before the team finalises the product flow.

A sensible first database layer may include:

- `UserProfile`, keyed by Auth0 subject,
- `AppEventLog`, for safe non-sensitive audit/development events,
- `EventRequest`, once the team freezes the event schema,
- `GeneratedOutput`, once output generation stabilises,
- and possibly `PostEventFeedback` for the institutional-memory workstream.

Do not store:

- raw access tokens,
- API keys,
- unnecessary personal data,
- sensitive guest/speaker details beyond what is needed for the prototype,
- or real confidential LBS operational data.

---

## 7. Updated Product MVP Scope

The MVP remains a thin but convincing vertical slice.

### MVP user story

A student organiser arrives with a rough event idea. The assistant asks clarifying questions, structures the event request, identifies missing information, classifies complexity and risk, recommends next steps, generates useful outputs, and creates a machine-readable integration payload for future stakeholder systems such as Monday.com.

### MVP input examples

The system should be able to capture:

- event name or working title,
- club or organising group,
- event description or rough idea,
- date or target date range,
- expected attendance or uncertainty range,
- audience type: internal, external, alumni, corporate, public, VIP, mixed,
- speaker details if known,
- venue preference or space needs,
- catering needs,
- alcohol needs,
- AV / streaming / recording needs,
- sponsorship / booths / external supplier needs,
- budget uncertainty or budget estimate,
- organiser contact details,
- whether the event may be recurring or based on a previous edition.

### MVP processing

The system should:

- convert natural-language intake into a structured event object,
- detect missing information,
- infer likely stakeholders,
- infer likely event tier / complexity level,
- flag escalation triggers,
- generate a planning timeline,
- generate student-facing next steps,
- generate stakeholder-facing summaries,
- generate draft emails,
- generate a Jo/internal operations summary,
- generate a post-event feedback request or handover template,
- generate a future-ready JSON payload that could later be sent to Monday.com or another orchestration layer.

### MVP outputs

Minimum outputs for the demo:

1. **Student Event Readiness Summary**
2. **Structured Event Object**
3. **Generated Event Package** — crib sheet / EIS-style summary depending on complexity
4. **Stakeholder Routing Summary**
5. **Draft Stakeholder Emails**
6. **Timeline / Checklist**
7. **Risk / Escalation Flags**
8. **Monday.com-Ready Mock Payload**
9. **Post-Event Feedback / Handover Template**

---

## 8. What Can Still Be Cut or Deferred

The following may still be deferred if time is tight:

- real Monday.com API integration,
- real Microsoft integration,
- full RAG pipeline,
- full document upload parsing,
- PDF/DOCX export,
- polished dashboard,
- advanced analytics,
- production-grade role management beyond Auth0 permissions,
- complex multi-tenant permissions,
- and full historical event memory.

The following should **not** be cut:

- Auth0 authentication path,
- backend Auth0 JWT validation,
- backend-only OpenAI access,
- PostgreSQL + Prisma setup,
- `.env` protection,
- `project.md` maintenance,
- actual LBS logo usage,
- LBS branding guidance,
- sample/synthetic-data-only defaults,
- and clear human-review / uncertainty messaging.

---

## 9. Shared Event Schema Principle

The shared event object remains the most important coordination mechanism.

No workstream should invent a separate event object that cannot be mapped back to the shared schema.

In the official repo structure, the shared schema should probably live in the backend first, then be shared with the frontend if Codex sets up a safe import path.

Possible locations:

```txt
server/src/types/event-request.ts
server/src/types/routing.ts
server/src/types/generated-output.ts
server/src/types/integrations.ts
```

or, if Codex sets up a shared folder safely:

```txt
shared/types/event-request.ts
shared/types/routing.ts
shared/types/generated-output.ts
shared/types/integrations.ts
```

The team should decide the final location after seeing the actual Codex-generated structure.

### v0 EventRequest shape

This is the conceptual schema the team should converge on. It can be implemented in TypeScript, Zod, and eventually Prisma once stabilised.

```json
{
  "event_id": "evt_demo_001",
  "created_at": "2026-05-25T12:00:00Z",
  "updated_at": "2026-05-25T12:00:00Z",
  "status": "draft",
  "organizer": {
    "name": "",
    "email": "",
    "club_or_department": "",
    "role": "",
    "deputy_name": "",
    "deputy_email": ""
  },
  "event_basics": {
    "title": "",
    "description": "",
    "purpose": "",
    "event_type": "panel | conference | workshop | networking | social | speaker | other",
    "is_recurring": false,
    "previous_event_reference": "",
    "target_date": "",
    "start_time": "",
    "end_time": "",
    "is_multi_day": false,
    "expected_attendance": null,
    "attendance_confidence": "unknown | estimate | hard_max",
    "audience_types": ["students"],
    "external_audience": false
  },
  "space_and_setup": {
    "space_confirmed": false,
    "preferred_space": "",
    "space_requirements": "",
    "layout_preference": "",
    "needs_booths": false,
    "number_of_booths": null,
    "needs_cloakroom": false,
    "needs_signage": false,
    "setup_notes": ""
  },
  "catering": {
    "needs_catering": false,
    "catering_style": "none | refreshments | buffet | plated | reception | bespoke | unknown",
    "needs_alcohol": false,
    "dietary_requirements_known": false,
    "external_caterer": false,
    "catering_notes": "",
    "budget_estimate": null
  },
  "av_and_tech": {
    "needs_av": false,
    "microphones": false,
    "projector_or_screen": false,
    "recording": false,
    "livestreaming": false,
    "hybrid": false,
    "complex_av": false,
    "av_notes": ""
  },
  "speakers_and_guests": {
    "has_external_speakers": false,
    "speakers": [
      {
        "name": "",
        "organization": "",
        "role_title": "",
        "is_vip": false,
        "is_politically_sensitive": false,
        "requires_security_review": false
      }
    ],
    "vip_or_embassy_presence": false,
    "media_expected": false,
    "guest_list_required": false
  },
  "sponsorship_and_external_parties": {
    "has_sponsors": false,
    "sponsor_names": [],
    "has_external_vendors": false,
    "vendor_notes": "",
    "requires_booth_or_branding": false
  },
  "risk_and_tiering": {
    "proposed_tier": "tier_1 | tier_2 | tier_3 | unknown",
    "risk_score": null,
    "risk_flags": [],
    "escalation_flags": [],
    "requires_eis": false,
    "requires_security_review": false,
    "requires_editorial_planning": false,
    "requires_key_events_meeting": false,
    "reasoning_summary": ""
  },
  "stakeholders": {
    "space": { "required": true, "reason": "", "email": "space@london.edu" },
    "catering": { "required": false, "reason": "", "email": "cateringevents@london.edu" },
    "av": { "required": false, "reason": "", "email": "avhelp@london.edu" },
    "security": { "required": false, "reason": "", "email": "speakersandguests@london.edu" },
    "duty_managers": { "required": false, "reason": "", "email": "dutymanagers@london.edu" },
    "editorial_planning": { "required": false, "reason": "", "email": "editorialplanning@london.edu" },
    "estates": { "required": false, "reason": "", "email": "estates@london.edu" },
    "welcome_desk": { "required": false, "reason": "", "email": "welcomedesk@london.edu" },
    "sa_operations": { "required": false, "reason": "", "email": "saoperations@london.edu" }
  },
  "timeline": {
    "event_date_known": false,
    "milestones": []
  },
  "generated_outputs": {
    "student_summary_markdown": "",
    "crib_sheet_markdown": "",
    "eis_summary_markdown": "",
    "jo_summary_markdown": "",
    "stakeholder_email_drafts": [],
    "post_event_feedback_template": ""
  },
  "integration": {
    "monday_payload": {},
    "webhook_ready": false,
    "last_exported_at": null
  },
  "post_event": {
    "actual_attendance": null,
    "attendance_rate": null,
    "budget_actual": null,
    "what_worked": "",
    "what_did_not_work": "",
    "recommendations_for_next_time": "",
    "handover_notes": ""
  }
}
```

---

## 10. Recommended API Contract

The official architecture uses a Node.js backend with `/api` routes. The following endpoints should be built as real backend routes, even if the first implementation is simple.

```txt
GET  /api/health
GET  /api/me
POST /api/intake/extract
POST /api/intake/missing-fields
POST /api/tiering/classify
POST /api/routing/build
POST /api/outputs/generate
POST /api/integrations/monday/build-payload
POST /api/post-event/feedback
GET  /api/events/:id
PUT  /api/events/:id
```

For Workstream 4, the priority endpoints are:

```txt
POST /api/tiering/classify
POST /api/routing/build
POST /api/integrations/monday/build-payload
GET  /api/events/:id
PUT  /api/events/:id
```

### Beginner explanation

- `GET` means: retrieve existing information.
- `POST` means: send data to be processed or used to create something.
- `PUT` means: update an existing resource.
- `REST` means: a common convention for organising web API routes so the frontend and backend can communicate over HTTP.

For example:

```txt
POST /api/routing/build
```

means:

> The frontend sends an event object to the backend, and the backend returns which LBS stakeholders should be involved and why.

---

## 11. Workstreams

The team now has four workstreams.

### Workstream 1 — Intake and Event Object

Owns:

- student-facing intake,
- free-text event idea input,
- guided questions,
- structured extraction,
- missing-field detection,
- completeness score,
- editable event object.

Output:

- valid `EventRequest` JSON.

Primary backend routes:

```txt
POST /api/intake/extract
POST /api/intake/missing-fields
PUT  /api/events/:id
```

### Workstream 2 — Post-Event Feedback and Institutional Memory

Owns:

- post-event feedback form,
- impact capture,
- lessons learned,
- handover summary,
- reusable recommendations for future similar events.

Output:

- `PostEventFeedback` JSON,
- handover summary.

Primary backend route:

```txt
POST /api/post-event/feedback
```

### Workstream 3 — Output Generation and Knowledge

Owns:

- crib sheet draft,
- EIS-style draft,
- stakeholder email drafts,
- timeline/checklist display,
- organiser guidance,
- knowledge recommendations,
- uncertainty and human-review messages.

Output:

- `GeneratedOutputPackage` JSON,
- UI display of generated outputs.

Primary backend route:

```txt
POST /api/outputs/generate
```

### Workstream 4 — Routing, Tiering, Integrations, and Schema Coordination

Owns:

- stakeholder routing matrix,
- tiering/escalation engine,
- backend API contract coordination,
- shared schema coordination,
- stakeholder-specific routing packets,
- Monday.com-ready mock JSON payload,
- database-aware event model coordination with Prisma,
- and end-to-end demo coherence.

Output:

- `StakeholderRoutingResult` JSON,
- `MondayIntegrationPayload` JSON,
- routing/tiering API routes,
- schema decisions,
- demo integration checklist.

Primary backend routes:

```txt
POST /api/tiering/classify
POST /api/routing/build
POST /api/integrations/monday/build-payload
GET  /api/events/:id
PUT  /api/events/:id
```

---

## 12. Workstream 4 Immediate Scope

Workstream 4 should start after the official Codex setup is complete enough to reveal the repo structure.

### Step 1 — Locate the actual backend structure

Check where Codex created:

```txt
server/src/
server/src/routes/
server/src/middleware/
server/src/services/
server/src/types/
prisma/
```

Do not fight the generated structure unless it clearly conflicts with the official setup.

### Step 2 — Create type/schema files

Likely files:

```txt
server/src/types/event-request.ts
server/src/types/routing.ts
server/src/types/integrations.ts
server/src/types/generated-output.ts
```

Use Zod validation where useful:

```txt
server/src/schemas/event-request.schema.ts
server/src/schemas/routing.schema.ts
server/src/schemas/integrations.schema.ts
```

### Step 3 — Create service logic

Likely files:

```txt
server/src/services/tieringService.ts
server/src/services/routingService.ts
server/src/services/timelineService.ts
server/src/services/mondayPayloadService.ts
```

### Step 4 — Create API routes

Likely files:

```txt
server/src/routes/tiering.ts
server/src/routes/routing.ts
server/src/routes/integrations.ts
server/src/routes/events.ts
```

### Step 5 — Create sample data

Sample data should be clearly labelled and separated from real data.

Possible location:

```txt
server/src/sample-data/events/
```

or:

```txt
docs/sample-data/events/
```

Recommended sample events:

```txt
simple-workshop.json
external-speaker-panel.json
large-conference.json
social-with-alcohol.json
high-risk-vip-event.json
```

---

## 13. First Routing and Tiering Rules

Use deterministic rules first. Do not rely on AI for core routing decisions until the rule baseline works.

### Stakeholder routing rules

Always consider Space Management when:

- the event needs a room,
- the space is not confirmed,
- the event has layout or capacity requirements.

Require Catering when:

- catering is needed,
- alcohol is needed,
- external catering is requested,
- dietary requirements are relevant.

Require AV when:

- microphones are needed,
- projector/screen is needed,
- recording is needed,
- livestreaming is needed,
- hybrid format is needed,
- complex AV is needed.

Require Security when:

- external speakers are involved,
- VIPs are involved,
- politically sensitive speakers or topics are involved,
- external audience is involved,
- guest list is required,
- expected attendance is 100+,
- alcohol is served,
- embassy or media presence is expected.

Require Editorial Planning when:

- media is expected,
- Dean or senior leadership involvement is requested,
- the event is high visibility,
- the event has major external speakers,
- sponsor visibility is significant,
- communications or event promotion guidance is needed.

Require Duty Managers when:

- the event is a Key Event,
- the event has complex logistics,
- the event is multi-room or multi-day,
- many Campus Services teams are involved.

### Tiering rules

Label tiering as prototype guidance unless LBS confirms official production rules.

Use the workshop principle that tiering is about risk, exposure, complexity, and proportionate controls — not the quality or importance of an event.

Suggested baseline:

```txt
Tier 1:
- internal or small audience
- known format and venue
- no sensitive topics or data
- minimal complexity
- few stakeholders

Tier 2:
- external attendees or speakers
- recording or content sharing
- multiple stakeholders or suppliers
- moderate scale
- alcohol or catering complexity

Tier 3:
- high external visibility
- VIPs, media, embassy, or senior leaders
- politically sensitive content
- large scale
- complex logistics
- multiple dependencies or suppliers
- safeguarding or sensitive topics
```

---

## 14. Monday.com-Ready Mock Payload

Do not call the real Monday.com API in the MVP.

The MVP should generate a JSON payload that shows what could later be sent to Monday.com or a similar orchestration tool.

Example fields:

```json
{
  "integration_target": "monday.com",
  "integration_status": "mock_payload_ready",
  "event_id": "evt_demo_001",
  "board_hint": "LBS Event Oversight",
  "item_name": "Future of Finance Summit - 20 Jun 2026",
  "group_name": "Student Club Events",
  "columns": {
    "event_name": "Future of Finance Summit",
    "event_date": "2026-06-20",
    "event_owner": "Student Organizer",
    "club": "Finance Club",
    "suggested_tier": "tier_2",
    "status": "Needs human review",
    "risk_flags": ["external_speakers", "attendance_over_100", "alcohol_requested"],
    "required_stakeholders": ["space", "catering", "av", "security"],
    "missing_information": ["speaker names", "budget code", "dietary requirements"],
    "next_action": "Student organiser should confirm speaker list and submit security review information."
  },
  "subitems": [
    {
      "title": "Submit Space Request Form",
      "owner": "student",
      "relative_due": "as early as possible"
    },
    {
      "title": "Notify Security of external speakers",
      "owner": "student",
      "relative_due": "at least 4 weeks before event"
    }
  ]
}
```

---

## 15. Development and GitHub Coordination

Use short-lived feature branches.

Recommended branch names:

```txt
main
feature/ws1-intake
feature/ws2-post-event
feature/ws3-outputs-knowledge
feature/ws4-routing-integrations
fix/<short-description>
docs/<short-description>
```

Rules:

- No direct commits to `main` after initial setup.
- Every change should go through a pull request when practical.
- PRs should be small enough to review quickly.
- Merge at least once per day to avoid integration drift.
- Schema changes require team review.
- Schema changes should include sample data updates and `project.md` updates.

Recommended GitHub issue labels:

```txt
ws1-intake
ws2-post-event
ws3-outputs
ws4-routing-integrations
schema
frontend
backend
ai
database
auth0
bug
blocked
docs
demo-critical
```

---

## 16. Documentation Requirements

The following files are required or expected by the official setup:

```txt
README.md
project.md
AGENTS.md
docs/technical-setup.md
```

### `project.md`

`project.md` is the most important handover file. It is not a chronological log. It should always describe the current state of the project so another agent can continue the work.

It should include:

- project purpose,
- current architecture,
- repository structure,
- frontend framework and dependencies,
- backend framework and dependencies,
- database choice and Prisma setup,
- Auth0 configuration approach,
- public/private route-access decision,
- permission model,
- OpenAI API integration approach,
- LBS logo and branding notes,
- data/privacy/AI/copyright/security safeguards,
- Azure readiness notes,
- local run command,
- local browser URL,
- test status,
- known blockers,
- next steps.

Update `project.md` after every meaningful codebase change.

---

## 17. Suggested Wednesday Schema Freeze Agenda

By Wednesday, freeze:

- EventRequest schema location,
- required MVP outputs,
- API route names,
- Prisma persistence approach,
- ownership of each route/module,
- Saturday demo story,
- public/private route-access decision,
- and sample event fixtures.

Ask each workstream owner:

1. Which fields do you read?
2. Which fields do you write?
3. Which backend routes do you need?
4. Which fields are missing from v0?
5. Which sample event do you need for testing?
6. What should be stored in PostgreSQL versus generated on the fly?
7. What can we cut if blocked?

After Wednesday, avoid schema churn unless absolutely necessary.

---

## 18. Demo Strategy

The Saturday demo should show one coherent path:

```txt
Student event idea
  -> structured event object
  -> missing fields
  -> tier/risk classification
  -> stakeholder routing
  -> generated outputs
  -> Monday.com-ready mock payload
  -> human review note
  -> post-event handover placeholder
```

Recommended demo event:

```txt
Future of Finance Summit
- Student club conference
- 120 expected attendees
- external speakers
- networking reception
- alcohol requested
- AV needed
- space not yet confirmed
```

This event is complex enough to trigger meaningful routing, but not so complex that the demo becomes hard to explain.

---

## 19. Glossary for Non-Backend Teammates

### Backend

The part of the app that runs on the server. It receives requests, checks rules, talks to the database, calls OpenAI, and sends results back to the frontend.

### Frontend

The part of the app the user sees in the browser.

### API

A structured way for the frontend and backend to talk to each other.

### REST

A common style for organising API routes around actions like retrieving, creating, processing, or updating information.

### GET

Retrieve existing information.

### POST

Send data to be processed or used to create something.

### PUT

Update an existing resource.

### PostgreSQL

The database where structured data can be stored.

### Prisma

A tool that lets the TypeScript backend talk to PostgreSQL in a safer, more structured way.

### Auth0

The authentication provider. Users log in through Auth0 Universal Login, and the app verifies their identity and permissions using Auth0 tokens.

### JWT

A signed token that proves a user has authenticated and carries permission claims such as `user_normal` or `user_admin`.

### Zod

A TypeScript validation library used to check that incoming request data has the shape the backend expects.

---

## 20. Final Build Priority

1. Finish official Codex setup.
2. Confirm `.env` is ignored and `project.md` exists.
3. Confirm frontend runs on `http://localhost:3000/`.
4. Confirm backend runs on `http://localhost:3001`.
5. Confirm PostgreSQL and Prisma are working.
6. Confirm Auth0 login path and backend JWT validation.
7. Add shared event/routing/integration types.
8. Add sample event fixtures.
9. Add deterministic tiering service.
10. Add stakeholder routing service.
11. Add Monday.com-ready mock payload service.
12. Add API routes for Workstream 4.
13. Connect one frontend demo page to those routes.
14. Coordinate with Workstreams 1, 2, and 3.
15. Keep `project.md` current.

---

## 21. Summary of Changes from v2

This v3 plan changes the v2 architecture in the following ways:

- Replaces Next.js/API-routes default with official React/Vite frontend plus Node/Express backend.
- Replaces local JSON-first persistence with PostgreSQL + Prisma.
- Removes simple password gate / hardcoded demo login from the plan.
- Requires Auth0-routed authentication only.
- Requires backend JWT validation and permission enforcement.
- Removes `.env.example` from the recommended setup because the active Codex instruction says not to create sample/template environment files.
- Preserves the 4-workstream structure.
- Preserves the shared event object principle.
- Preserves the MVP product flow.
- Preserves mock Monday.com-ready JSON payloads, but not real Monday.com integration.
- Adds clearer backend/API learning guidance.
- Aligns Workstream 4 with database-aware schema and backend API ownership.

