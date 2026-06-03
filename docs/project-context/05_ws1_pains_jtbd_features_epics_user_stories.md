# Event Readiness Assistant: Epics, Features, User Stories, And Acceptance Criteria

## 0. Purpose

This is the active MVP epics and user-story document.

It replaces earlier WS1-WS4 technical-workstream framing. Historical planning files have been moved to `docs/project-context/historical-supplanted/` and are no longer source of truth.

The implementation will proceed epic by epic with João reviewing each main deliverable through a frontend test/demo surface.

## 1. Product Interpretation

Phase 1 is the required intake phase. Its output is a fully populated `EventRequest` object and Space Request DOCX.

After Phase 1, the MVP continues into:

- deterministic Key Event assessment,
- EIS-style draft for Key Event candidates,
- stakeholder routing matrix,
- stakeholder email drafts,
- timeline/checklist display,
- OpenAI-backed preliminary complexity/risk flags,
- Monday.com-ready mock payload.

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
| F-09 | In-chat preview | Post-MVP | João feedback |
| F-10 | Pasted/manual draft review | Keep | João feedback |
| F-11 | Document upload parsing | Future | João feedback |
| F-12 | Finance-code lookup whenever budget is involved | Keep | Finance directory + João feedback |
| F-13 | Space/room guidance | Keep | Space Matrix first, fallbacks after |
| F-14 | Catering/alcohol/security/timeline guidance | Keep | Catering, terms, toolkit |
| F-15 | Deterministic Key Event assessment | Keep | `key_event_identification_spec.md` only |
| F-16 | EIS-style draft | Keep for Key Event candidates | EIS template + Key Event spec |
| F-17 | Stakeholder routing matrix | Keep | Source rules + EventRequest |
| F-18 | Stakeholder email drafts | Keep | Routing matrix + EventRequest |
| F-19 | Timeline/checklist display | Keep | Lifecycle, terms, toolkit |
| F-20 | OpenAI-backed preliminary complexity/risk flags | Keep | Existing WS4 implementation direction, revised scope |
| F-21 | Monday.com-ready mock JSON payload | Keep | Existing Monday payload work + João feedback |
| F-22 | Completeness score | Cut | João feedback |
| F-23 | Post-event feedback, impact, lessons learned, handover | Future / WS3 report | João feedback |
| F-24 | Reusable future-event recommendations | Future / WS3 report | João feedback |

## 3. Epics

| Epic ID | Epic | Main deliverable |
|---|---|---|
| E-01 | Start and triage the organiser journey | Entry-type-aware intake flow |
| E-02 | Build the EventRequest | Working event profile with all CribSheet fields |
| E-03 | Guide form-ready answers with source data | Question flow using toolkit, finance, space, catering, and policy data |
| E-04 | Generate the Space Request DOCX | Editable DOCX with all official fields |
| E-05 | Review pasted/manual drafts | Pasted draft mapping and gap-fill flow |
| E-06 | Assess Key Event candidacy deterministically | Key Event assessment using only `key_event_identification_spec.md` |
| E-07 | Generate post-Phase-1 documents and guidance | EIS draft, timeline/checklist, stakeholder emails |
| E-08 | Route stakeholders and flag complexity/risk | Routing matrix plus OpenAI-backed preliminary LBS staff risk flags |
| E-09 | Generate Monday.com mock payload | Monday-ready mock JSON, no API call |
| E-10 | Validate epic-by-epic in frontend | Demo/test surface with checklist and story coverage |

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
- If supporting sources conflict, the source with more entries is preferred and the used source is stated.
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

### E-05: Review pasted/manual drafts

#### US-10: Pasted draft review

As an organiser with a partial draft, I want to paste it and fill gaps.

Acceptance criteria:

- Assistant maps pasted content into EventRequest fields.
- Assistant preserves user-provided answers.
- Assistant identifies missing, vague, or contradictory fields.
- Assistant asks targeted follow-ups.
- Document upload is not required for MVP.

