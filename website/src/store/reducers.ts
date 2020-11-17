import { combineReducers } from "@reduxjs/toolkit";
import { reducer as AuthReducer } from "./auth";
import { reducer as TicketReducer } from "./ticket";
import { reducer as VerifyReducer } from "./verify";
import { reducer as DiscordReducer } from "./discord";

const reducers = combineReducers({
  auth: AuthReducer,
  ticket: TicketReducer,
  verify: VerifyReducer,
  discord: DiscordReducer,
});

export default reducers;
