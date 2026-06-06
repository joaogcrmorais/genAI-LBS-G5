import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import {
  POST_PHASE1_MOCK_NOTICE,
  type ComplexityRiskResult,
  type MondayMockPayload,
  mondayMockPayloadSchema
} from "../schemas/postPhase1.js";
import { getSpaceRequestFields } from "./eventReadinessService.js";
import { classifyComplexityRisk } from "./complexityRiskService.js";
import { buildEisDraft } from "./eisDraftService.js";
import {
  buildPostPhase1Coverage,
  fieldText,
  getPostPhase1Fixtures,
  getRoutingRules
} from "./postPhase1DataService.js";
import { assessPostPhase1KeyEvent } from "./postPhase1KeyEventService.js";
import {
  getPostPhase1StakeholderDirectory,
  routePostPhase1Stakeholders
} from "./postPhase1StakeholderService.js";
import { buildStakeholderEmailDrafts } from "./stakeholderEmailDraftService.js";
import { buildTimelineChecklist } from "./timelineChecklistService.js";
import { normaliseEventRequestFinanceCode } from "./financeCodeService.js";
import { buildPostSpaceRequestGuidance } from "./postSpaceRequestGuidanceService.js";

function buildMondayMockPayload(
  eventRequest: EventReadinessEventRequest,
  keyEvent: ReturnType<typeof assessPostPhase1KeyEvent>,
  stakeholders: ReturnType<typeof routePostPhase1Stakeholders>["stakeholders"],
  risk: ComplexityRiskResult
): MondayMockPayload {
  return mondayMockPayloadSchema.parse({
    integration_target: "monday.com",
    integration_status: "mock_payload_ready",
    mock_notice: POST_PHASE1_MOCK_NOTICE,
    item_name: fieldText(eventRequest, "event_title") || "Untitled event",
    columns: {
      source_of_truth: "phase1_event_request",
      event_title: fieldText(eventRequest, "event_title"),
      organiser: fieldText(eventRequest, "organiser_name"),
      club_or_programme: fieldText(eventRequest, "club_or_programme_affiliation"),
      date: fieldText(eventRequest, "date"),
      time: fieldText(eventRequest, "start_finish_time"),
      expected_attendance: fieldText(eventRequest, "number_of_attendees"),
      key_event_candidate: keyEvent.key_event_candidate,
      key_event_trigger_type: keyEvent.trigger_type,
      stakeholder_count: stakeholders.length,
      required_stakeholders: stakeholders.filter((stakeholder) => stakeholder.priority === "required").map((stakeholder) => stakeholder.name),
      recommended_stakeholders: stakeholders.filter((stakeholder) => stakeholder.priority === "recommended").map((stakeholder) => stakeholder.name),
      complexity_status: risk.status,
      suggested_complexity: risk.suggested_complexity ?? "unknown",
      risk_flags: risk.risk_flags,
      finance_code: eventRequest.financeCode ?? fieldText(eventRequest, "finance_code"),
      mock_only: true
    },
    subitems: stakeholders.map((stakeholder) => ({
      name: `${stakeholder.name}: ${stakeholder.priority}`,
      owner_hint: stakeholder.name,
      status: stakeholder.priority,
      notes: stakeholder.reason
    }))
  });
}

function buildQaResults({
  coverage,
  keyEvent,
  eisRequired,
  stakeholders,
  emailDrafts,
  timelineItems,
  scenarioExpected
}: {
  coverage: ReturnType<typeof buildPostPhase1Coverage>;
  keyEvent: ReturnType<typeof assessPostPhase1KeyEvent>;
  eisRequired: boolean;
  stakeholders: ReturnType<typeof routePostPhase1Stakeholders>["stakeholders"];
  emailDrafts: ReturnType<typeof buildStakeholderEmailDrafts>;
  timelineItems: number;
  scenarioExpected?: ReturnType<typeof getPostPhase1Fixtures>[number]["expected"];
}) {
  const stakeholderNames = stakeholders.map((stakeholder) => stakeholder.name);
  const checks = [
    {
      id: "phase1-complete",
      label: "Phase 1 coverage complete",
      pass: coverage.phase_1_ready,
      detail: `${coverage.ready_fields}/${coverage.total_fields} fields ready.`
    },
    {
      id: "key-event",
      label: "Key Event expectation",
      pass: scenarioExpected ? keyEvent.key_event_candidate === scenarioExpected.key_event_candidate : true,
      detail: scenarioExpected
        ? `Expected ${scenarioExpected.key_event_candidate}, got ${keyEvent.key_event_candidate}.`
        : "No scenario expectation provided."
    },
    {
      id: "eis",
      label: "EIS expectation",
      pass: scenarioExpected ? eisRequired === scenarioExpected.eis_required : true,
      detail: scenarioExpected ? `Expected ${scenarioExpected.eis_required}, got ${eisRequired}.` : "No scenario expectation provided."
    },
    {
      id: "stakeholders",
      label: "Expected stakeholders routed",
      pass: scenarioExpected ? scenarioExpected.stakeholders.every((stakeholder) => stakeholderNames.includes(stakeholder)) : stakeholders.length > 0,
      detail: scenarioExpected
        ? `Expected: ${scenarioExpected.stakeholders.join(", ")}. Routed: ${stakeholderNames.join(", ")}.`
        : `${stakeholders.length} stakeholder(s) routed.`
    },
    {
      id: "emails",
      label: "Every routed stakeholder has an email draft",
      pass: emailDrafts.length === stakeholders.length && stakeholders.length > 0,
      detail: `${emailDrafts.length}/${stakeholders.length} email draft(s).`
    },
    {
      id: "timeline",
      label: "Timeline/checklist generated",
      pass: timelineItems > 0,
      detail: `${timelineItems} checklist item(s).`
    }
  ];

  return {
    checks,
    pass_count: checks.filter((check) => check.pass).length,
    fail_count: checks.filter((check) => !check.pass).length
  };
}

