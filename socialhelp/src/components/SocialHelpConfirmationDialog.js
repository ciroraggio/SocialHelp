import * as React from "react";
import Button from "@mui/material/Button";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import { DialogContentText, DialogTitle } from "@mui/material";

const SocialHelpConfirmationDialog = ({ title, message, confirmationButtonText, open, setOpen, handleOk }) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 435 } }}
      maxWidth="xs"
      open={open}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent dividers>
        <DialogContentText>{message}</DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} sx={{ textTransform: "none" }}>
          Annulla
        </Button>
        <Button onClick={handleOk} sx={{ textTransform: "none" }}>
          {confirmationButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default SocialHelpConfirmationDialog;
