import type { Request, Response } from "express";
import { Router } from "express";
import { requireAdminUser, requireAuth, requireNormalUser } from "../auth/auth0.js";
import { config } from "../config/env.js";
import {
  mondayPayloadRequestSchema,
  routingRequestSchema,
  tieringRequestSchema
} from "../schemas/ws4.js";
import { buildMondayMockPayload } from "../services/mondayPayloadService.js";
import { openAiStatus } from "../services/openai.js";
import { buildStakeholderPackets } from "../services/routingService.js";
import { classifyEventTier, TieringServiceError } from "../services/tieringService.js";

export const apiRouter = Router();

apiRouter.get("/health", (_req, res) => {
  res.json({
    status: "ok",
    service: "lbs-genai-api",
    timestamp: new Date().toISOString()
  });
});

apiRouter.get("/me", requireAuth, (req, res) => {
  res.json({
    subject: req.auth?.subject,
    permissions: req.auth?.permissions ?? []
  });
});

apiRouter.get("/normal/check", requireNormalUser, (_req: Request, res: Response) => {
  res.json({
    ok: true,
    allowedPermissions: [config.permissions.normal, config.permissions.admin]
  });
});

apiRouter.get("/admin/check", requireAdminUser, (_req: Request, res: Response) => {
  res.json({
    ok: true,
    requiredPermission: config.permissions.admin
  });
});

apiRouter.get("/ai/status", requireNormalUser, (_req: Request, res: Response) => {
  res.json(openAiStatus());
});

apiRouter.post("/tiering/classify", requireNormalUser, async (req: Request, res: Response) => {
  const parsed = tieringRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid tiering request", details: parsed.error.flatten() });
    return;
  }

  try {
    const result = await classifyEventTier(parsed.data.event_request);
    res.json(result);
  } catch (error) {
    if (error instanceof TieringServiceError) {
      res.status(error.code === "invalid_ai_response" ? 502 : 503).json({ error: error.message });
      return;
    }
    throw error;
  }
});

apiRouter.post("/routing/stakeholder-packets", requireNormalUser, (req: Request, res: Response) => {
  const parsed = routingRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid stakeholder packet request", details: parsed.error.flatten() });
    return;
  }

  res.json(buildStakeholderPackets(parsed.data.event_request, parsed.data.classification));
});

apiRouter.post("/integrations/monday/build-payload", requireNormalUser, (req: Request, res: Response) => {
  const parsed = mondayPayloadRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid Monday mock payload request", details: parsed.error.flatten() });
    return;
  }

  res.json(
    buildMondayMockPayload(
      parsed.data.event_request,
      parsed.data.classification,
      parsed.data.stakeholder_packets
    )
  );
});
