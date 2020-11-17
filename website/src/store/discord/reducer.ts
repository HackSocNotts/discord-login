import { createReducer } from "@reduxjs/toolkit";
import { joinDiscord } from "./actions";

export interface DiscordState {
  loading: boolean;
  error: string | null;
}

const initialState: DiscordState = {
  loading: false,
  error: null,
};

const reducer = createReducer<DiscordState>(initialState, (builder) =>
  builder
    .addCase(joinDiscord.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(joinDiscord.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message as string,
    }))
    .addCase(joinDiscord.fulfilled, (state) => ({
      ...state,
      loading: false,
    }))
);

export default reducer;
