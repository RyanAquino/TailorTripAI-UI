import {Button, Typography} from "@material-tailwind/react";
import React, {useState} from "react";


export interface StepProps {
  changeActiveStep: (step: number) => void;
}

const StepperThree = ({handlePrev, isFirstStep, isLastStep}) => {
    const [tags, selectedTags] = useState<string[]>([]);
    const onSelectTags = (e: object) => {
        e.target.style.color = e.target.style.color === "" ? "green": ""

        if(e.target.style.color === "green"){
            selectedTags([e.target.textContent, ...tags]);
        }else{
            const filteredTags = tags.filter((tag) => tag !== e.target.textContent)
            selectedTags(filteredTags);
        }

    }

    const processInput = () => {
        console.log(tags)
    }

  return (
      <>
          <div className="flex flex-col items-center">
              <div className="flex flex-col">
                  <Typography variant="h1" color="blue-gray" className="text-center">
                      What are you interested in?
                  </Typography>
              </div>
              <div className="grid grid-cols-4 gap-2 md:gap-2 lg:gap-3 py-8 px-2">
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 2</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 3</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 4</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 5</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
                  <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags}>Button 1</Button>
              </div>
          </div>
          <div className="flex justify-center py-4">
              <Button onClick={processInput} size="lg" className="px-32" variant="filled">
                  {!isLastStep ? "Next" : "Let's go!"}
              </Button>
          </div>
          <div className="flex justify-center">
              {
                  !isFirstStep ? (
                      <Button onClick={handlePrev} disabled={isFirstStep} size="md" className="px-32"
                              variant="outlined">
                          Back
                      </Button>
                  ) : null
              }
          </div>
      </>
  );
};

export default StepperThree;