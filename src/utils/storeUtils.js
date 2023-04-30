import { setNotifications } from "../store/appSlice";
import { resolutionStatus, WINDOW_RESOLUTIONS } from "./settings";

export const updateNotifications = (dispatch) =>
  dispatch(
    setNotifications(
      window[WINDOW_RESOLUTIONS].filter(
        (res) => res.status === resolutionStatus.PENDING
      ).length
    )
  );

export const getPendingResolutions = (data) => {
  return data.filter(
    (resolution) => resolution.status === resolutionStatus.PENDING
  );
};

export const getAcceptedResolutions = (data) =>
  data.filter((resolution) => resolution.status === resolutionStatus.ACCEPTED);
