import { createSlice } from "@reduxjs/toolkit";

const trackArtistSlice = createSlice({
  name: "trackArtist",
  initialState: {
    trackArtists: {
      allTrackArtists: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getTrackArtistStart: (state) => {
      state.trackArtists.isFetching = true;
    },
    getTrackArtistSuccess: (state, action) => {
      state.trackArtists.isFetching = false;
      state.trackArtists.allTrackArtists = action.payload;
      state.trackArtists.error = false;
    },
    getTrackArtistFailed: (state) => {
      state.trackArtists.isFetching = false;
      state.trackArtists.error = false;
    },
  },
});

export const {
  getTrackArtistStart,
  getTrackArtistSuccess,
  getTrackArtistFailed,
} = trackArtistSlice.actions;

export default trackArtistSlice.reducer;
