# Product Brief: Event Readiness Assistant

## Product name

Event Readiness Assistant

## One-line summary

An AI-assisted intake and orchestration prototype that helps London Business School student club organisers turn a rough event idea into a structured, stakeholder-ready event package.

## Sponsor and context

Sponsor: Jo Luzmore, Head of Editorial Planning, London Business School.

London Business School runs a large volume of events, including student club events, conferences, speaker sessions, workshops, and networking receptions. Event planning involves multiple stakeholders, forms, operational teams, lead times, and escalation paths. Many student organisers do not know what information to provide, who to contact, what deadlines apply, or when an event requires additional review.

The current process creates avoidable back-and-forth, incomplete submissions, uncertainty for students, and extra triage work for staff.

New Monday.com source context: Jo's real `Events and Key Dates 25/26` board is a central Editorial Planning coordination system with about 844 active event items, 47 tracked fields per event, 7 event groups/categories, 19 filtered views, 38 organising departments, and 109 faculty members. It manages events across a lifecycle from initial request through business-case review, detailed planning, editorial/content planning, pre-event checks, event-day execution, and post-event follow-up. One of the two source exports is incomplete, so field-level mapping should remain flexible.

## Core problem

Student organisers often start with an event idea but lack the operational knowledge required to make the event ready for LBS teams to assess and support.

They may not know:

- what information Space Management needs,
- when Catering needs final numbers,
- when Security should be involved,
- whether an Event Information Sheet is needed,
- which stakeholders should receive what information,
- what lead times apply,
- or what makes an event more complex or higher risk.

For staff, the result is fragmented information, repeated clarification emails, inconsistent handoffs, and limited early visibility into events that may require coordination.

## Product vision

The product should be more than a chatbot and more than a form.

It should act as an intake and orchestration layer:

1. guide the organiser through an event planning flow,
2. structure the event request,
3. identify missing information,
4. classify likely complexity/risk,
5. route the event to relevant stakeholders,
6. generate operational outputs,
7. prepare future integration payloads,
8. preserve learning for future organisers,
9. show lifecycle position, review gates, and post-event follow-up needs where useful.

## Primary users

### Student club organisers

Especially club presidents, senior ExCo members, junior ExCo members, and first-time event organisers.

Needs:

- confidence about what to do next,
- simple guidance,
- fewer forms and unclear handoffs,
- timelines and reminders,
- clear stakeholder-ready outputs.

### Jo / Editorial Planning / internal event oversight

Needs:

- earlier visibility of event pipeline,
- clearer escalation flags,
- cleaner event summaries,
- lifecycle/status awareness,
- business-case, editorial, Dean's Office, security, promotion, and post-event follow-up cues,
- fewer basic clarification requests,
- support for high-value advisory work rather than repeating basic process guidance.

## Affected stakeholders

Depending on event complexity, the tool may affect:

- Space Management,
- Catering / Lexington,
- AV / Technology,
- Security,
- Duty Managers,
- Estates / Porters,
- Welcome Desk,
- Editorial Planning,
- Dean's Office,
- SA Operations,
- SA Finance,
- SA Sponsorship,
- Advancement / Alumni Engagement,
- external speakers, vendors, and sponsors.

Each stakeholder needs different information before they can act. The product should generate stakeholder-specific outputs rather than one generic summary.

## MVP user story

A student organiser arrives with a rough event idea. The assistant asks clarifying questions, structures the event request, identifies missing information, classifies likely complexity and risk, recommends relevant stakeholders and next steps, generates useful event outputs, and creates a mock integration payload that could later feed a project management tool such as Monday.com.

## MVP demo flow

1. Student enters an event idea.
2. System extracts or builds a structured `EventRequest`.
3. System shows missing fields and completeness score.
4. System classifies likely tier/risk and explains why.
5. System recommends stakeholders.
6. System generates:
   - student readiness summary,
   - crib-sheet-style event summary,
   - EIS-style summary when needed,
   - stakeholder email drafts,
   - timeline/checklist,
   - Jo/internal operations summary,
   - Monday.com-ready mock payload.
7. System includes a post-event feedback/handover placeholder.
8. Human review is clearly required for sensitive, high-risk, or uncertain outputs.

## Demo event scenarios

Future of Finance Summit:

- student club conference,
- approximately 120 expected attendees,
- external speakers,
- networking reception,
- alcohol requested,
- AV required,
- space not yet confirmed,
- possible sponsor/partner visibility.

This scenario is complex enough to trigger routing, Security, Catering, AV, Space, Editorial Planning, EIS-style logic, and a Monday.com-ready payload, while still being easy to explain.

