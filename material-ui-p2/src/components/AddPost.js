import {
  Add,
  DateRange,
  EmojiEmotionsOutlined,
  Image,
  PersonAdd,
  VideoCameraBack,
} from "@mui/icons-material";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Fab,
  Modal,
  styled,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import { orange } from "@mui/material/colors";
import { Stack } from "@mui/system";
import React, { useState } from "react";

const StyledBox = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "80%",
  backgroundColor: theme.palette.background.paper,
  color: theme.palette.text.primary,
  [theme.breakpoints.up("sm")]: {
    width: 400,
  },
}));

const UserBox = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "10px",
  marginBottom: 2,
});

const AddPost = () => {
  const [open, setOpen] = useState(false);
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <>
      <Tooltip
        title="Add post"
        onClick={() => {
          setOpen(true);
        }}
        sx={{
          position: "fixed",
          bottom: 20,
          left: { xs: "calc(50% - 25px)", md: 30 },
        }}
      >
        <Fab color="primary" aria-label="add">
          <Add />
        </Fab>
      </Tooltip>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <StyledBox p={3} borderRadius={5} boxShadow={24}>
          <Typography id="modal-modal-title" variant="h6" textAlign="center">
            Create post
          </Typography>
          <UserBox>
            <Avatar
              src="https://material-ui.com/static/images/avatar/3.jpg"
              sx={{ width: 30, height: 30 }}
            />
            <Typography variant="span" fontWeight={500}>
              Anna
            </Typography>
          </UserBox>
          <TextField
            id="outlined-textarea"
            label="What's on your mind"
            placeholder="What's on your mind"
            multiline
            fullWidth
            margin="normal"
            rows={4}
          />
          <Stack direction="row" spacing={2} mb={2} mt={1}>
            <EmojiEmotionsOutlined color="primary" />
            <Image color="secondary" />
            <VideoCameraBack color="success" />
            <PersonAdd sx={{ color: orange[500] }} />
          </Stack>
          <ButtonGroup
            fullWidth
            variant="contained"
            aria-label="outlined primary button group"
          >
            <Button>Post</Button>
            <Button sx={{ width: 100 }}>
              <DateRange />
            </Button>
          </ButtonGroup>
        </StyledBox>
      </Modal>
    </>
  );
};

export default AddPost;
