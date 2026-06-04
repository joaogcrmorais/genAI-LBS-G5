# LBS Files Data And MVP Planning Reconciliation Plan

Date: 2026-06-03

## 1. Current Product Understanding

The Event Readiness Assistant MVP has a required Phase 1 and a downstream output phase.

Phase 1 exists to create a fully populated `EventRequest` object. Technically, Phase 1 is complete when every field required by the official updated Space Request Form source has a concrete value, best estimate, `not sure yet`, `needs confirmation`, `not applicable`, or explicit organiser follow-up marker.

The official field source for the Phase 1 output is:

- `lbs-files/raw/request-event/Event form - Space Request Form.docx`

The completed example source is:

- `lbs-files/raw/request-event/LBS Crib Sheet_AMC.docx`

The generated final output should be a DOCX. It does not need to visually match the current Space Request Form, but it must contain the same fields. The completed AMC crib sheet is used for examples and test values, not as the field source.

DOCX generation may proceed with declaration fields marked `needs_confirmation`. The generated output should show the download link followed by the declaration list, explaining that sending the form to `space@london.edu` means the organiser is agreeing to those declarations. The output pattern is stored in `lbs-files/processed/request-event/space_request_generation_output.md`.

Phase 1 is not the whole product. After the `EventRequest` is complete, the core MVP should use it to produce:

- Space Request DOCX;
- deterministic Key Event candidate assessment;
- Key Event / EIS recommendation;
- full SA Operations / Eventscase email draft to `saoperations@london.edu`;
- timeline/checklist display for the LBS crew assisting the organiser;
- OpenAI-backed preliminary complexity/risk flags for LBS staff;
- Monday.com-ready mock JSON payload.

EIS-style drafting and stakeholder routing are MVP stretch. Broader stakeholder email drafting is stretch / V2 unless templates and stakeholder expectations are confirmed.
The confirmed SA Operations / Eventscase email template is stored in `lbs-files/processed/routing/stakeholder_email_templates.md`.
The Eventscase email draft should be generated or noted with the Space Request output when the Audience field includes anything besides `Current students` and `Children (Under 18s)`. Student admin names and LBS emails stay out of the official Space Request field map and are optional Eventscase email fields.

No automatic external action is in scope. The app must not submit forms, send emails, create Monday items through the API, write to catering/finance/room systems, or call other LBS systems.

## 2. Current Work Allocation

The old four technical workstream split is obsolete. It has been moved out of active context where possible.

Current workstreams:

1. Business logic
   - Led outside technical delivery.
   - Provides event-process rules, chatbot behaviour expectations, stakeholder logic, and LBS policy/business clarification.

2. Product requirements and technical delivery
   - Owner: João + Codex.
   - Covers product requirements, technical architecture, data processing, app implementation, testing, and MVP delivery.
   - João is the only technical delivery owner; Codex is the technical build partner.

3. Next steps for integration / opportunities not pursued
   - Later report explaining what was built, what was not built, future integration paths, and what productionising for LBS would require.

4. Presentation, organisation, final review
   - Final packaging, presentation, project organisation, review, and handover.

## 3. Active Source Documents

Current source-of-truth planning:

- `docs/project-context/product-brief.md`
- `docs/project-context/05_ws1_pains_jtbd_features_epics_user_stories.md`
- `docs/project-context/06_user_view_prd_phase1_event_readiness_assistant.md`
- `docs/project-context/event_readiness_assistant_phase_1_conversation_rules_spec.md`
- `docs/project-context/key_event_identification_spec.md`
- `lbs-files/PLAN.md`

Historical/supplanted context has been moved to:

- `docs/project-context/historical-supplanted/`

Historical data from that directory has been supplanted and is no longer source of truth.

## 4. Inspection Method And Confidence

I inspected the repo and raw files before writing this plan.

Programmatically inspected:

- Markdown files with `Get-Content`.
- DOCX files by reading `word/document.xml` from the DOCX archive and extracting paragraph text.
- PPTX files by reading slide XML text.
- XLSX files by reading workbook XML, sheet names, dimensions, and representative rows/cells.
- PDF files enough to confirm they are PDF binaries, but not full text-extracted locally because no PDF text extractor is currently installed in the repo/session.
- `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md`, supplied by João after ChatGPT parsed the Event Toolkit PDF, is now the authoritative parsed-text companion for the Event Toolkit PDF.

Important PDF handling:

- João confirmed `[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf` is the most authoritative process source.
- João provided `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md` as the authoritative parsed version of that PDF.
- The older `Student Event Organisers Guide - Copy.pptx` is retained only as comparison/historical fallback context.
- `Hospitality Brochure Autumn Winter 2025.pdf` has not yet been text-extracted. Conversion should include a PDF extraction step before runtime use.

## 5. Source Priority And Conflict Rules

All raw sources should be treated as valid unless conflicts are found.

Source priorities:

1. Student event guidance:
   - Most authoritative: `[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf`.
   - Authoritative parsed text: `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md`.
   - Historical fallback/comparison source: `Student Event Organisers Guide - Copy.pptx`.
   - The PPTX can be deleted later if João approves, but it is currently retained for comparison.

