Developer handoff for Event Readiness AI tool

| **Product surface** | **Event Readiness AI assistant for LBS student club organisers**                                                        |
|---------------------|-------------------------------------------------------------------------------------------------------------------------|
| **Workstream**      | Detect likely Key Events after Space Request Form draft and offer EIS next step                                         |
| **Version**         | v1 draft based on planning conversation, 3 June 2026                                                                    |
| **Primary sources** | LBS Event Toolkit extract, Product Context, Product Roadmap, Event Management Lifecycle, user decisions in conversation |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>Decision summary</strong></p>
<p>In v1, the assistant should flag an event as a Key Event candidate only when the threshold is met by confirmed information: expected attendance of 100+ OR two or more confirmed non-attendance criteria. The assistant should phrase the result as 'could be considered a Key Event' and offer to start the EIS, because LBS staff retain final determination.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

# 1. Purpose

This specification defines how the Event Readiness AI assistant should identify events that could be considered Key Events and guide student organisers toward the Event Information Sheet (EIS) when appropriate.

The rule should run after the assistant has collected enough detail to produce a Space Request Form draft. It should use confirmed user inputs from that conversation and form draft, not speculative guesses.

# 2. Source-of-Truth Constraints

- Space Request Form remains the first required planning artifact for space booking.

- Key Events require an Event Information Sheet and attendance at the Key Events Meeting.

- The assistant supports triage and preparation; it does not make final policy determinations or submit anything automatically.

- When process guidance is unclear, the assistant should use conservative internal notes while avoiding overconfident user-facing language.

# 3. V1 Flagging Logic

| **Rule**             | **Trigger**                                                                  | **User-facing outcome**                                                                                                 |
|----------------------|------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------|
| Attendance threshold | Expected attendance is 100+ based on confirmed user input or selected range. | Show Key Event candidate message and offer to start EIS.                                                                |
| Criteria threshold   | Two or more confirmed non-attendance criteria are present.                   | Show Key Event candidate message with concise reasons and offer to start EIS.                                           |
| Below threshold      | Attendance below 100 and fewer than two confirmed non-attendance criteria.   | Do not mention Key Event. Move to the next relevant planning step.                                                      |
| Missing information  | A criterion is not collected or cannot be inferred from the form draft.      | Do not count it. Do not ask additional questions solely for Key Event scoring unless needed for the Space Request Form. |

# 4. Criteria Definitions

| **Criterion**                    | **Confirmed when**                                                                                                                                        | **Do not count when**                                                                                                                   |
|----------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------|
| 100+ attendees                   | User states a number or range whose lower bound is 100+, or confirms expected attendance of 100 or more.                                                  | Attendance is unknown, vague, or below 100.                                                                                             |
| High-profile speaker             | Speaker seniority, organisation, public visibility, institutional importance, or role suggests additional LBS attention may be needed.                    | Speaker is external but ordinary-profile; VP-level speaker at a small or low-visibility organisation without wider strategic relevance. |
| Complex logistics                | Multi-room, multi-day, multi-session, staged, hybrid/livestreamed, or otherwise complex programme.                                                        | Single-room, single-session event with standard setup.                                                                                  |
| Significant operational elements | Event requires four or more operational stakeholder groups total, including Space Management, or clearly goes beyond standard space/catering/AV handling. | Routine space + catering, space + AV, space + security, or space + catering + security/AV only.                                         |
| External audience                | Any non-LBS attendees are expected, including external speakers, guests, alumni, corporate partners, public attendees, or external invitees.              | Audience is entirely LBS-affiliated.                                                                                                    |
| External media attendance        | Press or external media are expected, invited, or likely to attend.                                                                                       | Only internal photography, club social media, or routine LBS comms are involved.                                                        |

# 5. High-Profile Speaker Rule

A speaker counts as high-profile when their seniority, organisation, public visibility, or institutional importance is likely to require extra LBS attention.

