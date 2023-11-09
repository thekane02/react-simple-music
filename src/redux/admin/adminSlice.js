import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    admins: {
      allAdmins: null,
      isFetching: false,
      error: false,
    },
  },
  reducers: {
    getAdminsStart: (state) => {
      state.admins.isFetching = true;
    },
    getAdminsSuccess: (state, action) => {
      state.admins.isFetching = false;
      state.admins.allAdmins = action.payload;
      state.admins.error = false;
    },
    getAdminsFailed: (state) => {
      state.admins.isFetching = false;
      state.admins.error = false;
    },
  },
});

export const { getAdminsStart, getAdminsSuccess, getAdminsFailed } =
  adminSlice.actions;

export default adminSlice.reducer;
