import dotenv from "dotenv";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { z } from "zod";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootEnvPath = path.resolve(__dirname, "../../../.env");
dotenv.config({ path: rootEnvPath });

const optionalNonEmptyString = z.preprocess((value) => (value === "" ? undefined : value), z.string().min(1).optional());

const EnvSchema = z.object({
  AUTH0_DOMAIN: z.string().min(1),
  AUTH0_AUDIENCE: z.string().min(1),
  AUTH0_ISSUER_BASE_URL: z.string().url(),
  CLIENT_ORIGIN: z.string().url().default("http://localhost:3000"),
  PORT: z.coerce.number().int().positive().default(3001),
  DATABASE_URL: optionalNonEmptyString,
  OPENAI_API_KEY: optionalNonEmptyString,
  AUTH0_PERMISSION_NORMAL: z.string().min(1).default("user_normal"),
  AUTH0_PERMISSION_ADMIN: z.string().min(1).default("user_admin")
});

const parsed = EnvSchema.safeParse(process.env);

if (!parsed.success) {
  const missing = parsed.error.issues.map((issue) => issue.path.join(".")).join(", ");
  throw new Error(`Server environment is incomplete. Check variable names in .env: ${missing}`);
}

export const config = {
  auth0Domain: parsed.data.AUTH0_DOMAIN,
  auth0Audience: parsed.data.AUTH0_AUDIENCE,
  auth0IssuerBaseUrl: parsed.data.AUTH0_ISSUER_BASE_URL.endsWith("/")
    ? parsed.data.AUTH0_ISSUER_BASE_URL
    : `${parsed.data.AUTH0_ISSUER_BASE_URL}/`,
  clientOrigin: parsed.data.CLIENT_ORIGIN,
  port: parsed.data.PORT,
  databaseUrl: parsed.data.DATABASE_URL,
  openAiApiKey: parsed.data.OPENAI_API_KEY,
  permissions: {
    normal: parsed.data.AUTH0_PERMISSION_NORMAL,
    admin: parsed.data.AUTH0_PERMISSION_ADMIN
  }
};
