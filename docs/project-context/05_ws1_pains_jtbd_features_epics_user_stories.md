# Event Readiness Assistant: Pains, JTBD, Features, Epics, and User Stories

## 0. Purpose of this document

This document translates the new WS1 reference material into a build-ready product breakdown for Codex and the MVP team.

It is based on:

- `Event Readiness Assistant - Phase 1 Conversation Rules Spec.docx`
- `key-event-identification-spec.docx`
- Existing project context docs uploaded with the prompt, especially the architecture plan, supporting-file takeaways, GitHub coordination notes, team Codex brief, and WS4 mini-PRD.

This document should be treated as a product-context input, not as final official LBS policy. Anything marked as an unknown must be resolved by João, WS1, or the relevant LBS process owner before implementation is treated as final.

---

## 1. Revised product interpretation

The product should now be understood as a **Phase 1 Space Request readiness assistant first**, with Key Event / EIS guidance only after the Space Request Form has been drafted, uploaded, or confirmed complete.

The previous broader framing of a full end-to-end event orchestration assistant remains useful as future direction, but the user-facing MVP should prioritise:

1. diagnosing the organiser's starting point,
2. collecting enough information to produce or validate a Space Request Form,
3. allowing uncertainty without blocking progress,
4. asking small, themed question batches,
5. generating an editable Space Request Form-style draft only after permission,
6. supporting revision loops,
7. running Key Event candidate logic only after Phase 1 output exists or is confirmed.

---

## 2. Pains we are solving

### 2.1 Student organiser pains

| Pain | What it looks like | Product response |
|---|---|---|
| I do not know where to start | Student has a budget, vague idea, or broad format but no operational plan | Entry triage plus toolkit-based shaping prompts |
| I do not know what information LBS needs | Student omits event purpose, timings, setup, catering, AV, speaker details, or registration needs | Guided Space Request Form field map with coverage tracking |
| I do not know which fields can be uncertain | Student hesitates because organiser details, speaker names, or venue preferences are incomplete | Allow `not sure yet`, `needs confirmation`, and `to be added by organiser` where permitted |
| I do not know which space or setup to request | Student cannot translate a panel, mixer, workshop, or conference into room/setup needs | Structured venue type and room configuration options, with suggestions when unsure |
| I do not know how to describe the event well | Student gives a weak or vague event idea | Toolkit-based shaping converts purpose, audience, unique value, resource readiness, and success signal into form-ready answers |
| I do not know if my event is simple or requires more oversight | Student may have 100+ attendees, external guests, senior speakers, media, or complex logistics | Key Event candidate check after form draft, using conservative confirmed-info logic |
| I do not know what happens after the form | Student thinks the form is the whole workflow or does not know when EIS may apply | Post-draft next-step offer, including EIS only if criteria are met |
| I already have a draft but do not know whether it is usable | Student uploads/pastes a partially completed form | Uploaded draft review maps existing answers, identifies gaps, and asks targeted follow-ups |
| I do not want to answer a long static form | Student drops out when asked too many unrelated questions | No more than three themed questions at once, with structured options and free-text support |
| I need an editable output, not just advice | Student must submit or send information onward | In-chat preview plus editable downloadable document following Space Request Form structure |

### 2.2 Staff and stakeholder pains

| Pain | What it looks like | Product response |
|---|---|---|
| Incomplete Space Request Forms | Staff receive requests without clear date, attendance, setup, speaker, or catering information | Completion check before draft output |
| Repeated clarification emails | Staff ask the same follow-up questions repeatedly | Assistant collects missing information upfront |
| Students ask staff to be a process encyclopedia | Basic process questions go to Jo or operational stakeholders | Assistant provides first-line guidance and structured options |
| Escalation triggers are tacit | Key Event candidates are recognised late or inconsistently | Candidate logic uses confirmed attendance and criteria thresholds after Phase 1 |
| Overconfident AI escalation would create risk | Assistant could incorrectly state official policy | User-facing language says events `could be considered` or `may qualify`; LBS staff retain final determination |
| Key Event/EIS guidance could distract too early | Students may be pushed into advanced planning before the first required form exists | Key Event/EIS guidance is deferred until the Space Request Form is drafted or confirmed |
| Stakeholders need different information | Catering, Space, AV, Security, Duty Managers, Editorial, and others need different details | Future stakeholder packets can draw from the same structured EventRequest |

