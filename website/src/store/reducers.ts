import { combineReducers } from "@reduxjs/toolkit";
import { reducer as AuthReducer } from "./auth";

const reducers = combineReducers({
  auth: AuthReducer,
});

export default reducers;
