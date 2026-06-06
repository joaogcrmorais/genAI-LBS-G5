import type { DemoScenario, EventRequestDraft, Mark, Round, Stakeholder } from "../types/eventReadinessMvp";

const keys = [
  ["Submission timing", "submission_timing"],
  ["Organiser", "organiser_name"],
  ["Deputy / contact", "contact_mobile_phone"],
  ["Event title", "event_title"],
  ["Expected attendance", "number_of_attendees"],
  ["Date", "date"],
  ["Timing", "start_finish_time"],
  ["Event format", "event_type"],
  ["Purpose", "event_details"],
  ["Audience", "audience"],
  ["External speaker", "external_guest_speaker_details"],
  ["Political sensitivity", "politically_sensitive_or_controversial"],
  ["Children under 18", "children_attending"],
  ["Preferred venue", "preferred_venue"],
  ["Room configuration", "space_and_setup"],
  ["Additional spaces", "additional_spaces"],
  ["Registration", "registration_desk"],
  ["Catering", "catering"],
  ["Alcohol", "alcohol"],
  ["Audio-visual", "audio_visual"],
  ["Music", "recorded_music"],
  ["Decorations", "decorations"],
  ["Cloakroom", "cloakroom"],
  ["Outside equipment", "outside_equipment"],
  ["Filming", "filming"],
  ["Streaming media", "streaming_media"],
  ["Finance code", "finance_code"],
  ["Additional context", "additional_information"]
] as const;

function eventRequest(values: Record<string, unknown>, statuses: Record<string, Mark> = {}): EventRequestDraft {
  const fields: Record<string, unknown> = {};
  const field_status: EventRequestDraft["field_status"] = {};
  for (const [, key] of keys) {
    fields[key] = values[key] ?? "Not applicable";
    const mark = statuses[key] ?? "ok";
    field_status[key] = mark === "ok" ? "final" : mark === "confirm" ? "needs_confirmation" : "not_sure_yet";
  }

  const aliases: Record<string, string> = {
    audience: "event_details",
    preferred_venue: "space_and_setup",
    additional_spaces: "space_and_setup",
    audio_visual: "activities",
    streaming_media: "filming_details",
    finance_code: "additional_information",
    submission_timing: "additional_information"
  };
  for (const [source, target] of Object.entries(aliases)) {
    fields[target] = [fields[target], `${keys.find(([, key]) => key === source)?.[0]}: ${fields[source]}`]
      .filter(Boolean)
      .join(" | ");
    field_status[target] = field_status[target] ?? field_status[source];
  }

  return { fields, field_status, financeCode: typeof values.finance_code === "string" ? values.finance_code : undefined };
}

function displayFields(draft: EventRequestDraft, statuses: Record<string, Mark> = {}): [string, string, Mark][] {
  return keys.map(([label, key]) => [label, String(draft.fields[key] ?? ""), statuses[key] ?? "ok"]);
}

function stakeholder(id: string, name: string, role: string, why: string, email: string, subject: string, body: string): Stakeholder {
  return { id, name, role, why, email, subject, body };
}

const keyValues = {
  submission_timing: "12+ weeks before event",
  organiser_name: "Priya Nadkarni",
  contact_mobile_phone: "Priya Nadkarni, FinTech Club; deputy contact needs confirmation",
  event_title: "In Conversation: Group CEO, Meridian Bank",
  number_of_attendees: 60,
  date: "Thu 27 Nov 2026",
  start_finish_time: "18:30 to 20:30",
  event_type: "Fireside chat and reception",
  event_details:
    "Student-led fireside with Marcus Halvorsen on bank transformation, followed by networking for students, alumni, and external guests.",
  audience: "Students, alumni, and invited external guests",
  external_guest_speaker_details: "Marcus Halvorsen, Group CEO, Meridian Bank",
  politically_sensitive_or_controversial: "No political sensitivity indicated; high-profile external speaker requires review.",
  children_attending: "No children under 18 expected",
  preferred_venue: "Lecture theatre plus reception space",
  space_and_setup: "Theatre seating for fireside chat; standing reception nearby",
  additional_spaces: "Registration desk and speaker green room",
  registration_desk: "Registration desk required from 17:45",
  catering: "Reception catering required",
  alcohol: "Wine and beer reception",
  audio_visual: "Microphones, screen, and recording support",
  recorded_music: "No recorded music planned",
  decorations: "No decorations planned",
  cloakroom: "Not sure yet",
  outside_equipment: "No outside equipment indicated",
  filming: "Recording requested for internal LBS use",
  streaming_media: "No movies, TV, or live TV streaming",
  finance_code: "FINCLUB-FT-2026",
  additional_information: "High-profile banking CEO; external audience; Dean's Office may need awareness."
};