### 2.3 Demo and build-team pains

| Pain | What it looks like | Product response |
|---|---|---|
| Product scope drift | The prototype tries to become a full Monday.com replacement or full event lifecycle engine | Phase 1 boundary: Space Request Form first; Key Event / EIS next step after draft |
| Conflicting workstream assumptions | Old workstream split and broad WS4 scope conflict with new WS1 requirements | New docs should supersede old technical-workstream allocation and be reconciled into planning files |
| Hard-to-test conversational logic | Chatbot behaviour is only described in prose | Convert rules into user stories, acceptance criteria, state models, and field coverage checks |
| Runtime parsing risk | App might try to parse raw DOCX/PDF/XLSX during user chat | Use processed structured data and templates at runtime; raw files remain source-of-truth backup |

---

## 3. Jobs to be done

### 3.1 Primary student jobs

| ID | Situation | Motivation | Desired outcome |
|---|---|---|---|
| JTBD-01 | When I have a rough event idea | I want to know what LBS needs from me | So I can turn the idea into a requestable event |
| JTBD-02 | When I only have budget/resources but no idea | I want help shaping an event concept | So I can choose a viable format and complete the form |
| JTBD-03 | When I already know the event format | I want the assistant to ask only for the missing details | So I do not repeat information I already gave |
| JTBD-04 | When I do not know an answer | I want to mark it as uncertain or get common options | So I can keep progressing rather than abandon the request |
| JTBD-05 | When the assistant has enough information | I want to review an in-chat preview before generating the document | So I can spot obvious errors before export |
| JTBD-06 | When I need a Space Request Form | I want an editable draft in the right structure | So I can review, edit, and send it onward |
| JTBD-07 | When I already have a draft | I want the assistant to review it against required components | So I can fill only the gaps |
| JTBD-08 | When my event may be complex | I want to know whether it could be a Key Event | So I can prepare the EIS next step without claiming official determination |
| JTBD-09 | When I reject or defer the EIS | I want the tool to remember the flag but let me continue | So I can stay in control of the immediate flow |

### 3.2 Staff / LBS jobs

| ID | Situation | Motivation | Desired outcome |
|---|---|---|---|
| JTBD-10 | When students submit event requests | Staff want cleaner forms | So they spend less time chasing basic information |
| JTBD-11 | When an event may require coordination | Staff want early, structured signals | So they can identify Key Event candidates before last-minute escalation |
| JTBD-12 | When the assistant gives advice | Staff want conservative language | So students do not mistake prototype guidance for official approval |
| JTBD-13 | When future builders extend the MVP | Staff and the team want structured data | So routing, EIS, Monday handoff, and post-event learning can reuse the same EventRequest |

---

## 4. Feature inventory

### 4.1 Phase 1 core features

