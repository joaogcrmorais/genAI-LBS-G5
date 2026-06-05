import { describe, expect, it } from "vitest";
import { getSpaceRequestFields } from "./eventReadinessService.js";
import { classifyComplexityRisk } from "./complexityRiskService.js";
import { buildPostPhase1Coverage, getPostPhase1Fixtures } from "./postPhase1DataService.js";
import { assessPostPhase1KeyEvent } from "./postPhase1KeyEventService.js";
import {
  getPostPhase1StakeholderDirectory,
  routePostPhase1Stakeholders
} from "./postPhase1StakeholderService.js";
import { buildStakeholderEmailDrafts } from "./stakeholderEmailDraftService.js";
import { runPostPhase1Flow } from "./postPhase1OrchestrationService.js";

describe("post-Phase-1 fixtures", () => {
  it("cover every official CribSheet field without missing status", () => {
    const fields = getSpaceRequestFields();
    const fieldKeys = fields.map((field) => field.key);

    for (const fixture of getPostPhase1Fixtures()) {
      const keys = Object.keys(fixture.event_request.fields);
      const statuses = fixture.event_request.field_status;
      expect(keys.sort()).toEqual(fieldKeys.sort());
      expect(Object.keys(statuses).sort()).toEqual(fieldKeys.sort());
      expect(Object.values(statuses)).not.toContain("missing");

      const coverage = buildPostPhase1Coverage(fixture.event_request);
      expect(coverage.total_fields).toBe(27);
      expect(coverage.phase_1_ready).toBe(true);
    }
  });

  it("matches deterministic Key Event expectations for all fixtures", () => {
    for (const fixture of getPostPhase1Fixtures()) {
      const keyEvent = assessPostPhase1KeyEvent(fixture.event_request);
      expect(keyEvent.key_event_candidate).toBe(fixture.expected.key_event_candidate);
      if (fixture.expected.key_event_trigger) {
        expect(keyEvent.trigger_type).toBe(fixture.expected.key_event_trigger);
      }
    }
  });
});

describe("post-Phase-1 stakeholder routing and drafts", () => {
  it("uses converted real stakeholder contacts", () => {
    const directory = getPostPhase1StakeholderDirectory();

    expect(directory).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ name: "Space Management", email: "space@london.edu" }),
        expect.objectContaining({ name: "Catering Team", email: "cateringevents@london.edu" }),
        expect.objectContaining({ name: "Security Team", email: "speakersandguests@london.edu" }),
        expect.objectContaining({ name: "AV Team", email: "avhelp@london.edu" }),
        expect.objectContaining({ name: "Duty Managers", email: "dutymanagers@london.edu" })
      ])
    );
  });

  it("routes expected stakeholders and creates one editable email draft per route", () => {
    for (const fixture of getPostPhase1Fixtures()) {
      const keyEvent = assessPostPhase1KeyEvent(fixture.event_request);
      const routing = routePostPhase1Stakeholders(fixture.event_request, keyEvent);
      const routedNames = routing.stakeholders.map((stakeholder) => stakeholder.name);

      expect(routedNames).toEqual(expect.arrayContaining(fixture.expected.stakeholders));

      const emailDrafts = buildStakeholderEmailDrafts(fixture.event_request, routing.stakeholders, keyEvent);
      expect(emailDrafts).toHaveLength(routing.stakeholders.length);
      expect(emailDrafts.every((draft) => draft.mock_notice.includes("no form, email, Monday item"))).toBe(true);
      expect(emailDrafts.every((draft) => draft.subject.includes(String(fixture.event_request.fields.event_title)))).toBe(true);
    }
  });
});

describe("post-Phase-1 complexity/risk", () => {
  it("returns a schema-valid deterministic fallback when AI risk is skipped", async () => {
    const fixture = getPostPhase1Fixtures().find((item) => item.id === "vip-public-leader-event");
    expect(fixture).toBeDefined();
    const eventRequest = fixture!.event_request;
    const keyEvent = assessPostPhase1KeyEvent(eventRequest);
    const routing = routePostPhase1Stakeholders(eventRequest, keyEvent);

    const risk = await classifyComplexityRisk(eventRequest, keyEvent, routing.stakeholders, false);

    expect(risk.status).toBe("skipped");
    expect(risk.suggested_complexity).toBe("high");
    expect(risk.risk_flags).toContain("key_event_candidate");
  });
});

describe("post-Phase-1 orchestration", () => {
  it("runs deterministic outputs end to end", async () => {
    const fixture = getPostPhase1Fixtures().find((item) => item.id === "multi-room-external-workshop");
    expect(fixture).toBeDefined();

    const result = await runPostPhase1Flow(fixture!.event_request, { run_ai_risk: false }, fixture!.expected);

    expect(result.key_event.key_event_candidate).toBe(true);
    expect(result.eis.required).toBe(true);
    expect(result.routing.stakeholders.map((stakeholder) => stakeholder.name)).toContain("Catering Team");
    expect(result.email_drafts).toHaveLength(result.routing.stakeholders.length);
    expect(result.timeline.items.length).toBeGreaterThan(0);
    expect(result.monday_mock.integration_status).toBe("mock_payload_ready");
    expect(result.qa.fail_count).toBe(0);
  });
});
