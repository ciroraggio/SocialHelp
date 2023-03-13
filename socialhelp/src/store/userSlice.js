import { createSlice } from "@reduxjs/toolkit";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    name: "Account",
    surname: "Test",
    location: "Rome, Italy",
    username: "account.test",
    phone: '555555555',
    email:'account@test.it',
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
  },
});

export const { setName, setSurname, setLocation, setUsername, setEmail, setPhone } =
  userSlice.actions;

export const userReducer = userSlice.reducer;
