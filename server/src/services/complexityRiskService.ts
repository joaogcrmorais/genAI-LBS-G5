import type OpenAI from "openai";
import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import {
  type ComplexityRiskResult,
  type PostPhase1KeyEventAssessment,
  type PostPhase1Stakeholder,
  complexityRiskResultSchema
} from "../schemas/postPhase1.js";
import { getOpenAiClient } from "./openai.js";
import { allEventText, getRoutingRules, parseAttendance, readProcessedJson } from "./postPhase1DataService.js";

const MODEL = "gpt-4o-mini";

type ComplexityPromptContext = {
  eventRequest: EventReadinessEventRequest;
  keyEvent: PostPhase1KeyEventAssessment;
  stakeholders: PostPhase1Stakeholder[];
};

export class ComplexityRiskServiceError extends Error {
  constructor(
    message: string,
    public readonly code: "invalid_ai_response" | "openai_unavailable"
  ) {
    super(message);
  }
}

function deterministicFallback(
  eventRequest: EventReadinessEventRequest,
  keyEvent: PostPhase1KeyEventAssessment,
  stakeholders: PostPhase1Stakeholder[],
  status: "skipped" | "unavailable",
  note: string
): ComplexityRiskResult {
  const text = allEventText(eventRequest);
  const attendance = parseAttendance(eventRequest) ?? 0;
  const flags = [
    keyEvent.key_event_candidate ? "key_event_candidate" : "",
    attendance >= 100 ? "large_attendance" : "",
    /alcohol|wine|beer/i.test(text) ? "alcohol_requested" : "",
    /media|press/i.test(text) ? "media_expected" : "",
    /sensitive|security review|vip|public leader|ambassador/i.test(text) ? "visibility_or_security_signal" : "",
    /multi-room|multiple|green room|recording|filming/i.test(text) ? "complex_logistics" : ""
  ].filter(Boolean);
  const requiredCount = stakeholders.filter((stakeholder) => stakeholder.priority === "required").length;
  const suggested =
    flags.includes("visibility_or_security_signal") || requiredCount >= 6
      ? "high"
      : flags.length >= 2 || requiredCount >= 3
        ? "moderate"
        : "low";

  return complexityRiskResultSchema.parse({
    status,
    suggested_complexity: suggested,
    risk_flags: flags,
    escalation_flags: stakeholders.filter((stakeholder) => stakeholder.priority === "required").map((stakeholder) => stakeholder.id),
    reasoning: [note, `Deterministic fallback used ${flags.length} risk flag(s) and ${requiredCount} required stakeholder(s).`],
    challenger_notes: [],
    source_notes: [
      "Fallback uses EventRequest facts, deterministic Key Event result, and stakeholder route count.",
      "No OpenAI output was used for this result."
    ]
  });
}

function buildFirstPassPrompt({ eventRequest, keyEvent, stakeholders }: ComplexityPromptContext) {
  return [
    "Classify LBS student event complexity and risk for a post-Phase-1 POC.",
    "Return JSON only. Do not include markdown.",
    "Use the completed flat EventRequest, deterministic Key Event assessment, converted stakeholder routing, and source rules.",
    "Do not override deterministic Key Event assessment.",
    "Allowed suggested_complexity values: low, moderate, high.",
    "Return shape:",
    JSON.stringify({
      suggested_complexity: "low | moderate | high",
      risk_flags: ["short_snake_case"],
      escalation_flags: ["short_snake_case"],
      reasoning: ["brief evidence-grounded reason"]
    }),
    "",
    "Routing rules:",
    JSON.stringify(getRoutingRules()),
    "",
    "Timeline rules:",
    JSON.stringify(readProcessedJson<unknown>("timeline/timeline_rules.json")),
    "",
    "EventRequest:",
    JSON.stringify(eventRequest),
    "",
    "Key Event assessment:",
    JSON.stringify(keyEvent),
    "",
    "Stakeholders:",
    JSON.stringify(stakeholders)
  ].join("\n");
}

function buildChallengePrompt(context: ComplexityPromptContext, firstPass: unknown) {
  return [
    "Challenge this LBS event complexity/risk classification with stricter logic.",
    "Return final JSON only. Do not include markdown.",
    "Look for under-classification, over-classification, unsupported risk flags, missing escalation flags, and invented process claims.",
    "Keep the result believable for a proof-of-concept; do not overfit or invent LBS policy.",
    "Return shape:",
    JSON.stringify({
      status: "classified",
      suggested_complexity: "low | moderate | high",
      risk_flags: ["short_snake_case"],
      escalation_flags: ["short_snake_case"],
      reasoning: ["brief evidence-grounded reason"],
      challenger_notes: ["what was challenged or revised"]
    }),
    "",
    "Original context:",
    buildFirstPassPrompt(context),
    "",
    "First-pass classification:",
    JSON.stringify(firstPass)
  ].join("\n");
}

function parseJson(content: string | null | undefined) {
  if (!content) throw new ComplexityRiskServiceError("OpenAI returned an empty risk response.", "invalid_ai_response");
  try {
    return JSON.parse(content) as unknown;
  } catch {
    throw new ComplexityRiskServiceError("OpenAI returned invalid JSON for risk classification.", "invalid_ai_response");
  }
}

async function requestJson(client: OpenAI, prompt: string) {
  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [
        { role: "system", content: "You return valid JSON exactly matching the requested shape." },
        { role: "user", content: prompt }
      ],
      temperature: 0.2
    });
    return parseJson(response.choices[0]?.message.content);
  } catch (error) {
    if (error instanceof ComplexityRiskServiceError) throw error;
    throw new ComplexityRiskServiceError("OpenAI risk classification request failed.", "openai_unavailable");
  }
}

export async function classifyComplexityRisk(
  eventRequest: EventReadinessEventRequest,
  keyEvent: PostPhase1KeyEventAssessment,
  stakeholders: PostPhase1Stakeholder[],
  runAiRisk: boolean
): Promise<ComplexityRiskResult> {
  if (!runAiRisk) {
    return deterministicFallback(eventRequest, keyEvent, stakeholders, "skipped", "OpenAI complexity/risk classification was skipped by request.");
  }

  const context = { eventRequest, keyEvent, stakeholders };
  try {
    const firstPass = await requestJson(getOpenAiClient(), buildFirstPassPrompt(context));
    const challenged = await requestJson(getOpenAiClient(), buildChallengePrompt(context, firstPass));
    const parsed = complexityRiskResultSchema.safeParse({
      ...(typeof challenged === "object" && challenged !== null ? challenged : {}),
      status: "classified",
      first_pass: firstPass,
      source_notes: [
        "OpenAI complexity/risk classification used a two-pass classify-then-challenge flow.",
        "This POC output does not override deterministic Key Event assessment."
      ]
    });
    if (!parsed.success) {
      throw new ComplexityRiskServiceError("OpenAI risk response did not match the approved schema.", "invalid_ai_response");
    }
    return parsed.data;
  } catch (error) {
    const message = error instanceof Error ? error.message : "OpenAI risk classification failed.";
    return deterministicFallback(eventRequest, keyEvent, stakeholders, "unavailable", message);
  }
}
