import { Button, Typography } from "@material-tailwind/react";
import React, { useEffect, useState } from "react";
import loadingTags from "../assets/loading-tags.json";
import Lottie from "lottie-react";
import { useNavigate } from "react-router-dom";
import { generateSchedule } from "../services/generateSchedule.ts";
import { Backdrop } from "@mui/material";
import loadingMarker from "../assets/loading-routing.json";

export interface StepProps {
  changeActiveStep: (step: number) => void;
}

const StepperThree = ({ handlePrev, tags, destination, address, range }) => {
  const [userTags, setUserTags] = useState([false]);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setUserTags(Array(tags.length).fill(false));
  }, [tags]);

  const onSelectTags = (idx: number) => {
    const updatedTags = [...userTags];
    updatedTags[idx] = !updatedTags[idx];
    setUserTags(updatedTags);
  };

  const processInput = () => {
    setLoading(true);
    const selectedTags = [];
    userTags.forEach((selected, idx) => {
      if (selected) {
        selectedTags.push(tags[idx]);
      }
    });
    const [fromDate, toDate] = range;

    const fetchSchedule = async () =>
      await generateSchedule({
        tags: selectedTags,
        fromDate: fromDate,
        toDate: toDate,
        travelDestination: destination,
        homeLocation: address,
      });
    fetchSchedule().then((data) => {
      setLoading(false);
      navigate("/scheduler", { state: { schedulerData: data["data"] } });
    });
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <div className="flex flex-col">
          <Typography variant="h1" color="blue-gray" className="text-center">
            What are you interested in?
          </Typography>
        </div>

        {tags.length !== 0 ? (
          <div className="grid grid-cols-4 gap-2 md:gap-2 lg:gap-3">
            {tags.map((tag: string, idx: number) => (
              <Button
                variant={userTags[idx] ? "outlined" : "text"}
                size="md"
                onClick={() => onSelectTags(idx)}
                key={idx}
                className="px-3"
              >
                {tag}
              </Button>
            ))}
          </div>
        ) : (
          <div className="flex justify-center h-80 w-80 md:size-7/12 lg:size-3/12">
            <Lottie animationData={loadingTags} />
          </div>
        )}
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 py-6">
        <div>
          <Button
            onClick={processInput}
            size="lg"
            className="px-28"
            variant="filled"
            disabled={!userTags.includes(true)}
          >
            Let's Go!
          </Button>
        </div>
        <div>
          <Button
            onClick={handlePrev}
            size="md"
            className="px-32"
            variant="outlined"
          >
            Back
          </Button>
        </div>
      </div>
      <Backdrop
        sx={(theme) => ({ color: "#fff", zIndex: theme.zIndex.drawer + 1 })}
        open={loading}
      >
        <Lottie
          animationData={loadingMarker}
          className="sm:size-4/5 md:size-4/5 lg:size-5/12"
        />
      </Backdrop>
    </>
  );
};

export default StepperThree;
