import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCheckLogin: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCheckLogin: (state) => {
      state.isCheckLogin = true;
    },
    setLogout: (state) => {
      state.isCheckLogin = false;
    },
  },
});

export const { setCheckLogin, setLogout } = authSlice.actions;
export default authSlice.reducer;
