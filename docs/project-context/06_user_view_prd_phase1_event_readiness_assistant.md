# PRD: Event Readiness Assistant Phase 1 User Experience

## 1. Product name

Event Readiness Assistant

## 2. PRD scope

This PRD defines how the product should look and behave from the **student organiser's point of view** for the next MVP pass.

The current priority is **Phase 1: guide an LBS student club organiser to a completed or complete-enough Space Request Form draft**.

Key Event / EIS guidance is included only as a **post-Phase 1 next step**. It must not interrupt or block Space Request Form completion unless the user directly asks about it.

This PRD intentionally flags unknowns. Codex should not fill these with invented policy or invented UI. If the repo or other docs already contain an answer, Codex should reconcile it and update the relevant planning files. If no answer exists, Codex should ask João.

---

## 3. Source context used

Primary new WS1 sources:

- `Event Readiness Assistant - Phase 1 Conversation Rules Spec.docx`
- `key-event-identification-spec.docx`

Supporting project sources:

- `01_supporting_files_takeaways.md`
- `02_architecture_workstreams_plan_v3_lbs_compliant.md`
- `03_github_setup_and_coordination.md`
- `04_team_chatgpt_codex_brief.md`
- `workstream-4-mini-prd.md`
- Existing repo and `lbs-files/` context, to be inspected by Codex.

---

## 4. Product purpose

The Event Readiness Assistant helps student club organisers move from an uncertain event idea, a partial plan, or an existing draft to a structured, editable Space Request Form-style output.

The product should reduce avoidable back-and-forth between students and LBS staff by making the organiser's request clearer, more complete, and easier to route.

It should feel like a guided intake and orchestration assistant, not a static form and not an unrestricted generic chatbot.

---

## 5. Primary user problem

Student organisers often do not know:

- what information LBS needs to book or assess event space,
- what details are missing from their request,
- which answers can be provisional,
- how to translate a rough idea into a form-ready event concept,
- what space, setup, catering, AV, registration, or speaker information to provide,
- whether an event may require Key Event / EIS follow-up after the first form is prepared.

Staff then receive incomplete, vague, or inconsistent requests and spend time chasing basic information.

---

## 6. Users

### Primary user

LBS student club organiser.

Likely subtypes:

- club president,
- senior ExCo member,
- junior ExCo member,
- first-time event organiser,
- organiser with a partially completed Space Request Form.

### Secondary users affected by the output

- Space Management,
- Catering,
- AV / Technology,
- Security,
- Duty Managers,
- Estates / porters,
- Editorial Planning,
- SA Finance / Treasury,
- SA Sponsorship,
- Dean's Office / Advancement / External Relations when applicable.

The MVP does not need dedicated views for every secondary user unless the current implementation already has them. Their needs should still shape the structure of the EventRequest and generated outputs.

---

## 7. Product goals

### Goal 1: Help users complete Phase 1

The assistant should keep the conversation going until every major Space Request Form component has at least a usable answer, provisional answer, `not sure`, or `needs confirmation` value.

### Goal 2: Preserve user momentum

The assistant should not block vague or uncertain users. It should help shape the event concept and mark unknowns where allowed.

### Goal 3: Produce usable outputs

The assistant should generate:

- an in-chat preview organised like the Space Request Form,
- an editable downloadable draft if supported by the MVP,
- clear missing/uncertain fields,
- post-draft next steps.

### Goal 4: Avoid premature escalation

Key Event / EIS guidance should happen after the Space Request Form draft has been generated, uploaded, or confirmed complete.

### Goal 5: Stay safe and conservative

The assistant must not claim official LBS policy determination, submit forms, send emails, or escalate automatically.

---

## 8. Non-goals

The Phase 1 MVP is not:

- a full event quality assessment workflow,
- a full event lifecycle workflow from ideation through post-event follow-up,
- a Monday.com clone,
- an official LBS approval system,
- a system that submits forms or emails automatically,
- a web-research agent for speaker profiles,
- a production-grade document parsing platform unless current implementation already supports it.

---

## 9. User journey overview

### Default journey

