import { describe, expect, it } from "vitest";
import type { EventRequest, TieringClassificationResult } from "../schemas/ws4.js";
import { POLICY_DISCLAIMER } from "../schemas/ws4.js";
import { buildStakeholderPackets } from "./routingService.js";

const classification: TieringClassificationResult = {
  status: "classified",
  event_id: "evt",
  suggested_tier: "tier_3",
  tier_label: "High complexity",
  reasoning: ["High-profile event."],
  risk_flags: ["vip", "media_expected"],
  escalation_flags: ["security_review"],
  validator_notes: ["Validated."],
  policy_disclaimer: POLICY_DISCLAIMER
};

function event(overrides: Partial<EventRequest>): EventRequest {
  return {
    event_id: "evt",
    event_basics: {
      title: "Test Event",
      expected_attendance: 25,
      audience_types: ["students"]
    },
    ...overrides
  };
}

describe("buildStakeholderPackets", () => {
  it("routes a small internal workshop with a small packet set", () => {
    const result = buildStakeholderPackets(
      event({
        event_basics: {
          title: "Skills Workshop",
          event_type: "workshop",
          expected_attendance: 25,
          audience_types: ["students"]
        },
        space_and_setup: { space_confirmed: true }
      })
    );

    expect(result.stakeholders_required).toContain("space_management");
    expect(result.stakeholders_required).not.toContain("security");
    expect(result.stakeholders_required).not.toContain("catering_lexington");
  });

  it("routes an alumni reception to catering and campus services", () => {
    const result = buildStakeholderPackets(
      event({
        event_basics: {
          title: "Alumni Reception",
          event_type: "networking",
          expected_attendance: 80,
          audience_types: ["students", "alumni"]
        },
        catering: { needs_catering: true, needs_alcohol: true, dietary_requirements_known: false }
      })
    );

    expect(result.stakeholders_required).toContain("catering_lexington");
    expect(result.stakeholders_required).toContain("security");
    expect(result.stakeholders_recommended).toContain("advancement");
    expect(result.stakeholders_recommended).toContain("duty_managers_campus_services");
    expect(result.missing_information_by_stakeholder.some((item) => item.stakeholder === "catering_lexington")).toBe(true);
  });

  it("routes an external speaker event to editorial planning and AV", () => {
    const result = buildStakeholderPackets(
      event({
        event_basics: {
          title: "Fireside Chat",
          event_type: "speaker",
          expected_attendance: 60,
          audience_types: ["students", "external_guests"],
          external_audience: true
        },
        av_and_tech: { needs_av: true, microphones: true },
        speakers_and_guests: { has_external_speakers: true, speakers: [] }
      })
    );

    expect(result.stakeholders_required).toContain("av_technology");
    expect(result.stakeholders_recommended).toContain("editorial_planning");
    expect(result.stakeholders_recommended).toContain("event_promo_group");
    expect(result.missing_information_by_stakeholder.some((item) => item.stakeholder === "editorial_planning")).toBe(true);
  });

  it("routes a careers fair to SA operations and finance sponsorship", () => {
    const result = buildStakeholderPackets(
      event({
        event_basics: {
          title: "Careers Fair",
          event_type: "careers",
          expected_attendance: 200,
          audience_types: ["students", "corporate_partners"]
        },
        space_and_setup: { needs_booths: true, number_of_booths: 20 },
        sponsorship_and_external_parties: { has_sponsors: true, sponsor_names: ["Example Sponsor"] }
      })
    );

    expect(result.stakeholders_recommended).toContain("sa_operations");
    expect(result.stakeholders_required).toContain("finance_sponsorship");
    expect(result.stakeholders_required).toContain("sponsorship_team");
    expect(result.stakeholders_required).toContain("space_management");
  });

  it("routes a VIP/public leader event to security and editorial planning", () => {
    const result = buildStakeholderPackets(
      event({
        event_basics: {
          title: "VIP Central Banker Event",
          expected_attendance: 120,
          audience_types: ["students", "vip", "public"],
          external_audience: true
        },
        speakers_and_guests: {
          has_external_speakers: true,
          dean_attendance_requested: true,
          faculty_attending: ["Example Faculty"],
          vip_or_embassy_presence: true,
          media_expected: true,
          guest_list_required: true,
          sensitive_topic: "yes"
        }
      }),
      classification
    );

    expect(result.stakeholders_required).toContain("security");
    expect(result.stakeholders_required).toContain("editorial_planning");
    expect(result.stakeholders_required).toContain("dean_office");
    expect(result.stakeholders_required).toContain("editorial_group");
    expect(result.stakeholders_required).toContain("pr_managers_communications");
    expect(result.stakeholders_required).toContain("faculty");
    expect(result.cross_stakeholder_dependencies.length).toBeGreaterThan(0);
  });

  it("routes Monday lifecycle governance and content tags", () => {
    const result = buildStakeholderPackets(
      event({
        event_basics: {
          title: "Flagship Content Event",
          lifecycle_phase: "editorial_content_planning",
          monday_status_hint: "confirmed_subject_to_business_case",
          expected_attendance: 100,
          audience_types: ["students", "public"],
          registration_link: "https://example.com/register",
          external_audience: true
        },
        speakers_and_guests: {
          has_external_speakers: true,
          speakers: [{ name: "Speaker", organization: "Example Org" }],
          media_expected: true
        },
        planning_and_governance: {
          business_case_required: true,
          business_case_link: "mock-link",
          editorial_content_tags: ["Editorial Content", "Event Promo Group", "Social", "CC Network"],
          editorial_theme: "Leadership",
          content_priority: "Gold",
          photography_requested: true
        }
      })
    );

    expect(result.stakeholders_required).toContain("events_oversight_group");
    expect(result.stakeholders_required).toContain("editorial_group");
    expect(result.stakeholders_required).toContain("event_promo_group");
    expect(result.stakeholders_required).toContain("pr_managers_communications");
    expect(result.stakeholders_required).toContain("social_media");
    expect(result.stakeholders_required).toContain("photography");
    expect(result.stakeholders_recommended).toContain("cc_network");
    expect(result.stakeholders_recommended).toContain("task_owners");
  });
});
