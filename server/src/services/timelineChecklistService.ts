import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import {
  type PostPhase1KeyEventAssessment,
  type PostPhase1Stakeholder,
  type TimelineChecklist,
  timelineChecklistSchema
} from "../schemas/postPhase1.js";
import { allEventText, fieldText, includesAny, parseAttendance, readProcessedJson } from "./postPhase1DataService.js";

type RuleRecord = {
  id: string;
  timing?: string;
  rule: string;
};

type ChecklistItem = TimelineChecklist["items"][number];

function add(items: ChecklistItem[], item: ChecklistItem) {
  if (!items.some((existing) => existing.id === item.id)) items.push(item);
}

export function buildTimelineChecklist(
  eventRequest: EventReadinessEventRequest,
  keyEvent: PostPhase1KeyEventAssessment,
  stakeholders: PostPhase1Stakeholder[]
): TimelineChecklist {
  const text = allEventText(eventRequest);
  const attendance = parseAttendance(eventRequest);
  const rules = readProcessedJson<RuleRecord[]>("timeline/timeline_rules.json");
  const items: ChecklistItem[] = [];
  const filming = fieldText(eventRequest, "filming").toLowerCase();
  const filmingPositive = /filming|recording|photography/.test(filming) && !/\b(no|not applicable|none)\b/.test(filming);

  for (const rule of rules) {
    if (rule.id === "space-before-publicity") {
      add(items, {
        id: rule.id,
        timing: rule.timing ?? "before publicity",
        task: rule.rule,
        stakeholder: "Space Management",
        source: "lbs-files/processed/timeline/timeline_rules.json",
        priority: "required"
      });
    }
    if (rule.id === "catering-order" && includesAny(text, ["catering", "refreshments", "lunch", "reception", "food"])) {
      add(items, {
        id: rule.id,
        timing: rule.timing ?? "30 days before",
        task: rule.rule,
        stakeholder: "Catering Team",
        source: "lbs-files/processed/timeline/timeline_rules.json",
        priority: "required"
      });
    }
    if (rule.id === "catering-final-numbers" && includesAny(text, ["catering", "refreshments", "lunch", "reception", "food"])) {
      add(items, {
        id: rule.id,
        timing: rule.timing ?? "5 days before",
        task: rule.rule,
        stakeholder: "Catering Team",
        source: "lbs-files/processed/timeline/timeline_rules.json",
        priority: "required"
      });
    }
    if (rule.id === "security-large-events" && attendance !== undefined && attendance >= 100) {
      add(items, {
        id: rule.id,
        timing: rule.timing ?? "3 weeks before",
        task: rule.rule,
        stakeholder: "Security Team",
        source: "lbs-files/processed/timeline/timeline_rules.json",
        priority: "required"
      });
    }
    if (rule.id === "key-events-meeting" && keyEvent.key_event_candidate) {
      add(items, {
        id: rule.id,
        timing: rule.timing ?? "2 weeks before",
        task: rule.rule,
        stakeholder: "Duty Managers",
        source: "lbs-files/processed/timeline/timeline_rules.json",
        priority: "required"
      });
    }
  }

  if (keyEvent.key_event_candidate) {
    add(items, {
      id: "eis-submit",
      timing: "4 weeks before",
      task: "Prepare and submit the EIS-style information for Campus Services review.",
      stakeholder: "Duty Managers",
      source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md",
      priority: "required"
    });
  }

  if (includesAny(text, ["external speaker", "company speakers", "public leader", "ambassador", "senior public leader"])) {
    add(items, {
      id: "speaker-list-security",
      timing: "at least 4 weeks before",
      task: "Share speaker list and any sensitive/high-profile context with the Security speakers-and-guests route.",
      stakeholder: "Security Team",
      source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md",
      priority: "required"
    });
  }

  if (includesAny(text, ["panel", "keynote", "q&a", "lecture theatre"]) || filmingPositive) {
    add(items, {
      id: "av-confirm",
      timing: includesAny(text, ["recording", "filming", "complex", "nuffield"]) ? "2-3 months before" : "4 weeks before",
      task: "Confirm AV requirements, microphones, recording/streaming, and rehearsal needs.",
      stakeholder: "AV Team",
      source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md",
      priority: "required"
    });
  }

  if (fieldText(eventRequest, "registration_desk") && !/not required/i.test(fieldText(eventRequest, "registration_desk"))) {
    add(items, {
      id: "welcome-desk",
      timing: "ideally 3 weeks before",
      task: "Confirm registration or Welcome Desk support and guest-list process.",
      stakeholder: "Welcome Desk",
      source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md",
      priority: "recommended"
    });
  }

  for (const stakeholder of stakeholders) {
    for (const [index, timing] of stakeholder.timing.entries()) {
      add(items, {
        id: `${stakeholder.id}-source-${index}`,
        timing: timing.split(":")[0] || "source timing",
        task: timing.split(":").slice(1).join(":").trim() || stakeholder.reason,
        stakeholder: stakeholder.name,
        source: stakeholder.source,
        priority: stakeholder.priority
      });
    }
  }

  return timelineChecklistSchema.parse({
    items,
    source_notes: [
      "Checklist combines processed timeline rules with converted stakeholder lifecycle rows.",
      "This is a POC planning display, not a production scheduler.",
      "No external task or reminder was created."
    ]
  });
}
