import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SocialHelpLogin from "./components/SocialHelpLogin";
import SocialHelpRegistration from "./components/SocialHelpRegistration";
import SocialHelpTabs from "./components/SocialHelpTabs";
import { tabValues } from "./utils/settings";

const SocialHelpRoutes = () => {
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
