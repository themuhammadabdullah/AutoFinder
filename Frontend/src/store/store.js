// store.js
import { configureStore } from "@reduxjs/toolkit";
import authenticationReducer from "./authenticationSlice";
import adminReducer from "./adminSlice";
import navbarReducer from "./navbarSlice";
import cartReducer from "./cartSlice";
const store = configureStore({
  reducer: {
    authentication: authenticationReducer,
    admin: adminReducer,
    navbar: navbarReducer,
    cart: cartReducer,
  },
});

export default store;
