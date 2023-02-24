import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
} from "./components";

function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
    },
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
      <Box bgcolor={"background.default"} color={"text.primary"}>
        <Navbar />
        <Routes>
          <Route path="/" exact element={<Feed />} />
          <Route path="/video/:id" element={<VideoDetail />} />
          <Route path="/channel/:id" element={<ChannelDetail />} />
          <Route path="/search/:searchTerm" element={<SearchFeed />} />
        </Routes>
      </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
