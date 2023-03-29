import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  newPostDialog: {
    open: false,
    data: null,
  },
  sharePostDialog: {
    open: false,
    data: null,
  },
  resolvePostDialog: {
    open: false,
    data: null,
  },
  postUrl: "",
};

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {
    setPostUrl: (state, action) => {
      state.postUrl = action.payload;
    },
    openNewPostDialog: (state, action) => {
      state.newPostDialog.open = true;
    },
    closeNewPostDialog: (state, action) => {
      state.newPostDialog.open = false;
    },
    openSharePostDialog: (state, action) => {
      state.sharePostDialog.open = true;
    },
    closeSharePostDialog: (state, action) => {
      state.sharePostDialog.open = false;
    },
    openResolvePostDialog: (state, action) => {
      state.resolvePostDialog.open = true;
      state.resolvePostDialog.data = action.payload;
    },
    closeResolvePostDialog: (state, action) => {
      state.resolvePostDialog.open = false;
    },
    resetPostState: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  setPostUrl,
  openNewPostDialog,
  closeNewPostDialog,
  openSharePostDialog,
  closeSharePostDialog,
  openResolvePostDialog,
  closeResolvePostDialog,
  resetPostState,
} = postSlice.actions;

export const postReducer = postSlice.reducer;
