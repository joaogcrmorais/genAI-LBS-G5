import fs from "node:fs";
import path from "node:path";
import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import { getSpaceRequestFields } from "./eventReadinessService.js";

export type PostPhase1Fixture = {
  id: string;
  name: string;
  description: string;
  expected: {
    key_event_candidate: boolean;
    eis_required: boolean;
    key_event_trigger?: string;
    stakeholders: string[];
    not_expected_stakeholders?: string[];
  };
  event_request: EventReadinessEventRequest;
};

export type RoutingRuleRecord = {
  stakeholder: string;
  when: string;
  needs: string[];
};

export type LifecycleStakeholderRecord = {
  source_sheet: string;
  source_row: string;
  phase: string;
  stakeholder: string;
  timeline: string;
  workstream_task: string;
};

function getRepoRoot() {
  const candidates = [process.cwd(), path.resolve(process.cwd(), "..")];
  const repoRoot = candidates.find((candidate) => fs.existsSync(path.join(candidate, "lbs-files", "processed")));
  if (!repoRoot) {
    throw new Error("Could not locate lbs-files/processed from the current working directory.");
  }
  return repoRoot;
}

export function processedPath(relativePath: string) {
  return path.resolve(getRepoRoot(), "lbs-files", "processed", ...relativePath.split("/"));
}

export function readProcessedJson<T>(relativePath: string): T {
  return JSON.parse(fs.readFileSync(processedPath(relativePath), "utf8").replace(/^\uFEFF/, "")) as T;
}

function parseCsvLine(line: string) {
  const cells: string[] = [];
  let current = "";
  let quoted = false;
  for (let index = 0; index < line.length; index += 1) {
    const char = line[index];
    if (char === '"' && line[index + 1] === '"') {
      current += '"';
      index += 1;
    } else if (char === '"') {
      quoted = !quoted;
    } else if (char === "," && !quoted) {
      cells.push(current);
      current = "";
    } else {
      current += char;
    }
  }
  cells.push(current);
  return cells;
}

export function readLifecycleStakeholders() {
  const text = fs.readFileSync(processedPath("lifecycle/stakeholders_by_phase.csv"), "utf8").replace(/^\uFEFF/, "");
  const [headerLine, ...lines] = text.split(/\r?\n/).filter(Boolean);
  if (!headerLine) return [];
  const headers = parseCsvLine(headerLine);
  return lines.map((line) => {
    const cells = parseCsvLine(line);
    const row = Object.fromEntries(headers.map((header, index) => [header, cells[index] ?? ""]));
    return row as LifecycleStakeholderRecord;
  });
}

export function getPostPhase1Fixtures() {
  return readProcessedJson<PostPhase1Fixture[]>("examples/post_phase1_event_requests.json");
}

export function getRoutingRules() {
  return readProcessedJson<RoutingRuleRecord[]>("routing/stakeholder_routing_rules.json");
}

const readyStatuses = new Set(["final", "best_estimate", "not_sure_yet", "needs_confirmation", "not_applicable", "organiser_follow_up"]);

export function buildPostPhase1Coverage(eventRequest: EventReadinessEventRequest) {
  const items = getSpaceRequestFields().map((field) => {
    const status = eventRequest.field_status[field.key] ?? "missing";
    return {
      ...field,
      status,
      value: eventRequest.fields[field.key],
      ready: readyStatuses.has(status)
    };
  });
  const readyFields = items.filter((item) => item.ready).length;
  const missing = items.filter((item) => !item.ready);
  return {
    total_fields: items.length,
    ready_fields: readyFields,
    missing_fields: missing.length,
    phase_1_ready: missing.length === 0,
    items
  };
}

export function fieldText(eventRequest: EventReadinessEventRequest, key: string) {
  const value = eventRequest.fields[key];
  if (value === null || value === undefined) return "";
  return typeof value === "string" ? value.trim() : String(value);
}

export function allEventText(eventRequest: EventReadinessEventRequest) {
  return Object.values(eventRequest.fields).map(String).join(" ").toLowerCase();
}

export function parseAttendance(eventRequest: EventReadinessEventRequest) {
  const value = eventRequest.fields.number_of_attendees;
  if (typeof value === "number") return value;
  const match = String(value ?? "").match(/\d{1,4}/);
  return match ? Number(match[0]) : undefined;
}

export function hasFinalishStatus(eventRequest: EventReadinessEventRequest, key: string) {
  return ["final", "best_estimate"].includes(eventRequest.field_status[key] ?? "missing");
}

export function includesAny(text: string, words: string[]) {
  return words.some((word) => text.includes(word));
}
