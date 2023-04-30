import { useDispatch } from "react-redux";
import { closeSocialHelpAlert, setIsLoading } from "../store/appSlice";
import { setUserData } from "../store/userSlice";
import { fetchAllResolutionByUser, serverGetRequest } from "../utils/httpUtils";
import { LOCAL_STORAGE_TOKEN_KEY, WINDOW_RESOLUTIONS } from "../utils/settings";
import { updateNotifications } from "../utils/storeUtils";

const useReloadCheckToken = () => {
  window.addEventListener("load", checkToken);
  const dispatch = useDispatch();
  function checkToken() {
    const token = localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY);
    if (token) {
      dispatch(setIsLoading(true));
      serverGetRequest("user/getCurrentUser", token)
        .then((res) => res.json())
        .then((data) => {
          if (data?.user && data?.token) {
            dispatch(setIsLoading(true));
            localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
            dispatch(setUserData(data));
            dispatch(closeSocialHelpAlert());
            fetchAllResolutionByUser(data.token).then((data) => {
              if (data.resolutions) {
                window[WINDOW_RESOLUTIONS] = data.resolutions;
                updateNotifications(dispatch);
                dispatch(setIsLoading(false));
              }
            });
          }
        });
    }
    else if (window.location.pathname !== "/login") window.location.href = "/login";
  }
};

export default useReloadCheckToken;
