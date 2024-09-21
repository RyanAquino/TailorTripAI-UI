import { Button, Typography } from "@material-tailwind/react";
import { useEffect, useState } from "react";

export interface StepProps {
  changeActiveStep: (step: number) => void;
}

const StepperThree = ({ handlePrev, tags }) => {
  const [userTags, setUserTags] = useState([false]);

  useEffect(() => {
    setUserTags(Array(tags.length).fill(false));
  }, [tags]);

  const onSelectTags = (idx: number) => {
    const updatedTags = [...userTags];
    updatedTags[idx] = !updatedTags[idx];
    setUserTags(updatedTags);
  };

  const processInput = () => {
    const selectedTags = [];
    userTags.forEach((selected, idx) => {
      if (selected) {
        selectedTags.push(tags[idx]);
      }
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
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 py-6">
        <div>
          <Button
            onClick={processInput}
            size="lg"
            className="px-28"
            variant="filled"
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
    </>
  );
};

export default StepperThree;
