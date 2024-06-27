import { useContext } from "react";
import { StepContext } from "../_context";

export const useMultiStepForm = () => useContext(StepContext);
