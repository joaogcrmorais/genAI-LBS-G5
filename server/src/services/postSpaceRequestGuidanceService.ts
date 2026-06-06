import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import {
  deriveFinanceCode,
  hasFinanceSignal,
  lookupFinanceCodes,
  normaliseFinanceText
} from "./financeCodeService.js";

export type PostSpaceRequestGuidance = {
  space_management: {
    email: "space@london.edu";
    instruction: string;
  };
  campus_groups: {
    appears: boolean;
    prompt: "What do I need to create a Campus Groups event page?";
    checklist: string[];
    draft_description: string;
    suggested_event_type: string;
    suggested_tags: string[];
    cost_center_code: {
      value: string;
      found: boolean;
      guidance: string;
      financeCode?: string;
    };
    asset_reminders: string[];
    source_notes: string[];
  };
  eventscase: {
    appears: boolean;
    reason: string;
    email: "saoperations@london.edu";
    timing_guidance: string;
    draft?: {
      subject: string;
      body: string;
    };
  };
};

function fieldText(eventRequest: EventReadinessEventRequest, key: string) {
  const value = eventRequest.fields[key];
  if (value === null || value === undefined) return "";
  return typeof value === "string" ? value.trim() : String(value);
}

function allText(eventRequest: EventReadinessEventRequest) {
  return [
    eventRequest.financeCode,
    ...Object.values(eventRequest.fields),
    ...(eventRequest.additional_context ?? [])
  ]
    .map((value) => String(value ?? ""))
    .join(" ")
    .toLowerCase();
}

function hasExternalAudience(eventRequest: EventReadinessEventRequest) {
  const text = allText(eventRequest);
  if (/\b(no|not|none)\b.{0,35}\b(external|alumni|industry|non-lbs|non lbs|guest speakers?)\b/.test(text)) {
    return false;
  }
  return (
    /\b(alumni|external guests?|external attendees?|external audience|external users?|industry partners?|non-lbs|non lbs|invited external|guest speakers?|company speakers?|public audience)\b/.test(
      text
    ) || /\bexternal\b.{0,40}\b(users?|attendees?|guests?|audience)\b/.test(text)
  );
}

function sentence(parts: string[]) {
  return parts.map((part) => part.trim()).filter(Boolean).join(" ");
}

function buildDescription(eventRequest: EventReadinessEventRequest) {
  const name = fieldText(eventRequest, "event_title") || "this LBS event";
  const club = fieldText(eventRequest, "club_or_programme_affiliation");
  const format = fieldText(eventRequest, "event_type");
  const purpose = fieldText(eventRequest, "event_details");
  const audience = fieldText(eventRequest, "audience") || fieldText(eventRequest, "number_of_attendees");
  const speaker = fieldText(eventRequest, "external_guest_speaker_details");
  const date = fieldText(eventRequest, "date");
  const time = fieldText(eventRequest, "start_finish_time");
  const location = fieldText(eventRequest, "preferred_venue") || fieldText(eventRequest, "space_and_setup");

  return sentence([
    `${name} is ${format ? `a ${format}` : "an event"}${club ? ` hosted by ${club}` : ""}.`,
    purpose,
    audience ? `Audience/scale: ${audience}.` : "",
    speaker && !normaliseFinanceText(speaker).includes("not applicable") ? `Speaker/topic context: ${speaker}.` : "",
    date || time ? `Planned timing: ${[date, time].filter(Boolean).join(", ")}.` : "",
    location ? `Location/setup: ${location}.` : ""
  ]);
}

function suggestEventType(eventRequest: EventReadinessEventRequest) {
  const text = normaliseFinanceText(`${fieldText(eventRequest, "event_type")} ${fieldText(eventRequest, "activities")}`);
  if (text.includes("reception") || text.includes("networking") || text.includes("mixer")) return "Networking / social event";
  if (text.includes("panel")) return "Panel / speaker event";
  if (text.includes("workshop")) return "Workshop";
  if (text.includes("conference")) return "Conference";
  if (text.includes("lunch") || text.includes("dinner")) return "Meal / reception";
  return fieldText(eventRequest, "event_type") || "Event";
}

