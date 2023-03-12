import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";

const LogoutButton = () => {
    const navigate = useNavigate();
    const handleLogout = () => {
        // TODO eseguire logout
        navigate('/login')
    }
  return (
    <Tooltip title="Logout" arrow>
      <IconButton onClick={handleLogout}>
        <LogoutIcon sx={{ color: "white" }} />
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;