| **Speaker profile**                                                                          | **Count as high-profile?**           | **Implementation notes**                                                                                                                       |
|----------------------------------------------------------------------------------------------|--------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------|
| President-level or above at a large, well-known, multinational, or enterprise organisation   | Yes                                  | Includes President, Global President, CEO, Chair, C-suite, Board Member, and equivalent roles.                                                 |
| Managing Director, Global Head, Regional Head, Country Head, Partner, Founder, or Co-founder | Usually yes                          | Count when organisation is large, well-known, strategically significant, or has wide audience relevance.                                       |
| VP-level speaker                                                                             | Not automatic                        | Count only if from a major global organisation, high-reach function, strategic partner, or otherwise visibly senior role.                      |
| Senior leader from high-visibility startup                                                   | Yes when visibility threshold is met | Signals include unicorn/near-unicorn status, major Series B+ funding, highly visible investors, category leadership, or strong media coverage. |
| Public official, diplomat, regulator, senior policy figure, or elected representative        | Yes                                  | Current or former roles should count when public profile or institutional sensitivity is meaningful.                                           |
| Institutionally important LBS guest                                                          | Yes                                  | Count when Dean's Office, Advancement, External Relations, donors, alumni leadership, or senior school stakeholders may need involvement.      |

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>Developer note</strong></p>
<p>Do not rely only on job title. The assessment should combine title seniority, organisation scale/profile, topic sensitivity, public visibility, and LBS institutional relevance. If the assistant cannot confirm the profile from user-provided information, it should not count the criterion in v1.</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

# 6. Significant Operational Elements

This criterion is designed to identify events whose delivery appears to require broader operational coordination. Security alone should not make an event significant because external attendees or speakers can routinely require security handling.

| **Operational pattern**                                                                                                                                                           | **Count as significant?** | **Reason**                                                              |
|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------------------------|-------------------------------------------------------------------------|
| Space + catering                                                                                                                                                                  | No                        | Routine operational pattern.                                            |
| Space + security                                                                                                                                                                  | No                        | Security may be routine for external attendees or speakers.             |
| Space + catering + security                                                                                                                                                       | No                        | Still within common operational handling.                               |
| Space + AV + security                                                                                                                                                             | No by default             | Count only if AV or security needs are unusually complex.               |
| Space + catering + AV + security                                                                                                                                                  | Yes                       | Meets four-stakeholder threshold.                                       |
| External vendors, stage build, complex furniture move, VIP handling, green room, cloakroom, welcome desk, complex registration, livestreaming, or alcohol plus wider coordination | Usually yes               | These indicate planning complexity beyond the standard request pattern. |

Operational stakeholder groups for counting:

- Space Management

- Catering

- AV / Technology

- Security

- Duty Managers

- Estates / porters / furniture setup

- Editorial / Press / Comms

- Accessibility support

- External vendors

- Registration / guest list management

- Dean's Office / Advancement / External Relations

# 7. Sensitive Topic Internal Signal

The Space Request Form asks whether politically sensitive or controversial topics will be addressed. For v1, this should be captured as a passive internal complexity signal under significant operational elements, not as a standalone user-facing Key Event trigger.

| **Field / signal**        | **Behavior**                                                                                 |
|---------------------------|----------------------------------------------------------------------------------------------|
| Sensitive topic answer    | If user answers yes, store as an internal complexity signal with the user's explanation.     |
| User-facing trigger       | Do not independently trigger the Key Event message in v1.                                    |
| Internal assessment notes | Include in internal rationale for LBS review and future rubric analysis.                     |
| Future use                | May later become a separate escalation or risk-assessment criterion after policy validation. |

# 8. Required Inputs from Space Request Conversation

| **Input**                                              | **Why needed**                                                            | **Expected source**                                                                          |
|--------------------------------------------------------|---------------------------------------------------------------------------|----------------------------------------------------------------------------------------------|
| Expected attendance number or range                    | Determines automatic 100+ trigger.                                        | Conversation and Space Request Form attendance field.                                        |
| Speaker names, titles, organisations, and role context | Determines high-profile speaker criterion and possible security handling. | Speaker section of Space Request conversation.                                               |
| Audience composition                                   | Determines external audience criterion and security/guest-list needs.     | Audience/registration questions.                                                             |
| Programme structure                                    | Determines multi-room, multi-day, multi-session, or complex format.       | Event format and agenda details.                                                             |
| Operational requirements                               | Determines stakeholder count and significant operational elements.        | Space, catering, AV, security, accessibility, vendor, registration, and logistics questions. |
| Media/press plans                                      | Determines external media criterion.                                      | Comms/media question in form flow.                                                           |
| Politically sensitive or controversial topic answer    | Captured as passive internal complexity signal.                           | Space Request Form sensitive-topic section.                                                  |

