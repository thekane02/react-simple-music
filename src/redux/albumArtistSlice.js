import { createSlice } from "@reduxjs/toolkit";

const albumArtistSlice = createSlice({
    name: "albumArtist",
    initialState: {
        albumArtists: {
            allAlbumArtists: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getArtistAlbumStart: (state) => {
            state.albumArtists.isFetching = true;
        },
        getArtistAlbumSuccess: (state, action) => {
            state.albumArtists.isFetching = false;
            state.albumArtists.allAlbumArtists = action.payload;
            state.albumArtists.error = false;
        },
        getAritstAlbumFailed: (state) => {
            state.albumArtists.isFetching = false;
            state.albumArtists.error = false;
        },
    },
});

export const { getArtistAlbumStart, getArtistAlbumSuccess, getAritstAlbumFailed } =
    albumArtistSlice.actions;

export default albumArtistSlice.reducer;