import { ENDPOINTS } from "../constants";

// Универсальная функция запроса
const fetchData = async (url) => {
  try {
    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Ошибка запроса: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};

// --- Категории ---
export const getCategories = () => fetchData(ENDPOINTS.categories);

// --- Скидки ---
export const getDiscounts = () => fetchData(ENDPOINTS.discounts);

// --- Все товары ---
export const getProducts = () => fetchData(ENDPOINTS.products);
