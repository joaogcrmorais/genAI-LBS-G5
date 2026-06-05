import { z } from "zod";
import { eventReadinessEventRequestSchema } from "./eventReadiness.js";

export const POST_PHASE1_MOCK_NOTICE = "Proof-of-concept output only; no form, email, Monday item, or LBS system update was sent." as const;

export const postPhase1RunRequestSchema = z.object({
  scenario_id: z.string().optional(),
  event_request: eventReadinessEventRequestSchema,
  options: z
    .object({
      run_ai_risk: z.boolean().default(false)
    })
    .default({ run_ai_risk: false })
});

export const postPhase1FieldCoverageItemSchema = z.object({
  key: z.string(),
  label: z.string(),
  category: z.string(),
  status: z.string(),
  value: z.unknown(),
  ready: z.boolean()
});

export const postPhase1KeyEventAssessmentSchema = z.object({
  key_event_candidate: z.boolean(),
  trigger_type: z.enum(["attendance_100_plus", "criteria_threshold", "none"]),
  trigger_reasons: z.array(z.string()),
  counted_criteria: z.array(z.string()),
  non_counted_or_missing_criteria: z.array(z.string()),
  internal_signals: z.array(z.string()),
  rationale_user_facing: z.string(),
  rationale_internal: z.string(),
  source_notes: z.array(z.string())
});

export const postPhase1StakeholderSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().optional(),
  contact_note: z.string().optional(),
  source: z.string(),
  reason: z.string(),
  needs: z.array(z.string()),
  timing: z.array(z.string()),
  priority: z.enum(["required", "recommended"])
});

export const stakeholderEmailDraftSchema = z.object({
  stakeholder_id: z.string(),
  stakeholder_name: z.string(),
  to: z.array(z.string()),
  contact_note: z.string().optional(),
  subject: z.string(),
  body: z.string(),
  included_facts: z.record(z.unknown()),
  source_notes: z.array(z.string()),
  mock_notice: z.literal(POST_PHASE1_MOCK_NOTICE)
});

export const eisDraftSchema = z.object({
  required: z.boolean(),
  reason: z.string(),
  fields: z.record(
    z.object({
      label: z.string(),
      value: z.string(),
      status: z.enum(["final", "best_estimate", "needs_confirmation", "not_applicable"])
    })
  ),
  markdown: z.string(),
  source_notes: z.array(z.string())
});

export const timelineChecklistSchema = z.object({
  items: z.array(
    z.object({
      id: z.string(),
      timing: z.string(),
      task: z.string(),
      stakeholder: z.string(),
      source: z.string(),
      priority: z.enum(["required", "recommended", "context"])
    })
  ),
  source_notes: z.array(z.string())
});

export const complexityRiskResultSchema = z.object({
  status: z.enum(["classified", "skipped", "unavailable"]),
  suggested_complexity: z.enum(["low", "moderate", "high"]).optional(),
  risk_flags: z.array(z.string()).default([]),
  escalation_flags: z.array(z.string()).default([]),
  reasoning: z.array(z.string()).default([]),
  first_pass: z.unknown().optional(),
  challenger_notes: z.array(z.string()).default([]),
  source_notes: z.array(z.string()).default([])
});

export const mondayMockPayloadSchema = z.object({
  integration_target: z.literal("monday.com"),
  integration_status: z.literal("mock_payload_ready"),
  mock_notice: z.literal(POST_PHASE1_MOCK_NOTICE),
  item_name: z.string(),
  columns: z.record(z.unknown()),
  subitems: z.array(
    z.object({
      name: z.string(),
      owner_hint: z.string(),
      status: z.string(),
      notes: z.string()
    })
  )
});

export type PostPhase1RunRequest = z.infer<typeof postPhase1RunRequestSchema>;
export type PostPhase1KeyEventAssessment = z.infer<typeof postPhase1KeyEventAssessmentSchema>;
export type PostPhase1Stakeholder = z.infer<typeof postPhase1StakeholderSchema>;
export type StakeholderEmailDraft = z.infer<typeof stakeholderEmailDraftSchema>;
export type EisDraft = z.infer<typeof eisDraftSchema>;
export type TimelineChecklist = z.infer<typeof timelineChecklistSchema>;
export type ComplexityRiskResult = z.infer<typeof complexityRiskResultSchema>;
export type MondayMockPayload = z.infer<typeof mondayMockPayloadSchema>;
