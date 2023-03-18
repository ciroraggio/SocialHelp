import React, { useEffect, useState } from "react";
import { IconButton, Tooltip } from "@mui/material";
import PersonAddAlt1Icon from "@mui/icons-material/PersonAddAlt1";
import { useDispatch, useSelector } from "react-redux";
import { serverPostRequestAuth } from "../../utils/httpUtils";
import PersonRemoveIcon from "@mui/icons-material/PersonRemove";
import { openSocialHelpAlert } from "../../store/appSlice";
import { setFollowing } from "../../store/userSlice";

const SocialHelpFollowButton = ({ profile }) => {
  const { token, following } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const [isFriend, setIsFriend] = useState(following.includes(profile.id));

  useEffect(() => {
    if (following) setIsFriend(following.includes(profile.id));
  }, [following]);

  const handleFollow = () => {
    if (token) {
      serverPostRequestAuth("user/follow", { followingId: profile.id }, token)
        .then(() => {
          const newUsersFollowed = [...following].concat(profile.id);
          dispatch(setFollowing(newUsersFollowed));
          dispatch(
            openSocialHelpAlert({
              type: "success",
              message: `Segui @${profile.username}!`,
              vertical: "top",
              horizontal: "right",
            })
          );
        })
        .catch(() =>
          dispatch(
            openSocialHelpAlert({
              type: "error",
              message: `Errore, @${profile.username} non aggiunto alla tua rete, riprovare più tardi!`,
              vertical: "top",
              horizontal: "right",
            })
          )
        );
    }
  };

  const handleRemoveFollow = () => {
    // se ho il token e l'utente non segue già il profilo
    if (token && following.includes(profile.id)) {
      serverPostRequestAuth(
        "user/removeFollow",
        { followingId: profile.id },
        token
      )
        .then(() => {
          const newUsersFollowed = following.filter((id) => id !== profile.id);
          dispatch(setFollowing(newUsersFollowed));
          dispatch(
            openSocialHelpAlert({
              type: "success",
              message: `Hai smesso di seguire @${profile.username}!`,
              vertical: "top",
              horizontal: "right",
            })
          );
        })
        .catch(() =>
          dispatch(
            openSocialHelpAlert({
              type: "error",
              message: `Errore, @${profile.username} non rimosso alla tua rete, riprovare più tardi!`,
              vertical: "top",
              horizontal: "right",
            })
          )
        );
    }
  };

  return (
    <Tooltip title={isFriend ? "Smetti di seguire" : "Segui"} arrow>
      <IconButton onClick={isFriend ? handleRemoveFollow : handleFollow}>
        {isFriend ? (
          <PersonRemoveIcon color="primary" />
        ) : (
          <PersonAddAlt1Icon />
        )}
      </IconButton>
    </Tooltip>
  );
};

export default SocialHelpFollowButton;
