import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  users: [
    {
      id: 1,
      name: "Test1",
      email: "test@gmail.com",
      address: "F1-sarova,samata nagar",
    },
    {
      id: 2,
      name: "test2",
      email: "test@gmail.com",
      address: "D1-sarova,samata nagar",
    },
  ],
};
export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    someAction: function () {},
  },
});

export default userSlice.reducer;
