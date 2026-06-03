-- CreateTable
CREATE TABLE "ProcessedDataSource" (
    "id" TEXT NOT NULL,
    "sourcePath" TEXT NOT NULL,
    "sourceKind" TEXT NOT NULL,
    "authorityRank" INTEGER NOT NULL DEFAULT 100,
    "description" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ProcessedDataSource_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "KnowledgeChunk" (
    "id" TEXT NOT NULL,
    "chunkKey" TEXT NOT NULL,
    "sourcePath" TEXT NOT NULL,
    "parsedPath" TEXT,
    "category" TEXT NOT NULL,
    "title" TEXT,
    "body" TEXT NOT NULL,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "KnowledgeChunk_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuntimeLookupRecord" (
    "id" TEXT NOT NULL,
    "dataset" TEXT NOT NULL,
    "recordKey" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuntimeLookupRecord_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "RuntimeRule" (
    "id" TEXT NOT NULL,
    "ruleset" TEXT NOT NULL,
    "ruleKey" TEXT NOT NULL,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "RuntimeRule_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EventScenario" (
    "id" TEXT NOT NULL,
    "scenarioKey" TEXT NOT NULL,
    "scenarioType" TEXT,
    "data" JSONB NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "EventScenario_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OutputTemplate" (
    "id" TEXT NOT NULL,
    "templateKey" TEXT NOT NULL,
    "format" TEXT NOT NULL,
    "sourcePath" TEXT NOT NULL,
    "body" TEXT,
    "metadata" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "OutputTemplate_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "ProcessedDataSource_sourcePath_key" ON "ProcessedDataSource"("sourcePath");

-- CreateIndex
CREATE INDEX "ProcessedDataSource_sourceKind_idx" ON "ProcessedDataSource"("sourceKind");

-- CreateIndex
CREATE INDEX "ProcessedDataSource_authorityRank_idx" ON "ProcessedDataSource"("authorityRank");

-- CreateIndex
CREATE UNIQUE INDEX "KnowledgeChunk_chunkKey_key" ON "KnowledgeChunk"("chunkKey");

-- CreateIndex
CREATE INDEX "KnowledgeChunk_category_idx" ON "KnowledgeChunk"("category");

-- CreateIndex
CREATE INDEX "KnowledgeChunk_sourcePath_idx" ON "KnowledgeChunk"("sourcePath");

-- CreateIndex
CREATE INDEX "RuntimeLookupRecord_dataset_idx" ON "RuntimeLookupRecord"("dataset");

-- CreateIndex
CREATE UNIQUE INDEX "RuntimeLookupRecord_dataset_recordKey_key" ON "RuntimeLookupRecord"("dataset", "recordKey");

-- CreateIndex
CREATE INDEX "RuntimeRule_ruleset_idx" ON "RuntimeRule"("ruleset");

-- CreateIndex
CREATE UNIQUE INDEX "RuntimeRule_ruleset_ruleKey_key" ON "RuntimeRule"("ruleset", "ruleKey");

-- CreateIndex
CREATE UNIQUE INDEX "EventScenario_scenarioKey_key" ON "EventScenario"("scenarioKey");

-- CreateIndex
CREATE INDEX "EventScenario_scenarioType_idx" ON "EventScenario"("scenarioType");

-- CreateIndex
CREATE UNIQUE INDEX "OutputTemplate_templateKey_key" ON "OutputTemplate"("templateKey");

-- CreateIndex
CREATE INDEX "OutputTemplate_format_idx" ON "OutputTemplate"("format");
