import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { config } from "./config/env.js";
import { errorHandler, notFoundHandler } from "./middleware/errorHandler.js";
import { apiRouter } from "./routes/api.js";

export function createServer() {
  const app = express();

  app.use(helmet());
  app.use(cors({ origin: config.clientOrigin, credentials: false }));
  app.use(express.json({ limit: "1mb" }));
  app.use(morgan("dev"));

  app.use("/api", apiRouter);
  app.use(notFoundHandler);
  app.use(errorHandler);

  return app;
}
