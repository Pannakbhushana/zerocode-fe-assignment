import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./authSlice";
import chatReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    chat: chatReducer
  },
});

// TypeScript types
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
