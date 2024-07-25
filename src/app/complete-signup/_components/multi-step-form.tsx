"use client";

import { useContext } from "react";
import { StepContext } from "../_context";
import { StepOne } from "./step-1";
import { StepTwo } from "./step-2";
import { StepThree } from "./step-3";

export function MultiStepForm() {
  const { state } = useContext(StepContext);

  return state.index === 0 ? <StepOne /> : state.index === 1 ? <StepTwo /> : <StepThree />;
}
