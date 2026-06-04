# PRD: Event Readiness Assistant MVP

## 1. Product Name

Event Readiness Assistant

## 2. Current Scope

The MVP is a student-facing LBS event planning assistant with a required first phase and a downstream output phase.

Phase 1 gets the user to a fully populated `EventRequest` object. The `EventRequest` is the technical equivalent of a complete Space Request draft. It must contain all fields from the updated blank form in `lbs-files/raw/request-event/Event form - Space Request Form.docx`, though the generated DOCX does not need to match the original visual layout. `lbs-files/raw/request-event/LBS Crib Sheet_AMC.docx` is a completed example used for mapping and test values, not the field source.

After Phase 1, the assistant should use the completed `EventRequest` to generate the core MVP outputs:

- Space Request Form DOCX,
- deterministic Key Event candidate assessment,
- Key Event / EIS recommendation,
- full SA Operations / Eventscase email draft to `saoperations@london.edu`,
- timeline/checklist display,
- OpenAI-backed preliminary complexity/risk flags for LBS staff,
- Monday.com-ready mock JSON payload.

EIS-style draft generation and stakeholder routing are MVP stretch. Broader stakeholder email drafts are stretch / V2 and should not be treated as core MVP unless templates and stakeholder expectations are confirmed.

Phase 1 is mandatory before the downstream functionality. It is not the whole product.

## 3. Source Of Truth

Primary active sources:

- `lbs-files/PLAN.md`
- `docs/project-context/product-brief.md`
- `docs/project-context/event_readiness_assistant_phase_1_conversation_rules_spec.md`
- `docs/project-context/key_event_identification_spec.md`
- `docs/project-context/05_ws1_pains_jtbd_features_epics_user_stories.md`

Sole deterministic Key Event categorisation source:

- `docs/project-context/key_event_identification_spec.md`

Official output field source:

- `lbs-files/raw/request-event/Event form - Space Request Form.docx`

Completed example source:

- `lbs-files/raw/request-event/LBS Crib Sheet_AMC.docx`

Most authoritative toolkit source:

- `lbs-files/raw/[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf`

Historical source material has been moved to `docs/project-context/historical-supplanted/` and is no longer source of truth.

## 4. Primary User Problem

Student club organisers often do not know what LBS needs before an event can proceed. They may have:

- only a budget,
- a vague event idea,
- a prepared event request,
- a repeated event needing a finance code,
- a pasted or partially completed draft.

They need help turning that starting point into complete event information, suitable room/space and service requirements, finance-code awareness, and documents/messages they can use.

LBS staff need cleaner event information, earlier visibility into events that may need coordination, and structured stakeholder-specific outputs without automatic submissions.

## 5. Users

Primary user:

- LBS student club organiser.

Secondary beneficiaries:

- Space Management,
- Catering / Lexington,
- AV / Technology,
- Security,
- Duty Managers,
- Estates / porters,
- Welcome Desk,
- SA Finance / Treasury,
- SA Sponsorship,
- Editorial Planning,
- Dean's Office / Advancement / External Relations where relevant,
- the LBS crew assisting the organiser.

## 6. MVP Goals

1. Guide the user to a complete `EventRequest`.
2. Use all official updated Space Request Form fields.
3. Keep the user moving even when some values are uncertain, as long as the uncertainty is explicit.
4. Bring up finance-code lookup whenever budget is involved.
5. Surface rules that significantly affect timelines, including political/sensitive topics requiring security review.
6. Generate a DOCX Space Request output.
7. After `EventRequest` completion, trigger the appropriate downstream outputs.
8. Avoid automatic actions.
9. Provide a frontend test surface per epic with deliverables, user stories, and checklist-style acceptance criteria.

## 7. Non-Goals

The MVP must not:

- submit forms automatically,
- send emails automatically,
- create real Monday.com items,
- integrate with catering, finance, room booking, ERP, fundraising, CRM, or other LBS systems,
- verify speakers through web lookup,
- support arbitrary document uploads,
- build post-event feedback, impact capture, lessons learned, handover summary, or reusable recommendations.

## 8. User Journey

```text
User starts intake
  -> assistant diagnoses entry type
  -> assistant builds working event profile
  -> assistant asks small themed question batches
  -> assistant uses toolkit, finance, space, catering, and policy data where relevant
  -> assistant completes all EventRequest / Space Request fields
  -> assistant generates Space Request DOCX
  -> downstream logic runs from completed EventRequest
  -> assistant shows Key Event result where triggered
  -> assistant recommends EIS where relevant
  -> assistant generates the SA Operations / Eventscase email draft
  -> assistant generates timeline/checklist
  -> assistant generates preliminary complexity/risk flags
  -> assistant generates Monday.com-ready mock JSON payload
  -> stretch: assistant may generate EIS draft and stakeholder routing
```

