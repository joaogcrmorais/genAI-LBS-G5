import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import {
  type EisDraft,
  type PostPhase1KeyEventAssessment,
  eisDraftSchema
} from "../schemas/postPhase1.js";
import { fieldText, processedPath } from "./postPhase1DataService.js";
import fs from "node:fs";

type EisField = {
  label: string;
  value: string;
  status: "final" | "best_estimate" | "needs_confirmation" | "not_applicable";
};

function missing(label: string): EisField {
  return {
    label,
    value: "needs confirmation",
    status: "needs_confirmation"
  };
}

function value(label: string, valueText: string, status: EisField["status"] = "final"): EisField {
  return {
    label,
    value: valueText || "needs confirmation",
    status: valueText ? status : "needs_confirmation"
  };
}

function renderMarkdown(fields: Record<string, EisField>) {
  const template = fs.readFileSync(processedPath("request-event/eis_template.md"), "utf8");
  return Object.entries(fields).reduce(
    (current, [key, field]) => current.replaceAll(`{{${key}}}`, field.status === "needs_confirmation" ? `Needs confirmation: ${field.value}` : field.value),
    template
  );
}

export function buildEisDraft(
  eventRequest: EventReadinessEventRequest,
  keyEvent: PostPhase1KeyEventAssessment
): EisDraft {
  if (!keyEvent.key_event_candidate) {
    return eisDraftSchema.parse({
      required: false,
      reason: "EIS draft is generated only for Key Event candidates in this POC.",
      fields: {},
      markdown: "",
      source_notes: [
        "Source template: lbs-files/processed/request-event/eis_template.md.",
        "No EIS generated because deterministic Key Event candidate is false."
      ]
    });
  }

  const fields: Record<string, EisField> = {
    programme_event: value("Programme/Event", fieldText(eventRequest, "event_title")),
    date: value("Date/s", fieldText(eventRequest, "date")),
    programme_event_manager: value("Programme/Event Manager", fieldText(eventRequest, "organiser_name")),
    budget_code: missing("Budget Code for out of hours services"),
    room_booking_confirmation_number: missing("Room Bookings Confirmation Number"),
    proposed_number_of_attendees: value("Proposed number of attendees", fieldText(eventRequest, "number_of_attendees"), "best_estimate"),
    attendee_make_up: value(
      "Attendee Make Up",
      [
        fieldText(eventRequest, "event_details"),
        fieldText(eventRequest, "has_external_guest_speakers"),
        fieldText(eventRequest, "children_attending")
      ]
        .filter(Boolean)
        .join(" ")
    ),
    alcohol: value("Will alcohol be available?", fieldText(eventRequest, "alcohol")),
    music: value(
      "Will music be played?",
      [fieldText(eventRequest, "recorded_music"), fieldText(eventRequest, "live_music")].filter(Boolean).join("; ") || "No music indicated",
      "not_applicable"
    ),
    hired_equipment_services: value("Equipment/services being hired", fieldText(eventRequest, "outside_equipment"), "not_applicable"),
    disruptive_activities: value(
      "Games/activities/amusements causing disruption",
      [fieldText(eventRequest, "activities"), fieldText(eventRequest, "noise_impact")].filter(Boolean).join("; ")
    ),
    guest_speakers_performers: value("Guest speakers or performers", fieldText(eventRequest, "external_guest_speaker_details")),
    additional_information: value(
      "Additional information",
      [
        fieldText(eventRequest, "additional_information"),
        fieldText(eventRequest, "politically_sensitive_or_controversial"),
        keyEvent.rationale_internal
      ]
        .filter(Boolean)
        .join(" ")
    ),
    schedule: value("Timings/Schedule", fieldText(eventRequest, "start_finish_time")),
    requirements: value(
      "Operations Delivery team requirements",
      [
        fieldText(eventRequest, "space_and_setup"),
        fieldText(eventRequest, "registration_desk"),
        fieldText(eventRequest, "catering"),
        fieldText(eventRequest, "filming")
      ]
        .filter(Boolean)
        .join("; ")
    )
  };

  return eisDraftSchema.parse({
    required: true,
    reason: "Event is a deterministic Key Event candidate, so an EIS-style draft is generated from available EventRequest fields.",
    fields,
    markdown: renderMarkdown(fields),
    source_notes: [
      "Source template: lbs-files/processed/request-event/eis_template.md.",
      "Missing EIS-only values are marked as needs confirmation.",
      "No EIS form was submitted automatically."
    ]
  });
}
