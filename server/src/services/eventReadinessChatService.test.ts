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

  it("sends deterministic session memory and source guidance before the model replies", async () => {
    const validTurn = {
      assistant_message:
        "Nuffield Hall is a plausible large-room lead for 120 people. A couple of planning details would help now.",
      field_updates: [],
      reasoning_summary: ["Deterministic memory supplied room and attendance facts before the model response."],
      unanswered_questions: [
        "Who is the organiser?",
        "Which club or programme owns the event?",
        "What mobile number should LBS use?"
      ]
    };
    const create = mockOpenAiResponses([validTurn]);

    const result = await continueEventReadinessChat({
      message:
        "A careers panel for 120 people with ordinary-profile company speakers. It will run from 19:00 to 22:00 in Nuffield Hall with beer and wine.",
      transcript: [],
      event_request: { fields: {}, field_status: {} }
    });
    const request = create.mock.calls[0]?.[0] as { messages: Array<{ content: string }> };
    const userPrompt = JSON.parse(request.messages[1].content) as {
      current_event_request: { fields: Record<string, unknown> };
      deterministic_coverage: { ready_fields: Array<{ key: string }> };
      source_guidance: Array<{ type: string; details?: unknown }>;
      output_rules: string[];
    };

    expect(userPrompt.current_event_request.fields.number_of_attendees).toBe(120);
    expect(userPrompt.deterministic_coverage.ready_fields.map((field) => field.key)).toContain("space_and_setup");
    expect(userPrompt.source_guidance.map((item) => item.type)).toContain("space_lookup");
    expect(JSON.stringify(userPrompt.source_guidance)).toContain("Nuffield Hall");
    expect(userPrompt.output_rules.join(" ")).toContain("Ask 3-5 broad");
    expect(result.event_request.fields.number_of_attendees).toBe(120);
  });
});
