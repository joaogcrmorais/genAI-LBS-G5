import { beforeEach, describe, expect, it, vi } from "vitest";
import { POLICY_DISCLAIMER } from "../schemas/ws4.js";
import { classifyEventTier } from "./tieringService.js";
import { getOpenAiClient } from "./openai.js";

vi.mock("./openai.js", () => ({
  getOpenAiClient: vi.fn()
}));

const baseEvent = {
  event_id: "evt_test",
  event_basics: {
    title: "External speaker event",
    expected_attendance: 60,
    audience_types: ["students", "external_guests"],
    external_audience: true
  },
  speakers_and_guests: {
    has_external_speakers: true,
    speakers: [{ name: "Speaker", organization: "Example Org" }]
  }
};

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

describe("classifyEventTier", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("returns a validated classified result after classifier and validator passes", async () => {
    const result = {
      status: "classified",
      event_id: "evt_test",
      suggested_tier: "tier_2",
      tier_label: "Moderate complexity",
      reasoning: ["External speaker and external audience increase coordination needs."],
      risk_flags: ["external_speakers"],
      escalation_flags: ["editorial_planning"],
      validator_notes: ["Validated against baseline tier guidance."],
      policy_disclaimer: POLICY_DISCLAIMER
    };
    const create = mockOpenAiResponses([result, result]);

    await expect(classifyEventTier(baseEvent)).resolves.toEqual(result);
    expect(create).toHaveBeenCalledTimes(2);
  });

  it("returns needs_more_information when the validator finds critical missing facts", async () => {
    const initial = {
      status: "classified",
      event_id: "evt_test",
      suggested_tier: "tier_2",
      tier_label: "Moderate complexity",
      reasoning: ["External speaker may require coordination."],
      risk_flags: ["external_speakers"],
      escalation_flags: [],
      validator_notes: [],
      policy_disclaimer: POLICY_DISCLAIMER
    };
    const final = {
      status: "needs_more_information",
      event_id: "evt_test",
      missing_information: [
        {
          field: "speakers_and_guests.speakers",
          question: "Who are the external speakers and what organisations do they represent?"
        }
      ],
      reasoning: ["Speaker details are needed before making a responsible tiering recommendation."],
      policy_disclaimer: POLICY_DISCLAIMER
    };
    mockOpenAiResponses([initial, final]);

    await expect(classifyEventTier(baseEvent)).resolves.toEqual(final);
  });

  it("allows the validator to revise the suggested tier", async () => {
    const initial = {
      status: "classified",
      event_id: "evt_test",
      suggested_tier: "tier_1",
      tier_label: "Low complexity",
      reasoning: ["Audience size is moderate."],
      risk_flags: [],
      escalation_flags: [],
      validator_notes: [],
      policy_disclaimer: POLICY_DISCLAIMER
    };
    const revised = {
      status: "classified",
      event_id: "evt_test",
      suggested_tier: "tier_3",
      tier_label: "High complexity",
      reasoning: ["VIP/media context requires higher coordination."],
      risk_flags: ["vip", "media_expected"],
      escalation_flags: ["security_review", "editorial_planning"],
      validator_notes: ["Revised because the initial result underweighted VIP/media risk."],
      policy_disclaimer: POLICY_DISCLAIMER
    };
    mockOpenAiResponses([initial, revised]);

    await expect(classifyEventTier(baseEvent)).resolves.toEqual(revised);
  });

  it("throws a contract error when OpenAI returns invalid JSON", async () => {
    mockOpenAiResponses(["not-json"]);

    await expect(classifyEventTier(baseEvent)).rejects.toMatchObject({
      code: "invalid_ai_response"
    });
  });
});
