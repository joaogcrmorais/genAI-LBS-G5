import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useMemo, useState } from "react";
import { apiGet, apiPost } from "../services/api";

type FieldStatus =
  | "final"
  | "best_estimate"
  | "not_sure_yet"
  | "needs_confirmation"
  | "not_applicable"
  | "organiser_follow_up"
  | "missing";

type SpaceRequestField = {
  label: string;
  key: string;
  category: string;
};

type Scenario = {
  id: string;
  type: string;
  prompt: string;
  expected_attendance?: number;
};

type ChatMessage = {
  role: "user" | "assistant";
  content: string;
};

type UserStory = {
  epic: string;
  story: string;
  title: string;
  acceptance: string[];
};

type BootstrapResponse = {
  source_of_truth: {
    field_source: string;
    processed_field_map: string;
    question_flow: string;
    note: string;
  };
  field_statuses: FieldStatus[];
  official_fields: SpaceRequestField[];
  scenarios: Scenario[];
  user_stories: UserStory[];
};

type EventRequestDraft = {
  fields: Record<string, unknown>;
  field_status: Record<string, FieldStatus>;
  additional_context?: string[];
};

type CoverageItem = SpaceRequestField & {
  status: FieldStatus;
  value?: unknown;
  ready: boolean;
};

type EvaluateResponse = {
  entry_type: string;
  event_request: EventRequestDraft;
  coverage: {
    total_fields: number;
    ready_fields: number;
    missing_fields: number;
    phase_1_ready: boolean;
    items: CoverageItem[];
  };
  next_questions: Array<{
    field_key: string;
    label: string;
    category: string;
    question: string;
    options: string[];
  }>;
  guidance_flags: Array<{
    type: string;
    label: string;
    rationale: string;
  }>;
  source_notes: string[];
};

type ChatResponse = EvaluateResponse & {
  assistant_message: string;
  ai_reasoning: string[];
  ai_field_updates: Array<{
    key: string;
    value: unknown;
    status: FieldStatus;
    rationale: string;
  }>;
  ai_unanswered_questions: string[];
};

function stringifyFieldValue(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return String(value);
}