Supported entry types:

1. Prepared event request.
2. Budget only / no event idea.
3. General event idea.
4. Pasted or manually entered draft.

Document upload is not in MVP.

## 9. Conversation Rules

The assistant must:

- maintain a working event profile across turns,
- not ask for information already provided,
- follow the user's lead if they start with catering, AV, space, budget, speaker, or another middle section,
- otherwise follow the Space Request / crib sheet field order,
- ask no more than three themed questions at a time by default,
- use up to five only for one structured checklist or when the user has already provided most details,
- use structured options where possible,
- include `Other` for structured questions,
- include `Not sure yet`, `Needs confirmation`, or `Help me decide` where appropriate,
- shape weak or budget-only ideas instead of blocking them,
- preserve additional context rather than dropping it.

The assistant does not need to ask permission before generating the core Space Request DOCX or downstream drafts once the EventRequest is complete. The product is explicitly a generation tool.

## 10. Phase 1 EventRequest Requirements

The EventRequest must map the official fields in `Event form - Space Request Form.docx`.

Required components:

| Component | Required behaviour |
|---|---|
| Organiser details | Capture organiser, club/programme affiliation, and contact details; allow needs-confirmation where unavoidable |
| Event title | Capture working/final title |
| Attendance | Capture expected number or range; required for Key Event logic |
| Date and timing | Capture date, start/end, setup/breakdown where known; surface timeline constraints |
| Event type/format | Capture event type and use toolkit shaping where vague |
| Event details / purpose | Capture subject, purpose, attendees, intended outcomes, and useful context |
| Audience | Capture students, staff, alumni, externals, VIP/high-profile, media, children under 18, and other groups |
| External speakers | Capture whether there are external speakers and any names, titles, organisations, and significance |
| Political sensitivity | Capture yes/no/context and surface security/timeline implications |
| Children | Capture number and age range if applicable |
| Activities/noise | Capture activities and any likely noise or disruption |
| Space and setup | Capture preferred venue type, room configuration, additional spaces, and uncertainty |
| Registration | Capture whether registration desk / Welcome Desk support is needed |
| Decorations | Capture whether decorations are planned and note approval implications |
| Catering | Capture catering need; bring up finance code if budget is involved; surface Lexington/external catering rules |
| Alcohol | Capture whether alcohol is available and service type; surface permission/licensing implications |
| Music | Capture recorded/live music and timing |
| Cloakroom | Capture whether needed |
| Outside equipment | Capture hired/leased equipment and security/parking implications |
| Filming | Capture whether filming or photography happens, by whom, and usage context |
| Streaming media | Capture movies, TV, or live TV streaming where relevant |
| Additional information | Preserve all extra context that does not map cleanly elsewhere |

## 11. Proceed-Readiness Rules

Question 2 from João is answered as follows:

The event can proceed to Space Request DOCX generation when every official updated Space Request Form field has either:

- a concrete answer,
- a best estimate,
- `not sure yet`,
- `needs confirmation`,
- `not applicable`,
- or a clearly marked organiser follow-up.

The assistant should guide the user until all fields are filled or explicitly marked. It should use:

- `Event form - Space Request Form.docx` for the required field list,
- Event Toolkit / Student Guide content for quality of event purpose, team, audience, speaker, logistics, and planning prompts,
- Terms and Conditions for lead times, point-of-contact, catering, alcohol, security, decoration, noise, and equipment implications,
- finance directory rules when budget is involved,
- space and catering files for room, setup, capacity, hospitality, catering, and alcohol availability guidance.

The user should not be blocked because some details are still provisional, but uncertainty must be visible in the generated DOCX and downstream outputs.

Declaration fields may remain `needs_confirmation` for DOCX generation. After the Space Request DOCX is generated, the output should show the download link followed by the declaration list, explaining that sending the form to `space@london.edu` means the organiser is agreeing to those declarations.

Completeness score is cut from MVP.

## 12. Output Requirements

### Space Request DOCX

Generate a DOCX containing all fields from the official updated Space Request Form source. It can use different formatting. The generation output should include the declaration text below the download link:

- I understand that space is not confirmed until I receive written confirmation from Space Management.
- I will attend the Key Events Meeting if my event is designated a Key Event.
- If catering is required, I commit to providing final guest numbers to catering at least 5 working days before the event.
- I will submit a provisional guest list to Security at least 5 working days before the event, and the final list no more than 2 days before the event.
- My line manager or Student Club President has approved this event request.

