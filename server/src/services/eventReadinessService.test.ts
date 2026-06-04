import { describe, expect, it } from "vitest";
import {
  applyAiTurnToEventRequest,
  detectEntryType,
  evaluateEventReadiness,
  evaluateEventRequestState,
  getEventReadinessBootstrap
} from "./eventReadinessService.js";

describe("eventReadinessService", () => {
  it("loads the active processed field map and scenarios", () => {
    const bootstrap = getEventReadinessBootstrap();

    expect(bootstrap.official_fields.length).toBeGreaterThan(20);
    expect(bootstrap.scenarios.map((scenario) => scenario.id)).toContain("prepared-alumni-panel");
    expect(bootstrap.source_of_truth.note).toContain("WS4");
  });

  it("builds a new EventRequest draft from a prepared-event scenario", () => {
    const result = evaluateEventReadiness({ scenario_id: "prepared-alumni-panel" });

    expect(result.entry_type).toBe("prepared_event_request");
    expect(result.event_request.fields.event_title).toBe("Alumni panel");
    expect(result.event_request.fields.expected_attendance).toBe(80);
    expect(result.event_request.fields.event_date).toBe("next month");
    expect(result.event_request.fields.audience_types).toContain("External audience");
    expect(result.coverage.total_fields).toBeGreaterThan(35);
    expect(result.coverage.ready_fields).toBeGreaterThan(5);
    expect(result.next_questions.length).toBeLessThanOrEqual(5);
  });

  it("surfaces finance guidance for budget-only users", () => {
    const result = evaluateEventReadiness({ scenario_id: "budget-only" });

    expect(result.entry_type).toBe("budget_only_no_event_idea");
    expect(result.event_request.fields.event_type).toBe("Help me decide");
    expect(result.guidance_flags.map((flag) => flag.type)).toContain("finance_code");
    expect(result.guidance_flags.map((flag) => flag.type)).toContain("toolkit_shaping");
  });

  it("does not ask political confirmation for ordinary alumni/product events", () => {
    const eventRequest = applyAiTurnToEventRequest(undefined, {
      assistant_message: "Captured.",
      field_updates: [
        {
          key: "event_purpose_context",
          value: "Alumni panel about moving into Product roles and using AI day to day.",
          status: "final",
          rationale: "User gave the topic."
        }
      ],
      reasoning_summary: ["Ordinary career alumni topic."],
      unanswered_questions: []
    });
    const result = evaluateEventRequestState(eventRequest, "Alumni panel about Product and AI", detectEntryType("alumni panel"));

    expect(result.event_request.field_status.politically_sensitive_or_controversial).toBe("final");
    expect(String(result.event_request.fields.politically_sensitive_or_controversial)).toContain("No political");
    expect(result.guidance_flags.map((flag) => flag.type)).not.toContain("security_timeline");
    expect(result.next_questions.map((question) => question.field_key)).not.toContain(
      "politically_sensitive_or_controversial"
    );
  });

  it("treats concrete noise information as final and closes common misc fields", () => {
    const eventRequest = applyAiTurnToEventRequest(undefined, {
      assistant_message: "Captured.",
      field_updates: [
        {
          key: "event_purpose_context",
          value: "Panel followed by informal mixer.",
          status: "final",
          rationale: "User gave the format."
        },
        {
          key: "noise_disruption",
          value: "There will be noise from 80 people talking after beer and wine.",
          status: "needs_confirmation",
          rationale: "User described noise."
        }
      ],
      reasoning_summary: ["User gave concrete noise rationale."],
      unanswered_questions: []
    });
    const result = evaluateEventRequestState(eventRequest, "There will be noise from 80 people talking.", detectEntryType("panel"));

    expect(result.event_request.field_status.noise_disruption).toBe("final");
    expect(result.event_request.field_status.decorations).toBe("not_applicable");
    expect(result.event_request.field_status.filming).toBe("not_applicable");
    expect(result.event_request.field_status.streaming_media).toBe("not_applicable");
    expect(result.next_questions.map((question) => question.field_key)).not.toContain("streaming_media");
  });

  it("keeps declaration fields proceed-ready as needs_confirmation for the DOCX output", () => {
    const result = evaluateEventReadiness({ scenario_id: "prepared-alumni-panel" });

    expect(result.event_request.field_status.declaration_space_not_confirmed).toBe("needs_confirmation");
    expect(result.coverage.items.find((item) => item.key === "declaration_space_not_confirmed")?.ready).toBe(true);
    expect(result.source_notes.join(" ")).toContain("Declaration fields can remain needs_confirmation");
  });

  it("surfaces Eventscase guidance for external audiences", () => {
    const result = evaluateEventReadiness({ scenario_id: "prepared-alumni-panel" });

    expect(result.guidance_flags.map((flag) => flag.type)).toContain("eventscase_email");
  });
});