function FieldEditor({
  field,
  value,
  status,
  statuses,
  onValueChange,
  onStatusChange
}: {
  field: SpaceRequestField;
  value: unknown;
  status: FieldStatus;
  statuses: FieldStatus[];
  onValueChange: (value: string) => void;
  onStatusChange: (status: FieldStatus) => void;
}) {
  return (
    <div className="era-field-row">
      <label className="form-field">
        <span>{field.label}</span>
        <textarea
          value={stringifyFieldValue(value)}
          onChange={(event) => onValueChange(event.target.value)}
          rows={2}
        />
      </label>
      <label className="form-field">
        <span>Status</span>
        <select value={status} onChange={(event) => onStatusChange(event.target.value as FieldStatus)}>
          {statuses.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </label>
    </div>
  );
}

function ResponsePanel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="response-panel">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

export function EventReadinessDemoPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [bootstrap, setBootstrap] = useState<BootstrapResponse | null>(null);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [prompt, setPrompt] = useState("");
  const [chatInput, setChatInput] = useState("");
  const [transcript, setTranscript] = useState<ChatMessage[]>([]);
  const [eventRequest, setEventRequest] = useState<EventRequestDraft>({ fields: {}, field_status: {} });
  const [evaluation, setEvaluation] = useState<EvaluateResponse | null>(null);
  const [chatResult, setChatResult] = useState<ChatResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  const fieldsByCategory = useMemo(() => {
    const grouped = new Map<string, SpaceRequestField[]>();
    for (const field of bootstrap?.official_fields ?? []) {
      grouped.set(field.category, [...(grouped.get(field.category) ?? []), field]);
    }
    return Array.from(grouped.entries());
  }, [bootstrap?.official_fields]);

  async function loadBootstrap() {
    const token = await getAccessTokenSilently();
    const data = await apiGet<BootstrapResponse>("/api/event-readiness/bootstrap", token);
    setBootstrap(data);
    const firstScenario = data.scenarios[0];
    if (firstScenario) {
      setSelectedScenario(firstScenario.id);
      setPrompt(firstScenario.prompt);
      setChatInput(firstScenario.prompt);
      await evaluate(firstScenario.id, firstScenario.prompt, { fields: {}, field_status: {} });
    }
  }

  async function evaluate(
    scenarioId = selectedScenario,
    promptValue = prompt,
    draft = eventRequest
  ) {
    setBusy(true);
    setError(null);
    try {
      const token = await getAccessTokenSilently();
      const result = await apiPost<EvaluateResponse>(
        "/api/event-readiness/event-request/evaluate",
        {
          scenario_id: scenarioId || undefined,
          prompt: promptValue,
          event_request: draft
        },
        token
      );
      setEvaluation(result);
      setEventRequest(result.event_request);
      setChatResult(null);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    } finally {
      setBusy(false);
    }
  }

  async function sendChatMessage(message = chatInput) {
    const trimmed = message.trim();
    if (!trimmed) return;

    setBusy(true);
    setError(null);
    const nextTranscript: ChatMessage[] = [...transcript, { role: "user", content: trimmed }];
    setTranscript(nextTranscript);
    setChatInput("");

    try {
      const token = await getAccessTokenSilently();
      const result = await apiPost<ChatResponse>(
        "/api/event-readiness/chat",
        {
          message: trimmed,
          transcript,
          event_request: eventRequest
        },
        token
      );
      const assistantMessage: ChatMessage = { role: "assistant", content: result.assistant_message };
      setTranscript([...nextTranscript, assistantMessage]);
      setChatResult(result);
      setEvaluation(result);
      setEventRequest(result.event_request);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    } finally {
      setBusy(false);
    }
  }

  useEffect(() => {
    let mounted = true;
    void loadBootstrap().catch((caught) => {
      if (mounted) setError(caught instanceof Error ? caught.message : String(caught));
    });
    return () => {
      mounted = false;
    };
    // loadBootstrap intentionally captures Auth0 token helper once on mount.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function chooseScenario(id: string) {
    const scenario = bootstrap?.scenarios.find((item) => item.id === id);
    setSelectedScenario(id);
    setPrompt(scenario?.prompt ?? "");
    setChatInput(scenario?.prompt ?? "");
    setTranscript([]);
    setEventRequest({ fields: {}, field_status: {} });
    setEvaluation(null);
    setChatResult(null);
  }

  function updateFieldValue(key: string, value: string) {
    setEventRequest((current) => ({
      ...current,
      fields: {
        ...current.fields,
        [key]: value
      },
      field_status: {
        ...current.field_status,
        [key]: value.trim() ? current.field_status[key] ?? "final" : "missing"
      }
    }));
  }

  function updateFieldStatus(key: string, status: FieldStatus) {
    setEventRequest((current) => ({
      ...current,
      field_status: {
        ...current.field_status,
        [key]: status
      }
    }));
  }

  if (!bootstrap) {
    return <div className="status-panel">{error ?? "Loading Event Readiness demo..."}</div>;
  }

  return (
    <section className="era-demo">
      <div className="ws4-header">
        <div>
          <p className="eyebrow">Event Readiness Assistant</p>
          <h1>Phase 1 testing page</h1>
        </div>
        <label className="form-field scenario-control">
          <span>Scenario</span>
          <select value={selectedScenario} onChange={(event) => chooseScenario(event.target.value)}>
            {bootstrap.scenarios.map((scenario) => (
              <option key={scenario.id} value={scenario.id}>
                {scenario.id}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="era-layout">
        <div className="era-main">
          <section className="form-section">
            <h2>Chat test</h2>
            <div className="era-chat-window" aria-label="Conversation transcript">
              {transcript.length ? (
                transcript.map((message, index) => (
                  <div className={`era-chat-message ${message.role}`} key={`${message.role}-${index}`}>
                    <span>{message.role === "user" ? "Organiser" : "Assistant"}</span>
                    <p>{message.content}</p>
                  </div>
                ))
              ) : (
                <div className="era-empty-chat">
                  Start with the selected scenario or type a fresh organiser message.
                </div>
              )}
            </div>
            <label className="form-field">
              <span>Message</span>
              <textarea value={chatInput} onChange={(event) => setChatInput(event.target.value)} rows={4} />
            </label>
            <div className="button-row ws4-actions">
              <button type="button" onClick={() => void sendChatMessage()} disabled={busy || !chatInput.trim()}>
                Send Message
              </button>
              <button type="button" onClick={() => void sendChatMessage(prompt)} disabled={busy || !prompt.trim()}>
                Start From Scenario
              </button>
              <button
                type="button"
                onClick={() => {
                  setTranscript([]);
                  setChatResult(null);
                  setEvaluation(null);
                  setEventRequest({ fields: {}, field_status: {} });
                }}
                disabled={busy}
              >
                Reset Conversation
              </button>
            </div>
            {busy ? <div className="status-panel">Running Event Readiness chat...</div> : null}
            {error ? <div className="status-panel">{error}</div> : null}
          </section>

          <section className="form-section">
            <h2>Scenario seed</h2>
            <label className="form-field">
              <span>Prompt or pasted draft</span>
              <textarea value={prompt} onChange={(event) => setPrompt(event.target.value)} rows={5} />
            </label>
            <div className="button-row ws4-actions">
              <button type="button" onClick={() => void evaluate()} disabled={busy}>
                Evaluate Without Chat
              </button>
              <button
                type="button"
                onClick={() => {
                  setEventRequest({ fields: {}, field_status: {} });
                  setEvaluation(null);
                  setChatResult(null);
                }}
                disabled={busy}
              >
                Clear Draft
              </button>
            </div>
          </section>

          <section className="scenario-guide">
            <table>
              <caption>Epic 1-2 story checklist</caption>
              <thead>
                <tr>
                  <th>Story</th>
                  <th>Acceptance criteria</th>
                </tr>
              </thead>
              <tbody>
                {bootstrap.user_stories.map((story) => (
                  <tr key={story.story}>
                    <td>
                      {story.epic} / {story.story}
                      <br />
                      {story.title}
                    </td>
                    <td>{story.acceptance.join(" ")}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </section>

          {fieldsByCategory.map(([category, fields]) => (
            <section className="form-section" key={category}>
              <h2>{category}</h2>
              {fields.map((field) => (
                <FieldEditor
                  key={field.key}
                  field={field}
                  value={eventRequest.fields[field.key]}
                  status={eventRequest.field_status[field.key] ?? "missing"}
                  statuses={bootstrap.field_statuses}
                  onValueChange={(value) => updateFieldValue(field.key, value)}
                  onStatusChange={(status) => updateFieldStatus(field.key, status)}
                />
              ))}
            </section>
          ))}
        </div>

        <aside className="ws4-output">
          <ResponsePanel title="Phase 1 coverage">
            <p className="panel-note">
              Readiness counters from deterministic coverage. This is not model judgment.
            </p>
            {evaluation ? (
              <div className="era-metrics">
                <div>
                  <strong>{evaluation.coverage.ready_fields}</strong>
                  <span>ready</span>
                </div>
                <div>
                  <strong>{evaluation.coverage.missing_fields}</strong>
                  <span>missing</span>
                </div>
                <div>
                  <strong>{evaluation.coverage.phase_1_ready ? "Yes" : "No"}</strong>
                  <span>Phase 1 ready</span>
                </div>
              </div>
            ) : (
              <p>No evaluation yet.</p>
            )}
          </ResponsePanel>

          <ResponsePanel title="Entry type and guidance">
            <p className="panel-note">
              JSON showing the detected starting point, source-backed guidance flags, and contract notes.
            </p>
            <pre>
              {JSON.stringify(
                evaluation
                  ? {
                      entry_type: evaluation.entry_type,
                      guidance_flags: evaluation.guidance_flags,
                      source_notes: evaluation.source_notes
                    }
                  : { note: bootstrap.source_of_truth.note },
                null,
                2
              )}
            </pre>
          </ResponsePanel>

          <ResponsePanel title="Assistant turn">
            <p className="panel-note">
              JSON returned by the OpenAI-backed chat interpreter: response text, field updates, and reasoning summary.
            </p>
            <pre>
              {JSON.stringify(
                chatResult
                  ? {
                      assistant_message: chatResult.assistant_message,
                      ai_field_updates: chatResult.ai_field_updates,
                      ai_reasoning: chatResult.ai_reasoning,
                      ai_unanswered_questions: chatResult.ai_unanswered_questions
                    }
                  : { note: "No chat turn yet." },
                null,
                2
              )}
            </pre>
          </ResponsePanel>

          <ResponsePanel title="Next questions">
            <p className="panel-note">
              Deterministic next missing CribSheet fields, capped at three, for the assistant to keep the conversation moving.
            </p>
            <pre>{JSON.stringify(evaluation?.next_questions ?? [], null, 2)}</pre>
          </ResponsePanel>

          <ResponsePanel title="Coverage detail">
            <p className="panel-note">
              JSON list of every official CribSheet field with current value, status, category, and ready/not-ready flag.
            </p>
            <pre>{JSON.stringify(evaluation?.coverage.items ?? [], null, 2)}</pre>
          </ResponsePanel>

          <ResponsePanel title="Populated EventRequest">
            <p className="panel-note">
              Canonical Phase 1 object that downstream DOCX, Key Event, routing, timeline, and Monday mock outputs will consume.
            </p>
            <pre>{JSON.stringify(eventRequest, null, 2)}</pre>
          </ResponsePanel>
        </aside>
      </div>
    </section>
  );
}
