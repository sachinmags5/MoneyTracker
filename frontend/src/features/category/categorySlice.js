import {
  fetchCategory,
  createCategory,
  editCategory,
  deleteCategory,
} from "./categoryApi.js";
import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
  name: "category",
  initialState: {
    loading: false,
    error: null,
    success: false,
    Category: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch category
      .addCase(fetchCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.Category = action.payload;
      })
      .addCase(fetchCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //add category
      .addCase(createCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        if (state.Category && Array.isArray(state.Category.items)) {
          state.Category.items.push(action.payload);
        } else {
          state.Category = { items: [action.payload] };
        }
      })
      .addCase(createCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //edit category
      .addCase(editCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(editCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (state.Category && Array.isArray(state.Category.items)) {
          state.Category.items = state.Category.items.map((cat) =>
            cat._id === action.payload._id ? action.payload : cat,
          );
        }
      })
      .addCase(editCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })

      //delete category
      .addCase(deleteCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteCategory.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;

        if (state.Category && Array.isArray(state.Category.items)) {
          state.Category.items = state.Category.items.filter(
            (cat) => cat._id !== action.payload._id, // backend should return deleted id
          );
        }
      })
      .addCase(deleteCategory.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

// export const {  } = authSlice.actions;
export default categorySlice.reducer;
