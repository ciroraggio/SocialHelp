import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    token:'',
    textSearch: '',
    resolveDialog: {
        open: false,
        data: null
    },
  },

  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setTextSearch: (state, action) => {
      state.textSearch = action.payload;
    },
    openResolveDialog: (state, action) => {
      state.resolveDialog.open = true;
    },
    closeResolveDialog: (state, action) => {
      state.resolveDialog.open = false;
    },
  },
});

export const { setToken, setTextSearch, openResolveDialog, closeResolveDialog } =
  appSlice.actions;

export const appReducer = appSlice.reducer;
