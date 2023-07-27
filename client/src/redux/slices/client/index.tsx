import { combineReducers } from "@reduxjs/toolkit";
import spaces from "./spaces";

const rootReducer = combineReducers({
  spaces,
});

export default rootReducer;
