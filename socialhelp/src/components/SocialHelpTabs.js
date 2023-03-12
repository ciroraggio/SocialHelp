import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import SocialHelpFeed from "./SocialHelpFeed";
import SocialHelpProfile from "./SocialHelpProfile";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import SocialHelpExplore from "./SocialHelpExplore";
import { tabValues } from "../utils/settings";
import SocialHelpToolbar from "./SocialHelpToolbar";

const SocialHelpTabs = (props) => {
  const [tabValue, setTabValue] = useState(props.tabValue || tabValues.feed);
  const currentUsername = "account_test"; // TODO settare in fase di login su redux e recuperare
  const navigate = useNavigate();

  const handleTabChange = (event, newValue) => {
    switch (newValue) {
      case tabValues.feed:
        navigate("/feed");
        break;
      case tabValues.profile:
        navigate(`/profile`);
        break;
      case tabValues.explore:
        navigate("/explore");
        break;
      default:
        navigate("/feed");
        break;
    }
    setTabValue(newValue);
  };

  return (
    <>
      <SocialHelpToolbar />
      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant="fullWidth"
        sx={{ width: "100%" }}
      >
        <Tab
          label="Home"
          icon={<HomeIcon />}
          iconPosition="start"
          sx={{ textTransform: "none" }}
        />
        <Tab
          label="Explore"
          icon={<SearchOutlined />}
          iconPosition="start"
          sx={{ textTransform: "none" }}
        />
        <Tab
          label="Profile"
          icon={<PersonIcon />}
          iconPosition="start"
          sx={{ textTransform: "none" }}
        />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {tabValue === tabValues.feed && <SocialHelpFeed />}
        {tabValue === tabValues.explore && <SocialHelpExplore />}
        {tabValue === tabValues.profile && <SocialHelpProfile />}
      </Box>
    </>
  );
};

export default SocialHelpTabs;
