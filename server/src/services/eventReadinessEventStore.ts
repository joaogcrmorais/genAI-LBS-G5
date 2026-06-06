import { prisma } from "../db/prisma.js";
import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import { buildPostPhase1Coverage, fieldText } from "./postPhase1DataService.js";
import { assessPostPhase1KeyEvent } from "./postPhase1KeyEventService.js";
import { runPostPhase1Flow } from "./postPhase1OrchestrationService.js";

let ensured = false;

async function ensureTable() {
  if (ensured) return;
  await prisma.$executeRaw`
    CREATE TABLE IF NOT EXISTS "EventReadinessEvent" (
      "id" TEXT PRIMARY KEY DEFAULT concat('ere_', md5(random()::text || clock_timestamp()::text)),
      "ownerSubject" TEXT NOT NULL,
      "draftKey" TEXT NOT NULL,
      "eventRequest" JSONB,
      "emailEdits" JSONB NOT NULL DEFAULT '{}'::jsonb,
      "mondayMock" JSONB,
      "createdAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      "updatedAt" TIMESTAMPTZ NOT NULL DEFAULT now(),
      CONSTRAINT "EventReadinessEvent_ownerSubject_draftKey_key" UNIQUE ("ownerSubject", "draftKey")
    )
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS "EventReadinessEvent_ownerSubject_idx" ON "EventReadinessEvent" ("ownerSubject")
  `;
  await prisma.$executeRaw`
    CREATE INDEX IF NOT EXISTS "EventReadinessEvent_createdAt_idx" ON "EventReadinessEvent" ("createdAt")
  `;
  ensured = true;
}

type EventRow = {
  id: string;
  ownerSubject: string;
  draftKey: string;
  eventRequest: unknown | null;
  emailEdits: unknown;
  mondayMock: unknown | null;
  createdAt: Date;
  updatedAt: Date;
};

function asEventRequest(value: unknown): EventReadinessEventRequest | null {
  if (!value || typeof value !== "object") return null;
  const draft = value as Partial<EventReadinessEventRequest>;
  return {
    ...draft,
    fields: draft.fields ?? {},
    field_status: draft.field_status ?? {}
  };
}

function summariseRow(row: EventRow) {
  const eventRequest = asEventRequest(row.eventRequest);
  const coverage = eventRequest ? buildPostPhase1Coverage(eventRequest) : null;
  const keyEvent = eventRequest ? assessPostPhase1KeyEvent(eventRequest) : null;

  return {
    id: row.id,
    draft_key: row.draftKey,
    owner_subject: row.ownerSubject,
    event_name: eventRequest ? fieldText(eventRequest, "event_title") || "Untitled event" : "Untitled event",
    club: eventRequest ? fieldText(eventRequest, "club_or_programme_affiliation") || "Not provided" : "Not provided",
    organiser: eventRequest ? fieldText(eventRequest, "organiser_name") || "Not provided" : "Not provided",
    contact: eventRequest ? fieldText(eventRequest, "contact_mobile_phone") || "Not provided" : "Not provided",
    captured_fields: coverage?.ready_fields ?? 0,
    total_fields: coverage?.total_fields ?? 0,
    event_date: eventRequest ? fieldText(eventRequest, "date") || "Not provided" : "Not provided",
    created_at: row.createdAt.toISOString(),
    updated_at: row.updatedAt.toISOString(),
    key_event: Boolean(keyEvent?.key_event_candidate),
    event_request: eventRequest,
    monday_mock: row.mondayMock
  };
}

export async function upsertEventReadinessEvent(
  ownerSubject: string,
  draftKey: string,
  eventRequest: EventReadinessEventRequest | null,
  emailEdits: Record<string, unknown>
) {
  await ensureTable();
  const id = `ere_${Date.now().toString(36)}_${Math.random().toString(36).slice(2, 10)}`;
  const eventRequestJson = eventRequest ? JSON.stringify(eventRequest) : null;
  const emailEditsJson = JSON.stringify(emailEdits ?? {});

  await prisma.$executeRaw`
    INSERT INTO "EventReadinessEvent" ("id", "ownerSubject", "draftKey", "eventRequest", "emailEdits", "updatedAt")
    VALUES (${id}, ${ownerSubject}, ${draftKey}, ${eventRequestJson}::jsonb, ${emailEditsJson}::jsonb, now())
    ON CONFLICT ("ownerSubject", "draftKey")
    DO UPDATE SET
      "eventRequest" = COALESCE(EXCLUDED."eventRequest", "EventReadinessEvent"."eventRequest"),
      "emailEdits" = EXCLUDED."emailEdits",
      "updatedAt" = now()
  `;
}

export async function listEventReadinessEvents() {
  await ensureTable();
  const rows = await prisma.$queryRaw<EventRow[]>`
    SELECT "id", "ownerSubject", "draftKey", "eventRequest", "emailEdits", "mondayMock", "createdAt", "updatedAt"
    FROM "EventReadinessEvent"
    ORDER BY "createdAt" DESC
    LIMIT 200
  `;
  return { events: rows.map(summariseRow) };
}

export async function buildAdminMondayPayload(eventId: string) {
  await ensureTable();
  const rows = await prisma.$queryRaw<EventRow[]>`
    SELECT "id", "ownerSubject", "draftKey", "eventRequest", "emailEdits", "mondayMock", "createdAt", "updatedAt"
    FROM "EventReadinessEvent"
    WHERE "id" = ${eventId}
    LIMIT 1
  `;
  const row = rows[0];
  const eventRequest = asEventRequest(row?.eventRequest);
  if (!row || !eventRequest) {
    return null;
  }

  const result = await runPostPhase1Flow(eventRequest, { run_ai_risk: false });
  const mondayJson = JSON.stringify(result.monday_mock);
  await prisma.$executeRaw`
    UPDATE "EventReadinessEvent"
    SET "mondayMock" = ${mondayJson}::jsonb, "updatedAt" = now()
    WHERE "id" = ${eventId}
  `;

  return {
    event: summariseRow({ ...row, mondayMock: result.monday_mock, updatedAt: new Date() }),
    monday_mock: result.monday_mock
  };
}
