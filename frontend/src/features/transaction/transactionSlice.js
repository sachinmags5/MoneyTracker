import {
  fetchTransaction,
  createTransaction,
  editTransaction,
  deleteTransaction,
} from "./transactionApi.js";
import { createSlice } from "@reduxjs/toolkit";

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    loading: false,
    error: null,
    success: false,
    Transaction: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Transaction
      .addCase(fetchTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.Transaction = action.payload;
      })
      .addCase(fetchTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add Transaction
      .addCase(createTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (state.Transaction && Array.isArray(state.Transaction.items)) {
          state.Transaction.items.push(action.payload);
        } else {
          state.Transaction = { items: [action.payload] };
        }
      })
      .addCase(createTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //edit Transaction
      .addCase(editTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (state.Transaction && Array.isArray(state.Transaction.items)) {
          state.Transaction.items = state.Transaction.items.map((trans) =>
            trans._id === action.payload._id ? action.payload : trans,
          );
        }
      })
      .addCase(editTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete Transaction
      .addCase(deleteTransaction.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteTransaction.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (state.Transaction && Array.isArray(state.Transaction.items)) {
          state.Transaction.items = state.Transaction.items.filter(
            (trans) => trans._id !== action.payload._id, // backend should return deleted id
          );
        }
      })
      .addCase(deleteTransaction.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {  } = transactionSlice.actions;
export default transactionSlice.reducer;
