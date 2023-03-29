import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth";
import notificationSlice from "./notification";

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    notification: notificationSlice.reducer,
  },
});

export default store;
