# Monday.com Event Management Lifecycle Documentation

Source mapping: This file corresponds to the response from Monday.com's LLM assistant to Jo (the main project sponsor), generated from the prompt: "Please send me a detailed overview of the lifecycle of managing an event, from the ideas until after the event completes, highlighting every interaction that happens over the entire event lifecycle. This is to be shared with a group that will assist me by creating an external AI product to help project manage my current workflow, the target audience of the response is an LLM".

> Note: This file preserves the content available in the chat message. The supplied text appears to end mid-field at `numeric_mm2w8`, on Phase 3: Detailed Planning of section DATA FLOW & DEPENDENCIES. The potentially missing information has already been requested.

# EVENT MANAGEMENT LIFECYCLE: Complete Workflow Documentation for AI Integration

## SYSTEM OVERVIEW

**Board Name:** Events and Key Dates 25/26  
**Board ID:** 2008539622  
**Scale:** 844 active event items  
**Organization:** London Business School - Editorial Planning Department  
**Primary Owner:** Jo Luzmore, Head of Editorial Planning  
**Workspace:** Editorial Planning @LBS

**Purpose:** This board serves as the central coordination system for all events, key dates, and activities across London Business School. It manages events from multiple departments (38+ organizing departments), tracks faculty involvement (109+ faculty members), coordinates with various stakeholder groups, and ensures editorial/communications alignment across the institution.

## LIFECYCLE PHASES

## PHASE 1: IDEATION & INITIAL REQUEST

**Trigger:** New event concept emerges from any department or stakeholder  
**Status Values:** Requested, Proposed, TBD

### Key Data Fields [REQUIRED]

- `name` - Event title
- `business_lead6` - Organising Department (one of 38 departments)
- `timeline` - Proposed event date (may be tentative)

### Key Data Fields [OPTIONAL at this stage]

- `long_text67` - Event description
- `text` - Primary contact person
- `dropdown17` - Audience type
- `single_select2` - Location type (On campus/Off campus/Online/Hybrid)
- `text_1` - Speakers (if known)
- `dropdown0` - Faculty Attending

**[STAKEHOLDER: Event Organizer]** - Submits initial event request with basic details  
**[STAKEHOLDER: Editorial Planning Team]** - Reviews incoming requests, assigns initial status

**Typical Duration:** 1-7 days  
**Review Gate:** Initial triage by Editorial Planning team

### Transition Criteria

- IF event needs more information → Status = More info required
- IF event is viable but needs business case → Status = Can progress + Tag = Business case required
- IF event is clearly not feasible → Status = Rejected
- IF event can proceed to planning → Status = Tentative or Proposed

### State Transition

- Requested → More info required → Requested (with additional info)
- Requested → Rejected [END STATE]
- Requested → Can progress
- Proposed → More info required → Proposed (with additional info)
- TBD → Date to be confirmed

## PHASE 2: FEASIBILITY & BUSINESS CASE REVIEW

**Trigger:** Event requires institutional approval or significant resources  
**Status Values:** Can progress, More info required, Fine - requested, Fine - but more info/conditions

### Key Data Fields [REQUIRED]

- All Phase 1 fields
- `dropdown_mkqpb355` - Event overview tag = Business case requested or business case required
- `text_mkt6738h` - Business Case link/document
- `numbers2` - Expected attendance
- `long_text64` - Location of event (specific venue details)
- `color_mm1k6g6y` - Free or Paid

### Key Data Fields [OPTIONAL]

- `dropdown_mkvkt8k6` - Theme (Private Equity, AI, longevity, Enterprise, Careers, Family Office)
- `dropdown7` - Editorial Theme
- `color_mm1kctcw` - HEBCI? (Higher Education Business and Community Interaction)
- `color_mm1kfpts` - Prevent (UK counter-terrorism duty)

### [DECISION POINT: Business Case Required?]

- IF event involves significant budget, external speakers, high-profile attendees, or strategic importance → Business case REQUIRED
- IF routine departmental event with standard resources → Business case NOT required, proceed to Phase 3

**[STAKEHOLDER: Event Organizer]** - Prepares business case document  
**[STAKEHOLDER: Events Oversight Group]** - Reviews business case at scheduled meetings  
**[STAKEHOLDER: Editorial Planning Team]** - Coordinates review process

**Review Gate:** `date3` - Event review date (scheduled for Events Oversight Group meeting)  
**Typical Duration:** 1-4 weeks

