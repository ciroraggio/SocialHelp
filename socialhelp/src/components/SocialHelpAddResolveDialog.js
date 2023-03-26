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
                  "Proposta di risoluzione inviata, controlla la sezione notifiche per rimanere aggiornato!",
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
                  "Proposta di risoluzione non inviata, riprovare o segnalare l'errore!",
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
        Risolvi il problema
      </CustomizedDialog>
      <DialogContent dividers>
        <DialogContentText paddingBottom={4}>
          Fai una proposta di risoluzione. L'utente che ha creato il post potrà
          accettarla e condividere la risoluzione con gli altri utenti.
        </DialogContentText>
        <form onSubmit={handleSave}>
          <TextField
            id="description"
            name="description"
            label="Descrizione"
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
          Invia
        </Button>
      </DialogActions>
    </BootstrapDialog>
  );
};

export default SocialHelpAddResolveDialog;
