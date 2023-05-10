import { useState } from "react";
import {
  Button,
  DialogContent,
  DialogActions,
  TextField,
  DialogContentText,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { closeResolvePostDialog } from "../store/postSlice";
import * as Yup from "yup";
import { BootstrapDialog, CustomizedDialog } from "./SocialHelpAddPostDialog";
import { isRequiredField } from "../utils/settings";
import { openSocialHelpAlert, setIsLoading } from "../store/appSlice";
import { serverPostRequestAuth } from "../utils/httpUtils";

const validationSchema = Yup.object().shape({
  description: Yup.string().required(isRequiredField),
});

const valuesInitialState = {
  description: "",
};

const styles = {
  formInput: {
    marginBottom: "16px",
  },
};

const SocialHelpAddResolveDialog = () => {
  const { resolvePostDialog } = useSelector((state) => state.post);
  const { token } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [values, setValues] = useState(valuesInitialState);
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const handleClose = () => {
    dispatch(closeResolvePostDialog());
  };

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSave = (event) => {
    event.preventDefault();
    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        dispatch(setIsLoading(true));
        const body = {
          description: values.description,
          post: resolvePostDialog.data.post._id,
        };
        serverPostRequestAuth("resolution/createResolution", body, token)
          .then((res) => {
            handleClose();
            setValues(valuesInitialState);
            setErrors({});
            setServerError("");
            dispatch(setIsLoading(false));
            dispatch(
              openSocialHelpAlert({
                type: "success",
                message:
                  "Resolution proposal sent, check the notifications section to stay updated!",
                vertical: "top",
                horizontal: "right",
              })
            );
            return;
          })
          .catch((err) => {
            dispatch(setIsLoading(false));
            dispatch(
              openSocialHelpAlert({
                type: "error",
                message:
                  "Resolution proposal not sent, please try again or report the error!",
                vertical: "top",
                horizontal: "right",
              })
            );
          });
      })
      .catch((validationErrors) => {
        const errors = {};
        if (validationErrors.inner)
          validationErrors.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
        setErrors(errors);
      });
  };

  return (
    <BootstrapDialog
      onClose={handleClose}
      open={resolvePostDialog.open}
      sx={{
        "& .MuiDialog-paper": { width: "80%", maxHeight: 900, maxWidth: 900 },
      }}
      maxWidth="xs"
    >
      <CustomizedDialog onClose={handleClose}>
        Solve the problem
      </CustomizedDialog>
      <DialogContent dividers>
        <DialogContentText paddingBottom={4}>
          Propose a resolution! The user who created the post will be able to
          accept it and share the resolution with other users.
        </DialogContentText>
        <form onSubmit={handleSave}>
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
          {serverError && <p>{serverError}</p>}
        </form>
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={handleSave}
          type="submit"
          sx={{ textTransform: "none" }}
        >
          Submit
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default SocialHelpAddResolveDialog;
