import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LogoutButton from "./Buttons/LogoutButton";
import { Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import SocialHelpAvatar from "./SocialHelpAvatar";

const SocialHelpToolbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: "80px" }}>
          <Tooltip title={user.username} arrow placement="right">
            <SocialHelpAvatar user={user} showTooltip />
          </Tooltip>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <Tooltip title={`SocialHelp v${process.env.REACT_APP_VERSION}`} arrow>
              <img
                src="/assets/images/icons/SocialHelpToolbarLogo.png"
                alt="Logo"
                style={{ scale: "50%" }}
              />
            </Tooltip>
          </Box>
          <Box sx={{ width: "20px" }} />
          <LogoutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SocialHelpToolbar;
