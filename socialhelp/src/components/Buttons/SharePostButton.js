import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const SharePostButton = () => {
  return (
    <Tooltip title="Condividi" arrow>
      <IconButton aria-label="add to favorites">
        <ShareIcon />
      </IconButton>
    </Tooltip>
  );
};

export default SharePostButton;
