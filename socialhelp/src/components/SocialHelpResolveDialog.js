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

const SocialHelpResolveDialog = () => {
  const { resolvePostDialog } = useSelector((state) => state.post);
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
        // TODO pubblica post
        handleClose();
        setValues(valuesInitialState);
        setErrors({});
        setServerError("");
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
        <DialogContentText paddingBottom={4}>Fai una proposta di risoluzione, l'utente che ha creato il post potrà accettarla e condividere la risoluzione con gli altri utenti.</DialogContentText>
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

export default SocialHelpResolveDialog;
