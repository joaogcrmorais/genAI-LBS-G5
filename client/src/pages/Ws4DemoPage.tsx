import { useAuth0 } from "@auth0/auth0-react";
import { useMemo, useState } from "react";
import { apiGet, apiPost } from "../services/api";
import {
  type EventRequest,
  type Speaker,
  emptySpeaker,
  ws4Scenarios
} from "../data/ws4Scenarios";

type ResultKey = "auth" | "ai" | "classification" | "routing" | "monday";

type Results = Partial<Record<ResultKey, unknown>>;
type Errors = Partial<Record<ResultKey | "fullFlow", string>>;

const scenarioOptions = [
  ["workshop", "Small internal workshop"],
  ["alumniReception", "Alumni reception"],
  ["externalSpeaker", "External speaker"],
  ["careersFair", "Careers fair"],
  ["vipLeader", "VIP/public leader"]
] as const;

const scenarioGuide = [
  {
    key: "workshop",
    name: "Small internal workshop",
    description: "Low-complexity student session with confirmed classroom space and no external dependencies.",
    expected: "Mostly space confirmation; no security or catering."
  },
  {
    key: "alumniReception",
    name: "Alumni reception",
    description: "Evening networking event with alumni, catering, and alcohol.",
    expected: "Catering and campus operations coordination."
  },
  {
    key: "externalSpeaker",
    name: "External speaker",
    description: "Student event with a named external speaker, guest list, and basic AV.",
    expected: "AV plus editorial/stakeholder visibility."
  },
  {
    key: "careersFair",
    name: "Careers fair",
    description: "Large multi-club event with employer booths, sponsors, catering, and setup needs.",
    expected: "Space, sponsorship, SA operations, and catering."
  },
  {
    key: "vipLeader",
    name: "VIP/public leader",
    description: "High-profile speaker event with public audience, media sensitivity, and guest control.",
    expected: "High-complexity tiering, security, and editorial planning."
  }
] as const;

const eventTypes = ["panel", "conference", "workshop", "networking", "social", "speaker", "careers", "other", "unknown"];
const lifecyclePhases = ["ideation", "feasibility", "detailed_planning", "editorial_content_planning", "pre_event_execution", "event_day", "post_event", "unknown"];
const mondayStatusHints = [
  "requested",
  "proposed",
  "tbd",
  "more_info_required",
  "can_progress",
  "tentative",
  "date_to_be_confirmed",
  "confirmed_subject_to_business_case",
  "confirmed",
  "confirmed_space_check",
  "stuck_issues",
  "changing_plans",
  "cancelled_moved",
  "not_happening",
  "unknown"
];
const attendanceTypes = ["unknown", "rough_estimate", "confirmed_estimate", "capacity_limit"];
const audienceTypes = ["students", "faculty", "staff", "alumni", "external_guests", "corporate_partners", "public", "vip", "mixed"];
const cateringStyles = ["none", "refreshments", "buffet", "plated", "reception", "bespoke", "unknown"];
const sensitiveTopicOptions = ["yes", "no", "unknown"];
const statuses = ["draft", "ready_for_review", "submitted"];
const intakeSources = ["manual", "document_upload", "email_extract", "unknown"];

function cloneEvent(eventRequest: EventRequest) {
  return JSON.parse(JSON.stringify(eventRequest)) as EventRequest;
}

function linesToList(value: string) {
  return value
    .split("\n")
    .map((item) => item.trim())
    .filter(Boolean);
}

function listToLines(value: string[]) {
  return value.join("\n");
}

function Field({
  label,
  children
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <label className="form-field">
      <span>{label}</span>
      {children}
    </label>
  );
}

function TextInput({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <input value={value} onChange={(event) => onChange(event.target.value)} />
    </Field>
  );
}

function TextArea({
  label,
  value,
  onChange
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <textarea value={value} onChange={(event) => onChange(event.target.value)} rows={3} />
    </Field>
  );
}

