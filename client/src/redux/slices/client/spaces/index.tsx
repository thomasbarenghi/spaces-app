import { combineReducers } from "@reduxjs/toolkit";
import spaces from "./spaces";
import rooms from "./rooms";
import tasks from "./tasks";
import files from "./files";

const rootReducer = combineReducers({
  spaces,
  rooms,
  tasks,
  files,
});

export default rootReducer;
