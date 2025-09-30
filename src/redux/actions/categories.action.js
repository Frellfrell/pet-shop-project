
import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const baseUrl = 'http://localhost:3333';

export const fetchAllCategories = createAsyncThunk(
  'categories/fetchAll',
  async () => {
    const resp = await axios.get(`${baseUrl}/categories/all`);
    return resp.data;
  }
);