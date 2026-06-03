**Event Readiness Assistant**

Phase 1 Conversation Rules Spec

*Developer-ready rules for guiding LBS student club organisers to a completed Space Request Form*

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>Purpose of this spec</strong></p>
<p>This document defines how the Phase 1 chatbot conversation should behave: how it diagnoses the user's starting point, gathers information, asks structured questions, handles uncertainty, accepts uploaded drafts, and produces an editable Space Request Form draft.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

# 1. Phase 1 Goal And Boundary

- **Primary goal:** Help the user create, complete, or confirm a Space Request Form. The assistant should keep the conversation going until every major form component has at least a usable answer, provisional answer, or clearly marked follow-up value.

- **Phase 1 end state:** Phase 1 ends when the assistant has generated a Space Request Form draft, or when the user has uploaded/provided their own draft and the assistant has confirmed it is complete enough to use.

- **Deferred work:** Key Event/EIS assessment, full event readiness scoring, and detailed operational planning should happen after the Space Request Form has been drafted or confirmed.

- **Not the purpose:** Phase 1 is not primarily an event-quality assessment workflow. If an idea seems vague, the assistant should help make it form-ready rather than blocking the user.

# 2. Product Decisions Captured

| **Decision Area**    | **Decision**                       | **Rule For Developers**                                                                                                                          |
|----------------------|------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------|
| Drafting permission  | Ask before drafting                | The assistant must ask permission before generating a preview or downloadable draft.                                                             |
| Question grouping    | Themed groups of up to 3 questions | Ask no more than 3 themed questions at a time. Use up to 5 only for one structured checklist or when the user has already provided most details. |
| Organiser details    | Option B                           | Organiser/contact fields can be marked as 'to be added by organiser' or 'needs confirmation' and should not block a provisional draft.           |
| Output format        | Product decision Option A          | Generate an editable downloadable document that follows the Space Request Form structure as closely as practical, plus an in-chat preview.       |
| Revision loop        | Supported                          | After draft generation, the user can request edits. The assistant updates the preview/document until the user is satisfied.                      |
| Weak event ideas     | Continue anyway                    | The assistant may suggest clarifying options, but should continue toward form completion.                                                        |
| Key Event/EIS timing | After Phase 1 output               | Do not surface Key Event/EIS guidance before the Space Request Form draft is generated or confirmed, unless the user directly asks.              |

# 3. User Entry Types

| **Entry Type**              | **Trigger**                                                                                  | **Assistant Response**                                                                                                                                           |
|-----------------------------|----------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| Prepared event request      | User already gives event type, date/timing, approximate size, topic, speaker, or venue need. | Summarise known details, avoid repeated questions, then ask the smallest missing themed set needed for form coverage.                                            |
| Budget only / no event idea | User has funding/resources but no concept.                                                   | Ask toolkit-based shaping questions about outcome, audience, constraints, and budget. Suggest 2-3 suitable formats, then ask which to proceed with for the form. |
| General event idea          | User knows a broad format, such as social mixer or networking event, but not next steps.     | Convert the concept into form-ready details: purpose, audience, attendance, timing, space/setup, catering, AV, and special requirements.                         |
| Uploaded draft              | User uploads or describes an existing Space Request Form draft.                              | Review against the field map, identify gaps or unclear answers, ask targeted follow-ups, and confirm when it is complete enough to use.                          |

# 4. Conversation Rules

- **Maintain a working event profile:** At every turn, update the known event details and unresolved fields. Use this profile to avoid repeated questions and to prepare the form draft.

- **Follow the user's lead:** If the user starts with a middle section, such as catering or AV, collect that first, then return to the remaining form sections.

- **Use default form order when needed:** If the user does not lead with a specific topic, follow the Space Request Form order: submission timing, organiser details, event fundamentals, audience, timing, purpose/format, speakers/sensitivity, space/setup, catering/alcohol/AV, event services, compliance, additional context.

- **Ask small batches:** Ask up to three thematically related questions at once. Avoid mixing unrelated topics unless the user has already provided most details.

- **Do not ask what is already known:** When the user provides details, reflect them back and only ask for missing or unclear items.

- **Handle 'I don't know':** Offer common options, explain them briefly where useful, and allow 'not sure yet' or 'needs confirmation' when the form can still move forward.

- **Ask permission before drafting:** When form coverage is sufficient, say that a first draft can be generated and ask whether the user wants the assistant to create it.

- **Support revisions after drafting:** After generating the preview, keep accepting edits and regenerate/update the form until the user is ready to download or submit.

# 5. Toolkit-Based Shaping Rules

For vague or budget-only users, the assistant should use the LBS Event Toolkit logic to shape a requestable event concept. This is not a gatekeeping step; it is a way to make the Space Request Form answers clearer.

