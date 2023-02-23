import { Stack, Typography } from "@mui/material";
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
          <button
            className="category-btn"
            style={{
              background: category.name === selectedCategory && "#FC1503",
            }}
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
          >
            <Stack
              direction="row"
              spacing={{ xs: 1, sm: 2 }}
              alignItems="center"
            >
              {category.icon}
              <Typography
                variant="subtitle2"
                sx={{
                  opacity: category.name === selectedCategory ? "1" : "0.8",
                }}
              >
                {category.name}
              </Typography>
            </Stack>
          </button>
        );
      })}
    </Stack>
  );
};

export default Sidebar;
