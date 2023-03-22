import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import {
  DELETE,
  serverPostRequestAuth,
  serverUrl,
} from "../../utils/httpUtils";
import { openSocialHelpAlert } from "../../store/appSlice";

const DeletePostButton = ({ post }) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const onClick = () => {
    if (post._id) {
      fetch(`${serverUrl}/post/deletePostById/${post._id}`, {
        method: DELETE,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }).then(res => dispatch(
        openSocialHelpAlert({
          type: "success",
          message: `Post eliminato con successo!`,
          vertical: "top",
          horizontal: "right",
        })
      )).catch(err => dispatch(
        openSocialHelpAlert({
          type: "error",
          message: `Impossibile eliminare il post, riprovare più tardi!`,
          vertical: "top",
          horizontal: "right",
        })));
    } else {
      dispatch(
        openSocialHelpAlert({
          type: "error",
          message: `Impossibile eliminare il post, riprovare più tardi!`,
          vertical: "top",
          horizontal: "right",
        })
      )
    }
  };

  return (
    <Tooltip title="Elimina" arrow>
      <IconButton onClick={onClick}>
        <DeleteIcon sx={{ scale: "0.85" }} />
      </IconButton>
    </Tooltip>
  );
};

export default DeletePostButton;
