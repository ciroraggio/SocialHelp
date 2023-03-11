import "./App.css";
import SocialHelpProgress from "./components/SocialHelpProgress";
import SocialHelpTabs from "./components/SocialHelpTabs";
import SocialHelpToolbar from "./components/SocialHelpToolbar";

const App = () => {
  return (
    <div className="App">
      <SocialHelpToolbar />
      <SocialHelpTabs />
      {/* <SocialHelpProgress /> */}
    </div>
  );
}

export default App;
