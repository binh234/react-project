import { Button, Stack, Typography } from "@mui/material";
import React from "react";
import { categories } from "../utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { xs: "auto", md: "95%" },
        flexDirection: { md: "column" },
      }}
    >
      {categories.map((category) => {
        return (
          <Button
            color="inherit"
            className="category-btn"
            startIcon={category.icon}
            sx={{
              background: category.name === selectedCategory && "#FC1503",
              justifyContent: 'flex-start',
              borderRadius: 5,
              my: '5px'
            }}
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
          >
            <Typography
              variant="subtitle2"
              sx={{
                opacity: category.name === selectedCategory ? "1" : "0.8",
              }}
            >
              {category.name}
            </Typography>
          </Button>
        );
      })}
    </Stack>
  );
};

export default Sidebar;
