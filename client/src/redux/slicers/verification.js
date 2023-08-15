import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  loginStatus: 400,
  isLoading: true,
};

const authReducer = createSlice({
  name: "session",
  initialState,
  reducers: {
    verifyToken: (state, action) => {
      state.loginStatus = action.payload;
      state.isLoading = false;
    },
  },
});

export const { verifyToken } = authReducer.actions;
export const tokenReducer = authReducer.reducer;
