# Event Readiness Assistant: Phase 1 Epics, Features, User Stories, And Acceptance Criteria

## 0. Purpose

This is the active Phase 1 epics and user-story document.

It replaces earlier WS1-WS4 technical-workstream framing. Historical planning files have been moved to `docs/project-context/historical-supplanted/` and are no longer source of truth.

Implementation proceeds epic by epic with Joao reviewing each main deliverable through the frontend test/demo surface.

## 1. Product Interpretation

Phase 1 is the required intake phase. Its output is a fully populated `EventRequest` object, Space Request DOCX, and deterministic Key Event assessment when the completed EventRequest contains enough confirmed information.

Pasted drafts are not a standalone epic. They are handled by the normal conversational loop as organiser-provided context.

No automatic submission, email sending, or real external system write-back is in scope.

## 2. Feature Inventory

| Feature ID | Feature | MVP status | Source |
|---|---|---|---|
| F-01 | Entry-type detection | Keep | Phase 1 conversation spec |
| F-02 | Working event profile / EventRequest | Keep | Phase 1 conversation spec + CribSheet |
| F-03 | Small themed questions | Keep | Phase 1 conversation spec |
| F-04 | Structured options and uncertainty markers | Keep | Phase 1 conversation spec |
| F-05 | Toolkit-based shaping for vague/budget-only users | Keep | Event Toolkit / Student Guide |
| F-06 | Official Space Request / crib sheet field map | Keep | `CribSheet - Copy.docx` |
| F-07 | Coverage check for all required fields | Keep, no numeric completeness score | CribSheet + Phase 1 spec |
| F-08 | Space Request DOCX generation | Keep | CribSheet |
| F-09 | Finance-code lookup whenever budget is involved | Keep | Finance directory + Joao feedback |
| F-10 | Space/room guidance | Keep | Space Matrix first, fallbacks after |
| F-11 | Catering/alcohol/security/timeline guidance | Keep | Catering, terms, toolkit |
| F-12 | Deterministic Key Event assessment | Keep | `key_event_identification_spec.md` only |
| F-13 | Frontend Phase 1 QA checklist | Keep | Joao feedback |
| F-14 | In-chat preview | Post-MVP | Joao feedback |
| F-15 | Document upload parsing | Future | Joao feedback |
| F-16 | EIS-style draft | Future / downstream | EIS template + Key Event spec |
| F-17 | Stakeholder routing matrix | Future / downstream | Source rules + EventRequest |
| F-18 | Stakeholder email drafts | Future / downstream | Routing matrix + EventRequest |
| F-19 | Timeline/checklist display | Future / downstream | Lifecycle, terms, toolkit |
| F-20 | OpenAI-backed preliminary complexity/risk flags | Future / downstream | Existing WS4 implementation direction, revised scope |
| F-21 | Monday.com-ready mock JSON payload | Future / downstream | Existing Monday payload work + Joao feedback |
| F-22 | Completeness score | Cut | Joao feedback |
| F-23 | Pasted/manual draft review as standalone epic | Cut; handled by normal conversation | Joao feedback |
| F-24 | Post-event feedback, impact, lessons learned, handover | Future / WS3 report | Joao feedback |
| F-25 | Reusable future-event recommendations | Future / WS3 report | Joao feedback |

## 3. Epics

| Epic ID | Epic | Main deliverable |
|---|---|---|
| E-01 | Start and triage the organiser journey | Entry-type-aware intake flow |
| E-02 | Build the EventRequest | Working event profile with all CribSheet fields |
| E-03 | Guide form-ready answers with source data | Question flow using toolkit, finance, space, catering, and policy data |
| E-04 | Generate the Space Request DOCX | Editable DOCX with all official fields |
| E-05 | Assess Key Event candidacy deterministically | Key Event assessment using only `key_event_identification_spec.md` |
| E-06 | Validate Phase 1 in frontend | Demo/test surface with checklist and story coverage |

## 4. User Stories

### E-01: Start and triage the organiser journey

#### US-01: Prepared event request

As a student organiser with a formed event idea, I want the assistant to recognise what I already provided so that I only answer missing questions.

Acceptance criteria:

- Assistant identifies provided event type, timing, attendance, speaker, venue, catering, budget, or AV details.
- Assistant does not ask for the same detail again unless it is unclear.
- Assistant asks no more than three related follow-up questions by default.

#### US-02: Budget-only user

As a student organiser with budget but no event idea, I want help shaping viable formats so that I can proceed to the EventRequest.

Acceptance criteria:

- Assistant asks about objective, audience, constraints, resources, and success signal.
- Assistant suggests 2-3 suitable formats.
- Assistant brings up finance-code implications because budget is involved.
- Assistant continues even if the initial idea is weak.

#### US-03: General event idea

As a student organiser with a broad idea, I want the assistant to turn it into operational details.

Acceptance criteria:

