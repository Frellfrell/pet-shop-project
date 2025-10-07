import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants";

// Добавление товара в корзину
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async (product) => {
    
    return product;
  }
);
// Удаление товара из корзины по id
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async (productId) => {
    return productId;
  }
);

// Обновление количества товара в корзине
export const updateCartQuantity = createAsyncThunk(
  "cart/updateCartQuantity",
  async ({ productId, quantity }) => {
    return { productId, quantity };
  }
);

// Отправка заказа на сервер
export const sendOrder = createAsyncThunk(
  "cart/sendOrder",
  async (orderData, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${BASE_URL}/order/send`, orderData);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || "Ошибка отправки заказа");
    }
  }
);
