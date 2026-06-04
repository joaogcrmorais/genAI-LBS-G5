import { beforeEach, describe, expect, it, vi } from "vitest";
import { getOpenAiClient } from "./openai.js";
import {
  continueEventReadinessChat,
  GENERIC_EVENT_READINESS_CHAT_ERROR
} from "./eventReadinessChatService.js";

vi.mock("./openai.js", () => ({
  getOpenAiClient: vi.fn()
}));

function mockOpenAiResponses(contents: unknown[]) {
  const create = vi.fn();
  for (const content of contents) {
    create.mockResolvedValueOnce({
      choices: [{ message: { content: typeof content === "string" ? content : JSON.stringify(content) } }]
    });
  }

  vi.mocked(getOpenAiClient).mockReturnValue({
    chat: {
      completions: {
        create
      }
    }
  } as never);

  return create;
}

describe("continueEventReadinessChat", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("retries once when OpenAI violates the response contract", async () => {
    const validTurn = {
      assistant_message: "Captured the event title.",
      field_updates: [
        {
          key: "event_title",
          value: "Alumni panel",
          status: "final",
          rationale: "The organiser named the event."
        }
      ],
      reasoning_summary: ["Mapped title from user message."],
      unanswered_questions: ["How many attendees do you expect?"]
    };
    const create = mockOpenAiResponses([
      {
        ...validTurn,
        unanswered_questions: ["1", "2", "3", "4", "5", "6"]
      },
      validTurn
    ]);

    const result = await continueEventReadinessChat({
      message: "The event is an alumni panel.",
      transcript: [],
      event_request: { fields: {}, field_status: {} }
    });

    expect(create).toHaveBeenCalledTimes(2);
    expect(result.ai_field_updates[0]?.key).toBe("event_title");
  });

  it("returns the generic restart error after a failed repair attempt", async () => {
    const invalid = {
      assistant_message: "Too many questions.",
      field_updates: [],
      reasoning_summary: ["Invalid contract."],
      unanswered_questions: ["1", "2", "3", "4", "5", "6"]
    };
    mockOpenAiResponses([invalid, invalid]);

    await expect(
      continueEventReadinessChat({
        message: "The event is an alumni panel.",
        transcript: [],
        event_request: { fields: {}, field_status: {} }
      })
    ).rejects.toMatchObject({
      code: "invalid_ai_response",
      message: GENERIC_EVENT_READINESS_CHAT_ERROR
    });
  });
});
