import { combineReducers } from "@reduxjs/toolkit";
import { reducer as AuthReducer } from "./auth";
import { reducer as TicketReducer } from "./ticket";

const reducers = combineReducers({
  auth: AuthReducer,
  ticket: TicketReducer,
});

export default reducers;
