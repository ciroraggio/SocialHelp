import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch } from "react-redux";

const DeletePostButton = () => {
  const dispatch = useDispatch();
  const onClick = () => window.alert("Vuoi eliminare il post?");

  return (
    <Tooltip title="Risolvi" arrow>
      <IconButton onClick={onClick}>
        <DeleteIcon sx={{ scale: "0.85" }} />
      </IconButton>
    </Tooltip>
  );
};

export default DeletePostButton;
