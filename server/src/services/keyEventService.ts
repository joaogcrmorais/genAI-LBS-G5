import fs from "node:fs";
import path from "node:path";
import type { EventReadinessEventRequest, FieldStatus } from "../schemas/eventReadiness.js";

type KeyEventRules = {
  source: string;
  sole_deterministic_source: boolean;
  non_attendance_criteria: string[];
  guardrails: string[];
};

export type KeyEventAssessment = {
  key_event_candidate: boolean;
  trigger_reasons: string[];
  counted_criteria: string[];
  non_counted_or_missing_criteria: string[];
  internal_signals: string[];
  user_facing_message: string;
  source_notes: string[];
};

const countableStatuses = new Set<FieldStatus>(["final", "best_estimate"]);

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

function textFor(eventRequest: EventReadinessEventRequest, keys: string[]) {
  return keys.map((key) => String(eventRequest.fields[key] ?? "")).join(" ").toLowerCase();
}

function allText(eventRequest: EventReadinessEventRequest) {
  return Object.values(eventRequest.fields).map(String).join(" ").toLowerCase();
}

function hasUsableStatus(eventRequest: EventReadinessEventRequest, keys: string[]) {
  return keys.some((key) => countableStatuses.has(eventRequest.field_status[key] ?? "missing"));
}

function includesAny(text: string, terms: string[]) {
  return terms.some((term) => text.includes(term));
}

function parseAttendance(eventRequest: EventReadinessEventRequest) {
  const value = eventRequest.fields.number_of_attendees;
  if (typeof value === "number") return value;
  const match = String(value ?? "").match(/\d{1,4}/);
  return match ? Number(match[0]) : undefined;
}

function hasSensitiveSignal(eventRequest: EventReadinessEventRequest) {
  const text = textFor(eventRequest, ["politically_sensitive_or_controversial", "event_details"]);
  if (/no political|no controversial|no sensitive|not political|not controversial/.test(text)) return false;
  return includesAny(text, ["political", "controversial", "sensitive", "minister", "embassy", "ambassador", "war", "conflict"]);
}

function evaluateCriterion(eventRequest: EventReadinessEventRequest, criterion: string) {
  const text = allText(eventRequest);

  switch (criterion) {
    case "high_profile_speaker": {
      const speakerText = textFor(eventRequest, ["external_guest_speaker_details", "event_details"]);
      return (
        hasUsableStatus(eventRequest, ["external_guest_speaker_details", "has_external_guest_speakers"]) &&
        includesAny(speakerText, [
          "dean",
          "minister",
          "ambassador",
          "embassy",
          "ceo",
          "chair",
          "founder",
          "vip",
          "high-profile",
          "high profile",
          "donor",
          "senior"
        ])
      );
    }
    case "complex_logistics":
      return (
        hasUsableStatus(eventRequest, [
          "space_and_setup",
          "registration_desk",
          "outside_equipment",
          "filming",
          "cloakroom",
          "alcohol"
        ]) &&
        includesAny(text, [
          "multi-room",
          "multiple rooms",
          "booth",
          "stage",
          "vendor",
          "livestream",
          "filming",
          "cloakroom",
          "registration desk",
          "welcome desk",
          "outside equipment",
          "security",
          "complex"
        ])
      );
    case "significant_operational_elements": {
      const groups = new Set<string>();
      if (hasUsableStatus(eventRequest, ["space_and_setup"])) groups.add("Space Management");
      if (hasUsableStatus(eventRequest, ["catering", "alcohol"]) && includesAny(text, ["catering", "food", "alcohol", "drinks"])) {
        groups.add("Catering / Lexington");
      }
      if (hasUsableStatus(eventRequest, ["registration_desk"]) && includesAny(text, ["registration", "welcome desk"])) {
        groups.add("Welcome Desk");
      }
      if (hasUsableStatus(eventRequest, ["outside_equipment"]) && includesAny(text, ["equipment", "booth", "vendor", "stage"])) {
        groups.add("Estates / porters");
      }
      if (includesAny(text, ["av", "microphone", "livestream", "filming", "recording"])) groups.add("AV / Technology");
      if (includesAny(text, ["security", "100", "political", "sensitive", "controversial"])) groups.add("Security");
      return groups.has("Space Management") && groups.size >= 4;
    }
    case "external_audience":
      return (
        hasUsableStatus(eventRequest, ["event_details", "external_guest_speaker_details"]) &&
        includesAny(text, ["external audience", "public audience", "public guests", "external guests", "non-lbs", "non lbs", "corporate partners"])
      );
    case "external_media_attendance":
      return hasUsableStatus(eventRequest, ["event_details", "additional_information"]) && includesAny(text, ["media", "press", "journalist"]);
    default:
      return false;
  }
}

export function assessKeyEvent(eventRequest: EventReadinessEventRequest): KeyEventAssessment {
  const rules = readProcessedJson<KeyEventRules>("key-event/key_event_rules.json");
  const triggerReasons: string[] = [];
  const countedCriteria: string[] = [];
  const nonCountedOrMissingCriteria: string[] = [];
  const internalSignals: string[] = [];
  const attendance = parseAttendance(eventRequest);
  const attendanceStatus = eventRequest.field_status.number_of_attendees ?? "missing";

  if (attendance !== undefined && attendance >= 100 && countableStatuses.has(attendanceStatus)) {
    triggerReasons.push("Expected attendance is 100+.");
  }

  for (const criterion of rules.non_attendance_criteria) {
    if (evaluateCriterion(eventRequest, criterion)) {
      countedCriteria.push(criterion);
    } else {
      nonCountedOrMissingCriteria.push(criterion);
    }
  }

  if (countedCriteria.length >= 2) {
    triggerReasons.push("Two or more confirmed non-attendance criteria are present.");
  }

  if (hasSensitiveSignal(eventRequest)) {
    internalSignals.push(
      "Sensitive/political topic is captured as an internal planning signal and should surface security/timeline guidance, but is not a standalone Key Event trigger."
    );
  }

  const keyEventCandidate = triggerReasons.length > 0;
  return {
    key_event_candidate: keyEventCandidate,
    trigger_reasons: triggerReasons,
    counted_criteria: countedCriteria,
    non_counted_or_missing_criteria: nonCountedOrMissingCriteria,
    internal_signals: internalSignals,
    user_facing_message: keyEventCandidate
      ? `Based on the confirmed information, this event could be considered a Key Event because: ${triggerReasons.join(" ")} LBS staff retain final determination.`
      : "Based on the confirmed information available, this does not currently meet the deterministic Key Event candidate threshold.",
    source_notes: [
      `Deterministic source: ${rules.source}.`,
      "Missing, vague, or uncollected information is not counted.",
      "No extra questions are asked solely for Key Event scoring."
    ]
  };
}
