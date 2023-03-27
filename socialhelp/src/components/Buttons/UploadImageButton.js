import * as React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Tooltip } from "@mui/material";

export default function UploadImageButton() {
  return (
    <Tooltip title="Upload photos">
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" />
        <PhotoCamera />
      </IconButton>
    </Tooltip>
  );
}
