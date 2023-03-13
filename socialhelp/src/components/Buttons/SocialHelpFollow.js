import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const FollowButton = () => {
  return (
    <Tooltip title="Segui" arrow>
      <IconButton>
        <PersonAddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default FollowButton;