2. Space Request / EventRequest field list:
   - Primary source: `Event form - Space Request Form.docx`.
   - Completed example: `LBS Crib Sheet_AMC.docx`.

3. Key Event categorisation:
   - Sole deterministic source: `docs/project-context/key_event_identification_spec.md`.
   - If implementation cannot turn a criterion into deterministic code, flag it to João immediately.

4. Space/room data:
   - First source: `Space Matrix (1) - Copy.xlsx`.
   - If a required room is not in Space Matrix, defer to supporting sheets.
   - If multiple supporting sources conflict, use the source with more entries and state the source used.

5. Finance code visibility:
   - Finance codes are safe to display to users.
   - Finance code lookup must be surfaced whenever budget is involved.

Known intentional overrides:

- WS1 allows uploaded draft handling; MVP narrows this to pasted text and manual input only.
- WS1 says ask permission before generating preview/downloadable draft; MVP removes this permission gate because the tool is explicitly for generating drafts.
- WS1 asks for preview; MVP moves in-chat preview to post-MVP because the user can review the generated DOCX.
- Key Event spec treats sensitive/political topics as a passive internal signal, not standalone Key Event trigger; MVP must still surface political/sensitive topic guidance to the user because it affects security and timelines.

## 6. Raw File Inventory And Runtime Mapping

### Root raw files

#### `lbs-files/raw/[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf`

Observed content basis:

- Binary PDF confirmed.
- João confirmed this is the most authoritative source.
- João supplied `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md` as the authoritative parsed markdown version.
- The parsed markdown contains strategic event-planning process guidance, event necessity and definition, decision framework, audience/owner guidance, SMART objectives, costs/returns, planning questions, marketing/communications, speaker considerations, finance/sponsorship, logistics, EIS, and Key Event-related guidance.

MVP relevance:

- Highest for shaping vague/budget-only users and giving student-facing guidance.
- Important for understanding what students need to proceed: purpose, audience, team readiness, speaker considerations, space process, catering, EIS, and Key Events meeting.

Classification:

- Source of truth for student-event guidance and retrieval knowledge.

Processed outputs:

- `processed/toolkit/toolkit_sections.md`
- `processed/toolkit/toolkit_chunks.jsonl`
- `processed/toolkit/toolkit_rules.json`

Runtime use:

- Retrieval knowledge.
- AI prompt support for shaping weak ideas.
- Selected deterministic guidance only where rules are explicit, such as lead times, contacts, and process steps.

DB candidate:

- Store chunks in PostgreSQL if we implement retrieval over DB-backed chunks.

#### `lbs-files/raw/260601 group meeting transcript.md`

Observed content:

- Meeting transcript from 1 June 2026.
- Captures original direction: final product could cover phases 1-5, MVP first 3 phases, finance-code lookup, room/space guidance, toolkit conversion, crib sheet generation, stakeholder identification, tiering, and mock Monday payload.
- Also captures the earlier team allocation that has now been superseded.

MVP relevance:

- Historical only.

Classification:

- Supporting historical context.

Processed outputs:

- None for runtime.
- Optional summary in `processed/examples/project_history_notes.md` only if needed for handover.

Runtime use:

- None.

#### `lbs-files/raw/Event Management Lifecycle.xlsx`

Observed content:

- Sheets:
  - `Lifecycle Phases Overview`: 7 phases, timing boundaries, MVP originally first 3 phases.
  - `Timelines within Phase`: relative timeline items mapped to phases.
  - `Stakeholders by Phase`: phase, stakeholder, timeline, workstream/task.
  - `Forms by Phase`: mandatory and conditional forms by phase.
  - `Database Sources`: notes on available/missing source files.

MVP relevance:

- High for timeline/checklist display and downstream guidance after EventRequest completion.
- Useful for Phase 1 context where it affects Space Request timing.

Classification:

- Lifecycle/timeline/stakeholder source.

Processed outputs:

- `processed/lifecycle/lifecycle_phases.json`
- `processed/lifecycle/phase_timelines.csv`
- `processed/lifecycle/stakeholders_by_phase.csv`
- `processed/lifecycle/forms_by_phase.json`
- `processed/lifecycle/checklist_rules.json`

Runtime use:

- Timeline/checklist.
- Retrieval context for lifecycle explanations.
- Deterministic deadline/checklist rules after extraction.

DB candidate:

- `LifecyclePhase`, `LifecycleTimelineItem`, `LifecycleStakeholderTask`.

#### `lbs-files/raw/Finance_Code_Directory - Copy.xlsx`

Observed content:

- Finance directory across 2025-26, 2024-25, 2023-24, 2022-23, 2019-22, and 2018-19.
- Columns include event/finance code, club name, event name, start date, finish date, VAT status, and cost centre, with some year-to-year shape differences.
- Header notes say a new event number must be created for all SA club events during the year and the Club Treasurer completes the new event form.

MVP relevance:

- Highest for any event involving budget.

Classification:

- Deterministic lookup data.

Processed outputs:

- `processed/finance/finance_codes.csv`
- `processed/finance/finance_codes.json`
- `processed/finance/finance_lookup_index.json`
- `processed/finance/finance_code_rules.md`
- `processed/finance/finance_code_test_cases.json`

Runtime use:

