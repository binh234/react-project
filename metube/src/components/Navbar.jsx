import React, { useContext } from "react";
import { Box, ToggleButton, Divider, IconButton, Modal, Stack, styled, ToggleButtonGroup, Typography, useTheme } from "@mui/material";
import { Link } from "react-router-dom";
import { logo } from "../utils/constants";
import SearchBar from "./SearchBar";
import { Close, DarkMode, LightMode, SettingsOutlined } from "@mui/icons-material";
import ColorModeContext from "../theme/ColorModeContext";

const StyledModal = styled(Modal)({
  display: "flex",
  justifyContent: "flex-end",
  alignItems: "flex-start"
})

const Navbar = () => {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const {toggleColorMode} = useContext(ColorModeContext);

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
      <Box sx={{ flexGrow: 1 }} />
      <SearchBar />
      <IconButton aria-label="settings" color="primary" size="small" sx={{ border: "1px solid", borderRadius: 3 }} onClick={handleOpen} >
        <SettingsOutlined />
      </IconButton>
      <StyledModal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-settings"
        aria-describedby="modal-settings-description"
      >
        <Box bgcolor="background.paper" color="text.primary" sx={{
          position: 'absolute',
          width: { xs: 310, tb: 360 },
          height: "100%",
          boxShadow: 24,
          borderRadius: '10px 0 0 10px',
        }}>
          <Box display="flex" justifyContent="space-between" alignItems="center" p={2}>
            <Typography variant="body1" fontWeight={500}>Settings</Typography>
            <IconButton aria-label="close-settings" color="primary" size="small" onClick={handleClose}>
              <Close />
            </IconButton>
          </Box>
          <Divider />
          <Box p={2} >
            <Typography mt={2} mb={1} variant="subtitle1" textTransform="uppercase">Mode</Typography>
            <ToggleButtonGroup variant="outlined" aria-label="settings-mode" size="large" sx={{ width: "100%", justifyContent: "center" }} value={theme.palette.mode} color="primary">
              <ToggleButton value="light" sx={{ width: "100%", textTransform: "none" }} onClick={() => toggleColorMode("light")}>
                <LightMode sx={{ mr: 1 }} />
                Light
              </ToggleButton>
              <ToggleButton value="dark" sx={{ width: "100%", textTransform: "none" }} onClick={() => toggleColorMode("dark")}>
                <DarkMode sx={{ mr: 1 }} />
                Dark
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Box>
      </StyledModal>
    </Stack>
  );
};

export default Navbar;
