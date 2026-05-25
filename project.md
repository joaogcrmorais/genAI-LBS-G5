# Project Handover

## Purpose

This repository is the London Business School Generative AI Elective group prototype. It is set up as a secure, maintainable full-stack starter that non-technical group members can continue shaping with Codex.

## Current Architecture

- `client/`: React single-page app built with Vite, TypeScript, Tailwind CSS, React Router, and the Auth0 React SDK.
- `server/`: Node.js Express API built with TypeScript.
- `prisma/`: Prisma schema for PostgreSQL.
- `assets/`: original supplied LBS assets.
- `docs/`: human-readable setup documentation.
- Root `package.json`: workspace scripts, including `npm run dev`.

## Repository Structure

```text
client/
server/
docs/
assets/lbs-logo/
assets/lbs-branding/
prisma/
scripts/
.env
.gitignore
README.md
project.md
AGENTS.md
package.json
```

The original `LBS Logo.jpg` was moved to `assets/lbs-logo/LBS Logo.jpg`. A copy is used by the frontend at `client/src/assets/lbs-logo.jpg`. The original `LBS Brand Guidelines.pdf` was moved to `assets/lbs-branding/LBS Brand Guidelines.pdf`.

## Frontend

The frontend runs at `http://localhost:3000/` and uses strict Vite port configuration so it does not silently switch ports away from the Auth0 local callback URL.

Key files:

- `client/src/main.tsx`
- `client/src/App.tsx`
- `client/src/auth/AuthProvider.tsx`
- `client/src/auth/ProtectedRoute.tsx`
- `client/src/components/AppShell.tsx`
- `client/src/pages/*`
- `client/vite.config.cjs`

Current routes:

- `/`: public landing/status page.
- `/health`: public backend health check page.
- `/dashboard`: Auth0 login plus `user_normal` or `user_admin` permission.
- `/admin`: Auth0 login plus `user_admin` permission.

The final private-only versus public-facing route policy is not decided yet. The current code supports both patterns.

Local note: the Codex sandbox cannot read `C:\Users\joaog`, which Vite's dependency scanner tries to inspect. Running the dev server outside the sandbox works; normal user terminals should not have this sandbox restriction.

## Backend

The backend runs at `http://localhost:3001` and exposes routes under `/api`.

Key files:

- `server/src/server.ts`
- `server/src/config/env.ts`
- `server/src/auth/auth0.ts`
- `server/src/routes/api.ts`
- `server/src/services/openai.ts`

Routes:

- `GET /api/health`: public health response.
- `GET /api/me`: authenticated Auth0 token claims summary.
- `GET /api/normal/check`: requires `user_normal` or `user_admin`.
- `GET /api/admin/check`: requires `user_admin`.
- `GET /api/ai/status`: protected status showing whether backend OpenAI configuration exists.

The backend validates Auth0 JWTs using issuer, audience, and JWKS. It does not trust client-supplied users, roles, emails, or permissions.

## Database And Prisma

Database choice: PostgreSQL.

Prisma schema: `prisma/schema.prisma`.

Initial models:

- `UserProfile`: keyed by Auth0 subject, with optional display name and email for future use.
- `AppEventLog`: safe event log for non-sensitive events.

Migration status: completed. Prisma migration `20260525142609_init` has been applied to the local PostgreSQL database.

`DATABASE_URL` is configured in `.env` and was verified locally without printing its value. PostgreSQL 18 is installed and the `postgresql-x64-18` service is running. The local database is `genai_lbs_g5`.

## Auth0

Auth0 values are read from environment variables. Browser-safe values use `VITE_` names. Server-only values stay without the `VITE_` prefix.

Permission model:

- Public: no token required.
- Normal user: `user_normal` or `user_admin` permission in the verified access token.
- Admin: `user_admin` permission in the verified access token.

The requested non-secret permission variables were added to `.env`:

- `AUTH0_PERMISSION_NORMAL`
- `AUTH0_PERMISSION_ADMIN`

Browser login test status: unauthenticated protected routes attempt Auth0 login, but Auth0 currently returns an error that client `VITE_AUTH0_CLIENT_ID` is not authorised to access the configured API audience. The exact audience value is read from `.env` and was not printed. This is being treated as an Auth0 integration blocker to raise with the professor; it does not block work on public UI, backend structure, database schema, Prisma, OpenAI backend wiring, or non-auth application logic.

## OpenAI

OpenAI SDK configuration exists only in the backend. The frontend never reads `OPENAI_API_KEY`. No paid OpenAI API calls have been added or run.

## LBS Branding

The supplied LBS logo file is used directly in the React UI. The UI uses a restrained LBS-style blue and red palette and keeps the original logo asset intact.

Brand guidelines are stored in `assets/lbs-branding/` for reference.

## Security, Privacy, AI, And Copyright Safeguards

- `.env` and `.env.*` are ignored by Git.
- No sample/template environment file exists.
- No local backdoor users, mock login routes, demo passwords, or authentication bypasses were created.
- Auth0 permissions are the source of truth for access control.
- Backend error responses avoid stack traces and secret values.
- OpenAI calls are backend-only.
- The database schema avoids storing tokens, API keys, or unnecessary personal data.
- The original LBS logo and brand file are preserved.

## Azure Readiness

The app is structured for later Azure deployment:

- React can be hosted on Azure Static Web Apps, or built and served by the Node service.
- Express can run on Azure App Service.
- PostgreSQL can move to Azure Database for PostgreSQL.
- Auth0, OpenAI, database, and port/origin settings are environment-variable driven.

No Azure deployment has been attempted.

## Local Run

Command:

```powershell
npm run dev
```

Browser URL:

```text
http://localhost:3000/
```

## Test Status

Latest checks:

- `npm install`: completed.
- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run test`: passed; backend health test passes, client has no tests yet.
- `npm run prisma:generate`: passed.
- `npm run prisma:migrate`: passed and applied the initial migration.
- `npm run dev`: passed when launched outside the sandbox; frontend listened on port 3000 and backend listened on port 3001.
- `GET /api/health`: passed.
- Browser test of `http://localhost:3000/`: passed.
- Browser test of `/health`: passed and showed backend status.
- Browser test of `/dashboard`: reached Auth0 flow but returned an Auth0 audience authorization error.

Remaining blockers:

- The current terminal still resolves `node` by name to a stale WindowsApps Codex path unless `C:\Program Files\nodejs` is prepended for the process. A fresh terminal should normally resolve the installed Node.js.
- Auth0 must authorize the configured SPA client for the configured API audience before protected route login and permission checks can be fully tested. This has been escalated as an integration blocker.

## Next Steps

1. Decide whether the app is private-only or has public-facing pages.
2. Fix the Auth0 client/API audience authorization in the Auth0 dashboard.
3. Test Auth0 login and permission claims with real course users.
4. Define the actual prototype use case and expand the schema/routes accordingly.
