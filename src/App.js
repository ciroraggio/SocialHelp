import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SociaHelpSnackbar from "./components/SociaHelpSnackbar";
import SocialHelpProgress from "./components/SocialHelpProgress";
import SocialHelpRoutes from "./SocialHelpRoutes";
import { openSocialHelpAlert, resetAppState } from "./store/appSlice";
import { resetUser } from "./store/userSlice";
import { resetPostState } from "./store/postSlice";
import useReloadCheckToken from "./hooks/useReloadCheckToken";
import { TimerTask } from "./components/TimerTask";
import { getAllNotifications } from "./utils/httpUtils";

const App = () => {
  const { isLoading, mustRelogin } = useSelector((state) => state.app);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const time = new Date();
  time.setSeconds(time.getSeconds() + 5);
  // Token control management in case of window refresh
  useReloadCheckToken();

  useEffect(() => {
    if (mustRelogin) {
      dispatch(resetUser());
      dispatch(resetAppState());
      dispatch(resetPostState());
      dispatch(
        openSocialHelpAlert({
          type: "error",
          message: "User must relogin!",
          vertical: "top",
          horizontal: "right",
        })
      );
      return (window.location.href = "/login");
    }
  }, [mustRelogin]);

  return (
    <div className="App">
      {!isLoading && <SocialHelpRoutes />}
      {isLoading && <SocialHelpProgress showLogo />}
      <SociaHelpSnackbar />
      {token && <div>
        <TimerTask
          expiryTimestamp={time}
          timer={5}
          callback={() => getAllNotifications(token, dispatch)}
        />
      </div>}
    </div>
  );
};

export default App;
