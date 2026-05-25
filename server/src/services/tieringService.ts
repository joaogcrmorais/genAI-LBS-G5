import type OpenAI from "openai";
import { buildClassifierPrompt, buildValidatorPrompt } from "../prompts/tieringPrompts.js";
import {
  type EventRequest,
  getEventId,
  tieringClassificationResultSchema
} from "../schemas/ws4.js";
import { getOpenAiClient } from "./openai.js";

const MODEL = "gpt-4o-mini";

export class TieringServiceError extends Error {
  constructor(
    message: string,
    public readonly code: "invalid_ai_response" | "openai_unavailable"
  ) {
    super(message);
  }
}

function parseAiJson(content: string | null | undefined) {
  if (!content) {
    throw new TieringServiceError("OpenAI returned an empty tiering response.", "invalid_ai_response");
  }

  try {
    return JSON.parse(content) as unknown;
  } catch {
    throw new TieringServiceError("OpenAI returned invalid JSON for tiering.", "invalid_ai_response");
  }
}

async function requestJson(client: OpenAI, prompt: string) {
  try {
    const response = await client.chat.completions.create({
      model: MODEL,
      response_format: { type: "json_object" },
      messages: [
        {
          role: "system",
          content: "You return valid JSON that exactly follows the requested schema."
        },
        {
          role: "user",
          content: prompt
        }
      ],
      temperature: 0.2
    });

    return parseAiJson(response.choices[0]?.message.content);
  } catch (error) {
    if (error instanceof TieringServiceError) throw error;
    throw new TieringServiceError("OpenAI tiering request failed.", "openai_unavailable");
  }
}

function validateTieringResult(value: unknown) {
  const parsed = tieringClassificationResultSchema.safeParse(value);
  if (!parsed.success) {
    throw new TieringServiceError("OpenAI tiering response did not match the approved contract.", "invalid_ai_response");
  }
  return parsed.data;
}

export async function classifyEventTier(eventRequest: EventRequest) {
  const client = getOpenAiClient();
  const eventWithId = { ...eventRequest, event_id: getEventId(eventRequest) };

  const initialUnknown = await requestJson(client, buildClassifierPrompt(eventWithId));
  const initialResult = validateTieringResult(initialUnknown);

  const finalUnknown = await requestJson(client, buildValidatorPrompt(eventWithId, initialResult));
  return validateTieringResult(finalUnknown);
}
