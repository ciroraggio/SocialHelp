import React, { useState } from "react";
import PropTypes from "prop-types";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import Dialog from "@mui/material/Dialog";
import DialogTitle from "@mui/material/DialogTitle";
import DialogContent from "@mui/material/DialogContent";
import DialogActions from "@mui/material/DialogActions";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { Card, CardContent, CardHeader, DialogContentText, TextField, Typography } from "@mui/material";
import UploadImageButton from "./Buttons/UploadImageButton";
import * as Yup from "yup";
import { closeNewPostDialog } from "../store/postSlice";
import { isRequiredField } from "../utils/settings";
import { serverPostRequestAuth } from "../utils/httpUtils";
import { openSocialHelpAlert, setIsLoading } from "../store/appSlice";
import SocialHelpAvatar from "./SocialHelpAvatar";
import { Box } from "@mui/system";

export const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialogContent-root": {
    padding: theme.spacing(2),
  },
  "& .MuiDialogActions-root": {
    padding: theme.spacing(1),
  },
}));

const styles = {
  formInput: {
    marginBottom: "16px",
  },
};

export function CustomizedDialog(props) {
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

const validationSchema = Yup.object().shape({
  description: Yup.string().required(isRequiredField),
  location: Yup.string().required(isRequiredField),
});
const valuesInitialState = {
  description: "",
  location: "",
};
const SocialHelpAddPostDialog = () => {
  const { newPostDialog } = useSelector((state) => state.post);
  const { location, token } = useSelector((state) => state.user);
  const user = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [values, setValues] = useState({ ...valuesInitialState, location });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const handleClose = () => {
    dispatch(closeNewPostDialog());
  };

  const handlePublish = (event) => {
    event.preventDefault();
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        dispatch(setIsLoading(true));
        serverPostRequestAuth("post/createPost", values, token)
          .then((res) => {
            handleClose();
            setValues(valuesInitialState);
            setErrors({});
            setServerError("");
            dispatch(setIsLoading(false));
            return;
          })
          .catch((err) => {
            dispatch(setIsLoading(false));
            dispatch(
              openSocialHelpAlert({
                type: "error",
                message:
                  "Pubblicazione del post non riuscita, riprovare più tardi!",
                vertical: "top",
                horizontal: "right",
              })
            );
          });
        throw new Error();
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      });
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <BootstrapDialog
        onClose={handleClose}
        open={newPostDialog.open}
        sx={{
          "& .MuiDialog-paper": { width: "80%", maxHeight: 900, maxWidth: 900 },
        }}
        maxWidth="xs"
      >
        <DialogContent dividers>
            <CardHeader
              avatar={<SocialHelpAvatar user={user} />}
              title={
                <>
                  <Typography variant="subtitle1" color="text" align="left">
                    {`${user.name} ${user.surname}`}
                  </Typography>
                </>
              }
              subheader={
                <Typography
                  variant="subtitle2"
                  color="text.secondary"
                  align="left"
                >
                  {user.location}
                </Typography>
              }
            />
            <CardContent>
              <form onSubmit={handlePublish}>
                <TextField
                  id="description"
                  name="description"
                  label="Description"
                  multiline
                  rows={7}
                  type="text"
                  value={values.description}
                  onChange={handleChange}
                  error={Boolean(errors.description)}
                  helperText={errors.description}
                  fullWidth
                  sx={styles.formInput}
                />
                <TextField
                  id="location"
                  name="location"
                  label="Location"
                  type="text"
                  value={values.location}
                  onChange={handleChange}
                  error={Boolean(errors.location)}
                  helperText={errors.location}
                  fullWidth
                  sx={styles.formInput}
                />
                {serverError && <p>{serverError}</p>}
              </form>
              <div style={{ paddingTop: "10px" }}>
                <UploadImageButton />
              </div>
            </CardContent>
        </DialogContent>
        <DialogActions>
          <Button
            autoFocus
            onClick={handlePublish}
            type="submit"
            sx={{ textTransform: "none" }}
          >
            Post
          </Button>
        </DialogActions>
      </BootstrapDialog>
    </div>
  );
};

export default SocialHelpAddPostDialog;
