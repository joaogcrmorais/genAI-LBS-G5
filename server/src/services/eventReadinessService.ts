import fs from "node:fs";
import path from "node:path";
import type {
  EntryType,
  EventReadinessAiTurn,
  EventReadinessEvaluateRequest,
  EventReadinessEventRequest,
  FieldStatus
} from "../schemas/eventReadiness.js";

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
  catering: "Will catering be ordered or budgeted?",
  alcohol: "Will alcohol be available?",
  recorded_music: "Will recorded music be played?",
  live_music: "Will live music be played?",
  cloakroom: "Do you need a cloakroom?",
  outside_equipment: "Will outside or extra equipment be hired or brought in?",
  filming: "Will filming take place?",
  filming_details: "What will be filmed, and by whom?",
  additional_information: "Is there any extra context LBS should preserve?"
};

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
  return /\b(political|controversial|sensitive topic|protest|minister|embassy|ambassador|election|campaign|war|conflict|activist)\b/.test(
    lower
  );
}

const userStories = [
  {
    epic: "E-01",
    story: "US-01",
    title: "Prepared event request",
    acceptance: [
      "Identify provided event type, timing, attendance, speaker, venue, catering, budget, or AV details.",
      "Do not ask for the same detail again unless it is unclear.",
      "Ask no more than three related follow-up questions by default."
    ]
  },
  {
    epic: "E-01",
    story: "US-02",
    title: "Budget-only user",
    acceptance: [
      "Ask about objective, audience, constraints, resources, and success signal.",
      "Suggest suitable formats in later guided flow.",
      "Raise finance-code implications because budget is involved.",
      "Continue even if the initial idea is weak."
    ]
  },
  {
    epic: "E-02",
    story: "US-04",
    title: "Working event profile",
    acceptance: [
      "Each evaluation updates the EventRequest.",
      "Every official CribSheet field has a value or explicit marker before Phase 1 ends.",
      "Additional context is preserved.",
      "No numeric completeness score is shown or required."
    ]
  },
  {
    epic: "E-02",
    story: "US-05",
    title: "Proceed-readiness",
    acceptance: [
      "All official fields from the CribSheet source are covered.",
      "Values may be final, best estimate, not sure yet, needs confirmation, not applicable, or organiser follow-up.",
      "Phase 1 completion creates the source EventRequest for downstream logic."
    ]
  }
];

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
  const match = prompt.match(/\b(\d{1,4})\s*(?:people|attendees|guests|students|person|persons)?\b/i);
  return match ? Number(match[1]) : undefined;
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
  const hasBudget = text.includes("budget") || /£|\bgpb\b|\bgbp\b/i.test(prompt);
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

  return applyOperationalDefaults(
    {
      ...(base ?? {}),
      fields,
      field_status: fieldStatus
    },
    Object.values(fields).join(" ")
  );
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

function buildNextQuestions(coverage: ReturnType<typeof buildCoverage>) {
  const missingItems = coverage.items.filter((item) => !item.ready);
  if (missingItems.length === 0) return [];

  const miscItems = missingItems.filter((item) => miscellaneousFieldKeys.has(item.key));
  const coreItems = missingItems.filter((item) => !miscellaneousFieldKeys.has(item.key));
  const questions = coreItems.slice(0, 4).map((item) => ({
      field_key: item.key,
      label: item.label,
      category: item.category,
      question: missingQuestionByField[item.key] ?? `What should LBS know for ${item.label}?`,
      options: ["Other", "Not sure yet", "Needs confirmation"]
  }));

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

  if (text.includes("budget") || text.includes("catering/budget")) {
    flags.push({
      type: "finance_code",
      label: "Finance-code lookup should be surfaced",
      rationale: "Budget is involved, and project scope says finance-code lookup must appear whenever budget is involved."
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

  if (text.includes("lecture theatre") || text.includes("multi-room") || text.includes("space")) {
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
    user_stories: userStories
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

  return applyOperationalDefaults(
    {
      ...(eventRequest ?? {}),
      fields,
      field_status: fieldStatus
    },
    Object.values(fields).join(" ")
  );
}

export function evaluateEventRequestState(
  eventRequest: EventReadinessEventRequest,
  prompt: string,
  entryType: EntryType
) {
  const coverage = buildCoverage(eventRequest, getSpaceRequestFields());
  return {
    entry_type: entryType,
    event_request: eventRequest,
    coverage,
    next_questions: buildNextQuestions(coverage),
    guidance_flags: buildGuidanceFlags(prompt, eventRequest, entryType),
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
