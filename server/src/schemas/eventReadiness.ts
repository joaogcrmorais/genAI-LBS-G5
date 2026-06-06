import { z } from "zod";

export const fieldStatusSchema = z.enum([
  "final",
  "best_estimate",
  "not_sure_yet",
  "needs_confirmation",
  "not_applicable",
  "organiser_follow_up",
  "missing"
]);

export const entryTypeSchema = z.enum([
  "prepared_event_request",
  "budget_only_no_event_idea",
  "general_event_idea",
  "pasted_draft"
]);

export const eventReadinessEventRequestSchema = z
  .object({
    fields: z.record(z.unknown()).default({}),
    field_status: z.record(fieldStatusSchema).default({}),
    financeCode: z.string().optional(),
    additional_context: z.array(z.string()).optional()
  })
  .passthrough();

export const eventReadinessEvaluateRequestSchema = z.object({
  scenario_id: z.string().optional(),
  prompt: z.string().optional(),
  event_request: eventReadinessEventRequestSchema.optional()
});

export const eventReadinessChatMessageSchema = z.object({
  role: z.enum(["user", "assistant"]),
  content: z.string().min(1)
});

export const eventReadinessChatRequestSchema = z.object({
  message: z.string().min(1),
  transcript: z.array(eventReadinessChatMessageSchema).default([]),
  event_request: eventReadinessEventRequestSchema.optional()
});

export const stakeholderEmailEditSchema = z.object({
  email: z.string().optional(),
  subject: z.string().optional(),
  body: z.string().optional()
});

export const eventReadinessDraftSaveRequestSchema = z.object({
  draft_key: z.string().min(1).max(120).optional(),
  event_request: eventReadinessEventRequestSchema.optional(),
  email_edits: z.record(stakeholderEmailEditSchema).default({})
});

export const eventReadinessFieldUpdateSchema = z.object({
  key: z.string().min(1),
  value: z.unknown(),
  status: fieldStatusSchema,
  rationale: z.string().min(1)
});

export const eventReadinessAiTurnSchema = z.object({
  assistant_message: z.string().min(1),
  field_updates: z.array(eventReadinessFieldUpdateSchema),
  reasoning_summary: z.array(z.string().min(1)),
  unanswered_questions: z.array(z.string().min(1)).max(5)
});

export type FieldStatus = z.infer<typeof fieldStatusSchema>;
export type EntryType = z.infer<typeof entryTypeSchema>;
export type EventReadinessEventRequest = z.infer<typeof eventReadinessEventRequestSchema>;
export type EventReadinessEvaluateRequest = z.infer<typeof eventReadinessEvaluateRequestSchema>;
export type EventReadinessChatRequest = z.infer<typeof eventReadinessChatRequestSchema>;
export type EventReadinessDraftSaveRequest = z.infer<typeof eventReadinessDraftSaveRequestSchema>;
export type EventReadinessAiTurn = z.infer<typeof eventReadinessAiTurnSchema>;
