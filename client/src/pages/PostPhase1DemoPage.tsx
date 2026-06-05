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

type EventRequestDraft = {
  fields: Record<string, unknown>;
  field_status: Record<string, FieldStatus>;
  additional_context?: string[];
};

type Scenario = {
  id: string;
  name: string;
  description: string;
  expected: {
    key_event_candidate: boolean;
    eis_required: boolean;
    key_event_trigger?: string;
    stakeholders: string[];
    not_expected_stakeholders?: string[];
  };
  event_request: EventRequestDraft;
};

type BootstrapResponse = {
  source_of_truth: Record<string, unknown>;
  official_fields: SpaceRequestField[];
  field_statuses: FieldStatus[];
  scenarios: Scenario[];
  stakeholder_directory: unknown[];
  routing_rules: unknown[];
  qa_checklist: string[];
};

type RunResponse = {
  mock_notice: string;
  coverage: unknown;
  key_event: {
    key_event_candidate: boolean;
    trigger_type: string;
    counted_criteria: string[];
  };
  eis: {
    required: boolean;
    markdown: string;
  };
  routing: {
    stakeholders: Array<{ id: string; name: string; priority: string; email?: string; reason: string }>;
  };
  email_drafts: unknown[];
  timeline: { items: unknown[] };
  complexity_risk: { status: string; suggested_complexity?: string; risk_flags: string[] };
  monday_mock: unknown;
  qa: {
    checks: Array<{ id: string; label: string; pass: boolean; detail: string }>;
    pass_count: number;
    fail_count: number;
  };
  event_request: EventRequestDraft;
};

const QA_STORAGE_KEY = "event-readiness-post-phase1-qa-v1";

function cloneEventRequest(eventRequest: EventRequestDraft) {
  return JSON.parse(JSON.stringify(eventRequest)) as EventRequestDraft;
}

function valueToString(value: unknown) {
  if (value === null || value === undefined) return "";
  if (typeof value === "string") return value;
  return String(value);
}

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section className="response-panel">
      <h3>{title}</h3>
      {children}
    </section>
  );
}

function JsonPanel({ title, value }: { title: string; value: unknown }) {
  return (
    <Panel title={title}>
      <pre>{JSON.stringify(value, null, 2)}</pre>
    </Panel>
  );
}

