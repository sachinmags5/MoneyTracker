import axios from "axios";
import { store } from "./store";
import { setAccessToken, logoutSuccess } from "../features/auth/authSlice";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true, // required for refresh cookie
});

// Attach access token
api.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

//Response interceptor (refresh logic)
api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (
      error.response?.status === 401 &&
      !originalRequest._retry &&
      !originalRequest.url.includes("users/refresh")
    ) {
      originalRequest._retry = true;

      try {
        const res = await api.post("users/refresh");

        const newAccessToken = res.data.access_token; // IMPORTANT (see below)
        console.log(newAccessToken, "newAccessToken");
        store.dispatch(setAccessToken(newAccessToken));

        return api(originalRequest);
      } catch (refreshError) {
        store.dispatch(logoutSuccess());
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
export default api;
