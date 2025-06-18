import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isCheckLogin: false,
  userInfo: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCheckLogin: (state, action) => {
      if (action.payload) {
        state.isCheckLogin = true;
        state.userInfo = action.payload;
      } else {
        state.isCheckLogin = false;
        state.userInfo = null;
      }
    },
    setLogout: (state) => {
      state.isCheckLogin = false;
      state.userInfo = null;
    },
  },
});

export const { setCheckLogin, setLogout, setCheck } = authSlice.actions;
export default authSlice.reducer;
