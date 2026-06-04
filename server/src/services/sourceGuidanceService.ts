import fs from "node:fs";
import path from "node:path";
import type { EntryType, EventReadinessEventRequest } from "../schemas/eventReadiness.js";

type FinanceRecord = {
  key: string;
  finance_code: string;
  club_name: string;
  event_name: string;
  academic_year: string;
};

type SpaceRecord = {
  room_code: string;
  room_name: string;
  capacity: string;
  category: string;
  type: string;
  owner: string;
  source_used: string;
  source_priority: number;
};

type RuleRecord = {
  id: string;
  timing?: string;
  rule: string;
};

export type SourceGuidanceItem = {
  type: "toolkit_shaping" | "finance_code" | "space_lookup" | "catering_policy" | "timeline_policy";
  label: string;
  rationale: string;
  source: string;
  details?: unknown;
};

function getRepoRoot() {
  const candidates = [process.cwd(), path.resolve(process.cwd(), "..")];
  const repoRoot = candidates.find((candidate) => fs.existsSync(path.join(candidate, "lbs-files", "processed")));
  if (!repoRoot) {
    throw new Error("Could not locate lbs-files/processed from the current working directory.");
  }
  return repoRoot;
}

function readProcessedJson<T>(relativePath: string): T {
  const filePath = path.resolve(getRepoRoot(), "lbs-files", "processed", ...relativePath.split("/"));
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "")) as T;
}

function normalise(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : String(value ?? "").trim().toLowerCase();
}

function eventText(eventRequest: EventReadinessEventRequest, prompt: string) {
  return `${prompt} ${Object.values(eventRequest.fields).map(String).join(" ")}`.toLowerCase();
}

function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}

function hasBudgetSignal(text: string) {
  return /\b(budget|cost|spend|paid|invoice|finance|treasury|gbp|pounds?)\b|£/.test(text);
}

function hasCateringSignal(text: string) {
  return includesAny(text, ["catering", "food", "lunch", "dinner", "breakfast", "drinks", "reception", "alcohol", "wine", "beer"]);
}

function hasTimelineSignal(text: string) {
  return includesAny(text, [
    "100",
    "political",
    "controversial",
    "sensitive",
    "security",
    "alcohol",
    "catering",
    "external speaker",
    "external audience",
    "public"
  ]);
}

function tokenise(value: string) {
  return value
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3);
}

function matchFinanceCodes(text: string) {
  const records = readProcessedJson<FinanceRecord[]>("finance/finance_lookup_index.json");
  const tokens = new Set(tokenise(text));
  return records
    .map((record) => {
      const recordTokens = tokenise(`${record.club_name} ${record.event_name} ${record.key}`);
      const score = recordTokens.filter((token) => tokens.has(token)).length;
      return { ...record, score };
    })
    .filter((record) => record.score >= 2)
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ score: _score, ...record }) => record);
}

function matchSpaces(text: string, attendance: number | undefined) {
  const records = readProcessedJson<SpaceRecord[]>("space/spaces.json");
  const tokens = tokenise(text);
  const wantsLecture = includesAny(text, ["lecture theatre", "lect", "theatre"]);
  const wantsReception = includesAny(text, ["reception", "standing", "networking"]);
  const wantsBoardroom = includesAny(text, ["boardroom", "meeting"]);

  return records
    .map((record) => {
      const capacity = Number.parseInt(record.capacity, 10);
      const haystack = normalise(`${record.room_code} ${record.room_name} ${record.category} ${record.type}`);
      let score = tokens.filter((token) => haystack.includes(token)).length;
      if (wantsLecture && includesAny(haystack, ["lecture", "tiered", "lect"])) score += 3;
      if (wantsReception && includesAny(haystack, ["function", "standing"])) score += 3;
      if (wantsBoardroom && haystack.includes("boardroom")) score += 3;
      if (attendance && Number.isFinite(capacity) && capacity >= attendance) score += 2;
      if (record.source_used === "Space Matrix") score += 1;
      return { ...record, score };
    })
    .filter((record) => record.score > 0)
    .sort((a, b) => b.score - a.score || a.source_priority - b.source_priority)
    .slice(0, 5)
    .map(({ score: _score, ...record }) => record);
}

function parseAttendance(eventRequest: EventReadinessEventRequest) {
  const value = eventRequest.fields.number_of_attendees;
  if (typeof value === "number") return value;
  const match = String(value ?? "").match(/\d{1,4}/);
  return match ? Number(match[0]) : undefined;
}

export function buildSourceGuidance(
  prompt: string,
  eventRequest: EventReadinessEventRequest,
  entryType: EntryType
): SourceGuidanceItem[] {
  const text = eventText(eventRequest, prompt);
  const guidance: SourceGuidanceItem[] = [];

  if (entryType === "budget_only_no_event_idea" || includesAny(text, ["help me decide", "no event idea", "vague idea"])) {
    guidance.push({
      type: "toolkit_shaping",
      label: "Use toolkit shaping",
      rationale:
        "The organiser needs help converting a weak or budget-only starting point into purpose, audience, format, resources, and success measures.",
      source: "lbs-files/processed/toolkit/toolkit_rules.json",
      details: {
        lenses: ["strategic alignment", "unique value", "audience clarity", "resource readiness", "success signal"]
      }
    });
  }

  if (hasBudgetSignal(text)) {
    const matches = matchFinanceCodes(text);
    guidance.push({
      type: "finance_code",
      label: matches.length ? "Potential finance-code matches found" : "Finance-code setup needed",
      rationale: "Budget is involved, so finance-code guidance must be surfaced.",
      source: "lbs-files/processed/finance/finance_lookup_index.json",
      details: matches.length
        ? { matches }
        : { next_step: "Ask club treasury / finance support to confirm or create the relevant event finance code." }
    });
  }

  if (normalise(eventRequest.fields.space_and_setup) || includesAny(text, ["space", "room", "lecture theatre", "venue"])) {
    guidance.push({
      type: "space_lookup",
      label: "Space Matrix checked first",
      rationale: "Room and setup guidance should use the Space Matrix before fallback sources.",
      source: "lbs-files/processed/space/spaces.json",
      details: {
        source_rule: "Use Space Matrix first. If missing, use supporting source with more entries and state source used.",
        matches: matchSpaces(text, parseAttendance(eventRequest))
      }
    });
  }

  if (hasCateringSignal(text)) {
    guidance.push({
      type: "catering_policy",
      label: "Catering and alcohol policy implications",
      rationale: "Catering, alcohol, or reception wording appears in the event facts.",
      source: "lbs-files/processed/catering/catering_policy_rules.json",
      details: readProcessedJson<RuleRecord[]>("catering/catering_policy_rules.json")
    });
  }

  if (hasTimelineSignal(text)) {
    guidance.push({
      type: "timeline_policy",
      label: "Timeline and security implications",
      rationale: "The event facts include timing-sensitive signals such as large attendance, catering, alcohol, external audience, or sensitive topics.",
      source: "lbs-files/processed/timeline/timeline_rules.json",
      details: readProcessedJson<RuleRecord[]>("timeline/timeline_rules.json")
    });
  }

  return guidance;
}
