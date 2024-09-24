import React, { useRef, useState } from "react";
import { DatePicker } from "@mantine/dates";
import { Button, Input, Typography } from "@material-tailwind/react";
import { em } from "@mantine/core";

import { useMediaQuery } from "@mantine/hooks";
import "../assets/custom-date-picker.css";
import { StandaloneSearchBox, useJsApiLoader } from "@react-google-maps/api";

const StepperTwo = ({
  range,
  address,
  setAddress,
  onDateChange,
  handlePrev,
  generateTagsHandler,
  lastPageValid,
  activeStep,
}) => {
  const isMobile = useMediaQuery(`(max-width: ${em(750)})`);

  const [libraries] = useState(["places"]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_API_KEY,
    libraries,
  });

  const searchLocation = useRef();
  const placeChangeHandler = () => {
    const [place] = searchLocation.current.getPlaces();
    setAddress(place.formatted_address);
  };

  return (
    <>
      <div className="flex flex-col justify-center items-center">
        <Typography variant="h1" color="blue-gray" className="text-center">
          Tell us when you're traveling
        </Typography>
        {isLoaded ? (
          <div className="flex flex-col justify-center px-14">
            <StandaloneSearchBox
              onLoad={(ref) => (searchLocation.current = ref)}
              onPlacesChanged={placeChangeHandler}
            >
              <Input
                variant="static"
                placeholder="Address of stay"
                className="text-center text-xl"
                defaultValue={address}
              />
            </StandaloneSearchBox>
          </div>
        ) : null}
        <DatePicker
          type="range"
          value={range}
          onChange={onDateChange}
          classNames={{
            day: "date-picker",
          }}
          minDate={new Date()}
          size={isMobile ? "md" : "xl"}
        />
      </div>
      <div className="flex flex-col justify-center items-center space-y-2 py-6">
        <div>
          <Button
            onClick={() => generateTagsHandler(activeStep + 1)}
            disabled={!lastPageValid}
            size="lg"
            className="px-32"
            variant="filled"
          >
            Next
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

export default StepperTwo;
