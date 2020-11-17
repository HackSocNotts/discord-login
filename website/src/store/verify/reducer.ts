import { createReducer } from "@reduxjs/toolkit";
import { startVerify, verifyWithCode } from "./actions";

export interface VerifyState {
  loading: boolean;
  error: string | null;
}

const initialState: VerifyState = {
  loading: false,
  error: null,
};

const reducer = createReducer<VerifyState>(initialState, (builder) =>
  builder
    .addCase(startVerify.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(startVerify.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message as string,
    }))
    .addCase(startVerify.fulfilled, (state) => ({
      ...state,
      loading: false,
    }))
    .addCase(verifyWithCode.pending, (state) => ({
      ...state,
      loading: true,
      error: null,
    }))
    .addCase(verifyWithCode.fulfilled, (state) => ({
      ...state,
      loading: false,
      error: null,
    }))
    .addCase(verifyWithCode.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message as string,
    }))
);

export default reducer;
