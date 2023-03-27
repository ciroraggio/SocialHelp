import React from "react";
import { Avatar, Tooltip } from "@mui/material";

const SocialHelpAvatar = ({ user, showTooltip }) => {
  if (showTooltip)
    return (
      <Tooltip title={`${user.name} ${user.surname}`} arrow>
        <Avatar sx={{ bgcolor: "#5bbcdd" }} aria-label="recipe">
          {user.profileImage || `${user.name[0]}${user.surname[0]}`}
        </Avatar>
      </Tooltip>
    );
  return (
    <Avatar sx={{ bgcolor: "#5bbcdd" }} aria-label="recipe">
      {user.profileImage || `${user.name[0]}${user.surname[0]}`}
    </Avatar>
  );
};

export default SocialHelpAvatar;
