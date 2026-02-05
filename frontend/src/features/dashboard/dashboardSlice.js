import { fetchSummary } from "./dashboardApi";
import { createSlice } from "@reduxjs/toolkit";

const summarySlice = createSlice({
  name: "summary",
  initialState: {
    loading: false,
    error: null,
    success: false,
    Summary: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Summary
      .addCase(fetchSummary.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchSummary.fulfilled, (state, action) => {
        state.loading = false;
        state.error = null;
        state.success = true;
        state.Summary = action.payload;
      })
      .addCase(fetchSummary.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {  } = summarySlice.actions;
export default summarySlice.reducer;
