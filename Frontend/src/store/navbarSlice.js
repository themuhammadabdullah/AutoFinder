import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  activeTab: null,
};

const navbarSlice = createSlice({
  name: "navbar",
  initialState,
  reducers: {
    Activate: (state, action) => {
      return {
        ...state,
        activeTab: action.payload.user,
      };
    },
    Deactivate: (state, action) => {
      return {
        ...state,
        activeTab: null,
      };
    },
  },
});

export const { Activate, Deactivate } = navbarSlice.actions;

export default navbarSlice.reducer;