const keyStatuses: Record<string, Mark> = {
  contact_mobile_phone: "confirm",
  cloakroom: "unsure",
  filming: "confirm"
};

const standardValues = {
  submission_timing: "4-12 weeks before event",
  organiser_name: "Sofia Marchetti",
  contact_mobile_phone: "Sofia Marchetti, Wine Society; phone number needs confirmation",
  event_title: "Wine Society Autumn Social",
  number_of_attendees: 40,
  date: "Thu 29 Oct 2026",
  start_finish_time: "18:30 to 21:00",
  event_type: "Mixer / reception",
  event_details: "Members-only autumn social for Wine Society students with light snacks and informal networking.",
  audience: "LBS students / Wine Society members only",
  external_guest_speaker_details: "No external speaker",
  politically_sensitive_or_controversial: "No",
  children_attending: "No children under 18 expected",
  preferred_venue: "Informal reception space",
  space_and_setup: "Standing reception layout with a small welcome area",
  additional_spaces: "No additional rooms required",
  registration_desk: "Simple check-in by organisers",
  catering: "Light snacks required",
  alcohol: "Wine service requested",
  audio_visual: "Microphone for welcome remarks and background playlist",
  recorded_music: "Background playlist",
  decorations: "No decorations planned",
  cloakroom: "No cloakroom required",
  outside_equipment: "No outside equipment indicated",
  filming: "No filming",
  streaming_media: "No movies, TV, or live TV streaming",
  finance_code: "FINCLUB-WS-2026",
  additional_information: "Routine student social; alcohol service means Catering and Security awareness are useful."
};

const standardStatuses: Record<string, Mark> = {
  contact_mobile_phone: "confirm"
};

const keyDraft = eventRequest(keyValues, keyStatuses);
const standardDraft = eventRequest(standardValues, standardStatuses);

const sharedDisclaimer =
  "This is a planning signal for LBS review, not a final institutional decision. The relevant LBS team remains the source of truth.";

