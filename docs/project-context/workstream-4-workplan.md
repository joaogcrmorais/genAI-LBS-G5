# Workstream 4 Workplan

## Technical direction

- `POST /api/tiering/classify` uses OpenAI because tiering is contextual and sponsor knowledge is partly tacit.
- `POST /api/routing/stakeholder-packets` uses deterministic logic because it feeds Workstream 3 email and summary generation.
- `POST /api/integrations/monday/build-payload` is deterministic because it transforms already-structured data.
- The Monday payload is still mock-only, but it should now map toward Jo's real `Events and Key Dates 25/26` board rather than a generic invented board.
- Jo's caveat means Monday should be treated as an optional staff-side visibility/export target, not as the canonical workflow engine for the product.
- The payload should account for lifecycle status, event category/group, Monday-like column categories, stakeholder tags, review dates, links, and possible subitems, while making clear these are candidate tracking fields.
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

Implemented Monday update:

- Existing endpoint paths remain unchanged.
- `EventRequest` accepts lifecycle/status hints and permissive Monday-derived planning/governance metadata.
- Deterministic stakeholder packets now include operational stakeholders plus Monday-derived editorial/governance stakeholders.
- The Monday mock payload now targets `Events and Key Dates 25/26` with board ID hint `2008539622`, lifecycle status, Monday-like columns, review gates, links, stakeholder tags, and subitems. It should be described as a possible handoff payload rather than as a representation of how most events are currently managed.

## Current active work

The current pre-Wednesday task is updating the shared planning context with the Monday.com LLM exports and revisiting the shared `EventRequest` contract.

Canonical draft:

- `docs/project-context/event-request-contract.md`
- `docs/project-context/monday-workflow-takeaways.md`

Active branch:

- `docs/add-monday-llm-outputs`

For now, `EventRequest` should be treated as the shared intake facts object. Tiering, stakeholder packets, generated outputs, and mock integration payloads should be separate service responses that reference the event request rather than fields that must already exist inside it. If persistence is introduced, the product's own event record should be canonical; Monday metadata should sit on an integration/export boundary.

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
   - Monday-derived lifecycle/status hints where useful,
   - organising department or club,
   - business case markers,
   - review/briefing links where available,
   - editorial, security, Dean, Advancement, and promotion markers where known.

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
   - Events Oversight Group,
   - Dean's Office,
   - Editorial Group,
   - Event Promo Group,
   - PR Managers,
   - Advancement,
   - CC Network,
   - Social Media,
   - Photography,
   - faculty or faculty-hours tracking where relevant.

6. Confirm Workstream 3 handoff:
   - Workstream 4 provides stakeholder packets.
   - Workstream 3 generates emails, summaries, and output copy.
   - Workstream 3 should not wait for manual Workstream 4 approval.

7. Keep this PRD and workplan current as schema decisions are made.

8. Treat the updated Monday lifecycle response as low-reliability process evidence unless Jo or another human source validates a specific field, gate, or workflow.

9. Open a pull request once the team is ready to review the updated contract and Monday planning guidance.

## Post-Wednesday implementation work

1. Review the Monday lifecycle endpoint update against Jo's caveat and any validated human process notes, not just the full LLM response.
2. Decide whether the permissive `planning_and_governance` object should become a stricter schema or remain a flexible staff-side metadata area.
3. Decide whether frontend intake should expose lifecycle/status and governance fields directly, infer them from organiser answers, or keep them as backend/demo JSON.
4. Add richer sample event fixtures once specific fields or workflows are validated by Jo or another human source.
5. Update generated-output planning so WS3 consumes the expanded stakeholder packet set.
6. Update frontend/API client once contracts stabilize.
7. Update `project.md` after meaningful implementation changes.

## Dependency and blocker map

- Final `EventRequest` schema blocks final Workstream 4 implementation.
- `EventRequest` ownership blocks coordination between Workstream 1 and Workstream 4; current proposal is that Workstream 1 owns the intake facts object and Workstream 4 owns derived classification/packet outputs.
- The Monday/source-context planning branch blocks downstream Workstream 4 implementation changes until its contract decisions are reviewed or merged.
- Workstream 4 endpoint names are locked for now.
- `classify` response shape blocks frontend tiering display.
- `stakeholder-packets` response shape blocks Workstream 3 email and summary generation.
- Stakeholder list has been expanded for Monday-derived routing, but it should be reviewed against human-validated process notes rather than the LLM export alone.
- Tier labels block final user-facing tier display.
- Monday payload shape now maps toward Jo's real `Events and Key Dates 25/26` board, but field-level mapping should remain provisional because the LLM lifecycle response is not a reliable description of actual practice.
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

Also update older generic Monday payload examples so they do not imply a fake board called "LBS Event Oversight" when the planning context now knows the target board is `Events and Key Dates 25/26`.
