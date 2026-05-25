import { z } from "zod";

export const POLICY_DISCLAIMER = "Prototype guidance only; not official LBS policy." as const;
export const MONDAY_MOCK_NOTICE = "Mock payload only; no Monday.com API call was made." as const;

const looseObjectSchema = z.object({}).passthrough();

const missingInformationItemSchema = z.object({
  field: z.string().min(1),
  question: z.string().min(1)
});

export const eventRequestSchema = z
  .object({
    event_id: z.string().min(1).optional(),
    status: z.enum(["draft", "ready_for_review", "submitted"]).optional(),
    organizer: z
      .object({
        name: z.string().optional(),
        email: z.string().optional(),
        club_or_department: z.string().optional(),
        role: z.string().optional()
      })
      .passthrough()
      .optional(),
    event_basics: z
      .object({
        title: z.string().min(1),
        description: z.string().optional(),
        purpose: z.string().optional(),
        event_type: z.string().optional(),
        target_date: z.string().optional(),
        start_time: z.string().optional(),
        end_time: z.string().optional(),
        expected_attendance: z.number().int().nonnegative().nullable().optional(),
        audience_types: z.array(z.string()).optional(),
        external_audience: z.boolean().optional()
      })
      .passthrough(),
    space_and_setup: looseObjectSchema.optional(),
    catering: looseObjectSchema.optional(),
    av_and_tech: looseObjectSchema.optional(),
    speakers_and_guests: looseObjectSchema.optional(),
    sponsorship_and_external_parties: looseObjectSchema.optional(),
    intake_state: looseObjectSchema.optional()
  })
  .passthrough();

export type EventRequest = z.infer<typeof eventRequestSchema>;

export const classifiedTieringResultSchema = z.object({
  status: z.literal("classified"),
  event_id: z.string().min(1),
  suggested_tier: z.enum(["tier_1", "tier_2", "tier_3"]),
  tier_label: z.enum(["Low complexity", "Moderate complexity", "High complexity"]),
  reasoning: z.array(z.string().min(1)).min(1),
  risk_flags: z.array(z.string()),
  escalation_flags: z.array(z.string()),
  validator_notes: z.array(z.string()),
  policy_disclaimer: z.literal(POLICY_DISCLAIMER)
});

export const needsMoreInformationTieringResultSchema = z.object({
  status: z.literal("needs_more_information"),
  event_id: z.string().min(1),
  missing_information: z.array(missingInformationItemSchema).min(1),
  reasoning: z.array(z.string().min(1)).min(1),
  policy_disclaimer: z.literal(POLICY_DISCLAIMER)
});

export const tieringClassificationResultSchema = z.discriminatedUnion("status", [
  classifiedTieringResultSchema,
  needsMoreInformationTieringResultSchema
]);

export type TieringClassificationResult = z.infer<typeof tieringClassificationResultSchema>;

export const stakeholderSchema = z.enum([
  "space_management",
  "catering_lexington",
  "av_technology",
  "security",
  "editorial_planning",
  "duty_managers_campus_services",
  "sa_operations",
  "finance_sponsorship"
]);

export type Stakeholder = z.infer<typeof stakeholderSchema>;

export const stakeholderPacketResultSchema = z.object({
  event_id: z.string().min(1),
  stakeholders_required: z.array(stakeholderSchema),
  stakeholders_recommended: z.array(stakeholderSchema),
  stakeholders_not_needed: z.array(stakeholderSchema),
  stakeholder_packets: z.array(
    z.object({
      stakeholder: stakeholderSchema,
      status: z.enum(["required", "recommended"]),
      reasons: z.array(z.string().min(1)),
      relevant_facts: z.record(z.unknown()),
      missing_information: z.array(missingInformationItemSchema),
      suggested_next_actions: z.array(z.string().min(1))
    })
  ),
  cross_stakeholder_dependencies: z.array(z.string().min(1)),
  missing_information_by_stakeholder: z.array(
    z.object({
      stakeholder: stakeholderSchema,
      missing_information: z.array(missingInformationItemSchema)
    })
  )
});

export type StakeholderPacketResult = z.infer<typeof stakeholderPacketResultSchema>;

export const mondayPayloadRequestSchema = z.object({
  event_request: eventRequestSchema,
  classification: tieringClassificationResultSchema.optional(),
  stakeholder_packets: stakeholderPacketResultSchema.optional()
});

export const routingRequestSchema = z.object({
  event_request: eventRequestSchema,
  classification: tieringClassificationResultSchema.optional()
});

export const tieringRequestSchema = z.object({
  event_request: eventRequestSchema
});

export const mondayIntegrationPayloadSchema = z.object({
  integration_target: z.literal("monday.com"),
  integration_status: z.literal("mock_payload_ready"),
  mock_notice: z.literal(MONDAY_MOCK_NOTICE),
  event_id: z.string().min(1),
  board_hint: z.literal("LBS Event Oversight"),
  item_name: z.string().min(1),
  group_name: z.string().min(1),
  columns: z.record(z.unknown()),
  subitems: z.array(
    z.object({
      name: z.string().min(1),
      owner_hint: z.string().optional(),
      status: z.string().optional(),
      notes: z.string().optional()
    })
  ),
  source_outputs_used: z.array(z.enum(["classification", "stakeholder_packets"]))
});

export type MondayIntegrationPayload = z.infer<typeof mondayIntegrationPayloadSchema>;

export function getEventId(eventRequest: EventRequest) {
  return eventRequest.event_id || "draft_event";
}
