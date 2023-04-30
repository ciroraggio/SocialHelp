import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllResolutionByUser,
  serverPutRequest,
} from "../../utils/httpUtils";
import { openSocialHelpAlert, setIsLoading } from "../../store/appSlice";
import { updateNotifications } from "../../utils/storeUtils";
import { WINDOW_RESOLUTIONS } from "../../utils/settings";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";

const AcceptResolutionButton = ({ resolutionInfo, handleClose }) => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleAccept = () => {
    dispatch(setIsLoading(true));
    if (token) {
      serverPutRequest(`resolution/${resolutionInfo._id}/accept`, {}, token)
        .then((res) => res.json())
        .then(() => {
          handleClose();
          dispatch(
            openSocialHelpAlert({
              type: "success",
              message: `You accepted @${resolutionInfo.user.username} proposal.`,
              vertical: "top",
              horizontal: "right",
            })
          );
          fetchAllResolutionByUser(token).then((data) => {
            if (data.resolutions) {
              window[WINDOW_RESOLUTIONS] = data.resolutions;
              updateNotifications(dispatch);
            }
          });
          dispatch(setIsLoading(false));
        })
        .catch(() => {
          dispatch(setIsLoading(false));
          dispatch(
            openSocialHelpAlert({
              type: "error",
              message: `Error, the @${resolutionInfo.user.username} proposal could not be accept at the moment, try again later!`,
              vertical: "top",
              horizontal: "right",
            })
          );
        });
    }
  };

  return (
    <Tooltip title="Accept">
      <IconButton
        onClick={handleAccept}
        color="success"
        sx={{ textTransform: "none" }}
      >
        <ThumbUpAltIcon />
      </IconButton>
    </Tooltip>
  );
};

export default AcceptResolutionButton;
