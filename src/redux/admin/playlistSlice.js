import { createSlice } from "@reduxjs/toolkit";

const playlistSlice = createSlice({
    name: "playlist",
    initialState: {
        playlists: {
            allPlaylists: null,
            isFetching: false,
            error: false,
        },
    },
    reducers: {
        getPlaylistStart: (state) => {
            state.playlists.isFetching = true;
        },
        getPlaylistSuccess: (state, action) => {
            state.playlists.isFetching = false;
            state.playlists.allPlaylists = action.payload;
            state.playlists.error = false;
        },
        getPlaylistFailed: (state) => {
            state.playlists.isFetching = false;
            state.playlists.error = false;
        },
    },
});

export const { getPlaylistStart, getPlaylistSuccess, getPlaylistFailed } =
    playlistSlice.actions;

export default playlistSlice.reducer;