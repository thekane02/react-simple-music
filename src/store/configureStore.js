import logger from "redux-logger";
import { reducer } from "./reducers";
import createSagaMiddleware from "@redux-saga/core";
import rootSaga from "./rootSaga";
const { configureStore } = require("@reduxjs/toolkit");

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
  reducer,
  middleware: (gDM) => gDM().concat(logger, sagaMiddleware),
});

sagaMiddleware.run(rootSaga);
