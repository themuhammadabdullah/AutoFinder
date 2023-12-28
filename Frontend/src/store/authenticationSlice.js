import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  token: null,
};
const authenticationSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    SignUp: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
    login: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
        token: action.payload.token,
      };
    },
    logout: (state) => {
      return {
        ...state,
        user: null,
        token: null,
      };
    },
    UpdateUser: (state, action) => {
      return {
        ...state,
        user: action.payload.user,
      };
    },
    userLoggedIn: (state) => {
      return {
        ...state,
        userLoggedIn: false,
      };
    },
    userEmailVerified: (state) => {
      return {
        ...state,
        verified: true,
      };
    },
  },
});

export const {
  SignUp,
  login,
  logout,
  UpdateUser,
  userLoggedIn,
  userEmailVerified,
} = authenticationSlice.actions;

export default authenticationSlice.reducer;
