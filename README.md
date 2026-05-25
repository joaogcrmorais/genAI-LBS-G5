# LBS Generative AI Elective Prototype

This repository is a secure full-stack starter for the London Business School Generative AI Elective group project.

## Local Run

Use one command from the repository root:

```powershell
npm run dev
```

Open:

```text
http://localhost:3000/
```

The backend runs on `http://localhost:3001`.

## Current Setup

- Frontend: React, Vite, TypeScript, Tailwind CSS, React Router, Auth0 React SDK.
- Backend: Node.js, Express, TypeScript, Auth0 JWT validation, Zod, OpenAI SDK boundary.
- Database: PostgreSQL with Prisma.
- Assets: the supplied LBS logo is stored in `assets/lbs-logo/` and copied into `client/src/assets/` for the UI.
- Branding: the supplied LBS brand guidelines PDF is stored in `assets/lbs-branding/`.

Codex installed Node.js LTS and PostgreSQL 18 with permission. Dependencies have been installed in `node_modules/`, Prisma Client generation succeeds, and the initial PostgreSQL migration has been applied.

## Environment Variables

The app reads the real local `.env` file in the repository root. Do not commit it.

Required variable names:

```text
VITE_AUTH0_DOMAIN
VITE_AUTH0_CLIENT_ID
VITE_AUTH0_AUDIENCE
VITE_API_BASE_URL
VITE_APP_ORIGIN
AUTH0_DOMAIN
AUTH0_AUDIENCE
AUTH0_ISSUER_BASE_URL
CLIENT_ORIGIN
PORT
DATABASE_URL
OPENAI_API_KEY
AUTH0_PERMISSION_NORMAL
AUTH0_PERMISSION_ADMIN
```

Do not put `OPENAI_API_KEY` or any server-only secret in frontend code.

## Auth0

Frontend login uses Auth0 Universal Login. The frontend requests an access token for the configured API audience and sends it to protected backend routes.

Permission levels:

- Public: routes that do not require login, such as `/` and `/health`.
- Normal user: backend routes requiring `user_normal` or `user_admin`.
- Admin: backend routes requiring `user_admin`.

The backend validates Auth0 JWTs with issuer, audience, and JWKS. The backend is the authority for permission checks.

## PostgreSQL And Prisma

Prisma schema lives at `prisma/schema.prisma`.

The initial schema contains:

- `UserProfile`, keyed by Auth0 subject.
- `AppEventLog`, for safe non-sensitive application events.

`DATABASE_URL` is configured in the local `.env` file. `npm run dev` verifies the database, runs Prisma migration setup, then starts the frontend and backend.

Useful commands:

```powershell
npm run prisma:generate
npm run prisma:migrate
```

## Linting And Tests

When dependencies are installed:

```powershell
npm run lint
npm run typecheck
npm run test
```

## Known Setup Blockers

- The current terminal still sees a stale WindowsApps `node` path unless `C:\Program Files\nodejs` is placed first for the process. A fresh terminal should normally pick up the installed Node path.
- The Codex sandbox cannot read `C:\Users\joaog`, so Vite needed to be launched outside the sandbox for local browser testing. Normal user terminals should not have this sandbox restriction.
- Auth0 login redirects, but Auth0 returns that the configured client is not authorised to access the configured API audience. This must be corrected in the Auth0 dashboard before protected routes can be fully tested.
