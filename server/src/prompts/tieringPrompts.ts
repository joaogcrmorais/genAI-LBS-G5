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
    "EventRequest JSON:",
    JSON.stringify(eventRequest),
    "",
    "Initial classification JSON:",
    JSON.stringify(initialResult)
  ].join("\n");
}
