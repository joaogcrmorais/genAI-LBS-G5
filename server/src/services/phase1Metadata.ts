export type Phase1Feature = {
  id: string;
  epic: string;
  title: string;
  status: "keep" | "post_mvp" | "cut" | "future";
  source: string;
};

export type Phase1Epic = {
  id: string;
  title: string;
  deliverable: string;
  features: string[];
};

export type Phase1UserStory = {
  epic: string;
  story: string;
  title: string;
  feature_ids: string[];
  acceptance: string[];
};

export const phase1Features: Phase1Feature[] = [
  {
    id: "F-01",
    epic: "E-01",
    title: "Entry-type detection",
    status: "keep",
    source: "Phase 1 conversation spec"
  },
  {
    id: "F-02",
    epic: "E-02",
    title: "Working event profile / EventRequest",
    status: "keep",
    source: "Phase 1 conversation spec + CribSheet"
  },
  {
    id: "F-03",
    epic: "E-01",
    title: "Small themed questions",
    status: "keep",
    source: "Phase 1 conversation spec"
  },
  {
    id: "F-04",
    epic: "E-02",
    title: "Structured options and uncertainty markers",
    status: "keep",
    source: "Phase 1 conversation spec"
  },
  {
    id: "F-05",
    epic: "E-03",
    title: "Toolkit-based shaping for vague/budget-only users",
    status: "keep",
    source: "Event Toolkit / Student Guide"
  },
  {
    id: "F-06",
    epic: "E-02",
    title: "Official Space Request / crib sheet field map",
    status: "keep",
    source: "CribSheet - Copy.docx"
  },
  {
    id: "F-07",
    epic: "E-02",
    title: "Coverage check for all required fields",
    status: "keep",
    source: "CribSheet + Phase 1 spec"
  },
  {
    id: "F-08",
    epic: "E-04",
    title: "Space Request DOCX generation",
    status: "keep",
    source: "CribSheet"
  },
  {
    id: "F-09",
    epic: "E-03",
    title: "Finance-code lookup whenever budget is involved",
    status: "keep",
    source: "Finance directory + Joao feedback"
  },
  {
    id: "F-10",
    epic: "E-03",
    title: "Space/room guidance",
    status: "keep",
    source: "Space Matrix first, fallbacks after"
  },
  {
    id: "F-11",
    epic: "E-03",
    title: "Catering/alcohol/security/timeline guidance",
    status: "keep",
    source: "Catering, terms, toolkit"
  },
  {
    id: "F-12",
    epic: "E-05",
    title: "Deterministic Key Event assessment",
    status: "keep",
    source: "key_event_identification_spec.md only"
  },
  {
    id: "F-13",
    epic: "E-06",
    title: "Frontend Phase 1 QA checklist",
    status: "keep",
    source: "Joao feedback"
  }
];

export const phase1Epics: Phase1Epic[] = [
  {
    id: "E-01",
    title: "Start and triage the organiser journey",
    deliverable: "Entry-type-aware intake flow",
    features: ["F-01", "F-03"]
  },
  {
    id: "E-02",
    title: "Build the EventRequest",
    deliverable: "Working event profile with all CribSheet fields",
    features: ["F-02", "F-04", "F-06", "F-07"]
  },
  {
    id: "E-03",
    title: "Guide form-ready answers with source data",
    deliverable: "Question flow using toolkit, finance, space, catering, and policy data",
    features: ["F-05", "F-09", "F-10", "F-11"]
  },
  {
    id: "E-04",
    title: "Generate the Space Request DOCX",
    deliverable: "Editable DOCX with all official fields",
    features: ["F-08"]
  },
  {
    id: "E-05",
    title: "Assess Key Event candidacy deterministically",
    deliverable: "Key Event assessment using only key_event_identification_spec.md",
    features: ["F-12"]
  },
  {
    id: "E-06",
    title: "Validate Phase 1 in frontend",
    deliverable: "Demo/test surface with checklist and story coverage",
    features: ["F-13"]
  }
];

