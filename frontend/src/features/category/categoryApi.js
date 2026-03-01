import api from "../../app/axiosInstance";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchCategory = createAsyncThunk(
  "category/fetchCategory",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get(
        `${import.meta.env.VITE_API_URL}category/category-list`,
        { withCredentials: true },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const createCategory = createAsyncThunk(
  "category/createCategory",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post(
        `${import.meta.env.VITE_API_URL}category`,
        formData,
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const editCategory = createAsyncThunk(
  "category/editCategory",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await api.put(
        `${import.meta.env.VITE_API_URL}category/${id}`,
        payload,
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const deleteCategory = createAsyncThunk(
  "category/deleteCategory",
  async (id, { rejectWithValue }) => {
    try {
      const res = await api.delete(
        `${import.meta.env.VITE_API_URL}category/${id}`,
        {
          withCredentials: true,
        },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);
