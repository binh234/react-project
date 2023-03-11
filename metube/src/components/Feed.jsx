import { Box, Stack } from "@mui/material";
import Sidebar from "./Sidebar";
import React, { useState, lazy, Suspense } from "react";

const VideoContainer = lazy(() => import('./VideoContainer'));

// const sleep = (ms) => {
//   return new Promise((resolve) => setTimeout(resolve, ms));
// };

const Feed = () => {
  const [selectedCategory, setSelectedCategory] = useState("New");

  return (
    <Stack flexDirection={{ tb: "row", xs: "column" }}>
      <Box
        height={{ xs: "auto", tb: "89vh" }}
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

      <Suspense fallback={<div>Loading...</div>}>
        <VideoContainer selectedCategory={selectedCategory} />
      </Suspense>
    </Stack>
  );
};

export default Feed;
