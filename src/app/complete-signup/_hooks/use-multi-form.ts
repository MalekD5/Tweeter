import { useContext } from 'react';
import { MultiStepFormContext } from '../_context/multi-step-form-context';

export const useMultiStepForm = () => useContext(MultiStepFormContext);
