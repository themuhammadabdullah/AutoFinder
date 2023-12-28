import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
  name: "admin",
  initialState: {
    isLoggedIn: false,
    token: null,
  },
  reducers: {
    AdminLoggedIn: (state, action) => {
      state.isLoggedIn = true;
      state.token = action.payload.token;
    },
    AdminLoggedOut: (state) => {
      state.isLoggedIn = false;
      state.token = null;
    },
  },
});

export const { AdminLoggedIn, AdminLoggedOut } = adminSlice.actions;

export default adminSlice.reducer;