- Exact/fuzzy finance-code lookup.
- Repeat-event guidance.
- New-event finance-code setup guidance.

DB candidate:

- `FinanceCode` table with year, code, club, event name, dates, VAT status, cost centre, source sheet.

#### `lbs-files/raw/genai_events_assistant_mvp_build_brief.md`

Observed content:

- Build brief from the 1 June transcript.
- Documents the earlier MVP: chat intake, guided questioning, crib sheet, finance code, room/space guidance, stakeholder identification, email drafting, tiering, mock Monday payload.
- Includes old allocation across Angela, João, Fernando, Rita, and Joe/LBS stakeholder.

MVP relevance:

- Historical.
- Some ideas remain in current scope, but authority now comes from current product brief, PRD, epics, and this plan.

Classification:

- Historical planning context.

Processed outputs:

- None for runtime.

Runtime use:

- None.

### WS1 business logic files

#### `lbs-files/raw/ws1/Event Readiness Assistant - Phase 1 Conversation Rules Spec.docx`

Observed content:

- Developer-ready Phase 1 chatbot rules.
- Defines Phase 1 goal, entry types, working event profile, question batching, structured options, uncertainty handling, field map, drafting/output rules, pasted/uploaded draft flow, and Key Event/EIS timing.
- Markdown conversion already exists at `docs/project-context/event_readiness_assistant_phase_1_conversation_rules_spec.md`.

MVP relevance:

- Highest for conversation behaviour, except where João's current product decisions override upload/preview/permission details.

Classification:

- Business-logic source for intake behaviour.

Processed outputs:

- No need to reconvert DOCX; Markdown already exists.
- Derive:
  - `processed/prompts/phase1_conversation_rules.md`
  - `processed/request-event/event_profile_question_flow.json`
  - `processed/schemas/event_request.schema.json`
  - `processed/schemas/field_status.schema.json`

Runtime use:

- AI instruction logic.
- UI question batching behaviour.
- Field-state tracking.

DB candidate:

- Usually not needed as DB table; can live as prompt/config files.

#### `lbs-files/raw/ws1/key-event-identification-spec.docx`

Observed content:

- Developer handoff for deterministic Key Event candidate logic.
- Candidate when confirmed expected attendance is 100+ OR two or more confirmed non-attendance criteria are present.
- Non-attendance criteria: high-profile speaker, complex logistics, significant operational elements, external audience, external media attendance.
- Missing/vague/uncollected data must not be counted.
- Sensitive topic is passive internal signal in v1, not standalone Key Event trigger.
- User-facing language must be conservative.
- Markdown conversion already exists at `docs/project-context/key_event_identification_spec.md`.

MVP relevance:

- Highest after EventRequest completion.

Classification:

- Sole deterministic Key Event categorisation source.

Processed outputs:

- No need to reconvert DOCX; Markdown already exists.
- Derive:
  - `processed/key-event/key_event_rules.json`
  - `processed/key-event/key_event_test_cases.json`
  - `processed/schemas/key_event_assessment.schema.json`

Runtime use:

- Deterministic Key Event candidate service.
- EIS trigger.

DB candidate:

- Not necessary initially; could store assessment outputs per event if persistence is added.

### Catering files

#### `lbs-files/raw/catering/Catering Policy - Copy.xlsx`

Observed content:

- Sheet `Catering Space Policy`.
- Contains site, building, floor, room code/name/classification, linked-to/facing data, catering delivery availability, alcohol service availability, and multiple catering/service style columns such as fine dining/plated, buffet, reception, breakfast, beverage, afternoon bites, sandwich lunches, grazing boards, bowl/finger food, pizza, canapes, alcoholic beverages.

MVP relevance:

- High for room-specific catering/alcohol guidance.

Classification:

- Structured policy/lookup data.

Processed outputs:

- `processed/catering/catering_space_policy.csv`
- `processed/catering/catering_space_policy.json`
- `processed/catering/catering_policy_rules.json`
- `processed/catering/catering_policy_chunks.jsonl`

Runtime use:

- Deterministic lookup for catering/alcohol suitability by room.
- Retrieval for explanatory guidance.

DB candidate:

- `CateringSpacePolicy` table keyed by room code/name.

#### `lbs-files/raw/catering/External catering request form - Self-Catering Waiver .docx`

Observed content:

- Self-catering waiver form.
- States Lexington Catering is the mandatory catering supplier.
- External catering is only an exception where Lexington cannot supply requirements.
- User should contact Catering Events and Space.
- Form must be completed, authorised, and returned 14 days before event.
- Lexington cannot provide kitchen/food preparation facilities/equipment for self-catered events.
- Alcoholic beverages must be served by Lexington under licensing policy.
- Includes organiser/event/contact/date/time/people fields, allergen/food safety acknowledgements, company/menu/cost/risk assessment/HACCP fields.

MVP relevance:

- High when user mentions external catering/self-catering.

Classification:

- Template plus deterministic policy rules.

Processed outputs:

- `processed/catering/external_catering_waiver_template.md`
- `processed/catering/external_catering_rules.json`
- `processed/schemas/external_catering_waiver.schema.json`

Runtime use:

- Warning/guidance when external catering is selected.
- Optional supporting document draft later.

DB candidate:

- Not needed initially.

