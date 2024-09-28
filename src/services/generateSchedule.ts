import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const generateSchedule = async ({
  tags,
  fromDate,
  toDate,
  travelDestination,
  homeLocation,
}) => {
  return axios
    .post(`${API_URL}/api/v1/trips/generate`, {
      tags: tags,
      from_date: fromDate,
      to_date: toDate,
      travel_location: travelDestination,
      home_location: homeLocation,
    })
    .then(({ data }) => data)
    .catch((error) => {
      console.error(error);
    });
};