const keyStakeholders = [
  stakeholder(
    "space",
    "Space Management",
    "Venue and setup",
    "Space and room setup",
    "space@london.edu",
    "Space request - In Conversation: Group CEO, Meridian Bank",
    "Hello Space Management,\n\nPlease see the draft event details for In Conversation: Group CEO, Meridian Bank on Thu 27 Nov 2026, 18:30 to 20:30. We expect around 60 attendees and need a lecture theatre plus nearby reception space, with registration and a speaker green room.\n\nItems marked [needs confirmation]: deputy contact, cloakroom, and recording details.\n\nBest,\nPriya"
  ),
  stakeholder(
    "catering",
    "Catering / Lexington",
    "Food and beverage",
    "Catering and alcohol",
    "cateringevents@london.edu",
    "Reception catering - Meridian Bank fireside",
    "Hello Catering team,\n\nThe FinTech Club is planning a wine and beer reception after a fireside chat on Thu 27 Nov 2026. Expected attendance is about 60, with students, alumni, and external guests.\n\nPlease advise on reception catering options and alcohol service requirements.\n\nBest,\nPriya"
  ),
  stakeholder(
    "av",
    "AV / Technology",
    "Microphones and recording",
    "Mic, screen, recording",
    "avhelp@london.edu",
    "AV support - Meridian Bank fireside",
    "Hello AV team,\n\nCould you advise on microphones, screen support, and recording for a fireside chat with Marcus Halvorsen on Thu 27 Nov 2026, 18:30 to 20:30?\n\nRecording details are currently [needs confirmation].\n\nBest,\nPriya"
  ),
  stakeholder(
    "security",
    "Security",
    "External guests and alcohol",
    "VIP and external guests",
    "security@london.edu",
    "Security awareness - high-profile external speaker",
    "Hello Security team,\n\nThe FinTech Club is planning an event with Marcus Halvorsen, Group CEO of Meridian Bank, plus external guests and a wine/beer reception. Expected attendance is around 60.\n\nPlease advise whether any arrival, guest-list, or alcohol-service controls are needed.\n\nBest,\nPriya"
  ),
  stakeholder(
    "welcome",
    "Welcome Desk / Registration",
    "Guest arrival",
    "Registration desk",
    "welcomedesk@london.edu",
    "Registration support - Meridian Bank fireside",
    "Hello Welcome Desk team,\n\nWe expect around 60 attendees, including alumni and external guests, for a FinTech Club fireside chat on Thu 27 Nov 2026. A registration desk is requested from 17:45.\n\nPlease advise on guest-list handling.\n\nBest,\nPriya"
  ),
  stakeholder(
    "dean",
    "Dean's Office / Editorial Planning",
    "Senior external speaker",
    "High-profile speaker",
    "editorialplanning@london.edu",
    "Awareness: Group CEO Meridian Bank event",
    "Hello Editorial Planning team,\n\nFlagging a proposed FinTech Club fireside chat with Marcus Halvorsen, Group CEO of Meridian Bank, on Thu 27 Nov 2026. The audience includes students, alumni, and external guests.\n\nPlease advise whether any senior-stakeholder awareness or protocol steps are needed; toolkit guidance says student Dean invitation requests should route via Editorial Planning rather than direct Dean's Office contact.\n\nBest,\nPriya"
  )
];

const standardStakeholders = [
  stakeholder(
    "space",
    "Space Management",
    "Venue and setup",
    "Reception space",
    "space@london.edu",
    "Space request - Wine Society Autumn Social",
    "Hello Space Management,\n\nThe Wine Society is planning a members-only autumn social on Thu 29 Oct 2026, 18:30 to 21:00, for approximately 40 students. We need an informal reception space with standing layout and a small welcome area.\n\nBest,\nSofia"
  ),
  stakeholder(
    "catering",
    "Catering / Lexington",
    "Food and beverage",
    "Wine and snacks",
    "cateringevents@london.edu",
    "Catering request - Wine Society Autumn Social",
    "Hello Catering team,\n\nCould you advise on wine service and light snacks for a 40-person Wine Society student social on Thu 29 Oct 2026, 18:30 to 21:00?\n\nBest,\nSofia"
  ),
  stakeholder(
    "av",
    "AV / Technology",
    "Welcome mic",
    "Mic and playlist",
    "avhelp@london.edu",
    "AV support - Wine Society Autumn Social",
    "Hello AV team,\n\nThe Wine Society would like a basic microphone for welcome remarks and support for a background playlist on Thu 29 Oct 2026.\n\nBest,\nSofia"
  )
];

