import type { EventRequest, TieringClassificationResult } from "../schemas/ws4.js";
import { POLICY_DISCLAIMER } from "../schemas/ws4.js";

export const BASELINE_TIERING_RULES = [
  "tier_1 / Low complexity: simple internal event with low coordination needs.",
  "tier_2 / Moderate complexity: external speakers, catering or alcohol, AV, sponsors, mixed audience, or multiple stakeholders.",
  "tier_3 / High complexity: VIPs, media, political or reputational sensitivity, security concern, public leader, major logistics, or large/multi-room event."
] as const;

export const CRITICAL_TIERING_FACTS = [
  "attendance",
  "audience",
  "external speakers/VIPs",
  "catering/alcohol",
  "AV",
  "space",
  "sponsors/media/public visibility",
  "sensitive-topic signal when relevant"
] as const;

export function buildClassifierPrompt(eventRequest: EventRequest) {
  return [
    "You classify London Business School event complexity for a prototype Event Readiness Assistant.",
    "Return structured JSON only. Do not include markdown.",
    "Return exactly one JSON object that matches one of the approved output shapes below.",
    `Every response must include policy_disclaimer exactly: "${POLICY_DISCLAIMER}"`,
    "Allowed final statuses are classified and needs_more_information.",
    "Never include confidence scores, needs_human_review, official-policy claims, secrets, or stack traces.",
    "",
    "Reasoning order:",
    "1. Apply the baseline tiering rules first.",
    "2. Check whether critical tiering facts are missing.",
    "3. Add nuance for LBS event-planning context only when the provided facts support it.",
    "4. If nuance changes the tier, explain the evidence in user-visible reasoning.",
    "",
    "Baseline tiering rules:",
    ...BASELINE_TIERING_RULES.map((rule) => `- ${rule}`),
    "",
    "Approved classified output shape:",
    JSON.stringify({
      status: "classified",
      event_id: "evt_example",
      suggested_tier: "tier_1 | tier_2 | tier_3",
      tier_label: "Low complexity | Moderate complexity | High complexity",
      reasoning: ["User-visible reason."],
      risk_flags: ["short_snake_case_flag"],
      escalation_flags: ["short_snake_case_flag"],
      validator_notes: [],
      policy_disclaimer: POLICY_DISCLAIMER
    }),
    "",
    "Approved missing-information output shape:",
    JSON.stringify({
      status: "needs_more_information",
      event_id: "evt_example",
      missing_information: [{ field: "event_basics.expected_attendance", question: "How many attendees do you expect?" }],
      reasoning: ["User-visible reason the missing information matters."],
      policy_disclaimer: POLICY_DISCLAIMER
    }),
    "",
    "If critical facts are missing, return needs_more_information with specific field questions.",
    `Critical facts: ${CRITICAL_TIERING_FACTS.join(", ")}.`,
    "",
    "EventRequest JSON:",
    JSON.stringify(eventRequest)
  ].join("\n");
}

export function buildValidatorPrompt(eventRequest: EventRequest, initialResult: TieringClassificationResult) {
  return [
    "You are validating an LBS prototype event tiering result.",
    "Challenge unsupported assumptions, missing critical information, inconsistent tiering, overlooked escalation issues, invented LBS policy, and weak reasoning.",
    "Return the final revised TieringClassificationResult JSON only. Do not include markdown.",
    "Return exactly one JSON object that matches one approved output shape.",
    "The final result must be either classified or needs_more_information.",
    `Every response must include policy_disclaimer exactly: "${POLICY_DISCLAIMER}"`,
    "Never include confidence scores, needs_human_review, official-policy claims, secrets, or stack traces.",
    "",
    "Validation order:",
    "1. Re-check the initial result against the baseline tiering rules.",
    "2. Confirm any added nuance is grounded in the EventRequest facts.",
    "3. Revise the result if the baseline, facts, or missing information require it.",
    "",
    "Baseline tiering rules:",
    ...BASELINE_TIERING_RULES.map((rule) => `- ${rule}`),
    "",
    "Approved classified output shape:",
    JSON.stringify({
      status: "classified",
      event_id: "evt_example",
      suggested_tier: "tier_1 | tier_2 | tier_3",
      tier_label: "Low complexity | Moderate complexity | High complexity",
      reasoning: ["User-visible reason."],
      risk_flags: ["short_snake_case_flag"],
      escalation_flags: ["short_snake_case_flag"],
      validator_notes: ["What changed or was checked during validation."],
      policy_disclaimer: POLICY_DISCLAIMER
    }),
    "",
    "Approved missing-information output shape:",
    JSON.stringify({
      status: "needs_more_information",
      event_id: "evt_example",
      missing_information: [{ field: "event_basics.expected_attendance", question: "How many attendees do you expect?" }],
      reasoning: ["User-visible reason the missing information matters."],
      policy_disclaimer: POLICY_DISCLAIMER
    }),
    "",
    "EventRequest JSON:",
    JSON.stringify(eventRequest),
    "",
    "Initial classification JSON:",
    JSON.stringify(initialResult)
  ].join("\n");
}
