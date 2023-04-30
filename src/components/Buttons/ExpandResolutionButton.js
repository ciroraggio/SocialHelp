import React, { useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import OpenInFullIcon from "@mui/icons-material/OpenInFull";
import SocialHelpResolveConfirmationDialog from "../SocialHelpResolveConfirmationDialog";

const ExpandResolutionButton = ({ resolutionInfo }) => {
  const [openResolveConfirmation, setOpenResolveConfirmation] = useState(false);

  const handleOpenResolveConfirmation = () => setOpenResolveConfirmation(true);

  return (
    <>
      <Tooltip title="Expand" arrow>
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
