import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";
import {
  type PostPhase1KeyEventAssessment,
  type PostPhase1Stakeholder,
  postPhase1StakeholderSchema
} from "../schemas/postPhase1.js";
import {
  allEventText,
  fieldText,
  getRoutingRules,
  includesAny,
  parseAttendance,
  readLifecycleStakeholders
} from "./postPhase1DataService.js";

type StakeholderDefinition = {
  id: string;
  name: string;
  email?: string;
  contactNote?: string;
  source: string;
  aliases: string[];
};

const stakeholderDefinitions: StakeholderDefinition[] = [
  {
    id: "space_management",
    name: "Space Management",
    email: "space@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Your key Campus Services contacts",
    aliases: ["space management", "space"]
  },
  {
    id: "catering_team",
    name: "Catering Team",
    email: "cateringevents@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Your key Campus Services contacts",
    aliases: ["catering", "catering team", "catering / lexington", "lexington"]
  },
  {
    id: "security_team",
    name: "Security Team",
    email: "speakersandguests@london.edu",
    contactNote: "Use speakersandguests@london.edu for speaker/guest-list clearance; use security@london.edu for immediate risk questions.",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Security contacts",
    aliases: ["security", "security team"]
  },
  {
    id: "av_team",
    name: "AV Team",
    email: "avhelp@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Audio Visual contact",
    aliases: ["av", "av team", "av / technology", "audio visual"]
  },
  {
    id: "estates_porters",
    name: "Estates / Porters",
    email: "estates@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Estates contact",
    aliases: ["estates", "porters", "estates / porters"]
  },
  {
    id: "duty_managers",
    name: "Duty Managers",
    email: "dutymanagers@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Duty Managers contact",
    aliases: ["duty managers", "campus services"]
  },
  {
    id: "welcome_desk",
    name: "Welcome Desk",
    email: "welcomedesk@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Welcome Desk contact",
    aliases: ["welcome desk", "registration"]
  },
  {
    id: "editorial_planning",
    name: "Editorial Planning Team",
    email: "editorialplanning@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Editorial Planning contact",
    aliases: ["editorial planning", "editorial planning team"]
  },
  {
    id: "advancement_team",
    name: "Advancement Team",
    email: "ADVstakeholderops@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Advancement contact",
    aliases: ["advancement", "advancement team", "alumni"]
  },
  {
    id: "sa_treasury",
    name: "SA Treasury",
    email: "safinance@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: SA Finance contact",
    aliases: ["sa treasury", "sa finance", "finance", "treasury"]
  },
  {
    id: "sa_sponsorship",
    name: "SA Sponsorship",
    email: "sasponsorship@london.edu",
    contactNote: "Use the confirmed SA sponsorship inbox for sponsorship framework questions and sponsor approval routing.",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Sponsorship Process contact",
    aliases: ["sa sponsorship", "sponsorship"]
  },
  {
    id: "dpo",
    name: "DPO",
    email: "dpo@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: DPO contact",
    aliases: ["dpo", "data protection"]
  },
  {
    id: "pr_communications",
    name: "PR / Communications Team",
    email: "press@london.edu",
    contactNote: "Use press@london.edu for last-minute PR/media emergencies; Editorial Planning remains the general route for event positioning.",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: PR and media support",
    aliases: ["pr", "communications", "pr / communications team", "media"]
  },
  {
    id: "content_brand",
    name: "Content / Brand Team",
    email: "content@london.edu",
    source: "lbs-files/raw/lbs_event_toolkit_student_clubs_parsed.md: Brand and templates contact",
    aliases: ["content", "brand", "content / brand team"]
  },
  {
    id: "deans_office",
    name: "Dean's Office",
    email: "editorialplanning@london.edu",
    contactNote: "Toolkit guidance says students should route Dean invitation requests via Editorial Planning and never contact the Dean's Office directly.",
    source: "lbs-files/processed/lifecycle/stakeholders_by_phase.csv",
    aliases: ["dean", "dean's office", "deans office"]
  },
  {
    id: "photography_team",
    name: "Photography Team",
    email: "editorialplanning@london.edu",
    contactNote: "Coordinate photography through Editorial Planning unless a named photography owner is assigned.",
    source: "lbs-files/processed/lifecycle/stakeholders_by_phase.csv",
    aliases: ["photography", "photography team"]
  },
  {
    id: "events_oversight_group",
    name: "Events Oversight Group",
    email: "editorialplanning@london.edu",
    contactNote: "Converted LBS sources do not provide a direct Events Oversight inbox; route the note through Editorial Planning.",
    source: "lbs-files/processed/lifecycle/stakeholders_by_phase.csv",
    aliases: ["events oversight", "events oversight group"]
  }
];

