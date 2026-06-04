# Space Request Form Field Mapping And Examples

## Source Files

Primary blank form:

- `lbs-files/raw/request-event/Event form - Space Request Form.docx`

Completed example:

- `lbs-files/raw/request-event/LBS Crib Sheet_AMC.docx`

The two files are not identical. The blank form is the updated Space Request Form structure to use for the MVP field map. The completed AMC crib sheet is an example source for realistic values and wording, not a perfect one-to-one completed copy of the updated blank form.

Runtime field list:

- `lbs-files/processed/request-event/space_request_fields.json`

## Mapping Principle

Use the updated blank Space Request Form as the field source for Phase 1. Use the completed AMC crib sheet to seed example values, test cases, and guidance for how organisers may answer in practice.

If the completed crib sheet has a value for an older combined field, map it into the closest updated field and mark any missing detail as `needs_confirmation`.

## Starter Field Mapping

| Updated form field | EventRequest key | AMC example value | Notes |
|---|---|---|---|
| Your name (Event Organiser) | `organiser_name` | Rita Cui | Direct match to old crib sheet requester name. |
| Project manager | `project_manager` | `needs_confirmation` | New updated-form field; not in AMC example. |
| Deputy event organiser | `deputy_event_organiser` | `needs_confirmation` | New updated-form field; useful backup contact. |
| Your LBS email address | `organiser_lbs_email` | `needs_confirmation` | New explicit field; old crib sheet did not include email. |
| Contact number | `contact_number` | +44 7934281743 | Direct match to old contact phone. |
| School affiliation | `school_affiliation` | Investment Management Club | Old label was club/programme affiliation. |
| Event title | `event_title` | Asset Management Conference | Direct match. |
| Expected attendance | `expected_attendance` | ~200 | Direct match; should trigger 100+ Key Event candidate logic once confirmed. |
| Audience | `audience_types` | Students, staff, alumni, external guests inferred | Updated form uses checkbox categories; AMC answer buries audience in event details and speaker list. |
| Children attending | `children_attending` | No | Direct match. |
| Number/age range of children | `children_details` | Not applicable | Only needed if children attend. |
| Event date | `event_date` | May 11, 2026 | Direct match. |
| Set up start time | `setup_start_time` | `needs_confirmation` | Updated form splits timing; AMC does not provide setup time. |
| Guest arrival time | `guest_arrival_time` | `needs_confirmation` | Updated form splits timing; AMC registration is 9-10am. |
| Event start time | `event_start_time` | 10am | Inferred from AMC presentation time. |
| Event end time | `event_end_time` | 5pm presentation; networking until 6pm if applicable | Updated form has one end-time field; keep networking caveat in notes if needed. |
| Breakdown complete time | `breakdown_complete_time` | `needs_confirmation` | Updated form splits timing; AMC does not provide breakdown time. |
| Event type | `event_type` | Guest speakers, panels and keynotes | Maps well to guest speaker / panel / conference. |
| External guest speaker details | `external_guest_speaker_details` | Multiple external asset-management speakers | Direct match, but updated form asks why speakers are significant. |
| Tell us about your event | `event_purpose_context` | Knowledge sharing on asset management topics | Direct match to event details/purpose. |
| Politically sensitive or controversial | `politically_sensitive_or_controversial` | No | Direct match. |
| Preferred venue type | `preferred_venue_type` | Other: Nuffield Hall | A specific room request should use the `Other` option and specify the room name. |
| Room configuration | `room_configuration` | `needs_confirmation` | AMC requested Nuffield Hall but not layout. |
| Additional spaces needed | `additional_spaces_needed` | Registration/welcome area; cloakroom; networking if applicable | Updated form separates additional spaces; old crib has registration and cloakroom fields. |
| Welcome and registration | `welcome_registration` | Yes, 9-10am at ground floor of Nuffield Hall | Direct match to old registration desk field. |
| Decorations | `decorations` | No | Direct match. |
| Catering | `catering` | Coffee, refreshments, and light lunch | Direct match. |
| Alcohol | `alcohol` | No | Direct match. |
| Audio-visual requirements | `audio_visual_requirements` | `needs_confirmation` | AMC does not explicitly state AV needs, though panels/keynotes imply likely AV. |
| Potential noise or disruption | `noise_disruption` | No | Old crib combined activities/noise. |
| Outside or extra equipment | `outside_equipment` | No | Direct match. |
| Filming | `filming` | Event photos by IMC members for club records | Filming includes both photography and video for MVP mapping. |
| Streaming movies, TV shows or live TV | `streaming_media` | `needs_confirmation` | New updated-form field; not in AMC example. |
| Request submission timing | `submission_timing` | `needs_confirmation` | New updated-form field. |
| Late submission urgency | `late_submission_urgency` | Not applicable unless under 4 weeks | New conditional field. |
| Additional comments or special requirements | `additional_comments_special_requirements` | `needs_confirmation` | Updated form field; AMC additional information was blank. |
| Space not confirmed declaration | `declaration_space_not_confirmed` | `needs_confirmation` | DOCX generation can proceed with this as `needs_confirmation`; declaration is shown below the download output. |
| Key Events Meeting declaration | `declaration_key_events_meeting` | `needs_confirmation` | DOCX generation can proceed with this as `needs_confirmation`; declaration is shown below the download output. |
| Catering final numbers declaration | `declaration_catering_final_numbers` | `needs_confirmation` | DOCX generation can proceed with this as `needs_confirmation`; declaration is shown below the download output. |
| Guest list/security declaration | `declaration_guest_list_security` | `needs_confirmation` | DOCX generation can proceed with this as `needs_confirmation`; declaration is shown below the download output. |
| Approval declaration | `declaration_approval_confirmed` | `needs_confirmation` | DOCX generation can proceed with this as `needs_confirmation`; declaration is shown below the download output. |