function script(scenario: "key" | "standard"): Round[] {
  const isKey = scenario === "key";
  return [
    {
      blocks: [
        { t: "lead", text: "Hello - tell me what you are trying to run, even if it is still rough." },
        { t: "p", text: "I will turn it into a Space Request-ready event profile, keep uncertainty visible, and keep moving toward downloadable outputs." }
      ],
      replies: {
        mode: "suggest",
        options: [{ meta: "Send your description", text: isKey ? demoScenariosSeed.keyEvent : demoScenariosSeed.standard }]
      }
    },
    {
      blocks: [
        { t: "lead", text: "Great. I can already see the outline." },
        {
          t: "reflect",
          rows: [
            { k: "Event", v: isKey ? keyValues.event_title : standardValues.event_title, mark: "ok" },
            { k: "Scale", v: isKey ? "~60 attendees" : "~40 members", mark: "ok" },
            { k: "Risk signal", v: isKey ? "High-profile external speaker" : "Routine student social", mark: isKey ? "confirm" : "ok" }
          ]
        },
        { t: "p", text: "Next I need the accountable organiser details and the club context." }
      ],
      replies: {
        mode: "single",
        options: [{ text: isKey ? "Priya from FinTech Club" : "Sofia from Wine Society", primary: true }]
      }
    },
    {
      blocks: [
        { t: "lead", text: "Captured. Let us make the timing usable." },
        { t: "p", text: "I can use a provisional date/time if the room booking is still being checked." }
      ],
      replies: {
        mode: "single",
        options: [{ text: isKey ? "Thu 27 Nov 2026, 18:30-20:30" : "Thu 29 Oct 2026, 18:30-21:00", primary: true }]
      }
    },
    {
      blocks: [
        { t: "lead", text: "That covers the core event facts." },
        {
          t: "reflect",
          rows: [
            { k: "Format", v: isKey ? "Fireside chat and reception" : "Mixer / reception", mark: "ok" },
            { k: "Audience", v: isKey ? "Students, alumni, external guests" : "LBS student members only", mark: "ok" },
            { k: "Purpose", v: isKey ? "Bank transformation conversation" : "Community-building social", mark: "ok" }
          ]
        }
      ],
      replies: {
        mode: "multi",
        sendEcho: isKey ? "Students, alumni, external guests" : "Wine Society members only",
        preselect: isKey ? [0, 1, 2] : [0],
        options: [
          { text: "Current students" },
          { text: "Alumni" },
          { text: "External guests" },
          { text: "Faculty / staff" }
        ]
      }
    },
    {
      blocks: [
        { t: "lead", text: "Now the speaker and sensitivity fields." },
        { t: "p", text: isKey ? "A Group CEO is enough to keep senior-stakeholder review visible after the form is drafted." : "No external speaker means the later Key Event check should stay green unless another signal appears." }
      ],
      replies: {
        mode: "single",
        options: [{ text: isKey ? "Marcus Halvorsen, Group CEO, Meridian Bank. Not politically sensitive." : "No external speaker and no sensitive topic.", primary: true }]
      }
    },
    {
      blocks: [
        { t: "lead", text: "Let us map the room and setup." },
        { t: "p", text: "If you are unsure, I can mark the room as a recommendation request rather than blocking the draft." }
      ],
      replies: {
        mode: "multi",
        sendEcho: isKey ? "Lecture theatre, reception space, registration desk, speaker green room" : "Reception space with simple organiser check-in",
        preselect: isKey ? [0, 1, 2, 3] : [1],
        options: [
          { text: "Lecture theatre" },
          { text: "Reception space" },
          { text: "Registration desk" },
          { text: "Speaker green room" }
        ]
      }
    },
    {
      blocks: [
        { t: "lead", text: "Food, drink, and services next." },
        { t: "p", text: "Alcohol changes the routing even for otherwise simple events, so I will keep it explicit." }
      ],
      replies: {
        mode: "multi",
        sendEcho: isKey ? "Reception catering, wine and beer, no live music" : "Wine, light snacks, background playlist",
        preselect: isKey ? [0, 1] : [0, 1, 2],
        options: [{ text: "Catering" }, { text: "Alcohol" }, { text: "Background playlist" }, { text: "Cloakroom unsure" }]
      }
    },
    {
      blocks: [
        { t: "lead", text: "AV and media." },
        { t: "p", text: isKey ? "Microphones, screen, and recording will pull AV into the readiness panel." : "A welcome mic and playlist support are enough for AV, but there is no filming or media signal." }
      ],
      replies: {
        mode: "single",
        options: [{ text: isKey ? "Mic, screen, and recording for internal LBS use" : "Mic for welcome and playlist only; no filming", primary: true }]
      }
    },
    {
      blocks: [
        { t: "lead", text: "I have enough to create the first Space Request draft." },
        { t: "p", text: "Some fields can stay marked as needs confirmation. For this MVP, I will unlock the downloads and next-step routing now." }
      ],
      replies: {
        mode: "single",
        options: [{ text: "Generate the readiness pack", primary: true }]
      }
    },
    {
      finish: true,
      auto: true,
      autoDelay: 1800,
      blocks: [
        { t: "lead", text: "Building the readiness pack now." },
        { t: "p", text: "Space Request, Key Event check, stakeholder emails, and operational summaries will appear in the panel." }
      ]
    },
    {
      blocks: [
        { t: "lead", text: "Ready. The draft is complete enough to take forward." },
        { t: "p", text: isKey ? "This event may be considered a Key Event, so I have also prepared an EIS draft download and routed six teams." : "This looks like a standard event. I have skipped EIS and routed only the operational teams." }
      ],
      replies: { mode: "end", options: [{ text: "Start a new event", restart: true }] }
    }
  ];
}

