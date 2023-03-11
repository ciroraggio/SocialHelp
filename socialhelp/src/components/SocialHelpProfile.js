import { useState } from "react";
import { Avatar, Grid, Stack, TextField, Typography } from "@mui/material";
import EditInfoButton from "./Buttons/EditInfoButton";
import UpdateActionsButton from "./Buttons/UpdateActionsButton";
import { fakeProfileData } from "../utils/dataUtils";
import { red } from "@mui/material/colors";

const SocialHelpProfile = () => {
  const [editing, setEditing] = useState(false);
  const [user, setUser] = useState(fakeProfileData);

  const handleEdit = () => {
    setEditing(true);
  };

  const handleSave = () => {
    setEditing(false);
    // TODO Salva i valori modificati
  };

  const handleCancel = () => {
    setEditing(false);
    // TODO Ripristina i valori originali
  };

  const handleChange = (field, value) => {
    setUser({ ...user, [field]: value });
  };

  const renderTextField = (field, label, value) => {
    return (
      <TextField
        id={field}
        label={label}
        value={value}
        fullWidth
        style={{ maxWidth: 900 }}
        disabled={!editing}
        onChange={(e) => handleChange(field, e.target.value)}
      />
    );
  };

  return (
    <>
      <Grid container spacing={2} alignItems="center" p={6}>
        <Grid item pr={3}>
          {user.profileImageUrl ? (
            <Avatar
              sx={{ width: 250, height: 250 }}
              alt="Profile picture"
              src={user.profileImageUrl}
            />
          ) : (
            <Avatar
              sx={{ width: 250, height: 250, bgcolor: red[500] }}
              aria-label="recipe"
            >
              {`${user.name[0]}${user.surname[0]}`}
            </Avatar>
          )}
        </Grid>
        <Grid item xs>
          <Stack direction="column" spacing={2}>
            <Typography variant="h5" component="div">
              {renderTextField("name", "Name", user.name)}
            </Typography>
            <Typography variant="h5" component="div">
              {renderTextField("surname", "Surname", user.surname)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {renderTextField("email", "Email", user.email)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {renderTextField("phone", "Phone", user.phone)}
            </Typography>
            <Typography variant="body1" color="text.secondary">
              {renderTextField("location", "Location", user.location)}
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
