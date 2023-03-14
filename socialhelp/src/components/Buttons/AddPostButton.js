import React from "react";
import { Fab, Tooltip } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useDispatch } from "react-redux";
import { openNewPostDialog } from "../../store/postSlice";

const AddPostButton = () => {
  const dispatch = useDispatch();
  const handleAddPost = () => dispatch(openNewPostDialog());

  return (
    <Tooltip title="Crea post" arrow>
      <Fab
        color="primary"
        sx={{ position: "fixed", bottom: "16px", right: "16px", zIndex: 9999 }}
        onClick={handleAddPost}
      >
        <AddIcon />
      </Fab>
    </Tooltip>
  );
};

export default AddPostButton;
