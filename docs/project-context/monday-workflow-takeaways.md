# Monday.com Workflow Takeaways

## Source status

This synthesis is based on the Monday.com LLM assistant exports in `docs/monday-llm-responses/`:

- `monday_events_key_dates_board_summary.md`
- `monday_event_management_lifecycle.md`
- `monday_event_management_lifecycle_updated.md`

The updated lifecycle export appears to be the fuller answer, but it should now be treated as low-reliability process evidence. Jo explicitly warned that the AI-provided lifecycle "bears very little relation to reality", that most of what it lists does not happen or happens only for a minority of events, and that across the School there are roughly 1,200 events a year run by 300-400 different people while only two people are really actively using Monday to track or record events, with around 10 others using it to inform their work.

Important interpretation: Monday is not the operating system for all LBS events. It is a partial Editorial Planning coordination and visibility record maintained by a tiny number of active users. The board and exports are still useful for vocabulary, stakeholder awareness, example fields, and future integration shape, but they should not be treated as a faithful description of the real event process.

## What We Now Know

- Jo's Monday board is `Events and Key Dates 25/26`, board ID `2008539622`, in the `Editorial Planning @LBS` workspace.
- The board is an institution-wide event visibility and coordination aid, not only a student-club event tracker.
- It contains about 844 active event items.
- It tracks about 47 fields per event, 7 event categories/groups, 19 filtered board views, 38 organising departments, and 109 faculty members.
- The primary owner is Jo Luzmore, Head of Editorial Planning.
- Across the School, the real event universe is larger: about 1,200 events per year, run by roughly 300-400 different people.
- Active Monday usage is narrow: about two active recorders/trackers and around 10 information consumers.
- The board may coordinate or record events, key dates, editorial opportunities, governance reviews, senior stakeholder attendance, security review, content planning, promotion, faculty involvement, and post-event follow-up, but these workflows are not universal.
- Monday subitems exist in the model and may be useful for future payload design, but they should not be assumed to be the way most events are actually managed.

## Lifecycle Model

The Monday lifecycle has seven broad phases:

1. Ideation and initial request.
2. Feasibility and business case review.
3. Detailed planning and coordination.
4. Editorial and content planning.
5. Pre-event execution in the final two weeks.
6. Event-day execution.
7. Post-event activity and closure.

Important implication: our prototype should not treat "event readiness" as only a single intake moment, but it also should not enforce a heavy seven-stage workflow on every event. The credible version is a lightweight lifecycle-aware assistant that can capture facts from many occasional organisers, explain likely next steps, identify missing information for the current maturity of the event, and produce staff-ready handoffs for the small group of people who need visibility.

## Reliability Caveat

The updated LLM lifecycle response changes the project's understanding less by adding detail and more by warning us not to over-trust detail.

Treat the exports as:

- useful terminology and candidate field inventory,
- evidence of what Jo may want visibility into,
- a basis for mock Monday payload design,
- a reminder that Editorial Planning sees a cross-School pipeline.

Do not treat the exports as:

- a complete map of the real event process,
- evidence that most events pass through formal gates,
- proof that Monday is widely adopted,
- a source of mandatory fields for student organisers,
- justification for cloning Monday in the prototype.

The real architecture should support messy, decentralized event creation first. Monday should be a downstream visibility/export surface, not the canonical workflow engine.

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

These should inform planning, mock payloads, and future endpoint behavior, but they should not be implemented as real Monday writes until the team explicitly decides to build an integration. They should also be treated as optional mapping labels, not as a mandatory state machine for all events.

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

This is broader than the earlier operational-routing list. Space, Catering, AV, Duty Managers, Estates, Welcome Desk, SA Operations, Finance, and Sponsorship still matter for student event readiness, but Monday shows that Jo's desired visibility also includes editorial, governance, senior-leadership, and content-calendar considerations. Because only a small number of people actively maintain Monday, stakeholder routing should focus on "who needs to know or act" rather than "who updates Monday".

## Data Model Implications

The shared `EventRequest` should stay much smaller than the full Monday board. It should capture intake facts and lifecycle-relevant facts that the organiser can provide or confirm. The assistant can derive routing, tiering, lifecycle hints, missing information, and mock integration payloads from those facts.

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

These do not all need to be mandatory. Most should not be mandatory. The important planning change is that missing information should be evaluated by event maturity, risk, and stakeholder need, not by whether every Monday-style column can be filled.

## Workstream 4 Implications

Workstream 4 is the most affected stream.

- The Monday payload should be a mock candidate mapping to a known target board, not a generic invented board and not a claim that the event has been processed through Monday.
- The payload should reference board name `Events and Key Dates 25/26` and board ID `2008539622` as non-secret planning metadata.
- Mock columns should use Monday-like field categories: status, timeline/date, time, organising department, location, audience, expected attendance, speakers, faculty, tags, review dates, links, and subitems.
- The payload may include lifecycle status and subitem suggestions, but these should be framed as suggested staff-side tracking aids rather than a universal task model.
- Stakeholder packets should distinguish operational routing from Jo's editorial/governance routing.
- Security, Dean's Office, Advancement, Editorial Group, Event Promo Group, PR Managers, CC Network, Photography, and Sponsorship should be first-class planning stakeholders where the event facts trigger them.
- The current "no real Monday API call" rule still stands.
- Architecture should not make Monday the source of truth. If persistence is introduced, the prototype's own `EventRequest` record should be canonical and Monday should be an optional downstream integration/export target.

## Workstream 1 Implications

Intake should collect enough information to place the event in a rough maturity phase and support missing-field questions by phase, risk, and stakeholder need.

The intake flow should make it easy to say "unknown", "tentative", or "to be confirmed" because the real board supports uncertain early-stage events.

The intake flow should be designed for hundreds of occasional organisers, not trained Monday power users. It should be short, forgiving, and progressive, with follow-up questions only when they affect routing, tiering, or readiness.

## Workstream 2 Implications

Post-event work should not be treated as a separate island, but it should also not be assumed to happen consistently. The product can offer lightweight post-event capture for outcomes, feedback, photos/content follow-up, reports, and lessons learned where relevant.

## Workstream 3 Implications

Generated outputs should include more than student-facing emails. Monday points to crib sheets, Dean briefings, editorial/content notes, PR/event-promo summaries, post-event content follow-up, and internal operations summaries. These should be generated conditionally from event facts rather than assumed for every event.

## Planning Cautions

- Do not overfit the prototype to every Monday field or lifecycle step.
- Do not assume the LLM lifecycle response represents real practice without human validation.
- Do not design around Monday as the canonical source of truth.
- Do not store real confidential operational data in the repo.
- Do not call Monday.com from the backend until explicitly requested later.
- Treat Monday field IDs as mapping evidence, not a final schema contract.