```text
User opens Event Readiness Assistant
  -> chooses or types starting point
  -> assistant identifies entry type
  -> assistant builds working event profile
  -> assistant asks themed follow-up questions
  -> assistant tracks form coverage
  -> assistant says it has enough information
  -> assistant asks permission to draft
  -> assistant shows Space Request Form preview
  -> assistant optionally creates editable downloadable draft
  -> user requests revisions if needed
  -> assistant confirms form is complete enough to use
  -> assistant runs/offers post-draft Key Event / EIS check
  -> if candidate threshold is met, assistant offers EIS next step
  -> if not met, assistant proceeds to relevant next planning action
```

### Supported entry types

1. Prepared event request.
2. Budget only / no event idea.
3. General event idea.
4. Uploaded or pasted Space Request Form draft.

---

## 10. UX principles

### 10.1 Progressive disclosure

The user should not see the entire Space Request Form as a wall of questions unless they explicitly choose form mode. The assistant should ask small, themed batches.

### 10.2 Structured options plus flexibility

Predictable answers should use choices. Every structured question should include `Other`. Where uncertainty is common, include `Not sure yet`, `Needs confirmation`, or `Help me decide`.

### 10.3 Do not repeat known information

When the user provides details, the assistant should reflect them and ask only for missing or unclear fields.

### 10.4 Follow the user's lead

If the user starts with catering, AV, or space, collect that first and return to remaining sections later.

### 10.5 Keep vague ideas moving

Weak event ideas should be shaped, not rejected. The assistant may suggest clarifying options but should continue toward form completion.

### 10.6 Ask before drafting

The assistant must ask permission before generating a preview or downloadable draft.

### 10.7 Defer Key Event / EIS guidance

The assistant may quietly record possible Key Event signals, but it should not surface Key Event / EIS guidance before the Space Request Form is drafted or confirmed unless the user directly asks.

---

## 11. Screens / user-facing modules

Codex should map these to the existing app structure. If the current app already has different pages/components, reconcile rather than replacing blindly.

### 11.1 Start / landing panel

Purpose: let the user begin the intake in a low-friction way.

User-facing content should include:

- product name,
- one-sentence explanation,
- primary input area,
- optional starting buttons.

Suggested start buttons:

- `I have an event idea`
- `I have budget but no event idea yet`
- `I already started a Space Request Form`
- `I know what I need and want to draft quickly`

Unknowns:

- Whether Auth0 login is mandatory before landing page access.
- Whether there is an existing route for intake.
- Whether the UI should be chat-only, split chat/form, or wizard-first.

### 11.2 Conversational intake area

Purpose: guide the user through the Space Request Form field map.

Required behaviours:

- show assistant prompts,
- show user responses,
- ask up to three themed questions at once,
- support structured options,
- support free-text answers,
- allow `Other`, `Not sure yet`, `Needs confirmation`, and `Help me decide`.

Suggested UI pattern:

- left/main column: conversation,
- right/sidebar: working event profile, completeness, and unresolved items.

Unknowns:

- Whether the current code already supports chat state.
- Whether structured options exist as UI components.
- Whether voice input or rambling free text is in scope.

### 11.3 Working event profile sidebar

Purpose: make the user's progress visible without turning the product into a static form.

Should show:

- event name / working title,
- club / organiser if known,
- date / timing if known,
- expected attendance,
- audience,
- format,
- space/setup needs,
- catering/alcohol,
- AV,
- external speakers / sensitivity,
- missing or needs-confirmation fields.

Field statuses:

- `complete`,
- `provisional`,
- `not sure yet`,
- `needs confirmation`,
- `missing`.

Unknowns:

- Whether the current app has an event profile panel.
- Whether a numeric completeness score should be shown to users or kept internal.

### 11.4 Form coverage / readiness status

Purpose: tell the user when a draft can be generated.

The assistant should track each major Space Request Form component:

- submission timing,
- organiser details,
- event fundamentals,
- audience,
- date and timing,
- event format,
- purpose/context,
- external speakers,
- political sensitivity,
- preferred venue type,
- room configuration,
- additional spaces,
- catering,
- alcohol,
- AV,
- welcome/registration,
- decorations,
- noise/disruption,
- outside equipment,
- filming,
- streaming media,
- additional requirements/context.

