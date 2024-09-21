import React, {useMemo, useState} from "react";
import StepOne from "../components/StepOne.tsx";
import StepTwo from "../components/StepTwo.tsx";
import StepThree from "../components/StepThree.tsx";
import { Stepper, Step } from "@material-tailwind/react";
import navigate from "../assets/navigate.json";
import calendar from "../assets/calendar-icon.json";
import tag from "../assets/tag-icon.json";
import Lottie from "lottie-react";
import dayjs from "dayjs";

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [isFirstStep, setIsFirstStep] = useState(false);

  const [destination, setDestination] = useState(undefined);
  const [range, setRange] = useState([null, null]);
  const lastPageValid = (destination !== undefined && destination !== "") && !(range[0] === null || range[1] === null)
  const [tags] = useState<string[]>([]);

    const onDateChange = (date: Date) => {
        const [start, end] = date;

        if (start && end) {
            const diffInDays = dayjs(end).diff(dayjs(start), 'day');

            if (diffInDays >= 6) {
                const maxEndDate = dayjs(start).add(6, 'day').toDate();
                setRange([start, maxEndDate]);
            } else {
                setRange([start, end]);
            }
        } else {
            setRange([start, end]);
        }
    }

  const steps = useMemo(
    () => {
        const handlePrev = () => !isFirstStep && setActiveStep((cur) => cur - 1);
        const secondStepHandler = () => {
            setActiveStep(activeStep + 1);
        }

        return [
            {
                label: "Step 1",
                value: 0,
                component: <StepOne destination={destination} setDestination={setDestination} activeStep={activeStep} setActiveStep={setActiveStep}/>
            },
            {
                label: "Step 2",
                value: 1,
                component: <StepTwo range={range} onDateChange={onDateChange} handlePrev={handlePrev} generateTagsHandler={secondStepHandler} lastPageValid={lastPageValid}/>
            },
            {
                label: "Step 3",
                value: 2,
                component: <StepThree handlePrev={handlePrev} tags={tags}/>
            }
        ]
    }
      ,[destination, activeStep, isFirstStep, range, lastPageValid, tags]
  )

  const activeComponent = useMemo(
      () => steps.find(({value}) => value === activeStep)?.component || null,
      [activeStep, steps]
  )


  return (
      <div className="flex flex-col">
          <div className="flex justify-center px-6 pb-0">
              <Stepper
                  activeStep={activeStep}
                  // isLastStep={(value) => setIsLastStep(value)}
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
                  <Step onClick={() => destination !== undefined && destination !== "" ? setActiveStep(1): null} className="w-16 h-16 cursor-pointer"
                        style={{background: 'none'}}>
                      <Lottie
                          loop={activeStep === 1}
                          animationData={calendar}
                      />
                  </Step>
                  <Step onClick={() => lastPageValid ? setActiveStep(2): null} className="w-20 h-20 cursor-pointer"
                        style={{background: 'none'}}>
                      <Lottie
                          loop={activeStep === 2}
                          animationData={tag}
                      />
                  </Step>
              </Stepper>
          </div>
          {activeComponent}
      </div>
  );
};

export default Home;