| Feature ID | Feature | Description | MVP priority | Source of logic |
|---|---|---|---|---|
| F-01 | Entry-type detection | Classify user start as prepared event, budget-only, general idea, or uploaded draft | Must have | Phase 1 Conversation Rules Spec |
| F-02 | Working event profile | Maintain known details, unresolved fields, and uncertainty markers across turns | Must have | Phase 1 Conversation Rules Spec |
| F-03 | Themed question batching | Ask up to three related questions at once, with limited exceptions | Must have | Phase 1 Conversation Rules Spec |
| F-04 | Structured input options | Use single-select, multi-select, checkboxes, Other, Not sure, Needs confirmation, Help me decide | Must have | Phase 1 Conversation Rules Spec |
| F-05 | Toolkit-based event shaping | For vague or budget-only users, ask purpose, audience, unique value, resources, and success signal | Must have | Phase 1 Conversation Rules Spec + Event Toolkit context |
| F-06 | Space Request Form field map | Collect enough data for each major form component | Must have | Phase 1 Conversation Rules Spec |
| F-07 | Completeness coverage check | Determine whether each major form component has final, provisional, uncertain, or follow-up value | Must have | Phase 1 Conversation Rules Spec |
| F-08 | Draft permission prompt | Ask before generating a preview or downloadable draft | Must have | Phase 1 Conversation Rules Spec |
| F-09 | In-chat preview | Show a structured preview in Space Request Form order, with missing/uncertain fields | Must have | Phase 1 Conversation Rules Spec |
| F-10 | Editable output generation | Generate an editable downloadable document that mirrors the Space Request Form structure as closely as practical | Should have for MVP, exact format unknown | Phase 1 Conversation Rules Spec |
| F-11 | Revision loop | Let users request edits after draft generation and regenerate preview/document | Must have | Phase 1 Conversation Rules Spec |
| F-12 | Uploaded draft review | Map uploaded/pasted form answers, preserve user answers, list gaps, and ask targeted follow-ups | Should have if upload parsing exists | Phase 1 Conversation Rules Spec |

### 4.2 Post-Phase 1 Key Event / EIS features

| Feature ID | Feature | Description | MVP priority | Source of logic |
|---|---|---|---|---|
| F-13 | Quiet Key Event signal capture | Capture possible indicators during Phase 1 without interrupting form completion | Must have if Key Event flow is included | Phase 1 + Key Event specs |
| F-14 | Confirmed-info Key Event assessment | Run assessment only after Space Request Form draft/confirmation | Must have if Key Event flow is included | Key Event Identification Spec |
| F-15 | Attendance trigger | Flag candidate if confirmed expected attendance is 100+ | Must have | Key Event Identification Spec |
| F-16 | Criteria threshold trigger | Flag candidate if two or more confirmed non-attendance criteria are present | Must have | Key Event Identification Spec |
| F-17 | Non-counting missing-info rule | Do not count unknown/vague/uncollected criteria; do not ask extra questions solely for Key Event scoring | Must have | Key Event Identification Spec |
| F-18 | High-profile speaker classifier | Identify high-profile speakers from user-provided info only, using seniority, organisation, public visibility, and LBS relevance | Should have | Key Event Identification Spec |
| F-19 | Significant operational elements detector | Count complex operational needs using four-stakeholder threshold and beyond-standard patterns | Should have | Key Event Identification Spec |
| F-20 | Sensitive topic passive signal | Store sensitive topic as an internal signal, not a standalone v1 trigger | Must have if sensitive topics collected | Key Event Identification Spec |
| F-21 | EIS next-step offer | If candidate threshold is met, say event could be considered a Key Event and offer to start EIS | Must have if Key Event flow is included | Key Event Identification Spec |
| F-22 | EIS response handling | Support `Yes, start now`, `Not now`, and `I'm not sure / tell me more` | Should have | Key Event Identification Spec |

### 4.3 Platform and integration-adjacent features

| Feature ID | Feature | Description | MVP priority | Source of logic |
|---|---|---|---|---|
| F-23 | Shared EventRequest contract | Base object for intake facts, consumed by downstream tiering, routing, outputs, and integration payloads | Must have | Architecture/GitHub docs |
| F-24 | Backend-only AI calls | Use OpenAI only through backend services | Must have | Architecture docs |
| F-25 | Deterministic stakeholder packet readiness | Prepare EventRequest fields so deterministic routing can consume them later | Should have | Supporting files + WS4 mini PRD |
| F-26 | Optional staff-side handoff payload | Future output can map to Monday-like payload, but not as canonical workflow | Future or demo-only | WS4 mini PRD + architecture docs |
| F-27 | Human-review and uncertainty messaging | Label guidance as prototype, avoid official policy claims, and preserve unknowns | Must have | All context docs |

---

## 5. Epics

