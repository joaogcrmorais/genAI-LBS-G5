import { apiPost, apiPostBlob } from "./api";
import type { BackendPostPhase1Result, EventRequestDraft } from "../types/eventReadinessMvp";

export type ChatTurnResult = {
  assistant_message: string;
  event_request: EventRequestDraft;
  coverage?: { phase_1_ready: boolean };
  key_event_assessment?: unknown;
};

export async function sendEventReadinessTurn(
  token: string,
  message: string,
  transcript: Array<{ role: "user" | "assistant"; content: string }>,
  eventRequest: EventRequestDraft
) {
  return apiPost<ChatTurnResult>(
    "/api/event-readiness/chat",
    {
      message,
      transcript,
      event_request: eventRequest
    },
    token
  );
}

export async function runPostPhase1(
  token: string,
  scenarioId: string | undefined,
  eventRequest: EventRequestDraft
) {
  return apiPost<BackendPostPhase1Result>(
    "/api/event-readiness/post-phase1/run",
    {
      scenario_id: scenarioId,
      event_request: eventRequest,
      options: { run_ai_risk: false }
    },
    token
  );
}

export async function downloadSpaceRequestDocx(token: string, eventRequest: EventRequestDraft) {
  return apiPostBlob("/api/event-readiness/space-request-docx", { event_request: eventRequest }, token);
}

export function triggerBlobDownload(blob: Blob, filename: string) {
  const url = window.URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.URL.revokeObjectURL(url);
}

export function triggerTextDownload(text: string, filename: string, type = "text/plain;charset=utf-8") {
  triggerBlobDownload(new Blob([text], { type }), filename);
}
