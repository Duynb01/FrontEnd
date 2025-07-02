import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  key: "",
  products: [],
};

const searchSlice = createSlice({
  name: "search",
  initialState,
  reducers: {
    setProductWithSearch: (state, action) => {
      const { key, products } = action.payload;
      if (key) {
        state.key = key?.trim();
        state.products = products;
      } else {
        state.key = "";
        state.products = [];
      }
    },
  },
});

export const { setProductWithSearch } = searchSlice.actions;
export default searchSlice.reducer;
