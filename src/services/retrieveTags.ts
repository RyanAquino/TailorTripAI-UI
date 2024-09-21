import axios from "axios";

const API_URL = import.meta.env.VITE_API_URL;

export const getTags = async () => {
  return axios
    .get(`${API_URL}/api/v1/tags/generate`)
    .then(({ data }) => data["tags"])
    .catch((error) => {
      console.error(error);
    });
};