export function PostPhase1DemoPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [bootstrap, setBootstrap] = useState<BootstrapResponse | null>(null);
  const [selectedScenario, setSelectedScenario] = useState("");
  const [eventRequest, setEventRequest] = useState<EventRequestDraft>({ fields: {}, field_status: {} });
  const [jsonDraft, setJsonDraft] = useState("");
  const [activeTab, setActiveTab] = useState<"runner" | "json">("runner");
  const [result, setResult] = useState<RunResponse | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [jsonError, setJsonError] = useState<string | null>(null);
  const [busyAction, setBusyAction] = useState<string | null>(null);
  const [qaTicks, setQaTicks] = useState<Record<string, boolean>>(() => {
    try {
      return JSON.parse(window.localStorage.getItem(QA_STORAGE_KEY) ?? "{}") as Record<string, boolean>;
    } catch {
      return {};
    }
  });

  const scenario = useMemo(
    () => bootstrap?.scenarios.find((item) => item.id === selectedScenario),
    [bootstrap?.scenarios, selectedScenario]
  );

  const coverage = useMemo(() => {
    const items = (bootstrap?.official_fields ?? []).map((field) => {
      const status = eventRequest.field_status[field.key] ?? "missing";
      const ready = status !== "missing";
      return { ...field, status, ready, value: eventRequest.fields[field.key] };
    });
    return {
      items,
      ready: items.filter((item) => item.ready).length,
      total: items.length,
      missing: items.filter((item) => !item.ready).length
    };
  }, [bootstrap?.official_fields, eventRequest]);

  function syncJson(next: EventRequestDraft) {
    setJsonDraft(JSON.stringify(next, null, 2));
  }

  function setQaTick(id: string, checked: boolean) {
    setQaTicks((current) => {
      const next = { ...current, [id]: checked };
      window.localStorage.setItem(QA_STORAGE_KEY, JSON.stringify(next));
      return next;
    });
  }

  function loadScenario(id: string, scenarios = bootstrap?.scenarios) {
    const nextScenario = scenarios?.find((item) => item.id === id);
    if (!nextScenario) return;
    const nextEventRequest = cloneEventRequest(nextScenario.event_request);
    setSelectedScenario(id);
    setEventRequest(nextEventRequest);
    syncJson(nextEventRequest);
    setResult(null);
    setError(null);
    setJsonError(null);
  }

  async function loadBootstrap() {
    const token = await getAccessTokenSilently();
    const data = await apiGet<BootstrapResponse>("/api/event-readiness/post-phase1/bootstrap", token);
    setBootstrap(data);
    if (data.scenarios[0]) {
      loadScenario(data.scenarios[0].id, data.scenarios);
    }
  }

  function updateField(key: string, value: string) {
    setEventRequest((current) => {
      const next = {
        ...current,
        fields: {
          ...current.fields,
          [key]: value
        },
        field_status: {
          ...current.field_status,
          [key]: value.trim() ? current.field_status[key] ?? "final" : "missing"
        }
      };
      syncJson(next);
      return next;
    });
  }

  function updateStatus(key: string, status: FieldStatus) {
    setEventRequest((current) => {
      const next = {
        ...current,
        field_status: {
          ...current.field_status,
          [key]: status
        }
      };
      syncJson(next);
      return next;
    });
  }

  function applyJsonDraft() {
    setJsonError(null);
    try {
      const parsed = JSON.parse(jsonDraft) as EventRequestDraft;
      if (!parsed.fields || !parsed.field_status) {
        throw new Error("JSON must include fields and field_status.");
      }
      setEventRequest(parsed);
      setResult(null);
    } catch (caught) {
      setJsonError(caught instanceof Error ? caught.message : String(caught));
    }
  }

  async function runFlow(runAiRisk: boolean) {
    setBusyAction(runAiRisk ? "full-flow" : "deterministic");
    setError(null);
    setActiveTab("runner");
    try {
      const token = await getAccessTokenSilently();
      const data = await apiPost<RunResponse>(
        "/api/event-readiness/post-phase1/run",
        {
          scenario_id: selectedScenario || undefined,
          event_request: eventRequest,
          options: { run_ai_risk: runAiRisk }
        },
        token
      );
      setResult(data);
    } catch (caught) {
      setError(caught instanceof Error ? caught.message : String(caught));
    } finally {
      setBusyAction(null);
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

  if (!bootstrap) {
    return <div className="status-panel">{error ?? "Loading post-Phase-1 demo..."}</div>;
  }

  return (
    <section className="post-phase-demo">
      <div className="ws4-header">
        <div>
          <p className="eyebrow">Event Readiness Assistant</p>
          <h1>Post-Phase-1 backend QA</h1>
        </div>
        <label className="form-field scenario-control">
          <span>Scenario</span>
          <select value={selectedScenario} onChange={(event) => loadScenario(event.target.value)}>
            {bootstrap.scenarios.map((item) => (
              <option value={item.id} key={item.id}>
                {item.name}
              </option>
            ))}
          </select>
        </label>
      </div>

      <div className="era-tabs" role="tablist" aria-label="Post Phase 1 views">
        <button type="button" className={activeTab === "runner" ? "active" : undefined} onClick={() => setActiveTab("runner")}>
          Test Runner
        </button>
        <button type="button" className={activeTab === "json" ? "active" : undefined} onClick={() => setActiveTab("json")}>
          JSON Outputs
        </button>
      </div>

      {activeTab === "runner" ? (
        <>
          <section className="form-section">
            <div className="post-scenario-summary">
              <div>
                <h2>{scenario?.name ?? "Scenario"}</h2>
                <p className="panel-note">{scenario?.description}</p>
              </div>
              <div className="era-metrics">
                <div>
                  <strong>{coverage.ready}</strong>
                  <span>ready fields</span>
                </div>
                <div>
                  <strong>{coverage.missing}</strong>
                  <span>missing</span>
                </div>
                <div>
                  <strong>{result?.qa.fail_count ?? "-"}</strong>
                  <span>QA fails</span>
                </div>
              </div>
            </div>
          </section>

          <div className="button-row ws4-actions">
            <button type="button" onClick={() => void runFlow(false)} disabled={busyAction !== null}>
              Run Deterministic
            </button>
            <button type="button" onClick={() => void runFlow(true)} disabled={busyAction !== null}>
              Run Full Flow
            </button>
            <button type="button" onClick={() => scenario && loadScenario(scenario.id)} disabled={busyAction !== null || !scenario}>
              Reset Scenario
            </button>
          </div>
          {busyAction ? <div className="status-panel">Running {busyAction}...</div> : null}
          {error ? <div className="status-panel">{error}</div> : null}

          <div className="post-runner-grid">
            <div className="post-main">
              <section className="form-section">
                <h2>QA expectations</h2>
                <div className="post-status-grid">
                  {(result?.qa.checks ?? [
                    {
                      id: "expected-key-event",
                      label: "Expected Key Event",
                      pass: Boolean(scenario?.expected.key_event_candidate),
                      detail: String(scenario?.expected.key_event_candidate)
                    },
                    {
                      id: "expected-eis",
                      label: "Expected EIS",
                      pass: Boolean(scenario?.expected.eis_required),
                      detail: String(scenario?.expected.eis_required)
                    },
                    {
                      id: "expected-stakeholders",
                      label: "Expected stakeholders",
                      pass: true,
                      detail: scenario?.expected.stakeholders.join(", ") ?? ""
                    }
                  ]).map((check) => (
                    <div className={`post-status-card ${check.pass ? "pass" : "fail"}`} key={check.id}>
                      <strong>{check.label}</strong>
                      <span>{check.pass ? "Pass" : "Check"}</span>
                      <p>{check.detail}</p>
                    </div>
                  ))}
                </div>
              </section>

              <section className="form-section">
                <h2>Editable EventRequest JSON</h2>
                <textarea
                  className="post-json-editor"
                  value={jsonDraft}
                  onChange={(event) => setJsonDraft(event.target.value)}
                  spellCheck={false}
                />
                <div className="button-row ws4-actions">
                  <button type="button" onClick={applyJsonDraft}>
                    Apply JSON
                  </button>
                  <button type="button" onClick={() => syncJson(eventRequest)}>
                    Refresh From Fields
                  </button>
                </div>
                {jsonError ? <p className="post-error">{jsonError}</p> : null}
              </section>

              <section className="post-field-grid">
                {bootstrap.official_fields.map((field) => (
                  <div className="form-section post-field-card" key={field.key}>
                    <h2>{field.label}</h2>
                    <p className="panel-note">{field.key}</p>
                    <label className="form-field">
                      <span>Value</span>
                      <textarea
                        value={valueToString(eventRequest.fields[field.key])}
                        onChange={(event) => updateField(field.key, event.target.value)}
                        rows={3}
                      />
                    </label>
                    <label className="form-field">
                      <span>Status</span>
                      <select value={eventRequest.field_status[field.key] ?? "missing"} onChange={(event) => updateStatus(field.key, event.target.value as FieldStatus)}>
                        {bootstrap.field_statuses.map((status) => (
                          <option value={status} key={status}>
                            {status}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>
                ))}
              </section>
            </div>

            <aside className="post-side">
              <Panel title="Output summary">
                <div className="post-output-summary">
                  <div>
                    <span>Key Event</span>
                    <strong>{result ? String(result.key_event.key_event_candidate) : "Not run"}</strong>
                  </div>
                  <div>
                    <span>EIS</span>
                    <strong>{result ? String(result.eis.required) : "Not run"}</strong>
                  </div>
                  <div>
                    <span>Stakeholders</span>
                    <strong>{result?.routing.stakeholders.length ?? "Not run"}</strong>
                  </div>
                  <div>
                    <span>Email drafts</span>
                    <strong>{result?.email_drafts.length ?? "Not run"}</strong>
                  </div>
                  <div>
                    <span>Timeline</span>
                    <strong>{result?.timeline.items.length ?? "Not run"}</strong>
                  </div>
                  <div>
                    <span>Risk</span>
                    <strong>{result?.complexity_risk.status ?? "Not run"}</strong>
                  </div>
                </div>
              </Panel>

              <section className="form-section">
                <div className="era-qa-header post-checklist-header">
                  <div>
                    <h2>QA checklist</h2>
                    <p className="panel-note">Local browser ticks for demo validation.</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      window.localStorage.removeItem(QA_STORAGE_KEY);
                      setQaTicks({});
                    }}
                  >
                    Reset
                  </button>
                </div>
                <div className="era-checklist">
                  {bootstrap.qa_checklist.map((item) => (
                    <label className="era-check-item" key={item}>
                      <input
                        type="checkbox"
                        checked={Boolean(qaTicks[item])}
                        onChange={(event) => setQaTick(item, event.target.checked)}
                      />
                      <span>{item}</span>
                    </label>
                  ))}
                </div>
              </section>

              <JsonPanel title="Stakeholder directory" value={bootstrap.stakeholder_directory} />
            </aside>
          </div>
        </>
      ) : (
        <div className="post-json-grid">
          <JsonPanel title="Full response" value={result ?? { note: "Run a flow first." }} />
          <JsonPanel title="EventRequest" value={eventRequest} />
          <JsonPanel title="Coverage" value={result?.coverage ?? coverage} />
          <JsonPanel title="Key Event" value={result?.key_event ?? { note: "Not run." }} />
          <JsonPanel title="EIS" value={result?.eis ?? { note: "Not run." }} />
          <JsonPanel title="Routing" value={result?.routing ?? { note: "Not run." }} />
          <JsonPanel title="Email Drafts" value={result?.email_drafts ?? { note: "Not run." }} />
          <JsonPanel title="Timeline" value={result?.timeline ?? { note: "Not run." }} />
          <JsonPanel title="Complexity / Risk" value={result?.complexity_risk ?? { note: "Not run." }} />
          <JsonPanel title="Monday Mock" value={result?.monday_mock ?? { note: "Not run." }} />
          <JsonPanel title="Sources" value={bootstrap.source_of_truth} />
          <JsonPanel title="Routing rules" value={bootstrap.routing_rules} />
        </div>
      )}
    </section>
  );
}