#### `lbs-files/raw/catering/Hospitality Brochure Autumn Winter 2025.pdf`

Observed content:

- PDF binary confirmed; not text-extracted yet.
- Filename indicates Autumn/Winter 2025 hospitality brochure.

MVP relevance:

- Useful for catering/menu retrieval if conversion succeeds.
- Not required for deterministic routing unless text/tables are extracted cleanly.

Classification:

- Catering retrieval/supporting context.

Processed outputs:

- `processed/catering/hospitality_brochure_chunks.jsonl`
- Optional `processed/catering/hospitality_menu_items.csv` if menu tables extract cleanly.

Runtime use:

- Retrieval for menu/package guidance.
- Not used for bookings or pricing guarantees unless validated.

DB candidate:

- `HospitalityMenuItem` only if table extraction is reliable.

### Request-event files

#### `lbs-files/raw/request-event/Event form - Space Request Form.docx`

Observed content:

- Primary updated blank Space Request Form source for final Phase 1 output.
- Extracted fields include organiser name, project manager, deputy organiser, LBS email, contact number, school affiliation, event title, expected attendance, audience, children, event date, setup/arrival/start/end/breakdown times, event type, external speaker details, event purpose/context, political sensitivity, preferred venue type, room configuration, additional spaces, registration/welcome support, decorations, catering, alcohol, AV, noise/disruption, outside equipment, filming, streaming media, submission timing, additional comments, declarations, and office-use-only assessment fields.
- The assistant should map organiser-facing fields into EventRequest. Office-use-only fields are not organiser intake questions.

MVP relevance:

- Highest.

Classification:

- Official EventRequest / Space Request field source and DOCX output source.

Processed outputs:

- `processed/request-event/space_request_fields.json`
- `processed/request-event/space_request_field_mapping_examples.md`
- `processed/request-event/space_request_form_template.md`
- `processed/request-event/space_request_generation_output.md`
- `processed/templates/space_request_form_template.docx`
- `processed/schemas/event_request.schema.json`
- `processed/schemas/space_request_docx.schema.json`

Runtime use:

- EventRequest schema.
- Question flow.
- DOCX generation.
- Post-generation declaration output.
- Proceed-readiness.

DB candidate:

- EventRequest persistence table later.
- For MVP, EventRequest can be request/session state unless persistence is chosen.

#### `lbs-files/raw/request-event/LBS Crib Sheet_AMC.docx`

Observed content:

- Completed crib sheet for Asset Management Conference.
- The format is not identical to the updated blank Space Request Form, but it gives realistic example values for many fields.
- Useful values include organiser name, club, contact number, event title, expected attendance around 200, date, broad timing, event type, purpose/context, external speaker details, political sensitivity, children, space request, registration desk, decorations, catering, alcohol, music, cloakroom, equipment, and photos/filming.

MVP relevance:

- High as a completed example and test fixture, not as the field source.

Classification:

- Example data source for mapping, examples, and test scenarios.

Processed outputs:

- `processed/request-event/space_request_field_mapping_examples.md`
- Example values embedded in `processed/request-event/space_request_fields.json`

Runtime use:

- Example/test data.
- Demonstrates how older combined crib-sheet answers map into the updated form's more granular fields.

#### `lbs-files/raw/request-event/LBS Event Information Sheet 2023-24 - Copy.docx`

Observed content:

- EIS template.
- Includes event/programme, date, managers/directors, extension/mobile, budget code for out-of-hours services, accommodation, room booking confirmation, version, proposed attendees, attendee make-up, alcohol, music, hired equipment/services, activities/disruption, guest speakers/performers, additional information.
- Includes timing/schedule table and requirements table with time required, team, venue, requirement, and details.
- Header lists service team emails including estates, welcome desk, catering, space, duty managers, security, help, AV.

MVP relevance:

- In scope for Key Event candidates after EventRequest completion.

Classification:

- Post-Phase-1 generated document template.

Processed outputs:

- `processed/request-event/eis_template.md`
- `processed/templates/eis_template.docx`
- `processed/schemas/eis.schema.json`

Runtime use:

- EIS-style DOCX/draft generation using known EventRequest fields.
- Missing EIS-only fields marked `needs confirmation`.

DB candidate:

- Not required initially; EIS draft can be generated artifact.

#### `lbs-files/raw/request-event/LBS Event Terms and Conditions 2024-25.docx`

Observed content:

- Event organiser terms and conditions.
- Rules include: secure correct space first; do not publicise until space is confirmed; space requests under two weeks may be hard to support; all spaces booked through Space Management; named point of contact; organiser staffing ratios by size; catering via Lexington; catering orders 30 days before and final numbers 5 days before; external catering approval; alcohol only in certain areas and ordered/served under policy; additional security for larger events 100+ and security notice no later than 3 weeks; higher-risk events with 50+ and alcohol require number-management procedure; decoration restrictions/approval; noise/equipment responsibilities.

MVP relevance:

- High for guidance and timeline/checklist.

Classification:

- Policy/rules source and retrieval source.

Processed outputs:

- `processed/request-event/event_terms_rules.json`
- `processed/request-event/event_terms_chunks.jsonl`
- `processed/timeline/timeline_rules_from_terms.json`

