import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const checkoutSlice = createSlice({
  name: "checkout",
  initialState,
  reducers: {
    setCartItem: (state, action) => {
      const items = action.payload;
      items.forEach((item) => {
        const existingItem = state.find((i) => i.id === item.cartItemId);
        if (existingItem) {
          existingItem.quantity += item.quantity;
        } else {
          state.push({ ...item, quantity: item.quantity });
        }
      });
    },
  },
});

export const { setCartItem, setProduct } = checkoutSlice.actions;
export default checkoutSlice.reducer;
