import { describe, expect, it } from "vitest";
import { deriveFinanceCode, extractExplicitFinanceCode, normaliseEventRequestFinanceCode } from "./financeCodeService.js";

describe("financeCodeService", () => {
  it("extracts an explicit organiser-provided finance code from budget text", () => {
    const prompt =
      "We have a budget of 1500 pounds using finance code FINDATA-ALUMNI-2026 for the Data Club alumni panel.";

    expect(extractExplicitFinanceCode(prompt)).toBe("FINDATA-ALUMNI-2026");
    expect(deriveFinanceCode({ fields: {}, field_status: {} }, prompt)).toBe("FINDATA-ALUMNI-2026");
  });

  it("keeps existing EventRequest finance code before deriving from lookup data", () => {
    expect(
      deriveFinanceCode(
        {
          financeCode: "FINCLUB-WS-2026",
          fields: { event_title: "Wine Society Autumn Social", finance_code: "FINCLUB-WS-2026" },
          field_status: {}
        },
        "Budget will include catering and wine."
      )
    ).toBe("FINCLUB-WS-2026");
  });

  it("does not infer a lookup finance code for an unknown club with coincidental event-text matches", () => {
    expect(
      deriveFinanceCode(
        {
          fields: {
            club_or_programme_affiliation: "Gondor Club",
            event_title: "Palantir Users yearly reunion 2026",
            event_details: "Conference with politically sensitive external speakers, alcohol, food, and outside filming."
          },
          field_status: {}
        },
        "No finance code was provided."
      )
    ).toBeUndefined();
  });

  it("does not treat missing-code status markers as finance codes", () => {
    const eventRequest = {
      fields: {
        club_or_programme_affiliation: "Gondor Club",
        event_title: "Palantir Users yearly reunion 2026",
        finance_code: "needs_confirmation"
      },
      field_status: { finance_code: "needs_confirmation" as const }
    };

    expect(deriveFinanceCode(eventRequest, "There is no finance code for this event.")).toBeUndefined();
    const normalised = normaliseEventRequestFinanceCode(eventRequest, "There is no finance code for this event.");
    expect(normalised.financeCode).toBeUndefined();
    expect(normalised.fields.finance_code).toBe("needs_confirmation");
  });
});
