import { combineReducers } from "@reduxjs/toolkit";
import authSession from "./slices/authSession";
import client from "./slices/client";
import system from "./slices/system";

const rootReducer = combineReducers({
  authSession: authSession,
  client: client,
  system: system,
});

export default rootReducer;
