import authReducer from "./auth/auth-slice";
import playerReducer from "./player/player-slice";
import globalReducer from "./global/global-slice";

const { combineReducers } = require("redux");

export const reducer = combineReducers({
  auth: authReducer,
  player: playerReducer,
  global: globalReducer,
});
