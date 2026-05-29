# Workstream 4 Mini PRD

## Workstream name

Workstream 4: Tiering, Stakeholder Packets, and Mock Integrations

## Purpose

Workstream 4 provides the decision and handoff layer for the Event Readiness Assistant. It classifies the likely complexity of an event, prepares stakeholder-specific packets for downstream output generation, and produces a mock Monday.com-ready payload.

This workstream should make the prototype feel like it captures the practical event-planning judgment that currently lives in experienced staff members' heads, while keeping outputs structured, explainable, and safe for a student-facing prototype. The Monday.com LLM exports show useful vocabulary and board shape, but Jo's caveat changes their weight: the real school-wide process is decentralized, and Monday is actively maintained by only a tiny group. Workstream 4 should model student-facing readiness, Jo's editorial/governance visibility needs, and a possible Monday handoff without pretending that Monday runs the whole event lifecycle.

## Main objective

Build backend capabilities that:

- use OpenAI to classify event tier and escalation concerns,
- ask for more information when tiering cannot be responsibly completed,
- use deterministic logic to create stakeholder packets,
- provide structured outputs that Workstream 3 can use to generate emails and summaries,
- produce a mock Monday.com payload that demonstrates future optional handoff potential against Jo's real `Events and Key Dates 25/26` board shape.

## Product context

Jo described LBS events as numerous, complex, and dependent on institutional knowledge. Some event routing and escalation decisions are not exact science; they depend on context, judgment, visibility, stakeholders, and operational nuance.

For that reason, tiering should use an LLM, supported by baseline guidance and a validation pass. Stakeholder packets should be deterministic because they feed downstream content generation and should not block Workstream 3 with uncertain prediction.

The Monday exports add concrete board context:

- the board tracks about 844 active events and key dates,
- it has about 47 fields per event,
- it supports 7 event groups/categories and 19 filtered board views,
- it tracks 38 organising departments and 109 faculty members,
- it uses status, date, tag, review-date, speaker, faculty, location, audience, attendance, link, and subitem task data,
- it manages events from idea through post-event closure.

Jo's later caveat is now more important than the lifecycle detail: across LBS there are about 1,200 events per year, run by 300-400 different people, and only two people really actively use Monday to track or record events, with around 10 others using it for awareness. Most of the AI-described lifecycle does not happen or only happens for a minority of events.

This means the product should not become a Monday clone or a strict workflow engine. It should capture decentralized event facts, make missing information visible, route the few genuinely important escalations, and optionally produce a staff-side Monday-ready payload.

## Users

- Student organisers who need clear guidance on event complexity and next steps.
- Jo / Editorial Planning, who need earlier visibility into events that may require coordination.
- Operational stakeholders who need concise, relevant event packets.
- Workstream 3, which needs reliable stakeholder packet data for emails, summaries, and output generation.

## User stories

- As a student organiser, I want a suggested event tier with clear reasoning so I understand why the event may be simple, moderate, or complex.
- As a student organiser, I want the assistant to ask for missing information if it cannot classify my event responsibly.
- As Jo / Editorial Planning, I want the tiering recommendation to account for contextual risk, visibility, VIPs, external stakeholders, and operational complexity.
- As Workstream 3, I want deterministic stakeholder packets so I can generate emails and summaries without waiting for manual confirmation.
- As the demo team, I want a mock Monday.com payload to show how event data could later move into Jo's existing event board without calling Monday.com.
- As Jo / Editorial Planning, I want lifecycle and review-gate information when relevant so I can see whether an event is still an idea, needs business-case review, is in detailed planning, needs editorial/promo review, is close to event day, or needs post-event follow-up.
- As an occasional organiser, I want the tool to ask only for information that matters for my event, rather than forcing me through an internal Monday-style process I do not use.

## In scope

