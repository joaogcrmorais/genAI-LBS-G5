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
  "events_oversight_group",
  "dean_office",
  "editorial_group",
  "event_promo_group",
  "pr_managers_communications",
  "advancement",
  "cc_network",
  "social_media",
  "photography",
  "duty_managers_campus_services",
  "sa_operations",
  "finance_sponsorship",
  "sponsorship_team",
  "faculty",
  "task_owners"
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

function objectArray(value: unknown) {
  return Array.isArray(value) ? value.filter((item): item is Record<string, unknown> => typeof item === "object" && item !== null) : [];
}

function includesAny(values: string[] | undefined, candidates: string[]) {
  return Boolean(values?.some((value) => candidates.includes(value)));
}

function includesText(values: string[] | undefined, candidates: string[]) {
  return Boolean(values?.some((value) => candidates.some((candidate) => value.toLowerCase().includes(candidate.toLowerCase()))));
}

function stringValue(value: unknown) {
  return typeof value === "string" && value.trim() ? value : null;
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
  const governance = eventRequest.planning_and_governance ?? {};
  const lifecyclePhase = stringValue(basics.lifecycle_phase) ?? "unknown";
  const mondayStatus = stringValue(basics.monday_status_hint) ?? "unknown";
  const contentTags = stringArray(governance.editorial_content_tags);
  const facultyAttending = stringArray(speakers.faculty_attending);
  const speakerObjects = objectArray(speakers.speakers);
  const speakerNames = stringArray(speakers.speakers);
  const hasSpeakerDetails = speakerObjects.length > 0 || speakerNames.length > 0;
  const hasBusinessCase =
    bool(governance.business_case_required) ||
    Boolean(stringValue(governance.business_case_link)) ||
    includesText(stringArray(governance.event_overview_tags), ["business case"]);
  const deanRequested = bool(speakers.dean_attendance_requested) || Boolean(stringValue(governance.dean_attendance_status));
  const securityMarked =
    Boolean(stringValue(governance.security_review_status)) ||
    includesText(stringArray(governance.event_overview_tags), ["security"]);
  const advancementMarked =
    Boolean(stringValue(governance.advancement_review_status)) ||
    includesText(stringArray(governance.event_overview_tags), ["advancement"]);
  const eventPromoMarked =
    includesText(contentTags, ["event promo"]) || includesText(stringArray(governance.event_overview_tags), ["event promo"]);
  const editorialMarked =
    contentTags.length > 0 ||
    Boolean(stringValue(governance.editorial_theme)) ||
    Boolean(stringValue(governance.content_priority));

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
    securityMarked ||
    attendance !== null && attendance >= 100 ||
    bool(catering.needs_alcohol) ||
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
        expected_attendance: attendance,
        needs_alcohol: catering.needs_alcohol,
        security_review_status: governance.security_review_status,
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
    editorialMarked ||
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
        sponsor_names: external.sponsor_names,
        editorial_theme: governance.editorial_theme,
        content_priority: governance.content_priority,
        lifecycle_phase: lifecyclePhase,
        monday_status_hint: mondayStatus
      },
      missing_information:
        bool(speakers.has_external_speakers) && !hasSpeakerDetails
          ? [{ field: "speakers_and_guests.speakers", question: "Who are the external speakers and what organisations do they represent?" }]
          : [],
      suggested_next_actions: ["Confirm event positioning, speaker context, sponsor visibility, and any reputational sensitivities."]
    });
  }

  if (hasBusinessCase || highTier || includesAny(escalationFlags, ["business_case_review", "events_oversight"])) {
    pushPacket(packets, {
      stakeholder: "events_oversight_group",
      status: hasBusinessCase || highTier ? "required" : "recommended",
      reasons: ["The event may need business-case or strategic oversight review."],
      relevant_facts: {
        business_case_required: governance.business_case_required,
        business_case_link: governance.business_case_link,
        review_date: governance.events_oversight_review_date,
        expected_attendance: attendance,
        lifecycle_phase: lifecyclePhase,
        monday_status_hint: mondayStatus
      },
      missing_information: stringValue(governance.business_case_link)
        ? []
        : [{ field: "planning_and_governance.business_case_link", question: "Is there a business case link or decision note for oversight review?" }],
      suggested_next_actions: ["Confirm whether the event needs Events Oversight Group review and attach the business case if required."]
    });
  }

  if (deanRequested || bool(speakers.vip_or_embassy_presence) || highTier) {
    pushPacket(packets, {
      stakeholder: "dean_office",
      status: deanRequested ? "required" : "recommended",
      reasons: ["Dean attendance, senior visibility, or VIP context may require briefing coordination."],
      relevant_facts: {
        dean_attendance_requested: speakers.dean_attendance_requested,
        dean_attendance_status: governance.dean_attendance_status,
        dean_review_date: governance.dean_review_date,
        crib_sheet_link: governance.crib_sheet_link,
        vip_or_embassy_presence: speakers.vip_or_embassy_presence
      },
      missing_information: stringValue(governance.crib_sheet_link)
        ? []
        : [{ field: "planning_and_governance.crib_sheet_link", question: "Is a crib sheet or briefing link needed for senior attendance?" }],
      suggested_next_actions: ["Confirm Dean attendance status, review date, and briefing or crib sheet requirements."]
    });
  }

  if (editorialMarked || bool(speakers.media_expected) || highTier) {
    pushPacket(packets, {
      stakeholder: "editorial_group",
      status: bool(speakers.media_expected) || highTier ? "required" : "recommended",
      reasons: ["Editorial/content planning may be needed for event positioning or follow-up content."],
      relevant_facts: {
        editorial_content_tags: contentTags,
        editorial_theme: governance.editorial_theme,
        content_priority: governance.content_priority,
        editorial_review_date: governance.editorial_review_date,
        ep_review_date: governance.ep_review_date
      },
      missing_information: stringValue(governance.editorial_theme)
        ? []
        : [{ field: "planning_and_governance.editorial_theme", question: "What editorial theme or content angle applies, if any?" }],
      suggested_next_actions: ["Confirm content priority, editorial theme, and whether an article, video, or web item is expected."]
    });
  }

  if (eventPromoMarked || Boolean(stringValue(basics.registration_link)) || basics.external_audience === true) {
    pushPacket(packets, {
      stakeholder: "event_promo_group",
      status: eventPromoMarked ? "required" : "recommended",
      reasons: ["Promotion planning may be needed for registration, audience reach, or cross-channel coordination."],
      relevant_facts: {
        registration_link: basics.registration_link,
        event_promo_review_date: governance.event_promo_review_date,
        audience_types: audienceTypes,
        external_audience: basics.external_audience
      },
      missing_information: stringValue(basics.registration_link)
        ? []
        : [{ field: "event_basics.registration_link", question: "Is there a registration link or expected registration route?" }],
      suggested_next_actions: ["Confirm registration link, promotion owner, and channel plan."]
    });
  }

  if (bool(speakers.media_expected) || audienceTypes.includes("public") || bool(speakers.vip_or_embassy_presence)) {
    pushPacket(packets, {
      stakeholder: "pr_managers_communications",
      status: bool(speakers.media_expected) ? "required" : "recommended",
      reasons: ["Public, media, or high-profile visibility may require PR/communications review."],
      relevant_facts: {
        media_expected: speakers.media_expected,
        audience_types: audienceTypes,
        vip_or_embassy_presence: speakers.vip_or_embassy_presence,
        content_priority: governance.content_priority
      },
      missing_information: [],
      suggested_next_actions: ["Confirm media angle, spokesperson needs, embargo considerations, and external communications plan."]
    });
  }

  if (advancementMarked || audienceTypes.includes("alumni") || bool(speakers.alumni_speakers)) {
    pushPacket(packets, {
      stakeholder: "advancement",
      status: advancementMarked ? "required" : "recommended",
      reasons: ["Alumni, donor, or Advancement relevance may require relationship context and coordination."],
      relevant_facts: {
        audience_types: audienceTypes,
        alumni_speakers: speakers.alumni_speakers,
        advancement_review_status: governance.advancement_review_status
      },
      missing_information: [],
      suggested_next_actions: ["Confirm alumni speaker involvement, donor relevance, and whether Advancement should review attendees or speakers."]
    });
  }

  if (includesText(contentTags, ["cc network", "c&c network", "communications and content"])) {
    pushPacket(packets, {
      stakeholder: "cc_network",
      status: "recommended",
      reasons: ["The event is tagged for cross-functional Communications and Content Network awareness."],
      relevant_facts: {
        editorial_content_tags: contentTags,
        ccn_review_date: governance.ccn_review_date
      },
      missing_information: [],
      suggested_next_actions: ["Confirm whether CC Network review should happen and what content collaboration is expected."]
    });
  }

  if (includesText(contentTags, ["social"]) || bool(speakers.media_expected) || audienceTypes.includes("public")) {
    pushPacket(packets, {
      stakeholder: "social_media",
      status: includesText(contentTags, ["social"]) ? "required" : "recommended",
      reasons: ["Social media planning may be useful for promotion, live coverage, or post-event follow-up."],
      relevant_facts: {
        editorial_content_tags: contentTags,
        media_expected: speakers.media_expected,
        content_priority: governance.content_priority
      },
      missing_information: [],
      suggested_next_actions: ["Confirm social channel plan, handles, hashtags, visual assets, and post-event follow-up."]
    });
  }

  if (bool(governance.photography_requested) || includesText(stringArray(governance.event_overview_tags), ["photography"]) || highTier) {
    pushPacket(packets, {
      stakeholder: "photography",
      status: bool(governance.photography_requested) ? "required" : "recommended",
      reasons: ["Photography may be needed for event capture, editorial follow-up, or high-visibility records."],
      relevant_facts: {
        photography_requested: governance.photography_requested,
        content_priority: governance.content_priority,
        target_date: basics.target_date
      },
      missing_information: [],
      suggested_next_actions: ["Confirm photography need, shot list, usage rights, and delivery timeline."]
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

  if (bool(external.has_sponsors) || includesText(stringArray(governance.event_overview_tags), ["sponsorship"])) {
    pushPacket(packets, {
      stakeholder: "sponsorship_team",
      status: bool(external.has_sponsors) ? "required" : "recommended",
      reasons: ["Sponsorship visibility or support may require dedicated sponsor coordination."],
      relevant_facts: {
        has_sponsors: external.has_sponsors,
        sponsor_names: external.sponsor_names,
        requires_booth_or_branding: external.requires_booth_or_branding
      },
      missing_information:
        bool(external.has_sponsors) && stringArray(external.sponsor_names).length === 0
          ? [{ field: "sponsorship_and_external_parties.sponsor_names", question: "Which sponsors are involved?" }]
          : [],
      suggested_next_actions: ["Confirm sponsor names, benefits, branding, and recognition requirements."]
    });
  }

  if (facultyAttending.length > 0 || audienceTypes.includes("faculty") || numberValue(speakers.total_faculty_hours) !== null) {
    pushPacket(packets, {
      stakeholder: "faculty",
      status: facultyAttending.length > 0 ? "required" : "recommended",
      reasons: ["Faculty involvement may need tracking, briefing, or hours/context coordination."],
      relevant_facts: {
        faculty_attending: facultyAttending,
        total_faculty_hours: speakers.total_faculty_hours,
        audience_types: audienceTypes
      },
      missing_information: [],
      suggested_next_actions: ["Confirm faculty names, role, time commitment, and briefing needs."]
    });
  }

  if (
    packets.length >= 3 ||
    ["detailed_planning", "editorial_content_planning", "pre_event_execution", "post_event"].includes(lifecyclePhase)
  ) {
    pushPacket(packets, {
      stakeholder: "task_owners",
      status: "recommended",
      reasons: ["The event has enough moving parts to benefit from explicit task ownership and subitem tracking."],
      relevant_facts: {
        lifecycle_phase: lifecyclePhase,
        monday_status_hint: mondayStatus,
        stakeholder_packet_count: packets.length
      },
      missing_information: [],
      suggested_next_actions: ["Create or review subitems for owners, deadlines, blockers, links, and post-event follow-up."]
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
  if (required.includes("dean_office") && !required.includes("editorial_planning") && !recommended.includes("editorial_planning")) {
    dependencies.push("Dean's Office briefing should be aligned with Editorial Planning before senior attendance is confirmed.");
  }
  if (required.includes("events_oversight_group") && (required.includes("dean_office") || recommended.includes("dean_office"))) {
    dependencies.push("Events Oversight and Dean's Office decisions should be reconciled before final confirmation.");
  }
  if (required.includes("event_promo_group") && (required.includes("editorial_group") || recommended.includes("editorial_group"))) {
    dependencies.push("Event promotion should align with editorial/content priority and publication timing.");
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
