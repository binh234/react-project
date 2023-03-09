import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Box, createTheme, ThemeProvider } from "@mui/material";
import {
  Navbar,
  Feed,
  VideoDetail,
  ChannelDetail,
  SearchFeed,
  PlaylistDetail,
} from "./components";

function App() {
  const theme = createTheme({
    palette: {
      mode: "light",
    },
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        tb: 875,
        md: 1120,
        lg: 1500,
        xl: 1888,
        xxl: 2200,
      },
    }
  });
  return (
    <BrowserRouter>
      <ThemeProvider theme={theme}>
        <Box bgcolor={"background.default"} color={"text.primary"} className="no-scrollbar-y">
          <Navbar />
          <Routes>
            <Route path='/' exact element={<Feed />} />
            <Route path='/video/:id' element={<VideoDetail />} />
            <Route path='/channel/:id' element={<ChannelDetail />} />
            <Route path='/playlist/:id' element={<PlaylistDetail />} />
            <Route path='/search/:searchTerm' element={<SearchFeed />} />
          </Routes>
        </Box>
      </ThemeProvider>
    </BrowserRouter>
  );
}

export default App;
