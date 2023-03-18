import * as React from "react";
import Alert from "@mui/material/Alert";
import { useDispatch, useSelector } from "react-redux";
import { closeSocialHelpAlert } from "../store/appSlice";
import { Snackbar } from "@mui/material";

export default function SociaHelpSnackbar() {
  const { socialHelpAlert } = useSelector((state) => state.app);
  const { vertical, horizontal, show, message, type } = socialHelpAlert;
  const dispatch = useDispatch();

  const onClose = () => dispatch(closeSocialHelpAlert());

  return (
    <Snackbar
      open={show}
      autoHideDuration={6000}
      anchorOrigin={{ vertical, horizontal }}
    >
      <Alert onClose={onClose} severity={type} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );
}
