import { describe, expect, it } from "vitest";
import {
  POLICY_DISCLAIMER,
  tieringClassificationResultSchema
} from "../schemas/ws4.js";
import { classifyEventTier } from "./tieringService.js";

const describeLive = process.env.RUN_LIVE_OPENAI_TEST === "true" ? describe : describe.skip;

describeLive("live OpenAI tiering classifier", () => {
  it("sends the real classifier and validator prompts to OpenAI and returns a valid WS4 result", async () => {
    const result = await classifyEventTier({
      event_id: "evt_live_openai_test",
      event_basics: {
        title: "External Speaker Fireside Chat",
        description: "A student club event with a named external speaker and mixed audience.",
        purpose: "Career and sector insight for students.",
        event_type: "speaker",
        target_date: "2026-06-18",
        start_time: "18:00",
        end_time: "19:30",
        expected_attendance: 60,
        attendance_estimate_type: "rough_estimate",
        audience_types: ["students", "external_guests"],
        external_audience: true
      },
      space_and_setup: {
        space_confirmed: false,
        preferred_space: "Lecture theatre",
        layout_preference: "Theatre",
        needs_signage: true
      },
      catering: {
        needs_catering: false,
        catering_style: "none",
        needs_alcohol: false
      },
      av_and_tech: {
        needs_av: true,
        microphones: true,
        projector_or_screen: true,
        recording: false,
        livestreaming: false,
        hybrid: false,
        complex_av: false,
        av_notes: "One handheld microphone and slides."
      },
      speakers_and_guests: {
        has_external_speakers: true,
        speakers: [
          {
            name: "External Speaker",
            organization: "Example Finance Organisation",
            role_title: "Senior Leader",
            is_external: true,
            is_vip: false,
            is_politically_sensitive: false,
            requires_security_review: false
          }
        ],
        vip_or_embassy_presence: false,
        media_expected: false,
        guest_list_required: true,
        sensitive_topic: "no"
      },
      sponsorship_and_external_parties: {
        has_sponsors: false,
        sponsor_names: [],
        has_external_vendors: false,
        requires_booth_or_branding: false
      }
    });

    expect(() => tieringClassificationResultSchema.parse(result)).not.toThrow();
    expect(["classified", "needs_more_information"]).toContain(result.status);
    expect(result.event_id).toBe("evt_live_openai_test");
    expect(result.policy_disclaimer).toBe(POLICY_DISCLAIMER);
  }, 60000);
});