function suggestTags(eventRequest: EventReadinessEventRequest) {
  const text = allText(eventRequest);
  const tags = new Set<string>();
  if (text.includes("alumni")) tags.add("Alumni");
  if (text.includes("external") || text.includes("speaker")) tags.add("Speaker");
  if (text.includes("career") || text.includes("industry")) tags.add("Careers");
  if (text.includes("networking") || text.includes("reception") || text.includes("mixer")) tags.add("Networking");
  if (text.includes("workshop")) tags.add("Workshop");
  if (text.includes("wine") || text.includes("beer") || text.includes("alcohol")) tags.add("Social");
  const club = fieldText(eventRequest, "club_or_programme_affiliation").replace(/\bclub\b/gi, "").trim();
  if (club) tags.add(club);
  return Array.from(tags).slice(0, 5);
}

function buildEventscaseDraft(eventRequest: EventReadinessEventRequest) {
  const eventName = fieldText(eventRequest, "event_title") || "[Event Name]";
  const club = fieldText(eventRequest, "club_or_programme_affiliation") || "[Club Name]";
  const organiser = fieldText(eventRequest, "organiser_name") || "[Name]";
  const dateTime = [fieldText(eventRequest, "date"), fieldText(eventRequest, "start_finish_time")].filter(Boolean).join(", ") || "[Date and Time]";
  const subject = `Eventscase page request - ${eventName} - ${club}`;
  const body = [
    "Hi SA Tech & Ops team,",
    "",
    "Please could you help create an Eventscase event page for the following event?",
    "",
    `- Name of event: ${eventName}`,
    `- Club hosting the event: ${club}`,
    `- Date and time of event: ${dateTime}`,
    "- Location of event: [insert location of event once Space Management answers the Space Request Form confirming a space]",
    "- Student admins for the event: [insert names and LBS email addresses. If the students do not have Eventscase accounts, please make sure they create one at https://lbs.eventscase.com/ so that the SA Ops team can grant them admin rights.]",
    "",
    "Best,",
    organiser
  ].join("\n");

  return { subject, body };
}

export function buildPostSpaceRequestGuidance(eventRequest: EventReadinessEventRequest, prompt = ""): PostSpaceRequestGuidance {
  const financeCode = deriveFinanceCode(eventRequest, prompt);
  const financeMatches = lookupFinanceCodes(eventRequest, prompt);
  const hasBudget = hasFinanceSignal(`${prompt} ${allText(eventRequest)}`);
  const externalAudience = hasExternalAudience(eventRequest);
  const costCenter = financeCode ?? financeMatches[0]?.finance_code;

  return {
    space_management: {
      email: "space@london.edu",
      instruction: "Email the Space Request Form to Space Management."
    },
    campus_groups: {
      appears: true,
      prompt: "What do I need to create a Campus Groups event page?",
      checklist: [
        "Event name",
        "Event description",
        "Start date and start time",
        "End date and end time",
        "Time zone",
        "Event type",
        "Event tags",
        "Event photo",
        "Flyer, if available",
        "Cost center code"
      ],
      draft_description: buildDescription(eventRequest),
      suggested_event_type: suggestEventType(eventRequest),
      suggested_tags: suggestTags(eventRequest),
      cost_center_code: {
        value: costCenter ?? "Needs finance code",
        found: Boolean(costCenter),
        guidance: costCenter
          ? "Confirm this likely cost center code with the club treasurer before submitting the Campus Groups event."
          : "No finance code has been captured for this event. Contact the club treasurer or Student Association finance contact before submitting the Campus Groups event.",
        financeCode: financeCode ?? undefined
      },
      asset_reminders: [
        "Before creating the Campus Groups event page, make sure you have: event photo, event flyer if using one, cost center code, final event description, and date, time, and location details.",
        "Event photo: Campus Groups crops this into a 380px high by 760px wide rectangle. Upload a photo with a width of 760px or more.",
        "Flyer: Used when people mouse over your event in the calendar, in email invitations, and in the event details section of the event page. Upload an image file such as .png or .jpg."
      ],
      source_notes: [
        "Post-Space Request Completion Output Spec.docx.",
        "Finance lookup uses lbs-files/processed/finance/finance_lookup_index.json.",
        hasBudget ? "Budget/spend context was detected." : "No explicit budget signal was required to show Campus Groups setup support."
      ]
    },
    eventscase: {
      appears: externalAudience,
      reason: externalAudience
        ? "External, alumni, industry, guest-speaker, or other non-current-student audience context appears in the EventRequest."
        : "No external attendee/audience signal detected.",
      email: "saoperations@london.edu",
      timing_guidance:
        "Copy this email into your email account and save it as a draft. Send it after Space Management confirms your room booking.",
      draft: externalAudience ? buildEventscaseDraft(eventRequest) : undefined
    }
  };
}
