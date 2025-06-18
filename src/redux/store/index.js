import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import checkoutReducer from "./slices/checkoutSlice.js";
import productReducer from "./slices/productSlice.js";
import categoryReducer from "./slices/categorySlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    checkout: checkoutReducer,
    product: productReducer,
    category: categoryReducer,
  },
  devTools: process.env.NODE_ENV !== "production",
});
