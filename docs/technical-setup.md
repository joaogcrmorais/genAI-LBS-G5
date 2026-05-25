# Technical Setup

## Architecture

This project is a full-stack web app starter for a London Business School generative AI course prototype.

- Frontend: React SPA with Vite, TypeScript, Tailwind CSS, React Router, and Auth0 React SDK.
- Backend: Node.js Express API with TypeScript.
- Database: PostgreSQL managed through Prisma.
- Authentication: Auth0 Universal Login and backend JWT validation.
- AI: OpenAI SDK configured only in the backend.

## Why These Tools

React and Vite provide a familiar, fast frontend setup. TypeScript keeps the code safer as the project grows through iterative Codex conversations. Tailwind gives a small, consistent styling system without requiring students to manage a large design framework.

Express is simple and widely understood for Node APIs. Prisma gives clear database models and migrations for PostgreSQL. Auth0 keeps identity and access control out of local code and avoids unsafe username/password handling.

## Local Ports

- Frontend: `http://localhost:3000/`
- Backend: `http://localhost:3001`

The frontend uses Vite `strictPort` so it does not silently change away from Auth0's configured local callback URL.

## How `npm run dev` Works

The root `npm run dev` command runs `scripts/dev.mjs`.

That script:

1. Confirms port `3000` is free.
2. Confirms port `3001` is free.
3. Checks that npm is available.
4. Checks that PostgreSQL `psql` is available.
5. Attempts to verify `DATABASE_URL` if it exists.
6. Runs Prisma migration setup.
7. Starts the backend.
8. Starts the frontend.
9. Prints `http://localhost:3000/` as the browser URL.

If PostgreSQL requires a password or service approval, handle that outside the app setup and rerun `npm run dev`.

## Required Local Tooling

Required:

- Git
- Node.js 20 or newer
- npm
- PostgreSQL with `psql`

Current checked status:

- Git is available.
- Node.js LTS 24.16.0 was installed with permission.
- npm 11.13.0 was installed with Node.js.
- PostgreSQL 18.4 was installed with permission.
- The PostgreSQL service `postgresql-x64-18` is running.
- This existing terminal may still need `C:\Program Files\nodejs` and `C:\Program Files\PostgreSQL\18\bin` prepended for process-local command checks until a fresh shell is opened.

Installed with permission:

```powershell
winget install OpenJS.NodeJS.LTS --accept-package-agreements --accept-source-agreements
winget install PostgreSQL.PostgreSQL.18 --accept-package-agreements --accept-source-agreements
```

## Environment Variable Names

The app reads `.env` from the repository root. Variable names only:

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

Server-only variables must not use `VITE_`. Browser-safe variables must use `VITE_`.

## Auth0

The React app uses Auth0 Universal Login. The frontend asks Auth0 for an access token for the configured API audience, then sends the token to protected backend routes.

The backend validates:

- issuer
- audience
- JWT signature through Auth0 JWKS

Permissions are read from the verified token's `permissions` claim.

Access levels:

- Public: no token.
- Normal: `user_normal` or `user_admin`.
- Admin: `user_admin`.

## Prisma Migrations

Schema file:

```text
prisma/schema.prisma
```

Generate Prisma client:

```powershell
npm run prisma:generate
```

Run migration:

```powershell
npm run prisma:migrate
```

The initial schema creates `UserProfile` and `AppEventLog`.

Prisma Client generation has passed. The initial migration has been applied to the local PostgreSQL database.

## Current Local Test Status

- `npm run typecheck`: passed.
- `npm run lint`: passed.
- `npm run test`: passed.
- `npm run prisma:migrate`: passed.
- Backend health endpoint: passed.
- Frontend home page: passed in the browser.
- Frontend health page: passed in the browser.
- Auth0 protected route: redirects into Auth0, but Auth0 currently reports that the configured client is not authorised for the configured API audience.

## Azure Deployment Notes

Recommended later deployment options:

- Host the React app on Azure Static Web Apps, or build it and serve it from the Node backend.
- Host the Express API on Azure App Service.
- Use Azure Database for PostgreSQL for the production database.
- Configure all Auth0, OpenAI, database, CORS, and origin values through Azure environment settings.

No Azure deployment has been performed.
