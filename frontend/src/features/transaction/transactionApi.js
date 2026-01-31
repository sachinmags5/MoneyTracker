import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTransaction = createAsyncThunk(
  "transaction/fetchTransaction",
  async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}transaction/transactions-list`,
        { withCredentials: true },
      );
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

export const createTransaction = createAsyncThunk(
  "transaction/createTransaction",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_API_URL}transaction`,
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

export const editTransaction = createAsyncThunk(
  "transaction/editTransaction",
  async ({ id, payload }, { rejectWithValue }) => {
    try {
      const res = await axios.put(
        `${import.meta.env.VITE_API_URL}transaction/${id}`,
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

export const deleteTransaction = createAsyncThunk(
  "transaction/deleteTransaction",
  async (id, { rejectWithValue }) => {
    try {
      const res = await axios.delete(
        `${import.meta.env.VITE_API_URL}transaction/${id}`,
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
