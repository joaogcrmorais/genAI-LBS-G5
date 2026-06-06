import type { Request, Response } from "express";
import { Router } from "express";
import { requireAdminUser, requireAuth, requireNormalUser } from "../auth/auth0.js";
import { config } from "../config/env.js";
import {
  mondayPayloadRequestSchema,
  routingRequestSchema,
  tieringRequestSchema
} from "../schemas/ws4.js";
import {
  eventReadinessChatRequestSchema,
  eventReadinessDraftSaveRequestSchema,
  eventReadinessEventRequestSchema,
  eventReadinessEvaluateRequestSchema
} from "../schemas/eventReadiness.js";
import { postPhase1RunRequestSchema } from "../schemas/postPhase1.js";
import {
  continueEventReadinessChat,
  EventReadinessChatError
} from "../services/eventReadinessChatService.js";
import {
  evaluateEventReadiness,
  getEventReadinessBootstrap
} from "../services/eventReadinessService.js";
import { buildMondayMockPayload } from "../services/mondayPayloadService.js";
import { openAiStatus } from "../services/openai.js";
import {
  getPostPhase1Bootstrap,
  runPostPhase1Flow
} from "../services/postPhase1OrchestrationService.js";
import { getPostPhase1Fixtures } from "../services/postPhase1DataService.js";
import { buildStakeholderPackets } from "../services/routingService.js";
import { buildEisDocx } from "../services/eisDocxService.js";
import {
  loadEventReadinessDraft,
  saveEventReadinessDraft
} from "../services/eventReadinessDraftStore.js";
import { buildSpaceRequestDocx } from "../services/spaceRequestDocxService.js";
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

apiRouter.get("/event-readiness/bootstrap", requireNormalUser, (_req: Request, res: Response) => {
  res.json(getEventReadinessBootstrap());
});

apiRouter.post("/event-readiness/event-request/evaluate", requireNormalUser, (req: Request, res: Response) => {
  const parsed = eventReadinessEvaluateRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid Event Readiness request", details: parsed.error.flatten() });
    return;
  }

  res.json(evaluateEventReadiness(parsed.data));
});

apiRouter.post("/event-readiness/chat", requireNormalUser, async (req: Request, res: Response) => {
  const parsed = eventReadinessChatRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid Event Readiness chat request", details: parsed.error.flatten() });
    return;
  }

  try {
    res.json(await continueEventReadinessChat(parsed.data));
  } catch (error) {
    if (error instanceof EventReadinessChatError) {
      res.status(error.code === "invalid_ai_response" ? 502 : 503).json({ error: error.message });
      return;
    }
    throw error;
  }
});

apiRouter.get("/event-readiness/session-draft", requireNormalUser, async (req: Request, res: Response) => {
  const ownerSubject = req.auth?.subject;
  if (!ownerSubject) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  res.json(await loadEventReadinessDraft(ownerSubject, typeof req.query.draft_key === "string" ? req.query.draft_key : undefined));
});

apiRouter.post("/event-readiness/session-draft", requireNormalUser, async (req: Request, res: Response) => {
  const ownerSubject = req.auth?.subject;
  if (!ownerSubject) {
    res.status(401).json({ error: "Authentication required" });
    return;
  }

  const parsed = eventReadinessDraftSaveRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid Event Readiness draft save request", details: parsed.error.flatten() });
    return;
  }

  res.json(await saveEventReadinessDraft(ownerSubject, parsed.data));
});

apiRouter.post("/event-readiness/space-request-docx", requireNormalUser, async (req: Request, res: Response) => {
  const parsed = eventReadinessEventRequestSchema.safeParse(req.body?.event_request);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid EventRequest for Space Request DOCX", details: parsed.error.flatten() });
    return;
  }

  const docx = await buildSpaceRequestDocx(parsed.data);
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  res.setHeader("Content-Disposition", 'attachment; filename="lbs-space-request-draft.docx"');
  res.send(docx);
});

apiRouter.post("/event-readiness/eis-docx", requireNormalUser, async (req: Request, res: Response) => {
  const parsed = eventReadinessEventRequestSchema.safeParse(req.body?.event_request);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid EventRequest for EIS DOCX", details: parsed.error.flatten() });
    return;
  }

  const docx = await buildEisDocx(parsed.data);
  res.setHeader("Content-Type", "application/vnd.openxmlformats-officedocument.wordprocessingml.document");
  res.setHeader("Content-Disposition", 'attachment; filename="lbs-event-information-sheet-draft.docx"');
  res.send(docx);
});

apiRouter.get("/event-readiness/post-phase1/bootstrap", requireNormalUser, (_req: Request, res: Response) => {
  res.json(getPostPhase1Bootstrap());
});

apiRouter.post("/event-readiness/post-phase1/run", requireNormalUser, async (req: Request, res: Response) => {
  const parsed = postPhase1RunRequestSchema.safeParse(req.body);
  if (!parsed.success) {
    res.status(400).json({ error: "Invalid post-Phase-1 request", details: parsed.error.flatten() });
    return;
  }

  const expected = parsed.data.scenario_id
    ? getPostPhase1Fixtures().find((fixture) => fixture.id === parsed.data.scenario_id)?.expected
    : undefined;
  res.json(await runPostPhase1Flow(parsed.data.event_request, parsed.data.options, expected));
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