Runtime use:

- Deterministic warnings/timeline items.
- Retrieval explanations.

DB candidate:

- `PolicyRule` table if policy rules are centralized.

#### `lbs-files/raw/request-event/Student Event Organisers Guide - Copy.pptx`

Observed content:

- Readable slide deck.
- Sections observed: before you start, define your event, planning, fundraising/sponsorship, brand/marketing/comms, press invitation template, ticketing, speakers, on-campus logistics, external venues, logistics at the event, final considerations.
- Specific guidance observed includes: leadership/team roles, audience clarity, programme design, sponsor/VAT/contract guidance, brand/comms approval, social media, photography/video permissions, media invitation handling, speaker reputation checks, speaker briefing, Chatham House/recording/media notes, on-campus process overview, space as first step, catering orders, EIS, relevant Campus Services/AV team engagement, Key Events meeting, external venues, registration, volunteers, reminders, feedback, continuity.

MVP relevance:

- Historical fallback/comparison context only.
- It should not be the runtime source now that `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md` exists.

Classification:

- Duplicate readable source / conversion aid.

Processed outputs:

- Runtime toolkit chunks should come from `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md`.
- Retain PPTX-derived outputs only for comparison:
  - `processed/toolkit/student_event_organisers_guide_sections.md`
  - `processed/toolkit/student_event_organisers_guide_chunks.jsonl`

Runtime use:

- Comparison/historical fallback only.

DB candidate:

- No, unless retained for audit/comparison.

### Space files

#### `lbs-files/raw/space/6) Guide to Space at the School - Copy.xlsx`

Observed content:

- Sheets include `Teaching & Office Support`, `Hospitality`, `Flat Floor`, `LTs`, `Meeting rooms`, `Catering`, `Refreshments`, and `SOC`.
- Contains room capacities, layouts, room types, activity type, linked-to spaces, bookability, AV, accessibility, catering delivery, catering types, and comments.

MVP relevance:

- High fallback/supporting source for room guidance.

Classification:

- Structured space/supporting lookup.

Processed outputs:

- `processed/space/guide_to_space_rooms.csv`
- `processed/space/guide_to_space_rooms.json`

Runtime use:

- Fallback room lookup.
- AV/catering/accessibility details where Space Matrix lacks them.

DB candidate:

- `SpaceSourceRecord`.

#### `lbs-files/raw/space/Copy of Room capacity overview - Copy.xlsx`

Observed content:

- Short capacity overview for lecture/seminar rooms.
- Rows include room, building, extension, default/fixed seating, max/exam seating notes.

MVP relevance:

- Supporting capacity fallback.

Classification:

- Structured supporting lookup.

Processed outputs:

- `processed/space/room_capacity_overview.csv`
- `processed/space/room_capacity_overview.json`

Runtime use:

- Capacity notes where Space Matrix is insufficient.

#### `lbs-files/raw/space/Hospitality spaces - Copy.xlsx`

Observed content:

- Sheet has a huge used range due to formatting, but real data rows at top.
- Columns include site, building, floor, room name, activity type, buffet service, plated service, fork buffet, drinks reception, catering delivered, catering type, alcohol served, comments.
- Rows include Nash Lounge, Lower Nash, Garden Room, Park Restaurant suites, outside spaces, E Wing Lounge, outside lecture theatre areas, etc.

MVP relevance:

- High for hospitality/catering/standing-reception room guidance.

Classification:

- Structured hospitality source.

Processed outputs:

- `processed/space/hospitality_spaces.csv`
- `processed/space/hospitality_spaces.json`

Runtime use:

- Hospitality space recommendations and catering/alcohol constraints.

DB candidate:

- `HospitalitySpace`.

#### `lbs-files/raw/space/Run of show template - Copy.xlsx`

Observed content:

- Sheets:
  - `Run of Show template`
  - `Mic schedule template`
  - `Example Run of Show`
  - `Example Mic schedule`
- Contains timing, session description, speakers, stage directions, on-screen, audio, notes, microphone schedule, and example Festival of Minds data.

MVP relevance:

- In scope as supporting document/example after EventRequest completion if detailed planning output is triggered.
- Not part of Phase 1.

Classification:

- Template and example.

Processed outputs:

- `processed/templates/run_of_show_template.md`
- `processed/templates/mic_schedule_template.md`
- `processed/examples/run_of_show_example.json`
- `processed/examples/mic_schedule_example.json`

Runtime use:

- Optional supporting document generation and checklist examples.

#### `lbs-files/raw/space/Sammy Ofer Centre Check List (Section 3) copy - Copy.docx`

Observed content:

- SOC teaching room and communal-area checklist.
- Includes rooms, default chairs/capacity, flipcharts, comments.
- Includes portering standards for teaching room/common-area setup, furniture arrangement, traffic flow, health and safety, and room servicing.

MVP relevance:

- Medium for SOC room defaults and setup caveats.

Classification:

- Supporting room data and operational guidance.

Processed outputs:

- `processed/space/soc_room_checklist.csv`
- `processed/space/soc_setup_guidance_chunks.jsonl`

Runtime use:

- SOC fallback details and setup guidance.

#### `lbs-files/raw/space/SOC rooms - Copy.xlsx`

