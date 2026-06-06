export type Unlocks = {
  space: boolean;
  keyEvent: boolean;
  eis: boolean;
  stakeholders: boolean;
  extras: boolean;
};

export type UnlockKey = keyof Unlocks;

export type DrawerState = {
  open: boolean;
  activeId: string | null;
};

export type ReadinessLayout = "stacked" | "dossier";

export type EventReadinessFlowState = {
  unlocked: Unlocks;
  drawer: DrawerState;
  mobileRailOpen: boolean;
  readinessLayout: ReadinessLayout;
};

export type EventReadinessFlowAction =
  | { type: "reset"; preserveLayout?: boolean }
  | { type: "unlock"; key: UnlockKey }
  | { type: "openDrawer"; activeId?: string | null }
  | { type: "closeDrawer" }
  | { type: "setDrawerDetail"; activeId: string | null }
  | { type: "toggleMobileRail" }
  | { type: "setReadinessLayout"; layout: ReadinessLayout };

export const emptyUnlocks: Unlocks = {
  space: false,
  keyEvent: false,
  eis: false,
  stakeholders: false,
  extras: false
};

export function createEventReadinessFlowState(): EventReadinessFlowState {
  return {
    unlocked: emptyUnlocks,
    drawer: { open: false, activeId: null },
    mobileRailOpen: false,
    readinessLayout: "stacked"
  };
}

export function readinessUnlockSequence(keyEventCandidate: boolean): UnlockKey[] {
  return keyEventCandidate
    ? ["space", "keyEvent", "eis", "stakeholders", "extras"]
    : ["space", "keyEvent", "stakeholders", "extras"];
}

export function eventReadinessFlowReducer(
  state: EventReadinessFlowState,
  action: EventReadinessFlowAction
): EventReadinessFlowState {
  if (action.type === "reset") {
    return action.preserveLayout
      ? { ...createEventReadinessFlowState(), readinessLayout: state.readinessLayout }
      : createEventReadinessFlowState();
  }

  if (action.type === "unlock") {
    return {
      ...state,
      unlocked: { ...state.unlocked, [action.key]: true }
    };
  }

  if (action.type === "openDrawer") {
    return {
      ...state,
      drawer: { open: true, activeId: action.activeId ?? null }
    };
  }

  if (action.type === "closeDrawer") {
    return {
      ...state,
      drawer: { open: false, activeId: null }
    };
  }

  if (action.type === "setDrawerDetail") {
    return {
      ...state,
      drawer: { ...state.drawer, activeId: action.activeId }
    };
  }

  if (action.type === "toggleMobileRail") {
    return {
      ...state,
      mobileRailOpen: !state.mobileRailOpen
    };
  }

  return {
    ...state,
    readinessLayout: action.layout
  };
}