### E-06: Assess Key Event candidacy deterministically

#### US-11: Attendance trigger

As LBS staff, I want 100+ attendee events flagged after EventRequest completion.

Acceptance criteria:

- Confirmed attendance 100+ sets `key_event_candidate` true.
- The user-facing language says `could be considered` or `may qualify`.
- LBS staff retain final determination.

#### US-12: Criteria threshold trigger

As LBS staff, I want confirmed complexity indicators to trigger Key Event candidacy.

Acceptance criteria:

- Two or more confirmed non-attendance criteria set `key_event_candidate` true.
- Criteria are only those in `docs/project-context/key_event_identification_spec.md`.
- Missing, vague, or uncollected information is not counted.
- If deterministic coding is not possible from the spec, Codex flags it to João.

#### US-13: Sensitive topic handling

As an organiser, I need to know if political/sensitive topics affect planning.

Acceptance criteria:

- Sensitive/political topic is not a standalone Key Event trigger.
- It is surfaced to the user because it requires security/timeline attention.
- It is included in internal rationale/signals.

### E-07: Generate post-Phase-1 documents and guidance

#### US-14: EIS draft

As a Key Event candidate organiser, I want an EIS-style draft from known information.

Acceptance criteria:

- EIS draft is offered/generated only after EventRequest completion and Key Event candidate assessment.
- No additional questions are asked solely to complete EIS.
- Missing EIS-specific values are marked `needs confirmation`.

#### US-15: Stakeholder email drafts

As an organiser, I want editable messages to stakeholders.

Acceptance criteria:

- Drafts are generated for stakeholders identified by routing.
- Messages are editable.
- No emails are sent automatically.

#### US-16: Timeline/checklist

As the LBS crew assisting an organiser, I want an actionable checklist.

Acceptance criteria:

- Checklist uses lifecycle, terms, toolkit, catering, and space timing rules where available.
- Political/sensitive topics, alcohol, catering, external speakers, external audience, and 100+ attendance surface timeline impacts where source rules support them.

### E-08: Route stakeholders and flag complexity/risk

#### US-17: Routing matrix

As staff, I want clear stakeholder routing from event facts.

Acceptance criteria:

- Routing matrix is derived from EventRequest facts and source rules.
- Each stakeholder includes why they are involved and what information they need.

#### US-18: Preliminary complexity/risk flags

As LBS staff, I want a preliminary complexity/risk signal separate from deterministic Key Event status.

Acceptance criteria:

- OpenAI may be used for broader complexity/risk reasoning.
- Output is labelled preliminary guidance.
- It does not override deterministic Key Event logic.

### E-09: Generate Monday.com mock payload

#### US-19: Monday-ready mock JSON

As the demo team, I want a realistic Monday.com payload without real integration.

Acceptance criteria:

- Payload is generated after EventRequest completion.
- Payload maps as closely as repo knowledge allows to the known Monday expectations.
- No Monday API call is made.
- Payload clearly remains a mock/export artifact.

### E-10: Validate epic-by-epic in frontend

#### US-20: Frontend checklist per epic

As João, I want a frontend validation surface for each epic.

Acceptance criteria:

- Each epic has a visible/testable demo path.
- The UI reminds João of the user stories.
- The UI shows checklist-style acceptance criteria.
- The UI exposes example inputs and generated outputs.

## 5. Future / WS3 Next-Steps Report

Flag for WS3 / production-readiness reporting:

- post-event feedback form,
- impact capture / lessons learned,
- handover summary,
- reusable recommendations for future similar events,
- secure document upload/storage,
- real Monday.com API integration,
- ERP / finance integration,
- fundraising / Advancement / CRM integration,
- catering, room booking, AV, security, and service desk integrations,
- stakeholder queues and workflow ownership,
- permissions, audit, retention, and data governance.