Observed content:

- SOC room list with building, floor, room, capacity, room type, comments.
- Contains lecture theatres, seminar rooms, study rooms, boardrooms, link bridge/student lounge spaces, and notes such as fixed table setup or AV comments.

MVP relevance:

- High as SOC fallback/supporting source.

Classification:

- Structured space fallback.

Processed outputs:

- `processed/space/soc_rooms.csv`
- `processed/space/soc_rooms.json`

Runtime use:

- SOC-specific lookup.

#### `lbs-files/raw/space/Space Matrix (1) - Copy.xlsx`

Observed content:

- Broad space matrix.
- Columns include site, room code, room name, capacity, category, type, web rule, owner, area, link code, campus.
- 488 rows.

MVP relevance:

- Highest for primary space lookup.

Classification:

- Primary structured room source.

Processed outputs:

- `processed/space/space_matrix.csv`
- `processed/space/space_matrix.json`
- `processed/space/spaces.json`
- `processed/schemas/space.schema.json`

Runtime use:

- Primary space lookup and room metadata.
- Fallback only if room missing.

DB candidate:

- `Space` table with source priority fields.

## 7. Processed File Structure

Proposed generated structure after approval:

```text
lbs-files/
  processed/
    README.md
    finance/
      finance_codes.csv
      finance_codes.json
      finance_lookup_index.json
      finance_code_rules.md
      finance_code_test_cases.json
    lifecycle/
      lifecycle_phases.json
      phase_timelines.csv
      stakeholders_by_phase.csv
      forms_by_phase.json
      checklist_rules.json
    toolkit/
      toolkit_sections.md
      toolkit_chunks.jsonl
      toolkit_rules.json
    space/
      space_matrix.csv
      space_matrix.json
      spaces.json
      guide_to_space_rooms.csv
      guide_to_space_rooms.json
      room_capacity_overview.csv
      room_capacity_overview.json
      hospitality_spaces.csv
      hospitality_spaces.json
      soc_rooms.csv
      soc_rooms.json
      soc_room_checklist.csv
      room_setup_options.json
      space_source_conflicts.json
      space_recommendation_test_cases.json
    catering/
      catering_space_policy.csv
      catering_space_policy.json
      catering_policy_rules.json
      catering_policy_chunks.jsonl
      external_catering_waiver_template.md
      external_catering_rules.json
      hospitality_brochure_chunks.jsonl
    request-event/
      space_request_fields.json
      space_request_form_template.md
      event_terms_rules.json
      event_terms_chunks.jsonl
      eis_template.md
    key-event/
      key_event_rules.json
      key_event_test_cases.json
    routing/
      stakeholder_routing_rules.json
      stakeholder_email_templates.md
    monday/
      monday_payload_schema.json
      monday_payload_examples.json
    timeline/
      timeline_rules.json
      checklist_rules.json
    templates/
      space_request_form_template.docx
      eis_template.docx
      run_of_show_template.md
      mic_schedule_template.md
    examples/
      event_examples.json
      pasted_draft_examples.json
      run_of_show_example.json
      mic_schedule_example.json
    schemas/
      event_request.schema.json
      field_status.schema.json
      key_event_assessment.schema.json
      finance_code.schema.json
      space.schema.json
      stakeholder_routing.schema.json
      monday_payload.schema.json
    prompts/
      phase1_conversation_rules.md
      phase1_toolkit_shaping.md
      complexity_risk_prompt.md
      stakeholder_email_prompt.md
```

Do not generate these processed files until João approves the revised plan.

## 8. PostgreSQL Runtime Option

PostgreSQL is available in the project and may be used for processed runtime data.

Good DB candidates:

- `FinanceCode`
- `Space`
- `SpaceSourceRecord`
- `CateringSpacePolicy`
- `HospitalitySpace`
- `LifecyclePhase`
- `LifecycleTimelineItem`
- `LifecycleStakeholderTask`
- `PolicyRule`
- `KnowledgeChunk`
- `ExampleEvent`
- `GeneratedArtifact` if generated docs are persisted later

Good file-based candidates:

- Prompt instructions.
- JSON schemas.
- DOCX templates.
- Small deterministic rules JSON files.
- Test fixtures.

Recommended MVP approach:

- Generate processed files first.
- Decide which high-volume lookup sets should be loaded into PostgreSQL after the file output is reviewed.
- Avoid storing user-uploaded documents because upload is not in MVP.

## 9. Conversion Plan

After this plan is approved, convert all listed conversion candidates, including items previously marked "later".

### Finance

- Convert `Finance_Code_Directory - Copy.xlsx` to normalized CSV/JSON/index.
- Preserve source year/sheet and row metadata.
- Build fuzzy lookup test cases.
- Runtime behaviour: surface whenever budget is involved.

### Space

- Convert `Space Matrix (1) - Copy.xlsx` as primary source.
- Convert all supporting space files.
- Build `spaces.json` using source priority:
  - Space Matrix first.
  - Missing-room fallback to supporting sources.
  - Conflicts resolved by larger source, with source stated.
- Generate conflict report.

### Catering

- Convert catering policy spreadsheet to lookup JSON/CSV/rules.
- Convert external catering waiver to template and rules.
- Extract Hospitality Brochure PDF to chunks; if tables extract cleanly, create menu table.

