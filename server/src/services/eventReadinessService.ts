import fs from "node:fs";
import path from "node:path";
import type {
  EntryType,
  EventReadinessAiTurn,
  EventReadinessChatRequest,
  EventReadinessEvaluateRequest,
  EventReadinessEventRequest,
  FieldStatus
} from "../schemas/eventReadiness.js";
import { assessKeyEvent } from "./keyEventService.js";
import { phase1Epics, phase1Features, phase1UserStories } from "./phase1Metadata.js";
import { buildSourceGuidance } from "./sourceGuidanceService.js";
import { hasFinanceSignal, normaliseEventRequestFinanceCode } from "./financeCodeService.js";
import { buildPostSpaceRequestGuidance } from "./postSpaceRequestGuidanceService.js";

type SpaceRequestField = {
  label: string;
  key: string;
  category: string;
};

type QuestionFlowItem = {
  id: string;
  purpose: string;
  options?: string[];
  max_questions_default?: number;
  include_options?: string[];
  field_keys?: string[];
  field_statuses?: string[];
  rule?: string;
};

type EventScenario = {
  id: string;
  type: string;
  prompt: string;
  expected_attendance?: number;
};

type CoverageItem = SpaceRequestField & {
  status: FieldStatus;
  value: unknown;
  ready: boolean;
};

const allowedReadyStatuses = new Set<FieldStatus>([
  "final",
  "best_estimate",
  "not_sure_yet",
  "needs_confirmation",
  "not_applicable",
  "organiser_follow_up"
]);

const lowProbabilityDefaultFields: Record<string, { value: string; status: FieldStatus }> = {
  children_attending: {
    value: "No children indicated; treated as not attending for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  decorations: {
    value: "No decorations indicated; treated as not present for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  recorded_music: {
    value: "No recorded music indicated; treated as not present for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  live_music: {
    value: "No live music indicated; treated as not present for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  cloakroom: {
    value: "No cloakroom indicated; treated as not required for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  outside_equipment: {
    value: "No outside or extra hired equipment indicated; treated as not present for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  filming: {
    value: "No filming indicated; treated as not taking place for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  filming_details: {
    value: "Not applicable because no filming is indicated.",
    status: "not_applicable"
  }
};

const miscellaneousFieldKeys = new Set([
  "children_attending",
  "decorations",
  "recorded_music",
  "live_music",
  "cloakroom",
  "outside_equipment",
  "filming",
  "filming_details"
]);

const missingQuestionByField: Record<string, string> = {
  organiser_name: "Who is the named organiser for the request?",
  club_or_programme_affiliation: "Which club or programme is this for?",
  contact_mobile_phone: "What phone number should LBS use for urgent event questions?",
  event_title: "What working title should appear on the Space Request?",
  number_of_attendees: "How many attendees do you expect, even as a range or best estimate?",
  date: "What date, month, or target window should LBS plan around?",
  start_finish_time: "What start and finish time should be used, even provisionally?",
  event_type: "What format best describes the event?",
  event_details: "What is the purpose, subject, and intended outcome?",
  external_guest_speaker_details: "Who are the external speakers, if any?",
  has_external_guest_speakers: "Will external guest speakers attend?",
  politically_sensitive_or_controversial: "Could the topic be politically sensitive or controversial?",
  children_attending: "Will children under 18 attend?",
  activities: "What activities will happen during the event?",
  noise_impact: "Could any activity create noise or disruption?",
  space_and_setup: "What space type, room setup, or preferred room do you need?",
  registration_desk: "Do you need a registration desk or Welcome Desk support?",
  decorations: "Will you use decorations or branded setup?",
  catering: "What food and drink should be planned: catering, alcohol, both, or neither?",
  alcohol: "What food and drink should be planned: catering, alcohol, both, or neither?",
  recorded_music: "Will recorded music be played?",
  live_music: "Will live music be played?",
  cloakroom: "Do you need a cloakroom?",
  outside_equipment: "Will outside or extra equipment be hired or brought in?",
  filming: "Will filming take place?",
  filming_details: "What will be filmed, and by whom?",
  additional_information: "Is there any extra context LBS should preserve?"
};

const userSaysNoMoreInfoPattern =
  /\b(no additional|no more|nothing else|nothing more|no further|no extra)\b.{0,80}\b(info|information|details|context|requirements|activities|planned|add)\b|\bmark\b.{0,40}\bfinal\b/i;

const foodAndDrinkFieldKeys = new Set(["catering", "alcohol"]);

function isUncertaintyValue(value: unknown) {
  const text = normaliseText(value).toLowerCase();
  return /\b(needs? confirmation|not sure|unknown|tbd|to be confirmed|need to check|i don't know|unsure|help me decide)\b/.test(
    text
  );
}

function isNegativeValue(value: unknown) {
  const text = normaliseText(value).toLowerCase();
  return /^(no|none|not applicable|n\/a)\b/.test(text) || /\b(no .*indicated|not present|not required|no filming)\b/.test(text);
}

