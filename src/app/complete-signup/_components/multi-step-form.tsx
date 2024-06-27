"use client";

import { useContext } from "react";
import { StepContext } from "../_context";
import { StepOne } from "./step-one";
import { StepTwo } from "./step-two";
import { StepThree } from "./step-three";

export function MultiStepForm() {
  const { state } = useContext(StepContext);

  return state.index === 0 ? (
    <StepOne />
  ) : state.index === 1 ? (
    <StepTwo />
  ) : (
    <StepThree />
  );
}
