import { useState } from "react";
import { TextField, Grid, Avatar, Typography } from "@mui/material";
import FollowButton from "./Buttons/SocialHelpFollow";

const profiles = [
  {
    id: 1,
    name: "John Doe",
    username: "johndoe",
    avatarUrl: "https://picsum.photos/200",
  },
  {
    id: 2,
    name: "Jane Doe",
    username: "janedoe",
    avatarUrl: "https://picsum.photos/200",
  },
  // ... altri profili
];

const SocialHelpExplore = () => {
  const [searchText, setSearchText] = useState("");

  const handleSearchTextChange = (event) => {
    setSearchText(event.target.value);
  };

  const filteredProfiles = profiles.filter((profile) =>
    profile.name.toLowerCase().includes(searchText.toLowerCase())
  );

  return (
    <Grid container spacing={2} justifyContent="center">
      <Grid item xs={12}>
        <TextField
          fullWidth
          label="Cerca profili"
          variant="outlined"
          value={searchText}
          onChange={handleSearchTextChange}
        />
      </Grid>
      {filteredProfiles.map((profile) => (
        <Grid key={profile.id} item xs={12}>
          <Grid container alignItems="center" spacing={2}>
            <Grid item>
              <Avatar src={profile.avatarUrl} />
            </Grid>
            <Grid item xs={11}>
              <Typography variant="subtitle1">{profile.name}</Typography>
              <Typography
                variant="body2"
                color="textSecondary"
              >{`@${profile.username}`}</Typography>
            </Grid>
            <Grid item>
              <FollowButton />
            </Grid>
          </Grid>
        </Grid>
      ))}
    </Grid>
  );
};

export default SocialHelpExplore;
