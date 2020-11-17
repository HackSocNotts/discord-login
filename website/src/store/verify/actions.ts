import { createAsyncThunk } from "@reduxjs/toolkit";
import { verifyCode, verifyStart } from "../../firebase/functions";

export const startVerify = createAsyncThunk("verify/start", async () => {
  try {
    await verifyStart();
  } catch (e) {
    throw e;
  }
});

export const verifyWithCode = createAsyncThunk(
  "verify/useCode",
  async (code: string) => {
    try {
      const result = await verifyCode(code);

      if (result.data) {
        return;
      }

      throw new Error("Code is not valid");
    } catch (e) {
      throw e;
    }
  }
);
