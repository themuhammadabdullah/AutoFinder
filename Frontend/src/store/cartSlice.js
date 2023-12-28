import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
  orderQuantities: {},
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    AddToCart: (state, action) => {
      state.orders = [...state.orders, action.payload.orders];
    },
    removeFromCart: (state, action) => {
      state.orders = state.orders.filter(
        (order) => order._id !== action.payload
      );
    },
    clearCart: (state) => {
      state.orders = [];
    },
    orderToBeUpdated: (state, action) => {
      state.orders = [...state.orders, action.payload.orders];
    },
    isCartEmpty: (state) => {
      return {
        ...state,
        Yes: true,
      };
    },
  },
});

export const {
  AddToCart,
  removeFromCart,
  clearCart,
  orderToBeUpdated,
  isCartEmpty,
} = cartSlice.actions;

export default cartSlice.reducer;
