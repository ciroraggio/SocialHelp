import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import PostAddIcon from '@mui/icons-material/PostAdd';

const SpreadPostButton = () => {
  const onClick = () => {
    window.alert('Available soon!')
  };

  return (
    <Tooltip title="Spread on SocialHelp" arrow>
      <IconButton onClick={onClick}>
        <PostAddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SpreadPostButton;
