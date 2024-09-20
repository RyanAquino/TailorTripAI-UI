import React, {ChangeEvent } from "react";
import {Input, Typography} from "@material-tailwind/react";
import {useTypewriter} from "react-simple-typewriter";
import Lottie from "lottie-react";
import travelWalk from "../assets/travel-walk.json";

export interface StepProps {
  changeActiveStep: (step: number) => void;
}

const StepperOne = ({destination, setDestination}) => {
    const handleInputChange = (event: ChangeEvent<HTMLInputElement>) => {
        setDestination(event.target.value);
    }

    const [text] =  useTypewriter({
        words: ["United States", "Spain", "United Kingdom", "France", "Italy", "Turkey", "Australia", "Canada", "Japan", "Philippines"],
        loop: 0,
        typeSpeed: 40,
        deleteSpeed: 20,
    })

    return (
        <div className="flex flex-col items-center">
            <div className="flex flex-col">
                <Typography variant="h1" color="blue-gray" className="text-center">
                  Where are you traveling?
                </Typography>
                <Input
                    variant="static"
                    placeholder={text}
                    className="text-center text-xl"
                    defaultValue={destination}
                    onChange={handleInputChange}
                />
            </div>
            <Lottie animationData={travelWalk} className="md:size-4/5 lg:size-5/6 xl:size-5/12" />
        </div>
    );
};

export default StepperOne;