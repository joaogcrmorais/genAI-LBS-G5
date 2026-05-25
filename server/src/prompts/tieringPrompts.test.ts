import { describe, expect, it } from "vitest";
import { POLICY_DISCLAIMER } from "../schemas/ws4.js";
import { BASELINE_TIERING_RULES, buildClassifierPrompt, buildValidatorPrompt } from "./tieringPrompts.js";

const eventRequest = {
  event_id: "evt_prompt",
  event_basics: {
    title: "Prompt Test",
    expected_attendance: 120,
    audience_types: ["students", "external_guests"]
  }
};

const initialResult = {
  status: "classified" as const,
  event_id: "evt_prompt",
  suggested_tier: "tier_2" as const,
  tier_label: "Moderate complexity" as const,
  reasoning: ["External guests may require additional coordination."],
  risk_flags: ["external_guests"],
  escalation_flags: [],
  validator_notes: [],
  policy_disclaimer: POLICY_DISCLAIMER
};

describe("tiering prompts", () => {
  it("keeps baseline tiering rules in the classifier prompt before nuance", () => {
    const prompt = buildClassifierPrompt(eventRequest);

    expect(prompt).toContain("Apply the baseline tiering rules first.");
    expect(prompt).toContain("Add nuance for LBS event-planning context only when the provided facts support it.");
    for (const rule of BASELINE_TIERING_RULES) {
      expect(prompt).toContain(rule);
    }
    expect(prompt.indexOf("Baseline tiering rules:")).toBeLessThan(prompt.indexOf("EventRequest JSON:"));
  });

  it("keeps the validator anchored to baseline rules and event facts", () => {
    const prompt = buildValidatorPrompt(eventRequest, initialResult);

    expect(prompt).toContain("Re-check the initial result against the baseline tiering rules.");
    expect(prompt).toContain("Confirm any added nuance is grounded in the EventRequest facts.");
    for (const rule of BASELINE_TIERING_RULES) {
      expect(prompt).toContain(rule);
    }
    expect(prompt).toContain("Initial classification JSON:");
  });
});
