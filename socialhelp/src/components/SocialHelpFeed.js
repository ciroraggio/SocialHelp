import React, { useState, useEffect } from "react";
import { Grid, Typography } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import SocialHelpPost from "./SocialHelpPost";
import AddPostButton from "./Buttons/AddPostButton";
import SocialHelpProgress from "./SocialHelpProgress";
import SocialHelpAddPostDialog from "./SocialHelpAddPostDialog";
import SocialHelpShareDialog from "./SocialHelpShareDialog";
import SocialHelpAddResolveDialog from "./SocialHelpAddResolveDialog";
import { serverGetRequest } from "../utils/httpUtils";
import { useDispatch, useSelector } from "react-redux";
import { getUniqueObjects } from "../utils/arrayUtils";

const SocialHelpFeed = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);
  const { token } = useSelector((state) => state.user);

  const getAllFeedPost = async () => {
    // fetch data
    const newPosts = serverGetRequest("post/getAllFeedPostsByUser", token)
      .then((res) => res.json())
      .then((data) => {
        setPosts((prevPosts) => [
          ...prevPosts,
          ...data.reverse().map((dataObject) => {
            const { user, ...postData } = dataObject;
            return {
              user,
              post: postData,
            };
          }),
        ]);
        setHasMore(newPosts.length > 0);
        setPage((prevPage) => prevPage + 1);
      });
  };

  useEffect(() => {
    if (token) getAllFeedPost();
  }, [token]);



  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        hasMore={hasMore}
        loader={<SocialHelpProgress showLogo />}
        endMessage={
          <div style={{ display: "flex", justifyContent: "center" }}>
            <Typography variant="subtitle2" pt={2}>There are no more posts to show</Typography>
          </div>
        }
      >
        <Grid container spacing={2} justify="center" align="center">
          {getUniqueObjects(posts).map((postInfo) => (
            <Grid item xs={12} key={postInfo.post._id}>
              <SocialHelpPost post={postInfo.post} user={postInfo.user} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      <AddPostButton />
      <SocialHelpAddPostDialog />
      <SocialHelpShareDialog />
      <SocialHelpAddResolveDialog />
    </>
  );
};

export default SocialHelpFeed;