### Toolkit

- Use `lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md` as the parsed authoritative Event Toolkit text.
- Keep PPTX outputs only as comparison/historical fallback context.
- Convert to sections/chunks/rules.
- Delete PPTX only if João explicitly approves after reviewing parsed PDF-derived outputs.

### Request / outputs

- Convert updated Space Request Form to field map, schema, and DOCX template.
- Use completed AMC crib sheet as a mapping/example fixture.
- Convert EIS template to schema/template.
- Convert terms and conditions to rules/chunks.
- Convert run-of-show and mic schedule to templates/examples.

### Key Event

- Derive deterministic `key_event_rules.json` and tests from `docs/project-context/key_event_identification_spec.md`.
- Do not invent criteria.
- Flag any non-deterministic ambiguity during implementation.

### Routing / emails / Monday

- Build routing rules from EventRequest fields and source docs.
- Build email prompt/templates for editable drafts.
- Build Monday mock schema and examples from existing implementation knowledge and Monday context.

## 10. Runtime Strategy

Runtime should use processed files and/or database tables, not raw Office/PDF files.

### Deterministic logic

Use deterministic code for:

- EventRequest field coverage.
- Finance code lookup.
- Space source selection and room lookup.
- Catering/alcohol availability where table data exists.
- Timeline/checklist rules extracted from source documents.
- Key Event candidate assessment using only `key_event_identification_spec.md`.
- Stakeholder routing where rules are explicit.
- Monday payload mapping from EventRequest.

### AI-backed logic

Use OpenAI through the backend only for:

- interpreting free text into EventRequest updates;
- shaping vague event ideas using toolkit context;
- drafting natural-language stakeholder emails;
- drafting document prose from structured fields;
- preliminary complexity/risk flags for LBS staff.

AI must not override deterministic Key Event assessment.

### Retrieval

Use retrieval chunks for:

- toolkit/event planning guidance;
- catering explanations;
- terms and conditions;
- lifecycle context;
- EIS and run-of-show guidance.

### Generated artifacts

Generate:

- Space Request DOCX;
- Key Event / EIS recommendation;
- full SA Operations / Eventscase email draft to `saoperations@london.edu`;
- timeline/checklist;
- Monday mock JSON.

Stretch generated artifacts:

- EIS-style DOCX/draft for Key Event candidates;
- stakeholder routing matrix;
- broader stakeholder email drafts after templates and expectations are confirmed.

Do not automatically submit, send, or write back.

## 11. MVP Scope

In scope:

- Chat-guided EventRequest completion.
- Pasted/manual draft review.
- Space Request DOCX generation.
- Finance-code lookup whenever budget is involved.
- Toolkit-based event shaping.
- Space, catering, alcohol, security, political/sensitive topic, and timeline guidance.
- Deterministic Key Event assessment after EventRequest completion.
- Key Event / EIS recommendation.
- Full SA Operations / Eventscase email draft to `saoperations@london.edu`, using `lbs-files/processed/routing/stakeholder_email_templates.md`.
- Timeline/checklist display.
- OpenAI-backed preliminary complexity/risk flags for LBS staff.
- Monday.com-ready mock JSON payload.
- Frontend epic test/demo surface.

MVP stretch:

- EIS-style draft for Key Event candidates.
- Stakeholder routing matrix.
- Broader stakeholder email drafts after templates and stakeholder expectations are confirmed.

Out of scope:

- Completeness score.
- In-chat form preview for MVP.
- Document uploads.
- Web lookup for speaker profiles.
- Automatic form submission.
- Automatic email sending.
- Real Monday API call.
- Integrations with catering, finance, ERP, fundraising, CRM, room booking, or other LBS systems.
- Post-event feedback, impact capture, lessons learned, handover summary, reusable recommendations.

## 12. WS3 / Production Readiness Report Expansion

The future WS3 report should explain what would be required to productionise this for LBS, a business school with many separate systems and departments.

Topics:

- Real Monday.com integration:
  - API authentication;
  - board/column mapping validation;
  - item/subitem creation policy;
  - ownership of updates;
  - audit trail and failure handling.

- ERP and finance:
  - finance-code request workflow;
  - cost centre validation;
  - budget approvals;
  - expense/reconciliation links;
  - role-based visibility.

- Room booking / timetabling:
  - real availability;
  - room reservation permissions;
  - conflict detection;
  - service desk handoff.

- Catering / Lexington:
  - menu availability;
  - quote/order workflow;
  - allergen handling;
  - external catering waiver workflow;
  - alcohol licensing controls.

- Fundraising / Advancement / sponsors:
  - sponsor contract routing;
  - donor/VIP flags;
  - Advancement/Dean's Office involvement;
  - fundraising CRM boundaries.

- Stakeholder workflow:
  - queues for Space, Catering, Security, AV, Duty Managers, Welcome Desk, Editorial, SA Finance, SA Sponsorship;
  - ownership and SLA;
  - staff override and feedback.

- Document handling:
  - uploads;
  - file size limits;
  - virus scanning;
  - storage location;
  - retention/deletion;
  - versioning.

