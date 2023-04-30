import * as React from "react";
import IconButton from "@mui/material/IconButton";
import PhotoCamera from "@mui/icons-material/PhotoCamera";
import { Tooltip } from "@mui/material";

export default function UploadImageButton(props) {
  return (
    <Tooltip title="Upload photo" arrow>
      <IconButton color="primary" aria-label="upload picture" component="label">
        <input hidden accept="image/*" type="file" onChange={props.onImageChange} />
        <PhotoCamera />
      </IconButton>
    </Tooltip>
  );
}
