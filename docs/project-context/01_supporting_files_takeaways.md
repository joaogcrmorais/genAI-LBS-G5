# Source Takeaways for Codex: Event Readiness Assistant

## Purpose

This document gives Codex the useful takeaways from the project source materials without requiring Codex to inspect or reason over the original source files directly. It intentionally avoids listing source filenames. Use this as context for product and architecture work.

## 1. Course and prototype expectations

- The project is a course prototype, not a production enterprise system.
- The team must show that it has understood the sponsor workflow, users, stakeholders, data requirements, risks, and responsible AI considerations.
- The prototype should demonstrate a realistic AI-enabled workflow, not just a single prompt or chatbot.
- Human review, uncertainty handling, and guardrails should be visible.
- The prototype should be scoped tightly enough to demo, but credible enough to show practical value.

## 2. Official technical setup expectations

- The official LBS Codex setup overrides team preferences where they conflict.
- Required architecture: React/Vite frontend, Node/Express backend, PostgreSQL/Prisma database layer, Auth0-only authentication, backend-only OpenAI access, Azure-ready structure.
- The frontend should run on `http://localhost:3000/`.
- The backend may run on `http://localhost:3001`.
- Do not create custom login pages, hardcoded demo users, mock login routes, hidden bypasses, or development-only authentication bypasses.
- Do not commit `.env`, secret-bearing files, API keys, passwords, tokens, or database connection strings.
- Do not print secret values in chat, logs, docs, GitHub issues, screenshots, or `project.md`.
- Do not create sample/template environment files unless the instructor changes the rule.
- `project.md` must remain current after meaningful changes.
- Use the actual supplied LBS logo and follow the supplied branding guidance.

## 3. Sponsor problem and product opportunity

- London Business School receives a high volume of event requests.
- Event intake is manual, inconsistent, and spread across fragmented processes and systems.
- Student club organisers often do not know what information to provide, who to contact, what lead times apply, or when to escalate.
- Staff spend time triaging incomplete or unclear requests.
- The sponsor wants a tool that helps organisers with basics so staff can focus on higher-value judgement, advice, and escalation.
- The product should reduce avoidable back-and-forth and create cleaner event handoffs.

## 4. Current workflow understanding

Current event planning broadly involves:

1. Student organiser has an event idea.
2. Organiser completes an initial space/crib-style request.
3. Space Management reviews space suitability and availability.
4. The organiser sets up or requests marketing/listing support through relevant systems.
5. Additional stakeholders are contacted depending on the event.
6. More complex events may require an Event Information Sheet and a Key Events-style coordination process.
7. Stakeholders need event-specific details before they can act.
8. Timelines and dependencies are often unclear to student organisers.

Pain points:

- repeated back-and-forth,
- incomplete submissions,
- uncertainty about lead times,
- uncertainty about who owns what,
- escalation triggers living in expert judgment rather than a clear process,
- repeated mistakes across annual events,
- limited structured handover from one student team to the next.

## 5. Product direction

The product should be an intake and orchestration assistant.

It should:

- guide students through event readiness,
- turn rough input into a structured event object,
- tolerate uncertainty and ask follow-up questions,
- identify missing fields,
- classify likely complexity/risk,
- route to relevant stakeholders,
- generate stakeholder-ready summaries and emails,
- generate timelines and next steps,
- prepare future integration payloads,
- capture post-event lessons for future organisers.

The product should not be just:

- a static form,
- a generic chatbot,
- a document generator disconnected from workflow,
- a pretend production integration.

## 6. Primary users

Primary student users:

- club presidents,
- senior ExCo members,
- junior ExCo members,
- first-time event organisers.

Primary internal user:

- sponsor/internal event oversight user who needs earlier pipeline visibility, escalation flags, and clean event summaries.

Secondary or affected stakeholders:

- Space Management,
- Catering,
- AV/Technology,
- Security,
- Duty Managers,
- Estates/Porters,
- Welcome Desk,
- Editorial Planning,
- Dean's Office,
- SA Operations,
- SA Finance,
- SA Sponsorship,
- Advancement/Alumni Engagement,
- sponsors,
- speakers,
- vendors.

## 7. Stakeholder routing takeaways

Different teams need different information before they can act.

Catering needs:

- final or estimated headcount,
- event timing,
- service style,
- menu/catering format,
- alcohol needs,
- dietary requirements,
- external catering requests,
- budget/payment source,
- deadlines.

Space Management needs:

- event location preference,
- attendance estimate,
- layout preference,
- room/space needs,
- booth requirements,
- flow of guests,
- setup and breakdown timing.

Estates/Porters need:

- confirmed layout,
- number and location of tables/booths,
- signage requirements,
- setup/breakdown timing,
- campus ticketing information.

Duty Managers need:

- event details,
- signage/workflow requirements,
- Key Events-style coordination details where relevant.

AV needs:

- presentation requirements,
- microphones,
- playback files,
- recording/livestreaming/hybrid requirements,
- room location,
- agenda, speaker order, and cue points.

Security needs:

- expected attendance,
- attendee profile,
- external audience,
- speaker details,
- VIP/embassy/government/media presence,
- sensitive topics,
- guest list information,
- alcohol/capacity considerations.

Editorial Planning needs:

- event purpose,
- audience,
- visibility,
- senior leadership involvement,
- media/sponsor visibility,
- script/content quality,
- strategic fit.

## 8. Tiering and escalation takeaways

