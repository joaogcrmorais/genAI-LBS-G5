import { describe, expect, it } from "vitest";
import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import { assessKeyEvent } from "./keyEventService.js";

function eventRequest(fields: EventReadinessEventRequest["fields"], statuses: EventReadinessEventRequest["field_status"]) {
  return { fields, field_status: statuses };
}

describe("assessKeyEvent", () => {
  it("sets Key Event candidate for 100+ expected attendance", () => {
    const result = assessKeyEvent(
      eventRequest(
        {
          number_of_attendees: 120,
          event_details: "Student conference"
        },
        {
          number_of_attendees: "best_estimate",
          event_details: "final"
        }
      )
    );

    expect(result.key_event_candidate).toBe(true);
    expect(result.trigger_reasons).toContain("Expected attendance is 100+.");
    expect(result.user_facing_message).toContain("could be considered");
  });

  it("sets Key Event candidate for two confirmed non-attendance criteria", () => {
    const result = assessKeyEvent(
      eventRequest(
        {
          number_of_attendees: 60,
          event_details: "Public audience with press attending.",
          external_guest_speaker_details: "VIP CEO from a major corporate partner",
          has_external_guest_speakers: "Yes"
        },
        {
          number_of_attendees: "final",
          event_details: "final",
          external_guest_speaker_details: "final",
          has_external_guest_speakers: "final"
        }
      )
    );

    expect(result.key_event_candidate).toBe(true);
    expect(result.counted_criteria).toContain("high_profile_speaker");
    expect(result.counted_criteria).toContain("external_media_attendance");
  });

  it("does not treat sensitive topic as a standalone trigger", () => {
    const result = assessKeyEvent(
      eventRequest(
        {
          number_of_attendees: 40,
          event_details: "Panel on a politically sensitive topic.",
          politically_sensitive_or_controversial: "Yes, politically sensitive."
        },
        {
          number_of_attendees: "final",
          event_details: "final",
          politically_sensitive_or_controversial: "final"
        }
      )
    );

    expect(result.key_event_candidate).toBe(false);
    expect(result.internal_signals.join(" ")).toContain("not a standalone Key Event trigger");
  });
});
