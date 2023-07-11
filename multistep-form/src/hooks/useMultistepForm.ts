import { ReactElement, useState } from "react";

export function useMultistepForm(steps: ReactElement[]) {
  const [currentStepIndex, setCurrentStepIndex] = useState(0);
  const isFirstStep = currentStepIndex === 0;
  const isLastStep = currentStepIndex === steps.length - 1;

  function next() {
    setCurrentStepIndex((step) => {
      if (step >= steps.length - 1) return step;
      return step + 1;
    });
  }

  function back() {
    setCurrentStepIndex((step) => {
      if (step < 1) return step;
      return step - 1;
    });
  }

  function goto(index: number) {
    setCurrentStepIndex(index);
  }
  return {
    currentStepIndex,
    step: steps[currentStepIndex],
    goto,
    next,
    back,
    isFirstStep,
    isLastStep,
  };
}
