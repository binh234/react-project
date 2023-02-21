import "./App.css";
// import { Button, styled } from "@mui/material";
// import { Send, Settings } from "@mui/icons-material";
import Sidebar from "./components/Sidebar";
import Feed from "./components/Feed";
import Rightbar from "./components/Rightbar";
import { Box, Container, Stack } from "@mui/material";
import Navbar from "./components/Navbar";

function App() {
  // const BlueButton = styled(Button)({
  //   backgroundColor: "skyblue",
  //   color: "#555",
  //   margin: 5,
  //   "&:hover": {
  //     backgroundColor: "lightblue"
  //   }
  // })

  return (
    <Box className="App">
      <Navbar />
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Sidebar />
        <Feed />
        <Rightbar />
      </Stack>
    </Box>
  );
}

export default App;
