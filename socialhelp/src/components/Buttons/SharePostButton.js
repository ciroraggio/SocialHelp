import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";
import { useDispatch } from "react-redux";
import { openSharePostDialog, setPostUrl } from "../../store/postSlice";

const SharePostButton = ({ postInformation }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(setPostUrl(postInformation.postUrl));
    dispatch(openSharePostDialog());
  };

  return (
    <Tooltip title="Condividi" arrow>
      <IconButton aria-label="add to favorites" onClick={onClick}>
        <ShareIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SharePostButton;