A component can be draft-ready if it has a final answer, provisional answer, `not sure`, or `needs confirmation` value where allowed.

Unknowns:

- Which fields must be final before submission versus may remain `needs confirmation`.
- Whether the official Space Request Form has fields not reflected in the current field map.

### 11.5 Draft permission moment

Purpose: avoid surprising users with generated documents.

Required wording intent:

- tell the user enough information exists,
- say some fields may be marked `needs confirmation`,
- ask whether to generate the preview now.

Example copy:

> I have enough information to create a first Space Request Form draft. Some fields will be marked needs confirmation. Would you like me to generate the preview now?

Unknowns:

- Whether preview generation and downloadable document generation are one action or two actions.

### 11.6 In-chat Space Request Form preview

Purpose: let the user review before downloading or submitting.

Required structure:

- same section order as the Space Request Form as closely as practical,
- clear labels,
- explicit `needs confirmation` markers,
- additional requirements/context preserved,
- no claim that the form has been submitted.

Required actions:

- `Edit draft`,
- `Generate/download editable document`, if supported,
- `Continue to next step`,
- `Mark more fields as needs confirmation`, if useful.

Unknowns:

- Exact preview styling.
- Whether all fields should be shown or only populated fields plus uncertain fields.

### 11.7 Editable downloadable draft

Purpose: give the student an artifact they can review, edit, and send onward.

Required behaviours:

- generate an editable document following Space Request Form structure as closely as practical,
- include final, provisional, and uncertainty-marked values,
- preserve additional context,
- do not submit automatically.

Unknowns:

- Whether MVP output should be Word, fillable PDF, both, or only in-chat preview.
- Whether exact visual layout must match the official Space Request Form or a clean field-by-field editable document is enough.
- Whether document generation already exists in the repo.

### 11.8 Revision loop

Purpose: let the user correct or refine the draft.

Required behaviours:

- user can ask for edits after preview or document generation,
- assistant updates working profile,
- preview/document regenerates,
- loop continues until the user confirms.

Unknowns:

- How version history should be displayed.
- Whether downloaded files should be regenerated with unique filenames.

### 11.9 Uploaded draft review

Purpose: help users who already started the process.

Required behaviours:

- accept upload or pasted content if parsing exists,
- map existing answers into working event profile,
- preserve existing answers,
- identify missing, vague, or contradictory fields,
- ask targeted follow-ups,
- confirm when complete enough to use.

Fallback:

- If file upload parsing is not implemented, ask user to paste the form content or key sections.

Unknowns:

- Which file types can be parsed in MVP: DOCX, PDF, screenshot, pasted text.
- Whether uploaded official forms are available in the current code path.

### 11.10 Post-draft Key Event / EIS check

Purpose: identify likely Key Event candidates only after Phase 1 output exists.

Required behaviours:

- run against confirmed user inputs from the conversation and form draft,
- use 100+ attendance trigger,
- use two-or-more confirmed non-attendance criteria trigger,
- do not count missing or speculative criteria,
- do not ask questions solely for Key Event scoring unless needed for the Space Request Form,
- store sensitive topic as passive internal signal in v1,
- use conservative language.

User-facing candidate copy should follow this intent:

> Based on what you've shared, your event could be considered a Key Event because it includes: [reasons]. Key Events usually require an Event Information Sheet and attendance at the Key Events Meeting. Would you like to get a head start and complete the EIS now?

Allowed responses:

- `Yes, start now`,
- `Not now`,
- `I'm not sure / tell me more`.

Unknowns:

- Whether EIS drafting itself is in MVP.
- Which EIS source template is final.
- How the EIS offer should appear in UI if the candidate check is not triggered.

---

## 12. Functional requirements

### FR-01: Entry-type classification

The system must identify whether the user is starting from:

- prepared event request,
- budget only / no event idea,
- general event idea,
- uploaded draft.

### FR-02: Event profile maintenance

The system must maintain a working event profile across turns and update it without losing previous answers.

### FR-03: Themed questions

The assistant must ask no more than three themed questions at once by default.

### FR-04: Structured answers

The assistant must offer structured inputs where possible and include an escape hatch.

### FR-05: Space Request Form field coverage

