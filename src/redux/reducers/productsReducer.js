
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts } from "../actions/products";

const initialState = {
  items: [],      // список товаров
  loading: false, // индикатор загрузки
  error: null,    // ошибка запроса
};

const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Загрузка началась
      .addCase(fetchAllProducts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Успешный ответ
      .addCase(fetchAllProducts.fulfilled, (state, action) => {
        state.loading = false;
        state.items = action.payload; // кладём в items список товаров
      })
      // Ошибка
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки";
      });
  },
});

export default productsSlice.reducer;