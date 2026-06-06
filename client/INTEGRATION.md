# Event Readiness Assistant frontend integration

## Frontend stack

- Existing project frontend is Vite + React + TypeScript on `http://localhost:3000`.
- The MVP app is served at `/` and `/event-readiness-mvp` behind the existing Auth0 `user_normal` / `user_admin` route guard.
- No backend code was changed.

## Backend endpoints used

### `POST /api/event-readiness/chat`

Request:

```json
{
  "message": "string",
  "transcript": [{ "role": "user | assistant", "content": "string" }],
  "event_request": {
    "fields": {},
    "field_status": {},
    "additional_context": []
  }
}
```

Response used by the frontend:

```json
{
  "assistant_message": "string",
  "event_request": { "fields": {}, "field_status": {} },
  "coverage": { "phase_1_ready": true }
}
```

Status: real backend. Used for free-form chat input at any point. If the call fails, the UI falls back to the scripted demo flow and shows the backend error in the chat.

### `POST /api/event-readiness/post-phase1/run`

Request:

```json
{
  "scenario_id": "vip-public-leader-event | alumni-networking-reception | undefined",
  "event_request": { "fields": {}, "field_status": {} },
  "options": { "run_ai_risk": false }
}
```

Response used by the frontend:

```json
{
  "key_event": {},
  "eis": { "required": true, "markdown": "string" },
  "routing": { "stakeholders": [] },
  "email_drafts": [],
  "timeline": { "items": [] },
  "monday_mock": {}
}
```

Status: real deterministic backend. Used after the readiness pack is generated. Local scenario content remains as a fallback if the endpoint is unavailable.

### `POST /api/event-readiness/space-request-docx`

Request:

```json
{
  "event_request": { "fields": {}, "field_status": {} }
}
```

Response:

```text
application/vnd.openxmlformats-officedocument.wordprocessingml.document
```

Status: real backend. Used by both the normal Space Request download button and the failsafe Force DOCX generation button.

## Stubbed or local-only features

- The two polished demo scenario scripts are local frontend data so the Monday MVP can run predictably even if OpenAI is slow or unavailable.
- EIS download uses backend markdown when available and downloads a `.md` draft, because there is no EIS DOCX endpoint yet.
- Stakeholder email editing is browser-local state only.
- Accent colour and scenario selection are local UI controls.
- Dossier rail layout is shown as disabled; stacked layout is implemented.
