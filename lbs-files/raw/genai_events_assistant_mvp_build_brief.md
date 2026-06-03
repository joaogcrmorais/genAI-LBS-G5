# GenAI Events Assistant MVP Build Brief

_Source: transcript of GenAI group meeting on 1 June 2026._

## 1. Purpose of this document

This brief summarises the decisions from the 1 June group meeting and translates them into a build-oriented specification for Codex and any agents working on the MVP.

The goal is not to produce a polished business summary. The goal is to make the implementation scope explicit: what the product is, what the MVP must demonstrate, what data exists, what data does not yet exist in usable form, what is out of scope, and who owns each workstream.

---

## 2. Product concept

The product is an AI assistant for LBS students planning events.

In the long-term vision, the assistant helps students move through the LBS event management lifecycle by:

- Guiding students from initial event ideation through the required planning steps.
- Educating students on the relevant processes, forms, stakeholders, timelines, policies and approvals.
- Helping students understand what information they need to provide.
- Pre-populating required forms and outputs once enough information has been collected.
- Helping LBS staff, especially Joe, avoid acting as a “Wikipedia” for repetitive student questions.
- Helping LBS standardise currently informal decision-making around event tiering and prioritisation.

The product should feel like a practical planning assistant rather than a generic chatbot. It should proactively ask for missing information, retrieve the relevant LBS guidance, and generate concrete outputs that can be used by students and staff.

---

## 3. Event lifecycle scope

The underlying LBS process has **7 phases**, captured in the shared Excel file named **Events Management Lifecycle**.

### Long-term product scope

The final version should support the **first 5 of the 7 lifecycle phases**.

“Support” means the assistant should guide students through the relevant tasks, stakeholders, requirements, forms and decisions required for those phases.

### MVP scope

The MVP should cover the **first 3 phases**, at least to a demonstrable degree.

The group decided this because most of the relevant forms and submission processes happen in the first three phases, making this the highest-signal scope for a working demo.

### Explicit non-MVP scope

The MVP should **not** attempt to cover all 7 phases.

The MVP should **not** implement a fully autonomous learning loop for event tiering or continuous improvement.

The MVP should **not** require a production Monday.com integration. A mock Monday payload is acceptable.

The MVP should **not** require the AI to reason directly over messy/unstructured Excel spreadsheets at runtime if the data can instead be converted into a cleaner searchable format.

---

## 4. MVP product scope

The MVP should demonstrate that a student can interact with the assistant and receive useful, process-aware outputs for event planning.

The most important MVP behaviours are:

1. **Chat-based intake**
   - The user can describe an event informally.
   - Example starting points:
     - “I want to run an event but do not know what to do.”
     - “I have already completed the crib sheet and want help moving forward.”
     - “I am running the next China Business Forum.”
     - “I am from Wine & Spirits Club and want to run a new event.”

2. **Guided questioning**
   - The assistant asks follow-up questions when required information is missing.
   - The assistant should know when it has enough information to generate an output.

3. **Event crib sheet generation**
   - Once enough data has been gathered, the assistant should offer to generate / download / present a completed crib sheet.
   - The crib sheet is an output of the chat interaction, not the primary input interface.

4. **Finance code lookup**
   - If the event already exists in the finance code directory, the assistant should retrieve the relevant finance code.
   - If the event is new and no matching finance code exists, the assistant should explain that the student needs to involve club treasury / request or create a finance code.

5. **Room / space guidance**
   - The assistant should provide relevant information about available rooms/spaces and suitable options, based on whatever clean room/space data is available.

6. **Stakeholder identification**
   - The assistant should identify who else needs to be involved for the event.
   - This should include relevant LBS stakeholders and process owners where known.

7. **Draft stakeholder communication**
   - The assistant should draft emails or stakeholder messages where useful.
   - Example: message to club treasury requesting finance code setup for a new event.

8. **Tiering and prioritisation demo**
   - The assistant should be able to classify / tier events using a heuristic.
   - It should return a rationale explaining why the event was categorised that way.
   - This does not need to be a fully learned or continuously updated model in the MVP.

9. **Mock Monday.com payload**
   - The MVP can generate a mock Monday payload showing what would be sent to Monday.com.
   - This is useful to demonstrate future integration potential without building a live API integration.

