import * as React from "react";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import Dialog from "@mui/material/Dialog";
import {
  Card,
  CardContent,
  CardHeader,
  DialogContentText,
  Grid,
  IconButton,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CloseIcon from "@mui/icons-material/Close";
import SocialHelpAvatar from "./SocialHelpAvatar";
import { useSelector } from "react-redux";
import RejectResolutionButton from "./Buttons/RejectResolutionButton";
import { resolutionStatus } from "../utils/settings";
import AcceptResolutionButton from "./Buttons/AcceptResolutionButton";
import CancelIcon from "@mui/icons-material/Cancel";
import CustomVerifiedIcon from "./CustomVerifiedIcon";
const ResolutionPostViewer = ({ authorUser, description }) => {
  return (
    <Card>
      <CardHeader
        avatar={<SocialHelpAvatar user={authorUser} />}
        title={
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="subtitle1" color="text" align="left">
              {`${authorUser.name} ${authorUser.surname}`}
            </Typography>
            {authorUser?.verified && <CustomVerifiedIcon />}
          </Stack>
        }
        subheader={
          <Typography variant="subtitle2" color="text.secondary" align="left">
            {authorUser.location}
          </Typography>
        }
      />
      <CardContent>
        <DialogContentText>{description}</DialogContentText>
      </CardContent>
    </Card>
  );
};

const SocialHelpResolveConfirmationDialog = ({
  resolutionInfo,
  open,
  setOpen,
  handleResolve,
}) => {
  const handleClose = () => {
    setOpen(false);
  };
  const userInSession = useSelector((state) => state.user);

  return (
    <Dialog
      sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 600 } }}
      maxWidth="md"
      open={open}
      disableEscapeKeyDown={true}
      disableBackdropClick={true}
    >
      <DialogContent dividers>
        <Typography variant="subtitle2" color="text" align="left" pb={2}>
          For your post:
        </Typography>
        <ResolutionPostViewer
          authorUser={userInSession}
          description={resolutionInfo.post.description}
        />
        <Typography variant="subtitle2" color="text" align="left" pt={2} pb={2}>
          The user proposes the following resolution:
        </Typography>
        <ResolutionPostViewer
          authorUser={resolutionInfo.user}
          description={resolutionInfo.description}
        />
        <Typography variant="subtitle2" color="text" align="left" pt={2} pb={2}>
          {resolutionInfo.status === resolutionStatus.PENDING &&
            "You can choose whether to accept or decline the offer. Remember that your choice will be published."}
          {resolutionInfo.status === resolutionStatus.REJECTED && (
            <Grid container>
              <Grid item pr={1}>
                <CancelIcon sx={{ color: "red" }} />
              </Grid>
              <Grid item xs={11}>
                <Typography>You refused the proposal!</Typography>
              </Grid>
            </Grid>
          )}
          {resolutionInfo.status === resolutionStatus.ACCEPTED && (
            <Grid container>
              <Grid item pr={1}>
                <CheckCircleIcon sx={{ color: "green" }} />
              </Grid>
              <Grid item xs={11}>
                <Typography>You accepted the proposal!</Typography>
              </Grid>
            </Grid>
          )}
        </Typography>
      </DialogContent>
      <DialogActions>
        {resolutionInfo.status === resolutionStatus.PENDING && (
          <>
            <RejectResolutionButton
              resolutionInfo={resolutionInfo}
              handleClose={handleClose}
            />
            <AcceptResolutionButton
              resolutionInfo={resolutionInfo}
              handleClose={handleClose}
            />
          </>
        )}
        <Tooltip title="Close">
          <IconButton
            onClick={handleClose}
            color="primary"
            sx={{ textTransform: "none" }}
          >
            <CloseIcon />
          </IconButton>
        </Tooltip>
      </DialogActions>
    </Dialog>
  );
};

export default SocialHelpResolveConfirmationDialog;
