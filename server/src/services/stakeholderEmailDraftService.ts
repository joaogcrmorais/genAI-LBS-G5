import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import {
  POST_PHASE1_MOCK_NOTICE,
  type PostPhase1KeyEventAssessment,
  type PostPhase1Stakeholder,
  type StakeholderEmailDraft,
  stakeholderEmailDraftSchema
} from "../schemas/postPhase1.js";
import { fieldText } from "./postPhase1DataService.js";

function compactLines(lines: string[]) {
  return lines.filter((line) => line.trim().length > 0).join("\n");
}

function stakeholderTo(stakeholder: PostPhase1Stakeholder) {
  return stakeholder.email ? [stakeholder.email] : [];
}

function eventFacts(eventRequest: EventReadinessEventRequest) {
  return {
    organiser: fieldText(eventRequest, "organiser_name"),
    club: fieldText(eventRequest, "club_or_programme_affiliation"),
    contact_mobile_phone: fieldText(eventRequest, "contact_mobile_phone"),
    title: fieldText(eventRequest, "event_title"),
    attendees: fieldText(eventRequest, "number_of_attendees"),
    date: fieldText(eventRequest, "date"),
    time: fieldText(eventRequest, "start_finish_time"),
    type: fieldText(eventRequest, "event_type"),
    details: fieldText(eventRequest, "event_details"),
    speakers: fieldText(eventRequest, "external_guest_speaker_details"),
    sensitivity: fieldText(eventRequest, "politically_sensitive_or_controversial"),
    activities: fieldText(eventRequest, "activities"),
    space_and_setup: fieldText(eventRequest, "space_and_setup"),
    registration: fieldText(eventRequest, "registration_desk"),
    catering: fieldText(eventRequest, "catering"),
    alcohol: fieldText(eventRequest, "alcohol"),
    filming: fieldText(eventRequest, "filming"),
    filming_details: fieldText(eventRequest, "filming_details"),
    additional_information: fieldText(eventRequest, "additional_information")
  };
}

export function buildStakeholderEmailDrafts(
  eventRequest: EventReadinessEventRequest,
  stakeholders: PostPhase1Stakeholder[],
  keyEvent: PostPhase1KeyEventAssessment
): StakeholderEmailDraft[] {
  const facts = eventFacts(eventRequest);

  return stakeholders.map((stakeholder) => {
    const body = compactLines([
      `Hello ${stakeholder.name},`,
      "",
      `I am preparing ${facts.title} for ${facts.club} and wanted to share the current event details for your review.`,
      "",
      `Event: ${facts.title}`,
      `Date/time: ${facts.date}, ${facts.time}`,
      `Expected attendees: ${facts.attendees}`,
      `Format: ${facts.type}`,
      `Space/setup: ${facts.space_and_setup}`,
      `Activity details: ${facts.activities}`,
      facts.speakers && facts.speakers !== "Not applicable" ? `Speakers/guests: ${facts.speakers}` : "",
      facts.catering && facts.catering !== "No catering" ? `Catering: ${facts.catering}` : "",
      facts.alcohol && facts.alcohol !== "No alcohol" ? `Alcohol: ${facts.alcohol}` : "",
      facts.registration && facts.registration !== "Not required" ? `Registration/welcome desk: ${facts.registration}` : "",
      facts.filming && facts.filming !== "No filming" ? `Filming/photography: ${facts.filming}; ${facts.filming_details}` : "",
      facts.sensitivity && facts.sensitivity !== "No" ? `Sensitivity/risk context: ${facts.sensitivity}` : "",
      keyEvent.key_event_candidate ? `Key Event candidate note: ${keyEvent.rationale_user_facing}` : "",
      "",
      `Why I am contacting you: ${stakeholder.reason}`,
      stakeholder.needs.length ? `Information you may need: ${stakeholder.needs.join(", ")}.` : "",
      stakeholder.timing.length ? `Relevant source timing: ${stakeholder.timing.join(" | ")}` : "",
      stakeholder.contact_note ? `Contact note: ${stakeholder.contact_note}` : "",
      "",
      "Please let me know what else you need from me before I proceed.",
      "",
      `Best,`,
      `${facts.organiser}`,
      facts.contact_mobile_phone
    ]);

    return stakeholderEmailDraftSchema.parse({
      stakeholder_id: stakeholder.id,
      stakeholder_name: stakeholder.name,
      to: stakeholderTo(stakeholder),
      contact_note: stakeholder.contact_note,
      subject: `${facts.title}: ${stakeholder.name} planning review`,
      body,
      included_facts: facts,
      source_notes: [
        stakeholder.source,
        "Draft generated from completed EventRequest and stakeholder routing facts.",
        "No email was sent automatically."
      ],
      mock_notice: POST_PHASE1_MOCK_NOTICE
    });
  });
}