function normalise(value: string) {
  return value.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
}

function stakeholderByName(name: string) {
  const normalised = normalise(name);
  return stakeholderDefinitions.find((definition) =>
    definition.aliases.some((alias) => normalised.includes(normalise(alias)) || normalise(alias).includes(normalised))
  );
}

function textHasYes(text: string) {
  return /\byes\b|\brequired\b|\bplanned\b|\brequested\b|\bexpected\b/i.test(text);
}

function isNo(text: string) {
  return /\b(no|not required|not applicable|none)\b/i.test(text);
}

function getLifecycleTimings(stakeholderName: string) {
  const definition = stakeholderByName(stakeholderName);
  if (!definition) return [];
  return readLifecycleStakeholders()
    .filter((record) => {
      const recordDefinition = stakeholderByName(record.stakeholder);
      return recordDefinition?.id === definition.id;
    })
    .map((record) => [record.timeline, record.workstream_task].filter(Boolean).join(": "))
    .filter(Boolean)
    .slice(0, 4);
}

function stakeholderNeeds(name: string) {
  const definition = stakeholderByName(name);
  const rules = getRoutingRules();
  const direct = rules.find((rule) => stakeholderByName(rule.stakeholder)?.id === definition?.id);
  return direct?.needs ?? [];
}

function buildStakeholder(definition: StakeholderDefinition, reason: string, priority: "required" | "recommended"): PostPhase1Stakeholder {
  return postPhase1StakeholderSchema.parse({
    id: definition.id,
    name: definition.name,
    email: definition.email,
    contact_note: definition.contactNote,
    source: definition.source,
    reason,
    needs: stakeholderNeeds(definition.name),
    timing: getLifecycleTimings(definition.name),
    priority
  });
}

function addStakeholder(
  map: Map<string, PostPhase1Stakeholder>,
  name: string,
  reason: string,
  priority: "required" | "recommended" = "required"
) {
  const definition = stakeholderByName(name);
  if (!definition) return;
  const existing = map.get(definition.id);
  if (existing) {
    map.set(definition.id, {
      ...existing,
      reason: `${existing.reason} ${reason}`,
      priority: existing.priority === "required" || priority === "required" ? "required" : "recommended"
    });
    return;
  }
  map.set(definition.id, buildStakeholder(definition, reason, priority));
}

export function getPostPhase1StakeholderDirectory() {
  return stakeholderDefinitions.map((definition) => ({
    id: definition.id,
    name: definition.name,
    email: definition.email,
    contact_note: definition.contactNote,
    source: definition.source,
    aliases: definition.aliases
  }));
}