| Epic ID | Epic | Outcome | Key features |
|---|---|---|---|
| E-01 | Start and triage the organiser journey | User can begin from a prepared request, vague idea, budget-only situation, or uploaded draft | F-01, F-04, F-05, F-12 |
| E-02 | Build the working event profile | The app maintains structured event facts, uncertainty markers, and unresolved fields | F-02, F-06, F-07, F-23 |
| E-03 | Guide the user through form-ready answers | The app asks small, relevant question batches and does not repeat known information | F-03, F-04, F-05, F-06 |
| E-04 | Generate and revise the Space Request Form draft | The app asks permission, shows preview, creates editable output, and supports revisions | F-08, F-09, F-10, F-11 |
| E-05 | Review existing drafts | The app maps user-provided drafts, preserves answers, and fills gaps | F-12 |
| E-06 | Assess Key Event candidacy after Phase 1 | The app uses confirmed-info logic to offer EIS next step without claiming official determination | F-13 to F-22 |
| E-07 | Keep downstream routes viable | EventRequest is structured enough for stakeholder routing, outputs, and future integration | F-23, F-25, F-26 |
| E-08 | Protect users and LBS from overconfident automation | The app handles unknowns, avoids policy claims, and never submits forms automatically | F-17, F-20, F-21, F-27 |

---

## 6. User stories and acceptance criteria

### E-01: Start and triage the organiser journey

#### US-01: Prepared event request

As a student organiser with a mostly formed event idea, I want the assistant to recognise what I have already provided so that I only answer missing questions.

Acceptance criteria:

- Given the user provides event type, timing, attendance, speaker, or venue details, the assistant summarises known details.
- The assistant does not ask for the same details again unless unclear.
- The next prompt asks the smallest missing themed set needed for Space Request Form coverage.
- The prompt contains no more than three questions unless the user has already provided most details.

#### US-02: Budget-only user

As a student organiser with budget but no event concept, I want the assistant to shape 2-3 viable event formats so that I can choose one and proceed to the form.

Acceptance criteria:

- The assistant asks about outcome, audience, constraints, and approximate budget/resources.
- The assistant suggests 2-3 suitable formats.
- The assistant asks which format to proceed with.
- The assistant does not block the user because the initial idea is weak.

#### US-03: General event idea

As a student organiser with a broad idea like a mixer or panel, I want the assistant to convert it into operational details so that I can complete the form.

Acceptance criteria:

- The assistant asks about purpose, audience, expected attendance, timing, and high-level format first.
- The assistant then moves to space/setup, catering, AV, and special requirements.
- The assistant maps answers into the working event profile.

#### US-04: Uploaded draft

As a student organiser with an existing draft, I want the assistant to review it for gaps so that I can avoid starting again.

Acceptance criteria:

- The assistant acknowledges that it will review against Space Request Form components.
- The assistant extracts answers into the working event profile.
- The assistant does not overwrite user-provided answers unless asked.
- The assistant lists only missing, vague, or contradictory fields.
- The assistant asks targeted follow-up questions, not the whole form again.

### E-02: Build the working event profile

#### US-05: Event profile state

As a student organiser, I want the assistant to remember the event details I have already given so that the conversation feels coherent.

Acceptance criteria:

- Each user turn updates a structured profile.
- Each major form component has one of: final, provisional, not sure, needs confirmation, or empty.
- The assistant can display known details and unresolved fields on request.
- Additional context that does not map cleanly is preserved rather than dropped.

#### US-06: Form coverage tracking

As a student organiser, I want to know when I have enough information to draft the form so that I can proceed confidently.

Acceptance criteria:

- The system checks every major form component before drafting.
- A draft is allowed when each component has a usable answer, provisional answer, or follow-up marker.
- Unknown-but-allowed fields do not block the draft.
- The preview explicitly shows fields marked `needs confirmation`.

### E-03: Guide the user through form-ready answers

#### US-07: Small themed question batches

As a student organiser, I want questions grouped sensibly so that the conversation is not overwhelming.

Acceptance criteria:

