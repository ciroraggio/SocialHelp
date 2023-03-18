import { useEffect } from "react";
import { useSelector } from "react-redux";
import SociaHelpSnackbar from "./components/SociaHelpSnackbar";
import SocialHelpProgress from "./components/SocialHelpProgress";
import SocialHelpRoutes from "./SocialHelpRoutes";
import { serverGetRequest } from "./utils/httpUtils";
import { TIMER_USERS_FETCH } from "./utils/settings";

const App = () => {
  const { isLoading } = useSelector((state) => state.app);
  const { token } = useSelector((state) => state.user);

  // Utilizzo la funzione useEffect() per creare un intervallo che effettua la richiesta HTTP per il recupero di tutti gli utenti ogni N secondi.
  // Inoltre, abbiamo registrato un evento visibilitychange sulla finestra del browser utilizzando document.addEventListener().
  // Quando la finestra diventa invisibile (ad esempio, quando l'utente passa a un'altra scheda), l'intervallo viene fermato utilizzando stopInterval().
  // Quando la finestra diventa visibile di nuovo, l'intervallo viene riattivato utilizzando startInterval().
  // Quando il componente viene smontato, l'intervallo viene fermato utilizzando stopInterval() e l'evento visibilitychange viene rimosso utilizzando document.removeEventListener().

  useEffect(() => {
    let intervalId;
    const fetchData = () => {
      if (token)
        serverGetRequest("user/getAllUsers", token)
          .then((res) => res.json())
          .then((data) => {
            if (data && data.length > 0) {
              window.WINDOW_PROFILES = data;
              return;
            }
            throw new Error();
          })
          .catch((err) => {
            return;
          });
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
