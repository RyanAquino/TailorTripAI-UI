import React, {useMemo, useState} from "react";
import StepOne from "../components/StepOne.tsx";
import StepTwo from "../components/StepTwo.tsx";
import StepThree from "../components/StepThree.tsx";
import { Stepper, Step, Button } from "@material-tailwind/react";
import navigate from "../assets/navigate.json";
import calendar from "../assets/calendar-icon.json";
import tag from "../assets/tag-icon.json";
import Lottie from "lottie-react";

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
      <div className="flex flex-col">
          <div className="flex justify-center px-6 pb-0">
              <Stepper
                  activeStep={activeStep}
                  isLastStep={(value) => setIsLastStep(value)}
                  isFirstStep={(value) => setIsFirstStep(value)}
                  className="md:w-8/12"
              >
                  <Step onClick={() => setActiveStep(0)} className="w-24 h-24 cursor-pointer"
                        style={{background: 'none'}}>
                      <Lottie
                          loop={false}
                          animationData={navigate}
                      />
                  </Step>
                  <Step onClick={() => setActiveStep(1)} className="w-16 h-16 cursor-pointer"
                        style={{background: 'none'}}>
                      <Lottie
                          loop={activeStep === 1}
                          animationData={calendar}
                      />
                  </Step>
                  <Step onClick={() => setActiveStep(2)} className="w-20 h-20 cursor-pointer"
                        style={{background: 'none'}}>
                      <Lottie
                          loop={activeStep === 2}
                          animationData={tag}
                      />
                  </Step>
              </Stepper>
          </div>
          {activeComponent}
          <div className="flex justify-center py-4">
              <Button onClick={handleNext} disabled={isLastStep} size="lg" className="px-32" variant="filled">
                  {!isLastStep ? "Next" : "Let's go!"}
              </Button>
          </div>
          <div className="flex justify-center">
              {
                  !isFirstStep ? (
                      <Button onClick={handlePrev} disabled={isFirstStep} size="md" className="px-32" variant="outlined">
                          Back
                      </Button>
                  ) : null
              }
          </div>
      </div>
  );
};

export default Home;