---

## 5. Agreed architecture direction

The group moved away from the idea of having the AI search raw Excel files and unstructured documents directly at runtime.

Preferred MVP direction:

- Convert key data into clean, searchable structures.
- Store these structures in the application/repo.
- Let the assistant retrieve from those data sources.
- Use the LLM for conversation, reasoning, synthesis, form-filling and rationale generation.
- Use deterministic or semi-deterministic lookup for finance codes and room/space options where possible.

Practical implication for Codex:

- Do not assume the final app should query arbitrary Excel files directly.
- Build around structured data files or simple database-like artifacts.
- The finance code directory and space database are the strongest candidates for structured MVP data.
- The Student Toolkit should be converted into a usable knowledge base / retrieval source if feasible.

---

## 6. Data inventory

### 6.1 Data that exists

The following data sources were mentioned as existing or available in the shared LBS data folder:

#### 1. Events Management Lifecycle Excel
- Exists in the shared document folder.
- Contains an itemised view of what it takes to run an event from ideation to post-event execution.
- Contains 7 phases.
- MVP should focus on phases 1–3.
- Long-term product should support phases 1–5.

#### 2. Finance code directory
- Exists in the LBS data shared folder.
- Contains approximately 5,000 finance codes.
- Considered one of the cleanest and most self-explanatory data sources.
- Business rule mentioned:
  - If a club has run the same event before, the same finance code is usually reused.
  - Example: if a student is running the next “China Business Forum”, the tool should be able to retrieve the existing finance code.
  - If it is a new event with no prior finance code, the tool should direct the student to contact club treasury / request setup.

#### 3. Student Toolkit / Events Toolkit
- Exists as a large slide deck or PDF, described as around 100 pages.
- Contains substantial guidance for ideation and early event planning.
- Should be treated as a core knowledge source for the chatbot.
- It may contain “phase zero” / ideation guidance, including why to run an event and how to think through early planning.

#### 4. Space / room data
- Mentioned as required for MVP.
- The assistant should know “what are all spaces that they can use.”
- It is unclear from the transcript whether this already exists as a clean standalone dataset or needs extraction from toolkit/policies.

#### 5. Catering policy and other LBS event data
- Catering policy was visible or mentioned while navigating shared data.
- Other LBS-related event information exists in the shared folder.
- These may be useful for later versions, but are not necessarily core MVP inputs unless already clean and easy to use.

#### 6. Existing prototype outputs
A prior prototype already appears to generate:

- Tiering result.
- Stakeholder packets.
- Monday mock payload.
- Actual event request.
- Sample events.
- Ability to customise the request and see how downstream outputs change.

This prototype seems to assume that the full event details have already been collected.

### 6.2 Data that partially exists but needs transformation

#### 1. Student Toolkit as retrieval data
The Student Toolkit exists but likely needs conversion into a structured or retrieval-friendly format.

Suggested transformation:

- Break into sections.
- Identify event planning concepts, policy rules, checklist items, forms, stakeholder guidance and examples.
- Store as Markdown, JSON, or another retrieval-friendly format.
- Add metadata such as phase, topic, stakeholder, form, required/optional, and source page/section if possible.

#### 2. Room / space information
The MVP needs room/space guidance, but the transcript does not confirm a clean source.

Codex should treat room/space data as required but may need a placeholder schema if actual data has not been provided.

Suggested fields:

```json
{
  "space_id": "string",
  "space_name": "string",
  "capacity": "number_or_null",
  "suitable_for": ["panel", "networking", "workshop", "dinner", "conference"],
  "setup_options": ["theatre", "cabaret", "classroom", "standing"],
  "booking_process": "string",
  "constraints": ["string"],
  "source": "string"
}
```

#### 3. Completed form examples
Angela identified a need for examples of “good completed forms” so the assistant can learn what high-quality outputs look like.

These do not appear to be available yet in clean form.

If not available, Codex should support templated output generation and leave room to add examples later.

### 6.3 Data that does not exist yet / is not ready

#### 1. Standardised event tiering rubric
The current LBS tiering/prioritisation process is described as holistic and undocumented.

The MVP can use a heuristic, but a robust rubric is future work.

#### 2. Feedback loop for tiering improvement
A future version should allow the AI to improve event categorisation over time based on feedback.

