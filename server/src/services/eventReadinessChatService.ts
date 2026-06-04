import type OpenAI from "openai";
import {
  eventReadinessAiTurnSchema,
  type EventReadinessAiTurn,
  type EventReadinessChatRequest
} from "../schemas/eventReadiness.js";
import { getOpenAiClient } from "./openai.js";
import {
  applyAiTurnToEventRequest,
  applySessionMemoryToEventRequest,
  detectEntryType,
  evaluateEventRequestState,
  getSpaceRequestFields
} from "./eventReadinessService.js";

const MODEL = "gpt-4o-mini";
export const GENERIC_EVENT_READINESS_CHAT_ERROR =
  "An error has occurred. Please restart the conversation.";

export class EventReadinessChatError extends Error {
  constructor(
    message: string,
    public readonly code: "invalid_ai_response" | "openai_unavailable"
  ) {
    super(message);
  }
}

function parseAiJson(content: string | null | undefined) {
  if (!content) {
    throw new EventReadinessChatError("OpenAI returned an empty Event Readiness chat response.", "invalid_ai_response");
  }

  try {
    return JSON.parse(content) as unknown;
  } catch {
    throw new EventReadinessChatError("OpenAI returned invalid JSON for Event Readiness chat.", "invalid_ai_response");
  }
}

function validateAiTurn(value: unknown): EventReadinessAiTurn {
  const parsed = eventReadinessAiTurnSchema.safeParse(value);
  if (!parsed.success) {
    const issues = parsed.error.issues
      .map((issue) => `${issue.path.join(".") || "root"}: ${issue.message}`)
      .join("; ");
    throw new EventReadinessChatError(
      `OpenAI Event Readiness response did not match the approved contract. ${issues}`,
      "invalid_ai_response"
    );
  }
  return parsed.data;
}

function buildSystemPrompt() {
  return [
    "You are the Event Readiness Assistant for London Business School student club organisers: an expert colleague, not a passive note-taker.",
    "Phase 1 goal: guide the organiser until every official Space Request / CribSheet field has a concrete value or explicit uncertainty marker.",
    "Do not use the historical WS4 EventRequest contract. Use only the official field keys supplied in this prompt.",
    "Be decisive, calm, and practical. Answer direct organiser questions first, then ask only the next high-value questions.",
    "Ask 3-5 broad, themed questions when information is missing. Use five when many fields remain open. Ask fewer only when the next blocker is narrow.",
    "Never open with repetitive note-taking phrases such as 'I noted', 'I've noted', 'I captured', or 'I've captured'. Use natural, concise language.",
    "Treat the full current session as memory. Mine every organiser message for any official field it can fill, even if that field was not directly requested.",
    "Do not ask for information already provided unless it is truly contradictory or unusable.",
    "Trust concrete organiser answers. If the organiser says there will be noise and gives a rationale, mark noise_impact final, not needs_confirmation.",
    "Use needs_confirmation only when the organiser explicitly says they do not know, must check, or cannot confirm yet.",
    "If there is no political, controversial, or sensitive signal in the event topic, infer a low-risk answer and do not ask political confirmation.",
    "For common absent/miscellaneous items such as cloakroom, decorations, filming, children, recorded music, live music, and outside equipment, bundle them together. If the user says no/none/that's all, mark them not_applicable or final as appropriate.",
    "If a user is vague or budget-only, help shape a viable event instead of blocking them.",
    "Treat catering and alcohol as one conversational food-and-drink topic, while still updating their separate official field keys.",
    "Surface finance-code awareness whenever budget, spend, catering, alcohol, ticketing, sponsorship, or treasury is involved.",
    "Use source_guidance from the prompt in your reply when relevant, including room matches, capacity hints, catering/alcohol policy, finance-code next steps, and timeline implications.",
    "Surface political/sensitive-topic security and timeline implications only when there is a real signal.",
    "If every field is ready, stop asking questions and tell the organiser Phase 1 has enough information for the Space Request draft.",
    "Avoid repetitive apologies and robotic phrasing. If correcting course, do it once, then move forward.",
    "Do not claim a form has been submitted, do not send emails, and do not call external LBS systems.",
    "Return JSON only, matching this shape:",
    JSON.stringify({
      assistant_message: "A concise chat response to the organiser.",
      field_updates: [
        {
          key: "official_field_key",
          value: "captured value or explicit marker",
          status: "final | best_estimate | not_sure_yet | needs_confirmation | not_applicable | organiser_follow_up | missing",
          rationale: "Why this update was made from the conversation"
        }
      ],
      reasoning_summary: ["Brief internal reasoning for the test surface; no secrets."],
      unanswered_questions: ["Three to five broad next questions you asked or would ask when bundled."]
    })
  ].join("\n");
}

