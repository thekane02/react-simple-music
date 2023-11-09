import { createSlice } from "@reduxjs/toolkit";

const songsLikedSlice = createSlice({
  name: "songsLiked",
  initialState: {
    songsLiked: {
      data: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getSongsLikedStart: (state) => {
      state.songsLiked.isFetching = true;
    },
    getSongsLikedSuccess: (state, action) => {
      state.songsLiked.isFetching = false;
      state.songsLiked.data = action.payload;
      state.songsLiked.error = false;
    },
    getSongsLikedFailed: (state) => {
      state.songsLiked.isFetching = false;
      state.songsLiked.error = false;
    },
  },
});

export const { getSongsLikedStart, getSongsLikedSuccess, getSongsLikedFailed } =
  songsLikedSlice.actions;

export default songsLikedSlice.reducer;