Keep this as one demo option, but do not treat it as the only/default scenario. The prototype should also show that it can handle varied event contexts:

- Small internal skills workshop: 25 students, internal facilitator, no catering, standard classroom, low complexity.
- Alumni networking reception: 80 attendees, alumni and students, catering and alcohol, evening timing, moderate coordination.
- External speaker fireside chat: 60 attendees, named external speaker, AV and guest list required, possible reputational review.
- Multi-club careers fair: 200 attendees, employer booths, sponsors, catering, multi-room setup, high logistics complexity.
- VIP central banker / public leader event: high-profile speaker such as the Governor of the Reserve Bank of India, a European central banker, a UK MP, or the Prime Minister; external guests; likely media or reputational sensitivity; Security, Editorial Planning, senior stakeholder oversight, guest-list control, and escalation likely required. This is especially useful for the demo because Jo mentioned a real event involving the Governor of India's central bank.

## Core product objects

### EventRequest

The shared event object. It should capture organiser details, event basics, lifecycle/status hints, space/setup needs, catering, AV, speakers/guests, sponsorship/external parties, and intake state. Derived tiering, stakeholder packets, generated outputs, integration data, and post-event feedback should generally stay as separate outputs unless the team explicitly decides to persist them on the event record.

### StakeholderRoutingResult

The routing output. It should identify required and recommended stakeholders, reasons, risk flags, escalation flags, proposed tier, EIS or briefing requirement if relevant, Events Oversight / editorial / promotion / Dean / security review needs where relevant, and reasoning summary.

### MondayIntegrationPayload

A mock integration payload. It should show how the structured event and routing output could later become an item in Jo's `Events and Key Dates 25/26` Monday board with lifecycle status, group/category, columns, tags, owners, review gates, links, missing information, next actions, and subitems.

## Workstream 4 scope

Workstream 4 owns the contract and integration spine:

- shared event schema coordination,
- AI-assisted tiering logic,
- deterministic stakeholder packet logic,
- integration payloads,
- backend API contracts,
- sample fixtures,
- demo coherence,
- Monday.com lifecycle and mock field-mapping guidance.

Minimum Workstream 4 endpoints:

```txt
POST /api/tiering/classify
POST /api/routing/stakeholder-packets
POST /api/integrations/monday/build-payload
```

Additional event endpoints may be added if persistence is ready:

```txt
GET  /api/events/:id
PUT  /api/events/:id
```

## Technical architecture constraints

The official LBS setup governs the project.

Required baseline:

- React single-page application using Vite, TypeScript, Tailwind, and React Router.
- Node.js backend API service, preferably Express with TypeScript.
- API routes under `/api`.
- PostgreSQL database with Prisma.
- Auth0 React SDK on frontend and Auth0 JWT validation on backend.
- Backend-only OpenAI calls.
- Frontend on `http://localhost:3000/`.
- Backend on `http://localhost:3001`.
- Azure-ready structure.
- `project.md` kept up to date.

Do not implement:

- custom username/password login,
- hardcoded users,
- bypass routes,
- frontend OpenAI calls,
- real Monday.com integration for Saturday,
- real Microsoft integration,
- full RAG if time is tight,
- real confidential LBS data.

## Product principles

1. Build a thin end-to-end slice before polishing isolated modules.
2. Use one shared event object across all workstreams.
3. Treat tiering as prototype guidance, not official LBS policy.
4. Keep human review visible for sensitive or uncertain outputs.
5. Use sample/synthetic data for the prototype.
6. Do not pretend mock integrations are real integrations.
7. Generate operational outputs, not just chat answers.
8. Design for future integration without overbuilding the integration now.
9. Treat Monday.com exports as source context for planning, not permission to store or expose real confidential event data.

## Success measures

Early success measures for the prototype:

- fewer clarification loops,
- more complete initial event requests,
- clearer stakeholder routing,
- faster identification of escalation triggers,
- better organiser confidence,
- more consistent event packages,
- easier handoff to Jo/internal teams,
- credible demonstration of future Monday.com or workflow integration.

## Open decisions

- Final v0 `EventRequest` schema.
- Which Monday lifecycle/status fields belong in v0.
- Which Monday fields stay as future integration mapping only.
- Which fields are mandatory for Saturday.
- Which product routes are public vs protected.
- Whether event data is persisted in PostgreSQL for the demo or held in request/response only.
- Which generated outputs are demo-critical.
- How much AI extraction is safe and necessary before Saturday.
