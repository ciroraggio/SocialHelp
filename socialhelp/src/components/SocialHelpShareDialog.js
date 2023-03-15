import { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { CopyToClipboard } from "react-copy-to-clipboard";
import TelegramIcon from "@mui/icons-material/Telegram";
import WhatsAppIcon from "@mui/icons-material/WhatsApp";
import FacebookIcon from "@mui/icons-material/Facebook";
import { useDispatch, useSelector } from "react-redux";
import { closeSharePostDialog } from "../store/postSlice";
import {
  handleFacebookShare,
  handleTelegramShare,
  handleWhatsAppShare,
} from "../utils/shareUtils";
import { BootstrapDialog, CustomizedDialog } from "./SocialHelpAddPostDialog";

const SocialHelpShareDialog = () => {
  const [copied, setCopied] = useState(false);
  const { sharePostDialog, postUrl } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  function handleCopy() {
    setCopied(true);
  }

  const handleClose = () => {
    setCopied(false);
    dispatch(closeSharePostDialog());
  };

  return (
    <BootstrapDialog
      open={sharePostDialog.open}
      onClose={handleClose}
      sx={{
        "& .MuiDialog-paper": { width: "80%", maxHeight: 900, maxWidth: 900 },
      }}
    >
      <CustomizedDialog onClose={handleClose}>
        Condividi il post
      </CustomizedDialog>
      <DialogContent dividers>
        <Typography variant="subtitle1">Condividi su:</Typography>
        <IconButton onClick={() => handleTelegramShare(postUrl)}>
          <TelegramIcon />
        </IconButton>
        <IconButton onClick={() => handleWhatsAppShare(postUrl)}>
          <WhatsAppIcon />
        </IconButton>
        <IconButton onClick={() => handleFacebookShare(postUrl)}>
          <FacebookIcon />
        </IconButton>
        <Typography variant="subtitle1">Copia il link:</Typography>
        <TextField
          value={postUrl}
          fullWidth
          InputProps={{
            readOnly: true,
            endAdornment: (
              <CopyToClipboard text={postUrl} onCopy={handleCopy}>
                <Button sx={{ textTransform: "none" }} disabled={copied}>
                  {copied ? "Copiato!" : "Copia"}
                </Button>
              </CopyToClipboard>
            ),
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} sx={{ textTransform: "none" }}>
          Chiudi
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default SocialHelpShareDialog;
