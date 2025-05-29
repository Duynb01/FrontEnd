// src/redux/layoutSlice.js
import { createSlice } from "@reduxjs/toolkit";

const layoutSlice = createSlice({
  name: "layout",
  initialState: {
    showHeader: true,
    showFooter: true,
  },
  reducers: {
    setLayout: (state, action) => {
      return { ...state, ...action.payload };
    },
    resetLayout: () => {
      return { showHeader: true, showFooter: true };
    },
  },
});

export const { setLayout, resetLayout } = layoutSlice.actions;
export default layoutSlice.reducer;
