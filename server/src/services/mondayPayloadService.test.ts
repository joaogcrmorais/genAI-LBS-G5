import { describe, expect, it } from "vitest";
import type { EventRequest } from "../schemas/ws4.js";
import { MONDAY_MOCK_NOTICE, POLICY_DISCLAIMER } from "../schemas/ws4.js";
import { buildMondayMockPayload } from "./mondayPayloadService.js";
import { buildStakeholderPackets } from "./routingService.js";

describe("buildMondayMockPayload", () => {
  it("builds a mock-only payload from classification and stakeholder packets", () => {
    const eventRequest: EventRequest = {
      event_id: "evt_monday",
      event_basics: {
        title: "Alumni Reception",
        lifecycle_phase: "detailed_planning",
        monday_status_hint: "tentative",
        event_type: "networking",
        target_date: "2026-06-15",
        expected_attendance: 80,
        audience_types: ["students", "alumni"]
      },
      catering: { needs_catering: true, needs_alcohol: true },
      planning_and_governance: {
        editorial_content_tags: ["Event Promo Group"],
        advancement_review_status: "Speakers shared with Advancement"
      }
    };
    const classification = {
      status: "classified" as const,
      event_id: "evt_monday",
      suggested_tier: "tier_2" as const,
      tier_label: "Moderate complexity" as const,
      reasoning: ["Catering and alumni audience require coordination."],
      risk_flags: ["alcohol_requested"],
      escalation_flags: ["catering_coordination"],
      validator_notes: ["Validated."],
      policy_disclaimer: POLICY_DISCLAIMER
    };
    const packets = buildStakeholderPackets(eventRequest, classification);

    const payload = buildMondayMockPayload(eventRequest, classification, packets);

    expect(payload.integration_target).toBe("monday.com");
    expect(payload.mock_notice).toBe(MONDAY_MOCK_NOTICE);
    expect(payload.board_hint).toBe("Events and Key Dates 25/26");
    expect(payload.board_id_hint).toBe("2008539622");
    expect(payload.lifecycle_status).toBe("Tentative");
    expect(payload.columns.mock_only).toBe(true);
    expect(payload.columns.suggested_tier).toBe("tier_2");
    expect(payload.columns.editorial_content_tags).toEqual(["Event Promo Group"]);
    expect(payload.source_outputs_used).toEqual(["classification", "stakeholder_packets"]);
    expect(payload.subitems.length).toBeGreaterThan(0);
    expect(payload.subitems.some((subitem) => subitem.name === "Confirm lifecycle status and next review gate")).toBe(true);
  });
});
