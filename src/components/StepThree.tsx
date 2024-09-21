import {Button, Typography} from "@material-tailwind/react";
import React, {useState} from "react";


export interface StepProps {
  changeActiveStep: (step: number) => void;
}

const StepperThree = ({handlePrev, tags}) => {
    const [userTags, setUserTags] = useState<string[]>([]);

    const onSelectTags = (e: object) => {
        e.target.style.color = e.target.style.color === "" ? "green": ""

        if(e.target.style.color === "green"){
            setUserTags([e.target.textContent, ...userTags]);
        }else{
            const filteredTags = userTags.filter((tag) => tag !== e.target.textContent)
            setUserTags(filteredTags);
        }

    }

    const processInput = () => {
        console.log(`tags ${userTags}`)
    }

  return (
      <>
          <div className="flex flex-col justify-center items-center">
              <div className="flex flex-col">
                  <Typography variant="h1" color="blue-gray" className="text-center">
                      What are you interested in?
                  </Typography>
              </div>
              <div className="grid grid-cols-4 gap-2 md:gap-2 lg:gap-3 py-6 px-2">
                  {
                      tags.map((tag: string) => (
                          <Button color={undefined} variant="outlined" size="md" onClick={onSelectTags} key={tag}>${tag}</Button>
                      ))
                  }
              </div>
          </div>
          <div className="flex flex-col justify-center items-center space-y-2 py-6">
              <div>
                  <Button onClick={processInput} size="lg" className="px-28" variant="filled">
                      Let's Go!
                  </Button>
              </div>
              <div>
                  <Button onClick={handlePrev} size="md" className="px-32" variant="outlined">
                      Back
                  </Button>
              </div>
          </div>
      </>
  );
};

export default StepperThree;