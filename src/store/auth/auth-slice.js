const { createSlice } = require("@reduxjs/toolkit");

const authSlice = createSlice({
  name: "auth",
  initialState: {
    currentUser: null,
    accessToken: null,
  },
  reducers: {
    authLogin: (state, action) => {
      // state.auth.accessToken = action.payload;
    },
    authGetCurrentUser: (state, action) => ({
      ...state,
      ...action.payload,
    }),
    authUpdateCurrentUser: (state, action) => {
      state.currentUser = action.payload.currentUser;
      state.accessToken = action.payload.accessToken;
    },
    authRefreshToken: (state, action) => {},
    authLogout: () => ({}),
  },
});

export const {
  authLogin,
  authGetCurrentUser,
  authUpdateCurrentUser,
  authRefreshToken,
  authLogout,
} = authSlice.actions;
export default authSlice.reducer;
