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
              message: `Hai rifiutato la proposta di @${resolutionInfo.user.username}`,
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
              message: `Errore, non è stato possibile rifiutare la proposta di @${resolutionInfo.user.username}, riprovare più tardi!`,
              vertical: "top",
              horizontal: "right",
            })
          );
        });
    }
  };

  return (
    <Tooltip title="Rifiuta">
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
