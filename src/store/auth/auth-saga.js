import { takeLatest } from "@redux-saga/core/effects";
import {
  handleAuthLogin,
  handleAuthLogout,
  handleAuthRefreshToken,
  handleGetCurrentUser,
} from "./auth-handlers";
import {
  authGetCurrentUser,
  authLogin,
  authLogout,
  authRefreshToken,
} from "./auth-slice";

export default function* authSaga() {
  yield takeLatest(authLogin.type, handleAuthLogin);
  yield takeLatest(authLogout.type, handleAuthLogout);
  yield takeLatest(authRefreshToken.type, handleAuthRefreshToken);
  // yield takeLatest(authGetCurrentUser.type, handleGetCurrentUser);
}
