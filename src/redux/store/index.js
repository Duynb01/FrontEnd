import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slices/authSlice.js";
import checkoutReducer from "./slices/checkoutSlice.js";
import productReducer from "./slices/productSlice.js";
import categoryReducer from "./slices/categorySlice.js";
import userReducer from "./slices/userSlice.js";
import voucherReduce from "./slices/voucherSlice.js";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    user: userReducer,
    checkout: checkoutReducer,
    product: productReducer,
    category: categoryReducer,
    voucher: voucherReduce,
  },
  devTools: process.env.NODE_ENV !== "production",
});
