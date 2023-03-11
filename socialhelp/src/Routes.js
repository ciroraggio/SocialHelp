import { Route, Routes } from 'react-router-dom';
import SocialHelpFeed from './components/SocialHelpFeed';

function SocialHelpRoutes() {
  return (
    <Routes>
      <Route path="/feed" element={<SocialHelpFeed />} />
    </Routes>
  );
}

export default SocialHelpRoutes;
