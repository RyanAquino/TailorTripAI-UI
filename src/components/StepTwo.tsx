import React from "react";


export interface StepProps {
  changeActiveStep: (step: number) => void;
}

const StepperTwo: React.FC<StepProps> = ({changeActiveStep}) => {
  return (
      <>
        Step 2
        <button type="submit" onClick={() => changeActiveStep(1)}>
          Back
        </button>
        <button type="submit" onClick={() => changeActiveStep(3)}>
          Next
        </button>
      </>
  );
};

export default StepperTwo;