import { configureStore } from "@reduxjs/toolkit";
import layoutReducer from "./slices/layoutSlice.js";
export const store = configureStore({
  reducer: {
    layout: layoutReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
