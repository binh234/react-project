import { Box } from "@mui/material";
import React from "react";

const Sidebar = () => {
  return (
    <Box
      flex={1}
      p={2}
      sx={{ display: { xs: "none", sm: "block" } }}
      bgcolor="skyblue"
    >
      Sidebar
    </Box>
  );
};

export default Sidebar;
