import { describe, expect, it } from "vitest";
import { buildSystemPrompt } from "./eventReadinessChatService.js";

describe("eventReadinessChatService", () => {
  it("instructs the assistant to respond like an expert colleague instead of a field audit", () => {
    const prompt = buildSystemPrompt();

    expect(prompt).toContain("experienced LBS events colleague");
    expect(prompt).toContain("Do not recite a field-by-field capture list");
    expect(prompt).toContain("Never write responses such as 'I've captured the following details'");
    expect(prompt).toContain("Open with a short natural synthesis");
    expect(prompt).toContain("For an 80-person alumni panel in a lecture theatre");
    expect(prompt).toContain("Do not expose internal field names");
  });
});
