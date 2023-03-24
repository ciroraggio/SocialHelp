import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_KEY, WINDOW_PROFILES, WINDOW_RESOLUTIONS } from "../../utils/settings";
import { useDispatch, useSelector } from "react-redux";
import { openSocialHelpAlert } from "../../store/appSlice";
import { serverPostRequestAuth } from "../../utils/httpUtils";
import { resetUser } from "../../store/userSlice";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const handleLogout = () => {
    serverPostRequestAuth("logout", {}, token)
      .then(() => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        dispatch(resetUser());
        if (window[WINDOW_PROFILES]) window[WINDOW_PROFILES] = undefined;
        if (window[WINDOW_RESOLUTIONS]) window[WINDOW_RESOLUTIONS] = undefined;
        navigate("/login");
      })
      .catch((err) =>
        dispatch(
          openSocialHelpAlert({ type: "error", message: "Errore nel logout!" })
        )
      );
  };
  return (
    <Tooltip title="Logout" arrow>
      <IconButton onClick={handleLogout}>
        <LogoutIcon sx={{ color: "white" }} />
      </IconButton>
    </Tooltip>
  );
};

export default LogoutButton;