export function getPostPhase1Bootstrap() {
  return {
    source_of_truth: {
      event_request_schema: "lbs-files/processed/schemas/event_request.schema.json",
      field_source: "lbs-files/raw/request-event/CribSheet - Copy.docx",
      fixture_source: "lbs-files/processed/examples/post_phase1_event_requests.json",
      stakeholder_sources: [
        "lbs-files/processed/lifecycle/stakeholders_by_phase.csv",
        "lbs-files/processed/routing/stakeholder_routing_rules.json",
        "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md"
      ],
      note: "Post-Phase-1 outputs are POC/test artifacts only. Nothing is submitted, emailed, or sent to Monday.com."
    },
    official_fields: getSpaceRequestFields(),
    field_statuses: [
      "final",
      "best_estimate",
      "not_sure_yet",
      "needs_confirmation",
      "not_applicable",
      "organiser_follow_up",
      "missing"
    ],
    scenarios: getPostPhase1Fixtures(),
    stakeholder_directory: getPostPhase1StakeholderDirectory(),
    routing_rules: getRoutingRules(),
    qa_checklist: [
      "All 27 official CribSheet fields are ready.",
      "Key Event assessment matches scenario expectation.",
      "EIS draft appears only for Key Event candidates.",
      "Relevant real LBS stakeholders are routed.",
      "Every routed stakeholder gets an editable email draft.",
      "Timeline/checklist has source-labelled actions.",
      "Monday payload is mock-only.",
      "OpenAI complexity/risk can be skipped without breaking deterministic outputs."
    ]
  };
}

export async function runPostPhase1Flow(
  eventRequest: EventReadinessEventRequest,
  options: { run_ai_risk: boolean },
  scenarioExpected?: ReturnType<typeof getPostPhase1Fixtures>[number]["expected"]
) {
  const normalisedEventRequest = normaliseEventRequestFinanceCode(eventRequest);
  const coverage = buildPostPhase1Coverage(normalisedEventRequest);
  const keyEvent = assessPostPhase1KeyEvent(normalisedEventRequest);
  const eis = buildEisDraft(normalisedEventRequest, keyEvent);
  const routing = routePostPhase1Stakeholders(normalisedEventRequest, keyEvent);
  const emailDrafts = buildStakeholderEmailDrafts(normalisedEventRequest, routing.stakeholders, keyEvent);
  const timeline = buildTimelineChecklist(normalisedEventRequest, keyEvent, routing.stakeholders);
  const complexityRisk = await classifyComplexityRisk(normalisedEventRequest, keyEvent, routing.stakeholders, options.run_ai_risk);
  const mondayMock = buildMondayMockPayload(normalisedEventRequest, keyEvent, routing.stakeholders, complexityRisk);
  const postSpaceGuidance = buildPostSpaceRequestGuidance(normalisedEventRequest);
  const qa = buildQaResults({
    coverage,
    keyEvent,
    eisRequired: eis.required,
    stakeholders: routing.stakeholders,
    emailDrafts,
    timelineItems: timeline.items.length,
    scenarioExpected
  });

  return {
    mock_notice: POST_PHASE1_MOCK_NOTICE,
    coverage,
    key_event: keyEvent,
    eis,
    routing,
    email_drafts: emailDrafts,
    timeline,
    post_space_guidance: postSpaceGuidance,
    complexity_risk: complexityRisk,
    monday_mock: mondayMock,
    qa,
    event_request: normalisedEventRequest
  };
}