This is explicitly post-MVP.

#### 3. Stakeholder-specific preference datasets
Future versions could include structured data from stakeholders such as Catering, Facilities, Programme Office, etc., capturing how each stakeholder wants students to communicate with them.

This does not appear ready for MVP.

#### 4. Production Monday.com integration
The MVP can generate a mock Monday payload.

Live Monday.com API feasibility was discussed as TBD and should not be treated as required for the MVP.

#### 5. Production-quality form autofill validation
The MVP should demonstrate pre-population of forms, but it does not need to guarantee production-grade correctness across all event types.

---

## 7. MVP outputs

Codex should build toward the following output types.

### 7.1 Chat response

The assistant should respond conversationally and guide the student through missing information.

Expected behaviour:

- Explain what step the student is in.
- Ask targeted questions.
- Avoid overwhelming the student.
- Pull in guidance only when relevant.
- Say when enough information has been collected to produce a form/output.

### 7.2 Crib sheet / event request

The assistant should generate a structured event request or crib sheet.

Suggested JSON-style structure:

```json
{
  "event_name": "string",
  "club_or_organiser": "string",
  "event_type": "string",
  "event_objective": "string",
  "target_audience": "string",
  "expected_attendance": "number_or_null",
  "preferred_date": "string_or_null",
  "preferred_space": "string_or_null",
  "budget_required": "boolean_or_null",
  "finance_code": "string_or_null",
  "finance_code_status": "existing | needs_request | unknown",
  "stakeholders_to_involve": ["string"],
  "next_steps": ["string"],
  "open_questions": ["string"]
}
```

### 7.3 Finance code result

For existing events:

```json
{
  "finance_code_status": "existing",
  "matched_event": "China Business Forum",
  "finance_code": "CODE_HERE",
  "confidence": "high | medium | low",
  "rationale": "Matched against prior event name in finance code directory."
}
```

For new events:

```json
{
  "finance_code_status": "needs_request",
  "finance_code": null,
  "rationale": "No prior matching event found in the finance code directory.",
  "recommended_action": "Ask club treasury to create or confirm a finance code."
}
```

### 7.4 Stakeholder packet

The assistant should generate stakeholder-specific summaries.

Suggested structure:

```json
{
  "stakeholder": "Club Treasury",
  "why_involved": "Finance code required for new event.",
  "information_needed": ["event name", "club", "budget estimate", "date"],
  "draft_message": "string"
}
```

### 7.5 Tiering result

The MVP should return a tier and rationale, even if the rubric is heuristic.

Suggested structure:

```json
{
  "tier": "string",
  "confidence": "high | medium | low",
  "rationale": ["string"],
  "signals_used": ["attendance", "external speakers", "budget", "strategic importance", "complexity"],
  "requires_joe_attention": "yes | no | maybe"
}
```

### 7.6 Mock Monday.com payload

The MVP should generate a payload that demonstrates what could later be sent to Monday.com.

Suggested structure:

```json
{
  "board": "events_pipeline",
  "item_name": "string",
  "columns": {
    "event_name": "string",
    "club": "string",
    "tier": "string",
    "status": "intake_complete",
    "finance_code_status": "existing | needs_request | unknown",
    "stakeholders": ["string"],
    "next_action": "string"
  }
}
```

---

## 8. User interaction model

The group leaned toward a **chatbot-first** experience, not a static form-first experience.

Rationale:

- Students often do not know the options, policies or next steps.
- Students may not know what rooms, setups, finance codes or forms are relevant.
- Joe’s pain point is repetitive guidance, not just form completion.
- The assistant should surface information as needed through conversation.
- Forms are still essential, but they should be outputs generated by the assistant.

Important distinction:

- **Chat is the interface.**
- **Forms / crib sheets / payloads are outputs.**

The assistant should support users who start with different levels of completeness:

1. User has no idea how to run an event.
2. User has an event idea but no details.
3. User already has a crib sheet and wants help with next steps.
4. User wants to repeat an existing event.
5. User wants to run a new event requiring a new finance code.

---

## 9. Implementation notes for Codex

### 9.1 Build thin vertical slices

Prioritise a working demo over broad incomplete coverage.

A strong MVP vertical slice would be:

