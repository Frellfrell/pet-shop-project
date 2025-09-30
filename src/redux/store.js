import { configureStore } from "@reduxjs/toolkit";
import categoriesReducer from "./reducers/categories.reducer";

export const store = configureStore({
  reducer: {
    categories: categoriesReducer
  }
});
