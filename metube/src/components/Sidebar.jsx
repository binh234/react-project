import { Stack, Typography } from "@mui/material";
import { useTheme } from "@emotion/react";
import React from "react";
import { categories } from "../utils/constants";

const Sidebar = ({ selectedCategory, setSelectedCategory }) => {
  const theme = useTheme();
  return (
    <Stack
      direction="row"
      sx={{
        overflowY: "auto",
        height: { xs: "auto", tb: "95%" },
        flexDirection: { tb: "column" },
      }}
      className="no-scrollbar-y"
    >
      {categories.map((category) => {
        return (
          <button
            className="category-btn"
            style={{
              background: category.name === selectedCategory && "#FC1503",
              color: theme.palette.text.primary
            }}
            key={category.name}
            onClick={() => setSelectedCategory(category.name)}
          >
            {category.icon}
            <Typography
              variant="subtitle2"
              sx={{
                opacity: category.name === selectedCategory ? "1" : "0.8",
                ml: '5px'
              }}
            >
              {category.name}
            </Typography>
          </button>
        );
      })}
    </Stack>
  );
};

export default Sidebar;
