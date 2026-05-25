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
