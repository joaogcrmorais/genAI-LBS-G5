-- CreateTable
CREATE TABLE "UserProfile" (
    "id" TEXT NOT NULL,
    "auth0Subject" TEXT NOT NULL,
    "displayName" TEXT,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "AppEventLog" (
    "id" TEXT NOT NULL,
    "eventType" TEXT NOT NULL,
    "actorSub" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "AppEventLog_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_auth0Subject_key" ON "UserProfile"("auth0Subject");

-- CreateIndex
CREATE INDEX "UserProfile_auth0Subject_idx" ON "UserProfile"("auth0Subject");

-- CreateIndex
CREATE INDEX "AppEventLog_eventType_createdAt_idx" ON "AppEventLog"("eventType", "createdAt");

-- CreateIndex
CREATE INDEX "AppEventLog_actorSub_idx" ON "AppEventLog"("actorSub");