The system must track every major form component and its status.

### FR-06: Draft-readiness check

Before drafting, the system must check whether every major component has an answer or acceptable marker.

### FR-07: Draft permission

The system must ask for permission before generating a preview or downloadable draft.

### FR-08: Preview generation

The system must show a structured in-chat preview in form order.

### FR-09: Editable output generation

The system should generate an editable document if supported by the MVP implementation.

### FR-10: Revision loop

The system must support user edits after draft generation.

### FR-11: Uploaded draft review

The system should support uploaded or pasted draft review, depending on parsing capability.

### FR-12: Post-draft Key Event assessment

The system must run or offer Key Event assessment only after Space Request Form draft generation or completion confirmation.

### FR-13: Key Event logic

The system must flag candidate only when:

- confirmed expected attendance is 100+, or
- two or more confirmed non-attendance criteria are present.

### FR-14: Conservative Key Event language

The system must say `could be considered` or `may qualify`, not `is a Key Event`.

### FR-15: No automatic submissions

The system must not submit forms, send emails, notify stakeholders, or create real integrations automatically.

---

## 13. Field map requirements

The active Phase 1 profile should include at least these components.

| Component | User-facing intent | Required status behaviour |
|---|---|---|
| Submission timing | How far ahead is the request being made? | If unknown, ask event timing first |
| Organiser details | Who is accountable? | Can be `to be added by organiser` or `needs confirmation` |
| Attendance | How many people are expected? | Best estimate allowed; uncertainty marked |
| Audience | Who will attend? | Multi-select; include external, VIP, media, under-18 where relevant |
| Date and timing | When will it run? | Include setup/breakdown; note 10pm finish constraint if applicable |
| Event format | What type of event is it? | Suggest formats for vague/budget-only users |
| Purpose/context | Why is the event happening? | Use toolkit shaping if vague |
| External speakers | Who is speaking? | If yes but unknown, mark details as needs confirmation |
| Political sensitivity | Is topic sensitive? | Capture context; do not escalate before draft unless asked |
| Venue type | What kind of space is preferred? | Include `not sure - please advise me` |
| Room configuration | What layout is needed? | Suggest based on event format if unsure |
| Additional spaces | Green room, cloakroom, breakout, storage, etc. | Multi-select with none/not sure/other |
| Catering | Is catering needed? | Mark uncertainty and note relevant follow-up |
| Alcohol | Will alcohol be served? | Capture type and note permission/contact follow-up |
| AV | What AV is needed? | Mark complex AV follow-up if applicable |
| Welcome/registration | What entry support is needed? | Include registration desk / Welcome Desk where relevant |
| Decorations | Any decorations? | Details can be needs confirmation |
| Noise/disruption | Any music or disruption? | Capture exact description |
| Outside equipment | Any hired/leased equipment? | Note security/parking may be needed |
| Filming | Will filming happen? | Capture purpose/usage context |
| Streaming media | Will movies, TV, or live TV be streamed? | Capture what will be shown |
| Additional context | Anything else Space Planning should know? | Preserve non-mapping details |

---

## 14. Key Event candidate logic

### 14.1 Timing

Run after the Space Request Form draft is generated, uploaded, or confirmed complete.

### 14.2 Triggers

Candidate if either:

1. confirmed expected attendance is 100+, or
2. two or more confirmed non-attendance criteria are present.

### 14.3 Non-attendance criteria

- High-profile speaker.
- Complex logistics.
- Significant operational elements.
- External audience.
- External media attendance.

### 14.4 Significant operational elements

Count when the event requires four or more operational stakeholder groups total, including Space Management, or clearly goes beyond standard space/catering/AV handling.

Operational groups may include:

- Space Management,
- Catering,
- AV / Technology,
- Security,
- Duty Managers,
- Estates / porters / furniture setup,
- Editorial / Press / Comms,
- Accessibility support,
- External vendors,
- Registration / guest list management,
- Dean's Office / Advancement / External Relations.

### 14.5 Sensitive topic handling

In v1, sensitive topic should be stored as an internal passive signal, not an independent user-facing trigger.

### 14.6 Output shape intent

Internal output should include:

