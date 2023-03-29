import { openSocialHelpAlert, setMustRelogin } from "../store/appSlice";

export const tabValues = {
  feed: 0,
  notifications: 1,
  explore: 2,
  profile: 3,
};

export const isRequiredField = "Campo obbligatorio";

export const LOCAL_STORAGE_TOKEN_KEY = "sh_token";
export const WINDOW_PROFILES = "__SOCIAL_HELP_PROFILES__";
export const WINDOW_RESOLUTIONS = "__SOCIAL_HELP_RESOLUTIONS__";
export const TIMER_USERS_FETCH = 15 * 100;

export const resolutionStatus = {
  PENDING: "pending",
  ACCEPTED: "accepted",
  REJECTED: "rejected",
};

export function checkToken(dispatch) {
  const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
  if (token) {
    return;
  } else {
    dispatch(setMustRelogin(true));
  }
}
