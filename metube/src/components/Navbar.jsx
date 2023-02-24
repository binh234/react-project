import React from "react";
import { Stack, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => {
  const theme = useTheme();
  return (
    <Stack
      position="sticky"
      direction="row"
      justifyContent="space-between"
      alignItems="center"
      spacing={2}
      p={2}
      top={0}
    >
      <Link to="/" className="flex-center" style={{ color: theme.palette.text.primary }}>
        <Stack direction="row" alignItems="center">
          <img src={logo} alt="logo" height={45} />
          <Typography
            ml={2}
            variant="h6"
            component="div"
            sx={{ display: { md: "block", xs: "none" } }}
          >
            MeTube
          </Typography>
        </Stack>
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