# 9. User Flow

- Collect event details through the normal Space Request Form drafting conversation.

- Produce the Space Request Form draft first.

- Run the Key Event assessment against confirmed form fields and conversation data.

- If threshold is met, show the Key Event candidate message and offer EIS next step.

- If threshold is not met, do not mention Key Events and proceed to the next relevant planning action.

<table>
<colgroup>
<col style="width: 100%" />
</colgroup>
<thead>
<tr class="header">
<th><p><strong>Default user-facing copy</strong></p>
<p>Based on what you've shared, your event could be considered a Key Event because it includes: [reasons]. Key Events usually require an Event Information Sheet and attendance at the Key Events Meeting. Would you like to get a head start and complete the EIS now?</p></th>
</tr>
</thead>
<tbody>
</tbody>
</table>

Allowed organiser responses:

- Yes, start now

- Not now

- I'm not sure / tell me more

# 10. Internal Assessment Output

| **Field**             | **Type** | **Description**                                                  |
|-----------------------|----------|------------------------------------------------------------------|
| key_event_candidate   | boolean  | True only when v1 threshold is met.                              |
| trigger_type          | enum     | attendance_100_plus, criteria_threshold, none.                   |
| confirmed_criteria    | array    | List of criteria counted toward the threshold.                   |
| non_counted_signals   | array    | Signals captured but not counted, such as sensitive_topic in v1. |
| rationale_user_facing | string   | Concise explanation suitable for student organiser.              |
| rationale_internal    | string   | More detailed notes for LBS review, including passive signals.   |
| eis_offer_status      | enum     | offered, accepted, deferred, info_requested, not_applicable.     |

# 11. Example Scenarios

| **Scenario**                                                                 | **Confirmed criteria**                                                                    | **Flag?**                                                                     |
|------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------|
| 120-person careers panel with ordinary-profile company speakers              | 100+ attendees                                                                            | Yes                                                                           |
| 60-person event with Global CEO of Coca-Cola and external corporate audience | High-profile speaker; external audience                                                   | Yes                                                                           |
| 45-person event with UBS regional office head and Dean appearance expected   | High-profile / institutionally important speaker; possible senior stakeholder involvement | Yes if both are confirmed as criteria or operational stakeholder count is met |
| 30-person lunch with external guest speaker, catering, and security          | External audience only; routine operations                                                | No                                                                            |
| 80-person multi-room workshop with external attendees                        | Complex logistics; external audience                                                      | Yes                                                                           |
| 70-person event with press attendance and politically sensitive topic        | External media attendance; sensitive topic stored internally                              | No unless another confirmed criterion is present                              |

# 12. Edge Cases and Guardrails

- The assistant should avoid saying an event 'is' a Key Event; use 'could be considered' or 'may qualify'.

- The assistant should not allow organisers to reject the Key Event category as not applicable, because final determination sits with LBS staff.

- If the organiser says 'not now', defer EIS but keep the internal flag.

- If the organiser asks for more information, explain EIS and Key Events Meeting at a high level without inventing additional policy.

- No forms, emails, or escalations should be submitted automatically.

- Do not use web lookup to verify speaker profiles in v1 unless the product later explicitly adds a verified enrichment step.

# 13. Open Questions for Product / LBS Validation

- Should the tool later verify speaker seniority and organisation profile using trusted external sources, or rely only on organiser-provided information?

- Should sensitive topic / reputational risk become a standalone trigger in a later version?

- Should certain stakeholder groups, such as Dean's Office or Advancement, automatically count as high-profile/institutionally important involvement?

- Should there be a minimum external audience threshold in future, or should any non-LBS attendee continue to count?

- Should the four-stakeholder threshold be adjusted after reviewing real event outcomes?

# 14. Implementation Checklist

- Map Space Request Form fields to the criteria in this spec.

- Create deterministic scoring logic for attendance and confirmed criteria.

- Create extraction prompts or structured classifiers for speaker profile, audience type, logistics complexity, operational stakeholders, and media attendance.

- Store passive internal signals separately from user-facing triggers.

- Add EIS offer state and user response handling.

- Log rationale for each flag to support staff review and future tuning.

- Test against standard, borderline, and complex event examples before release.
