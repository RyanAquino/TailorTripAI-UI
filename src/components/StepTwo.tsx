import React from "react";
import { DatePicker } from '@mantine/dates';
import {Button, Typography} from "@material-tailwind/react";
import { em } from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';
import '../assets/custom-date-picker.css'


const StepperTwo = ({range, onDateChange, handlePrev, generateTagsHandler, lastPageValid, activeStep}) => {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

    return (
        <>
            <div className="flex flex-col justify-center items-center">
                <Typography variant="h1" color="blue-gray" className="text-center">
                    Tell us when you're traveling
                </Typography>
                <DatePicker
                    type="range"
                    value={range}
                    onChange={onDateChange}
                    classNames={{
                        day: "date-picker",
                    }}
                    minDate={new Date()}
                    size={isMobile ? 'md' : 'xl'}
                />
            </div>
            <div className="flex flex-col justify-center items-center space-y-2 py-6">
                <div>
                    <Button onClick={() => generateTagsHandler(activeStep+1)} disabled={!lastPageValid} size="lg" className="px-32" variant="filled">
                        Next
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

export default StepperTwo;