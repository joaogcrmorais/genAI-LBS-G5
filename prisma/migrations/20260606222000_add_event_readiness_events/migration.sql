CREATE TABLE IF NOT EXISTS "EventReadinessEvent" (
    "id" TEXT NOT NULL,
    "ownerSubject" TEXT NOT NULL,
    "draftKey" TEXT NOT NULL,
    "eventRequest" JSONB,
    "emailEdits" JSONB NOT NULL DEFAULT '{}'::jsonb,
    "mondayMock" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "EventReadinessEvent_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "EventReadinessEvent_ownerSubject_draftKey_key" ON "EventReadinessEvent"("ownerSubject", "draftKey");
CREATE INDEX IF NOT EXISTS "EventReadinessEvent_ownerSubject_idx" ON "EventReadinessEvent"("ownerSubject");
CREATE INDEX IF NOT EXISTS "EventReadinessEvent_createdAt_idx" ON "EventReadinessEvent"("createdAt");
