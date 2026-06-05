import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import {
  type PostPhase1KeyEventAssessment,
  postPhase1KeyEventAssessmentSchema
} from "../schemas/postPhase1.js";
import { allEventText, fieldText, hasFinalishStatus, includesAny, parseAttendance, readProcessedJson } from "./postPhase1DataService.js";

type KeyEventRules = {
  source: string;
  non_attendance_criteria: string[];
};

function hasNegativeMeaning(text: string) {
  return /\b(no|not|none|ordinary profile|ordinary-profile|not applicable|n\/a)\b/.test(text.toLowerCase());
}

function highProfileSpeaker(eventRequest: EventReadinessEventRequest) {
  const speakerText = `${fieldText(eventRequest, "external_guest_speaker_details")} ${fieldText(eventRequest, "event_details")}`.toLowerCase();
  if (!hasFinalishStatus(eventRequest, "external_guest_speaker_details") || hasNegativeMeaning(speakerText)) return false;
  return includesAny(speakerText, [
    "senior public leader",
    "ambassador",
    "minister",
    "dean",
    "ceo",
    "chair",
    "c-suite",
    "vip",
    "high-profile",
    "high profile",
    "donor",
    "public leader"
  ]);
}

function complexLogistics(eventRequest: EventReadinessEventRequest) {
  const text = allEventText(eventRequest);
  return includesAny(text, [
    "multi-room",
    "multiple lecture",
    "breakout",
    "green room",
    "reserved vip",
    "filming/photography",
    "recording",
    "media/photo",
    "guest-list control",
    "large lecture theatre",
    "nuffield",
    "hive-style"
  ]);
}

function significantOperationalElements(eventRequest: EventReadinessEventRequest) {
  const text = allEventText(eventRequest);
  const filmingText = fieldText(eventRequest, "filming").toLowerCase();
  const filmingPositive = includesAny(filmingText, ["filming", "recording", "photography"]) && !hasNegativeMeaning(filmingText);
  const beyondRoutine = includesAny(text, [
    "multi-room",
    "multiple",
    "breakout",
    "green room",
    "reserved vip",
    "public leader",
    "dean",
    "security review"
  ]) || filmingPositive || externalMedia(eventRequest);
  if (!beyondRoutine) return false;

  const groups = new Set<string>();
  groups.add("space");
  if (includesAny(text, ["catering", "refreshments", "lunch", "reception", "alcohol", "wine", "beer"])) groups.add("catering");
  if (includesAny(text, ["registration", "welcome desk", "guest-list"])) groups.add("welcome");
  if (includesAny(text, ["av", "microphone", "q&a", "keynote", "panel"]) || filmingPositive) groups.add("av");
  if (includesAny(text, ["security", "sensitive", "vip", "media", "public audience", "120"])) groups.add("security");
  if (includesAny(text, ["multi-room", "reserved vip", "green room", "setup", "multiple lecture"])) groups.add("estates");
  if (includesAny(text, ["dean", "media", "public leader"])) groups.add("editorial");
  return groups.size >= 4;
}

function externalAudience(eventRequest: EventReadinessEventRequest) {
  const text = allEventText(eventRequest);
  if (includesAny(text, ["student-only", "students only"])) return false;
  return includesAny(text, [
    "external attendees",
    "external audience",
    "public audience",
    "alumni",
    "external guest",
    "external speaker",
    "company speakers",
    "public leader"
  ]);
}

function externalMedia(eventRequest: EventReadinessEventRequest) {
  const text = allEventText(eventRequest);
  return includesAny(text, ["media expected", "media/photo", "press", "journalist"]);
}

function sensitiveSignal(eventRequest: EventReadinessEventRequest) {
  const text = `${fieldText(eventRequest, "politically_sensitive_or_controversial")} ${fieldText(eventRequest, "event_details")} ${fieldText(eventRequest, "additional_information")}`.toLowerCase();
  if (/\bno\b/.test(text) && !includesAny(text, ["yes", "sensitive public-policy"])) return false;
  return includesAny(text, ["politically sensitive", "sensitive", "security review", "public-policy"]);
}

function evaluateCriterion(eventRequest: EventReadinessEventRequest, criterion: string) {
  switch (criterion) {
    case "high_profile_speaker":
      return highProfileSpeaker(eventRequest);
    case "complex_logistics":
      return complexLogistics(eventRequest);
    case "significant_operational_elements":
      return significantOperationalElements(eventRequest);
    case "external_audience":
      return externalAudience(eventRequest);
    case "external_media_attendance":
      return externalMedia(eventRequest);
    default:
      return false;
  }
}

export function assessPostPhase1KeyEvent(eventRequest: EventReadinessEventRequest): PostPhase1KeyEventAssessment {
  const rules = readProcessedJson<KeyEventRules>("key-event/key_event_rules.json");
  const attendance = parseAttendance(eventRequest);
  const triggerReasons: string[] = [];
  const countedCriteria: string[] = [];
  const nonCountedOrMissingCriteria: string[] = [];
  const internalSignals: string[] = [];

  const attendanceTrigger =
    attendance !== undefined && attendance >= 100 && hasFinalishStatus(eventRequest, "number_of_attendees");
  if (attendanceTrigger) {
    triggerReasons.push("Expected attendance is 100+ based on confirmed or best-estimate EventRequest information.");
  }

  for (const criterion of rules.non_attendance_criteria) {
    if (evaluateCriterion(eventRequest, criterion)) {
      countedCriteria.push(criterion);
    } else {
      nonCountedOrMissingCriteria.push(criterion);
    }
  }

  const criteriaTrigger = countedCriteria.length >= 2;
  if (criteriaTrigger) {
    triggerReasons.push("Two or more confirmed non-attendance criteria are present.");
  }

  if (sensitiveSignal(eventRequest)) {
    internalSignals.push(
      "Sensitive/political topic or security-review signal captured for planning; this is not a standalone Key Event trigger."
    );
  }

  let triggerType: PostPhase1KeyEventAssessment["trigger_type"] = "none";
  if (attendanceTrigger) triggerType = "attendance_100_plus";
  else if (criteriaTrigger) triggerType = "criteria_threshold";

  const candidate = triggerType !== "none";
  return postPhase1KeyEventAssessmentSchema.parse({
    key_event_candidate: candidate,
    trigger_type: triggerType,
    trigger_reasons: triggerReasons,
    counted_criteria: countedCriteria,
    non_counted_or_missing_criteria: nonCountedOrMissingCriteria,
    internal_signals: internalSignals,
    rationale_user_facing: candidate
      ? `Based on the completed EventRequest, this event could be considered a Key Event because ${triggerReasons.join(" ")} LBS staff retain final determination.`
      : "Based on the completed EventRequest, this event does not currently meet the deterministic Key Event candidate threshold.",
    rationale_internal: [
      `Attendance: ${attendance ?? "unknown"}.`,
      countedCriteria.length ? `Counted criteria: ${countedCriteria.join(", ")}.` : "No non-attendance criteria counted.",
      internalSignals.length ? `Internal planning signals: ${internalSignals.join(" ")}` : "No passive sensitive-topic signal captured."
    ].join(" "),
    source_notes: [
      `Deterministic source: ${rules.source}.`,
      "No OpenAI classification is used for Key Event assessment.",
      "Missing, vague, or uncollected information is not counted."
    ]
  });
}
