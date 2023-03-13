import { configureStore } from "@reduxjs/toolkit";
import { appReducer } from "./appSlice";
import { userReducer } from "./userSlice";

const rootReducer = {
  user: userReducer,
  app: appReducer
}

const store = configureStore({
  reducer: rootReducer,
  devTools: true,
  // enhancers: [composeWithDevTools()],
});

export default store;