Tiering is a way of grouping events by risk, exposure, complexity, and required controls.

Tiering is not:

- a judgement on how good an event is,
- a ranking of event importance,
- a way to take ownership away from teams.

Tiering should help:

- spot higher-risk events earlier,
- reduce last-minute surprises,
- apply controls only where needed,
- protect people, reputation, compliance, and operations.

Prototype tier indicators:

- audience size,
- external attendees,
- external speakers,
- high-profile speakers,
- VIP/government/embassy presence,
- politically or reputationally sensitive content,
- media attendance,
- alcohol,
- multi-room or multi-day logistics,
- multiple suppliers/stakeholders,
- public-facing events,
- recording or livestreaming,
- sponsorship or external brands.

A simple prototype model can use:

- Tier 1: small, internal, low complexity, known format.
- Tier 2: added complexity, external speakers/attendees, moderate scale, multiple stakeholders.
- Tier 3: significant complexity or risk, large scale, high visibility, sensitive content, VIP/media, multiple dependencies.

The UI and backend responses must label this as prototype suggested tiering, not official LBS policy.

## 9. Event toolkit operational takeaways

Important product logic should include:

- Start with event purpose and whether an event is the right format.
- Encourage measurable objectives and success metrics.
- Help organisers define audience, format, proposition, and value.
- Build timelines backwards from the event date.
- Highlight non-negotiable deadlines.
- Add buffers for external stakeholders and busy teams.
- Flag Key Event-style criteria such as 100+ attendees, high-profile speakers, complex logistics, external audience, and media.
- For Key Event-style events, surface EIS and coordination-meeting implications.
- Catering has meaningful lead times and final number deadlines.
- Alcohol introduces licensing and security considerations.
- Security review becomes more important with larger attendance, external guests, VIPs, sensitive speakers, and guest list requirements.
- Post-event learning matters: organisers should capture attendance, outcomes, what worked, what did not, and recommendations.

## 10. Branding and UI takeaways

The UI should feel LBS-aligned:

- LBS Blue should dominate.
- Red should be used sparingly as an accent, not typography.
- Warm grey may be used as a background support colour.
- Use generous white space.
- Keep layouts clean, editorial, spacious, and left-aligned.
- Avoid clutter and overuse of secondary colours.
- Use the real supplied LBS logo file rather than recreating it.

## 11. Reference architecture takeaways

Intake and orchestration tools commonly use:

- a single entry point for requests,
- guided intake,
- smart routing,
- status tracking,
- approvals or human review,
- request objects that move through workflow states,
- collaboration around a structured request,
- integration-ready payloads for downstream systems.

Agentic AI patterns relevant to this prototype:

- Think: interpret the user's event idea and determine what is missing.
- Act: call tools or services such as extraction, routing, tiering, timeline generation, or payload generation.
- Observe: inspect outputs, missing fields, confidence, and risk flags.
- Repeat or escalate: ask follow-up questions or route to a human.

This prototype should not overbuild agentic autonomy. Use deterministic rules where reliability and explainability matter, especially for tiering and escalation.

## 12. Evaluation and KPI takeaways

Useful evaluation categories:

Reliability:

- goal accuracy,
- hallucination rate,
- routing accuracy,
- tiering reason quality,
- unsupported request rate,
- validation failure rate.

Adoption:

- task completion rate,
- organiser confidence,
- human override rate,
- repeated use,
- time to complete intake.

Business value:

- reduced clarification emails,
- cleaner submissions,
- faster routing,
- less manual triage,
- better event readiness,
- improved handover quality.

Governance:

- audit trail,
- policy violation rate,
- escalation accuracy,
- human review coverage,
- data minimisation.

## 13. Practical meaning for the prototype

Across all source context, the direction is consistent:

1. The assistant should produce structured operational outputs, not just answers.
2. The key object should be `EventRequest`, not a chat transcript.
3. The assistant should progressively collect information and tolerate uncertainty.
4. Stakeholder routing is central.
5. Tiering and escalation are central.
6. Timeline/checklist generation is central.
7. Post-event learning and handover are valuable, even if only mocked for Saturday.
8. Future integration matters, but real integration can be deferred.
9. Human review must remain visible.
10. The demo should show one coherent vertical slice.

## 14. Build-priority guidance for Codex

When implementing product features:

1. Preserve official setup and security constraints.
2. Keep the first version thin and demo-ready.
3. Prefer real local service functions over fake hard-coded responses.
4. Use sample/synthetic data only.
5. Put deterministic rules in service files, not directly in UI components.
6. Use Zod or equivalent validation where practical.
7. Keep API routes thin: validate request, call service, return JSON.
8. Keep business logic testable without HTTP.
9. Update `project.md` after meaningful changes.
10. Do not create real third-party integrations unless explicitly requested.

## 15. Recommended Workstream 4 implementation focus

For Workstream 4, build:

- `EventRequest` type/schema,
- `StakeholderRoutingResult` type/schema,
- `MondayIntegrationPayload` type/schema,
- deterministic tiering service,
- deterministic routing service,
- Monday.com-ready mock payload builder,
- sample event fixtures,
- endpoints:
  - `POST /api/tiering/classify`,
  - `POST /api/routing/build`,
  - `POST /api/integrations/monday/build-payload`.

Do not build real Monday.com API calls for Saturday.
Do not rely on OpenAI for core tiering/routing logic in the first implementation.
