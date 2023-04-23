import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";

const InfoButton = (props) => {
  return (
    <span style={props.style}>
      <Tooltip title={props.message} arrow>
        <IconButton sx={{ scale: "70%" }}>
          <HelpOutlineIcon />
        </IconButton>
      </Tooltip>
    </span>
  );
};

export default InfoButton;
