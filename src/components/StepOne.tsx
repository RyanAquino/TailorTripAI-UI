import React, {ChangeEvent } from "react";
import {Button, Input, Typography} from "@material-tailwind/react";
import {useTypewriter} from "react-simple-typewriter";
import Lottie from "lottie-react";
import travelWalk from "../assets/travel-walk.json";

export interface StepProps {
  changeActiveStep: (step: number) => void;
}

const StepperOne = ({destination, setDestination, handleNext, handlePrev, isFirstStep, isLastStep}) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDestination(event.target.value);
    }

    const [text] =  useTypewriter({
        words: ["Philippines", "United States", "Spain", "United Kingdom", "France", "Italy", "Turkey", "Australia", "Canada", "Japan"],
        loop: 0,
        typeSpeed: 40,
        deleteSpeed: 20,
    })

    return (
        <>
            <div className="flex flex-col items-center space-y-2">
                <div className="flex flex-col justify-center">
                    <Typography variant="h1" color="blue-gray" className="text-center">
                        Where are you traveling to?
                    </Typography>

                    <div className="flex flex-col justify-center px-14">
                        <Input
                            variant="static"
                            placeholder={text}
                            className="text-center text-xl"
                            defaultValue={destination}
                            onChange={handleInputChange}
                        />
                    </div>
                </div>
                <Lottie animationData={travelWalk} className="sm:size-4/5 md:size-4/5 lg:size-5/12"/>
            </div>
            <div className="flex justify-center py-4">
                <Button onClick={handleNext} disabled={isLastStep} size="lg" className="px-32" variant="filled">
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

export default StepperOne;