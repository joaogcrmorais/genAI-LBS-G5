# Workstream 3 Source Map

## Status

Layer 1 source map for Workstream 3. This is a synthesis of source material only. It does not define the final product, schema, prompts, UI, or implementation.

Raw faculty/shared files should remain outside the repository unless the team explicitly decides otherwise. Do not commit the original transcript, PDF, PowerPoint, or Word files. If repo documentation is needed, commit only cleaned summaries, requirements, schema decisions, or implementation notes.

## Workstream 3 Scope Reminder

Workstream 3 owns output generation and knowledge:

- crib sheet draft,
- EIS-style draft,
- stakeholder email drafts,
- timeline/checklist display,
- organiser guidance,
- knowledge recommendations,
- uncertainty and human-review messages.

Expected output object: `GeneratedOutputPackage`.

Primary route proposed in the architecture plan: `POST /api/outputs/generate`.

## Source Inventory

| ID | Source | Current location | Type | Repo handling |
| --- | --- | --- | --- | --- |
| S1 | Team progress and alignment note | Pasted in this Codex thread | Working note | Summarise only; do not create a raw transcript of the chat note. |
| S2 | Jo Friday meeting transcript | Local Downloads folder | Meeting transcript | Use for problem framing and client needs; do not commit raw transcript. |
| S3 | LBS Event Toolkit Student Clubs Updated PDF | Local Downloads folder | 100-page toolkit | Use as main readable toolkit source; do not commit raw PDF unless explicitly approved. |
| S4 | LBS Event Toolkit Student Clubs Updated PPTX | Local Downloads folder | 100-slide deck | Treat as duplicate/design reference for S3; do not commit raw PPTX. |
| S5 | Student Club event promotion template v3 | Local Downloads folder | Word planner/template | Use for promotion and communications outputs; do not commit raw DOCX. |
| S6 | LBS operational event forms batch | Local Downloads folder | DOCX/XLSX/PDF forms | Use for form-readiness mapping; do not commit raw forms unless explicitly approved. |

## Duplication Assessment

- S3 and S4 are effectively the same toolkit content in different formats. The PDF is easier to inspect; the PPTX may be useful later for visual language, sequencing, or slide-like demo design.
- S5 is not a duplicate of the toolkit. It is a practical promotion planner and is directly useful for Workstream 3 output generation.
- S2 is not a procedural guide. It provides the sponsor/client context: LBS events are high-volume, operationally complex, knowledge-heavy, and vulnerable to repeated mistakes when lessons are not captured.
- S1 confirms team alignment: Fernando owns Workstream 3, Joao owns Workstream 4, and WS3 should consume shared event facts plus WS4 routing/tiering outputs.
- S6 is a separate operational-form batch. It shows the concrete downstream forms that organisers may need to prepare: Space Request, Event Information Sheet, LBS Speaker Security Review, LBS Guest List, Cloakroom Booking, and Premium Space Business Case.

## What Each Source Contributes To Workstream 3

### S1 Team Alignment Note

Useful for:

- confirming WS3 scope and ownership,
- confirming that WS3 should not take over WS1 intake, WS2 post-event feedback, or WS4 routing/tiering,
- keeping the architecture flexible while the public/private route policy remains undecided.

WS3 implications:

- Generated outputs should be separate from the base `EventRequest`.
- WS3 should consume `EventRequest`, `TieringClassificationResult`, and `StakeholderRoutingResult`.
- WS3 should produce `GeneratedOutputPackage` plus a UI display of generated outputs.

### S2 Client Meeting Transcript

Useful for:

- understanding the real problem: event processes require institutional knowledge and can be confusing for organisers,
- grounding generated guidance in practical event-planning needs,
- highlighting the importance of learning from previous events and avoiding repeated mistakes,
- identifying a possible training/support signal when organisers repeatedly use the tool.

WS3 implications:

- Outputs should not only produce polished documents; they should help organisers understand what to do next.
- Knowledge recommendations should explain why a source or checklist matters.
- Generated outputs should surface uncertainty and missing information instead of pretending the event is ready.
- Future WS2/WS3 connection should reuse lessons learned so organisers do not repeat known venue, timing, communication, or process mistakes.

### S3/S4 Event Toolkit

Useful for:

- organiser guidance,
- timeline/checklist logic,
- EIS-style information needs,
- event readiness checks,
- stakeholder communication context,
- speaker, security, registration, accessibility, final-week, day-of, and post-event considerations.

Major content areas identified:

- event purpose and decision-making,
- strategy, objectives, KPIs, and audience value proposition,
- stakeholder mapping,
- project management and timelines,
- budget and sponsorship,
- space, catering, AV, security, and logistics,
- speaker management,
- registration and attendee management,
- communications, media, PR, brand, and social media,
- accessibility and inclusion,
- final-week readiness,
- event-day execution,
- post-event activities and continuous improvement.

