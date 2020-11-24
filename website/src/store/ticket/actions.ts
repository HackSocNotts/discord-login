import { createAction, createAsyncThunk } from "@reduxjs/toolkit";
import {
  titoClear,
  titoConfirm,
  titoLookup,
  titoRefresh,
} from "../../firebase/functions";
import { Ticket } from "../../types/Ticket";

export const lookupTicket = createAsyncThunk(
  "ticket/lookup",
  async (searchParams: { email: string; reference: string }) => {
    try {
      const result = await titoLookup(searchParams);
      return result.data as Ticket;
    } catch (e) {
      if (e.code) {
        switch (e.code) {
          case "permission-denied":
            throw new Error(e.message);

          case "not-found":
            throw new Error(e.message);
        }
      }

      throw new Error("An unknown error occurred.");
    }
  }
);

export const confirmTicket = createAsyncThunk(
  "ticket/confirm",
  async (slug: string) => {
    try {
      await titoConfirm(slug);
      return;
    } catch (e) {
      switch (e.code) {
        case "not-found":
          throw new Error(e.message);
        case "invalid-argument":
          throw new Error(e.message);
      }

      throw new Error("An unknown error occurred.");
    }
  }
);

export const clearTicket = createAsyncThunk("ticket/clear", async () => {
  try {
    await titoClear();
    return;
  } catch (e) {
    if (e.code) {
      switch (e.code) {
        case "permission-denied":
          throw new Error(e.message);

        case "not-found":
          throw new Error(e.message);
      }
    }

    throw new Error(e.message);
  }
});

export const refreshTicket = createAsyncThunk("ticket/refresh", async () => {
  try {
    await titoRefresh();
    return;
  } catch (e) {
    if (e.code) {
      switch (e.code) {
        case "permission-denied":
          throw new Error(e.message);

        case "not-found":
          throw new Error(e.message);
      }
    }

    throw new Error("An unknown error occurred.");
  }
});

export const clearSearch = createAction("ticket/clearSearch");
