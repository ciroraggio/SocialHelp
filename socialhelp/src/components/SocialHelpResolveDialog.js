import * as React from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import Typography from "@mui/material/Typography";
import { useDispatch, useSelector } from "react-redux";
import { closeResolveDialog, openResolveDialog } from "../store/appSlice";
import { DialogContentText, TextField } from "@mui/material";
import UploadImageButton from "./Buttons/UploadImageButton";

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

function CustomizedDialog(props) {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: "absolute",
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
}

CustomizedDialog.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

const SocialHelpResolveDialog = () => {
  const { resolveDialog } = useSelector((state) => state.app);
  const dispatch = useDispatch();

  const handleClose = () => {
    dispatch(closeResolveDialog());
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        open={resolveDialog.open}
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 900, maxWidth: 900 } }}
        maxWidth="xs"
      >
        <CustomizedDialog onClose={handleClose}>
          Aggiungi nuovo post
        </CustomizedDialog>
        <DialogContent dividers>
          <TextField
            id="outlined-multiline-static"
            label="Descrizione"
            placeholder="Descrivi il tuo problema..."
            multiline
            rows={7}
            fullWidth
            sx={{paddingBottom: '16px'}}
          />
          <TextField
            id="outlined-multiline-static"
            label="Luogo"
            placeholder="Aggiungi il luogo..."
            fullWidth
          />
          <div style={{ paddingTop: "10px" }}>
            <UploadImageButton />
          </div>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handleClose}
            sx={{ textTransform: "none" }}
          >
            Pubblica
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default SocialHelpResolveDialog;
