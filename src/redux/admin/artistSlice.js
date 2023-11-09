import { createSlice } from "@reduxjs/toolkit";

const artistSlice = createSlice({
    name: "artist",
    initialState: {
        artists: {
            allArtist: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getArtistStart: (state) => {
            state.artists.isFetching = true;
        },
        getArtistSuccess: (state, action) => {
            state.artists.isFetching = false;
            state.artists.allArtist = action.payload;
            state.artists.error = false;
        },
        getArtistFailed: (state) => {
            state.artists.isFetching = false;
            state.artists.error = false;
        },
    },
});

export const { getArtistStart, getArtistSuccess, getArtistFailed } =
    artistSlice.actions;

export default artistSlice.reducer;