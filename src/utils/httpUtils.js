import {
  openSocialHelpAlert,
  setAllProfilesFetched,
  setIsLoading,
} from "../store/appSlice";
import { WINDOW_PROFILES, WINDOW_RESOLUTIONS } from "./settings";
import { updateNotifications } from "./storeUtils";

export const GET = "GET";
export const POST = "POST";
export const PUT = "PUT";
export const DELETE = "DELETE";

export const serverUrl = "http://localhost:3001";

export const serverPostRequestNoAuth = (route, body) =>
  fetch(`${serverUrl}/${route}`, {
    method: POST,
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });

export const serverPostRequestAuth = (route, body, token, content) =>
  fetch(`${serverUrl}/${route}`, {
    method: POST,
    headers: {
      "Content-Type": content || "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const serverGetRequest = (route, token) =>
  fetch(`${serverUrl}/${route}`, {
    method: GET,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

export const serverPutRequest = (route, body, token) =>
  fetch(`${serverUrl}/${route}`, {
    method: PUT,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(body),
  });

export const fetchAllResolutionByUser = (token) =>
  serverGetRequest("resolution/getAllResolutionsByUser", token)
    .then((res) => res.json())
    .then((data) => data);

export const fetchLogin = (body) =>
  serverPostRequestNoAuth(`login`, body)
    .then((response) => response.json())
    .then((data) => data);

export const fetchResolutionsByUser = (token) =>
  serverGetRequest("resolution/getAllResolutionsByUser", token)
    .then((res) => res.json())
    .then((data) => data);

export const getAllUsers = (token, dispatch) =>
  serverGetRequest("user/getAllUsers", token)
    .then((res) => res.json())
    .then((data) => {
      if (data) {
        window[WINDOW_PROFILES] = data;
        dispatch(setAllProfilesFetched(true));
        dispatch(setIsLoading(false));
        return;
      }
      throw new Error();
    })
    .catch((err) => {
      dispatch(setIsLoading(false));
      dispatch(
        openSocialHelpAlert({
          type: "error",
          message: "Errore nel caricamento dei profili, riprovare più tardi!",
          vertical: "bottom",
          horizontal: "left",
        })
      );
      return;
    });

export const getAllNotifications = (token, dispatch) =>
  fetchResolutionsByUser(token)
    .then((data) => {
      if (data.resolutions) {
        window[WINDOW_RESOLUTIONS] = data.resolutions;
        updateNotifications(dispatch);
        dispatch(setIsLoading(false));
        return;
      }
      throw new Error();
    })
    .catch((err) => {
      dispatch(setIsLoading(false));
      dispatch(
        openSocialHelpAlert({
          type: "error",
          message:
            "Errore nel caricamento delle notifiche, riprovare più tardi!",
          vertical: "bottom",
          horizontal: "left",
        })
      );
      return;
    });
