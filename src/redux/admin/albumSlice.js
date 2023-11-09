import { createSlice } from "@reduxjs/toolkit";

const albumSlice = createSlice({
    name: "album",
    initialState: {
        albums: {
            allAlbums: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getAlbumsStart: (state) => {
            state.albums.isFetching = true;
        },
        getAlbumsSuccess: (state, action) => {
            state.albums.isFetching = false;
            state.albums.allAlbums = action.payload;
            state.albums.error = false;
        },
        getAlbumsFailed: (state) => {
            state.albums.isFetching = false;
            state.albums.error = false;
        },
    },
});

export const { getAlbumsStart, getAlbumsSuccess, getAlbumsFailed } =
    albumSlice.actions;

export default albumSlice.reducer;