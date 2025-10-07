import { createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'
import { BASE_URL } from '../../constants'



export const fetchAllProducts = createAsyncThunk(
  'products/fetchAll',
  async () => {
    const resp = await axios.get(`${BASE_URL}/products/all`)
    return resp.data
  }
)

export const fetchProductById = createAsyncThunk(
  'products/fetchById',
  async (productId) => {
    const resp = await axios.get(`${BASE_URL}/products/${productId}`)
    return resp.data
  }
)

