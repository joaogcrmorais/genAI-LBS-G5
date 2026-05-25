import type { Request, Response } from "express";
import { Router } from "express";
import { requireAdminUser, requireAuth, requireNormalUser } from "../auth/auth0.js";
import { config } from "../config/env.js";
import { openAiStatus } from "../services/openai.js";

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
