import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./reducers/categories.reducer";
import productsReducer from "./reducers/productsReducer";
import cartReducer from './reducers/cart';


export const store = configureStore({
  reducer: {
    categories: categoriesReducer,
    products: productsReducer,
    cart: cartReducer,
  },
  devTools: true,
});
