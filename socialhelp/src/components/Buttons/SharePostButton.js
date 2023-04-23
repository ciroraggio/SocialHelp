import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useDispatch } from "react-redux";
import { openSharePostDialog, setPostUrl } from "../../store/postSlice";

const SharePostButton = ({ postUrl }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setPostUrl(postUrl));
    dispatch(openSharePostDialog());
  };

  return (
    <Tooltip title="Share" arrow>
      <IconButton onClick={onClick}>
        <ShareIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SharePostButton;
