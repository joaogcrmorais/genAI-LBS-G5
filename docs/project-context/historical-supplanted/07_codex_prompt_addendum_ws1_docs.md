# Codex Prompt Addendum: New WS1 Business Logic Documents

Paste this after the existing prompt, or after Codex has created/read its initial `lbs-files/PLAN.md`.

```md
Additional important update: I have received two new WS1 business-logic documents that supersede or sharpen parts of the earlier product understanding.

These files have been added to the repo under `lbs-files/raw/` or will be added there now:

- `Event Readiness Assistant - Phase 1 Conversation Rules Spec.docx`
- `key-event-identification-spec.docx`

I have also added Markdown conversions and derived product context under `docs/project-context/`:

- `event_readiness_assistant_phase_1_conversation_rules_spec.md`
- `key_event_identification_spec.md`
- `05_ws1_pains_jtbd_features_epics_user_stories.md`
- `06_user_view_prd_phase1_event_readiness_assistant.md`

Treat these new WS1 documents as high-priority business logic for the user-facing MVP.

Important scope update:

- The product should now be interpreted as a Phase 1 Space Request readiness assistant first.
- The primary user-facing goal is to help an LBS student club organiser create, complete, or confirm a Space Request Form.
- Phase 1 ends when the assistant has generated a Space Request Form draft, or when the user has uploaded/provided a draft and the assistant has confirmed it is complete enough to use.
- Key Event / EIS assessment, full readiness scoring, stakeholder routing, and detailed operational planning should happen after the Space Request Form has been drafted or confirmed.
- During Phase 1, the assistant may quietly capture possible Key Event indicators, but must not interrupt form completion with Key Event/EIS guidance unless the user directly asks.

Required conversation behaviour from the Phase 1 spec:

- Maintain a working event profile across turns.
- Diagnose the user's entry type:
  - prepared event request,
  - budget only / no event idea,
  - general event idea,
  - uploaded draft.
- Do not ask for information already provided.
- Follow the user's lead if they start with catering, AV, space, or another middle section.
- Otherwise follow Space Request Form order.
- Ask no more than 3 themed questions at a time by default.
- Use up to 5 only for one structured checklist or when the user has already provided most details.
- Use structured options where possible.
- Always include `Other` for structured questions.
- Include `Not sure yet`, `Needs confirmation`, or `Help me decide` where appropriate.
- For vague or budget-only users, use toolkit-based shaping prompts around strategic alignment, unique value, audience clarity, resource readiness, and success signal.
- Weak event ideas should be shaped and continued, not blocked.
- Ask permission before generating a preview or downloadable draft.
- Show an in-chat preview in Space Request Form order, including missing/uncertain fields.
- Generate an editable downloadable document if the MVP supports it.
- Support a revision loop after draft generation.
- Preserve additional user context rather than dropping it.

Required Space Request Form components to support or map:

- submission timing,
- organiser details,
- event fundamentals / expected attendance,
- audience,
- date and timing,
- event format,
- event purpose/context,
- external speakers,
- political sensitivity,
- preferred venue type,
- room configuration,
- additional spaces,
- catering,
- alcohol,
- audio-visual,
- welcome/registration,
- decorations,
- noise/disruption,
- outside equipment,
- filming,
- streaming media,
- additional requirements/context.

Post-Phase 1 Key Event / EIS logic from the Key Event Identification spec:

- Run the Key Event candidate assessment only after the Space Request Form draft is generated, uploaded, or confirmed complete.
- Use confirmed user inputs from the conversation and form draft, not speculative guesses.
- Candidate trigger 1: confirmed expected attendance is 100+.
- Candidate trigger 2: two or more confirmed non-attendance criteria are present.
- Non-attendance criteria are:
  - high-profile speaker,
  - complex logistics,
  - significant operational elements,
  - external audience,
  - external media attendance.
- Missing, vague, or uncollected information must not be counted.
- Do not ask additional questions solely for Key Event scoring unless needed for the Space Request Form.
- Sensitive political or controversial topic should be stored as a passive internal complexity signal in v1, not a standalone user-facing trigger.
- User-facing language must say the event `could be considered` a Key Event or `may qualify`; do not say it `is` a Key Event.
- LBS staff retain final determination.
- No forms, emails, escalations, or integrations should be submitted automatically.
- Do not use web lookup to verify speaker profiles in v1 unless the product later explicitly adds a verified enrichment step.

Your immediate task remains planning and reconciliation before implementation.

Update `lbs-files/PLAN.md` and any relevant planning files so they reflect these new documents. If you already created `lbs-files/PLAN.md`, revise it rather than starting from scratch.

In the updated plan, explicitly include:

1. How the two new DOCX files should be stored in `lbs-files/raw/`.
2. How their Markdown conversions should be stored in `docs/project-context/`.
3. Which parts become deterministic logic.
4. Which parts become AI prompt/instruction logic.
5. Which parts become UI behaviour.
6. Which parts become output/document-generation requirements.
7. Which parts are post-Phase 1 or future scope.
8. Any conflicts between these WS1 docs and earlier architecture/workstream docs.
9. Any unknowns that require João or WS1 confirmation.

Do not assume missing policy or source data. If the repo has the answer, cite the file in the plan. If the repo does not have the answer, list it as an open question.

Do not delete raw files. Do not implement until the updated plan has been reviewed, unless João explicitly tells you to proceed.
```
