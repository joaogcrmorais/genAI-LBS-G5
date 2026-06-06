CREATE TABLE IF NOT EXISTS "EventReadinessDraft" (
    "id" TEXT NOT NULL,
    "ownerSubject" TEXT NOT NULL,
    "draftKey" TEXT NOT NULL DEFAULT 'current',
    "eventRequest" JSONB,
    "emailEdits" JSONB NOT NULL DEFAULT '{}',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventReadinessDraft_pkey" PRIMARY KEY ("id")
);

CREATE UNIQUE INDEX IF NOT EXISTS "EventReadinessDraft_ownerSubject_draftKey_key" ON "EventReadinessDraft"("ownerSubject", "draftKey");
CREATE INDEX IF NOT EXISTS "EventReadinessDraft_ownerSubject_idx" ON "EventReadinessDraft"("ownerSubject");
