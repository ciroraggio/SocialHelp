import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import PersonAddIcon from "@mui/icons-material/PersonAdd";

const SocialHelpFollowButton = ({row}) => {
  return (
    <Tooltip title="Segui" arrow>
      <IconButton>
        <PersonAddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SocialHelpFollowButton;
