import React  from "react";
import { IconButton, Tooltip } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchAllResolutionByUser,
  serverPutRequest,
} from "../../utils/httpUtils";
import { openSocialHelpAlert, setIsLoading } from "../../store/appSlice";
import ThumbDownIcon from "@mui/icons-material/ThumbDown";
import { updateNotifications } from "../../utils/storeUtils";
import { WINDOW_RESOLUTIONS } from "../../utils/settings";

const RejectResolutionButton = ({ resolutionInfo, handleClose }) => {
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleReject = () => {
    dispatch(setIsLoading(true));
    if (token) {
      serverPutRequest(`resolution/${resolutionInfo._id}/reject`, {}, token)
        .then((res) => res.json())
        .then(() => {
          handleClose();
          dispatch(
            openSocialHelpAlert({
              type: "success",
              message: `You declined @${resolutionInfo.user.username} proposal.`,
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
              message: `Error, the @${resolutionInfo.user.username} proposal could not be reject at the moment, try again later!`,
              vertical: "top",
              horizontal: "right",
            })
          );
        });
    }
  };

  return (
    <Tooltip title="Reject">
      <IconButton
        onClick={handleReject}
        color="error"
        sx={{ textTransform: "none" }}
      >
        <ThumbDownIcon />
      </IconButton>
    </Tooltip>
  );
};

export default RejectResolutionButton;
