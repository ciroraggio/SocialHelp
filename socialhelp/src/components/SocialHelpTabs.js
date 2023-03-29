import React, { useEffect, useState } from "react";
import { Tabs, Tab, Box, Badge } from "@mui/material";
import SocialHelpFeed from "./SocialHelpFeed";
import SocialHelpProfile from "./SocialHelpProfile";
import HomeIcon from "@mui/icons-material/Home";
import PersonIcon from "@mui/icons-material/Person";
import { useNavigate } from "react-router-dom";
import { SearchOutlined } from "@mui/icons-material";
import SocialHelpExplore from "./SocialHelpExplore";
import { checkToken, tabValues } from "../utils/settings";
import SocialHelpToolbar from "./SocialHelpToolbar";
import { useDispatch, useSelector } from "react-redux";
import { setAllProfilesFetched } from "../store/appSlice";
import NotificationsIcon from "@mui/icons-material/Notifications";
import SocialHelpNotifications from "./SocialHelpNotifications";
import useCheckToken from "../hooks/useReloadCheckToken";

const SocialHelpTabs = (props) => {
  const [tabValue, setTabValue] = useState(props.tabValue || tabValues.feed);
  const { notifications } = useSelector((state) => state.app);
  const [notificationsCounter, setNotificationsCounter] = useState(
    notifications || 0
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleTabChange = (event, newValue) => {
    switch (newValue) {
      case tabValues.feed:
        checkToken(dispatch);
        navigate("/feed");
        break;
      case tabValues.notifications:
        checkToken(dispatch);
        navigate("/notifications");
        break;
      case tabValues.profile:
        checkToken(dispatch);
        navigate(`/profile`);
        break;
      case tabValues.explore:
        checkToken(dispatch);
        dispatch(setAllProfilesFetched(false));
        navigate("/explore");
        break;
      default:
        checkToken(dispatch);
        navigate("/feed");
        break;
    }
    setTabValue(newValue);
  };

  useEffect(() => {
    setNotificationsCounter(notifications);
  }, [notifications]);

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
                badgeContent={notificationsCounter}
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
