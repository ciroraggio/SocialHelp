import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { useDispatch, useSelector } from "react-redux";
import { DELETE, serverUrl } from "../../utils/httpUtils";
import { openSocialHelpAlert, setIsLoading } from "../../store/appSlice";
import SocialHelpConfirmationDialog from "../SocialHelpConfirmationDialog";

const DeletePostButton = ({ post }) => {
  const [openConfirmation, setOpenConfirmation] = useState(false);
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const handleDelete = () => {
    dispatch(setIsLoading(true));
    if (post._id) {
      fetch(`${serverUrl}/post/deletePostById/${post._id}`, {
        method: DELETE,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((res) => {
          dispatch(setIsLoading(false));
          dispatch(
            openSocialHelpAlert({
              type: "success",
              message: `Post deleted successfully!`,
              vertical: "top",
              horizontal: "right",
            })
          );
        })
        .catch((err) => {
          dispatch(setIsLoading(false));
          dispatch(
            openSocialHelpAlert({
              type: "error",
              message: `Impossible to delete the post, try again later!`,
              vertical: "top",
              horizontal: "right",
            })
          );
        });
    } else {
      dispatch(setIsLoading(false));
      dispatch(
        openSocialHelpAlert({
          type: "error",
          message: `Impossible to delete the post, try again later!`,
          vertical: "top",
          horizontal: "right",
        })
      );
    }
  };

  return (
    <>
      <Tooltip title="Delete" arrow>
        <IconButton onClick={() => setOpenConfirmation(true)}>
          <DeleteIcon sx={{ scale: "0.85" }} />
        </IconButton>
      </Tooltip>
      <SocialHelpConfirmationDialog
        open={openConfirmation}
        setOpen={setOpenConfirmation}
        title="Delete post"
        message="Are you sure you want to delete the post?"
        confirmationButtonText="Delete"
        handleOk={handleDelete}
      />
    </>
  );
};

export default DeletePostButton;
