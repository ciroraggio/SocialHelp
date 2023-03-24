import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useDispatch, useSelector } from "react-redux";
import { serverPostRequestAuth } from "../../utils/httpUtils";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { openSocialHelpAlert } from "../../store/appSlice";
import { setFollowing } from "../../store/userSlice";
import OpenInFullIcon from '@mui/icons-material/OpenInFull'; 

const ExpandResolutionButton = ({ post }) => {
  const { token, following } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  return (
    <Tooltip title="Espandi" arrow>
      <IconButton>
        <OpenInFullIcon />
      </IconButton>
    </Tooltip>
  );
};

export default ExpandResolutionButton;
