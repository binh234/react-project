import { createSlice } from "@reduxjs/toolkit";
/* eslint-disable no-param-reassign */
export const subtitlesPlayerSlice = createSlice({
  name: "subtitles",
  initialState: {
    activeSubtitle: {},
  },
  reducers: {
    updateActiveSubtitle: (state, action) => {
      state.activeSubtitle = action.payload.activeSubtitle;
    },
  },
});

export const { updateActiveSubtitle } = subtitlesPlayerSlice.actions;

export default subtitlesPlayerSlice.reducer;
