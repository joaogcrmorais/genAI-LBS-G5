import type {
  EventRequest,
  Stakeholder,
  StakeholderPacketResult,
  TieringClassificationResult
} from "../schemas/ws4.js";
import { getEventId, stakeholderPacketResultSchema } from "../schemas/ws4.js";

const ALL_STAKEHOLDERS: Stakeholder[] = [
  "space_management",
  "catering_lexington",
  "av_technology",
  "security",
  "editorial_planning",
  "duty_managers_campus_services",
  "sa_operations",
  "finance_sponsorship"
];

type MissingInformation = { field: string; question: string };
type PacketDraft = {
  stakeholder: Stakeholder;
  status: "required" | "recommended";
  reasons: string[];
  relevant_facts: Record<string, unknown>;
  missing_information: MissingInformation[];
  suggested_next_actions: string[];
};

function bool(value: unknown) {
  return value === true;
}

function numberValue(value: unknown) {
  return typeof value === "number" ? value : null;
}

function stringArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is string => typeof item === "string") : [];
}

function includesAny(values: string[] | undefined, candidates: string[]) {
  return Boolean(values?.some((value) => candidates.includes(value)));
}

function pushPacket(packets: PacketDraft[], packet: PacketDraft) {
  packets.push({
    ...packet,
    reasons: [...new Set(packet.reasons)],
    suggested_next_actions: [...new Set(packet.suggested_next_actions)]
  });
}

