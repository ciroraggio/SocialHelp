import * as React from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import LogoutIcon from "@mui/icons-material/Logout";
import { Tooltip } from "@mui/material";
export default function SocialHelpToolbar() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar sx={{ height: "80px" }}>
          <Box sx={{ flexGrow: 1 }}>
            <img
              src="/assets/images/icons/SocialHelpToolbarLogo.png"
              alt="Logo"
              style={{ scale: "50%" }}
            />
          </Box>
          <Box sx={{ width: "20px" }} />
          <Tooltip title="Logout" arrow>
            <IconButton>
              <LogoutIcon sx={{ color: "white" }} />
            </IconButton>
          </Tooltip>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
