import { createSlice } from "@reduxjs/toolkit";

export const loginSlice = createSlice({
  name: "login",
  initialState: {
    user: {
      name: " ",
      email: " ",
      contact: " ",
    },
  },
  reducers: {
    login: (state, action) => {
      state.user.name = action.payload.name;
      state.user.email = action.payload.email;
      state.user.contact = action.payload.contact;
    },
  },
});
export const { login } = loginSlice.actions;
export default loginSlice.reducer;
