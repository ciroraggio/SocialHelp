import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SocialHelpLogin from "./components/SocialHelpLogin";
import SocialHelpProgress from "./components/SocialHelpProgress";
import SocialHelpRegistration from "./components/SocialHelpRegistration";
import SocialHelpTabs from "./components/SocialHelpTabs";
import { setUserData } from "./store/userSlice";
import { serverGetRequest } from "./utils/httpUtils";
import { LOCAL_STORAGE_TOKEN_KEY, tabValues } from "./utils/settings";

const SocialHelpRoutes = () => {
  // const { token } = useSelector((state) => state.user);
  // const dispatch = useDispatch();
  // const [isLogged, setIsLogged] = useState();

  // useEffect(() => {
  //   if (token) {
  //     setIsLogged(true);
  //     return;
  //   }
  //   if (localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)) {
  //     serverGetRequest(
  //       `user/getCurrentUser`,
  //       localStorage.getItem(LOCAL_STORAGE_TOKEN_KEY)
  //     )
  //       .then((res) => res.json())
  //       .then((data) => {
  //         if (data) {
  //           dispatch(setUserData(data));
  //           setIsLogged(true);
  //         }
  //         setIsLogged(false);
  //       });
  //   }
  //   setIsLogged(false);
  // }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" />} />
        <Route path="/login" element={<SocialHelpLogin />} />
        <Route path="/signup" element={<SocialHelpRegistration />} />
        {/* <Route path="/progress" element={<SocialHelpProgress showLogo />} /> */}
        <Route
          path="/feed"
          element={<SocialHelpTabs tabValue={tabValues.feed} />}
        />
        <Route
          path="/profile"
          element={<SocialHelpTabs tabValue={tabValues.profile} />}
        />
        <Route
          path="/explore"
          element={<SocialHelpTabs tabValue={tabValues.explore} />}
        />
        <Route
          path="/notifications"
          element={<SocialHelpTabs tabValue={tabValues.notifications} />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default SocialHelpRoutes;
