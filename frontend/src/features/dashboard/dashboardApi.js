import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axiosInstance";

export const fetchSummary = createAsyncThunk(
  "dashboard/getsummary",
  async ({ year, month }, { rejectWithValue }) => {
    try {
      const res = await api.get("stats/summary", {
        params: { year, month },
      });

      return res.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch summary",
      );
    }
  },
);
