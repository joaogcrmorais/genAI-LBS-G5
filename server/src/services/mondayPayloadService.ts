import type {
  EventRequest,
  MondayIntegrationPayload,
  StakeholderPacketResult,
  TieringClassificationResult
} from "../schemas/ws4.js";
import { MONDAY_MOCK_NOTICE, getEventId, mondayIntegrationPayloadSchema } from "../schemas/ws4.js";

const MONDAY_STATUS_LABELS: Record<string, string> = {
  requested: "Requested",
  proposed: "Proposed",
  tbd: "TBD",
  more_info_required: "More info required",
  can_progress: "Can progress",
  tentative: "Tentative",
  date_to_be_confirmed: "Date to be confirmed",
  confirmed_subject_to_business_case: "Confirmed - subject to business case",
  confirmed: "Confirmed",
  confirmed_space_check: "Confirmed - Space Check",
  stuck_issues: "Stuck/Issues",
  changing_plans: "Changing plans",
  cancelled_moved: "Cancelled/moved",
  not_happening: "Not happening",
  unknown: "Requested"
};

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function bool(value: unknown) {
  return value === true;
}

function mondayStatusLabel(status: unknown) {
  const key = stringValue(status) ?? "unknown";
  return MONDAY_STATUS_LABELS[key] ?? key;
}

export function buildMondayMockPayload(
  eventRequest: EventRequest,
  classification?: TieringClassificationResult,
  stakeholderPackets?: StakeholderPacketResult
): MondayIntegrationPayload {
  const eventId = getEventId(eventRequest);
  const title = eventRequest.event_basics.title;
  const basics = eventRequest.event_basics;
  const organizer = eventRequest.organizer ?? {};
  const catering = eventRequest.catering ?? {};
  const av = eventRequest.av_and_tech ?? {};
  const speakers = eventRequest.speakers_and_guests ?? {};
  const space = eventRequest.space_and_setup ?? {};
  const external = eventRequest.sponsorship_and_external_parties ?? {};
  const governance = eventRequest.planning_and_governance ?? {};
  const lifecycleStatus = mondayStatusLabel(basics.monday_status_hint);
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
    board_hint: "Events and Key Dates 25/26",
    board_id_hint: "2008539622",
    item_name: title,
    group_name: stringValue(organizer.club_or_department)?.toLowerCase().includes("club")
      ? "Student Club Events"
      : stringValue(organizer.club_or_department) ?? "Events and Key Dates",
    lifecycle_status: lifecycleStatus,
    columns: {
      event_id: eventId,
      title,
      monday_status_hint: lifecycleStatus,
      lifecycle_phase: basics.lifecycle_phase ?? "unknown",
      event_type: basics.event_type ?? "unknown",
      organising_department: organizer.club_or_department ?? "unknown",
      primary_contact: organizer.name ?? "unknown",
      target_date: basics.target_date ?? "unknown",
      start_time: basics.start_time ?? "unknown",
      end_time: basics.end_time ?? "unknown",
      location_type: space.location_type ?? "unknown",
      location_details: space.preferred_space ?? space.location_details ?? "unknown",
      expected_attendance: basics.expected_attendance ?? "unknown",
      actual_attendance: basics.actual_attendance ?? "unknown",
      audience_types: basics.audience_types ?? [],
      registration_link: basics.registration_link ?? "unknown",
      free_or_paid: governance.free_or_paid ?? "unknown",
      business_case_required: governance.business_case_required ?? false,
      business_case_link: governance.business_case_link ?? "unknown",
      dean_attendance_status: governance.dean_attendance_status ?? (bool(speakers.dean_attendance_requested) ? "Requested" : "unknown"),
      crib_sheet_link: governance.crib_sheet_link ?? "unknown",
      security_review_status: governance.security_review_status ?? "unknown",
      advancement_review_status: governance.advancement_review_status ?? "unknown",
      editorial_content_tags: stringArray(governance.editorial_content_tags),
      editorial_theme: governance.editorial_theme ?? "unknown",
      content_priority: governance.content_priority ?? "unknown",
      events_oversight_review_date: governance.events_oversight_review_date ?? "unknown",
      editorial_review_date: governance.editorial_review_date ?? "unknown",
      event_promo_review_date: governance.event_promo_review_date ?? "unknown",
      ccn_review_date: governance.ccn_review_date ?? "unknown",
      ep_review_date: governance.ep_review_date ?? "unknown",
      has_external_speakers: speakers.has_external_speakers ?? false,
      speakers: speakers.speakers ?? [],
      faculty_attending: speakers.faculty_attending ?? [],
      total_faculty_hours: speakers.total_faculty_hours ?? "unknown",
      alumni_speakers: speakers.alumni_speakers ?? "unknown",
      media_expected: speakers.media_expected ?? false,
      vip_or_embassy_presence: speakers.vip_or_embassy_presence ?? false,
      guest_list_required: speakers.guest_list_required ?? false,
      needs_catering: catering.needs_catering ?? false,
      needs_alcohol: catering.needs_alcohol ?? false,
      catering_style: catering.catering_style ?? "unknown",
      needs_av: av.needs_av ?? false,
      recording: av.recording ?? false,
      livestreaming: av.livestreaming ?? false,
      has_sponsors: external.has_sponsors ?? false,
      sponsor_names: external.sponsor_names ?? [],
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
    subitems: [
      ...(stakeholderPackets?.stakeholder_packets.map((packet) => ({
        name: `${packet.stakeholder}: ${packet.status}`,
        owner_hint: packet.stakeholder,
        status: packet.status,
        due_hint: "Review in the relevant Monday view before the next lifecycle gate.",
        notes: [...packet.reasons, ...packet.suggested_next_actions].join(" "),
        related_fields: Object.keys(packet.relevant_facts)
      })) ?? []),
      {
        name: "Confirm lifecycle status and next review gate",
        owner_hint: "editorial_planning",
        status: "recommended",
        due_hint: "Before moving the item to the next Monday status",
        notes: `Current mock lifecycle status is ${lifecycleStatus}.`,
        related_fields: ["event_basics.lifecycle_phase", "event_basics.monday_status_hint"]
      },
      {
        name: "Capture post-event follow-up tasks",
        owner_hint: "task_owners",
        status: basics.lifecycle_phase === "post_event" ? "required" : "recommended",
        due_hint: "After the event date has passed",
        notes: "Track photos, thank-you emails, content publication, feedback, and lessons learned as Monday-style subitems.",
        related_fields: ["event_basics.actual_attendance", "planning_and_governance.editorial_content_tags"]
      }
    ],
    source_outputs_used: [
      ...(classification ? (["classification"] as const) : []),
      ...(stakeholderPackets ? (["stakeholder_packets"] as const) : [])
    ]
  });
}
