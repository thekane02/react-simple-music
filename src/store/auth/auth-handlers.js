import { logOut, saveToken } from "utils/auth";
import {
  authGetCurrentUser,
  authLogin,
  authLogout,
  authUpdateCurrentUser,
} from "./auth-slice";
import Cookies from "js-cookie";

const { call, put } = require("@redux-saga/core/effects");
const {
  loginResquest,
  refreshTokenResquest,
  getCurrentUserResquest,
} = require("./auth-requests");

function* handleAuthLogin(action) {
  try {
    const response = yield call(loginResquest, action.payload);
    if (response.data.accessToken && response.data.refreshToken) {
      console.log("done");
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleGetCurrentUser, { payload: response.data.accessToken });
    }
  } catch (error) {
    console.log(error);
  }
}
function* handleGetCurrentUser(action) {
  const response = yield call(getCurrentUserResquest, action.payload);
  if (response.status === 200) {
    yield put(
      authGetCurrentUser({
        currentUser: response.data,
        accessToken: action.payload,
      })
    );
    Cookies.set("selected_user", response.data);
  }
}
function* handleAuthLogout() {
  yield put(
    authUpdateCurrentUser({
      currentUser: undefined,
      accessToken: null,
    })
  );
  logOut();
}
function* handleAuthRefreshToken(action) {
  try {
    const response = yield call(refreshTokenResquest, action.payload);
    if (response.data) {
      saveToken(response.data.accessToken, response.data.refreshToken);
      yield call(handleGetCurrentUser, { payload: response.data.accessToken });
    }
  } catch (error) {
    console.log(error);
  }
}

export {
  handleAuthLogin,
  handleAuthLogout,
  handleAuthRefreshToken,
  handleGetCurrentUser,
};