function hasCoreEventContext(eventRequest: EventReadinessEventRequest) {
  return Boolean(
    hasMeaningfulValue(eventRequest.fields.event_details) ||
      hasMeaningfulValue(eventRequest.fields.event_title) ||
      hasMeaningfulValue(eventRequest.fields.event_type)
  );
}

function hasPoliticalRiskSignal(text: string) {
  const lower = text.toLowerCase();
  if (/\b(no|not|none)\b.{0,40}\b(political|controversial|sensitive|politician|minister|embassy)\b/.test(lower)) {
    return false;
  }
  return /\b(political|politically|controversial|sensitive topic|sensitive people|protest|minister|embassy|ambassador|election|campaign|war|conflict|activist)\b/.test(
    lower
  );
}

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

export function getSpaceRequestFields() {
  return readProcessedJson<SpaceRequestField[]>("request-event/space_request_fields.json");
}

export function getQuestionFlow() {
  return readProcessedJson<QuestionFlowItem[]>("request-event/event_profile_question_flow.json");
}

export function getScenarios() {
  return readProcessedJson<EventScenario[]>("examples/event_examples.json");
}

function normaliseText(value: unknown) {
  return typeof value === "string" ? value.trim() : "";
}

function hasMeaningfulValue(value: unknown) {
  if (value === null || value === undefined) return false;
  if (typeof value === "string") return value.trim().length > 0;
  if (Array.isArray(value)) return value.length > 0;
  return true;
}

function compactText(parts: Array<string | undefined>) {
  return parts.map((part) => part?.trim()).filter(Boolean).join(" ");
}

function setFieldIfUseful(
  eventRequest: EventReadinessEventRequest,
  key: string,
  value: unknown,
  status: FieldStatus = "final",
  overwrite = false
) {
  if (!hasMeaningfulValue(value)) return;
  const existingStatus = eventRequest.field_status[key];
  const existingValue = eventRequest.fields[key];
  if (!overwrite && existingStatus && existingStatus !== "missing" && hasMeaningfulValue(existingValue)) return;
  eventRequest.fields[key] = value;
  eventRequest.field_status[key] = status;
}

function transcriptText(transcript: EventReadinessChatRequest["transcript"], message: string) {
  return [...transcript.filter((item) => item.role === "user").map((item) => item.content), message].join("\n");
}

function lastUsefulLine(text: string) {
  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter(Boolean)
    .at(-1);
}

