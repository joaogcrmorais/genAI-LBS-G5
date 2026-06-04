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
  docx_generation_rule?: string;
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
  children_details: {
    value: "Not applicable because no children are indicated.",
    status: "not_applicable"
  },
  decorations: {
    value: "No decorations indicated; treated as not present for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  alcohol: {
    value: "No alcohol indicated; treated as not present for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  noise_disruption: {
    value: "No noise or disruption indicated; treated as not present for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  outside_equipment: {
    value: "No outside or extra hired equipment indicated; treated as not present for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  filming: {
    value: "No filming or photography indicated; treated as not taking place for this draft unless the organiser revises.",
    status: "not_applicable"
  },
  streaming_media: {
    value: "No movie, TV, or live TV streaming indicated; treated as not present for this draft unless the organiser revises.",
    status: "not_applicable"
  }
};

const declarationDefaultFields: Record<string, { value: string; status: FieldStatus }> = {
  declaration_space_not_confirmed: {
    value: "Needs confirmation before the organiser sends the form to Space Management.",
    status: "needs_confirmation"
  },
  declaration_key_events_meeting: {
    value: "Needs confirmation before the organiser sends the form to Space Management.",
    status: "needs_confirmation"
  },
  declaration_catering_final_numbers: {
    value: "Needs confirmation before the organiser sends the form to Space Management.",
    status: "needs_confirmation"
  },
  declaration_guest_list_security: {
    value: "Needs confirmation before the organiser sends the form to Space Management.",
    status: "needs_confirmation"
  },
  declaration_approval_confirmed: {
    value: "Needs confirmation before the organiser sends the form to Space Management.",
    status: "needs_confirmation"
  }
};

const miscellaneousFieldKeys = new Set([
  "children_attending",
  "children_details",
  "decorations",
  "alcohol",
  "noise_disruption",
  "outside_equipment",
  "filming",
  "streaming_media"
]);

const declarationFieldKeys = new Set([
  "declaration_space_not_confirmed",
  "declaration_key_events_meeting",
  "declaration_catering_final_numbers",
  "declaration_guest_list_security",
  "declaration_approval_confirmed"
]);

