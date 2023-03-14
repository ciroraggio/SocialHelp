import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import InfiniteScroll from "react-infinite-scroll-component";
import { fakeData } from "../utils/dataUtils";
import SocialHelpPost from "./SocialHelpPost";
import AddPostButton from "./Buttons/AddPostButton";
import SocialHelpProgress from "./SocialHelpProgress";
import SocialHelpAddPostDialog from "./SocialHelpAddPostDialog";
import SocialHelpShareDialog from "./SocialHelpShareDialog";

const SocialHelpFeed = () => {
  const [posts, setPosts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  const fetchData = async () => {
    // fetch data
    // const newPosts = await fetch(`https://api.example.com/feed?page=${page}`).then(res => res.json());
    const newPosts = [];
    setPosts((prevPosts) => [...prevPosts, ...fakeData]);
    setHasMore(newPosts.length > 0);
    setPage((prevPage) => prevPage + 1);
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <>
      <InfiniteScroll
        dataLength={posts.length}
        next={fetchData}
        hasMore={hasMore}
        loader={<SocialHelpProgress showLogo={false} />}
        endMessage={<p>Fine dei contenuti</p>}
      >
        <Grid container spacing={2} justify="center" align="center">
          {posts.map((postInfo) => (
            <Grid item xs={12} key={postInfo.post.id}>
              <SocialHelpPost post={postInfo.post} user={postInfo.user} />
            </Grid>
          ))}
        </Grid>
      </InfiniteScroll>

      <AddPostButton />
      <SocialHelpAddPostDialog />
      <SocialHelpShareDialog />
    </>
  );
};

export default SocialHelpFeed;
