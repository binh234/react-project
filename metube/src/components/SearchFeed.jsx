import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Videos from "./Videos";
import { fetchFromRapidAPI } from "../utils/APIConfig";
import { useParams } from "react-router-dom";

const SearchFeed = () => {
  const { searchTerm } = useParams();
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchFromRapidAPI(
        `search?part=snippet&q=${searchTerm}`
      );
      setVideos(data.items);
    }
    fetchData();
  }, [searchTerm]);

  return (
    <Box p={2} flex={2} sx={{ overflowY: "auto", height: "90vh" }}>
      <Typography variant="h4" fontWeight="bold" mb={2}>
        Search results for: <span className="red-text">{searchTerm}</span> videos
      </Typography>
      <Videos videos={videos} />
    </Box>
  );
};

export default SearchFeed;
