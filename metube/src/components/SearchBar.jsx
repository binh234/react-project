import React, { useRef} from "react";
import { useNavigate } from "react-router-dom";
import { Paper, IconButton, Input } from "@mui/material";
import { Search } from "@mui/icons-material";

const SearchBar = () => {
  const inputRef = useRef(null);
  const navigate = useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputRef.current.value) {
      navigate(`/search/${inputRef.current.value}`)
      inputRef.current.value = "";
    }
  }
  return (
    <Paper
      component="form"
      onSubmit={handleSubmit}
      sx={{
        borderRadius: 20,
        border: "1px solid #e3e3e3",
        pl: 2,
        boxShadow: "none",
        mr: { sm: 5 },
      }}
    >
      <Input
        id="outlined-label-small"
        className="search-bar"
        placeholder="Search..."
        inputRef={inputRef}
      />
      <IconButton type="submit" sx={{p: '10px'}}>
        <Search />
      </IconButton>
    </Paper>
  );
};

export default SearchBar;
