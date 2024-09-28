import React, { useCallback, useMemo, useState } from "react";
import StepOne from "../components/StepOne.tsx";
import StepTwo from "../components/StepTwo.tsx";
import StepThree from "../components/StepThree.tsx";
import { Stepper, Step } from "@material-tailwind/react";
import navigate from "../assets/navigate.json";
import calendar from "../assets/calendar-icon.json";
import tag from "../assets/tag-icon.json";
import Lottie from "lottie-react";
import dayjs from "dayjs";
import { getTags } from "../services/retrieveTags.ts";

const Home = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [destination, setDestination] = useState(undefined);
  const [address, setAddress] = useState(undefined);
  const [range, setRange] = useState([null, null]);
  const lastPageValid =
    destination !== undefined &&
    destination !== "" &&
    address !== undefined &&
    address !== "" &&
    !(range[0] === null || range[1] === null);
  const [tags, setTags] = useState<string[]>([]);

  const onDateChange = (date: Date) => {
    const [start, end] = date;

    if (start && end) {
      const diffInDays = dayjs(end).diff(dayjs(start), "day");

      if (diffInDays >= 6) {
        const maxEndDate = dayjs(start).add(6, "day").toDate();
        setRange([start, maxEndDate]);
      } else {
        setRange([start, end]);
      }
    } else {
      setRange([start, end]);
    }
  };

  const secondStepHandler = useCallback(
    (step = 1) => {
      if (tags.length === 0) {
        const fetchTags = async () => await getTags();
        fetchTags().then((tagsData) => {
          setTags(tagsData);
        });
      }
      setActiveStep(step);
    },
    [tags],
  );

  const steps = useMemo(() => {
    const handlePrev = () => setActiveStep((cur) => cur - 1);
    return [
      {
        label: "Step 1",
        value: 0,
        component: (
          <StepOne
            destination={destination}
            setDestination={setDestination}
            activeStep={activeStep}
            setActiveStep={setActiveStep}
          />
        ),
      },
      {
        label: "Step 2",
        value: 1,
        component: (
          <StepTwo
            range={range}
            onDateChange={onDateChange}
            handlePrev={handlePrev}
            address={address}
            setAddress={setAddress}
            generateTagsHandler={secondStepHandler}
            lastPageValid={lastPageValid}
            activeStep={activeStep}
          />
        ),
      },
      {
        label: "Step 3",
        value: 2,
        component: (
          <StepThree
            handlePrev={handlePrev}
            tags={tags}
            destination={destination}
            address={address}
            range={range}
          />
        ),
      },
    ];
  }, [
    address,
    destination,
    activeStep,
    range,
    lastPageValid,
    tags,
    secondStepHandler,
  ]);

  const activeComponent = useMemo(
    () => steps.find(({ value }) => value === activeStep)?.component || null,
    [activeStep, steps],
  );

  return (
    <div className="flex flex-col">
      <div className="flex justify-center px-6 pb-0">
        <Stepper activeStep={activeStep} className="md:w-8/12">
          <Step
            onClick={() => setActiveStep(0)}
            className="w-24 h-24 cursor-pointer"
            style={{ background: "none" }}
          >
            <Lottie loop={false} animationData={navigate} />
          </Step>
          <Step
            onClick={() =>
              destination !== undefined && destination !== ""
                ? secondStepHandler()
                : null
            }
            className="w-16 h-16 cursor-pointer"
            style={{ background: "none" }}
          >
            <Lottie loop={activeStep === 1} animationData={calendar} />
          </Step>
          <Step
            onClick={() => (lastPageValid ? setActiveStep(2) : null)}
            className="w-20 h-20 cursor-pointer"
            style={{ background: "none" }}
          >
            <Lottie loop={activeStep === 2} animationData={tag} />
          </Step>
        </Stepper>
      </div>
      {activeComponent}
    </div>
  );
};

export default Home;
