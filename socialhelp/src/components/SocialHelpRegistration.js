import React, { useState } from "react";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Grid,
  Typography,
  InputAdornment,
  IconButton,
  Link,
} from "@mui/material";
import { Box } from "@mui/system";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { isRequiredField } from "../utils/settings";
import { serverPostRequestNoAuth } from "../utils/httpUtils";
import { openSocialHelpAlert } from "../store/appSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import CustomSwitch from "./Buttons/CustomSwitch";
import InfoButton from "./Buttons/InfoButton";

const validationSchema = Yup.object().shape({
  name: Yup.string().required(isRequiredField),
  surname: Yup.string().required(isRequiredField),
  email: Yup.string()
    .email("Inserisci un indirizzo email valido")
    .required(isRequiredField),
  username: Yup.string().required(isRequiredField),
  password: Yup.string().required("Password is required"),
  passwordConfirmation: Yup.string()
    .oneOf([Yup.ref("password"), null], "Password errata")
    .required(isRequiredField),
  location: Yup.string().required(isRequiredField),
  phone: Yup.string().required(isRequiredField),
});

const styles = {
  root: {
    backgroundColor: "#0093E9",
    backgroundImage: " linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
    height: "100vh",
  },
  formContainer: {
    width: "100%",
    maxWidth: "350px",
    margin: "auto",
    padding: "40px",
    backgroundColor: "white",
    borderRadius: "8px",
    boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.1)",
  },
  formInput: {
    marginBottom: "10px",
  },
  formButton: {
    marginTop: "24px",
  },
  showPasswordButton: {
    scale: "70%",
  },
};

const SocialHelpRegistration = () => {
  const dispatch = useDispatch();
  const [verified, setVerified] = useState(false);
  const [values, setValues] = useState({
    name: "",
    surname: "",
    email: "",
    username: "",
    password: "",
    passwordConfirmation: "",
    location: "",
    phone: "",
    verified: false,
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    validationSchema
      .validate(values, { abortEarly: false })
      .then(() => {
        const { passwordConfirm, ...userData } = values;
        serverPostRequestNoAuth("user/createUser", userData)
          .then((res) => res.json())
          .then((data) => {
            navigate("/login");
            return dispatch(
              openSocialHelpAlert({
                type: "success",
                message: "Registrazione avvenuta con successo!",
                vertical: "top",
                horizontal: "right",
              })
            );
          })
          .catch((err) =>
            dispatch(
              openSocialHelpAlert({
                type: "error",
                message:
                  "Errore nella richiesta di registrazione, riprovare più tardi.",
                vertical: "top",
                horizontal: "right",
              })
            )
          );
      })
      .catch((validationErrors) => {
        const errors = {};
        validationErrors.inner.forEach((error) => {
          errors[error.path] = error.message;
        });
        setErrors(errors);
      });
  };

  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirmation, setShowPasswordConfirmation] =
    useState(false);

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleClickShowPasswordConfirmation = () => {
    setShowPasswordConfirmation((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const goToLogin = () => {
    return navigate("/login");
  };

  const handleVerifiedChange = () => {
    setVerified(!verified);
    setValues({
      ...values,
      verified: !verified,
    });
  };

  return (
    <Box sx={styles.root}>
      <Grid container justifyContent="center" alignItems="center" height="100%">
        <Grid item>
          <Box sx={styles.formContainer}>
            <Typography mb={3}>
              <img
                style={{ width: "-webkit-fill-available" }}
                src="/assets/images/icons/SocialHelpToolbarLogoBlue.png"
                alt="Logo"
              />
            </Typography>
            <form onSubmit={handleSubmit}>
              <TextField
                id="name"
                name="name"
                label="Nome"
                type="nome"
                value={values.name}
                onChange={handleChange}
                error={Boolean(errors.name)}
                helperText={errors.name}
                fullWidth
                sx={styles.formInput}
              />
              <TextField
                id="surname"
                name="surname"
                label="Cognome"
                type="surname"
                value={values.surname}
                onChange={handleChange}
                error={Boolean(errors.surname)}
                helperText={errors.surname}
                fullWidth
                sx={styles.formInput}
              />
              <TextField
                id="email"
                name="email"
                label="Email"
                type="email"
                value={values.email}
                onChange={handleChange}
                error={Boolean(errors.email)}
                helperText={errors.email}
                fullWidth
                sx={styles.formInput}
              />
              <TextField
                id="username"
                name="username"
                label="Username"
                type="username"
                value={values.username}
                onChange={handleChange}
                error={Boolean(errors.username)}
                helperText={errors.username}
                fullWidth
                sx={styles.formInput}
              />
              <TextField
                id="location"
                name="location"
                label="Città"
                type="text"
                value={values.location}
                onChange={handleChange}
                error={Boolean(errors.location)}
                helperText={errors.location}
                fullWidth
                sx={styles.formInput}
              />
              <TextField
                id="phone"
                name="phone"
                label="Cellulare"
                type="tel"
                value={values.phone}
                onChange={handleChange}
                error={Boolean(errors.phone)}
                helperText={errors.phone}
                fullWidth
                sx={styles.formInput}
              />
              <TextField
                id="password"
                name="password"
                label="Password"
                type={showPassword ? "text" : "password"}
                value={values.password}
                onChange={handleChange}
                error={Boolean(errors.password)}
                helperText={errors.password}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={styles.showPasswordButton}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={styles.formInput}
              />
              <TextField
                id="passwordConfirmation"
                name="passwordConfirmation"
                label="Ripeti password"
                type={showPasswordConfirmation ? "text" : "password"}
                value={values.passwordConfirmation}
                onChange={handleChange}
                error={Boolean(errors.passwordConfirmation)}
                helperText={errors.passwordConfirmation}
                fullWidth
                InputProps={{
                  endAdornment: (
                    <InputAdornment
                      position="end"
                      sx={styles.showPasswordButton}
                    >
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPasswordConfirmation}
                        onMouseDown={handleMouseDownPassword}
                      >
                        {showPasswordConfirmation ? (
                          <VisibilityOff />
                        ) : (
                          <Visibility />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                sx={styles.formInput}
              />
              <Box sx={styles.formInput} display="flex" alignItems="center">
                <Typography>
                  Richiedi un account verificato
                  <InfoButton
                    style={{ paddingRight: 38 }}
                    message={
                      "Un account verificato è pensato per autorità, pubbliche amministrazioni ed enti pubblici. Se richiedi un account verificato il team di SocialHelp dovrà eseguire maggiori controlli."
                    }
                  />
                </Typography>
                <CustomSwitch
                  checked={verified}
                  handleChange={handleVerifiedChange}
                />
              </Box>

              {serverError && <p>{serverError}</p>}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={styles.formButton}
              >
                Registrati
              </Button>
            </form>
            <Typography mt={3}>
              Hai già un account?
              <Link color="primary" onClick={goToLogin}>
                Accedi
              </Link>
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialHelpRegistration;