## AMC Example Summary

The completed AMC crib sheet can be used as a first canonical example for a large student-club conference:

- Event: Asset Management Conference.
- Club: Investment Management Club.
- Attendance: about 200.
- Date: May 11, 2026.
- Timing: presentation 10am-5pm; networking if applicable until 6pm.
- Format: external guest speakers, panels, and keynotes.
- Purpose: knowledge sharing on asset management topics.
- Speakers: multiple external finance/asset-management speakers, including founders, CIOs, portfolio managers, and senior market/research roles.
- Space requested: Nuffield Hall.
- Registration: yes, 9-10am at ground floor of Nuffield Hall.
- Catering: coffee, refreshments, and light lunch.
- Alcohol: no.
- Decorations: no.
- Cloakroom: yes.
- Outside equipment: no.
- Filming/media: event photos for club record keeping by IMC members.

## Starter Business Logic From The Example

- `expected_attendance` of ~200 should trigger deterministic Key Event candidate status once the attendance is treated as confirmed.
- External speakers should trigger provisional/security-aware wording, but speaker presence alone is not automatically enough for Key Event status unless the speaker is high profile or another criterion is met.
- Nuffield Hall request plus Key Event/EIS path may later feed Business Case logic, but Business Case is not core MVP.
- Registration/welcome support should be surfaced because the example has external guests and a registration desk.
- Catering guidance should be surfaced because catering is required.
- AV should be asked as a follow-up because panels/keynotes strongly imply AV, but the AMC crib sheet does not provide explicit AV requirements.
- Setup, guest arrival, breakdown, and organiser email should be asked or marked `needs_confirmation` because the updated form requires more granular detail than the completed crib sheet contains.
- Student admins for Eventscase should stay out of the official Space Request field map. They belong to the Eventscase email draft only.
- Generate or note the Eventscase email draft alongside the Space Request output only when `audience_types` includes external audiences who need an Eventscase page, such as alumni, external guests, corporate partners, public attendees, VIP/high-profile non-LBS guests, media, or other non-current-student external attendees.
- Do not trigger the Eventscase email draft for a current-students-only event, or for an event that only adds children to current students. CampusGroups is the go-to channel for current-student audiences.

## Open Business-Logic Checks

- None currently.
