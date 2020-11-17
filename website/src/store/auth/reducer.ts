import {
  logoutUser,
  loginUser,
  loginWithCustomToken,
  authError,
  updateProfile,
  getAuthProfile,
} from "./actions";
import { createReducer } from "@reduxjs/toolkit";
import { FullProfile } from "../../types/Profile";
import { clearTicket } from "../ticket";

export interface AuthState {
  loading: boolean;
  loggingIn: boolean;
  profile: Partial<FullProfile> | null;
  authProfile: {
    email: string | null;
    phoneNumber: string | null;
    fullName: string | null;
  } | null;
  error: string | null;
  snapshotListener: (() => void) | null;
}

const initialState: AuthState = {
  loading: false,
  loggingIn: false,
  profile: null,
  authProfile: null,
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
    .addCase(updateProfile.fulfilled, (state, action) => ({
        ...state,
        profile: {
            ...action.payload,
        }
    }))
    .addCase(updateProfile.rejected, (state, {error}) => ({
      ...state,
      error: error.message as string,
    }))
    .addCase(getAuthProfile.pending, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(getAuthProfile.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      authProfile: action.payload,
    }))
    .addCase(getAuthProfile.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message as string,
    }))
    .addCase(clearTicket.pending, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(clearTicket.fulfilled, (state) => ({
      ...state,
      loading: false,
    }))
    .addCase(clearTicket.rejected, (state, { error }) => ({
      ...state,
      loading: false,
      error: error.message as string,
    }))
);

export default reducer;
