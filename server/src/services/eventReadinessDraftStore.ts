import { prisma } from "../db/prisma.js";
import type { EventReadinessDraftSaveRequest } from "../schemas/eventReadiness.js";

const DEFAULT_DRAFT_KEY = "current";
const DRAFT_KEY_PATTERN = /^[a-zA-Z0-9._:-]+$/;

let ensured = false;

async function ensureTable() {
  if (ensured) return;
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "EventReadinessDraft" (
      "id" TEXT PRIMARY KEY DEFAULT concat('erd_', md5(random()::text || clock_timestamp()::text)),
      "ownerSubject" TEXT NOT NULL,
      "draftKey" TEXT NOT NULL DEFAULT 'current',
      "eventRequest" JSONB,
      "emailEdits" JSONB NOT NULL DEFAULT '{}'::jsonb,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT "EventReadinessDraft_ownerSubject_draftKey_key" UNIQUE ("ownerSubject", "draftKey")
    )
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS "EventReadinessDraft_ownerSubject_idx" ON "EventReadinessDraft" ("ownerSubject")
  `;
  ensured = true;
}

type DraftRow = {
  eventRequest: unknown | null;
  emailEdits: unknown;
  createdAt: Date;
  updatedAt: Date;
};

function normaliseDraftKey(draftKey: unknown) {
  const value = String(draftKey ?? DEFAULT_DRAFT_KEY).trim();
  if (!value || !DRAFT_KEY_PATTERN.test(value)) return DEFAULT_DRAFT_KEY;
  return value.slice(0, 120);
}

export async function loadEventReadinessDraft(ownerSubject: string, draftKey?: string) {
  await ensureTable();
  const key = normaliseDraftKey(draftKey);
  const rows = await prisma.$queryRaw<DraftRow[]>`
    SELECT "eventRequest", "emailEdits", "createdAt", "updatedAt"
    FROM "EventReadinessDraft"
    WHERE "ownerSubject" = ${ownerSubject} AND "draftKey" = ${key}
    LIMIT 1
  `;
  const row = rows[0];
  if (!row) {
    return {
      draft_key: key,
      event_request: null,
      email_edits: {},
      created_at: null,
      updated_at: null
    };
  }
  return {
    draft_key: key,
    event_request: row.eventRequest,
    email_edits: row.emailEdits ?? {},
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString()
  };
}

export async function saveEventReadinessDraft(ownerSubject: string, input: EventReadinessDraftSaveRequest) {
  await ensureTable();
  const id = `erd_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  const key = normaliseDraftKey(input.draft_key);
  const eventRequestJson = input.event_request ? JSON.stringify(input.event_request) : null;
  const emailEditsJson = JSON.stringify(input.email_edits ?? {});
  await prisma.$executeRaw`
    INSERT INTO "EventReadinessDraft" ("id", "ownerSubject", "draftKey", "eventRequest", "emailEdits", "updatedAt")
    VALUES (${id}, ${ownerSubject}, ${key}, ${eventRequestJson}::jsonb, ${emailEditsJson}::jsonb, now())
    ON CONFLICT ("ownerSubject", "draftKey")
    DO UPDATE SET
      "eventRequest" = COALESCE(EXCLUDED."eventRequest", "EventReadinessDraft"."eventRequest"),
      "emailEdits" = EXCLUDED."emailEdits",
      "updatedAt" = now()
  `;
  return loadEventReadinessDraft(ownerSubject, key);
}