### Transition Criteria

- IF business case approved → Tag changes to Business case done + Status = Confirmed - subject to business case or Tentative
- IF business case needs revision → Status = Fine - but more info/conditions
- IF business case rejected → Status = Rejected or Not happening?
- IF no business case needed → Status = Can progress → proceed to Phase 3

### State Transition

- Can progress → Fine - requested → Fine - but more info/conditions → Can progress
- Can progress → Confirmed - subject to business case
- Fine - requested → Rejected [END STATE]

## PHASE 3: DETAILED PLANNING & COORDINATION

**Trigger:** Event approved to proceed with detailed planning  
**Status Values:** Tentative, Confirmed - subject to business case, Date to be confirmed

### Key Data Fields [REQUIRED]

- All Phase 2 fields
- `timeline` - Confirmed or near-confirmed event date
- `text_mm0zsvq8` - Time (specific start/end times)
- `long_text64` - Detailed location/room bookings
- `text` - Primary contact (confirmed)
- `dropdown17` - Audience (confirmed)

### Key Data Fields [POPULATED during this phase]

- `text_1` - Speakers (confirmed list)
- `dropdown0` - Faculty Attending (specific names)
- `numeric_mm2w8a3d` - Total faculty hours
- `text_3` - Registration link
- `color_mm3ftjmp` - Alumni speakers? (Yes/No/Not sure/NA)
- `color_mm3fyvtf` - External speakers? (Yes/No/Not sure/NA)
- `board_relation_mkwt6hzd` - Club (if student club event)
- `text_mksdvrxy` - Crib sheet link (briefing document)

**[STAKEHOLDER: Event Organizer]** - Develops detailed event plan, books venues, confirms speakers  
**[STAKEHOLDER: Editorial Planning Team]** - Tracks progress, coordinates cross-functional needs  
**[STAKEHOLDER: Security Team]** - Reviews events with security implications

### Parallel Workflows Initiated

#### A. SECURITY REVIEW (if applicable)

- **Trigger:** High-profile speakers, external attendees, or sensitive topics
- **Tag:** `dropdown_mkqpb355` = Security issues
- **Action:** Event details shared with Security team
- **Tag:** `dropdown_mkqpb355` = Speakers shared with Security
- **Review:** Security assessment completed
- **Typical Duration:** 1-2 weeks

#### B. DEAN OFFICE COORDINATION (if applicable)

