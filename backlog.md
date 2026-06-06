# Backlog - Event Readiness Assistant frontend

## P0 - required to be production-usable
- [ ] Add a real EIS `.docx` download endpoint and wire the EIS card to it; current MVP downloads backend markdown because only Space Request DOCX exists.
- [ ] Replace local demo-script turns with a fully backend-driven conversation once `/api/event-readiness/chat` can return structured assistant blocks, quick replies, and readiness unlock signals for every turn.
- [ ] Align backend post-Phase-1 scenario IDs with the two Monday demo scenarios so the deterministic result exactly matches the scripted FinTech CEO and Wine Society flows.

## P1 - strongly wanted
- [ ] Persist EventRequest drafts and edited stakeholder emails server-side per organiser; current MVP keeps edits in browser state.
- [ ] Add document preview for Space Request and EIS after the demo; current MVP is download-only by design.
- [ ] Return backend-generated stakeholder email drafts for the exact routed demo teams; current UI falls back to local templates when backend names differ.
- [ ] Add a mobile readiness panel toggle below 1060px; current narrow layout hides the rail to protect the chat flow.

## P2 - polish / nice-to-have
- [ ] Build the Dossier readiness-panel variant; stacked cards are implemented and default.
- [ ] Replace placeholder contact inboxes with confirmed LBS team routing addresses or contact notes.
- [ ] Add reducer unit tests for scripted flow progression and unlock sequencing.

## Open questions for the team
- Should the Monday demo run with real backend chat enabled, or force local scripted flow for timing reliability?
- What file type should EIS use in production: DOCX, PDF, or both?
- Which exact LBS stakeholder addresses are approved for generated email drafts?
