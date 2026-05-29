# EventRequest Contract

## Status

Pre-Wednesday proposal for schema-lock discussion, partially implemented in the current WS4 backend schema.

This document defines the shared `EventRequest` object that Workstream 1 should produce and Workstreams 3 and 4 should consume. It is not yet a final product schema, but the backend now accepts the lifecycle/status fields below and should be treated as the coordination contract until the team agrees further changes.

Latest context update: the Monday.com LLM exports in `docs/monday-llm-responses/` describe Jo's real `Events and Key Dates 25/26` board, including the newer `monday_event_management_lifecycle_updated.md` export. However, Jo has warned that the AI-generated lifecycle is largely not representative of reality: most of the listed process either does not happen or happens only for a minority of events. Across the School there are roughly 1,200 events per year run by 300-400 people, while only two people actively track/record events in Monday and about 10 people use Monday to inform their work.

Schema implication: `EventRequest` should model a lightweight, organizer-facing event facts object. It should not copy Monday's 47-column board, force every event through a heavy Monday-style lifecycle, or assume that Monday is the system of record. Monday-style fields should remain optional intake hints or derived integration-mapping data unless the product explicitly needs them.

## Contract principle

`EventRequest` should capture the facts the organiser has provided or confirmed about the event.

It should be designed for hundreds of occasional organisers who may not know LBS internal process or Monday terminology. Unknown, tentative, and "to be confirmed" values are valid early-stage facts, not failures.

Derived outputs should live in separate service responses:

- tiering lives in `TieringClassificationResult`,
- stakeholder routing and packet data live in `StakeholderPacketResult`,
- generated emails/summaries live in `GeneratedOutputPackage`,
- mock Monday.com output lives in `MondayIntegrationPayload`.

This keeps the base event object stable enough for all workstreams while still allowing each workstream to add its own outputs.

## Minimum fields needed by Workstream 4

Workstream 4 needs these fields to classify tiering and build stakeholder packets:

- event name and description,
- date or target timing,
- expected attendees,
- audience type,
- speaker / VIP / external guest details,
- catering and alcohol needs,
- AV / recording / streaming needs,
- space status and setup needs,
- sponsor / media / public visibility,
- sensitive topic indicator if known.

If these are missing, `POST /api/tiering/classify` may return `needs_more_information`.

The Monday exports add several possible fields that are not all mandatory for the first prototype, and many should remain optional or derived. These should be discussed before schema lock:

- organising department or club,
- lifecycle status or planning phase,
- business-case-required marker and business case link,
- specific location details in addition to location type,
- registration link,
- Dean attendance request/status and briefing link,
- security review marker,
- Advancement review marker,
- editorial/content tags,
- editorial theme and content priority,
- review dates for Events Oversight, Dean's Office, Editorial Group, Event Promo Group, CC Network, and EP review,
- actual registered or actual attendance when known,
- faculty attending and faculty hours where relevant,
- post-event content or follow-up task state.

Recommended contract principle: keep `EventRequest` as a manageable intake/lifecycle facts object. Do not copy all 47 Monday board columns into the base request unless the product actually asks organisers for them or the backend needs them for routing. Treat Monday output as a downstream payload built from the request, not as the request itself.

## Proposed v0 shape

```json
{
  "event_id": "evt_001",
  "status": "draft",
  "created_at": "2026-05-25T12:00:00Z",
  "updated_at": "2026-05-25T12:00:00Z",
  "organizer": {
    "name": "",
    "email": "",
    "club_or_department": "",
    "role": "",
    "deputy_name": "",
    "deputy_email": ""
  },
  "event_basics": {
    "title": "",
    "description": "",
    "purpose": "",
    "lifecycle_phase": "ideation",
    "monday_status_hint": "requested",
    "event_type": "panel",
    "is_recurring": false,
    "previous_event_reference": "",
    "target_date": "",
    "start_time": "",
    "end_time": "",
    "is_multi_day": false,
    "expected_attendance": null,
    "attendance_estimate_type": "unknown",
    "audience_types": ["students"],
    "external_audience": false
  },
  "space_and_setup": {
    "space_confirmed": false,
    "preferred_space": "",
    "space_requirements": "",
    "layout_preference": "",
    "needs_booths": false,
    "number_of_booths": null,
    "needs_cloakroom": false,
    "needs_signage": false,
    "setup_notes": ""
  },
  "catering": {
    "needs_catering": false,
    "catering_style": "unknown",
    "needs_alcohol": false,
    "dietary_requirements_known": false,
    "external_caterer": false,
    "catering_notes": "",
    "budget_estimate": null
  },
  "av_and_tech": {
    "needs_av": false,
    "microphones": false,
    "projector_or_screen": false,
    "recording": false,
    "livestreaming": false,
    "hybrid": false,
    "complex_av": false,
    "av_notes": ""
  },
  "speakers_and_guests": {
    "has_external_speakers": false,
    "speakers": [],
    "faculty_attending": [],
    "vip_or_embassy_presence": false,
    "dean_attendance_requested": false,
    "media_expected": false,
    "guest_list_required": false,
    "sensitive_topic": "unknown"
  },
  "sponsorship_and_external_parties": {
    "has_sponsors": false,
    "sponsor_names": [],
    "has_external_vendors": false,
    "vendor_notes": "",
    "requires_booth_or_branding": false
  },
  "intake_state": {
    "source": "manual",
    "completeness_score": null,
    "missing_fields": [],
    "assumptions": []
  }
}
```

