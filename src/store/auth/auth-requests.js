import axios from "api/axios";

const loginResquest = (code) =>
  axios.post("/auth/login", {
    code: code,
  });
const logoutResquest = (isLogout) =>
  axios.post("/auth/logout", {
    params: {
      all: isLogout,
    },
  });
const getCurrentUserResquest = (token) => {
  return axios.get("/user", {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
};
const refreshTokenResquest = (tokens) => {
  if (!tokens && tokens.length === 0) return;
  return axios.post(
    "/auth/refresh",
    {
      refreshToken: tokens.refreshToken,
    },
    {
      headers: {
        Authorization: `Bearer ${tokens.accessToken}`,
      },
    }
  );
};

export {
  loginResquest,
  logoutResquest,
  getCurrentUserResquest,
  refreshTokenResquest,
};
