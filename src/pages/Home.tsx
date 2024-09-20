import {useMemo, useState} from "react";
import StepOne from "../components/StepOne.tsx";
import StepTwo from "../components/StepTwo.tsx";
import StepThree from "../components/StepThree.tsx";

const Home = () => {
  const [activeStep, setActiveStep] = useState(1);

  const steps = useMemo(
      () => {
        const changeActiveStep = (step: number) => {
          if (step <= steps.length || step >= 1) {
            setActiveStep(step)
          }
        }

        return [
          {
            label: "Step 1",
            value: 1,
            component: <StepOne changeActiveStep={changeActiveStep}/>
          },
          {
            label: "Step 2",
            value: 2,
            component: <StepTwo changeActiveStep={changeActiveStep}/>
          },
          {
            label: "Step 3",
            value: 3,
            component: <StepThree changeActiveStep={changeActiveStep}/>
          }
        ]
      },[]
  )

  const activeComponent = useMemo(
      () => {
        return steps.find(({value}) => value === activeStep)?.component || null;
      },
      [activeStep, steps]
  )

  return (
        <div className="max-w-4xl mx-auto">
          <div className="p-8">
            {activeComponent}
          </div>
        </div>
    );
};

export default Home;