### EIS Draft

Core MVP should recommend EIS where the deterministic Key Event candidate assessment is triggered. EIS-style draft generation is MVP stretch. If implemented, generate an EIS-style draft using available information, do not ask additional questions solely to complete the EIS, and mark missing EIS-specific details as `needs confirmation`.

### Stakeholder Routing Matrix

Stakeholder routing matrix is MVP stretch. If implemented, generate it deterministically from the completed EventRequest and source rules.

### Stakeholder Email Drafts

Core MVP generates one full editable stakeholder email draft: the SA Operations / Eventscase handoff email to `saoperations@london.edu`. Use the confirmed template in `lbs-files/processed/routing/stakeholder_email_templates.md`, with subject pattern `Eventscase page request - [Event Name] - [Club Name]`.

Generate or note the Eventscase email draft with the Space Request output when the Audience field includes anything besides `Current students` and `Children (Under 18s)`. Do not trigger it for current-students-only events or current-students-plus-children-only events. Student admin names and LBS emails are not part of the Space Request field map; they are optional Eventscase email fields. Broader stakeholder email drafts are stretch / V2 and require confirmed templates or stakeholder expectations. Do not send any emails automatically.

### Timeline / Checklist

Generate a timeline/checklist display for the LBS crew assisting the student organiser. It should include important deadlines, follow-ups, and source-derived timing implications.

### Preliminary Complexity / Risk Flags

Use OpenAI-backed classification for broader complexity/risk flags to LBS staff. This is separate from Key Event categorisation. The Key Event determination remains deterministic and based only on `docs/project-context/key_event_identification_spec.md`.

### Monday.com Mock Payload

Generate a Monday.com-ready mock JSON payload as close to the known Monday board expectations as the repo data allows. This is in MVP scope, but no real API call should be made.

## 13. Key Event Logic

Key Event categorisation must always use `docs/project-context/key_event_identification_spec.md` as the sole deterministic source.

Run Key Event assessment only after the EventRequest is complete.

Candidate if:

1. confirmed expected attendance is 100+, or
2. two or more confirmed non-attendance criteria are present.

Non-attendance criteria:

- high-profile speaker,
- complex logistics,
- significant operational elements,
- external audience,
- external media attendance.

Missing, vague, or uncollected information must not be counted.

Sensitive or political topic is not a standalone Key Event trigger, but it does require additional security/timeline guidance and must be surfaced to the user because it materially affects planning.

If implementation cannot turn the Key Event spec into deterministic code because a criterion is too vague, Codex must flag that to João before proceeding.

## 14. Data Strategy

The app should not parse raw XLSX/DOCX/PDF/PPTX files at chatbot runtime.

Runtime sources may be:

- processed JSON/CSV/Markdown chunks,
- database tables in PostgreSQL,
- DOCX templates generated from processed field maps.

PostgreSQL is available and may be used for processed event-planning data if that is cleaner than file-based lookup. The conversion plan should identify which processed artifacts are better as DB tables versus repo files.

## 15. Frontend Test Surface

For each epic, the implementation should include a frontend test/demo surface that lets João validate:

- the main deliverable for that epic,
- the user stories covered,
- acceptance checklist status,
- example inputs,
- all pre-determined test event scenarios relevant to that epic,
- editable form fields for changing event facts and rerunning outputs,
- the populated `EventRequest` object,
- which EventRequest fields matter for that epic,
- OpenAI reasoning where OpenAI is used,
- generated outputs,
- any unresolved gaps.

This can be implemented as an internal demo/test page if that is fastest for MVP.

When testing chat behaviour, editable form fields can be hidden, but the test page should still show the `EventRequest` being populated turn by turn and any OpenAI reasoning returned by the backend.

The project has an OpenAI API key available. The MVP should use OpenAI through backend services for free-text interpretation, drafting, and preliminary complexity/risk reasoning, while keeping Key Event categorisation and other deterministic rules outside the model.

## 16. Future / WS3 Production Readiness Topics

Flag these for the next-steps report, not MVP:

- post-event feedback form,
- impact capture / lessons learned,
- handover summary,
- reusable recommendations for similar future events,
- document upload and secure storage,
- real Monday API integration,
- real integration with ERP/finance/catering/room-booking/fundraising/CRM systems,
- production deployment, permissions, audit, retention, and data governance,
- staff feedback loop for improving recommendations and routing.
