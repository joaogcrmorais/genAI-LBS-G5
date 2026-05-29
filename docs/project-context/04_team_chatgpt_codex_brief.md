# Brief for Team Members to Upload to ChatGPT / Codex

Use this document as context when asking ChatGPT or Codex to help with your workstream.

## Project name

Event Readiness Assistant

## Project summary

We are building a prototype AI-powered event readiness and orchestration assistant for London Business School student club events. The sponsor is Jo Luzmore, Head of Editorial Planning. LBS has a fragmented event planning process with many stakeholders, forms, timelines, and escalation triggers. Student organizers often do not know what information to provide, who to contact, or how much lead time is required.

The prototype should help a student move from an uncertain event idea to a structured, stakeholder-ready event package.

The product is not just a chatbot and not just a form. It should be an intake and orchestration layer.

New Monday.com context: Jo's real `Events and Key Dates 25/26` board tracks about 844 active events and key dates, 47 fields per event, 7 groups/categories, 19 filtered views, 38 organising departments, and 109 faculty members. The updated AI export describes a full lifecycle from initial request through post-event follow-up, but Jo has warned that this is mostly not reality. Across LBS there are roughly 1,200 events per year, run by 300-400 people, while only two people actively track/record events in Monday and about 10 use it for awareness. Treat Monday as useful source context and a possible staff-side handoff target, not as the source of truth or the workflow followed by most organisers.

## Core product goal

Reduce back-and-forth and improve event readiness by:

1. guiding the student through event intake,
2. extracting a structured event request,
3. identifying missing information,
4. classifying event risk/tier,
5. routing to relevant stakeholders,
6. generating operational artifacts,
7. preparing integration-ready JSON for future tools such as Monday.com,
8. capturing post-event lessons for future organizers.

## Recommended MVP scope

The Saturday prototype should demonstrate this journey:

1. Student enters event idea.
2. System extracts structured `EventRequest` JSON.
3. System shows missing fields and completeness score.
4. System classifies tier/risk and explains why.
5. System recommends stakeholders.
6. System generates:
   - event readiness summary,
   - crib sheet draft,
   - EIS-style draft if needed,
   - stakeholder email drafts,
   - timeline/checklist,
   - internal operations summary,
   - optional Monday.com-ready handoff JSON.
7. System includes a post-event feedback/handover placeholder or mock flow.

## Biggest recommendation for the team

Build a coherent end-to-end thin vertical slice before polishing isolated modules.

A basic but connected flow is better than five polished but disconnected demos.

## Tech stack

Required active stack:

- React single-page app with Vite.
- TypeScript.
- Tailwind CSS.
- React Router.
- Node.js / Express backend.
- PostgreSQL with Prisma.
- Auth0 only for authentication.
- OpenAI API calls from the backend only.
- Frontend at `http://localhost:3000/`.
- Backend at `http://localhost:3001`.

## Shared architecture

```txt
Student organizer
  ↓
Conversational / guided intake UI
  ↓
AI extraction service
  ↓
Shared EventRequest schema
  ↓
Completeness + missing fields engine
  ↓
Tiering + escalation engine
  ↓
Stakeholder routing engine
  ↓
Output generation engine
  ├─ crib sheet draft
  ├─ EIS draft
  ├─ stakeholder email drafts
  ├─ checklist and timeline
  ├─ internal Jo summary
  └─ optional Monday.com-ready handoff JSON
  ↓
Human review and edit
  ↓
Export / handover / future optional API integration
```

The Monday.com-ready output in this diagram should be understood as an optional staff-side handoff artifact, not a mandatory workflow step or the product's canonical event record.

## Shared schema principle

Every workstream must use the same `EventRequest` object. Do not invent separate data structures unless they are explicitly mapped to the shared schema.

Current pre-Wednesday contract draft:

```txt
docs/project-context/event-request-contract.md
```

Starter example retained for orientation:

```json
{
  "event_id": "evt_demo_001",
  "created_by": {
    "name": "Student Organizer",
    "email": "student@london.edu",
    "club": "Example Club",
    "role": "Club ExCo"
  },
  "event_basics": {
    "event_name": "Future of Finance Summit",
    "event_description": "A student-led conference with external speakers and networking reception.",
    "event_format": "conference",
    "date": "2026-06-20",
    "start_time": "14:00",
    "end_time": "19:00",
    "expected_attendees": 120,
    "attendee_count_confidence": "estimate",
    "audience_type": ["students", "alumni", "external_guests"]
  },
  "space": {
    "space_confirmed": false,
    "preferred_space": null,
    "layout_preference": "theatre_plus_networking"
  },
  "catering": {
    "catering_required": true,
    "alcohol_required": true,
    "external_catering_requested": false
  },
  "av": {
    "microphones_required": true,
    "recording_required": false,
    "streaming_required": false,
    "presentation_required": true
  },
  "speakers_and_security": {
    "external_speakers": true,
    "speaker_names": [],
    "vip_or_sensitive_speakers": "unknown",
    "guest_list_required": true
  },
  "risk_and_tiering": {
    "suggested_tier": "Tier 2",
    "tier_reasons": ["Expected attendance over 100", "External speakers", "Alcohol requested"],
    "escalation_flags": ["security_review", "catering", "space_management", "av"]
  },
  "workflow_state": {
    "status": "draft",
    "completeness_score": 0.72,
    "missing_required_fields": ["speaker names", "budget code", "dietary requirements"],
    "human_review_required": true
  }
}
```

