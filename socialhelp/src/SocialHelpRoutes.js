import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import SocialHelpLogin from "./components/SocialHelpLogin";
import SocialHelpProgress from "./components/SocialHelpProgress";
import SocialHelpRegistration from "./components/SocialHelpRegistration";
import SocialHelpTabs from "./components/SocialHelpTabs";
import { tabValues } from "./utils/settings";

function SocialHelpRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={<Navigate to="/login" />}
        />
        <Route path="/login" element={<SocialHelpLogin />} />
        <Route path="/signup" element={<SocialHelpRegistration />} />
        <Route path="/progress" element={<SocialHelpProgress showLogo />} />
        <Route path="/feed" element={<SocialHelpTabs tabValue={tabValues.feed} />} />
        <Route path="/profile" element={<SocialHelpTabs tabValue={tabValues.profile} />} />
        <Route path="/explore" element={<SocialHelpTabs tabValue={tabValues.explore} />} />
      </Routes>
    </BrowserRouter>
  );
}

export default SocialHelpRoutes;
