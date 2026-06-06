import { describe, expect, it } from "vitest";
import request from "supertest";
import { createServer } from "./server.js";

describe("api health", () => {
  it("returns a healthy response", async () => {
    const response = await request(createServer()).get("/api/health");
    expect(response.status).toBe(200);
    expect(response.body.status).toBe("ok");
  });
});

describe("ws4 route auth", () => {
  it("requires auth for tiering classification", async () => {
    const response = await request(createServer()).post("/api/tiering/classify").send({});
    expect(response.status).toBe(401);
  });

  it("requires auth for stakeholder packets", async () => {
    const response = await request(createServer()).post("/api/routing/stakeholder-packets").send({});
    expect(response.status).toBe(401);
  });

  it("requires auth for Monday mock payloads", async () => {
    const response = await request(createServer()).post("/api/integrations/monday/build-payload").send({});
    expect(response.status).toBe(401);
  });
});

describe("event readiness route auth", () => {
  it("requires auth for bootstrap metadata", async () => {
    const response = await request(createServer()).get("/api/event-readiness/bootstrap");
    expect(response.status).toBe(401);
  });

  it("requires auth for EventRequest evaluation", async () => {
    const response = await request(createServer()).post("/api/event-readiness/event-request/evaluate").send({});
    expect(response.status).toBe(401);
  });

  it("requires auth for Event Readiness chat", async () => {
    const response = await request(createServer()).post("/api/event-readiness/chat").send({
      message: "I want to run a panel."
    });
    expect(response.status).toBe(401);
  });

  it("requires auth for loading persisted Event Readiness drafts", async () => {
    const response = await request(createServer()).get("/api/event-readiness/session-draft");
    expect(response.status).toBe(401);
  });

  it("requires auth for saving persisted Event Readiness drafts", async () => {
    const response = await request(createServer()).post("/api/event-readiness/session-draft").send({
      event_request: { fields: {}, field_status: {} },
      email_edits: {}
    });
    expect(response.status).toBe(401);
  });

  it("requires auth for Space Request DOCX generation", async () => {
    const response = await request(createServer()).post("/api/event-readiness/space-request-docx").send({
      event_request: { fields: {}, field_status: {} }
    });
    expect(response.status).toBe(401);
  });

  it("requires auth for EIS DOCX generation", async () => {
    const response = await request(createServer()).post("/api/event-readiness/eis-docx").send({
      event_request: { fields: {}, field_status: {} }
    });
    expect(response.status).toBe(401);
  });

  it("requires auth for post-Phase-1 bootstrap", async () => {
    const response = await request(createServer()).get("/api/event-readiness/post-phase1/bootstrap");
    expect(response.status).toBe(401);
  });

  it("requires auth for post-Phase-1 orchestration", async () => {
    const response = await request(createServer()).post("/api/event-readiness/post-phase1/run").send({
      event_request: { fields: {}, field_status: {} }
    });
    expect(response.status).toBe(401);
  });
});
