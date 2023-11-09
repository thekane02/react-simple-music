import { createSlice } from "@reduxjs/toolkit";

const trackSlice = createSlice({
    name: "track",
    initialState: {
        tracks: {
            allTracks: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getTrackStart: (state) => {
            state.tracks.isFetching = true;
        },
        getTrackSuccess: (state, action) => {
            state.tracks.isFetching = false;
            state.tracks.allTracks = action.payload;
            state.tracks.error = false;
        },
        getTrackFailed: (state) => {
            state.tracks.isFetching = false;
            state.tracks.error = false;
        },
    },
});

export const { getTrackStart, getTrackSuccess, getTrackFailed } =
    trackSlice.actions;

export default trackSlice.reducer;