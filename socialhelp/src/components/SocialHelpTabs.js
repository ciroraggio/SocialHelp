import React, { useState } from "react";
import { Tabs, Tab, Box } from "@mui/material";
import SocialHelpFeed from "./SocialHelpFeed";
import SocialHelpProfile from "./SocialHelpProfile";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
const SocialHelpTabs = () => {
  const [tabValue, setTabValue] = useState(0);

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  return (
    <>
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
          label="Profile"
          icon={<PersonIcon />}
          iconPosition="start"
          sx={{ textTransform: "none" }}
        />
      </Tabs>
      <Box sx={{ p: 2 }}>
        {tabValue === 0 && <SocialHelpFeed />}
        {tabValue === 1 && <SocialHelpProfile />}
      </Box>
    </>
  );
};

export default SocialHelpTabs;
