# Stakeholder Email Draft Templates

Templates should be generated from EventRequest and routing facts. Do not send automatically.

## SA Operations / Eventscase Page Request

This is the only full stakeholder email draft in core MVP.

Trigger:

- Generate or note this draft alongside Space Request Form generation when the `Audience` field includes anything besides `Current students` and `Children (Under 18s)`.
- Do not trigger this draft for events whose audience is only current students, or only current students plus children.
- If the organiser explicitly asks for an Eventscase page even when the audience does not trigger it, treat that as a product/business-logic follow-up rather than an automatic trigger.

Recipient:

```text
saoperations@london.edu
```

Subject:

```text
Eventscase page request - [Event Name] - [Club Name]
```

Body:

```text
Hi SA Tech & Ops team,

Please could you help create an Eventscase event page for the following event?

- Name of event: [Event Name]
- Club hosting the event: [Club Name]
- Date and time of event: [Date and Time]
- Location of event: [insert location of event once Space Management answers the Space Request Form confirming a space]
- Student admins for the event: [insert names and LBS email addresses. If the students do not have Eventscase accounts, please make sure they create one at https://lbs.eventscase.com/ so that the SA Ops team can grant them admin rights.]

Best,
[Name]
```

Implementation notes:

- Populate event name, club name, date/time, and sender name from the completed EventRequest when available.
- If location is not confirmed by Space Management, keep the location placeholder wording.
- If student admin names or LBS emails are missing, keep the student-admin placeholder wording.
- Student admin names and LBS emails are not part of the official Space Request field map; they are optional Eventscase email draft fields.
- The email must remain editable and must not be sent automatically.