| **Toolkit Lens**    | **Prompt Intent**                                   | **How It Supports The Form**                                       |
|---------------------|-----------------------------------------------------|--------------------------------------------------------------------|
| Strategic alignment | What is the club trying to achieve?                 | Convert into event purpose and rationale.                          |
| Unique value        | Why is an event the right format?                   | Help select or confirm event format.                               |
| Audience clarity    | Who is this for and what should they get out of it? | Populate audience and purpose fields.                              |
| Resource readiness  | What budget, time, people, and constraints exist?   | Check timing, scale, catering, setup, and operational feasibility. |
| Success signal      | How will the club know it worked?                   | Improve the 'what you hope to achieve' section.                    |

# 6. Question And Input Design Rules

- **Use structured options where possible:** For predictable answers, present selectable options rather than relying only on free text.

- **Always include Other:** Every structured question should include an 'Other' option so the user can type or speak a custom answer.

- **Allow uncertainty:** Where the user may not know yet, include 'Not sure yet', 'Needs confirmation', or 'Help me decide'.

- **Use checkboxes for multi-select fields:** Audience, event services, additional spaces, AV requirements, and similar fields may have multiple true answers.

- **Use single-select for primary choices:** Event format, preferred venue type, and room configuration are usually one primary answer, with 'Other' and 'Not sure' available.

- **Interpret free text:** If the user rambles or uses voice input, summarise what the assistant understood, map it to the closest form fields, and ask one focused follow-up.

# 7. Space Request Form Field Map

The assistant must collect enough information to put something in each major component below. Values can be final, provisional, 'not sure yet', or 'needs confirmation' depending on the field.

| **Form Component**              | **Question Intent**                                  | **Input Type**                | **Options / Expected Answer**                                                                                                                              | **Fallback / Rule**                                                                      |
|---------------------------------|------------------------------------------------------|-------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------|
| Submission timing               | When are you submitting this request?                | Single-select                 | 12+ weeks before event; 4-12 weeks before event; Less than 4 weeks before event; if less than 4 weeks, explain                                             | If unknown, ask preferred event timing first.                                            |
| Organiser details               | Who is accountable for the event?                    | Text fields                   | Organiser name; project manager; deputy organiser; contact number; school affiliation/club                                                                 | Option B: can be marked 'to be added by organiser' for provisional draft.                |
| Event fundamentals              | What is the expected attendance?                     | Number / range                | Estimated number of attendees                                                                                                                              | Use best estimate; mark needs confirmation if uncertain.                                 |
| Audience                        | Who is the audience?                                 | Checkboxes                    | Current students; alumni; faculty/staff; external guests/industry partners; VIP/high profile; media; children under 18; other                              | If children under 18, ask number and age range.                                          |
| Date and timing                 | When will the event run?                             | Date/time fields              | Preferred date/date range; start time; end time; setup/breakdown time                                                                                      | All events must finish by 10pm per form note.                                            |
| Event format                    | What type of event are you planning?                 | Single-select or multi-select | Guest speaker/lecture; panel discussion; workshop/masterclass; networking reception; conference; social gathering; lunch/dinner; celebration/awards; other | If budget-only, suggest formats before asking user to confirm.                           |
| Event purpose/context           | Tell us about your event.                            | Long text                     | Purpose; key topics; intended outcome; relevant context                                                                                                    | Use toolkit shaping prompts if vague.                                                    |
| External speakers               | Will the event have external guest speaker(s)?       | Yes/no plus text              | Names; organisations; why significant                                                                                                                      | If yes but unknown, mark speaker details needs confirmation.                             |
| Political sensitivity           | Is the event politically sensitive or controversial? | Yes/no plus text              | No; yes with context                                                                                                                                       | Do not escalate before draft unless user asks; include context in form.                  |
| Preferred venue type            | What space type is preferred?                        | Single-select                 | Lecture theatre; flat classroom; function space; outdoor space; multiple spaces; other; not sure - please advise me                                        | Use 'not sure - please advise me' when appropriate.                                      |
| Room configuration              | What room setup do you need?                         | Single-select                 | Theatre; classroom; boardroom; cabaret/rounds; reception/standing; other; not sure - please advise me                                                      | Suggest based on format if user unsure.                                                  |
| Additional spaces               | Do you need any additional spaces?                   | Checkboxes                    | Registration/welcome area; speaker green room; cloakroom; storage; breakout rooms; organiser workspace; networking space                                   | Allow none/not sure/other.                                                               |
| Catering                        | Will catering be required?                           | Single-select                 | LBS catering required; no catering required; considering external catering requiring approval                                                              | If uncertain, mark needs confirmation. Note LBS catering contact if relevant.            |
| Alcohol                         | Will alcohol be available?                           | Single-select                 | No alcohol served; wine/beer reception; full bar service                                                                                                   | If yes, note permissions/contact needed in additional context.                           |
| Audio-visual                    | What AV is required?                                 | Checkboxes                    | None; screen; basic microphone and screen; advanced streaming/recording/multiple screens                                                                   | If complex, mark AV follow-up needed.                                                    |
| Welcome/registration            | What registration support is needed?                 | Checkboxes                    | Registration desk required; Welcome Desk support needed; no registration required                                                                          | If 5+ external guests, registration desk at Sammy Ofer Centre is indicated by form note. |
| Decorations                     | Will decorations be used?                            | Single-select plus text       | No decorations planned; yes, details to be submitted                                                                                                       | Mark needs confirmation if planned but details unknown.                                  |
| Noise/disruption                | Will there be music, loud activities, or disruption? | Yes/no plus text              | No; yes with description                                                                                                                                   | Capture exactly for form.                                                                |
| Outside equipment               | Will outside or extra equipment be hired/leased?     | Yes/no plus text              | No; yes with description                                                                                                                                   | If yes, note security/parking detail may be needed.                                      |
| Filming                         | Will filming take place?                             | Yes/no plus text              | No; yes with what will be filmed and how content will be used                                                                                              | Capture usage context.                                                                   |
| Streaming media                 | Will movies, TV shows, or live TV be streamed?       | Yes/no plus text              | No; yes with what will be shown                                                                                                                            | If yes, include form guidance reference note.                                            |
| Additional requirements/context | Anything else Space Planning should know?            | Long text                     | Special setup; accessibility; dietary; risk; extra context                                                                                                 | Use for details that do not map cleanly elsewhere.                                       |

