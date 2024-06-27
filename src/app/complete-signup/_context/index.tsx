"use client";

import { createContext, useReducer } from "react";

export const MULTI_FORM_DEFAULT_STATE: _StepState = {
  index: 0,
  username: "",
  displayName: "",
  birthDay: new Date(1, 1, 1),
};

export const StepContext = createContext<_StepContext>({
  state: MULTI_FORM_DEFAULT_STATE,
  dispatch: () => {},
});

export default function MultiStepFormContextContainer({
  children,
}: {
  children: React.ReactNode;
}) {
  const [state, dispatch] = useReducer(reducer, MULTI_FORM_DEFAULT_STATE);

  return (
    <StepContext.Provider value={{ state, dispatch }}>
      {children}
    </StepContext.Provider>
  );
}

function reducer(state: _StepState, action: _StepAction): _StepState {
  const type = action.type;
  switch (type) {
    case "next":
      return {
        ...state,
        index: state.index + 1,
      };
    case "prev":
      return {
        ...state,
        index: state.index - 1,
      };
    case "step1":
      return {
        ...state,
        username: action.payload,
      };
    case "step2":
      return {
        ...state,
        ...action.payload,
      };
    default:
      throw new Error("invalid reducer type for StepContext");
  }
}
