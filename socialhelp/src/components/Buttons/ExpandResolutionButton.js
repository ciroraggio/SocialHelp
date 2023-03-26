import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useDispatch, useSelector } from "react-redux";
import { serverPostRequestAuth } from "../../utils/httpUtils";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { openSocialHelpAlert } from "../../store/appSlice";
import { setFollowing } from "../../store/userSlice";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import SocialHelpResolveConfirmationDialog from "../SocialHelpResolveConfirmationDialog";

const ExpandResolutionButton = ({ resolutionInfo }) => {
  const [openResolveConfirmation, setOpenResolveConfirmation] = useState(false);

  const handleOpenResolveConfirmation = () => setOpenResolveConfirmation(true);

  return (
    <>
      <Tooltip title="Espandi" arrow>
        <IconButton onClick={handleOpenResolveConfirmation}>
          <OpenInFullIcon />
        </IconButton>
      </Tooltip>
      <SocialHelpResolveConfirmationDialog
        open={openResolveConfirmation}
        setOpen={setOpenResolveConfirmation}
        resolutionInfo={resolutionInfo}
      />
    </>
  );
};

export default ExpandResolutionButton;
