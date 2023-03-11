import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box } from "@mui/material";
import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
  PlaylistDetail,
} from "./components";
import React from "react";
import ThemeProviderWrapper from "./theme/ThemeProviderWrapper";

function App() {
  return (
    <ThemeProviderWrapper>
      <BrowserRouter>
        <Box
          bgcolor='background.default'
          color='text.primary'
          className='no-scrollbar-y'
        >
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Feed />} />
            <Route path='/video/:id' element={<VideoDetail />} />
            <Route path='/channel/:id' element={<ChannelDetail />} />
            <Route path='/playlist/:id' element={<PlaylistDetail />} />
            <Route path='/search/:searchTerm' element={<SearchFeed />} />
          </Routes>
        </Box>
      </BrowserRouter>
    </ThemeProviderWrapper>
  );
}

export default App;
