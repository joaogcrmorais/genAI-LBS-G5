import { useAuth0 } from "@auth0/auth0-react";
import { useEffect, useMemo, useRef, useState } from "react";
import lbsLogo from "../assets/lbs-logo.jpg";
import { demoScenarios } from "../data/eventReadinessMvpScenarios";
import {
  downloadSpaceRequestDocx,
  runPostPhase1,
  sendEventReadinessTurn,
  triggerBlobDownload,
  triggerTextDownload
} from "../services/eventReadinessMvpApi";
import type {
  BackendPostPhase1Result,
  Block,
  DemoScenario,
  EventRequestDraft,
  KeyEventInfo,
  Mark,
  Stakeholder
} from "../types/eventReadinessMvp";

type Turn = { role: "assistant" | "user"; blocks?: Block[]; text?: string };
type Unlocks = { space: boolean; keyEvent: boolean; eis: boolean; stakeholders: boolean; extras: boolean };
type DrawerState = { open: boolean; activeId: string | null };
type ComposerState =
  | { mode: "scenario" }
  | NonNullable<DemoScenario["script"][number]["replies"]>
  | null;

const emptyUnlocks: Unlocks = { space: false, keyEvent: false, eis: false, stakeholders: false, extras: false };

function Icon({ name }: { name: string }) {
  const common = { width: 18, height: 18, viewBox: "0 0 24 24", fill: "none", stroke: "currentColor", strokeWidth: 2 };
  if (name === "restart") {
    return (
      <svg {...common}><path d="M3 12a9 9 0 1 0 3-6.7" /><path d="M3 4v6h6" /></svg>
    );
  }
  if (name === "file") return <svg {...common}><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" /><path d="M14 2v6h6" /></svg>;
  if (name === "star") return <svg {...common}><path d="m12 2 3 6 7 .9-5 4.7 1.3 6.8L12 17l-6.3 3.4L7 13.6 2 8.9 9 8z" /></svg>;
  if (name === "check") return <svg {...common}><path d="m20 6-11 11-5-5" /></svg>;
  if (name === "shield") return <svg {...common}><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>;
  if (name === "users") return <svg {...common}><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>;
  if (name === "sparkle") return <svg {...common}><path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8z" /><path d="M19 17l.7 2 2 .7-2 .7-.7 2-.7-2-2-.7 2-.7z" /></svg>;
  if (name === "gear") return <svg {...common}><path d="M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z" /><path d="M19.4 15a1.7 1.7 0 0 0 .3 1.9l.1.1-2 3.5-.2-.1a1.7 1.7 0 0 0-1.9.3l-.4.3-3.3-1.9V18a1.8 1.8 0 0 0-1.1-1.6L10.5 16 7.2 18l-.4-.3a1.7 1.7 0 0 0-1.9-.3l-.2.1-2-3.5.1-.1A1.7 1.7 0 0 0 3 12l-.1-.5 3.3-1.9.4.3A1.8 1.8 0 0 0 8.5 10l.4-.2V6l3.1-1.8L15.1 6v3.8l.4.2a1.8 1.8 0 0 0 1.9-.1l.4-.3 3.3 1.9z" /></svg>;
  return <svg {...common}><path d="m9 18 6-6-6-6" /></svg>;
}

function markLabel(mark?: Mark) {
  if (mark === "confirm") return "needs confirmation";
  if (mark === "unsure") return "not sure yet";
  return "captured";
}

function Smark({ mark }: { mark?: Mark }) {
  return <span className={`mvp-smark ${mark ?? "ok"}`}>{markLabel(mark)}</span>;
}

function renderInline(text: string) {
  const parts = text.split(/(\*\*[^*]+\*\*|_[^_]+_)/g);
  return parts.map((part, index) => {
    if (part.startsWith("**") && part.endsWith("**")) return <strong key={index}>{part.slice(2, -2)}</strong>;
    if (part.startsWith("_") && part.endsWith("_")) return <em key={index}>{part.slice(1, -1)}</em>;
    return <span key={index}>{part}</span>;
  });
}

