import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { createSelectorHook } from "react-redux";
import { loginUser } from "./auth";
import reducers from "./reducers";

export type RootState = ReturnType<typeof reducers>;

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [loginUser.fulfilled.toString()],
      ignoredPaths: ["auth.snapshotListener"],
    },
  }),
});
export type AppDispatch = typeof store.dispatch;


export const useTypedSelector = createSelectorHook<RootState>();

export default store;