1. User describes an event.
2. Assistant asks for missing fields.
3. Assistant checks finance code data.
4. Assistant provides room/space guidance.
5. Assistant identifies stakeholders.
6. Assistant generates a crib sheet.
7. Assistant generates a tiering result.
8. Assistant generates a mock Monday payload.
9. Assistant drafts the next stakeholder email.

### 9.2 Use structured data where possible

Avoid relying on the LLM to search raw Excel files at runtime.

Instead:

- Convert finance codes into JSON/CSV loaded by the app.
- Convert rooms/spaces into JSON/CSV if available.
- Convert toolkit guidance into Markdown chunks or JSON documents.
- Use retrieval or simple lookup against structured sources.

### 9.3 Keep all MVP data local if needed

If API access is uncertain, use local data files inside the repo.

Suggested structure:

```text
/data
  /finance_codes.csv
  /spaces.json
  /toolkit_chunks.md
  /sample_events.json
  /lifecycle_phases.json
/src
  /services
    financeCodeLookup.ts
    spaceLookup.ts
    tiering.ts
    stakeholderPackets.ts
    mondayPayload.ts
  /prompts
    intakeSystemPrompt.md
    cribSheetPrompt.md
    stakeholderPrompt.md
```

### 9.4 Separate deterministic lookup from LLM reasoning

Recommended separation:

- Finance code matching: deterministic / fuzzy lookup.
- Room/space filtering: deterministic / rules-based, possibly LLM-assisted.
- Tiering: heuristic rules + LLM-generated rationale.
- Chat: LLM.
- Crib sheet drafting: LLM + structured schema.
- Monday payload: deterministic mapping from event object.
- Stakeholder emails: LLM using stakeholder packet schema.

### 9.5 Treat “good completed forms” as future training/evaluation data

Since examples of completed forms may not exist yet, design the system so examples can be added later.

Do not block the MVP on them.

---

## 10. Workstreams and owners

### Angela

Angela is effectively the client / business logic owner.

Responsibilities:

- Provide the business requirements.
- Provide process rules.
- Provide the expected chatbot behaviours.
- Provide the envisioned outputs.
- Provide or point to available data sources.
- Validate whether the MVP matches the LBS process.
- Draft plain-text requirements/specs for the chatbot and outputs.
- Provide examples of what responses/forms should look like where possible.

Specific agreed deliverables:

- Plain-text requirements for the V0/MVP.
- Rules for how the chatbot should interact with users.
- Rules for what the assistant should produce once enough information is collected.
- Clarification of which data sources should be used.
- Ideally, a draft by Tuesday evening or Wednesday morning before 11:00.

### João

João is acting as product/technical PM and implementation lead.

Responsibilities:

- Turn Angela’s business logic into requirements / PRD.
- Feed requirements into Codex.
- Use Codex to build the MVP.
- Run tests and check whether the implementation behaves correctly.
- Implement mocked outputs where needed.
- Ensure the MVP is scoped tightly enough to be delivered.
- Coordinate the build and integration.
- Help Fernando understand/use Codex for the non-coding analysis workstream.

Specific agreed deliverables:

- Codex-ready PRD/specification.
- Working MVP implementation or prototype.
- Tests / manual validation of the built features.
- Clear explanation of what has and has not been built.

### Fernando

Fernando owns the “what exists vs what is missing” / roadmap analysis stream.

Responsibilities:

- Connect to the repo through Codex.
- Use Codex as a chat interface to understand the current state of the build.
- Identify what has already been built.
- Identify requirements that have not yet been implemented.
- Produce a text report explaining gaps, next steps, and future stages.
- No code generation is required for this workstream.

Specific agreed deliverables:

- Report covering:
  - What is already built.
  - What was required but not built.
  - Why or where it is missing, if known.
  - What future builders should do next.
  - Suggested versioning / roadmap stages.

Fernando requested support from João to learn the process and work through this.

### Rita

Rita was mentioned as likely owning the final packaging / presentation workstream.

Responsibilities:

- Turn the product summary, build status, and roadmap into a polished presentation/report for LBS.
- Cross-reference materials.
- Make the final deliverable coherent and presentable.

### Joe / LBS stakeholder

Joe is the operational stakeholder / user whose pain points the product is trying to address.

Relevant pain points:

