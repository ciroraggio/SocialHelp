import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";

const ResolvePostButton = () => {
  return (
    <Tooltip title="Risolvi" arrow>
      <IconButton>
        <ReplyIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ResolvePostButton;
