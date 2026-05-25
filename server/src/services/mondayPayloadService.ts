import type {
  EventRequest,
  MondayIntegrationPayload,
  StakeholderPacketResult,
  TieringClassificationResult
} from "../schemas/ws4.js";
import { MONDAY_MOCK_NOTICE, getEventId, mondayIntegrationPayloadSchema } from "../schemas/ws4.js";

export function buildMondayMockPayload(
  eventRequest: EventRequest,
  classification?: TieringClassificationResult,
  stakeholderPackets?: StakeholderPacketResult
): MondayIntegrationPayload {
  const eventId = getEventId(eventRequest);
  const title = eventRequest.event_basics.title;
  const packetCount = stakeholderPackets?.stakeholder_packets.length ?? 0;
  const missingInformationCount =
    stakeholderPackets?.missing_information_by_stakeholder.reduce(
      (count, item) => count + item.missing_information.length,
      0
    ) ?? 0;

  return mondayIntegrationPayloadSchema.parse({
    integration_target: "monday.com",
    integration_status: "mock_payload_ready",
    mock_notice: MONDAY_MOCK_NOTICE,
    event_id: eventId,
    board_hint: "LBS Event Oversight",
    item_name: title,
    group_name: "Student Club Events",
    columns: {
      event_id: eventId,
      title,
      event_type: eventRequest.event_basics.event_type ?? "unknown",
      target_date: eventRequest.event_basics.target_date ?? "unknown",
      expected_attendance: eventRequest.event_basics.expected_attendance ?? "unknown",
      tier_status: classification?.status ?? "not_provided",
      suggested_tier: classification?.status === "classified" ? classification.suggested_tier : "unknown",
      tier_label: classification?.status === "classified" ? classification.tier_label : "unknown",
      risk_flags: classification?.status === "classified" ? classification.risk_flags : [],
      escalation_flags: classification?.status === "classified" ? classification.escalation_flags : [],
      stakeholders_required: stakeholderPackets?.stakeholders_required ?? [],
      stakeholders_recommended: stakeholderPackets?.stakeholders_recommended ?? [],
      stakeholder_packet_count: packetCount,
      missing_information_count: missingInformationCount,
      mock_only: true
    },
    subitems:
      stakeholderPackets?.stakeholder_packets.map((packet) => ({
        name: `${packet.stakeholder}: ${packet.status}`,
        owner_hint: packet.stakeholder,
        status: packet.status,
        notes: [...packet.reasons, ...packet.suggested_next_actions].join(" ")
      })) ?? [],
    source_outputs_used: [
      ...(classification ? (["classification"] as const) : []),
      ...(stakeholderPackets ? (["stakeholder_packets"] as const) : [])
    ]
  });
}
