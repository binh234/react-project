import axios from "axios";

const BASE_URL = "https://youtube-v31.p.rapidapi.com";

const options = {
  url: BASE_URL,
  params: {
    // part: "id,snippet",
    // type: "video",
    maxResults: "48",
  },
  headers: {
    "X-RapidAPI-Key": process.env.REACT_APP_RAPID_API_KEY,
    "X-RapidAPI-Host": "youtube-v31.p.rapidapi.com",
  },
};

// Fetch data from Rapid API
export const fetchFromRapidAPI = async (url) => {
  const response = await axios.get(`${BASE_URL}/${url}`, options);

  return response.data;
}