export const phase1UserStories: Phase1UserStory[] = [
  {
    epic: "E-01",
    story: "US-01",
    title: "Prepared event request",
    feature_ids: ["F-01", "F-03"],
    acceptance: [
      "Assistant identifies provided event type, timing, attendance, speaker, venue, catering, budget, or AV details.",
      "Assistant does not ask for the same detail again unless it is unclear.",
      "Assistant asks no more than three related follow-up questions by default."
    ]
  },
  {
    epic: "E-01",
    story: "US-02",
    title: "Budget-only user",
    feature_ids: ["F-01", "F-03", "F-05", "F-09"],
    acceptance: [
      "Assistant asks about objective, audience, constraints, resources, and success signal.",
      "Assistant suggests 2-3 suitable formats.",
      "Assistant brings up finance-code implications because budget is involved.",
      "Assistant continues even if the initial idea is weak."
    ]
  },
  {
    epic: "E-01",
    story: "US-03",
    title: "General event idea",
    feature_ids: ["F-01", "F-03"],
    acceptance: [
      "Assistant asks about purpose, audience, attendance, timing, and format.",
      "Assistant moves into space/setup, catering, AV, and services.",
      "Assistant stores all answers in the EventRequest."
    ]
  },
  {
    epic: "E-02",
    story: "US-04",
    title: "Working event profile",
    feature_ids: ["F-02", "F-04", "F-06"],
    acceptance: [
      "Each user turn updates the EventRequest.",
      "Every official CribSheet field has a value or explicit marker before Phase 1 ends.",
      "Additional context is preserved.",
      "No numeric completeness score is shown or required."
    ]
  },
  {
    epic: "E-02",
    story: "US-05",
    title: "Proceed-readiness",
    feature_ids: ["F-07"],
    acceptance: [
      "All official fields from the CribSheet source are covered.",
      "Values may be final, best estimate, not sure yet, needs confirmation, not applicable, or organiser follow-up.",
      "Phase 1 completion creates the source EventRequest for downstream logic."
    ]
  },
  {
    epic: "E-03",
    story: "US-06",
    title: "Toolkit shaping",
    feature_ids: ["F-05"],
    acceptance: [
      "Assistant uses toolkit lenses: strategic alignment, unique value, audience clarity, resource readiness, and success signal.",
      "Assistant maps shaping answers into purpose, audience, format, budget, and success fields."
    ]
  },
  {
    epic: "E-03",
    story: "US-07",
    title: "Finance code lookup",
    feature_ids: ["F-09"],
    acceptance: [
      "Whenever budget is mentioned or implied, assistant raises finance-code lookup.",
      "Existing events can return a finance code to the user.",
      "New events explain that club treasury / finance code setup is needed."
    ]
  },
  {
    epic: "E-03",
    story: "US-08",
    title: "Space and catering guidance",
    feature_ids: ["F-10", "F-11"],
    acceptance: [
      "Space Matrix is checked first.",
      "If a room is missing, fallback sources are checked.",
      "If supporting sources conflict, the used source is stated.",
      "Catering, alcohol, political/sensitive topic, security, decoration, equipment, and timing implications are surfaced when relevant."
    ]
  },
  {
    epic: "E-04",
    story: "US-09",
    title: "DOCX generation",
    feature_ids: ["F-08"],
    acceptance: [
      "Output is DOCX.",
      "Output includes all fields from CribSheet - Copy.docx.",
      "Formatting may differ from the raw form.",
      "Uncertain fields are visibly marked.",
      "Demo download remains available for incomplete drafts so missing fields can be tested in the generated DOCX.",
      "No form is submitted automatically."
    ]
  },
  {
    epic: "E-05",
    story: "US-10",
    title: "Attendance trigger",
    feature_ids: ["F-12"],
    acceptance: [
      "Confirmed or best-estimate attendance 100+ sets key_event_candidate true.",
      "The user-facing language says could be considered or may qualify.",
      "LBS staff retain final determination."
    ]
  },
  {
    epic: "E-05",
    story: "US-11",
    title: "Criteria threshold trigger",
    feature_ids: ["F-12"],
    acceptance: [
      "Two or more confirmed non-attendance criteria set key_event_candidate true.",
      "Criteria are only those in docs/project-context/key_event_identification_spec.md.",
      "Missing, vague, or uncollected information is not counted."
    ]
  },
  {
    epic: "E-05",
    story: "US-12",
    title: "Sensitive topic handling",
    feature_ids: ["F-12"],
    acceptance: [
      "Sensitive/political topic is not a standalone Key Event trigger.",
      "It is surfaced to the user because it requires security/timeline attention.",
      "It is included in internal rationale/signals."
    ]
  },
  {
    epic: "E-06",
    story: "US-13",
    title: "Frontend checklist per Phase 1 epic",
    feature_ids: ["F-13"],
    acceptance: [
      "The UI lists Phase 1 epics E-01 to E-06.",
      "The UI lists all Phase 1 features and user stories.",
      "The UI includes checkbox controls for each feature and story.",
      "Checklist state persists in browser localStorage."
    ]
  }
];