function NumberInput({
  label,
  value,
  onChange
}: {
  label: string;
  value: number | null;
  onChange: (value: number | null) => void;
}) {
  return (
    <Field label={label}>
      <input
        type="number"
        value={value ?? ""}
        onChange={(event) => onChange(event.target.value === "" ? null : Number(event.target.value))}
      />
    </Field>
  );
}

function SelectInput({
  label,
  value,
  options,
  onChange
}: {
  label: string;
  value: string;
  options: readonly string[];
  onChange: (value: string) => void;
}) {
  return (
    <Field label={label}>
      <select value={value} onChange={(event) => onChange(event.target.value)}>
        {options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </Field>
  );
}

function CheckboxInput({
  label,
  checked,
  onChange
}: {
  label: string;
  checked: boolean;
  onChange: (value: boolean) => void;
}) {
  return (
    <label className="checkbox-field">
      <input type="checkbox" checked={checked} onChange={(event) => onChange(event.target.checked)} />
      <span>{label}</span>
    </label>
  );
}

function ResponsePanel({ title, value, error }: { title: string; value?: unknown; error?: string }) {
  return (
    <section className="response-panel">
      <h3>{title}</h3>
      {error ? <pre className="error-output">{error}</pre> : <pre>{value ? JSON.stringify(value, null, 2) : "No response yet."}</pre>}
    </section>
  );
}

export function Ws4DemoPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [scenario, setScenario] = useState<keyof typeof ws4Scenarios>("externalSpeaker");
  const [eventRequest, setEventRequest] = useState<EventRequest>(() => cloneEvent(ws4Scenarios.externalSpeaker));
  const [results, setResults] = useState<Results>({});
  const [errors, setErrors] = useState<Errors>({});
  const [busyAction, setBusyAction] = useState<string | null>(null);

  const eventPayload = useMemo(() => ({ event_request: eventRequest }), [eventRequest]);

  function updateRoot<K extends keyof EventRequest>(key: K, value: EventRequest[K]) {
    setEventRequest((current) => ({ ...current, [key]: value }));
  }

  function updateSection<K extends keyof EventRequest, F extends keyof EventRequest[K]>(
    section: K,
    field: F,
    value: EventRequest[K][F]
  ) {
    setEventRequest((current) => ({
      ...current,
      [section]: {
        ...(current[section] as object),
        [field]: value
      }
    }));
  }

  function loadScenario(value: keyof typeof ws4Scenarios) {
    setScenario(value);
    setEventRequest(cloneEvent(ws4Scenarios[value]));
    setResults({});
    setErrors({});
  }

  function setResult(key: ResultKey, value: unknown) {
    setResults((current) => ({ ...current, [key]: value }));
    setErrors((current) => ({ ...current, [key]: undefined }));
  }

  function setError(key: ResultKey | "fullFlow", error: unknown) {
    setErrors((current) => ({ ...current, [key]: error instanceof Error ? error.message : String(error) }));
  }

  async function withBusy(action: string, task: () => Promise<void>) {
    setBusyAction(action);
    try {
      await task();
    } finally {
      setBusyAction(null);
    }
  }

  async function getToken() {
    return getAccessTokenSilently();
  }

  async function checkAuth() {
    await withBusy("auth", async () => {
      const token = await getToken();
      const me = await apiGet<unknown>("/api/me", token);
      const normal = await apiGet<unknown>("/api/normal/check", token);
      setResult("auth", { me, normal });
    }).catch((error) => setError("auth", error));
  }

  async function checkAiStatus() {
    await withBusy("ai", async () => {
      const token = await getToken();
      setResult("ai", await apiGet<unknown>("/api/ai/status", token));
    }).catch((error) => setError("ai", error));
  }

  async function classifyTier() {
    await withBusy("classification", async () => {
      const token = await getToken();
      setResult("classification", await apiPost<unknown>("/api/tiering/classify", eventPayload, token));
    }).catch((error) => setError("classification", error));
  }

  async function buildRouting(classificationOverride = results.classification) {
    const token = await getToken();
    const payload = {
      event_request: eventRequest,
      ...(classificationOverride ? { classification: classificationOverride } : {})
    };
    const routing = await apiPost<unknown>("/api/routing/stakeholder-packets", payload, token);
    setResult("routing", routing);
    return routing;
  }

  async function buildStakeholderPackets() {
    await withBusy("routing", async () => {
      await buildRouting();
    }).catch((error) => setError("routing", error));
  }

  async function buildMondayPayload(routingOverride = results.routing, classificationOverride = results.classification) {
    const token = await getToken();
    const payload = {
      event_request: eventRequest,
      ...(classificationOverride ? { classification: classificationOverride } : {}),
      ...(routingOverride ? { stakeholder_packets: routingOverride } : {})
    };
    const monday = await apiPost<unknown>("/api/integrations/monday/build-payload", payload, token);
    setResult("monday", monday);
    return monday;
  }

  async function buildMonday() {
    await withBusy("monday", async () => {
      await buildMondayPayload();
    }).catch((error) => setError("monday", error));
  }

  async function runFullFlow() {
    await withBusy("fullFlow", async () => {
      let classification: unknown | undefined;
      try {
        const token = await getToken();
        classification = await apiPost<unknown>("/api/tiering/classify", eventPayload, token);
        setResult("classification", classification);
      } catch (error) {
        setError("classification", error);
      }

      const routing = await buildRouting(classification);
      await buildMondayPayload(routing, classification);
      setErrors((current) => ({ ...current, fullFlow: undefined }));
    }).catch((error) => setError("fullFlow", error));
  }

  function updateAudience(type: string, checked: boolean) {
    const current = eventRequest.event_basics.audience_types;
    updateSection(
      "event_basics",
      "audience_types",
      checked ? [...new Set([...current, type])] : current.filter((item) => item !== type)
    );
  }

  function updateSpeaker(index: number, field: keyof Speaker, value: string | boolean) {
    const speakers = eventRequest.speakers_and_guests.speakers.map((speaker, speakerIndex) =>
      speakerIndex === index ? { ...speaker, [field]: value } : speaker
    );
    updateSection("speakers_and_guests", "speakers", speakers);
  }

  function removeSpeaker(index: number) {
    updateSection(
      "speakers_and_guests",
      "speakers",
      eventRequest.speakers_and_guests.speakers.filter((_, speakerIndex) => speakerIndex !== index)
    );
  }

  return (
    <section className="ws4-demo">
      <div className="ws4-header">
        <div>
          <p className="eyebrow">WS4 testing harness</p>
          <h1>Event request tester</h1>
        </div>
        <div className="scenario-control">
          <SelectInput
            label="Scenario"
            value={scenario}
            options={scenarioOptions.map(([value]) => value)}
            onChange={(value) => loadScenario(value as keyof typeof ws4Scenarios)}
          />
        </div>
      </div>

      <div className="scenario-guide">
        <table>
          <caption>Scenario guide</caption>
          <thead>
            <tr>
              <th>Scenario</th>
              <th>What it is</th>
              <th>What to expect</th>
            </tr>
          </thead>
          <tbody>
            {scenarioGuide.map((item) => (
              <tr key={item.key} className={scenario === item.key ? "active-scenario" : undefined}>
                <td>{item.name}</td>
                <td>{item.description}</td>
                <td>{item.expected}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="button-row ws4-actions">
        <button type="button" onClick={() => void checkAuth()} disabled={busyAction !== null}>
          Check Auth/API
        </button>
        <button type="button" onClick={() => void checkAiStatus()} disabled={busyAction !== null}>
          Check AI Status
        </button>
        <button type="button" onClick={() => void classifyTier()} disabled={busyAction !== null}>
          Classify Tier
        </button>
        <button type="button" onClick={() => void buildStakeholderPackets()} disabled={busyAction !== null}>
          Build Stakeholder Packets
        </button>
        <button type="button" onClick={() => void buildMonday()} disabled={busyAction !== null}>
          Build Monday Mock Payload
        </button>
        <button type="button" onClick={() => void runFullFlow()} disabled={busyAction !== null}>
          Run Full Flow
        </button>
      </div>
      {busyAction ? <div className="status-panel">Running {busyAction}...</div> : null}
      {errors.fullFlow ? <div className="status-panel">{errors.fullFlow}</div> : null}

      <div className="ws4-layout">
        <form className="ws4-form">
          <section className="form-section">
            <h2>Root</h2>
            <div className="form-grid">
              <TextInput label="event_id" value={eventRequest.event_id} onChange={(value) => updateRoot("event_id", value)} />
              <SelectInput label="status" value={eventRequest.status} options={statuses} onChange={(value) => updateRoot("status", value as EventRequest["status"])} />
              <TextInput label="created_at" value={eventRequest.created_at} onChange={(value) => updateRoot("created_at", value)} />
              <TextInput label="updated_at" value={eventRequest.updated_at} onChange={(value) => updateRoot("updated_at", value)} />
            </div>
          </section>

          <section className="form-section">
            <h2>Organiser</h2>
            <div className="form-grid">
              <TextInput label="name" value={eventRequest.organizer.name} onChange={(value) => updateSection("organizer", "name", value)} />
              <TextInput label="email" value={eventRequest.organizer.email} onChange={(value) => updateSection("organizer", "email", value)} />
              <TextInput label="club_or_department" value={eventRequest.organizer.club_or_department} onChange={(value) => updateSection("organizer", "club_or_department", value)} />
              <TextInput label="role" value={eventRequest.organizer.role} onChange={(value) => updateSection("organizer", "role", value)} />
              <TextInput label="deputy_name" value={eventRequest.organizer.deputy_name} onChange={(value) => updateSection("organizer", "deputy_name", value)} />
              <TextInput label="deputy_email" value={eventRequest.organizer.deputy_email} onChange={(value) => updateSection("organizer", "deputy_email", value)} />
            </div>
          </section>

          <section className="form-section">
            <h2>Event basics</h2>
            <div className="form-grid">
              <TextInput label="title" value={eventRequest.event_basics.title} onChange={(value) => updateSection("event_basics", "title", value)} />
              <SelectInput label="lifecycle_phase" value={eventRequest.event_basics.lifecycle_phase} options={lifecyclePhases} onChange={(value) => updateSection("event_basics", "lifecycle_phase", value as EventRequest["event_basics"]["lifecycle_phase"])} />
              <SelectInput label="monday_status_hint" value={eventRequest.event_basics.monday_status_hint} options={mondayStatusHints} onChange={(value) => updateSection("event_basics", "monday_status_hint", value as EventRequest["event_basics"]["monday_status_hint"])} />
              <SelectInput label="event_type" value={eventRequest.event_basics.event_type} options={eventTypes} onChange={(value) => updateSection("event_basics", "event_type", value as EventRequest["event_basics"]["event_type"])} />
              <TextInput label="target_date" value={eventRequest.event_basics.target_date} onChange={(value) => updateSection("event_basics", "target_date", value)} />
              <TextInput label="start_time" value={eventRequest.event_basics.start_time} onChange={(value) => updateSection("event_basics", "start_time", value)} />
              <TextInput label="end_time" value={eventRequest.event_basics.end_time} onChange={(value) => updateSection("event_basics", "end_time", value)} />
              <NumberInput label="expected_attendance" value={eventRequest.event_basics.expected_attendance} onChange={(value) => updateSection("event_basics", "expected_attendance", value)} />
              <NumberInput label="actual_attendance" value={eventRequest.event_basics.actual_attendance} onChange={(value) => updateSection("event_basics", "actual_attendance", value)} />
              <TextInput label="registration_link" value={eventRequest.event_basics.registration_link} onChange={(value) => updateSection("event_basics", "registration_link", value)} />
              <SelectInput label="attendance_estimate_type" value={eventRequest.event_basics.attendance_estimate_type} options={attendanceTypes} onChange={(value) => updateSection("event_basics", "attendance_estimate_type", value as EventRequest["event_basics"]["attendance_estimate_type"])} />
              <TextInput label="previous_event_reference" value={eventRequest.event_basics.previous_event_reference} onChange={(value) => updateSection("event_basics", "previous_event_reference", value)} />
            </div>
            <TextArea label="description" value={eventRequest.event_basics.description} onChange={(value) => updateSection("event_basics", "description", value)} />
            <TextArea label="purpose" value={eventRequest.event_basics.purpose} onChange={(value) => updateSection("event_basics", "purpose", value)} />
            <div className="checkbox-grid">
              <CheckboxInput label="is_recurring" checked={eventRequest.event_basics.is_recurring} onChange={(value) => updateSection("event_basics", "is_recurring", value)} />
              <CheckboxInput label="is_multi_day" checked={eventRequest.event_basics.is_multi_day} onChange={(value) => updateSection("event_basics", "is_multi_day", value)} />
              <CheckboxInput label="external_audience" checked={eventRequest.event_basics.external_audience} onChange={(value) => updateSection("event_basics", "external_audience", value)} />
            </div>
            <div className="multi-select">
              <span>audience_types</span>
              {audienceTypes.map((type) => (
                <CheckboxInput
                  key={type}
                  label={type}
                  checked={eventRequest.event_basics.audience_types.includes(type)}
                  onChange={(checked) => updateAudience(type, checked)}
                />
              ))}
            </div>
          </section>

          <section className="form-section">
            <h2>Space and setup</h2>
            <div className="form-grid">
              <TextInput label="preferred_space" value={eventRequest.space_and_setup.preferred_space} onChange={(value) => updateSection("space_and_setup", "preferred_space", value)} />
              <TextInput label="layout_preference" value={eventRequest.space_and_setup.layout_preference} onChange={(value) => updateSection("space_and_setup", "layout_preference", value)} />
              <NumberInput label="number_of_booths" value={eventRequest.space_and_setup.number_of_booths} onChange={(value) => updateSection("space_and_setup", "number_of_booths", value)} />
            </div>
            <TextArea label="space_requirements" value={eventRequest.space_and_setup.space_requirements} onChange={(value) => updateSection("space_and_setup", "space_requirements", value)} />
            <TextArea label="setup_notes" value={eventRequest.space_and_setup.setup_notes} onChange={(value) => updateSection("space_and_setup", "setup_notes", value)} />
            <div className="checkbox-grid">
              <CheckboxInput label="space_confirmed" checked={eventRequest.space_and_setup.space_confirmed} onChange={(value) => updateSection("space_and_setup", "space_confirmed", value)} />
              <CheckboxInput label="needs_booths" checked={eventRequest.space_and_setup.needs_booths} onChange={(value) => updateSection("space_and_setup", "needs_booths", value)} />
              <CheckboxInput label="needs_cloakroom" checked={eventRequest.space_and_setup.needs_cloakroom} onChange={(value) => updateSection("space_and_setup", "needs_cloakroom", value)} />
              <CheckboxInput label="needs_signage" checked={eventRequest.space_and_setup.needs_signage} onChange={(value) => updateSection("space_and_setup", "needs_signage", value)} />
            </div>
          </section>

          <section className="form-section">
            <h2>Catering</h2>
            <div className="form-grid">
              <SelectInput label="catering_style" value={eventRequest.catering.catering_style} options={cateringStyles} onChange={(value) => updateSection("catering", "catering_style", value as EventRequest["catering"]["catering_style"])} />
              <NumberInput label="budget_estimate" value={eventRequest.catering.budget_estimate} onChange={(value) => updateSection("catering", "budget_estimate", value)} />
            </div>
            <TextArea label="catering_notes" value={eventRequest.catering.catering_notes} onChange={(value) => updateSection("catering", "catering_notes", value)} />
            <div className="checkbox-grid">
              <CheckboxInput label="needs_catering" checked={eventRequest.catering.needs_catering} onChange={(value) => updateSection("catering", "needs_catering", value)} />
              <CheckboxInput label="needs_alcohol" checked={eventRequest.catering.needs_alcohol} onChange={(value) => updateSection("catering", "needs_alcohol", value)} />
              <CheckboxInput label="dietary_requirements_known" checked={eventRequest.catering.dietary_requirements_known} onChange={(value) => updateSection("catering", "dietary_requirements_known", value)} />
              <CheckboxInput label="external_caterer" checked={eventRequest.catering.external_caterer} onChange={(value) => updateSection("catering", "external_caterer", value)} />
            </div>
          </section>

          <section className="form-section">
            <h2>AV and tech</h2>
            <TextArea label="av_notes" value={eventRequest.av_and_tech.av_notes} onChange={(value) => updateSection("av_and_tech", "av_notes", value)} />
            <div className="checkbox-grid">
              <CheckboxInput label="needs_av" checked={eventRequest.av_and_tech.needs_av} onChange={(value) => updateSection("av_and_tech", "needs_av", value)} />
              <CheckboxInput label="microphones" checked={eventRequest.av_and_tech.microphones} onChange={(value) => updateSection("av_and_tech", "microphones", value)} />
              <CheckboxInput label="projector_or_screen" checked={eventRequest.av_and_tech.projector_or_screen} onChange={(value) => updateSection("av_and_tech", "projector_or_screen", value)} />
              <CheckboxInput label="recording" checked={eventRequest.av_and_tech.recording} onChange={(value) => updateSection("av_and_tech", "recording", value)} />
              <CheckboxInput label="livestreaming" checked={eventRequest.av_and_tech.livestreaming} onChange={(value) => updateSection("av_and_tech", "livestreaming", value)} />
              <CheckboxInput label="hybrid" checked={eventRequest.av_and_tech.hybrid} onChange={(value) => updateSection("av_and_tech", "hybrid", value)} />
              <CheckboxInput label="complex_av" checked={eventRequest.av_and_tech.complex_av} onChange={(value) => updateSection("av_and_tech", "complex_av", value)} />
            </div>
          </section>

          <section className="form-section">
            <h2>Speakers and guests</h2>
            <div className="form-grid">
              <SelectInput label="sensitive_topic" value={eventRequest.speakers_and_guests.sensitive_topic} options={sensitiveTopicOptions} onChange={(value) => updateSection("speakers_and_guests", "sensitive_topic", value as EventRequest["speakers_and_guests"]["sensitive_topic"])} />
              <NumberInput label="total_faculty_hours" value={eventRequest.speakers_and_guests.total_faculty_hours} onChange={(value) => updateSection("speakers_and_guests", "total_faculty_hours", value)} />
            </div>
            <TextArea label="faculty_attending" value={listToLines(eventRequest.speakers_and_guests.faculty_attending)} onChange={(value) => updateSection("speakers_and_guests", "faculty_attending", linesToList(value))} />
            <div className="checkbox-grid">
              <CheckboxInput label="has_external_speakers" checked={eventRequest.speakers_and_guests.has_external_speakers} onChange={(value) => updateSection("speakers_and_guests", "has_external_speakers", value)} />
              <CheckboxInput label="alumni_speakers" checked={eventRequest.speakers_and_guests.alumni_speakers} onChange={(value) => updateSection("speakers_and_guests", "alumni_speakers", value)} />
              <CheckboxInput label="dean_attendance_requested" checked={eventRequest.speakers_and_guests.dean_attendance_requested} onChange={(value) => updateSection("speakers_and_guests", "dean_attendance_requested", value)} />
              <CheckboxInput label="vip_or_embassy_presence" checked={eventRequest.speakers_and_guests.vip_or_embassy_presence} onChange={(value) => updateSection("speakers_and_guests", "vip_or_embassy_presence", value)} />
              <CheckboxInput label="media_expected" checked={eventRequest.speakers_and_guests.media_expected} onChange={(value) => updateSection("speakers_and_guests", "media_expected", value)} />
              <CheckboxInput label="guest_list_required" checked={eventRequest.speakers_and_guests.guest_list_required} onChange={(value) => updateSection("speakers_and_guests", "guest_list_required", value)} />
            </div>
            <div className="array-header">
              <h3>speakers</h3>
              <button type="button" onClick={() => updateSection("speakers_and_guests", "speakers", [...eventRequest.speakers_and_guests.speakers, { ...emptySpeaker }])}>
                Add speaker
              </button>
            </div>
            {eventRequest.speakers_and_guests.speakers.map((speaker, index) => (
              <div className="array-item" key={`${index}-${speaker.name}`}>
                <div className="form-grid">
                  <TextInput label="name" value={speaker.name} onChange={(value) => updateSpeaker(index, "name", value)} />
                  <TextInput label="organization" value={speaker.organization} onChange={(value) => updateSpeaker(index, "organization", value)} />
                  <TextInput label="role_title" value={speaker.role_title} onChange={(value) => updateSpeaker(index, "role_title", value)} />
                </div>
                <TextArea label="notes" value={speaker.notes} onChange={(value) => updateSpeaker(index, "notes", value)} />
                <div className="checkbox-grid">
                  <CheckboxInput label="is_external" checked={speaker.is_external} onChange={(value) => updateSpeaker(index, "is_external", value)} />
                  <CheckboxInput label="is_vip" checked={speaker.is_vip} onChange={(value) => updateSpeaker(index, "is_vip", value)} />
                  <CheckboxInput label="is_politically_sensitive" checked={speaker.is_politically_sensitive} onChange={(value) => updateSpeaker(index, "is_politically_sensitive", value)} />
                  <CheckboxInput label="requires_security_review" checked={speaker.requires_security_review} onChange={(value) => updateSpeaker(index, "requires_security_review", value)} />
                </div>
                <button type="button" onClick={() => removeSpeaker(index)}>
                  Remove speaker
                </button>
              </div>
            ))}
          </section>

          <section className="form-section">
            <h2>Sponsorship and external parties</h2>
            <TextArea label="sponsor_names" value={listToLines(eventRequest.sponsorship_and_external_parties.sponsor_names)} onChange={(value) => updateSection("sponsorship_and_external_parties", "sponsor_names", linesToList(value))} />
            <TextArea label="vendor_notes" value={eventRequest.sponsorship_and_external_parties.vendor_notes} onChange={(value) => updateSection("sponsorship_and_external_parties", "vendor_notes", value)} />
            <div className="checkbox-grid">
              <CheckboxInput label="has_sponsors" checked={eventRequest.sponsorship_and_external_parties.has_sponsors} onChange={(value) => updateSection("sponsorship_and_external_parties", "has_sponsors", value)} />
              <CheckboxInput label="has_external_vendors" checked={eventRequest.sponsorship_and_external_parties.has_external_vendors} onChange={(value) => updateSection("sponsorship_and_external_parties", "has_external_vendors", value)} />
              <CheckboxInput label="requires_booth_or_branding" checked={eventRequest.sponsorship_and_external_parties.requires_booth_or_branding} onChange={(value) => updateSection("sponsorship_and_external_parties", "requires_booth_or_branding", value)} />
            </div>
          </section>

          <section className="form-section">
            <h2>Planning and governance</h2>
            <div className="form-grid">
              <TextInput label="business_case_link" value={eventRequest.planning_and_governance.business_case_link} onChange={(value) => updateSection("planning_and_governance", "business_case_link", value)} />
              <TextInput label="crib_sheet_link" value={eventRequest.planning_and_governance.crib_sheet_link} onChange={(value) => updateSection("planning_and_governance", "crib_sheet_link", value)} />
              <TextInput label="dean_attendance_status" value={eventRequest.planning_and_governance.dean_attendance_status} onChange={(value) => updateSection("planning_and_governance", "dean_attendance_status", value)} />
              <TextInput label="security_review_status" value={eventRequest.planning_and_governance.security_review_status} onChange={(value) => updateSection("planning_and_governance", "security_review_status", value)} />
              <TextInput label="advancement_review_status" value={eventRequest.planning_and_governance.advancement_review_status} onChange={(value) => updateSection("planning_and_governance", "advancement_review_status", value)} />
              <TextInput label="editorial_theme" value={eventRequest.planning_and_governance.editorial_theme} onChange={(value) => updateSection("planning_and_governance", "editorial_theme", value)} />
              <TextInput label="content_priority" value={eventRequest.planning_and_governance.content_priority} onChange={(value) => updateSection("planning_and_governance", "content_priority", value)} />
              <TextInput label="free_or_paid" value={eventRequest.planning_and_governance.free_or_paid} onChange={(value) => updateSection("planning_and_governance", "free_or_paid", value)} />
              <TextInput label="events_oversight_review_date" value={eventRequest.planning_and_governance.events_oversight_review_date} onChange={(value) => updateSection("planning_and_governance", "events_oversight_review_date", value)} />
              <TextInput label="dean_review_date" value={eventRequest.planning_and_governance.dean_review_date} onChange={(value) => updateSection("planning_and_governance", "dean_review_date", value)} />
              <TextInput label="editorial_review_date" value={eventRequest.planning_and_governance.editorial_review_date} onChange={(value) => updateSection("planning_and_governance", "editorial_review_date", value)} />
              <TextInput label="event_promo_review_date" value={eventRequest.planning_and_governance.event_promo_review_date} onChange={(value) => updateSection("planning_and_governance", "event_promo_review_date", value)} />
              <TextInput label="ccn_review_date" value={eventRequest.planning_and_governance.ccn_review_date} onChange={(value) => updateSection("planning_and_governance", "ccn_review_date", value)} />
              <TextInput label="ep_review_date" value={eventRequest.planning_and_governance.ep_review_date} onChange={(value) => updateSection("planning_and_governance", "ep_review_date", value)} />
            </div>
            <TextArea label="editorial_content_tags" value={listToLines(eventRequest.planning_and_governance.editorial_content_tags)} onChange={(value) => updateSection("planning_and_governance", "editorial_content_tags", linesToList(value))} />
            <TextArea label="event_overview_tags" value={listToLines(eventRequest.planning_and_governance.event_overview_tags)} onChange={(value) => updateSection("planning_and_governance", "event_overview_tags", linesToList(value))} />
            <div className="checkbox-grid">
              <CheckboxInput label="business_case_required" checked={eventRequest.planning_and_governance.business_case_required} onChange={(value) => updateSection("planning_and_governance", "business_case_required", value)} />
              <CheckboxInput label="photography_requested" checked={eventRequest.planning_and_governance.photography_requested} onChange={(value) => updateSection("planning_and_governance", "photography_requested", value)} />
            </div>
          </section>

          <section className="form-section">
            <h2>Intake state</h2>
            <div className="form-grid">
              <SelectInput label="source" value={eventRequest.intake_state.source} options={intakeSources} onChange={(value) => updateSection("intake_state", "source", value as EventRequest["intake_state"]["source"])} />
              <NumberInput label="completeness_score" value={eventRequest.intake_state.completeness_score} onChange={(value) => updateSection("intake_state", "completeness_score", value)} />
            </div>
            <TextArea label="missing_fields" value={listToLines(eventRequest.intake_state.missing_fields)} onChange={(value) => updateSection("intake_state", "missing_fields", linesToList(value))} />
            <TextArea label="assumptions" value={listToLines(eventRequest.intake_state.assumptions)} onChange={(value) => updateSection("intake_state", "assumptions", linesToList(value))} />
          </section>
        </form>

        <aside className="ws4-output">
          <ResponsePanel title="Auth/API" value={results.auth} error={errors.auth} />
          <ResponsePanel title="AI status" value={results.ai} error={errors.ai} />
          <ResponsePanel title="Tiering result" value={results.classification} error={errors.classification} />
          <ResponsePanel title="Stakeholder packets" value={results.routing} error={errors.routing} />
          <ResponsePanel title="Monday mock payload" value={results.monday} error={errors.monday} />
          <section className="response-panel">
            <h3>Current request JSON</h3>
            <pre>{JSON.stringify(eventPayload, null, 2)}</pre>
          </section>
        </aside>
      </div>
    </section>
  );
}
