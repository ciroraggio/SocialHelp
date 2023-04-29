import React from "react";
import { Avatar, Tooltip } from "@mui/material";
import { base64ToImage } from "../utils/settings";

const SocialHelpAvatar = ({ user, showTooltip }) => {
  if (showTooltip)
    return (
      <Tooltip title={`${user.name} ${user.surname}`} arrow>
        <Avatar sx={{ bgcolor: "#5bbcdd" }} aria-label="recipe">
          {user.profileImage || `${user.name[0]}${user.surname[0]}`}
        </Avatar>
      </Tooltip>
    );
  return user.profilePicture ? (
    <Avatar alt="Profile picture" src={base64ToImage(user.profilePicture)} />
  ) : (
    <Avatar sx={{ bgcolor: "#5bbcdd" }} aria-label="recipe">
      {user.profileImage || `${user.name[0]}${user.surname[0]}`.toUpperCase()}
    </Avatar>
  );
};

export default SocialHelpAvatar;