- `key_event_candidate`,
- `trigger_type`,
- `confirmed_criteria`,
- `non_counted_signals`,
- `rationale_user_facing`,
- `rationale_internal`,
- `eis_offer_status`.

Unknowns:

- Whether this output already maps to an existing backend schema.
- Whether it belongs in the base EventRequest or as a separate service result.

---

## 15. Data and schema requirements

### 15.1 EventRequest principle

The project should continue using one shared EventRequest-style object as the source of truth for collected event facts.

Derived outputs should be separate unless the active schema says otherwise:

- form preview,
- generated document,
- key event assessment,
- stakeholder packets,
- Monday mock payload,
- post-event handover.

### 15.2 Minimum fields needed from Phase 1

Codex should verify against the active schema, but Phase 1 needs structured support for:

- organiser/contact,
- club/school affiliation,
- event title/name,
- event description/purpose/context,
- event format,
- date/time/setup/breakdown,
- expected attendance and confidence,
- audience types,
- external speakers and speaker context,
- political sensitivity/context,
- venue type/preference,
- room layout/configuration,
- additional spaces,
- catering,
- alcohol,
- AV/recording/streaming,
- registration/welcome desk,
- decorations,
- noise/disruption,
- outside equipment,
- filming,
- streaming media,
- additional requirements,
- uncertainty markers per field.

Unknowns:

- Active schema location and field names.
- Whether schema already has per-field status values.
- Whether a separate `form_component_status` map is needed.

---

## 16. API requirements from user point of view

Codex should reconcile with current endpoints. Possible route responsibilities:

| Endpoint / function | User-visible purpose | Status |
|---|---|---|
| `POST /api/intake/extract` | Turn user text into event profile updates | Existing planned endpoint, verify |
| `POST /api/intake/missing-fields` | Identify remaining Space Request Form gaps | Existing planned endpoint, verify |
| `POST /api/outputs/generate` | Generate preview/document package | Existing planned endpoint, verify |
| `POST /api/key-events/assess` or equivalent | Run post-draft Key Event candidate logic | Unknown route; reconcile with existing tiering endpoints |
| `POST /api/tiering/classify` | Broader tier/risk classification from WS4 | Existing planned endpoint, but should not replace v1 Key Event confirmed-info logic without reconciliation |
| `POST /api/routing/stakeholder-packets` | Build stakeholder packet data | Existing planned endpoint |
| `POST /api/integrations/monday/build-payload` | Build mock staff-side handoff JSON | Existing planned endpoint |

Unknowns:

- Whether a dedicated Key Event endpoint exists or should be folded into tiering.
- Whether output generation can create documents or only Markdown/JSON.
- Whether intake extraction currently uses OpenAI or deterministic parsing.

---

## 17. AI and deterministic logic split

### Use AI for

- interpreting free text,
- mapping rambling input to form fields,
- shaping vague event ideas,
- drafting human-readable preview/document prose,
- possibly classifying speaker/profile context from user-provided details.

### Use deterministic logic for

- form component coverage,
- asking no more than three questions,
- draft readiness check,
- Key Event trigger thresholds,
- not counting missing criteria,
- EIS offer state,
- routing of clearly structured fields where stable rules exist.

Unknowns:

- Whether current code uses AI for tiering only or also intake.
- Whether there are already deterministic service files for field coverage.

---

## 18. Error states and fallbacks

### User says `I don't know`

System should offer common options and allow an uncertainty marker.

### User provides contradictory details

System should reflect the contradiction and ask one focused clarification.

### User asks about Key Events before draft

System may answer briefly, but should steer back to completing the Space Request Form first.

### AI extraction fails

System should ask the user to restate or choose from structured options. It must not silently invent answers.

### Document generation fails

System should still provide an in-chat structured preview and explain that downloadable generation failed.

### File upload parsing fails

System should ask the user to paste the form content or key sections.

---

## 19. Acceptance criteria for the MVP user flow

A successful demo should show:

