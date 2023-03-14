import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token: "",
    textSearch: "",
  },

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setTextSearch: (state, action) => {
      state.textSearch = action.payload;
    }
  },
});

export const {
  setToken,
  setTextSearch
} = appSlice.actions;

export const appReducer = appSlice.reducer;