- Assistant asks about purpose, audience, attendance, timing, and format.
- Assistant moves into space/setup, catering, AV, and services.
- Assistant stores all answers in the EventRequest.

### E-02: Build the EventRequest

#### US-04: Working event profile

As a student organiser, I want the assistant to remember details across turns.

Acceptance criteria:

- Each user turn updates the EventRequest.
- Every official CribSheet field has a value or explicit marker before Phase 1 ends.
- Additional context is preserved.
- No numeric completeness score is shown or required.

#### US-05: Proceed-readiness

As the system, I need to know when Phase 1 is complete so downstream outputs can run.

Acceptance criteria:

- All official fields from `CribSheet - Copy.docx` are covered.
- Values may be final, best estimate, `not sure yet`, `needs confirmation`, `not applicable`, or organiser follow-up.
- Phase 1 completion creates the source EventRequest for downstream logic.

### E-03: Guide form-ready answers with source data

#### US-06: Toolkit shaping

As a vague or budget-only user, I want the assistant to help me clarify the event.

Acceptance criteria:

- Assistant uses toolkit lenses: strategic alignment, unique value, audience clarity, resource readiness, and success signal.
- Assistant maps shaping answers into purpose, audience, format, budget, and success fields.

#### US-07: Finance code lookup

As a budget-involved event organiser, I want finance-code guidance surfaced automatically.

Acceptance criteria:

- Whenever budget is mentioned or implied, assistant raises finance-code lookup.
- Existing events can return a finance code to the user.
- New events explain that club treasury / finance code setup is needed.

#### US-08: Space and catering guidance

As an organiser choosing spaces or services, I want guidance based on LBS data.

Acceptance criteria:

- Space Matrix is checked first.
- If a room is missing, fallback sources are checked.
- If supporting sources conflict, the used source is stated.
- Catering, alcohol, political/sensitive topic, security, decoration, equipment, and timing implications are surfaced when relevant.

### E-04: Generate the Space Request DOCX

#### US-09: DOCX generation

As a student organiser, I want an editable DOCX that contains all required fields.

Acceptance criteria:

- Output is DOCX.
- Output includes all fields from `CribSheet - Copy.docx`.
- Formatting may differ from the raw form.
- Uncertain fields are visibly marked.
- No form is submitted automatically.

### E-05: Assess Key Event candidacy deterministically

#### US-10: Attendance trigger

As LBS staff, I want 100+ attendee events flagged after EventRequest completion.

Acceptance criteria:

- Confirmed or best-estimate attendance 100+ sets `key_event_candidate` true.
- The user-facing language says `could be considered` or `may qualify`.
- LBS staff retain final determination.

#### US-11: Criteria threshold trigger

As LBS staff, I want confirmed complexity indicators to trigger Key Event candidacy.

Acceptance criteria:

- Two or more confirmed non-attendance criteria set `key_event_candidate` true.
- Criteria are only those in `docs/project-context/key_event_identification_spec.md`.
- Missing, vague, or uncollected information is not counted.

#### US-12: Sensitive topic handling

As an organiser, I need to know if political/sensitive topics affect planning.

Acceptance criteria:

- Sensitive/political topic is not a standalone Key Event trigger.
- It is surfaced to the user because it requires security/timeline attention.
- It is included in internal rationale/signals.

### E-06: Validate Phase 1 in frontend

#### US-13: Frontend checklist per Phase 1 epic

As Joao, I want a frontend validation surface for each Phase 1 epic.

Acceptance criteria:

- The UI lists Phase 1 epics E-01 to E-06.
- The UI lists all Phase 1 features and user stories.
- The UI shows checklist-style acceptance criteria.
- The UI exposes example inputs and generated outputs.
- The UI includes all pre-determined test event scenarios for the epic.
- The UI includes editable form fields unless the page is specifically testing chat behaviour.
- The UI shows the populated `EventRequest` object and highlights which fields matter.
- The UI shows OpenAI reasoning whenever an epic uses OpenAI-backed interpretation or source guidance.
- Chat test pages may hide editable form fields, but must still show the EventRequest being populated turn by turn.
- Checklist ticks persist in browser localStorage.

## 5. Future / WS3 Next-Steps Report

Flag for WS3 / production-readiness reporting:

- post-event feedback form,
- impact capture / lessons learned,
- handover summary,
- reusable recommendations for future similar events,
- secure document upload/storage,
- EIS-style draft generation,
- stakeholder routing matrix,
- stakeholder email drafts,
- staff-side timeline/checklist display,
- OpenAI-backed preliminary complexity/risk flags,
- Monday.com-ready mock JSON payload,
- real Monday.com API integration,
- ERP / finance integration,
- fundraising / Advancement / CRM integration,
- catering, room booking, AV, security, and service desk integrations,
- stakeholder queues and workflow ownership,
- permissions, audit, retention, and data governance.
