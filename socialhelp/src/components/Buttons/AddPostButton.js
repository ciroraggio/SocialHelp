import React from "react";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const AddPostButton = () => {
  return (
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: "16px", right: "16px", zIndex: 9999 }}
      >
        <AddIcon />
      </Fab>
  );
};

export default AddPostButton;