1. User enters a rough or prepared event idea.
2. Assistant identifies the starting point.
3. Assistant asks a small themed set of questions.
4. Assistant updates a visible or inspectable working event profile.
5. Assistant allows uncertainty without blocking.
6. Assistant reaches draft readiness when every major form component has an answer or marker.
7. Assistant asks permission before generating a draft.
8. Assistant shows an in-chat Space Request Form preview.
9. User edits one field.
10. Assistant updates the preview.
11. Assistant confirms the form is complete enough to use.
12. Assistant runs/offers Key Event assessment only after this point.
13. For a 100+ attendee or complex confirmed example, assistant says the event could be considered a Key Event and offers EIS next step.
14. No automatic submission, email, or official policy determination occurs.

---

## 20. Demo scenarios

### Scenario A: Prepared event

Input:

> I want to host an alumni panel next month for about 80 people with a guest speaker in a lecture theatre.

Expected behaviour:

- summarise known info,
- ask organiser/club, preferred date/time, catering/alcohol, and AV as next themed set,
- continue to remaining form fields,
- draft when complete enough,
- do not mention Key Event unless later criteria are confirmed.

### Scenario B: Budget-only user

Input:

> My club has a budget but no idea what event to run.

Expected behaviour:

- ask outcome, audience, constraints, and budget range,
- suggest 2-3 formats,
- ask user to pick one,
- convert selected format into form-ready details.

### Scenario C: Key Event candidate by attendance

Input facts:

- event expected attendance: 120,
- ordinary-profile company speakers,
- draft completed.

Expected behaviour:

- after draft, flag `could be considered a Key Event`,
- reason: 100+ attendees,
- offer EIS next step.

### Scenario D: Key Event candidate by criteria threshold

Input facts:

- expected attendance: 80,
- multi-room workshop,
- external attendees,
- draft completed.

Expected behaviour:

- after draft, flag candidate,
- reasons: complex logistics and external audience,
- offer EIS next step.

### Scenario E: Below threshold

Input facts:

- expected attendance: 30,
- external guest speaker,
- catering,
- security,
- draft completed.

Expected behaviour:

- count external audience only if confirmed,
- routine operations do not count as significant operational elements,
- do not mention Key Event if fewer than two criteria and attendance below 100,
- continue to next planning action.

---

## 21. Open questions and assumptions to verify

### Product unknowns

- Is Phase 1 the only user-facing MVP flow, or should the existing broader event readiness dashboard remain visible?
- Should users see a numeric completeness score or only section statuses?
- Should users be able to switch between chat mode and form mode?
- Which fields must be final before actual submission versus may remain provisional?
- How much EIS generation is in scope after a Key Event candidate is flagged?

### Data unknowns

- What is the final official Space Request Form file?
- Does the field map exactly match the current official form?
- Which raw LBS files have already been converted to processed JSON/CSV/MD?
- Which file is the source of truth for rooms/spaces?
- Which file is the source of truth for catering rules?

### Technical unknowns

- What routes and services already exist in the repo?
- Where is the active EventRequest schema?
- Does the app already support file uploads?
- Does the app already support downloadable document generation?
- Does the app already have a chat UI?
- Does the app already have a preview/output package UI?
- Should Key Event candidate logic be a separate endpoint or part of `/api/tiering/classify`?

### Policy/process unknowns

- Should the assistant verify speaker profile using external sources in a later version?
- Should sensitive topic become a standalone trigger after policy validation?
- Should Dean's Office, Advancement, or External Relations involvement automatically count as institutionally important?
- Should any non-LBS attendee count as external audience, or should there be a minimum threshold later?
- Should the four-stakeholder threshold be adjusted after reviewing real event outcomes?

---

## 22. Implementation guidance for Codex

Before implementing, Codex should:

1. Read the two new WS1 Markdown conversions.
2. Read this PRD.
3. Read the pains/JTBD/features/epics/user-stories document.
4. Reconcile this with existing `PLAN.md`, `project.md`, `AGENTS.md`, and `docs/project-context/`.
5. Update planning files to mark the old technical workstream split obsolete.
6. Preserve the new workstream model:
   - WS1: Business logic.
   - WS2: Product requirements and technical delivery, João + Codex.
   - WS3: Next steps for integration / opportunities not pursued, output report.
   - WS4: Presentation, organisation, final review.
7. Do not implement based on assumptions where this PRD flags unknowns.
8. Ask João or document the ambiguity when the repo does not contain the answer.
