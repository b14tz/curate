import { Container, Box, Divider, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import ProfileHeader from "../Profile/ProfileHeader";
import PlaylistTable from "../Playlist/PlaylistTable";
import {
  getAllUserData,
  getAllUserPostData,
} from "../../interfaces/userInterface";

export default function OtherProfile(props) {
  //set new states for the username, my posts, followers, following, and playlist data
  let [username, setUsername] = useState("");
  let [myPosts, setMyPosts] = useState([]);
  let [followers, setFollowers] = useState([]);
  let [following, setFollowing] = useState([]);
  let [postData, setPostData] = useState([]);
  let [bio, setBio] = useState("");

  useEffect(() => {
    let ignore = false;
    //set the username, my posts, followers, and following for the user id given in the props
    getAllUserData(props.userId).then((data) => {
      if (!ignore) {
        setUsername(data.displayName);
        setFollowers(data.followersList);
        setFollowing(data.followingList);
        setMyPosts(data.myPostList);
        setBio(data.bio);
      }
    });
    //for the playlist table
    getAllUserPostData(props.userId).then((data) => {
      if (!ignore) {
        //set the playlist data
        setPostData(data);
      }
    });
    return () => {
      ignore = true;
    };
  }, [props.userId]);

  return (
    <Box sx={{ width: "fit-content", margin: "auto" }}>
      <ProfileHeader
        myProfile={false}
        username={username}
        posts={myPosts}
        followers={followers}
        following={following}
        userId={props.userId}
        bio={bio}
      />
      <Container>
        <Typography variant="header" sx={{ fontSize: "4rem" }}>
          Their Lists
        </Typography>
        <Divider />
        <PlaylistTable userId={props.userId} postData={postData} />
      </Container>
    </Box>
  );
}
