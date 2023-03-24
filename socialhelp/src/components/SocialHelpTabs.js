import React, { useState } from "react";
import { Tabs, Tab, Box, Badge } from "@mui/material";
import SocialHelpFeed from "./SocialHelpFeed";
import SocialHelpProfile from "./SocialHelpProfile";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import SocialHelpExplore from "./SocialHelpExplore";
import { tabValues } from "../utils/settings";
import SocialHelpToolbar from "./SocialHelpToolbar";
import { useDispatch, useSelector } from "react-redux";
import { setAllProfilesFetched } from "../store/appSlice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SocialHelpNotifications from "./SocialHelpNotifications";

const SocialHelpTabs = (props) => {
  const [tabValue, setTabValue] = useState(props.tabValue || tabValues.feed);
  const { notifications } = useSelector((state) => state.app);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleTabChange = (event, newValue) => {
    switch (newValue) {
      case tabValues.feed:
        navigate("/feed");
        break;
      case tabValues.notifications:
        navigate("/notifications");
        break;
      case tabValues.profile:
        navigate(`/profile`);
        break;
      case tabValues.explore:
        dispatch(setAllProfilesFetched(false));
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
          label="Notifications"
          icon={
            notifications > 0 ? (
              <Badge
                badgeContent={notifications}
                color="error"
                position="start"
              >
                <NotificationsIcon />
              </Badge>
            ) : (
              <NotificationsIcon />
            )
          }
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
        {tabValue === tabValues.notifications && <SocialHelpNotifications />}
        {tabValue === tabValues.explore && <SocialHelpExplore />}
        {tabValue === tabValues.profile && <SocialHelpProfile />}
      </Box>
    </>
  );
};

export default SocialHelpTabs;
