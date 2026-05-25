# GitHub Setup and Coordination Guide

This document explains how to set up GitHub for the Event Readiness Assistant project and coordinate parallel work across the team.

## 1. Repository structure

Use a single repository. A monorepo is preferable because the team needs shared types, prompts, and workflow logic.

Recommended structure:

```txt
event-readiness-assistant/
  apps/
    web/
      app/
      components/
      lib/
      public/
  packages/
    shared-types/
      src/
        event-request.ts
        routing.ts
        outputs.ts
        feedback.ts
        integrations.ts
    prompts/
      intake-extraction.md
      tiering.md
      output-generation.md
      post-event-feedback.md
    workflows/
      src/
        completeness.ts
        tiering.ts
        routing.ts
        timeline.ts
        monday-payload.ts
  docs/
    mini-prds/
    architecture/
    decisions/
    demo-scripts/
  data/
    sample-events/
    stakeholder-matrix/
    toolkit-snippets/
  README.md
```

## 2. Branching model

Use short-lived feature branches.

Branch naming:

```txt
main
feature/ws1-intake
feature/ws2-post-event
feature/ws3-outputs-knowledge
feature/ws4-routing-integrations
feature/ws5-platform-schema
fix/<short-description>
docs/<short-description>
```

Rules:

- No one commits directly to `main` after initial setup.
- Every change goes through a pull request.
- Pull requests should be small enough to review quickly.
- Merge at least once per day to avoid integration drift.
- Pull latest `main` before creating a branch and before opening a pull request.
- Schema/API contract changes should merge before dependent workstream implementation branches.

Current active contract branch:

```txt
feature/ws4-event-request-contract
```

Local note: if creating a slash-style branch fails with a `.git/refs` permission error, it is a filesystem permission issue rather than a Git branch naming issue. Retry the normal branch name after resolving permissions.

## 3. Required GitHub settings

Enable:

- Branch protection on `main`.
- Pull request required before merge.
- At least one approval if possible.
- Require status checks once tests/linting exist.
- Delete branch after merge.

For a fast student project, avoid overcomplicating permissions.

## 4. Issues and project board

Create GitHub Issues for every build task.

Labels:

```txt
ws1-intake
ws2-post-event
ws3-outputs
ws4-routing-integrations
ws5-platform
schema
frontend
backend
ai
bug
blocked
docs
demo-critical
```

Suggested GitHub Project columns:

```txt
Backlog
Ready
In Progress
Needs Review
Blocked
Done
Demo Ready
```

Every issue should include:

- Goal.
- Owner.
- Inputs.
- Outputs.
- Definition of done.
- Dependencies.

## 5. Pull request template

Create `.github/pull_request_template.md`:

```md
## Summary
What does this PR change?

## Workstream
- [ ] WS1 Intake
- [ ] WS2 Post-event
- [ ] WS3 Outputs/Knowledge
- [ ] WS4 Routing/Integrations
- [ ] WS5 Platform

## Inputs/outputs affected
What shared schemas, API endpoints, or generated outputs are affected?

## Screenshots or sample JSON
Add screenshots or example payloads if relevant.

## Tests/checks
- [ ] App runs locally
- [ ] TypeScript passes
- [ ] No unrelated changes
- [ ] Uses shared schema

## Risks or follow-ups
What could break? What still needs to be done?
```

## 6. Shared schema governance

The shared schema is the most important coordination mechanism.

Rules:

1. All workstreams import types from `packages/shared-types`.
2. No workstream should invent its own event object.
3. Schema changes require a PR and team review.
4. Schema changes should include sample JSON updates.
5. Backward compatibility matters after Wednesday.

Recommended files:

```txt
packages/shared-types/src/event-request.ts
packages/shared-types/src/routing.ts
packages/shared-types/src/outputs.ts
packages/shared-types/src/feedback.ts
packages/shared-types/src/integrations.ts
```

## 7. API contract governance

Recommended API endpoints:

```txt
POST /api/intake/extract
POST /api/intake/missing-fields
POST /api/tiering/classify
POST /api/routing/stakeholder-packets
POST /api/outputs/generate
POST /api/integrations/monday/build-payload
POST /api/post-event/feedback
GET  /api/events/:id
PUT  /api/events/:id
```

For Saturday, these can be implemented as mock functions or Next.js routes.

## 8. Environment variables

Use the real local `.env` file only. Do not commit it, print it, screenshot it, or create sample/template environment files such as `.env.example`.

Server-only secrets such as `OPENAI_API_KEY` must stay backend-only. Browser-safe values use the existing `VITE_` variables described in `README.md` and `project.md`.

## 9. Local development workflow

Recommended commands once the app exists:

```bash
npm install
npm run dev
npm run lint
npm run typecheck
npm run build
```

If using pnpm:

```bash
pnpm install
pnpm dev
pnpm lint
pnpm typecheck
pnpm build
```

Pick npm or pnpm early and standardize.

## 10. Daily coordination rhythm

Use a short daily standup:

1. What did I finish?
2. What am I building today?
3. What schema/API change do I need?
4. Am I blocked?
5. What needs to be demo-ready?

The project owner should maintain:

- GitHub issues.
- PR review flow.
- shared schema decisions.
- demo script.
- integration checklist.

## 11. Wednesday freeze

By Wednesday, freeze:

- `EventRequest` schema.
- required MVP outputs.
- API contract names.
- Saturday demo flow.
- ownership of each route/module.

After Wednesday, avoid schema churn unless absolutely necessary.

## 12. Saturday demo branch

Create a branch:

```txt
demo/saturday-prototype
```

Use it only if `main` becomes unstable. Ideally, keep `main` deployable at all times.

## 13. Definition of done for workstreams

A workstream task is done when:

- It runs locally.
- It uses shared types.
- It has sample input and output.
- It is connected to at least one other workstream.
- It has a fallback if AI/API fails.
- It is documented enough for another teammate to use.

## 14. Demo-first development rule

Every stream should have a visible or inspectable demo artifact:

- WS1: intake screen and `EventRequest` JSON.
- WS2: post-event feedback and handover JSON.
- WS3: generated event package.
- WS4: routing result and Monday.com-ready payload.
- WS5: deployed app, shared schema, API routes.

No hidden-only work for the Saturday prototype.
