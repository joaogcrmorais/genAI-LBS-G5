export type Mark = "ok" | "confirm" | "unsure";

export type Block =
  | { t: "lead"; text: string }
  | { t: "p"; text: string }
  | { t: "reflect"; rows: { k: string; v: string; mark?: Mark }[] };

export type Reply = { text: string; primary?: boolean; echo?: string; mark?: Mark };

export type Round = {
  blocks: Block[];
  replies?:
    | { mode: "single"; label?: string; options: Reply[] }
    | { mode: "multi"; label?: string; sendEcho: string; preselect?: number[]; options: Reply[] }
    | { mode: "suggest"; options: [{ meta: string; text: string }] }
    | { mode: "end"; options: [{ text: string; restart: true }] };
  finish?: true;
  auto?: true;
  autoDelay?: number;
};

export type FieldStatus =
  | "final"
  | "best_estimate"
  | "not_sure_yet"
  | "needs_confirmation"
  | "not_applicable"
  | "organiser_follow_up"
  | "missing";

export type EventRequestDraft = {
  fields: Record<string, unknown>;
  field_status: Record<string, FieldStatus>;
  financeCode?: string;
  additional_context?: string[];
};

export type Stakeholder = {
  id: string;
  name: string;
  role: string;
  why: string;
  email: string;
  subject: string;
  body: string;
};

export type KeyEventInfo = {
  candidate: boolean;
  headline: string;
  reasons?: string[];
  checks?: string[];
  note?: string;
  disclaimer: string;
};

export type DemoScenario = {
  id: "keyEvent" | "standard";
  label: string;
  clubName: string;
  firstMessage: string;
  eventRequest: EventRequestDraft;
  displayFields: [string, string, Mark][];
  keyEvent: KeyEventInfo;
  stakeholders: Stakeholder[];
  timeline: [string, string, string][];
  mondayPayload: Record<string, unknown>;
  script: Round[];
};

export type BackendPostPhase1Result = {
  key_event?: {
    key_event_candidate: boolean;
    trigger_type: string;
    trigger_reasons: string[];
    counted_criteria: string[];
    rationale_user_facing?: string;
  };
  eis?: {
    required: boolean;
    markdown: string;
  };
  routing?: {
    stakeholders: Array<{ id: string; name: string; priority: string; email?: string; reason: string }>;
  };
  email_drafts?: Array<{
    stakeholder_id: string;
    stakeholder_name: string;
    to: string[];
    subject: string;
    body: string;
  }>;
  timeline?: { items: Array<{ timing: string; task: string; stakeholder: string; priority: string }> };
  post_space_guidance?: {
    space_management: { email: string; instruction: string };
    campus_groups: {
      appears: boolean;
      prompt: string;
      checklist: string[];
      draft_description: string;
      suggested_event_type: string;
      suggested_tags: string[];
      cost_center_code: { value: string; found: boolean; guidance: string; financeCode?: string };
      asset_reminders: string[];
      source_notes: string[];
    };
    eventscase: {
      appears: boolean;
      reason: string;
      email: string;
      timing_guidance: string;
      draft?: { subject: string; body: string };
    };
  };
  monday_mock?: Record<string, unknown>;
  coverage?: unknown;
  event_request?: EventRequestDraft;
};
