import React, {ChangeEvent } from "react";
import {Card,Input, Typography} from "@material-tailwind/react";
import {useTypewriter} from "react-simple-typewriter";


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
        <div className="mb-1 flex flex-col gap-6">
          <Card color="transparent" shadow={false}>
            <Typography variant="h1" color="blue-gray" className="text-center">
              Where are you traveling?
            </Typography>
            <Input
                size="lg"
                variant="static"
                placeholder={text}
                className="text-center"
                defaultValue={destination}
                onChange={handleInputChange}
            />
          </Card>
        </div>
    );
};

export default StepperOne;