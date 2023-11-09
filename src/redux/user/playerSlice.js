// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   currentSongs: [],
//   currentIndex: 0,
//   isActive: false,
//   isPlaying: false,
//   activeSong: {},
//   genreListId: "",
// };

// const playerSlice = createSlice({
//   name: "player",
//   initialState,
//   reducers: {
//     setActiveSong: (state, action) => {
//       state.activeSong = action.payload.song;

//       if (action.payload?.data?.tracks?.hits) {
//         state.currentSongs = action.payload.data.tracks.hits;
//       } else if (action.payload?.data?.properties) {
//         state.currentSongs = action.payload?.data?.tracks;
//       } else {
//         state.currentSongs = action.payload.data;
//       }

//       state.currentIndex = action.payload.i;
//       state.isActive = true;
//     },

//     nextSong: (state, action) => {
//       if (state.currentSongs[action.payload]?.track) {
//         state.activeSong = state.currentSongs[action.payload]?.track;
//       } else {
//         state.activeSong = state.currentSongs[action.payload];
//       }

//       state.currentIndex = action.payload;
//       state.isActive = true;
//     },

//     prevSong: (state, action) => {
//       if (state.currentSongs[action.payload]?.track) {
//         state.activeSong = state.currentSongs[action.payload]?.track;
//       } else {
//         state.activeSong = state.currentSongs[action.payload];
//       }

//       state.currentIndex = action.payload;
//       state.isActive = true;
//     },

//     playPause: (state, action) => {
//       state.isPlaying = action.payload;
//     },

//     selectGenreListId: (state, action) => {
//       state.genreListId = action.payload;
//     },
//   },
// });

// export const {
//   setActiveSong,
//   nextSong,
//   prevSong,
//   playPause,
//   selectGenreListId,
// } = playerSlice.actions;

// export default playerSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const playerSlice = createSlice({
  name: "playlist",
  initialState: {
    tracks: [], // Mảng chứa các bài hát trong playlist
    currentTrackIndex: 0, // Chỉ số của bài hát đang được phát
    isPlaying: false,
    trackActive: null,
    volume: 100,
  },
  reducers: {
    playTrack(state, action) {
      state.isPlaying = true;
      state.currentTrackIndex = action.payload;
      state.trackActive = state.tracks[0];
    },
    pauseTrack(state, action) {
      state.isPlaying = false;
      state.currentTrackIndex = action.payload;
    },
    playPause(state, action) {
      state.isPlaying = action.payload;
    },

    nextTrack(state) {
      if (state.currentTrackIndex < state.tracks.length - 1) {
        state.currentTrackIndex++;
      } else {
        state.currentTrackIndex = 0;
      }
    },

    prevTrack(state) {
      if (state.currentTrackIndex > 0) {
        state.currentTrackIndex--;
      } else {
        state.currentTrackIndex = state.tracks.length - 1;
      }
    },

    clearPlaylist(state) {
      state.tracks = [];
      state.currentTrackIndex = null;
      state.isPlaying = false;
      state.trackActive = null;
      state.volume = 100;
    },

    setPlaylist(state, action) {
      state.tracks = action.payload;
      state.currentTrackIndex = 0;
    },
    setActiveTrack(state, action) {
      state.trackActive = action.payload;
    },
    setVolume(state, action) {
      state.volume = action.payload;
    },
  },
});

export const {
  playTrack,
  pauseTrack,
  playPause,
  nextTrack,
  prevTrack,
  clearPlaylist,
  setPlaylist,
  setActiveTrack,
  setVolume,
} = playerSlice.actions;
export default playerSlice.reducer;
