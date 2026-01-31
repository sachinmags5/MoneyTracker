import { configureStore } from "@reduxjs/toolkit";
import { userSlice } from "../features/user/userSlice";
import authReducer from "../features/auth/authSlice";
import categoryReducer from "../features/category/categorySlice";
import transactionreducer from "../features/transaction/transactionSlice";

export const store = configureStore({
  reducer: {
    // users: userSlice.reducer,
    auth: authReducer,
    category: categoryReducer,
    transaction: transactionreducer,
  },
});
