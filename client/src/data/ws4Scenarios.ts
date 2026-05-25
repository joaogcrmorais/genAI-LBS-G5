export type Speaker = {
  name: string;
  organization: string;
  role_title: string;
  is_external: boolean;
  is_vip: boolean;
  is_politically_sensitive: boolean;
  requires_security_review: boolean;
  notes: string;
};

export type EventRequest = {
  event_id: string;
  status: "draft" | "ready_for_review" | "submitted";
  created_at: string;
  updated_at: string;
  organizer: {
    name: string;
    email: string;
    club_or_department: string;
    role: string;
    deputy_name: string;
    deputy_email: string;
  };
  event_basics: {
    title: string;
    description: string;
    purpose: string;
    event_type: "panel" | "conference" | "workshop" | "networking" | "social" | "speaker" | "careers" | "other" | "unknown";
    is_recurring: boolean;
    previous_event_reference: string;
    target_date: string;
    start_time: string;
    end_time: string;
    is_multi_day: boolean;
    expected_attendance: number | null;
    attendance_estimate_type: "unknown" | "rough_estimate" | "confirmed_estimate" | "capacity_limit";
    audience_types: string[];
    external_audience: boolean;
  };
  space_and_setup: {
    space_confirmed: boolean;
    preferred_space: string;
    space_requirements: string;
    layout_preference: string;
    needs_booths: boolean;
    number_of_booths: number | null;
    needs_cloakroom: boolean;
    needs_signage: boolean;
    setup_notes: string;
  };
  catering: {
    needs_catering: boolean;
    catering_style: "none" | "refreshments" | "buffet" | "plated" | "reception" | "bespoke" | "unknown";
    needs_alcohol: boolean;
    dietary_requirements_known: boolean;
    external_caterer: boolean;
    catering_notes: string;
    budget_estimate: number | null;
  };
  av_and_tech: {
    needs_av: boolean;
    microphones: boolean;
    projector_or_screen: boolean;
    recording: boolean;
    livestreaming: boolean;
    hybrid: boolean;
    complex_av: boolean;
    av_notes: string;
  };
  speakers_and_guests: {
    has_external_speakers: boolean;
    speakers: Speaker[];
    vip_or_embassy_presence: boolean;
    media_expected: boolean;
    guest_list_required: boolean;
    sensitive_topic: "yes" | "no" | "unknown";
  };
  sponsorship_and_external_parties: {
    has_sponsors: boolean;
    sponsor_names: string[];
    has_external_vendors: boolean;
    vendor_notes: string;
    requires_booth_or_branding: boolean;
  };
  intake_state: {
    source: "manual" | "document_upload" | "email_extract" | "unknown";
    completeness_score: number | null;
    missing_fields: string[];
    assumptions: string[];
  };
};

export const emptySpeaker: Speaker = {
  name: "",
  organization: "",
  role_title: "",
  is_external: true,
  is_vip: false,
  is_politically_sensitive: false,
  requires_security_review: false,
  notes: ""
};

const baseEvent: EventRequest = {
  event_id: "evt_ws4_demo",
  status: "draft",
  created_at: "2026-05-26T09:00:00Z",
  updated_at: "2026-05-26T09:00:00Z",
  organizer: {
    name: "Student Organiser",
    email: "organiser@example.com",
    club_or_department: "Student Club",
    role: "Club officer",
    deputy_name: "",
    deputy_email: ""
  },
  event_basics: {
    title: "Untitled event",
    description: "",
    purpose: "",
    event_type: "unknown",
    is_recurring: false,
    previous_event_reference: "",
    target_date: "2026-06-18",
    start_time: "18:00",
    end_time: "19:30",
    is_multi_day: false,
    expected_attendance: null,
    attendance_estimate_type: "unknown",
    audience_types: ["students"],
    external_audience: false
  },
  space_and_setup: {
    space_confirmed: false,
    preferred_space: "",
    space_requirements: "",
    layout_preference: "",
    needs_booths: false,
    number_of_booths: null,
    needs_cloakroom: false,
    needs_signage: false,
    setup_notes: ""
  },
  catering: {
    needs_catering: false,
    catering_style: "none",
    needs_alcohol: false,
    dietary_requirements_known: false,
    external_caterer: false,
    catering_notes: "",
    budget_estimate: null
  },
  av_and_tech: {
    needs_av: false,
    microphones: false,
    projector_or_screen: false,
    recording: false,
    livestreaming: false,
    hybrid: false,
    complex_av: false,
    av_notes: ""
  },
  speakers_and_guests: {
    has_external_speakers: false,
    speakers: [],
    vip_or_embassy_presence: false,
    media_expected: false,
    guest_list_required: false,
    sensitive_topic: "unknown"
  },
  sponsorship_and_external_parties: {
    has_sponsors: false,
    sponsor_names: [],
    has_external_vendors: false,
    vendor_notes: "",
    requires_booth_or_branding: false
  },
  intake_state: {
    source: "manual",
    completeness_score: null,
    missing_fields: [],
    assumptions: []
  }
};

