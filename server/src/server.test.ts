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