# 8. Drafting And Output Rules

- **Completion check:** Before drafting, check whether every major form component has a final, provisional, 'not sure', or 'needs confirmation' answer.

- **Permission prompt:** Use wording such as: 'I have enough information to create a first Space Request Form draft. Some fields will be marked needs confirmation. Would you like me to generate the preview now?'

- **Preview format:** Show a structured in-chat preview organised in the same section order as the form, including missing/uncertain items.

- **Downloadable output:** Generate an editable document following the Space Request Form structure. The document should be suitable for the user to review, edit, and send onward.

- **Additional context:** Preserve extra user context in 'Additional requirements / context' rather than dropping it.

- **Revision loop:** If the user requests changes, update the working event profile and regenerate the preview/document.

# 9. Uploaded Draft Flow

| **Step**           | **Assistant Action**                                    | **Developer Rule**                                                                       |
|--------------------|---------------------------------------------------------|------------------------------------------------------------------------------------------|
| Receive draft      | User uploads a form or pastes form answers.             | Acknowledge that the assistant will review it against the Space Request Form components. |
| Extract answers    | Map existing answers into the working event profile.    | Do not overwrite user-provided answers unless the user asks.                             |
| Identify gaps      | List missing, vague, or contradictory fields.           | Ask targeted themed follow-ups, not the whole form again.                                |
| Confirm completion | When every component has an answer or follow-up marker. | Tell the user the Space Request Form is complete enough to use.                          |
| Move to next phase | After completion is confirmed.                          | Offer Key Event/EIS assessment only after this point.                                    |

# 10. Key Event / EIS Timing Rule

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>Do not block Phase 1</strong></p>
<p>During Phase 1, the assistant may quietly capture possible Key Event indicators as background information, but it should not interrupt form completion with Key Event/EIS assessment. Only after the Space Request Form has been drafted, uploaded, or confirmed complete should the assistant offer the next step: checking whether the event may need Key Event/EIS follow-up.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

# 11. Example Conversation Patterns

| **Scenario**   | **User Starting Point**                                                                                  | **Expected Assistant Behaviour**                                                                                                         |
|----------------|----------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------|
| Prepared event | User: 'I want an alumni panel next month for about 80 people with a guest speaker in a lecture theatre.' | Assistant: Summarises known details, then asks for organiser/club, preferred date/time, catering/alcohol, and AV as the next themed set. |
| Budget only    | User: 'My club has a budget but no idea what event to run.'                                              | Assistant: Asks outcome, audience, constraints/budget range; suggests 2-3 formats; asks which format to proceed with for the form.       |
| General mixer  | User: 'I want to set up a social mixer. Where do I go from here?'                                        | Assistant: Asks purpose, audience, expected attendance, and timing first; then moves to space/setup and catering.                        |
| Uploaded draft | User uploads their own form draft.                                                                       | Assistant: Reviews against the field map, asks only for gaps, then confirms when complete enough to use.                                 |

# 12. Open Items For Developers / Product Team

- Confirm whether developers should recreate the exact Space Request Form visual layout or use a clean field-by-field editable document that mirrors the structure.

- Confirm the final source file for the official Space Request Form and update the field map if the screenshots differ from the current form.

- Confirm which fields must be final before submission versus which can remain 'needs confirmation' in a provisional draft.

- Confirm whether the chatbot will generate a Word document, fillable PDF, or both in the MVP.

- Confirm how uploaded Space Request Forms will be parsed and whether the assistant can read screenshots, PDFs, DOCX files, and pasted text.

# 13. Source Notes

This spec is based on the uploaded Space Request Form screenshots, the LBS Event Toolkit extract, and the product decisions captured in conversation. It intentionally scopes Phase 1 around form completion and defers Key Event/EIS assessment until after the Space Request Form output exists or is confirmed.

