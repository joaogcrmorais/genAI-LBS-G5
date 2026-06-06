import { describe, expect, it } from "vitest";
import { deriveFinanceCode, extractExplicitFinanceCode } from "./financeCodeService.js";

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
});
