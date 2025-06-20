import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userInfo: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setProfile: (state, action) => {
      if (action.payload) {
        state.userInfo = action.payload;
      } else {
        state.userInfo = null;
      }
    },
    deleteProfile: (state) => {
      state.userInfo = null;
    },
  },
});

export const { setProfile, deleteProfile } = userSlice.actions;
export default userSlice.reducer;