- The assistant asks no more than three themed questions at a time by default.
- The assistant may ask up to five only for one structured checklist or when the user has already provided most details.
- The assistant avoids mixing unrelated topics unless the flow is nearly complete.

#### US-08: Structured options with escape hatches

As a student organiser, I want selectable options plus an Other field so that I can answer quickly without losing flexibility.

Acceptance criteria:

- Predictable fields use single-select or multi-select options.
- Every structured question includes `Other`.
- Uncertain fields include `Not sure yet`, `Needs confirmation`, or `Help me decide` where appropriate.
- Free text can be interpreted and mapped to the closest form fields.

#### US-09: Toolkit-based shaping

As a student organiser with a vague idea, I want the assistant to improve the concept without judging it so that it becomes form-ready.

Acceptance criteria:

- The assistant asks about strategic alignment, unique value, audience clarity, resource readiness, and success signal.
- The assistant converts answers into form fields, especially purpose/context and event format.
- The assistant frames shaping as support, not gatekeeping.

### E-04: Generate and revise the Space Request Form draft

#### US-10: Permission before drafting

As a student organiser, I want the assistant to ask before generating a draft so that I control when the output is created.

Acceptance criteria:

- The assistant explicitly says it has enough information to generate a first draft.
- The assistant warns that some fields may be marked `needs confirmation`.
- The assistant asks whether the user wants to generate the preview now.
- No downloadable draft is generated before permission.

#### US-11: In-chat preview

As a student organiser, I want a structured preview before download so that I can check the content.

Acceptance criteria:

- The preview follows the Space Request Form order as closely as practical.
- The preview highlights missing, uncertain, and needs-confirmation fields.
- The preview includes additional requirements/context.
- The preview does not claim the form has been submitted.

#### US-12: Editable downloadable document

As a student organiser, I want an editable draft document so that I can review, edit, and send it onward.

Acceptance criteria:

- The output follows the Space Request Form structure as closely as practical.
- The output is editable.
- The output contains final and provisional answers.
- The output preserves uncertainty markers.
- The output contains no hidden submission or automatic routing action.

#### US-13: Revision loop

As a student organiser, I want to edit the draft through conversation so that the final version reflects my intent.

Acceptance criteria:

- The user can request changes after preview or download.
- The assistant updates the working event profile.
- The assistant regenerates the preview/document.
- The loop continues until the user is satisfied.

### E-05: Review existing drafts

#### US-14: Draft upload review

As a student organiser with a filled form, I want to upload or paste it so that the assistant can tell me whether it is complete enough to use.

Acceptance criteria:

- The assistant extracts answers into the same EventRequest/profile model.
- The assistant identifies missing, vague, or contradictory fields.
- The assistant asks targeted follow-ups.
- The assistant confirms when every major component has an answer or marker.
- If upload parsing is not available, the assistant offers pasted text as a fallback.

### E-06: Assess Key Event candidacy after Phase 1

#### US-15: Post-draft assessment timing

As a student organiser, I want Key Event guidance only after my Space Request Form is ready so that I am not distracted from the first required artifact.

Acceptance criteria:

- During Phase 1, the assistant may capture possible Key Event indicators quietly.
- The assistant does not interrupt form completion with Key Event/EIS guidance unless the user directly asks.
- The assistant only offers assessment after Space Request Form draft generation, upload review, or completion confirmation.

#### US-16: Attendance trigger

As a student organiser with a large event, I want to know that my event could need Key Event follow-up so that I can prepare earlier.

Acceptance criteria:

- If confirmed expected attendance is 100 or more, `key_event_candidate` is true.
- The trigger type is `attendance_100_plus`.
- User-facing copy says the event `could be considered` a Key Event.
- The assistant offers the EIS next step.

#### US-17: Criteria threshold trigger

As a student organiser with a complex event, I want the assistant to identify confirmed Key Event indicators so that I understand why EIS may be needed.

Acceptance criteria:

- If two or more confirmed non-attendance criteria are present, `key_event_candidate` is true.
- Criteria include high-profile speaker, complex logistics, significant operational elements, external audience, and external media attendance.
- Missing or unconfirmed criteria are not counted.
- User-facing reasons are concise and based only on confirmed information.