function buildUserPrompt(
  input: EventReadinessChatRequest,
  evaluated: ReturnType<typeof evaluateEventRequestState>
) {
  const missingFields = evaluated.coverage.items
    .filter((item) => !item.ready)
    .map((item) => ({ key: item.key, label: item.label, category: item.category }));
  const readyFields = evaluated.coverage.items
    .filter((item) => item.ready)
    .map((item) => ({ key: item.key, value: item.value, status: item.status }));

  return JSON.stringify(
    {
      official_fields: getSpaceRequestFields().map((field) => ({
        key: field.key,
        label: field.label,
        category: field.category
      })),
      allowed_statuses: [
        "final",
        "best_estimate",
        "not_sure_yet",
        "needs_confirmation",
        "not_applicable",
        "organiser_follow_up",
        "missing"
      ],
      current_event_request: input.event_request ?? { fields: {}, field_status: {} },
      deterministic_coverage: {
        phase_1_ready: evaluated.coverage.phase_1_ready,
        missing_fields: missingFields,
        ready_fields: readyFields
      },
      deterministic_next_questions: evaluated.next_questions,
      source_guidance: evaluated.source_guidance,
      guidance_flags: evaluated.guidance_flags,
      recent_transcript: input.transcript.slice(-12),
      latest_user_message: input.message,
      output_rules: [
        "Only update official field keys when possible.",
        "Use the current_event_request as session memory; do not ask for fields already ready in deterministic_coverage.ready_fields.",
        "Preserve useful extra context in additional_information when it does not fit a specific field.",
        "Extract cross-field facts from the latest user message even if the organiser was answering a different question.",
        "Use needs_confirmation, not_sure_yet, not_applicable, or organiser_follow_up instead of leaving a field blank when the organiser has explicitly given that state.",
        "If the user gives a concrete value, mark it final unless it is explicitly an estimate.",
        "If the user says there will be noise, mark noise_impact final with the user's rationale.",
        "If the topic is ordinary alumni, career, networking, club, product, AI, mixer, or panel content with no sensitive signal, mark politically_sensitive_or_controversial as final no/low-risk and do not ask about it.",
        "If the user says no, none, or that's all for miscellaneous items, mark those fields not_applicable/final and do not ask again.",
        "If the user asks a planning question such as whether there is enough time, answer it using source_guidance before asking follow-ups.",
        "Ask 3-5 broad, themed questions when many fields remain missing; group catering and alcohol as food and drink."
      ]
    },
    null,
    2
  );
}

function buildRepairPrompt(
  input: EventReadinessChatRequest,
  evaluated: ReturnType<typeof evaluateEventRequestState>,
  validationError: string
) {
  return JSON.stringify(
    {
      instruction:
        "Your previous Event Readiness response violated the required JSON contract. Return corrected JSON only, with no markdown or commentary.",
      validation_error: validationError,
      required_contract: {
        assistant_message: "string",
        field_updates: [
          {
            key: "official field key string",
            value: "captured value or explicit marker",
            status:
              "final | best_estimate | not_sure_yet | needs_confirmation | not_applicable | organiser_follow_up | missing",
            rationale: "string"
          }
        ],
        reasoning_summary: ["string"],
        unanswered_questions: ["up to five strings"]
      },
      original_request: JSON.parse(buildUserPrompt(input, evaluated)) as unknown
    },
    null,
    2
  );
}

