import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import LogoutIcon from "@mui/icons-material/Logout";
import { useNavigate } from "react-router-dom";
import { LOCAL_STORAGE_TOKEN_KEY } from "../../utils/settings";
import { useDispatch, useSelector } from "react-redux";
import { openSocialHelpAlert, setToken } from "../../store/appSlice";
import { serverPostRequestAuth } from "../../utils/httpUtils";

const LogoutButton = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const handleLogout = () => {
    serverPostRequestAuth("logout", {}, token)
      .then(() => {
        localStorage.removeItem(LOCAL_STORAGE_TOKEN_KEY);
        dispatch(setToken(""));
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
