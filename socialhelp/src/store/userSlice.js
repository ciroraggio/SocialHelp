import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "",
    surname: "",
    location: "",
    username: "",
    phone: "",
    email: "",
    following: [],
    token: "",
  },

  reducers: {
    setName: (state, action) => {
      state.name = action.payload;
    },
    setSurname: (state, action) => {
      state.surname = action.payload;
    },
    setLocation: (state, action) => {
      state.location = action.payload;
    },
    setUsername: (state, action) => {
      state.username = action.payload;
    },
    setEmail: (state, action) => {
      state.email = action.payload;
    },
    setPhone: (state, action) => {
      state.phone = action.payload;
    },
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setFollowing: (state, action) => {
      state.following = action.payload;
    },
    setUserData: (state, action) => {
      state.name = action.payload.user.name;
      state.surname = action.payload.user.surname;
      state.username = action.payload.user.username;
      state.location = action.payload.user.location;
      state.email = action.payload.user.email;
      state.phone = action.payload.user.phone;
      state.following = action.payload.user.following || state.following;
      state.token = action.payload.token || state.token;
    },
  },
});

export const {
  setName,
  setSurname,
  setLocation,
  setUsername,
  setEmail,
  setPhone,
  setUserData,
  setFollowing,
} = userSlice.actions;

export const userReducer = userSlice.reducer;