- Joe does not want to answer repetitive process questions.
- Joe needs to know which events require his attention.
- LBS has a tiering/prioritisation process, but it is currently not fully documented or standardised.
- The tool should help students self-serve and escalate only when appropriate.

---

## 11. Timeline and meeting decisions

The group agreed to a working meeting on **Wednesday at 2pm**.

Expected preparation:

- Angela to share requirements/specs by Tuesday evening if possible, otherwise by Wednesday morning before 11:00.
- João needs time after receiving the requirements to feed them to Codex, build, and test.
- Wednesday 2pm may function as a working meeting rather than a final review.
- If João needs more build time, a later review such as Thursday may be more realistic for a built demo.

---

## 12. Open questions for Codex / implementation agents

Codex should flag or ask for clarification on the following if not present in the repo.

### Product and UX

1. Is the MVP UI a true chat interface, or a form with chat-like guidance?
   - Meeting direction: chatbot-first.
   - Forms are outputs.

2. What exact fields are required before generating the crib sheet?

3. How should the assistant decide that it has “enough information” to generate a crib sheet?

4. What should the assistant do when the user uploads an existing crib sheet?

5. What tone should the assistant use?
   - Likely practical, student-friendly, process-aware, not overly verbose.

### Data

6. Is the finance code directory already converted into a usable CSV/JSON file?
   - If not, this should be the first data transformation task.

7. Does a clean room/space dataset exist?
   - If not, create a placeholder schema and populate with available examples.

8. Is the Student Toolkit available in text/PDF form?
   - If yes, chunk and convert into retrieval-friendly Markdown/JSON.
   - If no, use placeholder guidance and make this a blocker for richer ideation support.

9. Are there examples of completed crib sheets/forms?
   - If no, use templates and note that real examples are future evaluation data.

10. Is there a documented tiering rubric?
   - If no, use heuristic tiering and label it as non-production.

### Integrations

11. Should Monday.com be live or mocked?
   - Meeting direction: mocked payload for MVP.

12. Does the app need authentication?
   - Not discussed. Assume out of scope unless already present.

13. Does the app need to write back to any LBS system?
   - Not for MVP.

---

## 13. Recommended MVP acceptance criteria

The MVP is successful if it can demonstrate the following end-to-end flow:

1. A student starts a chat with a vague event idea.
2. The assistant asks sensible follow-up questions.
3. The assistant uses available event planning guidance from the toolkit/lifecycle.
4. The assistant checks the finance code directory.
5. If the event already exists, it returns a finance code.
6. If the event is new, it explains the finance code request process and drafts a message to treasury.
7. The assistant suggests suitable spaces or asks for space-relevant criteria.
8. The assistant identifies stakeholders to involve.
9. The assistant generates a structured crib sheet / event request.
10. The assistant generates a tiering result with rationale.
11. The assistant generates a mock Monday.com payload.
12. The assistant clearly shows open questions and next steps.

---

## 14. Recommended roadmap

### V0 / MVP

- Chat-based intake.
- Finance code lookup.
- Basic room/space guidance.
- Student Toolkit / lifecycle guidance where available.
- Crib sheet generation.
- Stakeholder identification.
- Draft stakeholder email.
- Heuristic tiering.
- Mock Monday payload.
- Local structured data.

### V1

- Better Student Toolkit retrieval.
- More complete lifecycle phase 1–3 coverage.
- More robust form pre-population.
- Better examples / few-shot completed forms.
- Improved event tiering rubric.
- Cleaner UI mockups / dashboard view.

### V2

- Support phases 4–5.
- Add stakeholder-specific policy data, e.g. Catering, Facilities, AV, Programme Office.
- More sophisticated space recommendation.
- More complete stakeholder packets.
- More formal approval workflows.

### V3 / Future

- Feedback loop for tiering and prioritisation.
- Continuous improvement from Joe / stakeholder feedback.
- Production Monday.com integration.
- Potential write-back to LBS systems.
- Wider institutional rollout.

---

## 15. Key build principle

The MVP should not try to be a universal LBS event operations system.

It should prove a focused product thesis:

> A student can talk to an AI assistant, describe an event, and receive process-aware guidance plus concrete event-planning outputs using existing LBS event data.

The strongest demo is a narrow but complete flow, not broad lifecycle coverage.
