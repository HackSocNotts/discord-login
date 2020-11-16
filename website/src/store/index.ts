import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { loginUser } from "./auth";
import reducers from "./reducers";

const store = configureStore({
  reducer: reducers,
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [loginUser.fulfilled.toString()],
      ignoredPaths: ["auth.snapshotListener"],
    },
  }),
});

export default store;
