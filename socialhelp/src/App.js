import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import SociaHelpSnackbar from "./components/SociaHelpSnackbar";
import SocialHelpProgress from "./components/SocialHelpProgress";
import SocialHelpRoutes from "./SocialHelpRoutes";
import { serverGetRequest } from "./utils/httpUtils";
import {
  TIMER_USERS_FETCH,
  WINDOW_PROFILES,
  WINDOW_RESOLUTIONS,
} from "./utils/settings";
import { openSocialHelpAlert, resetAppState } from "./store/appSlice";
import { resetUser } from "./store/userSlice";
import { resetPostState } from "./store/postSlice";
import useReloadCheckToken from "./hooks/useReloadCheckToken";

const App = () => {
  const { isLoading, mustRelogin } = useSelector((state) => state.app);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  // Utilizzo la funzione useEffect() per creare un intervallo che effettua la richiesta HTTP per il recupero di tutti gli utenti ogni N secondi.
  // Inoltre, abbiamo registrato un evento visibilitychange sulla finestra del browser utilizzando document.addEventListener().
  // Quando la finestra diventa invisibile (ad esempio, quando l'utente passa a un'altra scheda), l'intervallo viene fermato utilizzando stopInterval().
  // Quando la finestra diventa visibile di nuovo, l'intervallo viene riattivato utilizzando startInterval().
  // Quando il componente viene smontato, l'intervallo viene fermato utilizzando stopInterval() e l'evento visibilitychange viene rimosso utilizzando document.removeEventListener().
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

  useEffect(() => {
    let intervalId;
    const fetchData = () => {
      if (token && intervalId) {
        serverGetRequest("user/getAllUsers", token)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.length > 0) {
              window[WINDOW_PROFILES] = data;
            }
          });

        serverGetRequest("resolution/getAllResolutionsByUser", token)
          .then((res) => res.json())
          .then((data) => {
            if (data.resolutions) {
              window[WINDOW_RESOLUTIONS] = data.resolutions;
            }
          });
      }
    };
    const startInterval = () => {
      intervalId = setInterval(() => {
        fetchData();
      }, TIMER_USERS_FETCH);
    };
    const stopInterval = () => {
      clearInterval(intervalId);
    };
    document.addEventListener("visibilitychange", () => {
      if (document.hidden) {
        stopInterval();
      } else {
        startInterval();
      }
    });
    startInterval();
    return () => {
      stopInterval();
      document.removeEventListener("visibilitychange", () => {
        if (document.hidden) {
          stopInterval();
        } else {
          startInterval();
        }
      });
    };
  }, []);

  return (
    <div className="App">
      {!isLoading && <SocialHelpRoutes />}
      {isLoading && <SocialHelpProgress showLogo />}
      <SociaHelpSnackbar />
    </div>
  );
};

export default App;
