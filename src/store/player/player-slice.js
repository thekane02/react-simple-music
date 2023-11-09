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
