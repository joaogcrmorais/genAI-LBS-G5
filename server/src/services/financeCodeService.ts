import fs from "node:fs";
import path from "node:path";
import type { EventReadinessEventRequest } from "../schemas/eventReadiness.js";

export type FinanceCodeMatch = {
  finance_code: string;
  club_name: string;
  event_name: string;
  academic_year: string;
};

type FinanceRecord = FinanceCodeMatch & {
  key: string;
};

function getRepoRoot() {
  const candidates = [process.cwd(), path.resolve(process.cwd(), "..")];
  const repoRoot = candidates.find((candidate) => fs.existsSync(path.join(candidate, "lbs-files", "processed")));
  if (!repoRoot) {
    throw new Error("Could not locate lbs-files/processed from the current working directory.");
  }
  return repoRoot;
}

function readFinanceRecords() {
  const filePath = path.resolve(getRepoRoot(), "lbs-files", "processed", "finance", "finance_lookup_index.json");
  return JSON.parse(fs.readFileSync(filePath, "utf8").replace(/^\uFEFF/, "")) as FinanceRecord[];
}

export function normaliseFinanceText(value: unknown) {
  return typeof value === "string" ? value.trim().toLowerCase() : String(value ?? "").trim().toLowerCase();
}

export function hasFinanceSignal(text: string) {
  return /\b(budget|cost|spend|paid|invoice|finance|treasury|gbp|pounds?|ticketing|tickets?|sponsorship|sponsor|catering|alcohol|beer|wine|cost center|cost centre)\b|\u00a3/.test(
    text.toLowerCase()
  );
}

export function extractExplicitFinanceCode(text: string) {
  const match = text.match(
    /\b(?:finance|cost\s+cent(?:er|re)|budget)\s+(?:code|number|no\.?)\s*(?:is|:|#|-)?\s*([a-z0-9][a-z0-9_-]{2,})\b/i
  );
  const candidate = match?.[1]?.trim();
  if (
    !candidate ||
    ["was", "not", "none", "missing", "provided", "unknown", "for", "this", "event", "has"].includes(
      candidate.toLowerCase()
    )
  ) {
    return undefined;
  }
  return candidate;
}

function looksLikeFinanceCode(value: string) {
  const text = value.trim();
  const words = text.toLowerCase().split(/[^a-z0-9]+|_/).filter(Boolean);
  if (!text) return false;
  if (words.some((word) => ["no", "not", "none", "missing", "unknown", "need", "needs", "provided", "confirmation", "treasurer", "contact"].includes(word))) {
    return false;
  }
  return /^[a-z0-9][a-z0-9_-]{2,}$/i.test(text);
}

function tokenise(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, " ")
    .split(/[^a-z0-9]+/)
    .map((token) => token.trim())
    .filter((token) => token.length >= 3 && !["club", "event", "society"].includes(token));
}

function eventFinanceText(eventRequest: EventReadinessEventRequest, prompt = "") {
  return [
    prompt,
    eventRequest.financeCode,
    eventRequest.fields.finance_code,
    eventRequest.fields.club_or_programme_affiliation,
    eventRequest.fields.event_title,
    eventRequest.fields.event_type,
    eventRequest.fields.event_details,
    eventRequest.fields.catering,
    eventRequest.fields.alcohol,
    eventRequest.fields.additional_information
  ]
    .map((part) => String(part ?? ""))
    .join(" ");
}

export function lookupFinanceCodes(eventRequest: EventReadinessEventRequest, prompt = ""): FinanceCodeMatch[] {
  const text = eventFinanceText(eventRequest, prompt);
  const tokens = new Set(tokenise(text));
  const clubTokens = new Set(tokenise(String(eventRequest.fields.club_or_programme_affiliation ?? "")));
  if (tokens.size === 0) return [];
  if (clubTokens.size === 0) return [];

  return readFinanceRecords()
    .map((record) => {
      const recordClubTokens = tokenise(record.club_name);
      const hasClubMatch = recordClubTokens.some((token) => clubTokens.has(token));
      const recordTokens = tokenise(`${record.club_name} ${record.event_name} ${record.key}`);
      const score = recordTokens.filter((token) => tokens.has(token)).length;
      return { ...record, hasClubMatch, score };
    })
    .filter((record) => record.hasClubMatch && record.score >= 2 && record.finance_code !== "EVENT")
    .sort((a, b) => b.score - a.score)
    .slice(0, 3)
    .map(({ score: _score, key: _key, hasClubMatch: _hasClubMatch, ...record }) => record);
}

export function deriveFinanceCode(eventRequest: EventReadinessEventRequest, prompt = "") {
  const existing = String(eventRequest.financeCode ?? eventRequest.fields.finance_code ?? "").trim();
  if (existing && looksLikeFinanceCode(existing)) return existing;
  const financeText = eventFinanceText(eventRequest, prompt);
  const explicitFinanceCode = extractExplicitFinanceCode(financeText);
  if (explicitFinanceCode) return explicitFinanceCode;
  if (!hasFinanceSignal(financeText)) return undefined;
  return lookupFinanceCodes(eventRequest, prompt)[0]?.finance_code;
}

export function normaliseEventRequestFinanceCode(eventRequest: EventReadinessEventRequest, prompt = ""): EventReadinessEventRequest {
  const financeCode = deriveFinanceCode(eventRequest, prompt);
  const next: EventReadinessEventRequest = {
    ...eventRequest,
    fields: { ...eventRequest.fields },
    field_status: { ...eventRequest.field_status }
  };

  if (financeCode) {
    next.financeCode = financeCode;
    next.fields.finance_code = financeCode;
    next.field_status.finance_code = next.field_status.finance_code ?? "final";
  }

  return next;
}
