import { useState } from "react";
import {
  Avatar,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import EditInfoButton from "./Buttons/EditInfoButton";
import UpdateActionsButton from "./Buttons/UpdateActionsButton";
import { useSelector, useDispatch } from "react-redux";
import { openSocialHelpAlert, setIsLoading } from "../store/appSlice";
import { serverPutRequest } from "../utils/httpUtils";
import { setUserData } from "../store/userSlice";
import SocialHelpDivider from "./SocialHelpDivider";

const SocialHelpProfile = (props) => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.user);
  const userStored = useSelector((state) => state.user);
  const [editing, setEditing] = useState(false);
  const [values, setValues] = useState({
    name: userStored.name,
    surname: userStored.surname,
    phone: userStored.phone,
    email: userStored.email,
    location: userStored.location,
    biography: userStored.biography,
  });

  const [oldValues, setOldValues] = useState(values);

  const handleEdit = () => {
    setOldValues(values);
    setEditing(true);
  };

  const handleSave = () => {
    if (values !== oldValues) {
      dispatch(setIsLoading(true));
      serverPutRequest("user/updateCurrentUser", values, token)
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
        fullWidth
        disabled={!editing}
        onChange={(e) => handleChange(field, e.target.value)}
      />
    );
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" pb={10} pl={5} pr={5}>
        <Grid item pr={14}>
          {values.profileImageUrl ? (
            <Avatar
              sx={{ width: 250, height: 250 }}
              alt="Profile picture"
              src={values.profileImageUrl}
            />
          ) : (
            <Avatar
              sx={{ width: 250, height: 250, bgcolor: "#5bbcdd" }}
              aria-label="recipe"
            >
              {`${userStored.name[0]}${userStored.surname[0]}`}
            </Avatar>
          )}
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
            {!editing && EditInfoButton(handleEdit)}
            {editing && UpdateActionsButton(handleSave, handleCancel)}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
};

export default SocialHelpProfile;
