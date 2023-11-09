import { createSlice } from "@reduxjs/toolkit";

const homePageSlice = createSlice({
  name: "homePage",
  initialState: {
    homePage: {
      data: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getHomePageStart: (state) => {
      state.homePage.isFetching = true;
    },
    getHomePageSuccess: (state, action) => {
      state.homePage.isFetching = false;
      state.homePage.data = action.payload;
      state.homePage.error = false;
    },
    getHomePageFailed: (state) => {
      state.homePage.isFetching = false;
      state.homePage.error = false;
    },
  },
});

export const { getHomePageStart, getHomePageSuccess, getHomePageFailed } =
  homePageSlice.actions;

export default homePageSlice.reducer;
