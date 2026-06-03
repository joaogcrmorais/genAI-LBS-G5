import dotenv from "dotenv";
import { PrismaClient } from "@prisma/client";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, "..");
dotenv.config({ path: path.join(repoRoot, ".env") });

const prisma = new PrismaClient();
const processedRoot = path.join(repoRoot, "lbs-files", "processed");

function readText(relativePath) {
  return fs.readFileSync(path.join(repoRoot, relativePath), "utf8").replace(/^\uFEFF/, "");
}

function readJson(relativePath) {
  return JSON.parse(readText(relativePath));
}

function readJsonLines(relativePath) {
  return readText(relativePath)
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .map((line) => JSON.parse(line));
}

function fileExists(relativePath) {
  return fs.existsSync(path.join(repoRoot, relativePath));
}

function sanitizeKey(value, fallback = "record") {
  const key = String(value ?? "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "_")
    .replace(/^_+|_+$/g, "");
  return key || fallback;
}

function keyFromRecord(record, fields, fallbackPrefix, index) {
  for (const field of fields) {
    if (record && record[field] !== undefined && record[field] !== null && String(record[field]).trim()) {
      return sanitizeKey(record[field], `${fallbackPrefix}_${index + 1}`);
    }
  }
  return `${fallbackPrefix}_${index + 1}`;
}

async function reloadRuntimeData() {
  if (!fs.existsSync(processedRoot)) {
    throw new Error("Processed data directory does not exist. Run scripts/convert-lbs-files.ps1 first.");
  }

  await prisma.outputTemplate.deleteMany();
  await prisma.eventScenario.deleteMany();
  await prisma.runtimeRule.deleteMany();
  await prisma.runtimeLookupRecord.deleteMany();
  await prisma.knowledgeChunk.deleteMany();
  await prisma.processedDataSource.deleteMany();

  await prisma.processedDataSource.createMany({
    data: [
      {
        sourcePath: "lbs-files/raw/[SA Copy] LBS Event Toolkit Student Clubs Updated - Copy.pdf",
        sourceKind: "raw_pdf",
        authorityRank: 1,
        description: "Most authoritative student club Event Toolkit source."
      },
      {
        sourcePath: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md",
        sourceKind: "parsed_markdown",
        authorityRank: 2,
        description: "Authoritative parsed text companion for the Event Toolkit PDF."
      },
      {
        sourcePath: "docs/project-context/key_event_identification_spec.md",
        sourceKind: "business_logic",
        authorityRank: 1,
        description: "Sole deterministic source for Key Event categorisation."
      },
      {
        sourcePath: "docs/project-context/event_readiness_assistant_phase_1_conversation_rules_spec.md",
        sourceKind: "business_logic",
        authorityRank: 1,
        description: "Authoritative Phase 1 conversation behaviour source."
      },
      {
        sourcePath: "lbs-files/raw/request-event/CribSheet - Copy.docx",
        sourceKind: "raw_docx",
        authorityRank: 1,
        description: "Official source for Space Request / EventRequest fields."
      },
      {
        sourcePath: "lbs-files/raw/space/Space Matrix (1) - Copy.xlsx",
        sourceKind: "raw_xlsx",
        authorityRank: 1,
        description: "Primary room/space lookup source."
      },
      {
        sourcePath: "lbs-files/raw/Finance_Code_Directory - Copy.xlsx",
        sourceKind: "raw_xlsx",
        authorityRank: 1,
        description: "Finance-code lookup source."
      }
    ]
  });

  const chunkFiles = [
    ["lbs-files/processed/toolkit/toolkit_chunks.jsonl", "event-toolkit"],
    ["lbs-files/processed/catering/catering_policy_chunks.jsonl", "catering-policy"],
    ["lbs-files/processed/catering/hospitality_brochure_chunks.jsonl", "catering-brochure"],
    ["lbs-files/processed/request-event/event_terms_chunks.jsonl", "event-terms"],
    ["lbs-files/processed/space/soc_setup_guidance_chunks.jsonl", "soc-setup"]
  ];

  for (const [relativePath, defaultCategory] of chunkFiles) {
    if (!fileExists(relativePath)) continue;
    const chunks = readJsonLines(relativePath);
    if (chunks.length === 0) continue;
    await prisma.knowledgeChunk.createMany({
      data: chunks.map((chunk, index) => ({
        chunkKey: chunk.id ?? `${sanitizeKey(defaultCategory)}_${index + 1}`,
        sourcePath: chunk.source ?? relativePath,
        parsedPath: chunk.parsed_source ?? null,
        category: chunk.category ?? defaultCategory,
        title: chunk.title ?? null,
        body: chunk.text ?? chunk.body ?? "",
        metadata: chunk
      }))
    });
  }

  const lookupFiles = [
    ["finance_codes", "lbs-files/processed/finance/finance_codes.json", ["finance_code", "event_name"]],
    ["finance_lookup_index", "lbs-files/processed/finance/finance_lookup_index.json", ["key", "finance_code"]],
    ["spaces", "lbs-files/processed/space/spaces.json", ["room_code", "room_name"]],
    ["space_matrix", "lbs-files/processed/space/space_matrix.json", ["room", "room_2"]],
    ["catering_space_policy", "lbs-files/processed/catering/catering_space_policy.json", ["room", "room_2"]],
    ["room_capacity_overview", "lbs-files/processed/space/room_capacity_overview.json", ["lt", "room"]],
    ["hospitality_spaces", "lbs-files/processed/space/hospitality_spaces.json", ["room", "location"]],
    ["soc_rooms", "lbs-files/processed/space/soc_rooms.json", ["room", "room_name"]],
    ["soc_room_checklist", "lbs-files/processed/space/soc_room_checklist.json", ["location"]],
    ["space_request_fields", "lbs-files/processed/request-event/space_request_fields.json", ["key"]],
    ["lifecycle_phases", "lbs-files/processed/lifecycle/lifecycle_phases.json", ["phase", "name"]],
    ["forms_by_phase", "lbs-files/processed/lifecycle/forms_by_phase.json", ["phase", "form"]]
  ];

  for (const [dataset, relativePath, keyFields] of lookupFiles) {
    if (!fileExists(relativePath)) continue;
    const records = readJson(relativePath);
    if (!Array.isArray(records) || records.length === 0) continue;
    await prisma.runtimeLookupRecord.createMany({
      data: records.map((record, index) => ({
        dataset,
        recordKey: keyFromRecord(record, keyFields, dataset, index),
        data: record
      })),
      skipDuplicates: true
    });
  }

  const ruleFiles = [
    ["finance_code_rules", "lbs-files/processed/finance/finance_code_rules.md"],
    ["catering_policy_rules", "lbs-files/processed/catering/catering_policy_rules.json"],
    ["external_catering_rules", "lbs-files/processed/catering/external_catering_rules.json"],
    ["key_event_rules", "lbs-files/processed/key-event/key_event_rules.json"],
    ["stakeholder_routing_rules", "lbs-files/processed/routing/stakeholder_routing_rules.json"],
    ["timeline_rules", "lbs-files/processed/timeline/timeline_rules.json"],
    ["checklist_rules", "lbs-files/processed/timeline/checklist_rules.json"],
    ["toolkit_rules", "lbs-files/processed/toolkit/toolkit_rules.json"],
    ["event_terms_rules", "lbs-files/processed/request-event/event_terms_rules.json"],
    ["event_profile_question_flow", "lbs-files/processed/request-event/event_profile_question_flow.json"]
  ];

  for (const [ruleset, relativePath] of ruleFiles) {
    if (!fileExists(relativePath)) continue;
    const isMarkdown = relativePath.endsWith(".md");
    const value = isMarkdown ? { body: readText(relativePath) } : readJson(relativePath);
    const records = Array.isArray(value) ? value : [value];
    await prisma.runtimeRule.createMany({
      data: records.map((record, index) => ({
        ruleset,
        ruleKey: record.id ?? record.ruleKey ?? `${ruleset}_${index + 1}`,
        data: record
      })),
      skipDuplicates: true
    });
  }

  const scenarioFiles = [
    ["lbs-files/processed/examples/event_examples.json", "event_examples"],
    ["lbs-files/processed/examples/pasted_draft_examples.json", "pasted_draft_examples"],
    ["lbs-files/processed/finance/finance_code_test_cases.json", "finance_code_test_cases"],
    ["lbs-files/processed/space/space_recommendation_test_cases.json", "space_recommendation_test_cases"],
    ["lbs-files/processed/key-event/key_event_test_cases.json", "key_event_test_cases"],
    ["lbs-files/processed/monday/monday_payload_examples.json", "monday_payload_examples"]
  ];

  for (const [relativePath, scenarioType] of scenarioFiles) {
    if (!fileExists(relativePath)) continue;
    const records = readJson(relativePath);
    if (!Array.isArray(records)) continue;
    await prisma.eventScenario.createMany({
      data: records.map((record, index) => ({
        scenarioKey: record.id ?? `${scenarioType}_${index + 1}`,
        scenarioType,
        data: record
      })),
      skipDuplicates: true
    });
  }

  const templateFiles = [
    ["space_request_form_markdown", "markdown", "lbs-files/processed/request-event/space_request_form_template.md"],
    ["eis_markdown", "markdown", "lbs-files/processed/request-event/eis_template.md"],
    ["external_catering_waiver_markdown", "markdown", "lbs-files/processed/catering/external_catering_waiver_template.md"],
    ["stakeholder_email_markdown", "markdown", "lbs-files/processed/routing/stakeholder_email_templates.md"],
    ["run_of_show_markdown", "markdown", "lbs-files/processed/templates/run_of_show_template.md"],
    ["mic_schedule_markdown", "markdown", "lbs-files/processed/templates/mic_schedule_template.md"],
    ["space_request_form_docx", "docx", "lbs-files/processed/templates/space_request_form_template.docx"],
    ["eis_docx", "docx", "lbs-files/processed/templates/eis_template.docx"]
  ];

  for (const [templateKey, format, relativePath] of templateFiles) {
    if (!fileExists(relativePath)) continue;
    await prisma.outputTemplate.create({
      data: {
        templateKey,
        format,
        sourcePath: relativePath,
        body: format === "markdown" ? readText(relativePath) : null,
        metadata: { sourcePath: relativePath }
      }
    });
  }

  const counts = {
    processedDataSources: await prisma.processedDataSource.count(),
    knowledgeChunks: await prisma.knowledgeChunk.count(),
    runtimeLookupRecords: await prisma.runtimeLookupRecord.count(),
    runtimeRules: await prisma.runtimeRule.count(),
    eventScenarios: await prisma.eventScenario.count(),
    outputTemplates: await prisma.outputTemplate.count()
  };

  console.log(JSON.stringify(counts, null, 2));
}

try {
  await reloadRuntimeData();
} finally {
  await prisma.$disconnect();
}
