import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../constants'



export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const resp = await axios.get(`${BASE_URL}/products/all?discounts=true`)
    return resp.data
  }
)
export const fetchProductsByCategory = createAsyncThunk(
  "products/fetchByCategory",
  async (categoryId) => {
    const response = await axios.get(`${BASE_URL}/categories/${categoryId}`);
    return response.data;
  }
);