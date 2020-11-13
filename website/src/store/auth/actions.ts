import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Profile } from "../../types/Profile";
import firebase from "firebase";

export const loginUser = createAction<Profile>("auth/login");
export const logoutUser = createAction("auth/logout");
export const authError = createAction<string>("auth/error");

export const loginWithCustomToken = createAsyncThunk(
  "auth/loginWithCustomToken",
  async (token: string) => {
    try {
      await firebase.auth().signInWithCustomToken(token);
      return;
    } catch (e) {
      if (e.code === "auth/custom-token-mismatch") {
        throw new Error(
          'An authentication error occurred, the server appears to be misconfigured. Please notify the developer, citing error code "auth/custom-token-mismatch".'
        );
      }

      if (e.code === "auth/invalid-custom-token") {
        throw new Error(
          'An authentication error occurred, the server appears to be misconfigured. Please notify the developer, citing error code "auth/invalid-custom-token".'
        );
      }

      console.error(e);

      throw new Error("An unknown authentication error has occurred.");
    }
  }
);
