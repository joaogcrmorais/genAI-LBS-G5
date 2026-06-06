import { describe, expect, it } from "vitest";
import {
  applyAiTurnToEventRequest,
  applySessionMemoryToEventRequest,
  detectEntryType,
  evaluateEventReadiness,
  evaluateEventRequestState,
  getEventReadinessBootstrap
} from "./eventReadinessService.js";

describe("eventReadinessService", () => {
  it("loads the active processed field map and scenarios", () => {
    const bootstrap = getEventReadinessBootstrap();

    expect(bootstrap.official_fields.length).toBeGreaterThan(20);
    expect(bootstrap.scenarios.map((scenario) => scenario.id)).toContain("prepared-alumni-panel");
    expect(bootstrap.source_of_truth.note).toContain("WS4");
    expect(bootstrap.epics.map((epic) => epic.id)).toEqual(["E-01", "E-02", "E-03", "E-04", "E-05", "E-06"]);
    expect(bootstrap.features.map((feature) => feature.id)).toContain("F-12");
    expect(bootstrap.user_stories.map((story) => story.story)).toContain("US-13");
  });

  it("builds a new EventRequest draft from a prepared-event scenario", () => {
    const result = evaluateEventReadiness({ scenario_id: "prepared-alumni-panel" });

    expect(result.entry_type).toBe("prepared_event_request");
    expect(result.event_request.fields.event_title).toBe("Alumni panel");
    expect(result.event_request.fields.number_of_attendees).toBe(80);
    expect(result.coverage.total_fields).toBeGreaterThan(20);
    expect(result.coverage.ready_fields).toBeGreaterThan(5);
    expect(result.next_questions.length).toBeLessThanOrEqual(5);
  });

  it("surfaces finance guidance for budget-only users", () => {
    const result = evaluateEventReadiness({ scenario_id: "budget-only" });

    expect(result.entry_type).toBe("budget_only_no_event_idea");
    expect(result.event_request.fields.event_type).toBe("Help me decide");
    expect(result.guidance_flags.map((flag) => flag.type)).toContain("finance_code");
    expect(result.guidance_flags.map((flag) => flag.type)).toContain("toolkit_shaping");
    expect(result.source_guidance.map((item) => item.type)).toContain("finance_code");
    expect(result.source_guidance.map((item) => item.type)).toContain("toolkit_shaping");
  });

  it("surfaces source guidance for space, catering, and timeline signals", () => {
    const result = evaluateEventReadiness({
      prompt:
        "We need a lecture theatre space for 120 people with catering, alcohol, and external audience guests."
    });

    expect(result.source_guidance.map((item) => item.type)).toContain("space_lookup");
    expect(result.source_guidance.map((item) => item.type)).toContain("catering_policy");
    expect(result.source_guidance.map((item) => item.type)).toContain("timeline_policy");
  });

  it("does not ask political confirmation for ordinary alumni/product events", () => {
    const eventRequest = applyAiTurnToEventRequest(undefined, {
      assistant_message: "Captured.",
      field_updates: [
        {
          key: "event_details",
          value: "Alumni panel about moving into Product roles and using AI day to day.",
          status: "final",
          rationale: "User gave the topic."
        }
      ],
      reasoning_summary: ["Ordinary career alumni topic."],
      unanswered_questions: []
    });
    const result = evaluateEventRequestState(eventRequest, "Alumni panel about Product and AI", detectEntryType("alumni panel"));

    expect(result.event_request.field_status.politically_sensitive_or_controversial).toBe("final");
    expect(String(result.event_request.fields.politically_sensitive_or_controversial)).toContain("No political");
    expect(result.guidance_flags.map((flag) => flag.type)).not.toContain("security_timeline");
    expect(result.next_questions.map((question) => question.field_key)).not.toContain(
      "politically_sensitive_or_controversial"
    );
  });

  it("treats concrete noise information as final and closes common misc fields", () => {
    const eventRequest = applyAiTurnToEventRequest(undefined, {
      assistant_message: "Captured.",
      field_updates: [
        {
          key: "event_details",
          value: "Panel followed by informal mixer.",
          status: "final",
          rationale: "User gave the format."
        },
        {
          key: "noise_impact",
          value: "There will be noise from 80 people talking after beer and wine.",
          status: "needs_confirmation",
          rationale: "User described noise."
        }
      ],
      reasoning_summary: ["User gave concrete noise rationale."],
      unanswered_questions: []
    });
    const result = evaluateEventRequestState(eventRequest, "There will be noise from 80 people talking.", detectEntryType("panel"));

    expect(result.event_request.field_status.noise_impact).toBe("final");
    expect(result.event_request.field_status.cloakroom).toBe("not_applicable");
    expect(result.event_request.field_status.decorations).toBe("not_applicable");
    expect(result.event_request.field_status.filming).toBe("not_applicable");
    expect(result.next_questions.map((question) => question.field_key)).not.toContain("cloakroom");
  });

  it("mines the careers-panel session so provided facts are not re-asked", () => {
    const transcript = [
      {
        role: "user" as const,
        content: "A careers panel for 120 people with ordinary-profile company speakers."
      },
      {
        role: "user" as const,
        content:
          "Careers in the Third Age: how Palantir and Anduril can save Middle-Earth. We want to host it 2 months from now, do we still have time? It's going to run from 19:00 to 22:00, and we'd like a large event hall, possibly Nuffield Hall"
      },
      {
        role: "user" as const,
        content:
          "I said in the first message. 120 attendees, a career panel where we will discuss these two companies in detail, with ordinary people from these two companies coming to speak"
      },
      {
        role: "user" as const,
        content:
          "Yes, there will be external guest speakers. We won't have food, but we will have alcohol. We will have a registration desk, it's 120 people"
      }
    ];
    const latest =
      "yes there will be noise. 120 people + alcohol = noise. I don't know how much in advance the registration desk will need to be set up, you tell me. No additional information that I can give you at the time. I also want to know, do we still have time to make this event happen in 2 months?";
    const eventRequest = applySessionMemoryToEventRequest(undefined, transcript, latest);
    const result = evaluateEventRequestState(eventRequest, latest, detectEntryType(transcript[0].content));
    const nextQuestionKeys = result.next_questions.map((question) => question.field_key);
    const spaceGuidance = result.source_guidance.find((item) => item.type === "space_lookup");

    expect(result.event_request.fields.number_of_attendees).toBe(120);
    expect(result.event_request.field_status.event_details).toBe("final");
    expect(result.event_request.field_status.external_guest_speaker_details).toBe("final");
    expect(result.event_request.field_status.noise_impact).toBe("final");
    expect(String(result.event_request.fields.space_and_setup)).toContain("Nuffield Hall");
    expect(result.source_guidance.map((item) => item.type)).toContain("timeline_policy");
    expect(JSON.stringify(spaceGuidance?.details)).toContain("Nuffield Hall");
    expect(nextQuestionKeys).not.toContain("number_of_attendees");
    expect(nextQuestionKeys).not.toContain("external_guest_speaker_details");
    expect(nextQuestionKeys).not.toContain("event_details");
  });

  it("mines the multi-room workshop session and respects final no-more-info answers", () => {
    const transcript = [
      {
        role: "user" as const,
        content: "An 80-person multi-room workshop with external attendees."
      },
      {
        role: "user" as const,
        content: "The title is \"World Quidditch Conference\", in exactly 6 months from today. There will be panels, mixers, discussions, networking"
      },
      {
        role: "user" as const,
        content:
          "We will need multiple rooms, lecture theatres for the panels and the Hive or similar for networking. There will be external guests. We will definetely require a registraton desk opening at 7 AM every day"
      },
      {
        role: "user" as const,
        content:
          "yes there will be noise, it's 80 people with alcohol. No additional info. There will be 5 external speakers speaker 1 speaker 2 speaker 3 speaker 4 speaker 5 none of them are VIPs or politically sensitive people"
      },
      {
        role: "user" as const,
        content: "start and finish: 8:00 to 16:00, nothing else to add, no additional informaton."
      }
    ];
    const latest =
      "no additional requirements for space and setup. there is no more additional informaton to provide. mark this asa FINAL. there are NO MORE ADDITIONAL ACTIVITIES PLANNED. MARK THIS AS FINAL";
    const eventRequest = applySessionMemoryToEventRequest(undefined, transcript, latest);
    const result = evaluateEventRequestState(eventRequest, latest, detectEntryType(transcript[0].content));
    const nextQuestionKeys = result.next_questions.map((question) => question.field_key);

    expect(result.event_request.fields.event_title).toBe("World Quidditch Conference");
    expect(result.event_request.fields.start_finish_time).toBe("8:00 to 16:00");
    expect(String(result.event_request.fields.external_guest_speaker_details)).toContain("Speaker 5");
    expect(String(result.event_request.fields.space_and_setup)).toContain("The Hive");
    expect(result.event_request.field_status.space_and_setup).toBe("final");
    expect(result.event_request.field_status.activities).toBe("final");
    expect(result.event_request.field_status.additional_information).toBe("final");
    expect(nextQuestionKeys).not.toContain("external_guest_speaker_details");
    expect(nextQuestionKeys).not.toContain("start_finish_time");
    expect(nextQuestionKeys).not.toContain("activities");
    expect(nextQuestionKeys).not.toContain("additional_information");
  });

  it("mines a dense custom infodump without flattening it into a generic response", () => {
    const prompt =
      "I, Denethor, am the organiser, and the Gondor Club is making the request. I do not have a mobile, I use giant eagles to communicate. Call 07000 000000 which will phone my deputy, Faramir if you need to call someone. Event is named Palantir Users yearly reunion 2026. Confirmed October 10th. It will run from 8am to 8pm. Audience is 200 external Palantir users from Middle Earth. Preferred venue is Nuffield Hall. The event will be a conference with a mixer. There will be external speakers, some of which are politically sensitive people, such as the White Wizard Saruman. Other external speakers include the Dark Lord Sauron and Pipin / Peregrin Tuk. There will be noise, as there will be alcohol from 5pm onwards, and food will be served 13:00-14:00. We will need a registration desk, yes. It should open at 7am, together with the cloakroom. There will be outside filming, yes. There is no finance code for this event and it may not exist in the LBS finance events database.";

    const eventRequest = applySessionMemoryToEventRequest(undefined, [], prompt);
    const result = evaluateEventRequestState(eventRequest, prompt, detectEntryType(prompt));

    expect(result.event_request.fields.organiser_name).toBe("Denethor");
    expect(result.event_request.fields.club_or_programme_affiliation).toBe("Gondor Club");
    expect(String(result.event_request.fields.contact_mobile_phone)).toContain("Faramir");
    expect(result.event_request.fields.event_title).toBe("Palantir Users yearly reunion 2026");
    expect(result.event_request.fields.date).toBe("October 10th");
    expect(result.event_request.fields.start_finish_time).toBe("8am to 8pm");
    expect(result.event_request.fields.number_of_attendees).toBe(200);
    expect(String(result.event_request.fields.audience)).toContain("200 external Palantir users");
    expect(result.event_request.fields.preferred_venue).toBe("Nuffield Hall");
    expect(result.event_request.fields.space_and_setup).toBe("Nuffield Hall");
    expect(String(result.event_request.fields.external_guest_speaker_details)).toContain("Saruman");
    expect(String(result.event_request.fields.external_guest_speaker_details)).toContain("Sauron");
    expect(String(result.event_request.fields.external_guest_speaker_details)).toContain("Pipin");
    expect(String(result.event_request.fields.politically_sensitive_or_controversial)).toContain("politically sensitive");
    expect(String(result.event_request.fields.catering)).toContain("13:00-14:00");
    expect(String(result.event_request.fields.alcohol)).toContain("5pm");
    expect(String(result.event_request.fields.registration_desk)).toContain("7am");
    expect(String(result.event_request.fields.cloakroom)).toContain("7am");
    expect(String(result.event_request.fields.filming)).toContain("Outside filming");
    expect(result.event_request.financeCode).toBeUndefined();
    expect(result.event_request.field_status.finance_code).toBe("needs_confirmation");
    expect(result.key_event_assessment.key_event_candidate).toBe(true);
    expect(result.key_event_assessment.counted_criteria).toContain("external_audience");
    expect(result.post_space_guidance.campus_groups.cost_center_code.value).toBe("Needs finance code");
    expect(result.post_space_guidance.eventscase.appears).toBe(true);
  });

  it("groups missing catering and alcohol into one food-and-drink question", () => {
    const result = evaluateEventRequestState(
      { fields: { event_details: "Panel for students." }, field_status: { event_details: "final" } },
      "Panel for students.",
      "general_event_idea"
    );

    expect(result.next_questions.some((question) => question.field_key === "food_and_drink")).toBe(true);
    expect(result.next_questions.some((question) => question.field_key === "catering")).toBe(false);
    expect(result.next_questions.some((question) => question.field_key === "alcohol")).toBe(false);
  });
});