function extractQuotedTitle(text: string) {
  const quoteMatch = text.match(/["“]([^"”]{3,160})["”]/);
  if (quoteMatch?.[1]) return quoteMatch[1].trim();
  const namedMatch = text.match(/\bevent\s+(?:is\s+)?named\s+([^.\n]+)/i);
  if (namedMatch?.[1]) return namedMatch[1].trim();
  const titleMatch = text.match(/\b(?:event title|title)\s+(?:is|will be|should be)\s+([^.\n]+)/i);
  return titleMatch?.[1]?.trim();
}

function extractTimeRange(text: string) {
  const match = text.match(/\b(?:from\s+)?(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\s*(?:to|-|until)\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\b/i);
  if (!match?.[1] || !match[2]) return undefined;
  return `${match[1].trim()} to ${match[2].trim()}`;
}

function extractRegistrationDesk(text: string) {
  const lower = text.toLowerCase();
  if (!lower.includes("registration")) return undefined;
  const local = text.match(/\bregistration desk\b[^.\n]*(?:[.\n]\s*[^.\n]*)?/i)?.[0] ?? "";
  const localTime = local.match(/\b(?:at|opening at|open at|opens at|from|around)\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\b/i)?.[1];
  if (localTime) return `Registration desk required from ${localTime.trim()}.`;
  const time = text.match(/\b(?:at|opening at|from|around)\s+(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\b/i)?.[1];
  if (time) return `Registration desk required from ${time.trim()}.`;
  if (/\byes\b|\brequire|need|required/.test(lower)) return "Registration desk required; setup time needs confirmation.";
  return undefined;
}

function extractSpeakerList(text: string) {
  const speakerSeries = text.match(/\b(speaker\s*1(?:[\s,;]+speaker\s*\d+){1,})\b/i)?.[1];
  if (speakerSeries) {
    return speakerSeries
      .replace(/\s+/g, " ")
      .replace(/speaker\s*(\d+)/gi, "Speaker $1")
      .trim();
  }
  const namedSpeakers: string[] = [];
  if (/\bsaruman\b/i.test(text)) namedSpeakers.push("White Wizard Saruman");
  if (/\bsauron\b/i.test(text)) namedSpeakers.push("Dark Lord Sauron");
  if (/\b(pipin|pippin|peregrin\s+tuk)\b/i.test(text)) namedSpeakers.push("Pipin / Peregrin Tuk");
  if (namedSpeakers.length > 0) return `External speakers include ${namedSpeakers.join(", ")}.`;

  const includeMatch = text.match(/\b(?:external speakers include|other external speakers include)\s+([^.\n]+)/i)?.[1];
  if (includeMatch) return `External speakers include ${includeMatch.trim()}.`;

  const companySpeakers = text.match(/\bpeople from ([^.?!\n]+?) (?:will come|coming|come to speak|speaking)/i)?.[1];
  if (companySpeakers) return `Speakers from ${companySpeakers.trim()}.`;
  if (/\bexternal (?:guest )?speakers?\b/i.test(text)) return "External guest speakers will attend; details to be confirmed.";
  return undefined;
}

function extractExplicitDate(text: string) {
  const confirmed = text.match(/\bconfirmed\s+([^.\n]+)/i)?.[1];
  if (confirmed) return confirmed.trim();
  return inferDate(text);
}

function extractOrganiserName(text: string) {
  return text.match(/\bI,\s*([^,\n]{2,80}),\s*am the organiser\b/i)?.[1]?.trim();
}

function extractClubName(text: string) {
  return text.match(/\b(?:the\s+)?([A-Z][A-Za-z0-9 '&-]{2,80}\s+Club)\s+is making the request\b/)?.[1]?.trim();
}

function extractContactPhone(text: string) {
  const contact = text.match(/\bcall\s+([+0-9][0-9 ()-]{7,})\s+which will phone my deputy,\s*([^,.]+)/i);
  if (contact?.[1]) {
    return `${contact[1].trim()} (${contact[2]?.trim() ? `${contact[2].trim()}, deputy` : "deputy contact"})`;
  }
  return text.match(/\b(?:mobile|phone|call)\s*(?:is|:)?\s*([+0-9][0-9 ()-]{7,})\b/i)?.[1]?.trim();
}

function extractAudience(text: string) {
  const audience = text.match(/\baudience\s+(?:is|will be|:)?\s*([^.\n]+)/i)?.[1];
  if (audience) return audience.trim();
  const external = text.match(/\b(\d{1,4})\s+external\s+([^.\n]+?)(?:\s+(?:will|are|from)\b|[.\n]|$)/i);
  if (external?.[1]) return `${external[1].trim()} external ${external[2].trim()}`;
  return undefined;
}

function extractPreferredVenue(text: string) {
  const preferred = text.match(/\bpreferred venue\s+(?:is|:)?\s*([^.\n]+)/i)?.[1];
  if (preferred) return preferred.trim();
  if (/\bnuffield hall\b/i.test(text)) return "Nuffield Hall";
  if (/\bLT\s*18\b/i.test(text) && /\bLT\s*19\b/i.test(text)) return "LT18 / LT19";
  return undefined;
}

function extractFoodServiceWindow(text: string) {
  const food = text.match(/\bfood will be served\s+([^.\n]+)/i)?.[1];
  if (food) return `Food will be served ${food.trim()}.`;
  return undefined;
}

function extractAlcoholWindow(text: string) {
  const alcohol = text.match(/\balcohol\s+(?:from|starting|available from)\s+([^,.\n]+)/i)?.[1];
  if (alcohol) return `Alcohol from ${alcohol.trim()} onwards.`;
  return undefined;
}

function extractCloakroom(text: string) {
  if (!/\bcloakroom\b/i.test(text)) return undefined;
  const time = text.match(/\b(?:open|opens|opening|together with the cloakroom)\s+(?:at|from)?\s*(\d{1,2}(?::\d{2})?\s*(?:am|pm)?)\b/i)?.[1];
  return time ? `Cloakroom required from ${time.trim()}.` : "Cloakroom required.";
}

function extractFilming(text: string) {
  if (/\boutside filming\b/i.test(text)) return "Outside filming planned.";
  if (/\bfilming\b/i.test(text)) return "Filming planned.";
  return undefined;
}

function extractEventFormat(text: string) {
  const format = text.match(/\bevent will be a\s+([^.\n]+)/i)?.[1];
  if (!format) return undefined;
  return format
    .split(/\s+with\s+/i)
    .map((part) => part.trim())
    .filter(Boolean)
    .join(" with ");
}

function buildEventDetailsSummary(eventRequest: EventReadinessEventRequest) {
  const details = normaliseText(eventRequest.fields.event_details);
  if (details && !isUncertaintyValue(details)) return undefined;
  const parts = [
    normaliseText(eventRequest.fields.event_title),
    normaliseText(eventRequest.fields.event_type),
    hasMeaningfulValue(eventRequest.fields.number_of_attendees)
      ? `${eventRequest.fields.number_of_attendees} attendees`
      : undefined,
    normaliseText(eventRequest.fields.activities),
    normaliseText(eventRequest.fields.external_guest_speaker_details),
    normaliseText(eventRequest.fields.space_and_setup)
  ].filter((part): part is string => Boolean(part));
  if (parts.length < 2) return undefined;
  return `Event summary: ${parts.join("; ")}.`;
}

function markFinalDeclines(eventRequest: EventReadinessEventRequest, message: string) {
  if (!userSaysNoMoreInfoPattern.test(message)) return;
  setFieldIfUseful(
    eventRequest,
    "additional_information",
    "No additional information provided; organiser asked to treat current details as final.",
    "final",
    false
  );
  if (hasMeaningfulValue(eventRequest.fields.activities)) {
    eventRequest.field_status.activities = "final";
  }
  if (hasMeaningfulValue(eventRequest.fields.space_and_setup)) {
    eventRequest.field_status.space_and_setup = "final";
  }
}

function applySessionFacts(
  eventRequest: EventReadinessEventRequest,
  transcript: EventReadinessChatRequest["transcript"],
  message: string
) {
  const next: EventReadinessEventRequest = {
    ...eventRequest,
    fields: { ...eventRequest.fields },
    field_status: { ...eventRequest.field_status }
  };
  const fullText = transcriptText(transcript, message);
  const lower = fullText.toLowerCase();
  const latestLower = message.toLowerCase();

  const attendance = extractAttendance(fullText);
  if (attendance) setFieldIfUseful(next, "number_of_attendees", attendance, "best_estimate");

  const organiser = extractOrganiserName(fullText);
  if (organiser) setFieldIfUseful(next, "organiser_name", organiser, "final");

  const club = extractClubName(fullText);
  if (club) setFieldIfUseful(next, "club_or_programme_affiliation", club, "final");

  const contact = extractContactPhone(fullText);
  if (contact) setFieldIfUseful(next, "contact_mobile_phone", contact, "final");

  const title = extractQuotedTitle(fullText);
  if (title) setFieldIfUseful(next, "event_title", title, "final");

  const timeRange = extractTimeRange(fullText);
  if (timeRange) setFieldIfUseful(next, "start_finish_time", timeRange, "final");

  const explicitDate = extractExplicitDate(fullText);
  if (explicitDate) {
    setFieldIfUseful(next, "date", explicitDate, "final");
  } else if (/\bexactly\s+6 months from today\b/i.test(fullText)) {
    setFieldIfUseful(next, "date", "Exactly 6 months from today.", "best_estimate");
  } else if (/\b6 months\b/i.test(fullText)) {
    setFieldIfUseful(next, "date", "In 6 months.", "best_estimate");
  } else if (/\b2 months\b/i.test(fullText)) {
    setFieldIfUseful(next, "date", "In 2 months.", "best_estimate");
  }

  const explicitFormat = extractEventFormat(fullText);
  if (explicitFormat) setFieldIfUseful(next, "event_type", explicitFormat, "final");
  if (lower.includes("conference")) setFieldIfUseful(next, "event_type", "Conference", "final");
  if (lower.includes("workshop")) setFieldIfUseful(next, "event_type", "Workshop", "final");
  if (lower.includes("panel")) setFieldIfUseful(next, "event_type", "Panel", "final");

  const audience = extractAudience(fullText);
  if (audience) setFieldIfUseful(next, "audience", audience, "best_estimate", true);

  const activityMatches = [
    lower.includes("panel") ? "panels" : undefined,
    lower.includes("mixer") ? "mixers" : undefined,
    lower.includes("discussion") ? "discussions" : undefined,
    lower.includes("networking") ? "networking" : undefined,
    lower.includes("workshop") ? "workshop sessions" : undefined
  ].filter((item): item is string => Boolean(item));
  if (activityMatches.length > 0) {
    setFieldIfUseful(next, "activities", activityMatches.join(", "), "final");
  }

  if (/\bexternal\b.{0,40}\b(attendees?|guests?|speakers?)\b/i.test(fullText) || /\bpeople from\b/i.test(fullText)) {
    setFieldIfUseful(next, "has_external_guest_speakers", "Yes", "final");
    setFieldIfUseful(next, "external_guest_speaker_details", extractSpeakerList(fullText) ?? "External guests/speakers will attend.", "final");
  }
  const speakerList = extractSpeakerList(fullText);
  if (speakerList) setFieldIfUseful(next, "external_guest_speaker_details", speakerList, "final", true);
  if (speakerList) setFieldIfUseful(next, "has_external_guest_speakers", "Yes", "final", true);
  if (hasPoliticalRiskSignal(fullText)) {
    const detail = speakerList && /\b(saruman|sauron)\b/i.test(speakerList)
      ? `${speakerList} Organiser described some speakers/topics as politically sensitive.`
      : "Organiser described politically sensitive or controversial content.";
    setFieldIfUseful(next, "politically_sensitive_or_controversial", detail, "final", true);
  }
  if (/\bnone of them are (?:vips|vip|politically sensitive)\b/i.test(fullText)) {
    setFieldIfUseful(next, "politically_sensitive_or_controversial", "No VIP or politically sensitive speakers indicated.", "final", true);
  }

  const spaceTerms = [];
  if (lower.includes("nuffield")) spaceTerms.push("Nuffield Hall");
  if (lower.includes("the hive") || lower.includes(" hive")) spaceTerms.push("The Hive");
  if (lower.includes("lecture theatre") || lower.includes("lecture theatres")) spaceTerms.push("lecture theatres");
  if (lower.includes("multi-room") || lower.includes("multiple rooms")) spaceTerms.push("multiple rooms");
  if (lower.includes("large event hall")) spaceTerms.push("large event hall");
  if (spaceTerms.length > 0) setFieldIfUseful(next, "space_and_setup", spaceTerms.join(", "), "final", latestLower.includes("space") || latestLower.includes("room"));
  const preferredVenue = extractPreferredVenue(fullText);
  if (preferredVenue) {
    setFieldIfUseful(next, "preferred_venue", preferredVenue, "final", true);
    setFieldIfUseful(next, "space_and_setup", preferredVenue, "final", true);
  }

  const registration = extractRegistrationDesk(fullText);
  if (registration) setFieldIfUseful(next, "registration_desk", registration, registration.includes("needs confirmation") ? "needs_confirmation" : "final", true);

  const foodWindow = extractFoodServiceWindow(fullText);
  if (/\b(no|won't|will not)\b.{0,20}\b(food|catering)\b/i.test(fullText)) {
    setFieldIfUseful(next, "catering", "No catering/food requested.", "not_applicable", true);
  } else if (foodWindow) {
    setFieldIfUseful(next, "catering", foodWindow, "final", true);
  } else if (/\b(catering|food|lunch|dinner|breakfast)\b/i.test(fullText)) {
    setFieldIfUseful(next, "catering", "Catering requested.", "final");
  }
  const alcoholWindow = extractAlcoholWindow(fullText);
  if (/\b(alcohol|beer|wine|drinks)\b/i.test(fullText)) {
    setFieldIfUseful(next, "alcohol", alcoholWindow ?? "Alcohol will be available for consumption.", "final", true);
  }

  if (/\bnoise\b/i.test(fullText) || /\b(alcohol|beer|wine)\b.{0,60}\bnoise\b/i.test(fullText)) {
    const line = lastUsefulLine(fullText);
    setFieldIfUseful(next, "noise_impact", line?.includes("noise") ? line : "Noise expected based on organiser description.", "final", true);
  }

  const cloakroom = extractCloakroom(fullText);
  if (cloakroom) setFieldIfUseful(next, "cloakroom", cloakroom, "final", true);

  const filming = extractFilming(fullText);
  if (filming) {
    setFieldIfUseful(next, "filming", filming, "final", true);
    setFieldIfUseful(next, "filming_details", filming, "final", true);
  }

  if (/\b(no finance code|finance code (?:is )?(?:missing|unknown|not provided)|not exist in .*finance|no .*cost cent(?:er|re))\b/i.test(fullText)) {
    next.field_status.finance_code = "needs_confirmation";
    setFieldIfUseful(
      next,
      "additional_information",
      "No finance code was provided or found for this event; confirm with the club treasurer or SA Finance before Campus Groups setup.",
      "needs_confirmation",
      true
    );
  }

  markFinalDeclines(next, message);
  const summary = buildEventDetailsSummary(next);
  if (summary) setFieldIfUseful(next, "event_details", summary, "final", false);

  return applyOperationalDefaults(next, fullText);
}

export function detectEntryType(prompt: string): EntryType {
  const text = prompt.toLowerCase();
  if (prompt.split(/\r?\n/).length >= 4 || text.includes("space request") || text.includes("draft")) {
    return "pasted_draft";
  }
  if (text.includes("budget") && (text.includes("no idea") || text.includes("what event") || text.includes("idea"))) {
    return "budget_only_no_event_idea";
  }
  if (/\b\d{2,4}\b/.test(text) || text.includes("speaker") || text.includes("lecture theatre") || text.includes("catering")) {
    return "prepared_event_request";
  }
  return "general_event_idea";
}

function extractAttendance(prompt: string, scenario?: EventScenario) {
  if (typeof scenario?.expected_attendance === "number") return scenario.expected_attendance;
  const audienceMatch = prompt.match(/\b(?:audience|attendance|expected attendance|scale)\s+(?:is|will be|:)?\s*(?:around|about|approximately|approx\.?|~)?\s*(\d{1,4})\b/i);
  if (audienceMatch?.[1]) return Number(audienceMatch[1]);
  const unitMatch = prompt.match(/\b(\d{1,4})\s*(?:people|attendees|guests|students|users|persons)\b/i);
  if (unitMatch?.[1]) return Number(unitMatch[1]);
  return undefined;
}

function inferEventTitle(prompt: string, entryType: EntryType) {
  const text = prompt.toLowerCase();
  if (text.includes("alumni panel")) return "Alumni panel";
  if (text.includes("careers panel")) return "Careers panel";
  if (text.includes("workshop")) return "Workshop";
  if (text.includes("lunch")) return "Lunch event";
  if (entryType === "budget_only_no_event_idea") return "Needs event concept";
  return "";
}

function inferEventType(prompt: string, entryType: EntryType) {
  const text = prompt.toLowerCase();
  if (text.includes("panel")) return "Panel";
  if (text.includes("workshop")) return "Workshop";
  if (text.includes("lunch")) return "Lunch";
  if (text.includes("reception")) return "Reception";
  if (entryType === "budget_only_no_event_idea") return "Help me decide";
  return "";
}

function inferDate(prompt: string) {
  const explicit = prompt.match(/\b(?:\d{1,2}[/-]\d{1,2}(?:[/-]\d{2,4})?|\d{1,2}\s+[A-Z][a-z]+(?:\s+\d{4})?)\b/);
  if (explicit) return explicit[0];
  if (prompt.toLowerCase().includes("next month")) return "next month";
  return "";
}

function inferInitialFields(prompt: string, entryType: EntryType, scenario?: EventScenario) {
  const text = prompt.toLowerCase();
  const attendance = extractAttendance(prompt, scenario);
  const hasExternalSpeaker = text.includes("external") || text.includes("guest speaker");
  const hasCatering = text.includes("catering") || text.includes("lunch") || text.includes("food") || text.includes("drinks");
  const hasBudget = hasFinanceSignal(prompt);
  const fields: Record<string, unknown> = {
    event_title: inferEventTitle(prompt, entryType),
    event_type: inferEventType(prompt, entryType),
    event_details: prompt,
    number_of_attendees: attendance,
    date: inferDate(prompt),
    has_external_guest_speakers: hasExternalSpeaker ? "Yes" : "",
    external_guest_speaker_details: hasExternalSpeaker ? "External speaker details need confirmation" : "Not applicable",
    politically_sensitive_or_controversial: hasPoliticalRiskSignal(prompt)
      ? "Potentially sensitive or controversial topic; context needs confirmation"
      : "No political or controversial indicators surfaced from the organiser's description.",
    children_attending: text.includes("children") ? "Yes, details need confirmation" : "Not applicable",
    activities: text.includes("workshop") ? "Workshop activities" : "",
    noise_impact: text.includes("noise") ? "Noise expected based on organiser description." : "",
    space_and_setup: text.includes("lecture theatre")
      ? "Lecture theatre"
      : text.includes("multi-room")
        ? "Multi-room setup"
        : "",
    registration_desk: text.includes("registration") ? "Yes, timing needs confirmation" : "",
    decorations: "",
    catering: hasCatering || hasBudget ? "Catering/budget needs to be confirmed with finance-code awareness" : "",
    alcohol: text.includes("alcohol") || text.includes("drinks") ? "Needs confirmation" : "",
    recorded_music: "not applicable",
    live_music: "not applicable",
    cloakroom: "",
    outside_equipment: text.includes("booth") || text.includes("equipment") ? "Needs confirmation" : "",
    filming: text.includes("filming") || text.includes("record") ? "Needs confirmation" : "",
    filming_details: text.includes("filming") || text.includes("record") ? "Needs confirmation" : "Not applicable",
    additional_information: compactText([hasBudget ? "Budget is involved; finance-code lookup must be surfaced." : undefined])
  };

  if (entryType === "budget_only_no_event_idea") {
    fields.event_details = "Budget-only starting point; event concept needs shaping.";
    fields.event_title = "Needs event concept";
    fields.event_type = "Help me decide";
    fields.catering = "Budget is involved; finance-code lookup must be surfaced if catering or event spend is planned.";
  }

  return fields;
}

function normaliseConcreteStatuses(eventRequest: EventReadinessEventRequest) {
  const next: EventReadinessEventRequest = {
    ...eventRequest,
    fields: { ...eventRequest.fields },
    field_status: { ...eventRequest.field_status }
  };

  for (const [key, status] of Object.entries(next.field_status)) {
    const value = next.fields[key];
    if (status === "needs_confirmation" && hasMeaningfulValue(value) && !isUncertaintyValue(value)) {
      next.field_status[key] = isNegativeValue(value) ? "not_applicable" : "final";
    }
    if (status === "final" && isNegativeValue(value) && miscellaneousFieldKeys.has(key)) {
      next.field_status[key] = "not_applicable";
    }
  }

  return next;
}

function applyOperationalDefaults(eventRequest: EventReadinessEventRequest, contextText: string) {
  const next = normaliseConcreteStatuses(eventRequest);
  if (!hasCoreEventContext(next)) return next;

  if (!hasMeaningfulValue(next.fields.politically_sensitive_or_controversial)) {
    if (!hasPoliticalRiskSignal(contextText)) {
      next.fields.politically_sensitive_or_controversial =
        "No political or controversial indicators surfaced from the organiser's description.";
      next.field_status.politically_sensitive_or_controversial = "final";
    }
  } else if (!hasPoliticalRiskSignal(normaliseText(next.fields.politically_sensitive_or_controversial))) {
    next.field_status.politically_sensitive_or_controversial = "final";
  }

  for (const [key, defaultValue] of Object.entries(lowProbabilityDefaultFields)) {
    if (!hasMeaningfulValue(next.fields[key])) {
      next.fields[key] = defaultValue.value;
      next.field_status[key] = defaultValue.status;
    }
  }

  return normaliseConcreteStatuses(next);
}

function inferStatus(key: string, value: unknown): FieldStatus {
  if (!hasMeaningfulValue(value)) return "missing";
  const text = normaliseText(value).toLowerCase();
  if (text === "not applicable") return "not_applicable";
  if (text.includes("not sure")) return "not_sure_yet";
  if (text.includes("needs confirmation") || text.includes("need confirmation")) return "needs_confirmation";
  if (text.includes("help me decide")) return "not_sure_yet";
  if (key === "number_of_attendees" && typeof value === "number") return "best_estimate";
  if (key === "date" && text === "next month") return "best_estimate";
  return "final";
}

function mergeEventRequest(
  base: EventReadinessEventRequest | undefined,
  inferredFields: Record<string, unknown>,
  officialFields: SpaceRequestField[]
): EventReadinessEventRequest {
  const fields = {
    ...(base?.fields ?? {}),
    ...Object.fromEntries(Object.entries(inferredFields).filter(([, value]) => hasMeaningfulValue(value)))
  };
  const fieldStatus: Record<string, FieldStatus> = { ...(base?.field_status ?? {}) };

  for (const field of officialFields) {
    const existingStatus = fieldStatus[field.key];
    if (existingStatus && existingStatus !== "missing") continue;
    fieldStatus[field.key] = inferStatus(field.key, fields[field.key]);
  }

  return normaliseEventRequestFinanceCode(applyOperationalDefaults(
    {
      ...(base ?? {}),
      fields,
      field_status: fieldStatus
    },
    Object.values(fields).join(" ")
  ));
}

function buildCoverage(eventRequest: EventReadinessEventRequest, officialFields: SpaceRequestField[]) {
  const coverage: CoverageItem[] = officialFields.map((field) => {
    const status = eventRequest.field_status[field.key] ?? "missing";
    return {
      ...field,
      status,
      value: eventRequest.fields[field.key],
      ready: allowedReadyStatuses.has(status)
    };
  });
  const readyCount = coverage.filter((item) => item.ready).length;
  const missing = coverage.filter((item) => !item.ready);

  return {
    total_fields: coverage.length,
    ready_fields: readyCount,
    missing_fields: missing.length,
    phase_1_ready: missing.length === 0,
    items: coverage
  };
}

function buildNextQuestions(
  coverage: ReturnType<typeof buildCoverage>,
  eventRequest: EventReadinessEventRequest,
  prompt: string
) {
  const missingItems = coverage.items.filter((item) => !item.ready);
  if (missingItems.length === 0) return [];

  const miscItems = missingItems.filter((item) => miscellaneousFieldKeys.has(item.key));
  const coreItems = missingItems.filter((item) => !miscellaneousFieldKeys.has(item.key));
  const groupedCoreItems = coreItems.filter((item) => !foodAndDrinkFieldKeys.has(item.key));
  const foodAndDrinkItems = coreItems.filter((item) => foodAndDrinkFieldKeys.has(item.key));
  const financeItem = missingItems.find((item) => item.key === "finance_code");
  const shouldAskFinanceCode = financeItem && !eventRequest.financeCode && hasFinanceSignal(`${prompt} ${Object.values(eventRequest.fields).join(" ")}`);
  const priorityItems = shouldAskFinanceCode
    ? [financeItem, ...groupedCoreItems.filter((item) => item.key !== "finance_code")]
    : groupedCoreItems;
  const questions = priorityItems.slice(0, 4).map((item) => ({
      field_key: item.key,
      label: item.label,
      category: item.category,
      question: item.key === "finance_code"
        ? "What finance or cost-centre code should the club treasurer confirm for this event?"
        : missingQuestionByField[item.key] ?? `What should LBS know for ${item.label}?`,
      options: ["Other", "Not sure yet", "Needs confirmation"]
  }));

  if (foodAndDrinkItems.length > 0 && questions.length < 5) {
    questions.push({
      field_key: "food_and_drink",
      label: "Food and drink",
      category: "catering",
      question: "What should we plan for food and drink: catering, alcohol, both, or neither?",
      options: ["Catering and alcohol", "Catering only", "Alcohol only", "Neither", "Not sure yet"]
    });
  }

  if (miscItems.length > 0 && questions.length < 5) {
    questions.push({
      field_key: "miscellaneous_services",
      label: "Miscellaneous Space Request fields",
      category: "services",
      question:
        "Unless any apply, I will mark these as not present: children attending, decorations, recorded/live music, cloakroom, hired equipment, and filming. Do any of those apply?",
      options: ["None of these apply", "Some apply", "Not sure yet", "Needs confirmation"]
    });
  }

  return questions;
}

function buildGuidanceFlags(prompt: string, eventRequest: EventReadinessEventRequest, entryType: EntryType) {
  const text = `${prompt} ${Object.values(eventRequest.fields).join(" ")}`.toLowerCase();
  const flags = [];

  if (/\b(budget|spend|cost|finance|treasury|ticketing|sponsorship|sponsor|catering|alcohol|beer|wine)\b/.test(text)) {
    flags.push({
      type: "finance_code",
      label: "Finance-code guidance should be surfaced",
      rationale: "Spend, catering, alcohol, ticketing, sponsorship, or treasury context may require finance-code awareness."
    });
  }

  if (entryType === "budget_only_no_event_idea") {
    flags.push({
      type: "toolkit_shaping",
      label: "Use toolkit shaping before operational details",
      rationale: "Budget-only users need help clarifying objective, audience, constraints, resources, and success signal."
    });
  }

  if (hasPoliticalRiskSignal(text)) {
    flags.push({
      type: "security_timeline",
      label: "Political or sensitive topic needs security/timeline guidance",
      rationale: "Sensitive topics are not standalone Key Event triggers, but they materially affect planning."
    });
  }

  if (text.includes("lecture theatre") || text.includes("multi-room") || text.includes("multiple rooms") || text.includes("space") || text.includes("nuffield") || text.includes("hive")) {
    flags.push({
      type: "space_lookup",
      label: "Space Matrix should be checked first",
      rationale: "Room and setup guidance should use Space Matrix before fallback sources."
    });
  }

  return flags;
}

export function getEventReadinessBootstrap() {
  return {
    source_of_truth: {
      field_source: "lbs-files/raw/request-event/CribSheet - Copy.docx",
      processed_field_map: "lbs-files/processed/request-event/space_request_fields.json",
      question_flow: "lbs-files/processed/request-event/event_profile_question_flow.json",
      note: "WS4 EventRequest schemas and endpoints are historical only and are not authoritative for this page."
    },
    field_statuses: Array.from(allowedReadyStatuses).concat("missing"),
    official_fields: getSpaceRequestFields(),
    question_flow: getQuestionFlow(),
    scenarios: getScenarios(),
    epics: phase1Epics,
    features: phase1Features,
    user_stories: phase1UserStories
  };
}

export function applyAiTurnToEventRequest(
  eventRequest: EventReadinessEventRequest | undefined,
  aiTurn: EventReadinessAiTurn
): EventReadinessEventRequest {
  const fields = { ...(eventRequest?.fields ?? {}) };
  const fieldStatus = { ...(eventRequest?.field_status ?? {}) };

  for (const update of aiTurn.field_updates) {
    fields[update.key] = update.value;
    fieldStatus[update.key] = update.status;
  }

  return normaliseEventRequestFinanceCode(applyOperationalDefaults(
    {
      ...(eventRequest ?? {}),
      fields,
      field_status: fieldStatus
    },
    Object.values(fields).join(" ")
  ));
}

export function applySessionMemoryToEventRequest(
  eventRequest: EventReadinessEventRequest | undefined,
  transcript: EventReadinessChatRequest["transcript"],
  message: string
) {
  return normaliseEventRequestFinanceCode(
    applySessionFacts(eventRequest ?? { fields: {}, field_status: {} }, transcript, message),
    message
  );
}

export function evaluateEventRequestState(
  eventRequest: EventReadinessEventRequest,
  prompt: string,
  entryType: EntryType
) {
  const normalisedEventRequest = normaliseEventRequestFinanceCode(eventRequest, prompt);
  const coverage = buildCoverage(normalisedEventRequest, getSpaceRequestFields());
  return {
    entry_type: entryType,
    event_request: normalisedEventRequest,
    coverage,
    next_questions: buildNextQuestions(coverage, normalisedEventRequest, prompt),
    guidance_flags: buildGuidanceFlags(prompt, normalisedEventRequest, entryType),
    source_guidance: buildSourceGuidance(prompt, normalisedEventRequest, entryType),
    key_event_assessment: assessKeyEvent(normalisedEventRequest),
    post_space_guidance: buildPostSpaceRequestGuidance(normalisedEventRequest, prompt),
    source_notes: [
      "Coverage is evaluated against the active processed CribSheet field map.",
      "Allowed uncertainty markers count as proceed-ready; missing does not.",
      "The model can propose field updates, but readiness is checked deterministically afterward."
    ]
  };
}

export function evaluateEventReadiness(input: EventReadinessEvaluateRequest) {
  const officialFields = getSpaceRequestFields();
  const scenarios = getScenarios();
  const scenario = input.scenario_id ? scenarios.find((item) => item.id === input.scenario_id) : undefined;
  const prompt = input.prompt ?? scenario?.prompt ?? "";
  const entryType = detectEntryType(prompt);
  const inferredFields = inferInitialFields(prompt, entryType, scenario);
  const eventRequest = mergeEventRequest(input.event_request, inferredFields, officialFields);
  return evaluateEventRequestState(eventRequest, prompt, entryType);
}
