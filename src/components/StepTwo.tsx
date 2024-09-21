import React, {useState} from "react";
import { DatePicker } from '@mantine/dates';
import {Typography} from "@material-tailwind/react";
import { em } from '@mantine/core';

import { useMediaQuery } from '@mantine/hooks';
import dayjs from "dayjs";
import '../assets/custom-date-picker.css'


const StepperTwo = () => {
    const isMobile = useMediaQuery(`(max-width: ${em(750)})`);
    const [range, setRange] = useState([null, null]);

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

    return (
        <div className="flex flex-col justify-center items-center">
            <Typography variant="h1" color="blue-gray" className="text-center">
                Tell us when you're traveling
            </Typography>
            <DatePicker
                type="range"
                allowSingleDateInRange
                value={range}
                onChange={onDateChange}
                classNames={{
                    day: "date-picker",
                }}
                minDate={new Date()}
                size={isMobile ? 'md' : 'xl'}
            />
        </div>
    );
};

export default StepperTwo;