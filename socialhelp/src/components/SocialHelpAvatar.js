import React from "react";
import { Avatar } from "@mui/material";

const SocialHelpAvatar = ({ user }) => {
  return (
    <Avatar sx={{ bgcolor: "#5bbcdd" }} aria-label="recipe">
      {user.profileImage || `${user.name[0]}${user.surname[0]}`}
    </Avatar>
  );
};

export default SocialHelpAvatar;
