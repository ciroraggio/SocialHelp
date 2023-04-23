import * as React from "react";
import VerifiedIcon from "@mui/icons-material/Verified";
import { Tooltip } from "@mui/material";

const CustomVerifiedIcon = () => {
  return (
    <Tooltip arrow placement="right" title='Questo account è verificato!'>
        <VerifiedIcon color="primary" sx={{ scale: "80%" }} />
    </Tooltip>
  );
};

export default CustomVerifiedIcon;
