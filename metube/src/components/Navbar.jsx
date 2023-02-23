import React from "react";
import { Stack, Toolbar, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";

const Navbar = () => {
  return (
    <Stack
      position="sticky"
      direction="row"
      justifyContent="space-between"
      alignContent="center"
      spacing={2}
      p={2}
      top={0}
    >
      <Link to="/" className="flex-center">
        <Toolbar>
          <img src={logo} alt="logo" height={45} />
          <Typography
            ml={2}
            variant="h6"
            component="div"
            sx={{ display: { md: "block", xs: "none" } }}
          >
            MeTube
          </Typography>
        </Toolbar>
      </Link>
      <SearchBar />
    </Stack>
  );
};

export default Navbar;
