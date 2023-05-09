import { createSlice } from "@reduxjs/toolkit";
import { tabValues } from "../utils/settings";
const initialState = {
  token: "",
  textSearch: "",
  isLoading: false,
  socialHelpAlert: {
    show: false,
    message: "",
    type: "",
    vertical: "top",
    horizontal: "right",
  },
  allProfilesFetched: false,
  notifications: 0,
  mustRelogin: false,
  currentTab: tabValues.feed,
};
export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setToken: (state, action) => {
      state.token = action.payload;
    },
    setCurrentTab: (state, action) => {
      state.currentTab = action.payload;
    },
    setMustRelogin: (state, action) => {
      state.mustRelogin = action.payload;
    },
    setNotifications: (state, action) => {
      state.notifications = action.payload;
    },
    setTextSearch: (state, action) => {
      state.textSearch = action.payload;
    },
    setIsLoading: (state, action) => {
      state.isLoading = action.payload;
    },
    setAllProfilesFetched: (state, action) => {
      state.allProfilesFetched = action.payload;
    },
    openSocialHelpAlert: (state, action) => {
      state.socialHelpAlert.type = action.payload.type;
      state.socialHelpAlert.message = action.payload.message;
      state.socialHelpAlert.vertical =
        action.payload.vertical || state.vertical;
      state.socialHelpAlert.horizontal =
        action.payload.horizontal || state.horizontal;
      state.socialHelpAlert.show = true;
    },
    closeSocialHelpAlert: (state, action) => {
      state.socialHelpAlert.show = false;
      state.socialHelpAlert.type = "";
      state.socialHelpAlert.message = "";
      state.socialHelpAlert.vertical = "";
      state.socialHelpAlert.horizontal = "";
    },
    resetAppState: (state, action) => {
      state = initialState;
    },
  },
});

export const {
  setToken,
  setCurrentTab,
  setNotifications,
  setTextSearch,
  setIsLoading,
  openSocialHelpAlert,
  closeSocialHelpAlert,
  setAllProfilesFetched,
  setMustRelogin,
  resetAppState,
} = appSlice.actions;

export const appReducer = appSlice.reducer;
