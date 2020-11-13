import {
  logoutUser,
  loginUser,
  loginWithCustomToken,
  authError,
} from "./actions";
import { createReducer } from "@reduxjs/toolkit";
import { FullProfile } from "../../types/Profile";

export interface AuthState {
  loading: boolean;
  loggingIn: boolean;
  profile: Partial<FullProfile> | null;
  error: string | null;
}

const initialState: AuthState = {
  loading: false,
  loggingIn: false,
  profile: null,
  error: null,
};

const reducer = createReducer<AuthState>(initialState, (builder) =>
  builder
    .addCase(logoutUser, (state) => ({
      ...state,
      profile: null,
      loggingIn: false,
      error: null,
    }))
    .addCase(loginUser, (state, { payload: profile }) => ({
      ...state,
      loggingIn: false,
      profile,
    }))
    .addCase(authError, (state, { payload: error }) => ({
      ...state,
      error,
    }))
    .addCase(loginWithCustomToken.pending, (state) => ({
      ...state,
      loggingIn: true,
    }))
    .addCase(loginWithCustomToken.rejected, (state, { error }) => ({
      ...state,
      loggingIn: false,
      error: error.message as string,
    }))
);

export default reducer;
