# Codex Project Instructions

Use these instructions for future work in this repository.

## Core Rules

- Work inside this repository unless the user explicitly approves otherwise.
- Keep secrets out of Git.
- Never print `.env` values in chat, logs, docs, screenshots, or generated files.
- Do not create sample/template environment files.
- Do not commit `.env` or secret-bearing files.
- Update `project.md` after meaningful changes.
- Run lint, type checks, and tests after meaningful code changes when tooling is available.
- Before making a commit intended for a PR/merge, advising the user to merge a branch, or creating a merge-ready PR, verify branch completeness with `git status --short --branch`, `git log --oneline origin/main..HEAD`, and `git diff --stat origin/main..HEAD`; explicitly confirm the expected commits and files are present.
- After a branch is merged, verify the actual merged `main` by fetching/pulling `origin/main`, checking for the expected routes/files, and running available checks before treating the branch as safe to delete.

## Authentication And Access

- Use Auth0 only for authentication.
- Do not create username/password login pages.
- Do not create local backdoor users, mock login routes, demo passwords, hidden bypasses, or development-only auth bypasses.
- Use verified Auth0 access-token permissions as the source of truth.
- Normal access requires `user_normal` or `user_admin`.
- Admin access requires `user_admin`.
- Backend checks are authoritative; frontend checks are only for user experience.
- Preserve support for public, authenticated, normal-user, and admin-only route patterns until the product route policy is decided in `project.md`.

## Backend And AI

- Keep OpenAI API calls in the backend only.
- Never expose `OPENAI_API_KEY` or other server-only secrets to browser code.
- Validate inputs with structured validators such as Zod.
- Return clear errors without leaking stack traces, tokens, or secrets.

## Data

- Use PostgreSQL with Prisma.
- Do not store raw access tokens, API keys, or unnecessary personal data.
- Keep migrations and schema changes intentional and documented in `project.md`.

## Branding

- Use the real supplied LBS logo file.
- Do not recreate the LBS logo with text, CSS, SVG approximations, or generated artwork.
- Follow the supplied LBS branding guidance in `assets/lbs-branding/`.

## Local Development

- Root command: `npm run dev`.
- Frontend URL: `http://localhost:3000/`.
- Backend URL: `http://localhost:3001`.
- Do not silently change the frontend port because Auth0 is configured for `http://localhost:3000/`.

## Safeguards

- Preserve privacy, information-security, AI-use, copyright, and brand safeguards.
- Ask before installing software, changing system settings, editing PATH, changing PostgreSQL services/users, or installing global npm packages.
