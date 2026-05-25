# Wednesday Discussion Notes

## Purpose

These notes are for the team discussion about what the prototype should collect, decide, and show. The goal is to agree the product requirements before each workstream builds too far in different directions.

## Event Request

This is the main item to align on. The Event Request is the shared description of an event that other workstreams can use.

- What information must the organiser provide?
- Which fields are mandatory vs optional?
- Which information can be unknown at draft stage?
- What should the assistant ask follow-up questions about?
- Should the event request be one shared object across workstreams?
- Are the current categories right: basics, organiser, space, catering, AV, speakers/guests, sponsors/external parties, intake state?

## Workstream 4 Product Decisions

Current product direction for Workstream 4:

- Tiering uses AI because it needs contextual judgement about complexity, visibility, stakeholders, and operational risk.
- The classifier starts from baseline tier rules first, then adds nuance only when the event facts support it.
- A second validator pass checks the first classification before the answer is returned.
- Stakeholder packets are deterministic because downstream teams need stable, predictable outputs.
- The Monday.com output is deterministic and mock-only. It demonstrates future integration potential without pretending to be a real integration.
- The tiering output should be explained to users, but it should remain prototype guidance rather than official LBS policy.

Questions for the group:

- Do the three tier levels feel useful for the prototype?
- What should make an event high complexity?
- Which risks or escalation concerns must be visible to staff?
- Which stakeholder packets would actually help teams prepare?
- What should the Monday.com mock payload prove in the demo?

## Proposed Technical Approach

High-level approach for approval:

- One shared Event Request goes in.
- Separate outputs come out: tiering result, stakeholder packets, generated communications, and mock integration payload.
- OpenAI is used where judgement and explanation are useful.
- Deterministic logic is used where downstream teams need consistent outputs.
- OpenAI calls and secrets stay in the backend.
- The frontend demo page is only a testing tool for now, not the final product experience.

Questions for the group:

- Is everyone comfortable with this split between AI judgement and deterministic outputs?
- Is the current Event Request structure good enough for teams to start building against?
- What should be shown in the final user-facing interface versus kept as backend/supporting data?

## Dashboard

The dashboard needs an owner.

Questions for the group:

- What is the dashboard meant to show?
- Who is responsible for the dashboard workstream?
- Is the dashboard for students, staff, admins, or all of them?
- Should it show event progress, outstanding questions, tiering, stakeholder status, generated outputs, or something else?

## Access And Roles

Normal-user and admin access should be discussed, but no policy is proposed yet.

Questions for the group:

- Which parts of the prototype should a normal user see?
- Which parts should be admin-only?
- Are there staff-only views that are different from student views?

## Demo And Testing

Current testing direction:

- Use five sample event scenarios: small workshop, alumni reception, external speaker, careers fair, and VIP/public leader event.
- Allow custom event requests so the team can test edge cases.
- Check whether the assistant asks useful follow-up questions when information is missing.
- Check whether stakeholder packets are useful enough for downstream communication work.
- Check whether the Monday.com mock payload helps explain the future workflow.
