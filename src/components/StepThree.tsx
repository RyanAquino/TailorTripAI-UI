import React from "react";


export interface StepProps {
  changeActiveStep: (step: number) => void;
}

const StepperThree: React.FC<StepProps> = ({changeActiveStep}) => {
  return (
      <>
        Step 3
        <button type="submit" onClick={() => changeActiveStep(2)}>
          Back
        </button>
        <button type="submit" onClick={() => console.log("submitted!")}>
          Next
        </button>
      </>
  );
};

export default StepperThree;