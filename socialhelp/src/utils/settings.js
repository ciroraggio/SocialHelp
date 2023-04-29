import { setMustRelogin } from "../store/appSlice";

export const tabValues = {
  feed: 0,
  notifications: 1,
  explore: 2,
  profile: 3,
};

export const isRequiredField = "Required field";

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

export const digitsOnly = (value) => /^\d+$/.test(value)


export function base64ToImage(base64Str) {
  const base64Image = base64Str.split(";base64,").pop();
  const byteCharacters = atob(base64Image);
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: "image/png" });

  // Crea un oggetto URL dall'oggetto Blob
  const imageUrl = URL.createObjectURL(blob);

  return imageUrl;
}

