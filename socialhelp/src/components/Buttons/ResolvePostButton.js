import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ReplyIcon from "@mui/icons-material/Reply";
import { useDispatch } from "react-redux";
import { openResolvePostDialog } from "../../store/postSlice";

const ResolvePostButton = ({ postInfo }) => {
  const dispatch = useDispatch();
  const onClick = () => {
    dispatch(openResolvePostDialog(postInfo));
  };

  return (
    <Tooltip title="Propose a solution" arrow>
      <IconButton onClick={onClick}>
        <ReplyIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ResolvePostButton;
