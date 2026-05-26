# Monday.com Workflow Takeaways

## Source status

This synthesis is based on the two Monday.com LLM assistant exports in `docs/monday-llm-responses/`:

- `monday_events_key_dates_board_summary.md`
- `monday_event_management_lifecycle.md`

The lifecycle export is incomplete. It ends during Phase 3 data-flow details at `numeric_mm2w8`, so later field-level detail is expected to change when the full response arrives. The lifecycle, stakeholder, and board-scale information already available is still useful enough to update planning assumptions.

## What We Now Know

- Jo's Monday board is `Events and Key Dates 25/26`, board ID `2008539622`, in the `Editorial Planning @LBS` workspace.
- The board is an institution-wide event coordination system, not only a student-club event tracker.
- It contains about 844 active event items.
- It tracks about 47 fields per event, 7 event categories/groups, 19 filtered board views, 38 organising departments, and 109 faculty members.
- The primary owner is Jo Luzmore, Head of Editorial Planning.
- The board coordinates events, key dates, editorial opportunities, governance reviews, senior stakeholder attendance, security review, content planning, promotion, faculty involvement, and post-event follow-up.
- Monday subitems are part of the operating model. They track task ownership, status, deadlines, blockers, and related links.

## Lifecycle Model

The Monday lifecycle has seven broad phases:

1. Ideation and initial request.
2. Feasibility and business case review.
3. Detailed planning and coordination.
4. Editorial and content planning.
5. Pre-event execution in the final two weeks.
6. Event-day execution.
7. Post-event activity and closure.

Important implication: our prototype should not treat "event readiness" as a single intake moment. The most credible version is a lifecycle-aware assistant that can explain where an event is in the process, what gates are next, which fields are missing for that phase, and which stakeholders should be involved.

## Monday Statuses And Gates

The current board uses a richer status lifecycle than our earlier draft. Named statuses in the available export include:

- `Requested`
- `Proposed`
- `TBD`
- `More info required`
- `Can progress`
- `Rejected`
- `Tentative`
- `Date to be confirmed`
- `Confirmed - subject to business case`
- `Fine - requested`
- `Fine - but more info/conditions`
- `Confirmed`
- `Confirmed - Space Check`
- `Stuck/Issues`
- `Changing plans`
- `Cancelled/moved`
- `Not happening?`

These should inform planning, mock payloads, and future endpoint behavior, but they should not be implemented as real Monday writes until the team explicitly decides to build an integration.

## Stakeholder Model

The Monday workflow adds or confirms these stakeholder groups:

- Event organiser / organising department.
- Editorial Planning team.
- Events Oversight Group.
- Editorial Group.
- Event Promo Group.
- Dean's Office.
- Security team.
- PR Managers / Communications team.
- Advancement team.
- Communications and Content Network.
- Social Media team.
- Photography team.
- Sponsorship team.
- Faculty members.
- Task owners on Monday subitems.

This is broader than the earlier operational-routing list. Space, Catering, AV, Duty Managers, Estates, Welcome Desk, SA Operations, Finance, and Sponsorship still matter for student event readiness, but Monday shows that Jo's real coordination spine is also strongly editorial, governance, senior-leadership, and content-calendar oriented.

## Data Model Implications

The shared `EventRequest` should stay smaller than the full Monday board. It should capture intake facts and lifecycle-relevant facts that the organiser can provide or confirm.

Planning should now consider adding or explicitly mapping:

- organising department or club,
- primary contact,
- event status or draft lifecycle phase,
- proposed or confirmed event date,
- event time,
- event description,
- audience type,
- location type and location details,
- expected attendance,
- actual registered or actual attendance when known,
- free or paid,
- speaker list,
- external speaker flag,
- alumni speaker flag,
- faculty attending,
- total faculty hours where relevant,
- registration link,
- business case link or business-case-required marker,
- crib sheet or briefing link,
- Dean attendance request/status,
- security review markers,
- Advancement review markers,
- editorial/content tags,
- editorial theme,
- content priority,
- promotion/review dates,
- post-event content or follow-up task state.

These do not all need to be mandatory. The important planning change is that missing information should be evaluated by lifecycle phase, not only by a generic v0 intake checklist.

## Workstream 4 Implications

Workstream 4 is the most affected stream.

- The Monday payload should be a mock mapping to a known target board, not a generic invented board.
- The payload should reference board name `Events and Key Dates 25/26` and board ID `2008539622` as non-secret planning metadata.
- Mock columns should use Monday-like field categories: status, timeline/date, time, organising department, location, audience, expected attendance, speakers, faculty, tags, review dates, links, and subitems.
- The payload should include lifecycle status and subitem suggestions, because subitems are central to Monday's task model.
- Stakeholder packets should distinguish operational routing from Jo's editorial/governance routing.
- Security, Dean's Office, Advancement, Editorial Group, Event Promo Group, PR Managers, CC Network, Photography, and Sponsorship should be first-class planning stakeholders where the event facts trigger them.
- The current "no real Monday API call" rule still stands.

## Workstream 1 Implications

Intake should collect enough information to place the event in a lifecycle phase and support missing-field questions by phase.

The intake flow should make it easy to say "unknown", "tentative", or "to be confirmed" because the real board supports uncertain early-stage events.

## Workstream 2 Implications

Post-event work should not be treated as a separate island. Monday keeps past events as historical records and uses post-event subitems for content, photos, thank-you emails, survey follow-up, reports, and lessons learned.

## Workstream 3 Implications

Generated outputs should include more than student-facing emails. Monday points to crib sheets, Dean briefings, editorial/content notes, PR/event-promo summaries, post-event content follow-up, and internal operations summaries.

## Planning Cautions

- Do not overfit the prototype to every Monday field before the full export arrives.
- Do not store real confidential operational data in the repo.
- Do not call Monday.com from the backend until explicitly requested later.
- Treat Monday field IDs as mapping evidence, not a final schema contract.