- Data governance:
  - authentication/authorization;
  - audit logs;
  - sensitive-topic handling;
  - speaker/media data;
  - retention and deletion policy;
  - official policy disclaimers.

- Learning loop:
  - post-event feedback;
  - impact capture / lessons learned;
  - handover summary;
  - reusable recommendations for future similar events;
  - staff feedback to improve routing and risk flags.

## 13. Questions Answered By João

1. What is the official Space Request Form source?
   - Answer: Use `Event form - Space Request Form.docx` as the updated blank form and current field source.
   - Rationale: `LBS Crib Sheet_AMC.docx` is a completed example and is not identical to the updated blank form.

2. Which fields must be final before proceeding?
   - Answer: Use the LBS guide, transcript, and repo knowledge to understand what the user needs to proceed; guide until all fields are filled or explicitly marked.
   - Rationale: The plan should surface this as proceed-readiness based on official fields and source guidance.

3. What output format?
   - Answer: DOCX.

4. Upload or pasted/manual draft for MVP?
   - Answer: Pasted text and manual input only.
   - Rationale: Document upload introduces file limits, storage, cloud infrastructure, and handling arbitrary Word docs. Demo runs on localhost; no upload for MVP.

5. Which raw sources are valid/current?
   - Answer: Treat all raw sources as valid and report conflicts.
   - Rationale: `[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf` is the most authoritative source of all.

6. Is Event Toolkit PDF the same as PPT?
   - Answer: Yes.
   - Rationale: PDF is about 15MB and PPT is about 100MB; PPT can be deleted later.

7. Which room source wins conflicts?
   - Answer: Space Matrix first. Defer to other sources only if the required room is not in Space Matrix. If more than one fallback conflicts, use the source with more entries and state which source was used.
   - Rationale: MVP heuristic.

8. Can finance codes be displayed?
   - Answer: Yes.

9. When should finance-code lookup appear?
   - Answer: Whenever budget is involved, always.
   - Rationale: Very important to the product.

10. Should Key Event logic be implemented?
   - Answer: Yes.
   - Rationale: Use `docs/project-context/key_event_identification_spec.md` as the sole deterministic approach and flag ambiguity during implementation.

11. How much EIS support?
   - Answer: Core MVP should recommend EIS when the deterministic Key Event candidate assessment is triggered. EIS-style draft generation is MVP stretch.
   - Rationale: Phase 1 creates EventRequest; do not ask extra questions solely to fill EIS.

12. Should political topics alter user-facing wording?
   - Answer: Yes, surface because political topics require additional security and affect timelines.
   - Rationale: Anything significantly affecting timelines must be surfaced.

13. Are Monday payloads still wanted?
   - Answer: Yes.

14. Who validates deterministic rules?
   - Answer: Assume deterministic rules apply as written and surface rules to the user as guidance.

15. Should suggested PRD events be merged into examples?
   - Answer: Yes, merge into existing examples inventory as non-canonical fixtures.

## 14. Files And Docs Reorganisation

Active docs retained in `docs/project-context/`:

- `product-brief.md`
- `05_ws1_pains_jtbd_features_epics_user_stories.md`
- `06_user_view_prd_phase1_event_readiness_assistant.md`
- `event_readiness_assistant_phase_1_conversation_rules_spec.md`
- `key_event_identification_spec.md`

Supplanted docs moved to:

- `docs/project-context/historical-supplanted/`

Moved historical files:

- `01_supporting_files_takeaways.md`
- `02_architecture_workstreams_plan_v3_lbs_compliant.md`
- `03_github_setup_and_coordination.md`
- `04_team_chatgpt_codex_brief.md`
- `07_codex_prompt_addendum_ws1_docs.md`
- `event-request-contract.md`
- `monday-meeting-gameplan.md`
- `monday-workflow-takeaways.md`
- `wednesday-discussion-notes.md`
- `workstream-4-mini-prd.md`
- `workstream-4-workplan.md`

## 15. Epic-By-Epic Build And Review Process

After processed files are created and approved, implementation should proceed epic by epic.

For each epic:

- implement the backend/frontend slice;
- provide a frontend test/demo surface;
- include the main deliverable;
- show the relevant user stories;
- show checklist-style acceptance criteria;
- include example inputs;
- include all pre-determined test event scenarios for that epic;
- provide editable form fields so João can alter the event facts and rerun the output;
- expose the populated `EventRequest` object, including which fields matter for the epic;
- show OpenAI reasoning where OpenAI is used;
- expose generated outputs;
- record any unresolved gaps before moving to the next epic.

This is how João and Codex will verify that each story is actually being met.

When testing the chat itself, editable form controls may be hidden so the conversation can be evaluated naturally. Even in chat tests, the test surface should still show the `EventRequest` object being populated turn by turn, the fields that matter, and any OpenAI reasoning used by the backend.

The project has an OpenAI API key available through backend configuration. MVP features that call for LLM interpretation, drafting, or preliminary complexity/risk reasoning should use OpenAI through the backend instead of hard-coded mock reasoning, while keeping deterministic rules deterministic.

## 16. Stop Point

João approved this plan and the conversion strategy on 2026-06-03. Conversion may now proceed.

Do not implement app logic, delete raw source files, or remove the duplicate PPTX until processed outputs are created and reviewed.
