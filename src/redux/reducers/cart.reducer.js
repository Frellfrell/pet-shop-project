import { createSlice } from "@reduxjs/toolkit";
import { addToCart, removeFromCart, updateCartQuantity, sendOrder } from "../actions/cart.actions";

const initialState = {
  items: [],       // товары в корзине
  loading: false,  // индикатор загрузки для отправки заказа
  error: null,     // ошибки
  orderSuccess: false, // флаг успешной отправки заказа
};

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    // Если нужно, можно добавить синхронные методы
    clearCart(state) {
      state.items = [];
    }
  },
  extraReducers: (builder) => {
    builder
      // Добавление товара
      .addCase(addToCart.fulfilled, (state, action) => {
        const product = action.payload;
        const existing = state.items.find(item => item.id === product.id);
        if (existing) {
          existing.quantity += 1;
        } else {
          state.items.push({ ...product, quantity: 1 });
        }
      })
      // Удаление товара
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.items = state.items.filter(item => item.id !== action.payload);
      })
      // Обновление количества
      .addCase(updateCartQuantity.fulfilled, (state, action) => {
        const { productId, quantity } = action.payload;
        const item = state.items.find(i => i.id === productId);
        if (item) item.quantity = quantity;
      })
      // Отправка заказа
      .addCase(sendOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.orderSuccess = false;
      })
      .addCase(sendOrder.fulfilled, (state) => {
        state.loading = false;
        state.items = []; // очищаем корзину после успешной отправки
        state.orderSuccess = true;
      })
      .addCase(sendOrder.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Ошибка отправки заказа";
      });
  }
});

export const { clearCart } = cartSlice.actions;
export default cartSlice.reducer
