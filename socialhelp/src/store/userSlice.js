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
    setUserData: (state, action) => {
      state.name = action.payload.name;
      state.surname = action.payload.surname;
      state.username = action.payload.username;
      state.location = action.payload.location;
      state.email = action.payload.email;
      state.phone = action.payload.phone;
    }
  },
});

export const { setName, setSurname, setLocation, setUsername, setEmail, setPhone, setUserData} =
  userSlice.actions;

export const userReducer = userSlice.reducer;
