import {useMemo, useState} from "react";
import StepOne from "../components/StepOne.tsx";
import StepTwo from "../components/StepTwo.tsx";
import StepThree from "../components/StepThree.tsx";
import { Stepper, Step, Button } from "@material-tailwind/react";

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isLastStep, setIsLastStep] = useState(false);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const [destination, setDestination] = useState("");


  const steps = useMemo(
      () => [
          {
            label: "Step 1",
            value: 0,
            component: <StepOne destination={destination} setDestination={setDestination}/>
          },
          {
            label: "Step 2",
            value: 1,
            component: <StepTwo/>
          },
          {
            label: "Step 3",
            value: 2,
            component: <StepThree/>
          }
        ]
      ,[destination]
  )

  const activeComponent = useMemo(
      () => steps.find(({value}) => value === activeStep)?.component || null,
      [activeStep, steps]
  )
  const handleNext = () => !isLastStep && setActiveStep((cur) => cur + 1);
  const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);


  return (
      <div className="max-w-4xl mx-auto">
        <Stepper
            activeStep={activeStep}
            isLastStep={(value) => setIsLastStep(value)}
            isFirstStep={(value) => setIsFirstStep(value)}
        >
          <Step onClick={() => setActiveStep(0)}>
            {/*<HomeIcon className="h-5 w-5" />*/}
            1
          </Step>
          <Step onClick={() => setActiveStep(1)}>
            {/*<UserIcon className="h-5 w-5" />*/}
            2
          </Step>
          <Step onClick={() => setActiveStep(2)}>
            {/*<CogIcon className="h-5 w-5" />*/}
            3
          </Step>
        </Stepper>
        <div className="p-8">
          {activeComponent}
        </div>
        <div className="mt-16 flex justify-between">
          <Button onClick={handlePrev} disabled={isFirstStep}>
            Back
          </Button>
          <Button onClick={handleNext} disabled={isLastStep}>
            {!isLastStep ? "Next" : "Create a plan"}
          </Button>
        </div>
      </div>
  );
};

export default Home;