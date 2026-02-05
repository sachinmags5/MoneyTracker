import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

export const fetchSummary = createAsyncThunk(
  "dashboard/getsummary",
  async ({ year, month }, { rejectWithValue }) => {
    // async (_, { rejectWithValue }) => {
    try {
      const res = await axios.get(
        `${import.meta.env.VITE_API_URL}stats/summary`,
        {
          params: { year, month },
          // params: {},
          withCredentials: true,
        },
      );
      console.log("assasawws");
      return res.data;
    } catch (error) {
      console.log("assasas", error);
      return rejectWithValue(error.response?.data?.message);
    }
  },
);