const missingQuestionByField: Record<string, string> = {
  organiser_name: "Who is the named organiser for the request?",
  project_manager: "Who is the project manager, if different from the organiser?",
  deputy_event_organiser: "Who is the deputy event organiser, if one has been appointed?",
  organiser_lbs_email: "What LBS email address should be used for the organiser?",
  contact_number: "What phone number should LBS use for urgent event questions?",
  school_affiliation: "Which club, programme, or school affiliation is this for?",
  event_title: "What working title should appear on the Space Request?",
  expected_attendance: "How many attendees do you expect, even as a range or best estimate?",
  audience_types: "Who is the audience: current students, alumni, external guests, staff, VIPs, media, children, or another group?",
  event_date: "What date, month, or target window should LBS plan around?",
  setup_start_time: "What time do you expect setup to begin?",
  guest_arrival_time: "What time should guests arrive?",
  event_start_time: "What event start time should be used, even provisionally?",
  event_end_time: "What event end time should be used, even provisionally?",
  breakdown_complete_time: "What time should breakdown be complete?",
  event_type: "What format best describes the event?",
  event_purpose_context: "What is the purpose, subject, and intended outcome?",
  external_guest_speaker_details: "Who are the external speakers, if any?",
  politically_sensitive_or_controversial: "Could the topic be politically sensitive or controversial?",
  children_attending: "Will children under 18 attend?",
  children_details: "If children will attend, how many and what age range?",
  preferred_venue_type: "What venue type or preferred room should Space Management consider?",
  room_configuration: "What room configuration do you need, such as theatre, classroom, boardroom, cabaret, or reception?",
  additional_spaces_needed: "Do you need any additional spaces, such as registration, green room, cloakroom, storage, breakout rooms, or networking space?",
  welcome_registration: "Do you need a registration desk or Welcome Desk support, and at what time?",
  decorations: "Will you use decorations or branded setup?",
  catering: "Will catering be ordered or budgeted?",
  alcohol: "Will alcohol be available?",
  audio_visual_requirements: "What AV requirements should be captured?",
  noise_disruption: "Could any activity create noise or disruption?",
  outside_equipment: "Will outside or extra equipment be hired or brought in?",
  filming: "Will filming or photography take place?",
  streaming_media: "Will you stream movies, TV shows, or live TV at the event?",
  submission_timing: "How far ahead of the event are you submitting this request?",
  late_submission_urgency: "If this is less than 4 weeks before the event, what explains the urgency?",
  additional_comments_special_requirements: "Is there any extra context or special requirement LBS should preserve?"
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
    hasMeaningfulValue(eventRequest.fields.event_purpose_context) ||
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
      "Every official updated Space Request Form field has a value or explicit marker before Phase 1 ends.",
      "Additional context is preserved.",
      "No numeric completeness score is shown or required."
    ]
  },
  {
    epic: "E-02",
    story: "US-05",
    title: "Proceed-readiness",
    acceptance: [
      "All official fields from the updated Space Request Form source are covered.",
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
  const hasBudget = text.includes("budget") || /\bgpb\b|\bgbp\b|\bpounds?\b/i.test(prompt);
  const hasExternalAudience =
    text.includes("external attendees") ||
    text.includes("external guests") ||
    text.includes("alumni") ||
    text.includes("industry partner") ||
    text.includes("public") ||
    text.includes("vip") ||
    text.includes("media");
  const fields: Record<string, unknown> = {
    event_title: inferEventTitle(prompt, entryType),
    event_type: inferEventType(prompt, entryType),
    event_purpose_context: prompt,
    expected_attendance: attendance,
    audience_types: hasExternalAudience ? "External audience indicated; exact audience mix needs confirmation." : "",
    event_date: inferDate(prompt),
    external_guest_speaker_details: hasExternalSpeaker ? "External speaker details need confirmation" : "Not applicable",
    politically_sensitive_or_controversial: hasPoliticalRiskSignal(prompt)
      ? "Potentially sensitive or controversial topic; context needs confirmation"
      : "No political or controversial indicators surfaced from the organiser's description.",
    children_attending: text.includes("children") ? "Yes, details need confirmation" : "Not applicable",
    children_details: text.includes("children") ? "Number and age range need confirmation" : "Not applicable",
    preferred_venue_type: text.includes("lecture theatre")
      ? "Lecture theatre"
      : text.includes("multi-room")
        ? "Multi-room setup"
        : "",
    room_configuration: text.includes("lecture theatre") ? "Theatre style" : "",
    additional_spaces_needed: text.includes("multi-room") ? "Breakout rooms or multiple spaces need confirmation" : "",
    welcome_registration: text.includes("registration") ? "Yes, timing needs confirmation" : "",
    decorations: "",
    catering: hasCatering || hasBudget ? "Catering/budget needs to be confirmed with finance-code awareness" : "",
    alcohol: text.includes("alcohol") || text.includes("drinks") ? "Needs confirmation" : "",
    audio_visual_requirements: hasExternalSpeaker || text.includes("panel") ? "Microphones/screen requirements need confirmation" : "",
    noise_disruption: text.includes("noise") ? "Noise expected based on organiser description." : "",
    outside_equipment: text.includes("booth") || text.includes("equipment") ? "Needs confirmation" : "",
    filming: text.includes("filming") || text.includes("record") || text.includes("photograph") ? "Needs confirmation" : "",
    streaming_media: text.includes("streaming") || text.includes("live tv") ? "Needs confirmation" : "",
    additional_comments_special_requirements: compactText([
      hasBudget ? "Budget is involved; finance-code lookup must be surfaced." : undefined
    ])
  };

  if (entryType === "budget_only_no_event_idea") {
    fields.event_purpose_context = "Budget-only starting point; event concept needs shaping.";
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

  for (const [key, defaultValue] of Object.entries(declarationDefaultFields)) {
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
  if (key === "expected_attendance" && typeof value === "number") return "best_estimate";
  if (key === "event_date" && text === "next month") return "best_estimate";
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
  const coreItems = missingItems.filter((item) => !miscellaneousFieldKeys.has(item.key) && !declarationFieldKeys.has(item.key));
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
      category: "important_considerations",
      question:
        "Unless any apply, I will mark these as not present: children attending, decorations, alcohol, noise/disruption, hired equipment, filming/photography, and streaming media. Do any of those apply?",
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

  if (
    text.includes("alumni") ||
    text.includes("external audience") ||
    text.includes("external guests") ||
    text.includes("industry partner") ||
    text.includes("public attendees") ||
    text.includes("vip") ||
    text.includes("media")
  ) {
    flags.push({
      type: "eventscase_email",
      label: "SA Operations / Eventscase email draft may be needed",
      rationale:
        "External audiences may need an Eventscase page; generate an editable draft only, and do not send it automatically."
    });
  }

  return flags;
}

export function getEventReadinessBootstrap() {
  const declarationFields = getSpaceRequestFields().filter((field) => declarationFieldKeys.has(field.key));
  return {
    source_of_truth: {
      field_source: "lbs-files/raw/request-event/Event form - Space Request Form.docx",
      completed_example_source: "lbs-files/raw/request-event/LBS Crib Sheet_AMC.docx",
      processed_field_map: "lbs-files/processed/request-event/space_request_fields.json",
      question_flow: "lbs-files/processed/request-event/event_profile_question_flow.json",
      note: "WS4 EventRequest schemas and endpoints are historical only and are not authoritative for this page."
    },
    declaration_output: {
      rule:
        "Declaration fields may remain needs_confirmation for DOCX generation. Show these declarations below the download output because sending the form to space@london.edu is when the organiser agrees to them.",
      fields: declarationFields.map((field) => ({ key: field.key, label: field.label }))
    },
    eventscase_email: {
      recipient: "saoperations@london.edu",
      subject_pattern: "Eventscase page request - [Event Name] - [Club Name]",
      trigger:
        "Generate or note this draft only when the audience includes external audiences who need an Eventscase page, such as alumni, external guests, corporate partners, public attendees, VIP/high-profile non-LBS guests, media, or other non-current-student external attendees.",
      non_trigger:
        "Do not trigger for current-students-only events or current-students-plus-children-only events; CampusGroups is the go-to channel for current-student audiences."
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
      "Coverage is evaluated against the active processed updated Space Request Form field map.",
      "Allowed uncertainty markers count as proceed-ready; missing does not.",
      "Declaration fields can remain needs_confirmation for DOCX generation but must be shown below the download output.",
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
