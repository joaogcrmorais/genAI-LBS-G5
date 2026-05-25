import OpenAI from "openai";
import { config } from "../config/env.js";

let client: OpenAI | null = null;

export function getOpenAiClient() {
  if (!config.openAiApiKey) {
    throw new Error("OPENAI_API_KEY is not configured on the backend.");
  }

  client ??= new OpenAI({ apiKey: config.openAiApiKey });
  return client;
}

export function openAiStatus() {
  return {
    configured: Boolean(config.openAiApiKey),
    boundary: "backend-only"
  };
}
