import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch } from "react-redux";
import PostAddIcon from '@mui/icons-material/PostAdd';

const SpreadPostButton = () => {
  const dispatch = useDispatch();
  const onClick = () => {
    window.alert('Diffondi il post ok')
  };

  return (
    <Tooltip title="Diffondi su SocialHelp" arrow>
      <IconButton onClick={onClick}>
        <PostAddIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SpreadPostButton;
