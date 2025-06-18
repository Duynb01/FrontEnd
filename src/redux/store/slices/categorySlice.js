import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const categorySlice = createSlice({
  name: "category",
  initialState,
  reducers: {
    setCategory: (_, action) => {
      return action.payload;
    },
  },
});

export const { setCategory } = categorySlice.actions;
export default categorySlice.reducer;
