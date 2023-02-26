import { Box, Stack, Typography } from "@mui/material";
import Sidebar from "./Sidebar";
import React, { useEffect, useState } from "react";
import Videos from "./Videos";
import { fetchFromRapidAPI } from "../utils/APIConfig";

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");
  const [videos, setVideos] = useState([]);
  useEffect(() => {
    async function fetchData() {
      const data = await fetchFromRapidAPI(
        `search?part=snippet&q=${selectedCategory}`
      );
      setVideos(data.items);
    }
    fetchData();
  }, [selectedCategory]);

  return (
    <Stack flexDirection={{ md: "row", xs: "column" }}>
      <Box
        height={{ xs: "auto", md: "92vh" }}
        sx={{ borderRight: "1px solid #3d3d3d", px: { xs: 0, md: 2 } }}
      >
        <Sidebar
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
        {/* <Typography variant="body2" className="copyright" mt={1.5}>
          Copyright &copy; 2022
        </Typography> */}
      </Box>

      <Box p={2} flex={2} sx={{ overflowY: "auto", height: "90vh" }}>
        <Typography variant="h4" fontWeight="bold" mb={2}>
          {selectedCategory} <span className="red-text">videos</span>
        </Typography>
        <Videos videos={videos}/>
      </Box>
    </Stack>
  );
};

export default Feed;
