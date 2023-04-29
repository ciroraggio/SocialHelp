import { useState } from "react";
import {
  Avatar,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import * as Yup from "yup";
import { Visibility, VisibilityOff } from "@mui/icons-material";

import EditInfoButton from "./Buttons/EditInfoButton";
import UpdateActionsButton from "./Buttons/UpdateActionsButton";
import { useSelector, useDispatch } from "react-redux";
import { openSocialHelpAlert, setIsLoading } from "../store/appSlice";
import { serverPostRequestAuth, serverPutRequest } from "../utils/httpUtils";
import { setUserData } from "../store/userSlice";
import SocialHelpDivider from "./SocialHelpDivider";
import { base64ToImage, digitsOnly } from "../utils/settings";
import UploadImageButton from "./Buttons/UploadImageButton";

const validationSchema = Yup.object().shape({
  name: Yup.string(),
  surname: Yup.string(),
  biography: Yup.string().max(
    400,
    "The bio cannot contain more than 400 characters"
  ),
  email: Yup.string().email("Enter a valid email address"),
  password: Yup.lazy((value) =>
    value
      ? Yup.string().matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        )
      : Yup.string().notRequired()
  ),
  passwordConfirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Password does not match"
  ),
  location: Yup.string(),
  phone: Yup.string().test(
    "Phone",
    "The field should have digits only",
    digitsOnly
  ),
});

const styles = {
  showPasswordButton: {
    scale: "70%",
  },
};

const SocialHelpProfile = (props) => {
  const dispatch = useDispatch();
  const { token, profilePicture } = useSelector((state) => state.user);
  const userStored = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({
    name: userStored.name,
    surname: userStored.surname,
    phone: userStored.phone,
    email: userStored.email,
    location: userStored.location,
    biography: userStored.biography,
    password: "",
    passwordConfirmation: "",
  });
  const [errors, setErrors] = useState({});
  const [oldValues, setOldValues] = useState(values);
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
  const handleEdit = () => {
    setOldValues(values);
    setEditing(true);
  };

  const handleSave = () => {
    if (values !== oldValues) {
      validationSchema
        .validate(values, { abortEarly: false })
        .then(() => {
          dispatch(setIsLoading(true));

          // if there is no password then I delete it from the body
          const { passwordConfirmation, ...userData } = values;
          const body = userData.password
            ? userData
            : (({ password, ...rest }) => rest)(userData);

          serverPutRequest("user/updateCurrentUser", body, token)
            .then((res) => res.json())
            .then((data) => {
              if (data && data.username) {
                dispatch(setUserData({ user: data }));
                dispatch(setIsLoading(false));
                setEditing(false);
              } else {
                throw new Error();
              }
            })
            .catch((err) => {
              dispatch(setIsLoading(false));
              setEditing(false);
              dispatch(
                openSocialHelpAlert({
                  type: "error",
                  message:
                    "Error while updating personal data, try again later.",
                  vertical: "bottom",
                  horizontal: "left",
                })
              );
            });
        })
        .catch((validationErrors) => {
          const errors = {};
          validationErrors.inner.forEach((error) => {
            errors[error.path] = error.message;
          });
          setErrors(errors);
        });
    } else {
      setEditing(false);
    }
  };

  const handleCancel = () => {
    setValues(oldValues);
    setEditing(false);
  };

  const handleChange = (field, value) => {
    setValues({ ...values, [field]: value });
  };

  const renderTextField = (field, label, value) => {
    return (
      <TextField
        id={field}
        label={label}
        value={value}
        error={errors[field]}
        helperText={errors[field]}
        fullWidth
        disabled={!editing}
        onChange={(e) => handleChange(field, e.target.value)}
      />
    );
  };
  const onImageChange = (event) => {
    if (event.target.files && event.target.files[0]) {
      dispatch(setIsLoading(true));
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const base64Image = reader.result;
        serverPostRequestAuth(
          "user/uploadProfilePicture",
          { data: base64Image },
          token
        )
          .then((res) => {
            dispatch(setUserData({ user: { profilePicture: base64Image } }));
            dispatch(setIsLoading(false));
            dispatch(
              openSocialHelpAlert({
                type: "success",
                message: "Profile picture updated successfully!",
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
                message: "Unable to update profile photo, please try again later!",
                vertical: "top",
                horizontal: "right",
              })
            );
          });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" pb={10} pl={5} pr={5}>
        <Grid item pr={14}>
          {profilePicture ? (
            <Avatar
              sx={{ width: 200, height: 200 }}
              alt="Profile picture"
              src={base64ToImage(profilePicture)}
            />
          ) : (
            <Avatar
              sx={{ width: 200, height: 200, bgcolor: "#5bbcdd" }}
              aria-label="recipe"
            >
              {`${userStored.name[0]}${userStored.surname[0]}`}
            </Avatar>
          )}
          <div>
            <UploadImageButton onImageChange={onImageChange} />
          </div>
        </Grid>
        <Grid item xs>
          <Typography variant="h5" component="div">
            <TextField
              id="biography"
              label="Biography"
              value={values.biography}
              fullWidth
              disabled={!editing}
              multiline
              error={Boolean(errors.biography)}
              helperText={errors.biography}
              maxRows={7}
              minRows={7}
              onChange={(e) => handleChange("biography", e.target.value)}
            />
          </Typography>
          {!editing && EditInfoButton(handleEdit)}
          {editing && UpdateActionsButton(handleSave, handleCancel)}
        </Grid>
      </Grid>
      <Grid container spacing={2} pl={5} pr={5}>
        <Grid item xs>
          <SocialHelpDivider text="Your data" />
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" component="div">
              {renderTextField("name", "Name", values.name)}
            </Typography>
            <Typography variant="h5" component="div">
              {renderTextField("surname", "Surname", values.surname)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {renderTextField("email", "Email", values.email)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {renderTextField("phone", "Phone", values.phone)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {renderTextField("location", "Location", values.location)}
            </Typography>
            <TextField
              id="password"
              name="password"
              label="Password"
              type={showPassword ? "text" : "password"}
              value={values.password}
              disabled={!editing}
              onChange={(e) => handleChange("password", e.target.value)}
              error={Boolean(errors.password)}
              helperText={errors.password}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={styles.showPasswordButton}>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      disabled={!editing}
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
              label="Retype password"
              type={showPasswordConfirmation ? "text" : "password"}
              value={values.passwordConfirmation}
              onChange={(e) =>
                handleChange("passwordConfirmation", e.target.value)
              }
              disabled={!editing}
              error={Boolean(errors.passwordConfirmation)}
              helperText={errors.passwordConfirmation}
              fullWidth
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end" sx={styles.showPasswordButton}>
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPasswordConfirmation}
                      disabled={!editing}
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
            {!editing && EditInfoButton(handleEdit)}
            {editing && UpdateActionsButton(handleSave, handleCancel)}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default SocialHelpProfile;