- AI-assisted event tiering.
- AI validation pass for tiering.
- Missing-information response for tiering.
- Deterministic stakeholder packet generation.
- Deterministic mock Monday.com payload generation.
- Monday-inspired lifecycle/status mapping for planning and mock integration output.
- Structured JSON contracts for downstream use.
- Sample event scenarios for demo/testing.

## Out of scope

- Real Monday.com API integration.
- Endpoint changes before the team explicitly asks for them.
- A full clone of Jo's Monday board or the AI-described lifecycle.
- A mandatory workflow that assumes every event passes through all Monday-style gates.
- Official LBS policy decisions.
- Full persistence model unless another workstream finalizes it.
- Real confidential LBS data.
- Manual approval workflow before Workstream 3 can use stakeholder packets.
- LLM-based stakeholder packet prediction.

## Endpoint requirements

### `POST /api/tiering/classify`

Classifies event tier using OpenAI.

Request input:

- Shared `EventRequest` object.
- Optional caller metadata if needed for traceability, but no secrets or raw access tokens.

The endpoint must return one of two response modes.

Classification response:

```json
{
  "status": "classified",
  "event_id": "evt_001",
  "suggested_tier": "tier_2",
  "tier_label": "Moderate complexity",
  "reasoning": [
    "The event involves external speakers.",
    "The expected audience size increases coordination needs.",
    "Catering or alcohol introduces additional operational dependencies."
  ],
  "risk_flags": ["external_speakers", "large_audience", "alcohol_requested"],
  "escalation_flags": ["security_review", "catering_coordination"],
  "validator_notes": [
    "The initial classification was revised to account for missing speaker details."
  ],
  "policy_disclaimer": "Prototype guidance only; not official LBS policy."
}
```

Missing-information response:

```json
{
  "status": "needs_more_information",
  "event_id": "evt_001",
  "missing_information": [
    {
      "field": "expected_attendees",
      "question": "How many attendees do you expect?"
    }
  ],
  "reasoning": [
    "Expected attendance is needed because scale materially affects tiering and escalation."
  ],
  "policy_disclaimer": "Prototype guidance only; not official LBS policy."
}
```

Hard requirements:

- Must use OpenAI.
- Must include user-visible reasoning.
- Must not return confidence scores.
- Must not require human review by default.
- Must not return `needs_human_review`.
- Must include a validation pass that challenges the first answer.
- If the validator finds flaws, the final response must be revised.
- If the validator finds missing critical information, the final response must be `needs_more_information`.
- Must not claim to represent official LBS policy.

### `POST /api/routing/stakeholder-packets`

Builds deterministic stakeholder routing and packet data.

Request input:

- Shared `EventRequest`.
- Classification result from `/api/tiering/classify`, when available.

Response shape:

```json
{
  "event_id": "evt_001",
  "stakeholders_required": [],
  "stakeholders_recommended": [],
  "stakeholders_not_needed": [],
  "stakeholder_packets": [],
  "cross_stakeholder_dependencies": [],
  "missing_information_by_stakeholder": []
}
```

Hard requirements:

- Must be deterministic.
- Must not use OpenAI for stakeholder prediction.
- Must be stable enough for Workstream 3 to consume directly.
- Must include required and recommended stakeholders separately.
- Must include stakeholder-specific missing information.
- Must not block Workstream 3 on manual approval.
- May use the tiering result as an input, but should not depend exclusively on it.

### `POST /api/integrations/monday/build-payload`

Builds a mock Monday.com-ready payload.

Request input:

- Shared `EventRequest`.
- Classification result.
- Stakeholder packet result.

Response shape:

```json
{
  "integration_target": "monday.com",
  "integration_status": "mock_payload_ready",
  "event_id": "evt_001",
  "board_hint": "Events and Key Dates 25/26",
  "board_id_hint": "2008539622",
  "item_name": "Event name",
  "group_name": "Student Club Events",
  "lifecycle_status": "Requested",
  "columns": {},
  "subitems": [],
  "source_outputs_used": ["classification", "stakeholder_packets"]
}
```