function clone(event: EventRequest): EventRequest {
  return JSON.parse(JSON.stringify(event)) as EventRequest;
}

export const ws4Scenarios: Record<string, EventRequest> = {
  workshop: clone({
    ...baseEvent,
    event_id: "evt_small_workshop",
    event_basics: {
      ...baseEvent.event_basics,
      title: "Small Internal Skills Workshop",
      description: "A small student-only skills workshop with an internal facilitator.",
      purpose: "Skills development for club members.",
      event_type: "workshop",
      expected_attendance: 25,
      attendance_estimate_type: "rough_estimate",
      audience_types: ["students"],
      external_audience: false
    },
    space_and_setup: {
      ...baseEvent.space_and_setup,
      space_confirmed: true,
      preferred_space: "Standard classroom",
      layout_preference: "Classroom"
    }
  }),
  alumniReception: clone({
    ...baseEvent,
    event_id: "evt_alumni_reception",
    event_basics: {
      ...baseEvent.event_basics,
      title: "Alumni Networking Reception",
      description: "Evening networking reception for students and alumni.",
      purpose: "Relationship building and career networking.",
      event_type: "networking",
      expected_attendance: 80,
      attendance_estimate_type: "rough_estimate",
      audience_types: ["students", "alumni"],
      external_audience: false
    },
    catering: {
      ...baseEvent.catering,
      needs_catering: true,
      catering_style: "reception",
      needs_alcohol: true,
      catering_notes: "Evening drinks and light food."
    }
  }),
  externalSpeaker: clone({
    ...baseEvent,
    event_id: "evt_external_speaker",
    event_basics: {
      ...baseEvent.event_basics,
      title: "External Speaker Fireside Chat",
      description: "A named external speaker speaking to students and guests.",
      purpose: "Sector insight and discussion.",
      event_type: "speaker",
      expected_attendance: 60,
      audience_types: ["students", "external_guests"],
      external_audience: true
    },
    av_and_tech: {
      ...baseEvent.av_and_tech,
      needs_av: true,
      microphones: true,
      projector_or_screen: true,
      av_notes: "Speaker microphone and slides."
    },
    speakers_and_guests: {
      ...baseEvent.speakers_and_guests,
      has_external_speakers: true,
      guest_list_required: true,
      sensitive_topic: "no",
      speakers: [
        {
          ...emptySpeaker,
          name: "External Speaker",
          organization: "Example Organisation",
          role_title: "Senior Leader"
        }
      ]
    }
  }),
  careersFair: clone({
    ...baseEvent,
    event_id: "evt_careers_fair",
    event_basics: {
      ...baseEvent.event_basics,
      title: "Multi-Club Careers Fair",
      description: "Careers fair with employer booths, sponsors, catering, and student attendance.",
      purpose: "Employer engagement and recruitment.",
      event_type: "careers",
      expected_attendance: 200,
      audience_types: ["students", "corporate_partners"],
      external_audience: true
    },
    space_and_setup: {
      ...baseEvent.space_and_setup,
      needs_booths: true,
      number_of_booths: 20,
      needs_signage: true,
      setup_notes: "Multiple employer booths and registration table."
    },
    catering: {
      ...baseEvent.catering,
      needs_catering: true,
      catering_style: "buffet",
      budget_estimate: 2500
    },
    sponsorship_and_external_parties: {
      ...baseEvent.sponsorship_and_external_parties,
      has_sponsors: true,
      sponsor_names: ["Example Sponsor"],
      requires_booth_or_branding: true
    }
  }),
  vipLeader: clone({
    ...baseEvent,
    event_id: "evt_vip_leader",
    event_basics: {
      ...baseEvent.event_basics,
      title: "VIP Public Leader Event",
      description: "High-profile public leader event with external guests and possible media interest.",
      purpose: "Flagship speaker engagement.",
      event_type: "speaker",
      expected_attendance: 120,
      audience_types: ["students", "faculty", "vip", "public"],
      external_audience: true
    },
    av_and_tech: {
      ...baseEvent.av_and_tech,
      needs_av: true,
      microphones: true,
      projector_or_screen: true,
      recording: true,
      complex_av: true,
      av_notes: "Multiple microphones, recording, and staging support."
    },
    speakers_and_guests: {
      ...baseEvent.speakers_and_guests,
      has_external_speakers: true,
      vip_or_embassy_presence: true,
      media_expected: true,
      guest_list_required: true,
      sensitive_topic: "yes",
      speakers: [
        {
          ...emptySpeaker,
          name: "VIP Public Leader",
          organization: "Public Institution",
          role_title: "Senior Public Leader",
          is_vip: true,
          is_politically_sensitive: true,
          requires_security_review: true
        }
      ]
    }
  })
};
