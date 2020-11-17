import { createAsyncThunk } from "@reduxjs/toolkit";
import { joinDiscord as joinDiscordFunction } from "../../firebase/functions";

export const joinDiscord = createAsyncThunk("discord/join", async () => {
  try {
    await joinDiscordFunction();
  } catch (e) {
    throw e;
  }
});
