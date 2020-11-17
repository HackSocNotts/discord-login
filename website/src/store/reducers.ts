import { combineReducers } from "@reduxjs/toolkit";
import { reducer as AuthReducer } from "./auth";
import { reducer as TicketReducer } from "./ticket";
import { reducer as VerifyReducer } from "./verify";

const reducers = combineReducers({
  auth: AuthReducer,
  ticket: TicketReducer,
  verify: VerifyReducer,
});

export default reducers;
