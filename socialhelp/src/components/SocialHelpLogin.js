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
import { useNavigate } from "react-router-dom";
import {
  isRequiredField,
  LOCAL_STORAGE_TOKEN_KEY,
  WINDOW_RESOLUTIONS,
} from "../utils/settings";
import {
  fetchAllResolutionByUser,
  fetchLogin,
  serverPostRequestNoAuth,
} from "../utils/httpUtils";
import { useDispatch } from "react-redux";
import { setUserData } from "../store/userSlice";
import {
  closeSocialHelpAlert,
  openSocialHelpAlert,
  setIsLoading,
  setNotifications,
} from "../store/appSlice";

const validationSchema = Yup.object().shape({
  username: Yup.string().required(isRequiredField),
  password: Yup.string().required(isRequiredField),
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
    marginBottom: "16px",
  },
  formButton: {
    marginTop: "24px",
  },
  showPasswordButton: {
    scale: "70%",
  },
};

const SocialHelpLogin = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
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
        fetchLogin({
          username: values.username,
          password: values.password,
        })
          .then((data) => {
            if (data?.user && data?.token) {
              dispatch(setIsLoading(true));
              localStorage.setItem(LOCAL_STORAGE_TOKEN_KEY, data.token);
              dispatch(setUserData(data));
              dispatch(closeSocialHelpAlert());
              fetchAllResolutionByUser(data.token).then((data) => {
                if (data.resolutions) {
                  window[WINDOW_RESOLUTIONS] = data.resolutions;
                  dispatch(setNotifications(window[WINDOW_RESOLUTIONS].length));
                  dispatch(setIsLoading(false));
                  return;
                }
                throw new Error();
              });
              return navigate("/feed");
            }
            throw new Error();
          })
          .catch((error) =>
            dispatch(
              openSocialHelpAlert({
                type: "error",
                message: "Errore, verificare le credenziali e riprovare!",
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

  const handleClickShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
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
              {serverError && <p>{serverError}</p>}
              <Button
                type="submit"
                variant="contained"
                color="primary"
                fullWidth
                sx={styles.formButton}
              >
                Accedi
              </Button>
            </form>
            <Typography mt={3}>
              Non hai un account?{" "}
              <Link href="/signup" color="primary">
                Registrati
              </Link>
            </Typography>{" "}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SocialHelpLogin;
