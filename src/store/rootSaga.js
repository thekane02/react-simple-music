import { all, fork } from "@redux-saga/core/effects";
import authSaga from "./auth/auth-saga";

export default function* rootSaga() {
  yield all([fork(authSaga)]);
}
