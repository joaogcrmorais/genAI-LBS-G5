import assert from "node:assert/strict";
import { describe, it } from "node:test";
import {
  createEventReadinessFlowState,
  eventReadinessFlowReducer,
  readinessUnlockSequence
} from "./eventReadinessMvpFlow";

describe("Event Readiness MVP flow reducer", () => {
  it("returns the expected readiness unlock sequence for Key Event candidates", () => {
    assert.deepEqual(readinessUnlockSequence(true), ["space", "keyEvent", "eis", "stakeholders", "extras"]);
  });

  it("omits EIS from the unlock sequence for standard events", () => {
    assert.deepEqual(readinessUnlockSequence(false), ["space", "keyEvent", "stakeholders", "extras"]);
  });

  it("unlocks readiness stages without clearing previous stages", () => {
    let state = createEventReadinessFlowState();

    state = eventReadinessFlowReducer(state, { type: "unlock", key: "space" });
    state = eventReadinessFlowReducer(state, { type: "unlock", key: "keyEvent" });

    assert.deepEqual(state.unlocked, {
      space: true,
      keyEvent: true,
      eis: false,
      stakeholders: false,
      extras: false
    });
  });

  it("tracks drawer detail, mobile rail state, and layout mode", () => {
    let state = createEventReadinessFlowState();

    state = eventReadinessFlowReducer(state, { type: "openDrawer", activeId: "av_team" });
    state = eventReadinessFlowReducer(state, { type: "toggleMobileRail" });
    state = eventReadinessFlowReducer(state, { type: "setReadinessLayout", layout: "dossier" });
    state = eventReadinessFlowReducer(state, { type: "setDrawerDetail", activeId: null });

    assert.deepEqual(state.drawer, { open: true, activeId: null });
    assert.equal(state.mobileRailOpen, true);
    assert.equal(state.readinessLayout, "dossier");
  });

  it("reset clears transient flow state and can return to stacked layout", () => {
    const changed = eventReadinessFlowReducer(createEventReadinessFlowState(), {
      type: "setReadinessLayout",
      layout: "dossier"
    });

    assert.deepEqual(eventReadinessFlowReducer(changed, { type: "reset" }), createEventReadinessFlowState());
  });

  it("reset can preserve the selected readiness layout", () => {
    const changed = eventReadinessFlowReducer(createEventReadinessFlowState(), {
      type: "setReadinessLayout",
      layout: "dossier"
    });

    assert.equal(eventReadinessFlowReducer(changed, { type: "reset", preserveLayout: true }).readinessLayout, "dossier");
  });
});
