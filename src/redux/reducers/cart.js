import { createSlice } from "@reduxjs/toolkit";
import { countCartItems } from "../../services/cartHelper";

const initialState = {
  cartCounter: countCartItems(),

};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    recalculateCart(state) {
      state.cartCounter = countCartItems()
    },
  },
});

export const { recalculateCart } = cartSlice.actions;
export default cartSlice.reducer
