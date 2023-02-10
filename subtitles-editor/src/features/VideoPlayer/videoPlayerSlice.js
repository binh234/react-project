import { createSlice } from "@reduxjs/toolkit";
/* eslint-disable no-param-reassign */
export const videoPlayerSlice = createSlice({
  name: "player",
  initialState: {
    videoDuration: 0,
    currentTime: 0,
  },
  reducers: {
    updateDuration: (state, action) => {
      state.videoDuration = action.payload.videoDuration;
    },
    updateCurrentTime: (state, action) => {
      state.currentTime = action.payload.currentTime;
    },
  },
});

export const { updateDuration, updateCurrentTime } = videoPlayerSlice.actions;

export default videoPlayerSlice.reducer;