WS3 implications:

- The generated checklist should be phase-aware rather than one generic list.
- The EIS-style draft should be generated only when event complexity or routing suggests it is needed.
- Stakeholder emails should be tailored to what each team needs to act, not copied from one generic summary.
- Knowledge recommendations should point the organiser toward the relevant toolkit area, not overwhelm them with the whole toolkit.
- Human review should be flagged for sensitive speakers, security concerns, media/PR, senior stakeholders, accessibility needs, finance/sponsorship complexity, or uncertain facts.

### S5 Promotion Planner

Useful for:

- promotion guidance,
- email drafts,
- event description copy,
- channel strategy,
- social media and personal-network messaging,
- post-event email/follow-up,
- communication quality checks.

Major content areas identified:

- event overview,
- success metrics,
- target audiences,
- audience response framing,
- key messages and proof points,
- channel strategy and owners,
- content plan for email, social media, personal networks, WhatsApp/SMS, and speaker bios,
- pre-launch quality check,
- promotional timeline,
- post-event tracking and evaluation,
- writing guidelines and key support contacts.

WS3 implications:

- Stakeholder and attendee-facing drafts should lead with audience value before logistics.
- Generated copy should include one clear call to action.
- Output quality rules should prefer British English, sentence case headings, active voice, consistent dates/times, and clear registration links.
- Promotion outputs should include a pre-launch quality checklist.
- Post-event outputs should include thank-you/follow-up messages and channel-performance reflection.

### S6 Operational Event Forms Batch

Mapped separately in `docs/project-context/workstream-3-lbs-event-forms-map.md`.

Useful for:

- understanding which LBS forms are likely downstream of an event request,
- identifying repeated field groups across forms,
- deciding which generated outputs can become form-ready summaries,
- framing WS3 outputs around readiness rather than generic prose.

Forms identified:

- Space Request Form,
- Event Information Sheet (EIS),
- LBS Speaker Security Review Form,
- LBS Guest List Form,
- Cloakroom Booking Form,
- Premium Space Event Student Business Case.

WS3 implications:

- Generated outputs should help organisers know which form or stakeholder action is likely next.
- Form-ready snippets can reduce repeated manual entry across space, EIS, security, guest-list, cloakroom, and business-case materials.
- Full automated form filling should be treated as later scope until the schema, review rules, and permissions are stable.
- Human-review messages should be tied to concrete form triggers such as security review, Key Event/EIS preparation, premium-space review, guest-list readiness, or cloakroom/operational support.

## Source-To-Output Traceability

| WS3 output | Primary source support | Notes |
| --- | --- | --- |
| Crib sheet draft | S2, S3/S4, WS4 stakeholder packets | Should summarise key event facts, risks, stakeholders, readiness status, and next actions. |
| EIS-style draft | S3/S4, WS4 tiering/routing | Should be generated when complexity, key-event status, senior attendance, security, media, or operational coordination requires it. |
| Stakeholder email drafts | S3/S4, S5, WS4 stakeholder packets | Should be tailored by stakeholder and include only the information needed for that team. |
| Timeline/checklist display | S3/S4, S5, S6 | Should be phase-aware and include deadlines, owners, missing facts, forms, and review gates. |
| Organiser guidance | S2, S3/S4, S5, S6 | Should explain next steps in plain language and avoid overloading students with the whole toolkit or all forms at once. |
| Knowledge recommendations | S2, S3/S4, S5, S6 | Should recommend specific toolkit/planner/form areas based on the event context. |
| Uncertainty and human-review messages | S2, S3/S4, S5, S6, WS4 tiering/routing | Should be explicit when information is missing, sensitive, high-risk, form-blocking, or requires staff review. |

## What Should Stay Out Of Git For Now

- Full transcript text.
- Full toolkit PDF/PPTX content.
- Full promotion template text.
- Names, emails, or personal details copied from source materials unless they are already intended public role contacts and necessary for the prototype.
- Any output that looks like official LBS policy unless the team has verified it.
- Any secret, credential, access token, API key, or private operational data.

## Boundaries For Layer 1

This layer only answers:

- What sources do we have?
- Are they duplicates?
- What does each source contribute to WS3?
- Which source material is safe to summarise into repo docs?

This layer does not yet decide:

- the final `GeneratedOutputPackage` schema,
- which outputs are included in the first demo,
- exact prompt wording,
- backend implementation,
- frontend UI,
- whether any output is official policy versus prototype guidance.

## Recommended Next Layer

Layer 2 should be an activity map. It should organise the event lifecycle into concrete organiser activities before choosing final WS3 outputs.

Suggested activity-map groups:

- event purpose and readiness,
- stakeholder and approval preparation,
- logistics and risk preparation,
- promotion and attendee communications,
- final-week and event-day readiness,
- post-event follow-up and knowledge capture.
