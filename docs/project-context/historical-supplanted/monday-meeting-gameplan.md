# Monday Meeting Gameplan

Status update, 2026-06-03: this gameplan is historical. References to WS1-WS4 technical ownership and Monday-centered reset planning are superseded by `lbs-files/PLAN.md` and the Phase 1 Space Request readiness MVP framing.

## Purpose

The team did not meet Wednesday, and there is no visible open PR activity from other workstreams. Use Monday as a reset meeting: align on the prototype story, assign concrete owners, and leave with small buildable tasks rather than broad intentions.

## Opening Message

We now have a better read on the Monday.com evidence. The updated LLM export is useful for board vocabulary and possible handoff shape, but Jo's caveat means we should not treat it as the real process. Across LBS there are about 1,200 events a year run by 300-400 people, while only two people actively track/record in Monday and around 10 use it for awareness. So our product should not be a Monday clone. It should be lightweight intake, triage, stakeholder routing, useful generated outputs, and optional staff-side Monday handoff.

## Decisions To Make In The Meeting

1. Confirm the demo story:
   - student organiser starts with rough idea,
   - app builds an `EventRequest`,
   - app identifies missing information,
   - WS4 classifies tier and creates stakeholder packets,
   - WS3 generates emails/summaries/checklists,
   - Monday payload is shown as optional staff handoff, not the source of truth.

2. Lock the shared event object for now:
   - keep `EventRequest` as canonical,
   - allow unknown/tentative values,
   - use optional `process_context` for Monday handoff intent,
   - keep Monday-specific governance fields optional or derived.

3. Reassign workstreams with deliverables:
   - WS1 owns intake UI and event extraction/editing.
   - WS2 owns post-event capture and handover/learning output.
   - WS3 owns generated emails, crib sheet, EIS-style draft, checklist, and summaries.
   - WS4 owns tiering, stakeholder packets, triage summary, and optional Monday payload.

4. Decide what must be demo-ready:
   - one thin end-to-end path is more important than separate polished pieces,
   - use sample/synthetic event data,
   - protected auth can remain a known integration caveat if needed,
   - real Monday integration is out of scope.

## Suggested Agenda

1. 5 minutes: show the new process interpretation.
2. 10 minutes: confirm the demo narrative and target user.
3. 15 minutes: walk through the shared `EventRequest`.
4. 15 minutes: each person claims a narrow deliverable for Monday to Wednesday.
5. 10 minutes: agree PR rules and merge timing.
6. 5 minutes: identify blockers and owners.

## Workstream Assignments

WS1 Intake:

- Deliver an organiser-facing intake/edit flow that produces valid `EventRequest`.
- Keep the form forgiving: unknown/tentative values are acceptable.
- Do not expose every Monday field to organisers.

WS2 Post-Event:

- Deliver a small post-event feedback/handover object and display.
- Capture actual attendance, what worked, what did not, content follow-up, and lessons for next year's organisers.
- Keep it optional for the demo.

WS3 Outputs:

- Consume `EventRequest`, tiering result, and stakeholder packets.
- Generate student readiness summary, stakeholder emails, crib sheet or EIS-style draft when triggered, internal staff summary, and checklist.
- Make uncertainty and human review visible.

WS4 Routing/Integrations:

- Keep `POST /api/tiering/classify`, `POST /api/routing/stakeholder-packets`, and `POST /api/integrations/monday/build-payload`.
- Treat `EventRequest` as source of truth.
- Return triage summary and optional Monday handoff context.
- Keep Monday payload mock-only.

## PR And Coordination Rules

- Nobody pushes feature work straight to `main`.
- Pull latest `main` before starting.
- Use short feature branches.
- Open PRs early, even if draft.
- Each PR should say which workstream it affects and what route/schema/output changed.
- Before merge, check `git status --short --branch`, `git log --oneline origin/main..HEAD`, and `git diff --stat origin/main..HEAD`.

## Monday Success Criteria

By the end of the meeting, the team should have:

- one agreed demo flow,
- one agreed shared event object,
- named owners for each workstream deliverable,
- a short list of must-have screens/outputs,
- branch/PR discipline agreed,
- no ambiguity that Monday.com is optional handoff, not the product workflow engine.