function summariseAutoClosedFields(input: EventReadinessChatRequest, eventRequest: EventReadinessChatRequest["event_request"]) {
  const before = input.event_request?.fields ?? {};
  const after = eventRequest?.fields ?? {};
  const closed = [
    ["children_attending", "children attending"],
    ["decorations", "decorations"],
    ["recorded_music", "recorded music"],
    ["live_music", "live music"],
    ["cloakroom", "cloakroom"],
    ["outside_equipment", "outside or hired equipment"],
    ["filming", "filming"]
  ]
    .filter(([key]) => !before[key] && typeof after[key] === "string" && String(after[key]).toLowerCase().includes("not"))
    .map(([, label]) => label);

  if (closed.length === 0) return "";
  return ` I have treated ${closed.join(", ")} as not present for this draft unless you revise that.`;
}

function composeAssistantMessage(
  input: EventReadinessChatRequest,
  aiTurn: EventReadinessAiTurn,
  evaluated: ReturnType<typeof evaluateEventRequestState>
) {
  if (evaluated.coverage.phase_1_ready && evaluated.next_questions.length === 0) {
    return "I have enough information for Phase 1. Every Space Request field now has a value or explicit marker, so the next step is generating the Space Request DOCX draft.";
  }

  const autoClosed = summariseAutoClosedFields(input, evaluated.event_request);
  return `${aiTurn.assistant_message}${autoClosed}`.trim();
}

async function requestJson(
  client: OpenAI,
  input: EventReadinessChatRequest,
  evaluated: ReturnType<typeof evaluateEventRequestState>,
  repairError?: string
) {
  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: buildSystemPrompt()
        },
        {
          role: "user",
          content: repairError ? buildRepairPrompt(input, evaluated, repairError) : buildUserPrompt(input, evaluated)
        }
      ],
      temperature: 0.2
    });

    return parseAiJson(response.choices[0]?.message.content);
  } catch (error) {
    if (error instanceof EventReadinessChatError) throw error;
    throw new EventReadinessChatError("OpenAI Event Readiness chat request failed.", "openai_unavailable");
  }
}

export async function continueEventReadinessChat(input: EventReadinessChatRequest) {
  const client = getOpenAiClient();
  const contextText = input.transcript.length ? `${input.transcript[0]?.content} ${input.message}` : input.message;
  const entryType = detectEntryType(contextText);
  const memoryEventRequest = applySessionMemoryToEventRequest(input.event_request, input.transcript, input.message);
  const preparedInput = { ...input, event_request: memoryEventRequest };
  const preparedEvaluation = evaluateEventRequestState(memoryEventRequest, input.message, entryType);
  let aiTurn: EventReadinessAiTurn;
  try {
    aiTurn = validateAiTurn(await requestJson(client, preparedInput, preparedEvaluation));
  } catch (error) {
    if (!(error instanceof EventReadinessChatError) || error.code !== "invalid_ai_response") {
      throw error;
    }

    try {
      aiTurn = validateAiTurn(await requestJson(client, preparedInput, preparedEvaluation, error.message));
    } catch (retryError) {
      if (retryError instanceof EventReadinessChatError && retryError.code === "invalid_ai_response") {
        throw new EventReadinessChatError(GENERIC_EVENT_READINESS_CHAT_ERROR, "invalid_ai_response");
      }
      throw retryError;
    }
  }
  const aiEventRequest = applyAiTurnToEventRequest(memoryEventRequest, aiTurn);
  const eventRequest = applySessionMemoryToEventRequest(aiEventRequest, input.transcript, input.message);
  const evaluated = evaluateEventRequestState(eventRequest, input.message, entryType);

  return {
    assistant_message: composeAssistantMessage(input, aiTurn, evaluated),
    ai_reasoning: aiTurn.reasoning_summary,
    ai_field_updates: aiTurn.field_updates,
    ai_unanswered_questions: aiTurn.unanswered_questions,
    ...evaluated
  };
}
