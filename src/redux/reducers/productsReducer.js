
import { createSlice } from "@reduxjs/toolkit";
import { fetchAllProducts, fetchProductById } from "../actions/products";

const initialState = {
  products: [],// список товаров
  currentProduct: {},
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
      .addCase(fetchProductById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Успешный ответ
      .addCase(fetchProductById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentProduct = action.payload[0]; // кладём в products список товаров
      })
      // Ошибка
      .addCase(fetchProductById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Ошибка загрузки";
      })
  },
});

export default productsSlice.reducer;