export function routePostPhase1Stakeholders(
  eventRequest: EventReadinessEventRequest,
  keyEvent: PostPhase1KeyEventAssessment
) {
  const text = allEventText(eventRequest);
  const attendance = parseAttendance(eventRequest);
  const stakeholders = new Map<string, PostPhase1Stakeholder>();
  const catering = fieldText(eventRequest, "catering");
  const alcohol = fieldText(eventRequest, "alcohol");
  const registration = fieldText(eventRequest, "registration_desk");
  const speaker = fieldText(eventRequest, "external_guest_speaker_details");
  const children = fieldText(eventRequest, "children_attending");
  const filming = fieldText(eventRequest, "filming");
  const setup = fieldText(eventRequest, "space_and_setup");
  const additional = fieldText(eventRequest, "additional_information");

  addStakeholder(stakeholders, "Space Management", "All events need space request review and room/setup confirmation.");

  if (!isNo(catering) || !isNo(alcohol)) {
    addStakeholder(stakeholders, "Catering Team", "Catering or alcohol appears in the completed EventRequest.");
  }

  if (
    (attendance !== undefined && attendance >= 100) ||
    (!isNo(alcohol) && textHasYes(alcohol)) ||
    includesAny(text, ["external guest", "external speaker", "public audience", "media expected", "security review", "sensitive"]) ||
    (!isNo(children) && textHasYes(children))
  ) {
    addStakeholder(stakeholders, "Security Team", "Attendance, alcohol, external speakers/audience, media, children, or risk signals may require security awareness.");
  }

  const filmingPositive = !isNo(filming) && includesAny(filming.toLowerCase(), ["filming", "recording", "photography"]);
  if (includesAny(text, ["panel", "q&a", "keynote", "microphone", "lecture theatre"]) || filmingPositive) {
    addStakeholder(stakeholders, "AV Team", "Programme format or media requirements imply AV support.");
  }

  if (includesAny(setup.toLowerCase(), ["multi-room", "multiple", "green room", "reserved", "large lecture", "hive", "nuffield"])) {
    addStakeholder(stakeholders, "Estates / Porters", "Room setup, multi-room movement, or special layout needs may require estates/porter coordination.", "recommended");
  }

  if (!isNo(registration) && (textHasYes(registration) || includesAny(registration.toLowerCase(), ["registration", "welcome desk"]))) {
    addStakeholder(stakeholders, "Welcome Desk", "Registration or welcome desk support is requested.");
  }

  if (keyEvent.key_event_candidate || (attendance !== undefined && attendance >= 80) || includesAny(text, ["vip", "media", "public audience"])) {
    addStakeholder(stakeholders, "Duty Managers", "Scale, Key Event candidacy, or high-visibility signals may require Campus Services coordination.", keyEvent.key_event_candidate ? "required" : "recommended");
  }

  if (includesAny(text, ["alumni", "donor"])) {
    addStakeholder(stakeholders, "Advancement Team", "Alumni or donor-related attendance appears in the EventRequest.", "recommended");
  }

  if (includesAny(text, ["dean attendance", "dean"])) {
    addStakeholder(stakeholders, "Dean's Office", "Dean attendance is mentioned; route via Editorial Planning, not direct student contact.");
    addStakeholder(stakeholders, "Editorial Planning Team", "Dean attendance and event positioning require Editorial Planning routing.");
  }

  if (includesAny(text, ["media expected", "public leader", "flagship", "public audience", "press"])) {
    addStakeholder(stakeholders, "Editorial Planning Team", "High-visibility or public-facing event positioning may need Editorial Planning.");
    addStakeholder(stakeholders, "PR / Communications Team", "Media or public-facing communications are indicated.", "recommended");
  }

  if (filmingPositive || (!isNo(filming) && textHasYes(filming))) {
    addStakeholder(stakeholders, "Photography Team", "Filming or photography is planned.", "recommended");
    addStakeholder(stakeholders, "Content / Brand Team", "Content, filming, or photography usage should follow brand/template guidance.", "recommended");
  }

  if (includesAny(text, ["budget", "finance code", "paid", "ticket", "sponsor"])) {
    addStakeholder(stakeholders, "SA Treasury", "Budget, finance, tickets, or sponsorship context appears in the EventRequest.", "recommended");
  }

  if (includesAny(text, ["sponsor", "sponsorship"])) {
    addStakeholder(stakeholders, "SA Sponsorship", "Sponsorship context appears in the EventRequest.", "recommended");
  }

  if (!isNo(children) && textHasYes(children)) {
    addStakeholder(stakeholders, "DPO", "Under-18 attendance requires DPO/data-protection guidance.", "required");
  }

  if (keyEvent.key_event_candidate && includesAny(additional.toLowerCase(), ["business case", "oversight"])) {
    addStakeholder(stakeholders, "Events Oversight Group", "Key Event and oversight/business-case language appears in the EventRequest.", "recommended");
  }

  if (speaker && !isNo(speaker)) {
    addStakeholder(stakeholders, "Security Team", "Speaker list should be shared with the correct security/speakers-and-guests route.");
  }

  return {
    stakeholders: Array.from(stakeholders.values()).sort((a, b) => {
      if (a.priority !== b.priority) return a.priority === "required" ? -1 : 1;
      return a.name.localeCompare(b.name);
    }),
    source_notes: [
      "Routing uses converted LBS lifecycle, routing, and toolkit contact data rather than the old WS4 enum.",
      "Stakeholder emails are draft targets only; nothing is sent.",
      "Some governance stakeholders without direct converted contact emails are routed via Editorial Planning in this POC."
    ]
  };
}
