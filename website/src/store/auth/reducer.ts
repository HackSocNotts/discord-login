import {
  logoutUser,
  loginUser,
  loginWithCustomToken,
  authError,
  updateProfile,
} from "./actions";
import { createReducer } from "@reduxjs/toolkit";
import { FullProfile } from "../../types/Profile";

export interface AuthState {
  loading: boolean;
  loggingIn: boolean;
  profile: Partial<FullProfile> | null;
  error: string | null;
  snapshotListener: (() => void) | null;
}

const initialState: AuthState = {
  loading: false,
  loggingIn: false,
  profile: null,
  error: null,
  snapshotListener: null,
};

const reducer = createReducer<AuthState>(initialState, (builder) =>
  builder
    .addCase(logoutUser.pending, (state) => ({
      ...state,
      profile: null,
      loggingIn: false,
      error: null,
    }))
    .addCase(logoutUser.fulfilled, (state) => ({
        ...state,
        snapshotListener: null,
    }))
    .addCase(loginUser.pending, (state, action) => ({
      ...state,
      loggingIn: false,
      profile: action.meta.arg,
    }))
    .addCase(loginUser.fulfilled, (state, action) => ({
        ...state,
        snapshotListener: action.payload,
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
    .addCase(updateProfile, (state, action) => ({
        ...state,
        profile: {
            ...action.payload,
        }
    }))
);

export default reducer;