function BlockView({ block }: { block: Block }) {
  if (block.t === "lead") return <p className="mvp-lead">{renderInline(block.text)}</p>;
  if (block.t === "p") return <p>{renderInline(block.text)}</p>;
  return (
    <div className="mvp-reflect">
      {block.rows.map((row) => (
        <div key={row.k}>
          <span>{row.k}</span>
          <strong>{row.v} <Smark mark={row.mark} /></strong>
        </div>
      ))}
    </div>
  );
}

function Message({ turn }: { turn: Turn }) {
  if (turn.role === "user") return <div className="mvp-message user"><div className="mvp-bubble">{turn.text}</div></div>;
  return (
    <div className="mvp-message assistant">
      <div className="mvp-avatar">E</div>
      <div className="mvp-bubble">{turn.blocks?.map((block, index) => <BlockView key={index} block={block} />)}</div>
    </div>
  );
}

function Typing() {
  return (
    <div className="mvp-message assistant">
      <div className="mvp-avatar">E</div>
      <div className="mvp-bubble typing"><span /><span /><span /></div>
    </div>
  );
}

function Composer({
  composer,
  scenarios,
  selectedScenario,
  input,
  busy,
  onInput,
  onScenario,
  onReply,
  onFreeText,
  onRestart
}: {
  composer: ComposerState;
  scenarios: DemoScenario[];
  selectedScenario: DemoScenario;
  input: string;
  busy: boolean;
  onInput: (value: string) => void;
  onScenario: (scenario: DemoScenario) => void;
  onReply: (text: string, echo?: string) => void;
  onFreeText: () => void;
  onRestart: () => void;
}) {
  const [selected, setSelected] = useState<number[]>([]);

  useEffect(() => {
    if (composer && "mode" in composer && composer.mode === "multi") setSelected(composer.preselect ?? []);
    else setSelected([]);
  }, [composer]);

  return (
    <div className="mvp-composer">
      {composer?.mode === "scenario" ? (
        <div className="mvp-scenario-grid">
          {scenarios.map((scenario) => (
            <button type="button" key={scenario.id} className={scenario.id === selectedScenario.id ? "active" : ""} onClick={() => onScenario(scenario)}>
              <span>{scenario.label}</span>
              <strong>{scenario.clubName}</strong>
            </button>
          ))}
        </div>
      ) : null}

      {composer?.mode === "suggest" ? (
        <button type="button" className="mvp-suggest" onClick={() => onReply(composer.options[0].text)} disabled={busy}>
          <Icon name="sparkle" />
          <span>{composer.options[0].meta}</span>
          <strong>{composer.options[0].text}</strong>
        </button>
      ) : null}

      {composer?.mode === "single" ? (
        <div className="mvp-reply-row">
          {composer.options.map((option) => (
            <button type="button" className={option.primary ? "primary" : ""} key={option.text} onClick={() => onReply(option.text, option.echo)} disabled={busy}>
              {option.text}
            </button>
          ))}
        </div>
      ) : null}

      {composer?.mode === "multi" ? (
        <div className="mvp-reply-row">
          {composer.options.map((option, index) => (
            <button
              type="button"
              className={selected.includes(index) ? "selected" : ""}
              key={option.text}
              onClick={() => setSelected((current) => (current.includes(index) ? current.filter((item) => item !== index) : [...current, index]))}
              disabled={busy}
            >
              {selected.includes(index) ? "✓ " : ""}{option.text}
            </button>
          ))}
          <button type="button" className="primary" onClick={() => onReply(composer.sendEcho)} disabled={busy}>
            Continue
          </button>
        </div>
      ) : null}

      {composer?.mode === "end" ? (
        <div className="mvp-reply-row">
          <button type="button" onClick={onRestart}>{composer.options[0].text}</button>
        </div>
      ) : null}

      <form
        className="mvp-input-row"
        onSubmit={(event) => {
          event.preventDefault();
          onFreeText();
        }}
      >
        <textarea value={input} onChange={(event) => onInput(event.target.value)} placeholder="Type your own event idea or reply..." rows={2} />
        <button type="submit" className="primary" disabled={busy || !input.trim()}>Send</button>
      </form>
    </div>
  );
}

