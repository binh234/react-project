import { Box, Typography } from "@mui/material";

function Copyright() {
  return (
    <Typography variant="body2" align="center">
      {"Copyright © "}
      {new Date().getFullYear()}
      {"."}
    </Typography>
  );
}

export default function Footer() {
  return (
    <footer className="footer">
      <Box component="footer">
        <Typography variant="subtitle1" align="center" component="p">
          Something here to give the footer a purpose!
        </Typography>
        <Copyright />
      </Box>
    </footer>
  );
};
