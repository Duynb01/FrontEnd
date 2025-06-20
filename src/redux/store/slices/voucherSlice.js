import { createSlice } from "@reduxjs/toolkit";

const initialState = [];

const voucherSlice = createSlice({
  name: "voucher",
  initialState,
  reducers: {
    setVoucher: (_, action) => {
      return action.payload;
    },
  },
});

export const { setVoucher } = voucherSlice.actions;
export default voucherSlice.reducer;
