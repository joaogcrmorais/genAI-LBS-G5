# Workstream 4 Workplan

## Technical direction

- `POST /api/tiering/classify` uses OpenAI because tiering is contextual and sponsor knowledge is partly tacit.
- `POST /api/routing/stakeholder-packets` uses deterministic logic because it feeds Workstream 3 email and summary generation.
- `POST /api/integrations/monday/build-payload` is deterministic because it transforms already-structured data.
- Baseline tiering rules guide the LLM but do not fully determine the answer.
- Stakeholder packet rules should be implemented as backend service logic.
- The backend should validate request and response shapes with Zod.
- The OpenAI API key remains server-only.
- API routes should remain thin wrappers over services.

## Suggested implementation components

- Classification schema and service.
- Tiering prompt builder.
- Tiering validator prompt builder.
- Stakeholder packet schema and service.
- Monday payload schema and service.
- Sample event fixtures.
- API tests and service unit tests.

## Current active work

The current pre-Wednesday task is the shared `EventRequest` contract.

Canonical draft:

- `docs/project-context/event-request-contract.md`

Active branch:

- `feature/ws4-event-request-contract`

For now, `EventRequest` should be treated as the shared intake facts object. Tiering, stakeholder packets, generated outputs, and mock integration payloads should be separate service responses that reference the event request rather than fields that must already exist inside it.

## Immediate next steps before Wednesday schema lock

1. Lock Workstream 4 endpoint names:
   - `POST /api/tiering/classify`
   - `POST /api/routing/stakeholder-packets`
   - `POST /api/integrations/monday/build-payload`

2. Agree the high-level `classify` response modes:
   - `classified`
   - `needs_more_information`

3. Agree the minimum `EventRequest` fields Workstream 4 needs:
   - event name / description,
   - date or timing,
   - expected attendees,
   - audience type,
   - speaker / VIP / external guest details,
   - catering / alcohol,
   - AV / recording / streaming,
   - space status,
   - sponsor / media / public visibility,
   - sensitive topic indicator if known.

   Draft location: `docs/project-context/event-request-contract.md`.

4. Draft baseline tiering guidance for the LLM:
   - Tier 1: simple internal / low coordination.
   - Tier 2: moderate external, catering, AV, sponsor, or multi-stakeholder complexity.
   - Tier 3: VIP, media, political, reputational, security, public leader, or major logistics complexity.

5. Draft deterministic stakeholder packet rules for:
   - Space Management,
   - Catering / Lexington,
   - AV / Technology,
   - Security,
   - Editorial Planning,
   - Duty Managers / Campus Services,
   - SA Operations / Finance / Sponsorship where relevant.

6. Confirm Workstream 3 handoff:
   - Workstream 4 provides stakeholder packets.
   - Workstream 3 generates emails, summaries, and output copy.
   - Workstream 3 should not wait for manual Workstream 4 approval.

7. Keep this PRD and workplan current as schema decisions are made.

8. Open a pull request for `feature/ws4-event-request-contract` once the team is ready to review the contract.

## Post-Wednesday implementation work

1. Implement shared schemas/types after `EventRequest` is locked.
2. Implement OpenAI-backed `classify` service.
3. Implement tiering validation pass.
4. Implement deterministic `stakeholder-packets` service.
5. Implement deterministic mock Monday payload service.
6. Add API routes.
7. Add sample event fixtures.
8. Add tests.
9. Update frontend/API client once contracts stabilize.
10. Update `project.md` after meaningful implementation changes.

## Dependency and blocker map

- Final `EventRequest` schema blocks final Workstream 4 implementation.
- `EventRequest` ownership blocks coordination between Workstream 1 and Workstream 4; current proposal is that Workstream 1 owns the intake facts object and Workstream 4 owns derived classification/packet outputs.
- The `feature/ws4-event-request-contract` branch blocks downstream Workstream 4 implementation branches until its contract decisions are reviewed or merged.
- Workstream 4 endpoint names block frontend/API client work.
- `classify` response shape blocks frontend tiering display.
- `stakeholder-packets` response shape blocks Workstream 3 email and summary generation.
- Stakeholder list blocks deterministic packet rules.
- Tier labels block final user-facing tier display.
- Monday payload shape blocks integration demo UI.
- OpenAI key availability blocks live classification testing, but not schema, route, or deterministic packet implementation.
- Auth0 blocker does not block service implementation, but may block authenticated browser testing.
- Persistence decisions do not block Workstream 4 MVP if endpoints remain request/response only.

## Testing requirements

- Valid classification response.
- Missing-information classification response.
- Validator revision path.
- Invalid AI JSON handling.
- Deterministic stakeholder packet output.
- Monday mock payload output.
- Invalid request validation.

## Documentation watchlist

Older context docs should not contradict these decisions. In particular, references to `/api/routing/build` should become `/api/routing/stakeholder-packets`, and older guidance saying not to rely on OpenAI for tiering should be replaced with the current split:

- OpenAI for tiering classification.
- Deterministic service logic for stakeholder packets.
- Deterministic mock generation for Monday.com payloads.