## Suggested enum values

`status`:

- `draft`
- `ready_for_review`
- `submitted`

`event_type`:

- `panel`
- `conference`
- `workshop`
- `networking`
- `social`
- `speaker`
- `careers`
- `other`
- `unknown`

`lifecycle_phase`:

- `ideation`
- `feasibility`
- `detailed_planning`
- `editorial_content_planning`
- `pre_event_execution`
- `event_day`
- `post_event`
- `unknown`

`monday_status_hint`:

- `requested`
- `proposed`
- `tbd`
- `more_info_required`
- `can_progress`
- `tentative`
- `date_to_be_confirmed`
- `confirmed_subject_to_business_case`
- `confirmed`
- `confirmed_space_check`
- `stuck_issues`
- `changing_plans`
- `cancelled_moved`
- `not_happening`
- `unknown`

`attendance_estimate_type`:

- `unknown`
- `rough_estimate`
- `confirmed_estimate`
- `capacity_limit`

`audience_types`:

- `students`
- `faculty`
- `staff`
- `alumni`
- `external_guests`
- `corporate_partners`
- `public`
- `vip`
- `mixed`

`catering_style`:

- `none`
- `refreshments`
- `buffet`
- `plated`
- `reception`
- `bespoke`
- `unknown`

`sensitive_topic`:

- `yes`
- `no`
- `unknown`

## Speaker object

When speaker details are known, use:

```json
{
  "name": "",
  "organization": "",
  "role_title": "",
  "is_external": true,
  "is_vip": false,
  "is_politically_sensitive": false,
  "requires_security_review": false,
  "notes": ""
}
```

Speaker names can be blank or omitted while the organiser is still drafting. If the event has external speakers but no speaker details, WS4 should usually ask for more information before making high-stakes tiering claims.

## Pre-Wednesday decisions to lock

The team should lock:

- whether `event_id` is generated by the backend or frontend during the prototype,
- whether `target_date` can be a free-text date range or must be ISO date only,
- whether `sensitive_topic` is asked directly or inferred from free text,
- the final stakeholder enum used by WS4 packets,
- whether `intake_state.completeness_score` is owned by Workstream 1 or calculated on demand.
- whether lifecycle phase and Monday status hint belong in `EventRequest` v0 or in a separate derived workflow state,
- which Monday-derived review fields are needed for Saturday versus future integration planning.
- whether the persisted event record, if added, should be the product's own canonical event record with optional Monday export/sync metadata rather than a mirror of Monday.
- which fields are only for Jo/staff visibility and should not be asked of student organisers unless triggered by risk or event type.

Current implementation note: `event_basics.lifecycle_phase`, `event_basics.monday_status_hint`, `event_basics.registration_link`, optional `event_basics.actual_attendance`, optional `speakers_and_guests.faculty_attending`, optional `speakers_and_guests.dean_attendance_requested`, and a permissive `planning_and_governance` object are accepted by the backend WS4 schema. The exact governance subfields remain intentionally permissive while the full Monday export is pending.

## Non-goals for this contract

This contract does not define:

- Prisma persistence,
- generated email/summarization output,
- official LBS policy,
- a complete clone of all Monday.com fields,
- a mandatory Monday workflow,
- post-event feedback schema.
