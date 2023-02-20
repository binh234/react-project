import { AppBar, Typography, Toolbar } from "@mui/material";
import { PhotoCamera } from "@mui/icons-material";

export default function Header() {
  return (
    <AppBar position="relative">
      <Toolbar>
        <PhotoCamera className="photo-icon" />
        <Typography variant="h6">Photo Album</Typography>
      </Toolbar>
    </AppBar>
  );
}
