import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import InfoIcon from "@mui/icons-material/Info";

const ProfileInfoButton = ({ handleOpenInfo, user }) => {
  return (
    <Tooltip title="Details" arrow>
      <IconButton onClick={() => handleOpenInfo(user)}>
        <InfoIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ProfileInfoButton;
