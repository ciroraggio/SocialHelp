import React, { useEffect, useState } from "react";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Typography from "@mui/material/Typography";
import { Stack } from "@mui/material";
import SharePostButton from "./Buttons/SharePostButton";
import ResolvePostButton from "./Buttons/ResolvePostButton";
import SpreadPostButton from "./Buttons/SpreadPostButton";
import { useSelector } from "react-redux";
import DeletePostButton from "./Buttons/DeletePostButton";
import { getPostUrl } from "../utils/shareUtils";
import SocialHelpAvatar from "./SocialHelpAvatar";
import CustomVerifiedIcon from "./CustomVerifiedIcon";
const SocialHelpPost = (props) => {
  const { user, post } = props;
  const [dateField, setDateField] = useState(null);
  const [isUserInSession, setIsUserInSession] = useState(false);
  const { username: usernameInSession } = useSelector((state) => state.user);

  useEffect(() => {
    setDateField(
      `Published the ${
        post.createdAt.toString().split("T")[0]
      } at ${post.createdAt.toString().split("T")[1].substring(0, 5)}`
    );
    setIsUserInSession(usernameInSession === user.username);
  }, []);

  return (
    <Card sx={{ maxWidth: 800 }}>
      <CardHeader
        avatar={<SocialHelpAvatar user={user} />}
        title={
          <Stack direction="row" alignItems="center" gap={1}>
            <Typography variant="subtitle1" color="text" align="left">
              {`${user.name} ${user.surname}`}
            </Typography>
            {user?.verified && <CustomVerifiedIcon />}
          </Stack>
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
      {post.imageUrl && (
        <div style={{ display: "flex", justifyContent: "center" }}>
          <img src={post.imageUrl} alt="img"/>
        </div>
      )}
      <CardActions disableSpacing>
        <SpreadPostButton />
        {usernameInSession !== user.username && (
          <ResolvePostButton
            postInfo={{
              user,
              post,
            }}
          />
        )}
        {isUserInSession && (
          <DeletePostButton post={post} />
        )}
        <Typography
          variant="caption"
          color="grey"
          align="right"
          paddingLeft={62}
        >
          {dateField}
        </Typography>
      </CardActions>
    </Card>
  );
};

export default SocialHelpPost;