function Topbar({
  scenario,
  phase,
  onRestart
}: {
  scenario: DemoScenario;
  phase: string;
  onRestart: () => void;
}) {
  return (
    <header className="mvp-topbar">
      <div className="mvp-brand">
        <div className="mvp-logo-slot"><img src={lbsLogo} alt="London Business School" /></div>
        <div>
          <strong>Event Readiness Assistant</strong>
          <span>LONDON BUSINESS SCHOOL · STUDENT CLUBS</span>
        </div>
      </div>
      <div className="mvp-top-actions">
        <span className="mvp-pill">Demo: {scenario.label}</span>
        <span className="mvp-phase">{phase}</span>
        <button type="button" onClick={onRestart}><Icon name="restart" />Restart</button>
      </div>
    </header>
  );
}

function DCard({
  icon,
  title,
  kicker,
  children,
  footer,
  tone
}: {
  icon: string;
  title: string;
  kicker: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  tone?: string;
}) {
  return (
    <section className={`mvp-dcard ${tone ?? ""}`}>
      <div className="mvp-card-head">
        <span className="mvp-card-icon"><Icon name={icon} /></span>
        <div><h3>{title}</h3><p>{kicker}</p></div>
      </div>
      <div className="mvp-card-body">{children}</div>
      {footer ? <div className="mvp-card-footer">{footer}</div> : null}
    </section>
  );
}