export function buildStakeholderPackets(
  eventRequest: EventRequest,
  classification?: TieringClassificationResult
): StakeholderPacketResult {
  const basics = eventRequest.event_basics;
  const attendance = basics.expected_attendance ?? null;
  const audienceTypes = basics.audience_types ?? [];
  const catering = eventRequest.catering ?? {};
  const av = eventRequest.av_and_tech ?? {};
  const space = eventRequest.space_and_setup ?? {};
  const speakers = eventRequest.speakers_and_guests ?? {};
  const external = eventRequest.sponsorship_and_external_parties ?? {};

  const riskFlags = classification?.status === "classified" ? classification.risk_flags : [];
  const escalationFlags = classification?.status === "classified" ? classification.escalation_flags : [];
  const highTier = classification?.status === "classified" && classification.suggested_tier === "tier_3";
  const packets: PacketDraft[] = [];

  const spaceRequired =
    !bool(space.space_confirmed) ||
    bool(space.needs_booths) ||
    bool(space.needs_cloakroom) ||
    bool(space.needs_signage) ||
    numberValue(attendance) !== null;
  if (spaceRequired) {
    pushPacket(packets, {
      stakeholder: "space_management",
      status: "required",
      reasons: ["Space suitability and setup need confirmation."],
      relevant_facts: {
        preferred_space: space.preferred_space,
        expected_attendance: attendance,
        needs_booths: space.needs_booths,
        setup_notes: space.setup_notes
      },
      missing_information: bool(space.space_confirmed)
        ? []
        : [{ field: "space_and_setup.space_confirmed", question: "Has a suitable event space been confirmed?" }],
      suggested_next_actions: ["Confirm space availability, layout, capacity, and setup requirements."]
    });
  }

  if (bool(catering.needs_catering) || bool(catering.needs_alcohol)) {
    pushPacket(packets, {
      stakeholder: "catering_lexington",
      status: "required",
      reasons: [
        bool(catering.needs_catering) ? "Catering is requested." : "",
        bool(catering.needs_alcohol) ? "Alcohol service is requested." : ""
      ].filter(Boolean),
      relevant_facts: {
        catering_style: catering.catering_style,
        needs_alcohol: catering.needs_alcohol,
        expected_attendance: attendance,
        dietary_requirements_known: catering.dietary_requirements_known,
        budget_estimate: catering.budget_estimate
      },
      missing_information: bool(catering.dietary_requirements_known)
        ? []
        : [{ field: "catering.dietary_requirements_known", question: "Are dietary requirements known or still to be collected?" }],
      suggested_next_actions: ["Confirm catering format, guest count, alcohol requirements, and dietary needs."]
    });
  }

  if (
    bool(av.needs_av) ||
    bool(av.microphones) ||
    bool(av.projector_or_screen) ||
    bool(av.recording) ||
    bool(av.livestreaming) ||
    bool(av.hybrid) ||
    bool(av.complex_av)
  ) {
    pushPacket(packets, {
      stakeholder: "av_technology",
      status: "required",
      reasons: ["AV or technology support is requested."],
      relevant_facts: {
        microphones: av.microphones,
        projector_or_screen: av.projector_or_screen,
        recording: av.recording,
        livestreaming: av.livestreaming,
        hybrid: av.hybrid,
        complex_av: av.complex_av,
        av_notes: av.av_notes
      },
      missing_information: av.av_notes ? [] : [{ field: "av_and_tech.av_notes", question: "What AV setup or support is needed?" }],
      suggested_next_actions: ["Confirm AV setup, speaker requirements, recording, livestreaming, and test timing."]
    });
  }

  if (
    highTier ||
    bool(speakers.vip_or_embassy_presence) ||
    bool(speakers.media_expected) ||
    bool(speakers.guest_list_required) ||
    includesAny(riskFlags, ["vip", "media_expected", "security_review"]) ||
    includesAny(escalationFlags, ["security_review"])
  ) {
    pushPacket(packets, {
      stakeholder: "security",
      status: "required",
      reasons: ["The event may require guest control, VIP handling, security review, or reputational risk coordination."],
      relevant_facts: {
        vip_or_embassy_presence: speakers.vip_or_embassy_presence,
        media_expected: speakers.media_expected,
        guest_list_required: speakers.guest_list_required,
        sensitive_topic: speakers.sensitive_topic,
        escalation_flags: escalationFlags
      },
      missing_information: bool(speakers.guest_list_required)
        ? [{ field: "speakers_and_guests.guest_list", question: "Who owns the guest list and access control plan?" }]
        : [],
      suggested_next_actions: ["Confirm guest-list controls, VIP handling, and any security review needed."]
    });
  }

  if (
    highTier ||
    bool(speakers.has_external_speakers) ||
    bool(speakers.vip_or_embassy_presence) ||
    bool(speakers.media_expected) ||
    bool(external.has_sponsors) ||
    basics.external_audience === true ||
    audienceTypes.includes("public")
  ) {
    pushPacket(packets, {
      stakeholder: "editorial_planning",
      status: highTier || bool(speakers.vip_or_embassy_presence) || bool(speakers.media_expected) ? "required" : "recommended",
      reasons: ["External visibility, speakers, sponsors, or public audience may need positioning and oversight."],
      relevant_facts: {
        has_external_speakers: speakers.has_external_speakers,
        vip_or_embassy_presence: speakers.vip_or_embassy_presence,
        media_expected: speakers.media_expected,
        audience_types: audienceTypes,
        sponsor_names: external.sponsor_names
      },
      missing_information:
        bool(speakers.has_external_speakers) && stringArray(speakers.speakers).length === 0
          ? [{ field: "speakers_and_guests.speakers", question: "Who are the external speakers and what organisations do they represent?" }]
          : [],
      suggested_next_actions: ["Confirm event positioning, speaker context, sponsor visibility, and any reputational sensitivities."]
    });
  }

  if (attendance === null || (typeof attendance === "number" && attendance >= 80) || bool(catering.needs_alcohol)) {
    pushPacket(packets, {
      stakeholder: "duty_managers_campus_services",
      status: typeof attendance === "number" && attendance >= 150 ? "required" : "recommended",
      reasons: ["Campus operations may need awareness of timing, attendance, setup, or evening activity."],
      relevant_facts: {
        target_date: basics.target_date,
        start_time: basics.start_time,
        end_time: basics.end_time,
        expected_attendance: attendance,
        needs_alcohol: catering.needs_alcohol
      },
      missing_information: basics.target_date ? [] : [{ field: "event_basics.target_date", question: "What date or timing window is planned?" }],
      suggested_next_actions: ["Confirm operational cover, access needs, and day-of support."]
    });
  }

  if (basics.event_type === "careers" || bool(space.needs_booths) || includesAny(audienceTypes, ["corporate_partners"])) {
    pushPacket(packets, {
      stakeholder: "sa_operations",
      status: "recommended",
      reasons: ["Student Association operations may need to coordinate clubs, booths, partners, or student-facing logistics."],
      relevant_facts: {
        event_type: basics.event_type,
        needs_booths: space.needs_booths,
        number_of_booths: space.number_of_booths,
        audience_types: audienceTypes
      },
      missing_information: [],
      suggested_next_actions: ["Confirm club responsibilities, booth logistics, and organiser ownership."]
    });
  }

  if (bool(external.has_sponsors) || bool(external.requires_booth_or_branding) || bool(catering.budget_estimate)) {
    pushPacket(packets, {
      stakeholder: "finance_sponsorship",
      status: bool(external.has_sponsors) ? "required" : "recommended",
      reasons: ["Sponsorship, branding, vendor, or budget details may need finance or sponsorship review."],
      relevant_facts: {
        has_sponsors: external.has_sponsors,
        sponsor_names: external.sponsor_names,
        requires_booth_or_branding: external.requires_booth_or_branding,
        budget_estimate: catering.budget_estimate
      },
      missing_information:
        bool(external.has_sponsors) && stringArray(external.sponsor_names).length === 0
          ? [{ field: "sponsorship_and_external_parties.sponsor_names", question: "Which sponsors are involved?" }]
          : [],
      suggested_next_actions: ["Confirm sponsor names, branding expectations, vendor needs, and budget ownership."]
    });
  }

  const required = packets.filter((packet) => packet.status === "required").map((packet) => packet.stakeholder);
  const recommended = packets.filter((packet) => packet.status === "recommended").map((packet) => packet.stakeholder);
  const notNeeded = ALL_STAKEHOLDERS.filter((stakeholder) => !required.includes(stakeholder) && !recommended.includes(stakeholder));

  const dependencies: string[] = [];
  if (required.includes("catering_lexington") && required.includes("space_management")) {
    dependencies.push("Catering plans depend on confirmed space, capacity, and layout.");
  }
  if (required.includes("av_technology") && required.includes("editorial_planning")) {
    dependencies.push("Speaker positioning and AV requirements should be aligned before final briefing.");
  }
  if (required.includes("security") && (required.includes("editorial_planning") || recommended.includes("editorial_planning"))) {
    dependencies.push("Security and Editorial Planning should align on guest-list, VIP, media, and reputational considerations.");
  }

  return stakeholderPacketResultSchema.parse({
    event_id: getEventId(eventRequest),
    stakeholders_required: [...new Set(required)],
    stakeholders_recommended: [...new Set(recommended)],
    stakeholders_not_needed: notNeeded,
    stakeholder_packets: packets,
    cross_stakeholder_dependencies: dependencies,
    missing_information_by_stakeholder: packets
      .filter((packet) => packet.missing_information.length > 0)
      .map((packet) => ({
        stakeholder: packet.stakeholder,
        missing_information: packet.missing_information
      }))
  });
}
