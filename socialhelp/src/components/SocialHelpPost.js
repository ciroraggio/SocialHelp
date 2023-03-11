import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { CardMedia } from "@mui/material";
import SharePostButton from "./Buttons/SharePostButton";
import ResolvePostButton from "./Buttons/ResolvePostButton";

const SocialHelpPost = (props) => {
  const { user, post } = props;
  const [images, setImages] = useState(null);

  useEffect(() => {
    setImages(post.images);
  }, []);

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader
        avatar={
          <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
            {user.profileImage || user.initials}
          </Avatar>
        }
        action={
          <IconButton aria-label="settings">
            <MoreVertIcon />
          </IconButton>
        }
        title={
          <Typography variant="subtitle1" color="text" align="left">
            {`${user.name} ${user.surname}`}
          </Typography>
        }
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
        <SharePostButton />
        <ResolvePostButton />
      </CardActions>
    </Card>
  );
};

export default SocialHelpPost;
