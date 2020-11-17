import { createReducer } from "@reduxjs/toolkit";
import { Ticket } from "../../types/Ticket";
import {
  clearSearch,
  clearTicket,
  confirmTicket,
  lookupTicket,
} from "./actions";

export interface TicketState {
  ticket: Ticket | null;
  loading: boolean;
  error: string | null;
}

const initialState: TicketState = {
  ticket: null,
  loading: false,
  error: null,
};

const reducer = createReducer<TicketState>(initialState, (builder) =>
  builder
    .addCase(lookupTicket.pending, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(lookupTicket.fulfilled, (state, action) => ({
      ...state,
      loading: false,
      ticket: action.payload,
      error: null,
    }))
    .addCase(lookupTicket.rejected, (state, action) => ({
      ...state,
      loading: false,
      error: action.error.message as string,
    }))
    .addCase(clearSearch, (state) => ({
      ...state,
      ticket: null,
    }))
    .addCase(confirmTicket.pending, (state) => ({
      ...state,
      loading: true,
    }))
    .addCase(confirmTicket.fulfilled, (state) => ({
      ...state,
      loading: false,
    }))
    .addCase(confirmTicket.rejected, (state, { error }) => ({
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
    .addCase(clearTicket.rejected, (state) => ({
      ...state,
      loading: false,
    }))
);

export default reducer;
