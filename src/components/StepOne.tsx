import React from "react";


export interface StepProps {
  changeActiveStep: (step: number) => void;
}

const StepperOne: React.FC<StepProps> = ({changeActiveStep}) => {
    return (
        <>
            Step 1
            <button type="submit" onClick={() => changeActiveStep(2)}>
              Next
            </button>
        </>
    );
};

export default StepperOne;