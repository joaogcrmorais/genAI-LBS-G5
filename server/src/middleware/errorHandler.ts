import type { ErrorRequestHandler, RequestHandler } from "express";

export const notFoundHandler: RequestHandler = (_req, res) => {
  res.status(404).json({ error: "Route not found" });
};

export const errorHandler: ErrorRequestHandler = (error, _req, res, _next) => {
  console.error(error instanceof Error ? error.message : "Unknown server error");
  res.status(500).json({ error: "Unexpected server error" });
};
