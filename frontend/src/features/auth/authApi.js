import { createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../app/axiosInstance";

// REGISTER
export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, { rejectWithValue }) => {
    try {
      const res = await api.post("users/register", formData);
      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// LOGIN
export const loginUser = createAsyncThunk(
  "auth/login",
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const res = await api.post("users/login", credentials, {
        withCredentials: true,
      });
      console.log("LOGIN RESPONSE:", res.data.access_token);
      // Save access token in redux
      // dispatch(setAccessToken(res.data.access_token));

      return res.data;
    } catch (err) {
      return rejectWithValue(err.response?.data?.message);
    }
  },
);

// CHECK AUTH
export const checkAuth = createAsyncThunk(
  "auth/checkAuth",
  async (_, { rejectWithValue }) => {
    try {
      const res = await api.get("users/me");
      return res.data;
    } catch {
      return rejectWithValue("Not authenticated");
    }
  },
);

// LOGOUT
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, { dispatch, rejectWithValue }) => {
    try {
      await api.post("users/logout");
      return true;
    } catch {
      return rejectWithValue("Logout failed");
    }
  },
);
