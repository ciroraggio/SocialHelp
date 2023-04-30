import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appSlice";
import { postReducer } from "./postSlice";
import { userReducer } from "./userSlice";

const rootReducer = {
  user: userReducer,
  app: appReducer,
  post: postReducer
}

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
});

export default store;