#### US-18: Below-threshold silence

As a student organiser with a routine event, I do not want unnecessary Key Event messaging so that I can continue to the next relevant planning step.

Acceptance criteria:

- If attendance is below 100 and fewer than two confirmed non-attendance criteria are present, the assistant does not mention Key Events.
- The assistant proceeds to the next relevant planning action.
- The assistant still stores any non-counted internal signals if applicable.

#### US-19: EIS offer response handling

As a student organiser, I want to accept, defer, or learn more about EIS so that I can choose the next step.

Acceptance criteria:

- If the user says `Yes, start now`, EIS offer status becomes `accepted` and the next EIS flow can begin if implemented.
- If the user says `Not now`, EIS offer status becomes `deferred` and the internal flag remains.
- If the user says `I'm not sure / tell me more`, the assistant explains EIS and Key Events Meeting at a high level without inventing policy.
- The assistant never allows the user to permanently reject LBS determination.

### E-07: Keep downstream routes viable

#### US-20: Shared EventRequest output

As the technical delivery owner, I want intake to produce one shared EventRequest object so that tiering, routing, outputs, and integrations do not invent separate schemas.

Acceptance criteria:

- All collected form facts map to shared schema fields or documented extensions.
- Derived outputs such as key event assessment and stakeholder packets are separate from base EventRequest unless the active schema says otherwise.
- Any schema gap is documented as an unknown, not silently invented.

#### US-21: Stakeholder-readiness data

As downstream routing/output logic, I want enough structured detail from Phase 1 so that stakeholder packets can be generated later.

Acceptance criteria:

- EventRequest includes attendance, audience, speakers, timing, space/setup, catering, alcohol, AV, registration, filming/media, sensitive topic, outside equipment, and additional context where available.
- Unknowns are marked explicitly.
- Stakeholder-specific missing information can be derived from the structured object.

### E-08: Protect users and LBS from overconfident automation

#### US-22: Prototype and policy disclaimers

As LBS staff, I want the assistant to avoid official policy claims so that users do not treat the prototype as final approval.

Acceptance criteria:

- Key Event messaging says `could be considered` or `may qualify`, never `is a Key Event`.
- The assistant states that LBS staff retain final determination where relevant.
- No form, email, escalation, or submission is sent automatically.
- The assistant does not use web lookup to verify speaker profile in v1 unless later explicitly added.

#### US-23: Passive sensitive-topic handling

As LBS staff, I want sensitive-topic answers captured carefully so that future review can use the information without premature escalation.

Acceptance criteria:

- Sensitive-topic `yes` is stored as an internal complexity signal with user explanation.
- Sensitive topic alone does not trigger Key Event messaging in v1.
- The signal appears in internal rationale, not as a standalone user-facing trigger.

---

## 7. Prioritisation for the next Codex pass

### Must have

- Read and reconcile the new WS1 docs.
- Update planning files so old technical-workstream split is obsolete.
- Create or update PLAN.md to include the new business logic docs.
- Treat Phase 1 as Space Request Form first.
- Implement or plan a working event profile.
- Use small themed question groups.
- Allow uncertainty markers.
- Ask permission before drafting.
- Generate a structured in-chat preview.
- Run Key Event candidate logic only after draft/confirmation.

### Should have

- Editable downloadable document output.
- Uploaded draft review.
- Key Event/EIS offer response handling.
- Deterministic Key Event candidate assessment using confirmed information.
- Internal assessment output with user-facing and internal rationale.

### Could have

- Initial EIS draft starter flow.
- Stakeholder packet integration with the Phase 1 profile.
- Monday-ready mock payload informed by Phase 1 and Key Event output.
- Post-event handover placeholder.

### Out of scope for this pass

- Real submissions to LBS systems.
- Real Monday.com API integration.
- Web lookup for speaker seniority.
- Official LBS policy determination.
- Full event quality scoring before Space Request Form completion.
- Blocking vague event ideas.