function Expandable({ title, kicker, children }: { title: string; kicker: string; children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  return (
    <section className={`mvp-dcard mvp-expand ${open ? "open" : ""}`}>
      <button type="button" onClick={() => setOpen((value) => !value)}>
        <span><h3>{title}</h3><p>{kicker}</p></span>
        <Icon name="chevron" />
      </button>
      {open ? <div className="mvp-card-body">{children}</div> : null}
    </section>
  );
}

function keyInfoFromBackend(scenario: DemoScenario, backend: BackendPostPhase1Result | null): KeyEventInfo {
  if (!backend?.key_event) return scenario.keyEvent;
  const key = backend.key_event;
  return {
    candidate: key.key_event_candidate,
    headline: key.key_event_candidate ? "Could be considered a Key Event" : "Not a Key Event",
    reasons: key.key_event_candidate ? key.trigger_reasons : undefined,
    checks: key.key_event_candidate ? undefined : key.counted_criteria.length ? key.counted_criteria : scenario.keyEvent.checks,
    note: key.rationale_user_facing,
    disclaimer: scenario.keyEvent.disclaimer
  };
}

function stakeholdersFromBackend(scenario: DemoScenario, backend: BackendPostPhase1Result | null): Stakeholder[] {
  if (!backend?.routing?.stakeholders?.length) return scenario.stakeholders;
  return backend.routing.stakeholders.map((item) => {
    const draft = backend.email_drafts?.find((email) => email.stakeholder_id === item.id || email.stakeholder_name === item.name);
    return {
      id: item.id,
      name: item.name,
      role: item.priority,
      why: item.reason,
      email: draft?.to?.[0] ?? item.email ?? "",
      subject: draft?.subject ?? `Event follow-up - ${String(scenario.eventRequest.fields.event_title ?? "Event")}`,
      body: draft?.body ?? item.reason
    };
  });
}

function ReadinessRail({
  scenario,
  unlocked,
  backend,
  busyDownload,
  onDownloadSpace,
  onDownloadEis,
  onForceSpace,
  onOpenDrawer
}: {
  scenario: DemoScenario;
  unlocked: Unlocks;
  backend: BackendPostPhase1Result | null;
  busyDownload: string | null;
  onDownloadSpace: () => void;
  onDownloadEis: () => void;
  onForceSpace: () => void;
  onOpenDrawer: () => void;
}) {
  const keyEvent = keyInfoFromBackend(scenario, backend);
  const stakeholders = stakeholdersFromBackend(scenario, backend);
  const timeline = backend?.timeline?.items?.map((item) => [item.timing, item.task, item.stakeholder] as [string, string, string]) ?? scenario.timeline;
  const monday = backend?.monday_mock ?? scenario.mondayPayload;

  return (
    <aside className="mvp-rail">
      <div className="mvp-rail-head">
        <strong>✦ Readiness panel</strong>
        <p>{Object.values(unlocked).some(Boolean) ? "Everything you need to take this event forward." : "Documents and next steps appear here as your event comes together."}</p>
      </div>
      <div className="mvp-rail-stack">
        {!Object.values(unlocked).some(Boolean) ? (
          <div className="mvp-empty-card">
            <ol>
              <li>Space Request Form</li>
              <li>Key Event check</li>
              <li>EIS, if required</li>
              <li>Stakeholder emails</li>
            </ol>
          </div>
        ) : null}

        {unlocked.space ? (
          <DCard icon="file" title="Space Request Form" kicker="Word document · all fields" footer={
            <div className="mvp-card-actions">
              <button type="button" onClick={onDownloadSpace} disabled={busyDownload !== null}>{busyDownload === "space" ? "Downloading..." : "Download document"}</button>
              <button type="button" className="secondary" onClick={onForceSpace} disabled={busyDownload !== null}>{busyDownload === "force" ? "Forcing..." : "Force DOCX generation"}</button>
            </div>
          }>
            <p>Your completed request for LBS Space Planning. Download it, review it, and edit anything before sending.</p>
          </DCard>
        ) : null}

        {unlocked.keyEvent ? (
          <DCard icon={keyEvent.candidate ? "star" : "check"} title="Key Event assessment" kicker="Deterministic check" tone={keyEvent.candidate ? "candidate" : "standard"}>
            <span className={`mvp-keybadge ${keyEvent.candidate ? "red" : "green"}`}>{keyEvent.headline}</span>
            {keyEvent.candidate ? <ul>{(keyEvent.reasons ?? []).map((reason) => <li key={reason}>{reason}</li>)}</ul> : null}
            {!keyEvent.candidate ? <><p>{keyEvent.note}</p><ul>{(keyEvent.checks ?? []).map((check) => <li key={check}>{check}</li>)}</ul></> : null}
            <em>{keyEvent.disclaimer}</em>
          </DCard>
        ) : null}

        {unlocked.eis && keyEvent.candidate ? (
          <DCard icon="shield" title="Event Information Sheet" kicker="Word document · EIS draft" footer={
            <button type="button" onClick={onDownloadEis}>{busyDownload === "eis" ? "Downloading..." : "Download EIS draft"}</button>
          }>
            <p>Draft EIS content is ready for the Key Event candidate route. This MVP downloads the draft directly.</p>
          </DCard>
        ) : null}

        {unlocked.stakeholders ? (
          <DCard icon="users" title="Stakeholders to contact" kicker={`${stakeholders.length} teams · email drafts ready`} footer={<button type="button" onClick={onOpenDrawer}>Open email drafts</button>}>
            <div className="mvp-stake-mini">
              {stakeholders.map((stakeholder) => <div key={stakeholder.id}><span>{stakeholder.name.slice(0, 1)}</span><p><strong>{stakeholder.name}</strong>{stakeholder.why}</p></div>)}
            </div>
          </DCard>
        ) : null}

        {unlocked.extras ? (
          <>
            <Expandable title="Timeline & checklist" kicker={`${timeline.length} planning items`}>
              <div className="mvp-timeline">{timeline.map(([when, what, note]) => <div key={`${when}-${what}`}><span>{when}</span><strong>{what}</strong><p>{note}</p></div>)}</div>
            </Expandable>
            <Expandable title="Captured event details" kicker="27-field grid plus context">
              <div className="mvp-field-grid">{scenario.displayFields.map(([k, v, mark]) => <div key={k}><span>{k}</span><strong>{v}</strong><Smark mark={mark} /></div>)}</div>
            </Expandable>
            <Expandable title="Monday.com summary" kicker="JSON payload">
              <pre className="mvp-json">{JSON.stringify(monday, null, 2)}</pre>
            </Expandable>
          </>
        ) : null}
      </div>
    </aside>
  );
}

function StakeholderDrawer({
  drawer,
  scenario,
  backend,
  onClose,
  onDetail,
  onCopyToast
}: {
  drawer: DrawerState;
  scenario: DemoScenario;
  backend: BackendPostPhase1Result | null;
  onClose: () => void;
  onDetail: (id: string | null) => void;
  onCopyToast: () => void;
}) {
  const stakeholders = stakeholdersFromBackend(scenario, backend);
  const active = stakeholders.find((item) => item.id === drawer.activeId) ?? null;
  const [edits, setEdits] = useState<Record<string, Stakeholder>>({});
  const current = active ? edits[active.id] ?? active : null;

  useEffect(() => {
    if (!drawer.open) return;
    function onKey(event: KeyboardEvent) {
      if (event.key === "Escape") {
        if (drawer.activeId) onDetail(null);
        else onClose();
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [drawer.open, drawer.activeId, onClose, onDetail]);

  if (!drawer.open) return null;

  function setCurrent(key: keyof Stakeholder, value: string) {
    if (!current) return;
    setEdits((state) => ({ ...state, [current.id]: { ...current, [key]: value } }));
  }

  function mailto(stakeholder: Stakeholder) {
    return `mailto:${encodeURIComponent(stakeholder.email)}?subject=${encodeURIComponent(stakeholder.subject)}&body=${encodeURIComponent(stakeholder.body)}`;
  }

  return (
    <div className="mvp-drawer">
      {!current ? (
        <>
          <div className="mvp-drawer-head"><h2>Stakeholder drafts</h2><button type="button" onClick={onClose}>Close</button></div>
          <div className="mvp-drawer-list">
            {stakeholders.map((stakeholder) => (
              <button type="button" key={stakeholder.id} onClick={() => onDetail(stakeholder.id)}>
                <span>{stakeholder.name.slice(0, 1)}</span>
                <strong>{stakeholder.name}<small>{stakeholder.role}</small></strong>
                <em>{stakeholder.why}</em>
                <Icon name="chevron" />
              </button>
            ))}
          </div>
        </>
      ) : (
        <>
          <div className="mvp-drawer-head"><button type="button" onClick={() => onDetail(null)}>Back</button><button type="button" onClick={onClose}>Close</button></div>
          <div className="mvp-email-form">
            <label>To<input value={current.email} onChange={(event) => setCurrent("email", event.target.value)} /></label>
            <label>Subject<input value={current.subject} onChange={(event) => setCurrent("subject", event.target.value)} /></label>
            <label>Body<textarea value={current.body} onChange={(event) => setCurrent("body", event.target.value)} /></label>
            <div className="mvp-card-actions">
              <button type="button" onClick={() => void navigator.clipboard.writeText(`To: ${current.email}\nSubject: ${current.subject}\n\n${current.body}`).then(onCopyToast)}>Copy email</button>
              <a href={mailto(current)}>Open in mail app</a>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

function TweaksPanel({
  open,
  scenario,
  onToggle,
  onScenario,
  onAccent
}: {
  open: boolean;
  scenario: DemoScenario;
  onToggle: () => void;
  onScenario: (scenario: DemoScenario) => void;
  onAccent: (value: string) => void;
}) {
  const swatches = ["#0a2342", "#11457e", "#103a4a", "#28406b", "#6e1f30"];
  return (
    <>
      <button type="button" className="mvp-gear" onClick={onToggle} aria-label="Open tweaks panel"><Icon name="gear" /></button>
      {open ? (
        <div className="mvp-tweaks">
          <strong>Tweaks</strong>
          <fieldset><legend>Scenario</legend>{demoScenarios.map((item) => <label key={item.id}><input type="radio" checked={scenario.id === item.id} onChange={() => onScenario(item)} />{item.label}</label>)}</fieldset>
          <fieldset><legend>Accent colour</legend><div className="mvp-swatches">{swatches.map((color) => <button type="button" key={color} style={{ background: color }} onClick={() => onAccent(color)} aria-label={`Use ${color}`} />)}</div></fieldset>
          <fieldset><legend>Readiness panel layout</legend><label><input type="radio" checked readOnly />Stacked</label><label><input type="radio" disabled />Dossier</label></fieldset>
        </div>
      ) : null}
    </>
  );
}

export function EventReadinessAssistantPage() {
  const { getAccessTokenSilently } = useAuth0();
  const [scenario, setScenario] = useState<DemoScenario>(demoScenarios[0]);
  const [turns, setTurns] = useState<Turn[]>([]);
  const [step, setStep] = useState(0);
  const [typing, setTyping] = useState(false);
  const [composer, setComposer] = useState<ComposerState>({ mode: "scenario" });
  const [input, setInput] = useState("");
  const [unlocked, setUnlocked] = useState<Unlocks>(emptyUnlocks);
  const [drawer, setDrawer] = useState<DrawerState>({ open: false, activeId: null });
  const [toast, setToast] = useState(false);
  const [tweaks, setTweaks] = useState(false);
  const [busyDownload, setBusyDownload] = useState<string | null>(null);
  const [backend, setBackend] = useState<BackendPostPhase1Result | null>(null);
  const [eventRequest, setEventRequest] = useState<EventRequestDraft>(scenario.eventRequest);
  const [freeTranscript, setFreeTranscript] = useState<Array<{ role: "user" | "assistant"; content: string }>>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const phase = useMemo(() => (Object.values(unlocked).some(Boolean) ? "Phase 2 · Readiness" : "Phase 1 · Intake"), [unlocked]);

  function gotoRound(nextStep: number, activeScenario = scenario) {
    const round = activeScenario.script[nextStep];
    if (!round) return;
    setStep(nextStep);
    setComposer(null);
    setTyping(true);
    const textLength = round.blocks.map((block) => ("text" in block ? block.text.length : 100)).join("").length;
    window.setTimeout(() => {
      setTyping(false);
      setTurns((current) => [...current, { role: "assistant", blocks: round.blocks }]);
      setComposer(round.replies ?? null);
      if (round.finish) void unlockReadiness(activeScenario);
      if (round.auto) window.setTimeout(() => gotoRound(nextStep + 1, activeScenario), round.autoDelay ?? 2600);
    }, Math.min(1500, 600 + textLength * 1.1));
  }

  function reset(nextScenario = scenario) {
    setScenario(nextScenario);
    setTurns([]);
    setStep(0);
    setTyping(false);
    setComposer({ mode: "scenario" });
    setInput("");
    setUnlocked(emptyUnlocks);
    setDrawer({ open: false, activeId: null });
    setBackend(null);
    setEventRequest(nextScenario.eventRequest);
    setFreeTranscript([]);
    window.localStorage.removeItem(`era-mvp-${nextScenario.id}`);
  }

  function startScenario(nextScenario: DemoScenario) {
    reset(nextScenario);
    window.setTimeout(() => gotoRound(0, nextScenario), 150);
  }

  function reply(text: string, echo?: string) {
    setTurns((current) => [...current, { role: "user", text: echo ?? text }]);
    gotoRound(step + 1);
  }

  async function freeText() {
    const message = input.trim();
    if (!message) return;
    setInput("");
    setComposer(null);
    setTurns((current) => [...current, { role: "user", text: message }]);
    setFreeTranscript((current) => [...current, { role: "user", content: message }]);
    setTyping(true);
    try {
      const token = await getAccessTokenSilently();
      const result = await sendEventReadinessTurn(token, message, freeTranscript, eventRequest);
      setTyping(false);
      setEventRequest(result.event_request);
      setTurns((current) => [...current, { role: "assistant", blocks: [{ t: "lead", text: result.assistant_message }] }]);
      setFreeTranscript((current) => [...current, { role: "assistant", content: result.assistant_message }]);
      setComposer({ mode: "single", options: [{ text: "Generate the readiness pack", primary: true }] });
      if (result.coverage?.phase_1_ready) void unlockReadiness(scenario, result.event_request);
    } catch (error) {
      setTyping(false);
      setTurns((current) => [...current, { role: "assistant", blocks: [{ t: "lead", text: "I could not reach the backend chat, so I will keep the local demo flow available." }, { t: "p", text: error instanceof Error ? error.message : String(error) }] }]);
      setComposer(scenario.script[step]?.replies ?? { mode: "scenario" });
    }
  }

  async function unlockReadiness(activeScenario = scenario, draft = activeScenario.eventRequest) {
    setEventRequest(draft);
    try {
      const token = await getAccessTokenSilently();
      const result = await runPostPhase1(token, activeScenario.id === "keyEvent" ? "vip-public-leader-event" : "alumni-networking-reception", draft);
      setBackend(result);
    } catch {
      setBackend(null);
    }
    const sequence: Array<keyof Unlocks> = activeScenario.keyEvent.candidate
      ? ["space", "keyEvent", "eis", "stakeholders", "extras"]
      : ["space", "keyEvent", "stakeholders", "extras"];
    sequence.forEach((key, index) => window.setTimeout(() => setUnlocked((current) => ({ ...current, [key]: true })), 520 * (index + 1)));
  }

  async function downloadSpace(force = false) {
    setBusyDownload(force ? "force" : "space");
    try {
      const token = await getAccessTokenSilently();
      const blob = await downloadSpaceRequestDocx(token, eventRequest);
      triggerBlobDownload(blob, force ? "lbs-space-request-forced.docx" : "lbs-space-request-draft.docx");
    } finally {
      setBusyDownload(null);
    }
  }

  function downloadEis() {
    setBusyDownload("eis");
    const keyEvent = keyInfoFromBackend(scenario, backend);
    const text = backend?.eis?.markdown ?? [
      "# Event Information Sheet draft",
      "",
      `Event: ${String(eventRequest.fields.event_title ?? "")}`,
      `Organiser: ${String(eventRequest.fields.organiser_name ?? "")}`,
      `Assessment: ${keyEvent.headline}`,
      "",
      "## Reasons",
      ...(keyEvent.reasons ?? []).map((reason) => `- ${reason}`),
      "",
      "## Stakeholders",
      ...stakeholdersFromBackend(scenario, backend).map((stakeholder) => `- ${stakeholder.name}: ${stakeholder.why}`),
      "",
      "## Outstanding items",
      "- Confirm any fields marked needs confirmation before submission."
    ].join("\n");
    triggerTextDownload(text, "lbs-event-information-sheet-draft.md", "text/markdown;charset=utf-8");
    window.setTimeout(() => setBusyDownload(null), 200);
  }

  function setAccent(color: string) {
    document.documentElement.style.setProperty("--mvp-accent", color);
    document.documentElement.style.setProperty("--mvp-accent-700", `color-mix(in srgb, ${color}, black 28%)`);
    document.documentElement.style.setProperty("--mvp-accent-600", `color-mix(in srgb, ${color}, white 18%)`);
  }

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [turns, typing]);

  useEffect(() => {
    if (!toast) return;
    const timeout = window.setTimeout(() => setToast(false), 1700);
    return () => window.clearTimeout(timeout);
  }, [toast]);

  return (
    <div className="mvp-app">
      <Topbar scenario={scenario} phase={phase} onRestart={() => reset()} />
      <div className="mvp-body">
        <main className="mvp-chat-col">
          <div className="mvp-chat-scroll" ref={scrollRef}>
            <div className="mvp-chat-inner">
              {turns.length === 0 ? (
                <div className="mvp-message assistant">
                  <div className="mvp-avatar">E</div>
                  <div className="mvp-bubble">
                    <p className="mvp-lead">Choose a demo scenario or type your own event idea.</p>
                    <p>The two scripted flows are complete for Monday's MVP, and free text is wired to the existing backend chat.</p>
                  </div>
                </div>
              ) : null}
              {turns.map((turn, index) => <Message key={index} turn={turn} />)}
              {typing ? <Typing /> : null}
            </div>
          </div>
          <Composer
            composer={composer}
            scenarios={demoScenarios}
            selectedScenario={scenario}
            input={input}
            busy={typing}
            onInput={setInput}
            onScenario={startScenario}
            onReply={reply}
            onFreeText={() => void freeText()}
            onRestart={() => reset()}
          />
        </main>
        <ReadinessRail
          scenario={scenario}
          unlocked={unlocked}
          backend={backend}
          busyDownload={busyDownload}
          onDownloadSpace={() => void downloadSpace(false)}
          onForceSpace={() => void downloadSpace(true)}
          onDownloadEis={downloadEis}
          onOpenDrawer={() => setDrawer({ open: true, activeId: null })}
        />
      </div>
      <StakeholderDrawer
        drawer={drawer}
        scenario={scenario}
        backend={backend}
        onClose={() => setDrawer({ open: false, activeId: null })}
        onDetail={(activeId) => setDrawer((current) => ({ ...current, activeId }))}
        onCopyToast={() => setToast(true)}
      />
      <TweaksPanel open={tweaks} scenario={scenario} onToggle={() => setTweaks((value) => !value)} onScenario={reset} onAccent={setAccent} />
      {toast ? <div className="mvp-toast">Copied</div> : null}
    </div>
  );
}
