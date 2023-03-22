import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import LogoutButton from "./Buttons/LogoutButton";
import { Avatar, Tooltip } from "@mui/material";
import { useSelector } from "react-redux";
import { red } from "@mui/material/colors";
import SocialHelpAvatar from "./SocialHelpAvatar";

const SocialHelpToolbar = () => {
  const user = useSelector((state) => state.user);
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: "80px" }}>
          <Tooltip title={user.username} arrow placement="right">
            <SocialHelpAvatar user={user} />
          </Tooltip>
          <Box sx={{ flexGrow: 1, display: "flex", justifyContent: "center" }}>
            <img
              src="/assets/images/icons/SocialHelpToolbarLogo.png"
              alt="Logo"
              style={{ scale: "50%" }}
            />
          </Box>
          <Box sx={{ width: "20px" }} />
          <LogoutButton />
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default SocialHelpToolbar;
