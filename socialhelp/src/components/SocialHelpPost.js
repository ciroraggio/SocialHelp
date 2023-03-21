import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import { CardMedia } from "@mui/material";
import SharePostButton from "./Buttons/SharePostButton";
import ResolvePostButton from "./Buttons/ResolvePostButton";
import SpreadPostButton from "./Buttons/SpreadPostButton";
import { useSelector } from "react-redux";
import DeletePostButton from "./Buttons/DeletePostButton";
import { getPostUrl } from "../utils/shareUtils";

const SocialHelpPost = (props) => {
  const { user, post } = props;
  const [images, setImages] = useState(null);
  const [dateField, setDateField] = useState(null);
  const [isUserInSession, setIsUserInSession] = useState(false);
  const { username: usernameInSession } = useSelector((state) => state.user);

  useEffect(() => {
    setImages(post.images);
    setDateField(
      `Pubblicato il ${
        post.createdAt.toString().split("T")[0]
      } alle ${post.createdAt.toString().split("T")[1].substring(0, 5)}`
    );
    setIsUserInSession(usernameInSession === user.username);
  }, []);

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: '#5bbcdd' }} aria-label="recipe">
            {user.profileImage || `${user.name[0]}${user.surname[0]}`}
          </Avatar>
        }
        title={
          <>
            <Typography variant="subtitle1" color="text" align="left">
              {`${user.name} ${user.surname}`}
            </Typography>
          </>
        }
        action={<SharePostButton postUrl={getPostUrl(post)} />}
        subheader={
          <Typography variant="subtitle2" color="text.secondary" align="left">
            {post.location}
          </Typography>
        }
      />
      <CardContent>
        <Typography variant="body2" color="text.secondary" align="left">
          {post.description}
        </Typography>
      </CardContent>
      {post.images && post.images.length > 0 && (
        <>
          {post.images.map((item) => (
            <CardMedia
              component="img"
              alt="green iguana"
              height="140"
              image={item}
            />
          ))}
        </>
      )}
      <CardActions disableSpacing>
        <SpreadPostButton />
        {usernameInSession !== user.username && <ResolvePostButton />}
        {usernameInSession === user.username && <DeletePostButton />}
        <Typography
          variant="caption"
          color="black"
          align="left"
          paddingLeft={62}
        >
          {dateField}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default SocialHelpPost;
