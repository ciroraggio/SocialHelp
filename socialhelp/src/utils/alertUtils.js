import { openSocialHelpAlert } from "../store/appSlice";

export const openAlertSuccess = (
  message,
  vertical = "top",
  horizontal = "right",
  dispatch
) =>
  dispatch(
    openSocialHelpAlert({
      type: "success",
      message: message,
      vertical: vertical,
      horizontal: horizontal,
    })
  );

export const openAlertError = (
  message,
  vertical = "top",
  horizontal = "right",
  dispatch
) =>
  dispatch(
    openSocialHelpAlert({
      type: "error",
      message: message,
      vertical: vertical,
      horizontal: horizontal,
    })
  );
