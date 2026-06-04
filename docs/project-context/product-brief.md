# Product Brief: Event Readiness Assistant

## Current Source Of Truth

This is the current product brief as of 2026-06-03.

Historical data from earlier product briefs, old technical workstream plans, Wednesday notes, Monday reset notes, and WS4-only planning has been moved to `docs/project-context/historical-supplanted/`. That directory is no longer source of truth.

Use this brief with:

- `lbs-files/PLAN.md`
- `docs/project-context/05_ws1_pains_jtbd_features_epics_user_stories.md`
- `docs/project-context/06_user_view_prd_phase1_event_readiness_assistant.md`
- `docs/project-context/event_readiness_assistant_phase_1_conversation_rules_spec.md`
- `docs/project-context/key_event_identification_spec.md`

## Product Name

Event Readiness Assistant

## One-Line Summary

A student-facing LBS event planning assistant that first guides a club organiser to a complete EventRequest / Space Request Form draft, then uses that structured event object to produce Key Event assessment, stakeholder routing, supporting document drafts, timeline/checklist guidance, risk/complexity flags, and a Monday.com-ready mock payload.

## Product Purpose

The assistant helps LBS student club organisers move from a vague idea, a budget-only starting point, a prepared request, or pasted draft content into a complete structured `EventRequest`.

Phase 1 is mandatory and comes first. Phase 1 ends when the `EventRequest` object is fully populated enough to generate the Space Request Form DOCX output using the official updated field set from `lbs-files/raw/request-event/Event form - Space Request Form.docx`. `lbs-files/raw/request-event/LBS Crib Sheet_AMC.docx` is a completed example used for mapping and test data, not the field source.

Phase 1 is not the end of the product. After the `EventRequest` exists, the assistant should trigger the downstream MVP capabilities that depend on a complete event object.

## Ownership And Workstreams

The previous four technical workstream split is obsolete.

Current work allocation:

- Business logic: led outside technical delivery; provides event-process rules, chatbot behaviour expectations, stakeholder logic, and policy clarification.
- Product requirements and technical delivery: João + Codex; owns requirements, data processing, app implementation, testing, and MVP delivery.
- Next steps for integration / opportunities not pursued: a later report describing production gaps, future integrations, and opportunities left out of MVP scope.
- Presentation, organisation, final review: final packaging, project organisation, review, and handover.

João is the only person working on technical delivery, with Codex as the technical build partner.

## Primary User

The primary user is an LBS student club organiser, including:

- club presidents,
- ExCo members,
- first-time organisers,
- organisers repeating an existing event,
- organisers with budget but no event idea,
- organisers with pasted draft form content.

The MVP assumes no document upload. For existing drafts, the user should paste text or manually enter answers.

## Secondary Users And Beneficiaries

The generated outputs should help:

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
- the LBS staff crew assisting the student organiser.

The MVP does not automatically contact these stakeholders.

## MVP Flow

1. User starts from one of four entry types:
   - prepared event request,
   - budget only / no event idea,
   - general event idea,
   - pasted/manual draft.
2. Assistant maintains a working event profile across turns.
3. Assistant asks no more than three themed questions by default.
4. Assistant uses the Event Toolkit and Student Event Organiser guidance to shape vague or budget-only ideas.
5. Assistant brings up finance-code lookup whenever budget is involved.
6. Assistant uses structured room/space/catering data to guide Space Request answers.
7. Assistant continues until all official Space Request / crib sheet fields are populated or marked with an allowed uncertainty state.
8. Assistant generates a DOCX Space Request Form-style output.
9. The completed `EventRequest` becomes the source object for downstream MVP outputs:
   - deterministic Key Event candidate assessment,
   - preliminary complexity/risk classification for LBS staff,
   - stakeholder routing matrix,
   - stakeholder email drafts,
   - EIS-style draft for Key Event candidates,
   - timeline/checklist display,
   - Monday.com-ready mock JSON payload.

## Authoritative Sources

Use all raw sources as valid unless a conflict is identified. If sources conflict, document the conflict and apply the source rule in `lbs-files/PLAN.md`.

Important source priorities:

- Most authoritative toolkit source: `lbs-files/raw/[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf`.
- Same toolkit content in editable/extractable source: `lbs-files/raw/request-event/Student Event Organisers Guide - Copy.pptx`; João confirmed this is the same as the PDF, and the PPTX can be removed later once conversion strategy is approved.
- Official final output field source: `lbs-files/raw/request-event/Event form - Space Request Form.docx`; the generated DOCX does not need to match the visual formatting but must contain the same organiser-facing fields.
- Sole deterministic Key Event categorisation source: `docs/project-context/key_event_identification_spec.md`.
- Conversation behaviour source: `docs/project-context/event_readiness_assistant_phase_1_conversation_rules_spec.md`.
- Room source priority: `lbs-files/raw/space/Space Matrix (1) - Copy.xlsx`, then fallback to the largest relevant supporting source if the room is absent.

## In Scope For MVP

- Phase 1 conversational intake to complete the EventRequest.
- Space Request Form DOCX generation.
- Pasted text/manual draft review.
- Finance-code lookup whenever budget is involved.
- Room/space guidance and deterministic room-source selection.
- Catering/alcohol/security/timeline guidance where rules are present in source docs.
- Deterministic Key Event candidate assessment after EventRequest completion.
- EIS-style draft for Key Event candidates.
- Stakeholder routing matrix.
- Stakeholder email drafts.
- Timeline/checklist display for the LBS crew assisting the organiser.
- OpenAI-backed preliminary complexity/risk flags for LBS staff.
- Monday.com-ready mock JSON payload.
- Localhost demo flow.
- Frontend test surface per epic with story checklist and main deliverables.

## Out Of Scope For MVP

- Automatic form submission.
- Sending emails automatically.
- Creating real Monday.com items through the API.
- Write-back to catering, finance, AV, room booking, ERP, fundraising, CRM, or other LBS systems.
- Web lookup for speaker verification.
- Document upload handling.
- Post-event feedback, impact capture, lessons learned, handover summary, and reusable future recommendations.
- Production authentication/infra decisions beyond the existing repo architecture.

## Future / WS3 Report Topics

The next-steps report should explain what would be required to productionise this for LBS, including:

- document upload and secure storage,
- production document generation and retention policy,
- real Monday.com API integration and reconciliation with existing board governance,
- integration with room booking / timetabling systems,
- integration with finance code request workflows and ERP,
- integration with catering / Lexington processes,
- integration with fundraising, Advancement, sponsor, and donor systems,
- stakeholder-specific queues and approval workflows,
- staff feedback loops for improving classification and routing,
- post-event feedback, impact capture, lessons learned, handover, and reusable recommendations,
- data governance across departments and systems,
- permissions, audit logs, security review, and retention,
- operational ownership after the class prototype.
