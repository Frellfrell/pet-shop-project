
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { BASE_URL } from "../../constants";

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAll',
  async () => {
    try {
      const response = await axios.get(`${BASE_URL}/categories/all`);
      return response.data; // возвращаем данные
    } catch (error) {
      console.error("Ошибка при загрузке категорий:", error);
      throw error;
    }
  }
);

export const fetchProductsByCategory = createAsyncThunk(
  "categories/fetchProductsByCategory",
  async (categoryId) => {
    const response = await axios.get(`${BASE_URL}/categories/${categoryId}`);
    return response.data;
  }
);