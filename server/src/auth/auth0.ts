import type { NextFunction, Request, RequestHandler, Response } from "express";
import { createRemoteJWKSet, jwtVerify } from "jose";
import { config } from "../config/env.js";

export type AuthenticatedUser = {
  subject: string;
  permissions: string[];
};

declare module "express-serve-static-core" {
  interface Request {
    auth?: AuthenticatedUser;
  }
}

const jwks = createRemoteJWKSet(new URL(".well-known/jwks.json", config.auth0IssuerBaseUrl));

function getBearerToken(req: Request) {
  const header = req.headers.authorization;
  if (!header?.startsWith("Bearer ")) return null;
  return header.slice("Bearer ".length);
}

export async function requireAuth(req: Request, res: Response, next: NextFunction) {
  try {
    const token = getBearerToken(req);
    if (!token) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    const { payload } = await jwtVerify(token, jwks, {
      issuer: config.auth0IssuerBaseUrl,
      audience: config.auth0Audience
    });

    req.auth = {
      subject: payload.sub || "",
      permissions: Array.isArray(payload.permissions) ? payload.permissions.filter((p): p is string => typeof p === "string") : []
    };

    next();
  } catch {
    res.status(401).json({ error: "Invalid or expired access token" });
  }
}

export function requirePermission(permission: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.auth) {
      res.status(401).json({ error: "Authentication required" });
      return;
    }

    if (!req.auth.permissions.includes(permission)) {
      res.status(403).json({ error: "Required permission is missing" });
      return;
    }

    next();
  };
}

export const requireNormalUser: RequestHandler[] = [
  requireAuth,
  (req: Request, res: Response, next: NextFunction) => {
    const allowed = [config.permissions.normal, config.permissions.admin];
    if (!req.auth?.permissions.some((permission) => allowed.includes(permission))) {
      res.status(403).json({ error: "Normal user permission is required" });
      return;
    }
    next();
  }
];

export const requireAdminUser: RequestHandler[] = [requireAuth, requirePermission(config.permissions.admin)];
