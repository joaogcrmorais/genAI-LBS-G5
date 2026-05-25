import { describe, expect, it } from "vitest";
import { MONDAY_MOCK_NOTICE, POLICY_DISCLAIMER } from "../schemas/ws4.js";
import { buildMondayMockPayload } from "./mondayPayloadService.js";
import { buildStakeholderPackets } from "./routingService.js";

describe("buildMondayMockPayload", () => {
  it("builds a mock-only payload from classification and stakeholder packets", () => {
    const eventRequest = {
      event_id: "evt_monday",
      event_basics: {
        title: "Alumni Reception",
        event_type: "networking",
        target_date: "2026-06-15",
        expected_attendance: 80,
        audience_types: ["students", "alumni"]
      },
      catering: { needs_catering: true, needs_alcohol: true }
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
    expect(payload.columns.mock_only).toBe(true);
    expect(payload.columns.suggested_tier).toBe("tier_2");
    expect(payload.source_outputs_used).toEqual(["classification", "stakeholder_packets"]);
    expect(payload.subitems.length).toBeGreaterThan(0);
  });
});