- **Trigger:** High-priority event or Dean attendance requested
- **Field:** `dean_attending__1` = Requested
- **Review Date:** `date_mkvtp1ew` - Dean request review date
- **[STAKEHOLDER: Dean's Office]** - Reviews invitation

**Outcomes:**

- `dean_attending__1` = Yes - briefing needed → Crib sheet required
- `dean_attending__1` = Yes - briefing sent → Dean confirmed and briefed
- `dean_attending__1` = Invited - cant attend → Dean declines

**Typical Duration:** 1-3 weeks

#### C. ADVANCEMENT COORDINATION (if applicable)

- **Trigger:** Alumni speakers, donor events, or fundraising relevance
- **Tag:** `dropdown_mkqpb355` = Speakers Shared with Advancement
- **[STAKEHOLDER: Advancement Team]** - Reviews speaker list, provides donor intelligence
- **Typical Duration:** 1 week

#### D. SUBITEM TASK CREATION

**Trigger:** Event moves to detailed planning  
**Action:** Create subitems for specific tasks

**Subitem Fields:**

- `name` - Task description
- `person` - Owner assigned
- `status` - Task status (Working on it, Done, Overdue, Not happening, Drafted, TBC, Planned, Waiting 4 response, With writer, Briefed to web)
- `timeline` - Task deadline
- `status_1` - Query status (for blockers)
- `text_mkx5k1mp` - Link (to related documents)

**Common Subitems:**

- Venue booking confirmation
- Speaker invitation and confirmation
- Registration system setup
- Catering arrangements
- AV/technical requirements
- Marketing materials creation
- Photography booking
- Post-event content planning

**[STAKEHOLDER: Task Owners]** - Execute assigned tasks, update subitem status

**Typical Duration:** 4-12 weeks before event date

### Transition Criteria

- IF all planning elements confirmed → Status = Confirmed
- IF date still uncertain → Status = Date to be confirmed
- IF issues arise → Status = Stuck/Issues
- IF plans change significantly → Status = Changing plans

### State Transition

- Tentative → Confirmed
- Tentative → Date to be confirmed → Confirmed
- Tentative → Stuck/Issues → Tentative (resolved) or Cancelled/moved
- Confirmed - subject to business case → Confirmed (once business case fully approved)
- Date to be confirmed → Confirmed

## PHASE 4: EDITORIAL & CONTENT PLANNING

**Trigger:** Event confirmed and within content planning horizon (typically 3-6 months out)  
**Status Values:** Confirmed, Confirmed - Space Check

### Key Data Fields [REQUIRED for editorial workflow]

- `dropdown_mkvtarrb` - Editorial/Content tag
- `dropdown7` - Editorial Theme
- `color_mkw817kj` - Content calendar priority (Silver, Gold, Bronze, EP Highlighted)
- `dropdown_mkw8hq6r` - Area (DE - EMBA, DE - GM, DE - MBA, Brand, ADV, DIB, TL, EE, Student Life)

### Key Data Fields [POPULATED during this phase]

- `color_mm1kct3` - Info online? (Yes/No/Some/NA)
- `date_mkvt7mp2` - Editorial review date
- `date_mm0z21dr` - Editorial Group meeting date
- `date_mkxctfek` - EP review date
- `color_mm0gqedh` - EP status (Working on it, On track, Issues)

### [DECISION POINT: Content Priority Level]

- **Gold:** Flagship events, high strategic importance, Dean attending, major external speakers
- **Silver:** Important departmental events, faculty-led, good content potential
- **Bronze:** Standard events, routine programming
- **EP Highlighted:** Special editorial planning focus

### Editorial Workflow Branches

#### A. CC NETWORK REVIEW

- **Tag:** `dropdown_mkvtarrb` = CC Network
- **Review Date:** `date_mm19n35s` - CCN review date
- **[STAKEHOLDER: Communications & Content Network]** - Reviews event for content opportunities
- **Typical Duration:** 1 week

#### B. PR MANAGERS REVIEW

- **Tag:** `dropdown_mkvtarrb` = PR Managers
- **Tag:** `dropdown_mkqpb355` = Shared with PR
- **[STAKEHOLDER: PR Team]** - Assesses media potential, plans press outreach
- **Typical Duration:** 1-2 weeks

#### C. EDITORIAL CONTENT DEVELOPMENT

- **Tag:** `dropdown_mkvtarrb` = Editorial Content
- **Review Date:** `date_mm0z21dr` - Editorial Group meeting date
- **[STAKEHOLDER: Editorial Group]** - Plans content creation (articles, videos, social posts)

**Subitem Tasks Created:**

- Content brief drafted (Status = Drafted)
- Assigned to writer (Status = With writer)
- Briefed to web team (Status = Briefed to web)
- Content published (Status = Done)

**Typical Duration:** 2-6 weeks

#### D. SOCIAL MEDIA PLANNING

- **Tag:** `dropdown_mkvtarrb` = Social
- **[STAKEHOLDER: Social Media Team]** - Plans social promotion strategy
- **Typical Duration:** 1-2 weeks

#### E. EVENT PROMO GROUP

- **Tag:** `dropdown_mkvtarrb` = Events Promo Group
- **Tag:** `dropdown_mkqpb355` = Event Promo Group
- **Review Date:** `date_mm16rd12` - Event promo review date
- **[STAKEHOLDER: Event Promotion Team]** - Coordinates promotional activities across channels
- **Typical Duration:** 2-4 weeks before event

#### F. PHOTOGRAPHY COORDINATION

- **Tag:** `dropdown_mkqpb355` = Photography agreed
- **[STAKEHOLDER: Photography Team]** - Confirms photographer assignment
- **Typical Duration:** 1 week

#### G. SPONSORSHIP SUPPORT

- **Tag:** `dropdown_mkqpb355` = Sponsorship Support Requested
- **[STAKEHOLDER: Sponsorship Team]** - Explores sponsorship opportunities
- **Typical Duration:** 2-4 weeks

### Review Gates

- Editorial Group Meeting: Weekly/bi-weekly review of upcoming events tagged for editorial content
- Event Promo Group Meeting: Regular review of events needing promotional support
- Content Meeting: Day-before review (filter: `date_mm0z21dr` = TOMORROW)

**Typical Duration:** 2-8 weeks before event date

### Transition Criteria

- IF editorial planning complete → `color_mm0gqedh` = On track
- IF content issues arise → `color_mm0gqedh` = Issues
- IF space/venue needs final check → Status = Confirmed - Space Check
- Event remains Confirmed throughout this phase

## PHASE 5: PRE-EVENT EXECUTION (Final 2 Weeks)

**Trigger:** Event date within 14 days  
**Status Values:** Confirmed, Confirmed - Space Check

### Key Activities

- Final venue/space confirmation
- Registration monitoring: `numeric_mm0z9atn` - Actual registered (updated regularly)
- Final speaker confirmations
- Dean briefing finalized (if applicable): `dean_attending__1` = Yes - briefing sent
- All subitems should be Done or Working on it (none Overdue)
- Photography confirmed
- AV/technical setup confirmed
- Catering finalized
- Marketing materials live
- Registration link active: `text_3` populated and functional

**[STAKEHOLDER: Event Organizer]** - Final coordination, troubleshooting  
**[STAKEHOLDER: Editorial Planning Team]** - Monitors readiness, flags issues  
**[STAKEHOLDER: All Task Owners]** - Complete final subitems

### [DECISION POINT: Space Check Required?]

- IF venue capacity concerns or last-minute changes → Status = Confirmed - Space Check
- Action: Physical venue inspection, capacity verification
- Resolution: Status returns to Confirmed once verified

### Issue Escalation

- IF critical issues arise → Status = Stuck/Issues
- Trigger: Missing speaker, venue problem, low registration, technical failure
- Action: Immediate escalation to Editorial Planning team and event organizer

**Resolution Paths:**

- Issue resolved → Status = Confirmed
- Event must be postponed → Status = Changing plans → Cancelled/moved
- Event cancelled → Status = Cancelled/moved [END STATE]

**Typical Duration:** 14 days before event

### State Transition

- Confirmed → Stuck/Issues → Confirmed (resolved)
- Confirmed → Stuck/Issues → Cancelled/moved [END STATE]
- Confirmed → Changing plans → Confirmed (with new date)
- Confirmed → Changing plans → Cancelled/moved [END STATE]
- Confirmed - Space Check → Confirmed

## PHASE 6: EVENT EXECUTION (Event Day)

**Trigger:** Event date = TODAY  
**Status Values:** Confirmed

### Key Activities

- Event takes place as planned
- On-site coordination and management
- Photography/videography capture
- Attendance tracking (final count)
- Real-time issue resolution
- Social media live coverage (if applicable)

**[STAKEHOLDER: Event Organizer]** - On-site event management  
**[STAKEHOLDER: Photography Team]** - Captures event content  
**[STAKEHOLDER: Social Media Team]** - Live social coverage  
**[STAKEHOLDER: Technical Support]** - AV/technical support

### Data Captured

- Final attendance count (to be entered post-event)
- Photos/videos collected
- Speaker presentations/materials
- Attendee feedback (if collected)

**Typical Duration:** Event duration (varies: 1 hour to multiple days)

## PHASE 7: POST-EVENT ACTIVITIES & CLOSURE

**Trigger:** Event date has passed (formula: `formula_mkqv46tk` = "Past Event")  
**Status Values:** Confirmed (remains, but event is now historical)

### Key Data Fields [UPDATED post-event]

- `numeric_mm0z9atn` - Actual registered (final count if not already updated)
- Subitems for post-event tasks created/updated

### Post-Event Subitems (common)

- Thank you emails sent (Status = Done)
- Photos uploaded and organized (Status = Done)
- Event summary written (Status = With writer → Done)
- Content published (blog post, article) (Status = Briefed to web → Done)
- Video edited and published (Status = Working on it → Done)
- Social media follow-up posts (Status = Done)
- Feedback survey sent and analyzed (Status = Done)
- Event report completed (Status = Done)

**[STAKEHOLDER: Event Organizer]** - Completes post-event tasks, provides final report  
**[STAKEHOLDER: Editorial Team]** - Publishes content, archives materials  
**[STAKEHOLDER: Photography Team]** - Delivers edited photos/videos  
**[STAKEHOLDER: Social Media Team]** - Posts follow-up content

### Content Publication Workflow

IF event was tagged for editorial content → Content creation subitems tracked

Content moves through: Drafted → With writer → Briefed to web → Done

Published content link added to subitem: `text_mkx5k1mp`

**Typical Duration:** 1-4 weeks post-event

### Closure Criteria

- All subitems marked Done
- Final attendance recorded
- All content published
- Event report completed (if required)
- Event remains in board as historical record

### State Transition

Confirmed (Past Event) → [Remains as historical record]

**Note:** Events are NOT deleted or archived to a different status. They remain Confirmed with `formula_mkqv46tk` = "Past Event" for historical tracking and reporting.

# STAKEHOLDER INTERACTION MAP

## PRIMARY STAKEHOLDERS

## 1. EVENT ORGANIZER (Organizing Department)

**Role:** Initiates, plans, and executes event

**Departments:** 38 possible organizing departments including:
Advancement, Alumni Clubs, Communications, Degree Education, Executive Education; various Institutes (IEPC, Wheeler, Leadership, DSAI, AQR); Student Clubs, Programme Office, Career Centre, Thought Leadership; Brand and Marketing, Research & Faculty Office, ESR, Global Experiences.

### Engagement Points

- Phase 1: Submits initial request
- Phase 2: Prepares business case (if required)
- Phase 3: Detailed planning, venue booking, speaker coordination
- Phase 5: Final execution preparation
- Phase 6: Event day management
- Phase 7: Post-event tasks and reporting

### Information Needed

- Event approval status
- Review feedback and requirements
- Deadlines for submissions (business case, speaker lists, etc.)
- Coordination requirements with other teams

### Decisions Made

- Event concept and format
- Speaker selection
- Venue and logistics
- Budget allocation

### Communication Methods

- Updates to event item fields
- Subitem task completion
- Direct communication with Editorial Planning team
- Review meeting attendance

## 2. EDITORIAL PLANNING TEAM (Jo Luzmore, Rosie Hopkins)

**Role:** Central coordination, workflow management, strategic oversight

### Engagement Points

- Phase 1: Initial triage and status assignment
- Phase 2: Coordinates business case review
- Phase 3: Tracks planning progress, flags issues
- Phase 4: Manages editorial workflow, assigns content priorities
- Phase 5: Monitors readiness, escalates issues
- Phase 7: Ensures post-event tasks completed

### Information Needed

- All event details across all phases
- Status of reviews and approvals
- Task completion status
- Cross-event dependencies and conflicts

### Decisions Made

- Content calendar priority (Gold/Silver/Bronze/EP Highlighted)
- Editorial theme assignment
- Review scheduling
- Issue escalation

### Communication Methods

- Status updates on event items
- Review date scheduling (`date3`, `date_mkvt7mp2`, `date_mkxctfek`, etc.)
- Tag assignments (`dropdown_mkqpb355`, `dropdown_mkvtarrb`)
- EP status tracking (`color_mm0gqedh`)
- Direct coordination with all stakeholder groups

## 3. EVENTS OVERSIGHT GROUP

**Role:** Strategic approval body for significant events

### Engagement Points

- Phase 2: Business case review and approval
- Ongoing: Reviews events with issues or strategic importance
- Review Schedule: Regular meetings, events filtered by `date3` = TODAY

### Information Needed

- Business case document (`text_mkt6738h`)
- Event description, audience, expected attendance
- Budget and resource requirements
- Strategic alignment and institutional impact

### Decisions Made

- Business case approval/rejection
- Conditions or requirements for event approval
- Resource allocation authorization

### Communication Methods

- Tag: `dropdown_mkqpb355` = Events Oversight Group
- Review date: `date3`
- Notes field: `text_mkxx9qmt` - Event oversight notes
- Status changes based on decisions

## 4. EDITORIAL GROUP

**Role:** Content strategy and editorial content development

### Engagement Points

- Phase 4: Content planning and assignment
- Phase 7: Content creation and publication
- Review Schedule: Regular meetings, events filtered by `date_mm0z21dr` = TOMORROW

### Information Needed

- Event description and speakers
- Editorial theme and strategic importance
- Content calendar priority
- Faculty involvement and expertise areas

### Decisions Made

- Content format (article, video, social, blog post)
- Content angle and messaging
- Writer/creator assignment
- Publication timing

### Communication Methods

- Tag: `dropdown_mkvtarrb` = Editorial Content
- Tag: `dropdown_mkqpb355` = Editorial Group
- Review date: `date_mm0z21dr`
- Subitem tasks for content creation
- EP status: `color_mm0gqedh`

## 5. EVENT PROMO GROUP

**Role:** Cross-channel event promotion and marketing

### Engagement Points

- Phase 4: Promotional strategy development (2-4 weeks before event)
- Phase 5: Final promotional push
- Review Schedule: Regular meetings, events filtered by `date_mm16rd12` or next 3 months + Event Promo Group tag

### Information Needed

- Event details, speakers, audience
- Registration link and capacity
- Key selling points and messaging
- Content calendar priority

### Decisions Made

- Promotional channels and tactics
- Messaging and creative approach
- Promotional timeline and intensity

### Communication Methods

- Tag: `dropdown_mkvtarrb` = Events Promo Group
- Tag: `dropdown_mkqpb355` = Event Promo Group
- Review date: `date_mm16rd12`

## 6. DEAN'S OFFICE

**Role:** Dean attendance coordination and high-level representation

### Engagement Points

- Phase 3: Dean invitation and response
- Phase 5: Dean briefing preparation and delivery
- Review Schedule: Filtered view of future events where `dean_attending__1` has any value

### Information Needed

- Event strategic importance and audience
- Speaker list and topics
- Time commitment required
- Crib sheet/briefing document (`text_mksdvrxy`)

### Decisions Made

- Dean attendance (yes/no)
- Level of Dean involvement (remarks, attendance only, hosting)

### Communication Methods

- Field: `dean_attending__1` (Not yet, Requested, Yes - briefing needed, Yes - briefing sent, Invited - cant attend)
- Review date: `date_mkvtp1ew`
- Crib sheet link: `text_mksdvrxy`

## 7. SECURITY TEAM

**Role:** Security assessment and risk management

### Engagement Points

- Phase 3: Security review for high-risk events
- Review Schedule: Filtered view of next 3 months + Security issues tag

### Information Needed

- Speaker list (especially external/high-profile speakers)
- Audience type and expected attendance
- Event topic and sensitivity
- Venue and access control requirements
- Prevent duty considerations (`color_mm1kfpts`)

### Decisions Made

- Security requirements and protocols
- Speaker approval from security perspective
- Access control measures

### Communication Methods

- Tag: `dropdown_mkqpb355` = Security issues
- Tag: `dropdown_mkqpb355` = Speakers shared with Security

## 8. PR MANAGERS / COMMUNICATIONS TEAM

**Role:** Media relations and external communications

### Engagement Points

- Phase 4: Media opportunity assessment
- Phase 5: Press outreach and media coordination
- Phase 6: Media attendance and coverage
- Phase 7: Post-event media follow-up

### Information Needed

- Speaker profiles and media appeal
- Event newsworthiness and angles
- Embargo requirements
- Photography and media access

### Decisions Made

- Media outreach strategy
- Press release development
- Media invitation list
- Spokesperson designation

### Communication Methods

- Tag: `dropdown_mkvtarrb` = PR Managers
- Tag: `dropdown_mkqpb355` = Shared with PR

## 9. ADVANCEMENT TEAM

**Role:** Alumni relations and donor engagement

### Engagement Points

- Phase 3: Alumni speaker coordination
- Phase 4: Donor intelligence and engagement strategy

### Information Needed

- Alumni speaker involvement
- Donor attendance or relevance
- Fundraising opportunities
- Alumni engagement potential

### Decisions Made

- Alumni speaker support and coordination
- Donor invitation strategy
- Advancement staff attendance

### Communication Methods

- Tag: `dropdown_mkqpb355` = Speakers Shared with Advancement
- Field: `color_mm3ftjmp` = Alumni speakers?

## 10. CC NETWORK (Communications & Content Network)

**Role:** Cross-functional content coordination

### Engagement Points

- Phase 4: Content opportunity identification
- Review Schedule: Review date `date_mm19n35s`

### Information Needed

- Event content potential
- Cross-departmental content opportunities
- Content calendar alignment

### Decisions Made

- Content collaboration opportunities
- Cross-channel content strategy

### Communication Methods

- Tag: `dropdown_mkvtarrb` = CC Network
- Tag: `dropdown_mkqpb355` = C&C Network
- Review date: `date_mm19n35s`

## 11. SOCIAL MEDIA TEAM

**Role:** Social media promotion and coverage

### Engagement Points

- Phase 4: Social media strategy
- Phase 5: Pre-event social promotion
- Phase 6: Live social coverage
- Phase 7: Post-event social content

### Information Needed

- Event highlights and key messages
- Speaker social media handles
- Visual content (photos, graphics)
- Hashtags and social strategy

### Decisions Made

- Social media calendar and posting schedule
- Content format and messaging
- Platform selection and targeting

### Communication Methods

- Tag: `dropdown_mkvtarrb` = Social
- Subitem tasks for social content

## 12. PHOTOGRAPHY TEAM

**Role:** Event photography and visual content capture

### Engagement Points

- Phase 4: Photography booking and briefing
- Phase 6: Event day photography
- Phase 7: Photo delivery and editing

### Information Needed

- Event date, time, location
- Key moments to capture
- Photo usage requirements
- Attendee consent considerations

### Decisions Made

- Photographer assignment
- Shot list and coverage approach
- Editing and delivery timeline

### Communication Methods

- Tag: `dropdown_mkqpb355` = Photography agreed

## 13. SPONSORSHIP TEAM

**Role:** Sponsorship development and management

### Engagement Points

- Phase 3: Sponsorship opportunity assessment
- Phase 4: Sponsor recruitment and coordination

### Information Needed

- Event audience and reach
- Sponsorship benefits and opportunities
- Budget and funding needs

### Decisions Made

- Sponsorship package development
- Sponsor recruitment strategy
- Sponsor recognition approach

### Communication Methods

- Tag: `dropdown_mkqpb355` = Sponsorship Support Requested

## 14. FACULTY MEMBERS (109+ tracked individuals)

**Role:** Academic expertise, speakers, event participants

### Engagement Points

- Phase 3: Faculty invitation and confirmation
- Phase 5: Faculty briefing and preparation
- Phase 6: Faculty participation

### Information Needed

- Event topic and format
- Time commitment and preparation required
- Audience and expected outcomes

### Decisions Made

- Participation acceptance/decline
- Presentation content and approach

### Communication Methods

- Field: `dropdown0` - Faculty Attending (109+ faculty names)
- Field: `numeric_mm2w8a3d` - Total faculty hours
- Direct communication with event organizer

## 15. TASK OWNERS (Various individuals assigned to subitems)

**Role:** Execute specific event-related tasks

### Engagement Points

- Phase 3-7: Task execution throughout event lifecycle

### Information Needed

- Task description and requirements
- Deadline and dependencies
- Resources and access needed

### Decisions Made

- Task execution approach
- Issue escalation when blocked

### Communication Methods

- Subitem assignment: `person` field
- Subitem status updates: `status` field
- Query status for blockers: `status_1` field
- Task links and documentation: `text_mkx5k1mp`

# DATA FLOW & DEPENDENCIES

## INFORMATION CAPTURE BY PHASE

### Phase 1: Ideation & Initial Request

**MANDATORY:**

- `name` [text] - Event title
- `business_lead6` [dropdown] - Organising Department

**OPTIONAL:**

- `timeline` [date range] - Proposed event date
- `long_text67` [long text] - Event description
- `text` [text] - Primary contact
- `dropdown17` [dropdown] - Audience
- `single_select2` [status] - Location type

### Phase 2: Feasibility & Business Case

**MANDATORY (if business case required):**

- `text_mkt6738h` [text] - Business Case link
- `numbers2` [number] - Expected attendance
- `long_text64` [long text] - Location details
- `color_mm1k6g6y` [status] - Free or Paid

**POPULATED:**

- `dropdown_mkqpb355` [dropdown] - Add "Business case requested" or "business case required"
- `date3` [date] - Event review date (for oversight meeting)

**OPTIONAL:**

- `dropdown_mkvkt8k6` [dropdown] - Theme
- `dropdown7` [dropdown] - Editorial Theme
- `color_mm1kctcw` [status] - HEBCI?
- `color_mm1kfpts` [status] - Prevent

### Phase 3: Detailed Planning

**MANDATORY:**

- `timeline` [date range] - Confirmed event date
- `text_mm0zsvq8` [text] - Time (specific hours)
- `long_text64` [long text] - Detailed venue/room bookings
- `text` [text] - Primary contact (confirmed)
- `dropdown17` [dropdown] - Audience (confirmed)

**POPULATED:**

- `text_1` [text] - Speakers (confirmed list)
- `dropdown0` [dropdown] - Faculty Attending (specific names)
- `numeric_mm2w8`