const demoScenariosSeed = {
  keyEvent:
    "We want to host a FinTech Club fireside chat with Marcus Halvorsen, Group CEO of Meridian Bank, for around 60 students, alumni and invited external guests. We want wine and beer afterwards, a registration desk, mic, screen and recording.",
  standard:
    "Wine Society wants an autumn social for around 40 LBS student members. It is a mixer reception with wine, light snacks, a short welcome on a mic and a background playlist."
};

export const demoScenarios: DemoScenario[] = [
  {
    id: "keyEvent",
    label: "Key Event",
    clubName: "FinTech Club",
    firstMessage: demoScenariosSeed.keyEvent,
    eventRequest: keyDraft,
    displayFields: displayFields(keyDraft, keyStatuses),
    keyEvent: {
      candidate: true,
      headline: "Could be considered a Key Event",
      reasons: ["High-profile external speaker", "External audience beyond current students"],
      disclaimer: sharedDisclaimer
    },
    stakeholders: keyStakeholders,
    timeline: [
      ["Now", "Confirm speaker protocol and event owner", "Deputy contact and recording use still need confirmation."],
      ["8-12 weeks out", "Submit space and AV requirements", "Lecture theatre, reception space, screen, mics, and recording."],
      ["4-6 weeks out", "Confirm catering, alcohol, registration, and security approach", "External guests and alcohol should be visible early."],
      ["2 weeks out", "Circulate final guest list and run of show", "Include arrival plan and any VIP protocol notes."]
    ],
    mondayPayload: {
      item_name: "In Conversation: Group CEO, Meridian Bank",
      columns: {
        organiser: "Priya Nadkarni",
        club: "FinTech Club",
        key_event_candidate: true,
        stakeholder_count: 6,
        finance_code: "FINCLUB-FT-2026"
      }
    },
    script: script("key")
  },
  {
    id: "standard",
    label: "Standard",
    clubName: "Wine Society",
    firstMessage: demoScenariosSeed.standard,
    eventRequest: standardDraft,
    displayFields: displayFields(standardDraft, standardStatuses),
    keyEvent: {
      candidate: false,
      headline: "Not a Key Event",
      checks: [
        "Attendance around 40, below the 100+ attendance trigger.",
        "Audience is entirely LBS students.",
        "Routine student-club operations.",
        "No external speaker or media."
      ],
      note: "The alcohol and catering requirements still route to operational teams.",
      disclaimer: sharedDisclaimer
    },
    stakeholders: standardStakeholders,
    timeline: [
      ["Now", "Submit space and catering requirements", "Reception setup, wine, and snacks."],
      ["4-6 weeks out", "Confirm alcohol service and any security requirement", "Routine but should be explicit."],
      ["1 week out", "Confirm playlist/mic setup and organiser check-in plan", "No formal Welcome Desk needed in the seed."]
    ],
    mondayPayload: {
      item_name: "Wine Society Autumn Social",
      columns: {
        organiser: "Sofia Marchetti",
        club: "Wine Society",
        key_event_candidate: false,
        stakeholder_count: 3,
        finance_code: "FINCLUB-WS-2026"
      }
    },
    script: script("standard")
  }
];
