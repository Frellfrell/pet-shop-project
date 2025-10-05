
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductsByCategory } from "../actions/products";

const initialState = {
  products: [],// список товаров
  categoryProducts: [],      // список товаров по категории
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
        state.products = action.payload; // кладём в products список товаров
      })
      // Ошибка
      .addCase(fetchAllProducts.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки";
      })
      // Загрузка товаров по категории
      .addCase(fetchProductsByCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchProductsByCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.categoryProducts = action.payload.products; // предполагается, что API возвращает { products: [...] }
      })
      .addCase(fetchProductsByCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки товаров по категории";
      });
  },
});

export default productsSlice.reducer;