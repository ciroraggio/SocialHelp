import {
  Grid,
  Box,
  IconButton,
  Dialog,
  DialogContent,
  Typography,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import SocialHelpAvatar from "./SocialHelpAvatar";
import CloseIcon from "@mui/icons-material/Close";

const SocialHelpProfileInfoDialog = ({ user, openDialog, closeDialog }) => {
  return (
    <>
      <Dialog
        open={openDialog}
        sx={{ "& .MuiDialog-paper": { width: "80%", maxHeight: 600 } }}
        maxWidth="md"
        disableEscapeKeyDown={true}
        disableBackdropClick={true}
      >
        <DialogContent>
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "start",
              gap: "1rem",
            }}
            pb={2}
          >
            <SocialHelpAvatar user={user} />
            <span>
              <b>{`${user.name} ${user.surname}`}</b>
              <br />@{user.username}
            </span>
          </Box>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography variant="subtitle2">From</Typography>
              <DialogContentText variant="subtitle2">
                {user.location}
              </DialogContentText>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle2">Biography</Typography>
              {user.biography ? (
                <DialogContentText variant="subtitle2">
                  {user.biography}
                </DialogContentText>
              ) : (
                <DialogContentText variant="subtitle2">
                  The user has not yet written a biography!
                </DialogContentText>
              )}
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <IconButton onClick={() => closeDialog(true)}>
            <CloseIcon />
          </IconButton>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default SocialHelpProfileInfoDialog;