## Workstreams

### Workstream 1: Intake and Event Object

Own:

- student-facing intake,
- free-text event idea input,
- guided questions,
- structured extraction,
- missing fields,
- completeness score,
- editable event object.

Output:

- valid `EventRequest` JSON.

### Workstream 2: Post-event Feedback and Institutional Memory

Own:

- post-event feedback form,
- impact capture,
- lessons learned,
- handover summary,
- reusable recommendations for future similar events.

Output:

- `PostEventFeedback` JSON and handover summary.

### Workstream 3: Output Generation and Knowledge

Own:

- crib sheet draft,
- EIS-style draft,
- stakeholder email drafts,
- timeline/checklist,
- organizer guidance,
- knowledge recommendations,
- uncertainty/human review messages.

Output:

- `GeneratedOutputPackage` JSON and UI display.

### Workstream 4: Routing, Tiering, and Integrations

Own:

- stakeholder routing matrix,
- AI-assisted tiering/escalation classification,
- stakeholder-specific packets,
- Monday.com-ready mock JSON payload,
- mock integration endpoint.

Output:

- `TieringClassificationResult` JSON.
- `StakeholderRoutingResult` JSON.
- `MondayIntegrationPayload` JSON.

Primary backend routes:

```txt
POST /api/tiering/classify
POST /api/routing/stakeholder-packets
POST /api/integrations/monday/build-payload
```

Example Monday.com-ready payload:

```json
{
  "integration_target": "monday.com",
  "integration_status": "mock_payload_ready",
  "event_id": "evt_demo_001",
  "board_hint": "Events and Key Dates 25/26",
  "board_id_hint": "2008539622",
  "item_name": "Future of Finance Summit - 20 Jun 2026",
  "group_name": "Student Club Events",
  "lifecycle_status": "Requested",
  "columns": {
    "event_name": "Future of Finance Summit",
    "event_date": "2026-06-20",
    "event_owner": "Student Organizer",
    "club": "Example Club",
    "expected_attendance": 120,
    "suggested_tier": "Tier 2",
    "status": "Draft intake - human review required",
    "space_status": "Not confirmed",
    "catering_status": "Required - missing budget code and dietary requirements",
    "av_status": "Required - waiting for room confirmation",
    "security_status": "Review required - external speakers and 100+ attendees",
    "editorial_status": "Review suggested",
    "risk_flags": "External speakers; alcohol; 100+ attendees; sponsor visibility",
    "missing_information": "speaker names; budget code; dietary requirements; guest list",
    "next_action": "Organizer to complete missing fields before stakeholder emails are finalized",
    "human_reviewer": "Jo / Editorial Planning"
  },
  "subitems": [
    {
      "name": "Confirm space requirements",
      "owner_team": "Space Management",
      "status": "Needs info",
      "due_offset_days_before_event": 84
    },
    {
      "name": "Submit speaker details to Security",
      "owner_team": "Organizer / Security",
      "status": "Needs info",
      "due_offset_days_before_event": 28
    }
  ]
}
```

This example is a candidate export shape for staff-side visibility. It should not be read as a mandatory Monday workflow or proof that most events are managed with Monday subitems.

### Platform, Schema, Auth, and Deployment

These are now shared project responsibilities rather than a fifth workstream in the active four-workstream plan. Use the existing React/Vite client, Express backend, Prisma layer, and Auth0 permissions described in `project.md`.

## Wednesday alignment requirements

Before serious build work begins, agree:

1. Shared `EventRequest` schema.
2. MVP output list.
3. API contracts.
4. Saturday demo flow.
5. Workstream ownership.
6. Sample event data.
7. Human review/fallback behavior.

## Are workstreams parallelisable?

Before Wednesday, only partially. Everyone can define requirements, sample inputs, sample outputs, and mock designs. But heavy implementation should wait until the shared schema is agreed.

After Wednesday, yes. Once `EventRequest` and the API contracts are stable, all workstreams can build in parallel against the same object.

## Instructions for ChatGPT/Codex

When helping with this project:

- Use TypeScript.
- Respect the shared schema.
- Prefer structured JSON outputs.
- Keep modules decoupled.
- Use mock data when integrations are not available.
- Do not invent official LBS policy; label tiering as suggested/prototype logic.
- Include human review for risk, security, compliance, or stakeholder decisions.
- Optimize for a working Saturday demo.

## Mini PRD template for each workstream

Each person should create a mini PRD with:

1. Workstream name.
2. Purpose.
3. User problem.
4. MVP user stories.
5. Inputs.
6. Outputs.
7. Required schema fields.
8. API endpoints/functions needed.
9. UI components needed.
10. AI prompts or deterministic rules.
11. Edge cases.
12. Human review and risk controls.
13. Dependencies on other streams.
14. Saturday demo target.