Hard requirements:

- Must not call the real Monday.com API.
- Must be deterministic.
- Must clearly label itself as a mock payload.
- Must be suitable for demo display and future integration planning.
- Should map to Monday-like categories from the source exports: status, timeline/date, time, organising department, location, audience, expected attendance, actual registered, speakers, faculty attending, business case link, registration link, crib sheet link, content tags, review dates, and stakeholder tags.
- May include suggested subitems for staff-side tracking and demo purposes, but should not imply that most real events are managed through Monday subitems.

Implementation status: the current backend keeps the endpoint path unchanged and returns `board_hint: "Events and Key Dates 25/26"`, `board_id_hint: "2008539622"`, `lifecycle_status`, Monday-like columns, stakeholder-derived subitems, lifecycle-review subitems, and post-event follow-up subitems. This should now be understood as a candidate export/handoff view, not as evidence that the event is being managed in Monday.

## Monday-derived stakeholder coverage

The stakeholder-packet rules should now distinguish operational stakeholders from editorial/governance stakeholders.

Operational stakeholders already in scope:

- Space Management,
- Catering / Lexington,
- AV / Technology,
- Security,
- Duty Managers / Campus Services,
- Estates / Porters,
- Welcome Desk,
- SA Operations,
- SA Finance,
- SA Sponsorship.

Monday/export-derived stakeholders to add to planning:

- Events Oversight Group,
- Editorial Planning,
- Editorial Group,
- Event Promo Group,
- Dean's Office,
- PR Managers / Communications,
- Advancement,
- CC Network,
- Social Media,
- Photography,
- Sponsorship,
- faculty members,
- task owners.

Not every event needs every stakeholder. The point is that the routing model should be able to explain both physical event readiness and Jo's editorial/governance visibility needs where event facts justify them. Routing should answer "who needs to know or act?" rather than "who would update Monday?"

## AI requirements

The AI tiering flow must:

- receive baseline tiering guidance in the prompt,
- consider real-world event planning context,
- identify assumptions,
- identify missing critical information,
- return structured JSON,
- provide reasoning that can be shown to users,
- undergo a second validation pass.

The validation pass must challenge:

- unsupported assumptions,
- missing information,
- inconsistent tiering,
- overlooked escalation issues,
- invented LBS policy,
- insufficient reasoning.

The final tiering response must be either:

- a revised classification, or
- a missing-information request.

## Demo scenarios

Keep the existing Future of Finance event as one demo option, but do not treat it as the only/default scenario.

Add these varied scenarios:

- Small internal skills workshop: 25 students, internal facilitator, no catering, standard classroom, low complexity.
- Alumni networking reception: 80 attendees, alumni and students, catering and alcohol, evening timing, moderate coordination.
- External speaker fireside chat: 60 attendees, named external speaker, AV and guest list required, possible reputational review.
- Multi-club careers fair: 200 attendees, employer booths, sponsors, catering, multi-room setup, high logistics complexity.
- VIP central banker / public leader event: high-profile speaker such as the Governor of the Reserve Bank of India, a European central banker, a UK MP, or the Prime Minister; external guests; likely media or reputational sensitivity; Security, Editorial Planning, senior stakeholder oversight, guest-list control, and escalation likely required. This is especially useful for the demo because Jo mentioned a real event involving the Governor of India's central bank.

## Success criteria

- `classify` returns useful tiering with clear reasoning or asks for specific missing information.
- `stakeholder-packets` returns stable deterministic packet data.
- Workstream 3 can consume stakeholder packets without waiting for manual approval.
- Monday payload demonstrates future integration without pretending to be a real integration.
- Monday payload reflects the known board/lifecycle structure rather than a purely invented schema.
- Monday payload is clearly framed as optional staff-side handoff, because Monday is not currently used by most event organisers.
- The prototype visibly uses GenAI where it is useful and avoids it where deterministic logic is better.
